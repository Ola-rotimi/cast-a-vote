import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../../components/form-inputs.components/form-inputs.components";
import { UserContext } from "../../context/user.context";
import Loading from "../../components/loading.component/loading.components";
import Footer from "../../components/footer.components/footer.components";

const defaultFormfields = {
  identifier: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormfields); // Form fields
  const [isLogInSuccessful, setIsLogInSuccessful] = useState(false); // Login successful
  const [isLogInFailed, setIsLogInFailed] = useState(false); // Login failed
  const [showPassword, setShowPassword] = useState(false); // Show password
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  const { updateUser } = useContext(UserContext); // Set current user

  const { identifier, password } = formFields;

  const navigate = useNavigate(); // Navigate to vote page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { identifier, password } = formFields;

    const user = { identifier, password };

    try {
      const response = await axios.post(
        "https://voting-api-rhzm.onrender.com/auth/login",
        user
      );
      const { data } = response.data;
      const { account, token } = data;
      const userDetail = {
        userToken: token,
        userAccount: account,
      };
      updateUser(userDetail);
      setIsLogInSuccessful(true);
      setIsLogInFailed(false);
      setFormFields(defaultFormfields);
      setTimeout(() => {
        if (account.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cast-vote");
        }
      }, 1000);
    } catch (error) {
      setIsLogInFailed(true);
      setIsLogInSuccessful(false);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container">
        <div className="row min-vh-100">
          <div className="col-md-6 mx-auto">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="d-grid justify-content-center my-5">
                {isLogInSuccessful ? (
                  <Loading />
                ) : (
                  <>
                    <h2>I already have an account</h2>
                    <span className="mb-3">
                      Login with your email and password
                    </span>
                    {isLogInSuccessful ? (
                      <div className="alert alert-success" role="alert">
                        Login Successful
                      </div>
                    ) : isLogInFailed ? (
                      <div className="alert alert-danger" role="alert">
                        Login Failed: {errorMessage}
                      </div>
                    ) : null}
                    <form className="" onSubmit={handleSubmit}>
                      <FormInput
                        name="identifier"
                        type="text"
                        label="Email/Username"
                        htmlFor="identifier"
                        id="identifier"
                        required
                        onChange={handleChange}
                        value={identifier}
                      />
                      <div className="d-flex justify-content-between">
                        <FormInput
                          name="password"
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          htmlFor="login-password"
                          id="login-password"
                          required
                          onChange={handleChange}
                          value={password}
                        />
                        <button
                          type="button"
                          className="btn btn-sm bg-transparent border-0"
                          style={{ height: "40px" }}
                          onClick={handleShowPassword}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </form>
                    <span className="my-3">
                      Don&apos;t have an account?{" "}
                      <Link to="/register">Register</Link>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
