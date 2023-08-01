const VoteText = () => {
  return (
    <div>
      <h1 className="d-flex my-4 justify-content-center align-items-center text-decoration-underline">
        How To Vote
      </h1>
      <ul className="my-3">
        <li>
          Click the <strong>Register</strong> link to register to vote. Only
          Registered voters can cast a vote.
        </li>
        <li>A voter Id will be sent to your mail after verification. </li>
        <li>
          When voting commence, click <strong>login</strong> tab and signin with
          your ID and password
        </li>
        <li>
          Click on the <strong>cast your vote</strong> link and vote your
          preferred candidate.
        </li>
        <li>Check live updates from <strong>dashboard</strong>.</li>
      </ul>
    </div>
  );
};

export default VoteText;
