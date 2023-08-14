import { useState } from "react";
// import axios from "axios";

import FormInput from "../../../components/form-inputs.components/form-inputs.components";

const pollFormFields = {
  title: "",
  startAt: "",
  stopAt: "",
};

const candidateFormFields = {
  id: Date.now(),
  contestant: "",
  party: "",
};

const CreatePoll = () => {
  const [pollForm, setPollForm] = useState(pollFormFields);
  //   const [isSuccessful, setIsSuccessful] = useState(false);
  //   const [isFailed, setIsFailed] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState("");

  const [candidateForm, setCandidateForm] = useState([candidateFormFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPollForm({ ...pollForm, [name]: value });
  };

  const handleCandidateChange = (index, field, value) => {
    const newCandidate = [...candidateForm];
    newCandidate[index][field] = value;
    setCandidateForm(newCandidate);
  };

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

  const handleDelete = (index) => {
    const newCandidate = [...candidateForm];
    newCandidate.splice(index, 1);
    setCandidateForm(newCandidate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(candidateForm);
    console.log(pollForm);

    const polls = {
      title: pollForm.title,
      startAt: pollForm.startAt,
      stopAt: pollForm.stopAt,
    };

    const candidates = candidateForm.map((candidate) => {
      return {
        id: candidate.id,
        options: {
          contestant: candidate.contestant,
          party: candidate.party,
        },
      };
    });

    console.log(polls, candidates);
    // try {
    //   axios.post("https://voting-api-rhzm.onrender.com/auth/polls", pollForm);
    //   setIsSuccessful(true);
    // } catch (error) {
    //   setIsFailed(true);
    //   setErrorMessage(error.message);
    // }
  };

  const { title, startAt, stopAt } = pollForm;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="d-grid my-3">
            <h1 className="text-center">Create Poll</h1>
            {/* {isSuccessful ? (
              <div className="alert alert-success" role="alert">
                Poll created successfully!
              </div>
            ) : isFailed ? (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null} */}
            <hr />
            <form className="" onSubmit={handleSubmit}>
              <FormInput
                name="title"
                label="Title*"
                type="text"
                htmlFor="title"
                id="title"
                required
                onChange={handleChange}
                value={title}
                autoComplete="on"
              />
              <FormInput
                name="startAt"
                label="Start Date and Time"
                type="datetime-local"
                htmlFor="startAt"
                id="startAt"
                required
                onChange={handleChange}
                value={startAt}
                autoComplete="on"
              />
              <FormInput
                name="stopAt"
                label="Stop Date and Time"
                type="datetime-local"
                htmlFor="stopAt"
                id="stopAt"
                required
                onChange={handleChange}
                value={stopAt}
                autoComplete="on"
              />
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
              <button className="btn btn-primary btn-lg" type="submit">
                Create Poll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
