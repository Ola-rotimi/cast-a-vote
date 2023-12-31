/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import FormInput from "../../../components/form-inputs.components/form-inputs.components";
import { UserContext } from "../../../context/user.context";

const candidateFormFields = {
  id: Date.now(),
  candidate: "",
  party: "",
};

const CandidateOption = () => {
  const [candidateForm, setCandidateForm] = useState([candidateFormFields]);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [polls, setPolls] = useState([]);
  const [pollId, setPollId] = useState();

  const { currentUser } = useContext(UserContext);
  const { userToken } = currentUser;

  useEffect(() => {
    const API_URL = "https://voting-api-rhzm.onrender.com/polls";
    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    const fetchPolls = async () => {
      try {
        const response = await axiosInstance.get();
        const { data } = response.data;
        setPolls(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchPolls();
  }, []);

  //Handle Option Change
  const handleChange = (e) => {
    setPollId(e.target.value);
  };

  // Handle Form Change
  const handleCandidateChange = (index, field, value) => {
    const newCandidate = [...candidateForm];
    newCandidate[index][field] = value;
    setCandidateForm(newCandidate);
  };

  // Handle Add Form
  const handleAdd = () => {
    setCandidateForm([
      ...candidateForm,
      {
        candidate: "",
        party: "",
      },
    ]);
  };

  // Handle Delete Form
  const handleDelete = (index) => {
    const newCandidate = [...candidateForm];
    newCandidate.splice(index, 1);
    setCandidateForm(newCandidate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const option = candidateForm.map((candidate) => {
      return {
        contestant: candidate.candidate,
        optionText: candidate.party,
      };
    });

    try {
      const API_URL = `https://voting-api-rhzm.onrender.com/options/${pollId}`;
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      axiosInstance.post("/option", { option }).then((response) => {
        if (response.status === 201) {
          setIsSuccessful(true);
          setTimeout(() => {
            setIsSuccessful(false);
            window.location.reload();
          }, 3000);
          setCandidateForm([candidateFormFields]);
        }
      });
    } catch (error) {
      setIsFailed(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="d-grid my-3">
            <h1 className="text-center">Create Poll</h1>
            {isSuccessful ? (
              <div className="alert alert-success" role="alert">
                Poll created successfully!
              </div>
            ) : isFailed ? (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null}
            <hr />
            <form className="" onSubmit={handleSubmit}>
              <h3 className="text-center">Candidate Option</h3>
              <hr />
              <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={handleChange}
                name="postCode"
                value={pollId}
              >
                <option defaultValue>Choose...</option>
                {polls.map((poll) => (
                  <option key={poll.createdAt} value={poll._id}>
                    {poll.title}
                  </option>
                ))}
              </select>
              {candidateForm.map((candidateForm, index) => (
                <div key={index}>
                  <hr />
                  <FormInput
                    name="candidate"
                    label="Candidate"
                    type="text"
                    htmlFor="candidate"
                    id="candidate"
                    required
                    onChange={(e) =>
                      handleCandidateChange(index, "candidate", e.target.value)
                    }
                    value={candidateForm.candidate}
                    autoComplete="on"
                  />
                  <FormInput
                    name="party"
                    label="Party"
                    type="text"
                    htmlFor="party"
                    id="party"
                    required
                    onChange={(e) =>
                      handleCandidateChange(index, "party", e.target.value)
                    }
                    value={candidateForm.party}
                    autoComplete="on"
                  />
                  <button
                    className="btn btn-transparent"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <hr />
                </div>
              ))}
              <button
                className="btn btn-transparent d-grid"
                type="button"
                onClick={handleAdd}
              >
                Add Candidate
              </button>
              <button
                className="btn btn-primary "
                type="submit"
                onClick={handleSubmit}
              >
                Create Poll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateOption;
