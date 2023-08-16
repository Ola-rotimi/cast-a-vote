import { useState, useContext } from "react";
import axios from "axios";

import FormInput from "../../../components/form-inputs.components/form-inputs.components";
import { UserContext } from "../../../context/user.context";


const pollFormFields = {
  title: "",
  startAt: "",
  stopAt: "",
};

const CreatePoll = () => {
  const [pollForm, setPollForm] = useState(pollFormFields);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { currentUser } = useContext(UserContext);
  const { userToken } = currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPollForm({ ...pollForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const polls = {
      title: pollForm.title,
      startAt: pollForm.startAt,
      stopAt: pollForm.stopAt,
    };
    try {
      const API_URL = "https://voting-api-rhzm.onrender.com/polls"
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      });
      axiosInstance.post("/",polls)
      .then((response)=>{
        if (response.status === 201){
        setIsSuccessful(true);
        setPollForm(pollFormFields);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        }
      })
      .catch((error)=>{
        setIsFailed(true);
        setErrorMessage(error.message);
      })
    } catch (error) {
      setIsFailed(true);
      setErrorMessage(error.message);
    }
  };

  const { title, startAt, stopAt } = pollForm;

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
              <button className="btn btn-primary" type="submit">
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
