import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../context/user.context";
import Poll from "./poll.pages/poll.pages";

const Admin = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container-fluid">
      {currentUser ? (
        currentUser.role === "admin" ? (
          <div className="row">
            <h1 className="text-center">Welcome Admin</h1>
            <h3 className="text-center">Available Poll</h3>
            <Poll />
            <hr />
            <nav className="navbar ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 mx-auto">
                    <div className="d-flex justify-content-space-between">
                      <Link className="navbar-brand" to="/admin/create-poll">
                        Create Poll
                      </Link>
                      <Link className="navbar-brand" to="/admin/poll-candidate">
                        Create Candidate
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <Outlet />
          </div>
        ) : null
      ) : (
        <div className="row">
          <h3 className="text-center my-4">
            You seem to be lost <Link to="/">Go Home</Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Admin;
