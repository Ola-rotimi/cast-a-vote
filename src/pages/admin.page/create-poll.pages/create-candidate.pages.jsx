import { useEffect, useState } from "react";
import axios from "axios";

import FormInput from "../../../components/form-inputs.components/form-inputs.components";

const candidateFormFields = {
  id: Date.now(),
  contestant: "",
  party: "",
};

const CandidateOption = () => {
  const [candidateForm, setCandidateForm] = useState([candidateFormFields]);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [polls, setPolls] = useState();
  const [pollId, setPollId] = useState();

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get(
        "https://voting-api-rhzm.onrender.com/polls/active"
      );
      setPolls(response.data);
      setPollId(response.data[0].id);
    };
    fetchPolls();
    console.log(polls);
  }, [polls]);

  

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
        id: Date.now(),
        contestant: "",
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

  const handleSubmit = () => {
    const candidates = candidateForm.map((candidate) => {
      return {
        option: {
          contestant: candidate.contestant,
          optionText: candidate.party,
        },
      };
    });

    try {
      axios.post(
        `https://voting-api-rhzm.onrender.com/polls/${pollId}`,
        candidates
      );
      setIsSuccessful(true);
    } catch (error) {
      console.log(error.message);
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
                {/* {polls.map((poll) => (
                  <option key={poll.id} value={poll.id}>
                    {poll.title}
                  </option>
                ))} */}
              </select>
              {candidateForm.map((candidateForm, index) => (
                <div key={index}>
                  <hr />
                  <FormInput
                    name="contestant"
                    label="Contestant"
                    type="text"
                    htmlFor="contestant"
                    id="contestant"
                    required
                    onChange={(e) =>
                      handleCandidateChange(index, "contestant", e.target.value)
                    }
                    value={candidateForm.contestant}
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
