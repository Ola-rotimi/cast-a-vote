import { useState, useRef, useContext } from "react";

import Bami from "../../assets/images/Bami.png";
import Bart from "../../assets/images/Bart.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const candidateForm = {
  name: "",
};

const CastVote = () => {
  const [candidate, setCandidate] = useState(candidateForm); // Candidate
  const [voted, setVoted] = useState(false); // Voted
  const [votedCandidate, setVotedCandidate] = useState(""); // Voted candidate
  const [selectCandidate, setSelectCandidate] = useState(true); // Select candidate

  const { currentUser } = useContext(UserContext);

  const topRef = useRef(null); // Top reference

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    topRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to top
    if (candidate.name === "") {
      // If candidate is not selected
      setSelectCandidate(false); // Select candidate
      return;
    } else {
      // If candidate is selected
      setVoted(true); // Set voted to true
      setVotedCandidate(candidate.name); // Set voted candidate
      setSelectCandidate(true); // Set select candidate to true
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {currentUser ? ( // If user is logged in
            <div className="d-grid my-3" ref={topRef}>
              <h1 className="text-center">Cast Your Vote</h1>
              <h6 className="text-center">
                You can only vote ONCE, VOTE WISELY!
              </h6>
              <hr />

              <h3 className="text-center">Candidates</h3>
              <hr />
              <p className="text-center">Select a Candidate</p>
              {voted ? ( // If user has voted
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>You have voted for {votedCandidate}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              ) : selectCandidate ? ( // If user has not voted
                ""
              ) : (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Please select a candidate</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <div className="form-check m-5 align-middle">
                <input
                  className="form-check-input align-middle"
                  type="radio"
                  name="name"
                  id="flexRadioDefault1"
                  onClick={handleChange}
                  value="Bami Peterson"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  <img
                    className="img-fluid mx-3 rounded align-middle cropped-image"
                    width="200"
                    height="200"
                    src={Bami}
                    alt="Bami"
                  />
                  Bami Peterson
                </label>
              </div>
              <div className="form-check m-5">
                <input
                  className="form-check-input "
                  type="radio"
                  name="name"
                  id="flexRadioDefault2"
                  onClick={handleChange}
                  value="Bart Kernel"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  <img
                    className="img-fluid mx-3 rounded align-middle cropped-image"
                    width="200"
                    height="200"
                    src={Bart}
                    alt="Bart"
                  />
                  Bart Kernel
                </label>
              </div>
              <hr />
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
          ) : (
            <div className="d-grid justify-content-center my-5">
              <h1 className="text-center">Please Login to Vote</h1>
              <hr />
              <div className="d-flex justify-content-center">
                <Link to="/login" className="btn btn-light me-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-light ms-3">
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastVote;
