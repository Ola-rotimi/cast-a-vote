/* eslint-disable react/prop-types */
const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="input-group mb-3">
      <label
        {...otherProps}
        className="input-group-text"
        id="inputGroup-sizing-default"
      >
        {label}
      </label>
      <input
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
