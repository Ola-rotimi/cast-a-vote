import { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import Vote from "./vote.pages";

const CastVote = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div>
          {currentUser ? ( // If user is logged in
            <Vote />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "80vh" }}
            >
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastVote;
