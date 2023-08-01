import { useState, useRef } from "react";

import Bami from "../../assets/images/Bami.png";
import Bart from "../../assets/images/Bart.png";

const candidateForm = {
  name: "",
};

const CastVote = () => {
  const [candidate, setCandidate] = useState(candidateForm);
  const [voted, setVoted] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState("");
  const [selectCandidate, setSelectCandidate] = useState(true);

  const topRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    topRef.current.scrollIntoView({ behavior: "smooth" });
    if (candidate.name === "") {
      setSelectCandidate(false);
      return;
    } else {
      setVoted(true);
      setVotedCandidate(candidate.name);
      setSelectCandidate(true);
    }
  };

  return (
    <div className="d-grid my-3" ref={topRef}>
      <h1 className="text-center">Cast Your Vote</h1>
      <h6 className="text-center">You can only vote ONCE, VOTE WISELY!</h6>
      <hr />

      <h3 className="text-center">Candidates</h3>
      <hr />
      <p className="text-center">Select a Candidate</p>
      {voted ? (
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
      ) : selectCandidate ? (
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
      <hr />
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
          <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
            Cast Vote
          </button>
        )}
      </div>
    </div>
  );
};

export default CastVote;
