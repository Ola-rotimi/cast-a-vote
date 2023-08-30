import { useContext } from "react";
import { Link } from "react-router-dom";

import DashboardPoll from "./dashboard-poll.pages";
import { UserContext } from "../../context/user.context";
import Footer from "../../components/footer.components/footer.components";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="container-fluid">
        <div className="row my-5 min-vh-100">
          {currentUser ? (
            <div className="">
              <h1 className="text-center">Dashboard</h1>
              <hr />
              <DashboardPoll />
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="d-grid justify-content-center my-5">
                <h1 className="text-center">
                  Please Login to View the DashBoard
                </h1>
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
      <Footer />
    </>
  );
};

export default Dashboard;
