/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user.context";

const Poll = () => {
  const [polls, setPolls] = useState([]);
  const [pollId, setPollId] = useState();
  const [options, setOptions] = useState([]);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [isOptionSucceed, setIsOptionSucceed] = useState(false);
  const [isOptionFailed, setIsOptionFailed] = useState(false);
  const [optionMessage, setOptionMessage] = useState("");

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
        setMessage(error.message);
      }
    };
    fetchPolls();
  }, []);

  //Get options
  useEffect(() => {
    if (pollId) {
      setIsOptionFailed(false);
      setIsOptionSucceed(false);
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
          setOptions(data);
        } catch (error) {
          setIsOptionFailed(true);
          setOptionMessage(error.response.data.message);
        }
      };
      fetchOptions();
    }
  }, [pollId]);

  const handleChange = (e) => {
    setPollId(e.target.value);
  };

  //handle Poll Deletion
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
      }, 4000);
    } catch (error) {
      setIsFailed(true);
      setMessage(error.message);
    }
  };

  //handle Option Deletion
  const handleOptionDelete = async (e) => {
    const OPTION_API_URL = `https://voting-api-rhzm.onrender.com/options/${pollId}/option/${e.target.value}`;
    const axiosInstance = axios.create({
      baseURL: OPTION_API_URL,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    try {
      const response = await axiosInstance.delete();
      const { data } = response.data;
      setOptionMessage(data);
      setIsOptionSucceed(true);
      setTimeout(() => {
        //page refresh
        window.location.reload();
      }, 1000);
    } catch (error) {
      setIsOptionFailed(true);
      setOptionMessage(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="d-grid my-3">
            <h1 className="text-center">Polls</h1>
            {isSucceed ? (
              <div className="alert alert-success my-2" role="alert">
                {message}
              </div>
            ) : isFailed ? (
              <div className="alert alert-danger my-2" role="alert">
                {message}
              </div>
            ) : null}
            <div className="d-flex mb-3">
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
                className="btn btn-transparent text-danger btn-sm"
                type="button"
                onClick={handlePollDelete}
              >
                Delete
              </button>
            </div>
            <div className="d-flex flex-column mb-3">
              {isOptionSucceed ? (
                <div className="alert alert-success" role="alert">
                  {optionMessage}
                </div>
              ) : isOptionFailed ? (
                <div className="alert alert-danger" role="alert">
                  {optionMessage}
                </div>
              ) : null}
              {options.map((option) => (
                <div
                  className="d-flex justify-content-between my-2"
                  key={option._id}
                >
                  <h5>{option.contestant}</h5>
                  <h6>{option.optionText}</h6>
                  <p>
                    <strong>{option.voteCount}</strong> votes
                  </p>
                  <button
                    className="btn btn-transparent text-danger btn-sm"
                    type="button"
                    onClick={handleOptionDelete}
                    value={option._id}
                  >
                    Delete
                  </button>
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
