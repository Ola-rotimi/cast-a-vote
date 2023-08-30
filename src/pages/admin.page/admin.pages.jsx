import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../context/user.context";
import Poll from "./poll.pages/poll.pages";
import Footer from "../../components/footer.components/footer.components";

const Admin = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="container-fluid my-3 mx-0">
        {currentUser ? (
          currentUser.userAccount.role === "admin" ? (
            <div className="row min-vh-100">
              <h1 className="text-center">
                Welcome {currentUser.userAccount.firstName.toUpperCase()}
              </h1>
              <Poll />
              <hr />
              <nav className="navbar ">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <div className="d-flex justify-content-between">
                        <Link className="navbar-brand" to="/admin/create-poll">
                          Create Poll
                        </Link>
                        <Link
                          className="navbar-brand"
                          to="/admin/poll-candidate"
                        >
                          Create Candidate
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <Outlet />
            </div>
          ) : (
            <div className="row vh-100">
              <h3 className="text-center my-4">
                You seem to be lost <Link to="/">Go Home</Link>
              </h3>
            </div>
          )
        ) : (
          <div className="row vh-100">
            <h3 className="text-center my-4">
              You seem to be lost <Link to="/">Go Home</Link>
            </h3>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
