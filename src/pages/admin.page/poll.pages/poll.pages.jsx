import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user.context";

const Poll = () => {
  const [polls, setPolls] = useState([]);
  const [pollId, setPollId] = useState();
  const [options, setOptions] = useState([]);
  const [optionsId, setOptionsId] = useState();
  const [isSucceed, setIsSucceed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [message, setMessage] = useState("");

  const { currentUser } = useContext(UserContext);
  const { userToken } = currentUser;

  //Get polls and Options
  //Get polls
  useEffect(() => {
    const POLL_API_URL = "https://voting-api-rhzm.onrender.com/polls";
    const axiosInstance = axios.create({
      baseURL: POLL_API_URL,
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
        console.log(error.message);
      }
    };
    fetchPolls();
  }, []);

  //Get options
  useEffect(() => {
    const OPTIONS_API_URL = `https://voting-api-rhzm.onrender.com/options/${pollId}/option`;
    const axiosInstance = axios.create({
      baseURL: OPTIONS_API_URL,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    const fetchOptions = async () => {
      try {
        const response = await axiosInstance.get();
        const { data } = response.data;
        console.log(data);
        setOptions(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOptions();
  }, [pollId, userToken]);

  const handleChange = (e) => {
    setPollId(e.target.value);
  };

  const handlePollDelete = async () => {
    const POLL_API_URL = `https://voting-api-rhzm.onrender.com/polls/${pollId}`;
    const axiosInstance = axios.create({
      baseURL: POLL_API_URL,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    try {
      const response = await axiosInstance.delete();
      const { data } = response.data;
      setMessage(data);
      setIsSucceed(true);
      setTimeout(() => {
        //page refresh
        window.location.reload();
      }, 2000);
    } catch (error) {
      setIsFailed(true);
      setMessage(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="d-grid my-3">
            <h1 className="text-center">Polls</h1>
            {isSucceed ? (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            ) : isFailed ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : null}
            <div className="d-flex">
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
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handlePollDelete}
              >
                Delete
              </button>
            </div>
            <div className="d-flex flex-column">
              {options.map((option) => (
                <div className="form-check" key={option._id}>
                  <div className="d-flex justify-content-space-between">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value={option._id}
                      onChange={(e) => setOptionsId(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      {option.contestant}
                    </label>{" "}
                    <span className="badge bg-primary rounded-pill">
                      {option.voteCount}
                    </span>{" "}
                    votes{" "}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      // onClick={handleOptionDelete}
                      value={option._id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
