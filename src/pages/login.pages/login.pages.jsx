import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../../components/form-inputs.components/form-inputs.components";
import { UserContext } from "../../context/user.context";

const defaultFormfields = {
  identifier: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormfields); // Form fields
  const [isLogInSuccessful, setIsLogInSuccessful] = useState(false); // Login successful
  const [isLogInFailed, setIsLogInFailed] = useState(false); // Login failed
  const [showPassword, setShowPassword] = useState(false); // Show password

  const { setCurrentUser } = useContext(UserContext); // Set current user

  const { identifier, password } = formFields;

  const navigate = useNavigate(); // Navigate to vote page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { identifier, password } = formFields;

    try {
      fetch("https://voting-api-rhzm.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      }).then(async (res) => {
        const info = await res.json();
        if (res.ok) {
          const { data } = info;
          const { account } = data;
          setCurrentUser(account);
          setIsLogInSuccessful(true);
          setIsLogInFailed(false);
          setFormFields(defaultFormfields);
          setTimeout(() => {
            navigate("/cast-vote");
          }, 1000);
        } else {
          setIsLogInFailed(true);
          setIsLogInSuccessful(false);
        }
      });
    } catch (error) {
      return;
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-grid justify-content-center my-5">
      {isLogInSuccessful ? (
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2>I already have an account</h2>
          <span className="mb-3">Login with your email and password</span>
          {isLogInSuccessful ? (
            <div className="alert alert-success" role="alert">
              Login Successful
            </div>
          ) : isLogInFailed ? (
            <div className="alert alert-danger" role="alert">
              Login Failed
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
                className="btn btn-sm btn-outline-dark bg-transparent border-0"
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
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </span>
        </>
      )}
    </div>
  );
};

export default Login;
