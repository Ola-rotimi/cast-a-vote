/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../../context/user.context";

const Vote = () => {
  const [polls, setPolls] = useState([]);
  const [pollId, setPollId] = useState();
  const [options, setOptions] = useState();
  const [optionId, setOptionId] = useState();
  const [voted, setVoted] = useState(false); // Voted
  const [isFailed, setIsFailed] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState("");
  const [candidate, setCandidate] = useState({ name: "", id: "" }); // Candidate
  const [selectCandidate, setSelectCandidate] = useState(true); // Select candidate
  const [message, setMessage] = useState();

  const { currentUser } = useContext(UserContext);
  const { userToken } = currentUser;

  const topRef = useRef(null); // Top reference

  //get Polls
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
      setOptions();
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
          setMessage(error.response.data.message);
        }
      };
      fetchOptions();
    }
  }, [pollId]);

  //handle select change
  const handleChange = (e) => {
    setPollId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVotedCandidate(candidate.name);
    topRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to top
    if (candidate.name === "") {
      // If candidate is not selected
      setSelectCandidate(false); // Select candidate
      return;
    } else {
      // If candidate is selected
      if (pollId && optionId) {
        const VOTED_API_URL = `https://voting-api-rhzm.onrender.com/vote/${pollId}/vote/${optionId}`;
        const axiosInstance = axios.create({
          baseURL: VOTED_API_URL,
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });
        const fetchOptions = async () => {
          try {
            const response = await axiosInstance.patch();
            if (response.status === 200) {
              setVoted(true); // Set voted to true // Set voted candidate
              setSelectCandidate(true); // Set select candidate to true
              setMessage(`Your vote for ${votedCandidate} was successful`);
              setTimeout(() => {
                setMessage("");
              }, 3000);
            } else {
              setVoted(false);
              setIsFailed(true);
              setMessage("You have already voted");
              setTimeout(() => {
                setVoted(false);
                setIsFailed(false);
                setSelectCandidate(true);
              }, 3000);
            }
          } catch (error) {
            setVoted(false);
            setIsFailed(true);
            setMessage(error.response.data.message);
            setTimeout(() => {
              setVoted(false);
              setIsFailed(false);
              setSelectCandidate(true);
              setMessage("");
            }, 3000);
          }
        };
        fetchOptions();
        setPollId("");
        setOptionId("");
        setCandidate({ name: "", id: "" });
      } else {
        setMessage("Kindly Select A Poll and Candidate");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    }
  };

  return (
    <div className="container-fluid" ref={topRef}>
      <h1 className="text-center">Cast Your Vote</h1>
      <h6 className="text-center">You can only vote ONCE, VOTE WISELY!</h6>
      <hr />
      <div className="d-grid " style={{ minHeight: "50vh" }}>
        <h3 className="text-center">Candidates</h3>
        <hr />
        <p className="text-center">Select a Candidate</p>
        <div className="m-5">
          {voted ? (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          ) : isFailed ? (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          ) : selectCandidate ? (
            ""
          ) : (
            <div className="alert alert-danger" role="alert">
              Please Select a Poll and a Candidate
            </div>
          )}

          <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={handleChange}
            name="postCode"
            value={pollId}
          >
            <option value="">Choose...</option>
            {polls.map((poll) => (
              <option key={poll.createdAt} value={poll._id}>
                {poll.title}
              </option>
            ))}
          </select>

          <div className="m-3">
            {options
              ? options.map((option) => (
                  <div key={option._id}>
                    <input
                      className="form-check-input mx-2 mb-3"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      key={option._id}
                      value={option.contestant}
                      onChange={(e) => {
                        setCandidate({
                          name: e.target.value,
                          id: option._id,
                        });
                        setOptionId(option._id);
                      }}
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexRadioDefault1"
                    >
                      <h5>{option.contestant}</h5>
                      <p>{option.optionText}</p>
                    </label>
                  </div>
                ))
              : null}
          </div>

          <div className="d-flex justify-content-center">
            {voted ? (
              <button type="submit" className="btn btn-dark" disabled>
                Cast Vote
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                Cast Vote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
