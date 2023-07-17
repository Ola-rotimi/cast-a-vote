import { useState } from "react";
import { Link } from "react-router-dom";

import FormInput from "../../components/form-inputs.components/form-inputs.components";

const defaultFormfields = {
  email: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const [isLogInSuccessful, setIsLogInSuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(isLogInSuccessful);

    const { email, password } = formFields;

    try {
      fetch("https://voting-api-rhzm.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsLogInSuccessful(true);
          }
        })
        .catch((error) => {
          console.log(error.message);
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
      <h2>I already have an account</h2>
      <span className="mb-3">Login with your email and password</span>
      <form className="" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          label="Email"
          required
          onChange={handleChange}
          value={email}
        />
        <div className="d-flex justify-content-between">
          <FormInput
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
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
        {"Don't have an account?"} <Link to="/register">Register</Link>
      </span>
    </div>
  );
};

export default Login;
