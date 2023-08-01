import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../../components/form-inputs.components/form-inputs.components";
import regions from "../../region";

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
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true); // Passwords match
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false); // Registration successful
  const [isRegisterFailed, setIsRegisterFailed] = useState(false); // Registration failed
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Password is valid
  const [showPassword, setShowPassword] = useState(false); // Show password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show confirm password

  const navigate = useNavigate(); // Navigate to login page

  // Destructure formFields
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

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle submit
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

    // Password regex
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return;
    } else {
      setIsPasswordValid(true);
    }

    // Date of birth
    const dateOfBirth = new Date(dob).toISOString().split("T")[0];

    // Check if passwords match
    if (password !== confirmPassword) {
      setIsPasswordCorrect(false);
      return;
    } else {
      try {
        fetch("https://voting-api-rhzm.onrender.com/auth/register", { // Register endpoint
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
          .then((res) => { // Check if registration was successful
            if (res.ok) { // Registration successful
              setIsRegisterSuccessful(true);
              setFormFields(defaultFormfields);
              console.log(res);
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            } else { // Registration failed
              setIsRegisterSuccessful(false);
              setIsRegisterFailed(true);
              console.log(res);
            }
          })
          .catch((errors) => { // Catch errors
            console.error(errors.message);
          });
      } catch (error) { // Catch errors
        console.error(error.message);
      }
    }
  };

  // Password validation
  const passwordTest = isPasswordValid ? null : (
    <div className="text-danger">
      <span>
        Password must contain at least 8 characters,1 uppercase letter,
      </span>

      <p>1 lowercase letter 1 special character and 1 number</p>
    </div>
  );

  // Show password
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  // Show confirm password
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="d-grid justify-content-center my-5">
      <h2>I do not have an account</h2>
      <span className="mb-3">Register with your email and password</span>
      {isPasswordCorrect ? ( // Passwords match
        isRegisterSuccessful ? ( // Registration successful
          <div className="alert alert-success" role="alert">
            Registration Successful, Redirecting to Login Page
          </div>
        ) : isRegisterFailed ? ( // Registration failed
          <div className="alert alert-danger" role="alert">
            Registration Failed, Please try again
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
          htmlFor="firstName"
          id="firstName"
          required
          onChange={handleChange}
          value={firstName}
          autoComplete="on"
        />
        <FormInput
          name="lastName"
          type="text"
          label="Last Name*"
          htmlFor="lastName"
          id="lastName"
          required
          onChange={handleChange}
          value={lastName}
          autoComplete="on"
        />
        <div className="input-group mb-3">
          <label
            className="input-group-text"
            htmlFor="inputGroupSelect01"
            id="inputGroup-sizing-default"
          >
            postcode
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={handleChange}
            name="postCode"
            value={postCode}
          >
            <option defaultValue>Choose...</option>
            {regions.map((region) => (
              <option key={region.id} value={region.postcode}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <FormInput
          name="dob"
          type="date"
          label="Date of Birth*"
          htmlFor="dob"
          id="dob"
          required
          onChange={handleChange}
          value={dob}
        />
        <FormInput
          name="email"
          type="email"
          label="Email*"
          htmlFor="email"
          id="email"
          required
          onChange={handleChange}
          value={email}
          autoComplete="on"
        />
        <FormInput
          name="username"
          type="text"
          label="Username*"
          htmlFor="username"
          id="username"
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
            htmlFor="password"
            id="password"
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
            htmlFor="confirmPassword"
            id="confirmPassword"
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
