import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../context/user.context";

const DashboardPoll = () => {
  const [polls, setPolls] = useState([]);
  const [pollId, setPollId] = useState();
  const [options, setOptions] = useState([]);
  const [isFailed, setIsFailed] = useState(false);
  const [message, setMessage] = useState();

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
        setIsFailed(true);
        setMessage(error.message);
      }
    };
    fetchPolls();
  }, [userToken]);

  //Get options
  useEffect(() => {
    if (pollId) {
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
          setIsFailed(true);
          setMessage(error.response.data.message);
        }
      };
      fetchOptions();
    }
  }, [pollId, userToken]);

  //Get Total Votes

  const handleChange = (e) => {
    setPollId(e.target.value);
  };

  return (
    <div className="m-5">
      <h1 className="text-center">Poll result</h1>

      <hr />
      {isFailed ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) : null}
      <div className="m-5">
        <select
          className="form-select mb-4 w-2"
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

        <div className="m-5">
          {options.map((option) => (
            <div key={option._id} className="d-flex my-3">
              <h5>{option.contestant}</h5>
              <div
                key={option._id}
                className="progress mx-3 flex-fill "
                role="progressbar"
                aria-label="Example 40px high with label "
                aria-valuenow={option.voteCount}
                aria-valuemin="0"
                aria-valuemax={options.reduce(
                  (acc, option) => acc + option.voteCount,
                  0
                )}
                style={{ height: "30px" }}
              >
                <div
                  className="progress-bar overflow-visible text-dark"
                  style={{
                    width: `${
                      (option.voteCount /
                        options.reduce(
                          (acc, option) => acc + option.voteCount,
                          0
                        )) *
                      100
                    }%`,
                  }}
                >
                  <strong>
                    {option.contestant}: {option.voteCount}
                  </strong>
                </div>
              </div>
              <p>{option.voteCount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPoll;

{
  /*  */
}
