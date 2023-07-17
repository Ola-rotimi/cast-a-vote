import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../../components/form-inputs.components/form-inputs.components";

const defaultFormfields = {
  firstName: "",
  lastName: "",
  postCode: "",
  dob: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    postCode,
    dob,
    email,
    username,
    password,
    confirmPassword,
  } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      postCode,
      dob,
      email,
      username,
      password,
      confirmPassword,
    } = formFields;

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return;
    } else {
      setIsPasswordValid(true);
    }
    const dateOfBirth = new Date(dob).toISOString().split("T")[0];
    console.log(dateOfBirth);

    if (password !== confirmPassword) {
      setIsPasswordCorrect(false);
      return;
    } else {
      try {
        fetch("https://voting-api-rhzm.onrender.com/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            postCode,
            dateOfBirth,
            email,
            username,
            password,
            confirmPassword,
          }),
        })
          .then((res) => {
            if (res.ok) {
              setIsRegisterSuccessful(true);
              setFormFields(defaultFormfields);
              console.log(res);
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            } else {
              setIsRegisterSuccessful(false);
              setIsRegisterFailed(true);
              console.log(res);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const passwordTest = isPasswordValid ? null : (
    <div className="text-danger">
      <span>
        Password must contain at least 8 characters,1 uppercase letter,
      </span>

      <p>1 lowercase letter 1 special character and 1 number</p>
    </div>
  );

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="d-grid justify-content-center my-5">
      <h2>I do not have an account</h2>
      <span className="mb-3">Register with your email and password</span>
      {isPasswordCorrect ? (
        isRegisterSuccessful ? (
          <div className="alert alert-success" role="alert">
            Registration Successful, Redirecting to Login Page
          </div>
        ) : isRegisterFailed ? (
          <div className="alert alert-danger" role="alert">
            Registration Failed! Try Again!
          </div>
        ) : null
      ) : (
        <div className="alert alert-danger" role="alert">
          Passwords do not match
        </div>
      )}
      <form className="" onSubmit={handleSubmit}>
        <FormInput
          name="firstName"
          type="text"
          label="First Name*"
          required
          onChange={handleChange}
          value={firstName}
          autoComplete="on"
        />
        <FormInput
          name="lastName"
          type="text"
          label="Last Name*"
          required
          onChange={handleChange}
          value={lastName}
          autoComplete="on"
        />
        <FormInput
          name="postCode"
          type="text"
          label="Post Code"
          onChange={handleChange}
          value={postCode}
          autoComplete="on"
        />
        <FormInput
          name="dob"
          type="date"
          label="Date of Birth*"
          required
          onChange={handleChange}
          value={dob}
        />
        <FormInput
          name="email"
          type="email"
          label="Email*"
          required
          onChange={handleChange}
          value={email}
          autoComplete="on"
        />
        <FormInput
          name="username"
          type="text"
          label="Username*"
          required
          onChange={handleChange}
          value={username}
          autoComplete="on"
        />
        <div className="d-flex justify-content-between">
          <FormInput
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password*"
            required
            onChange={handleChange}
            value={password}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-dark bg-transparent border-0"
            style={{ height: "40px" }}
            onClick={showPasswordHandler}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordTest}
        <div className="d-flex justify-content-between">
          <FormInput
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            required
            onChange={handleChange}
            value={confirmPassword}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-dark bg-transparent border-0"
            style={{ height: "40px" }}
            onClick={showConfirmPasswordHandler}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="btn btn-primary ">
          Register
        </button>
      </form>
      <span className="my-3">
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default Register;