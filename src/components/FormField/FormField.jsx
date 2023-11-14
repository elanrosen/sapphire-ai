import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

export const FormField = ({
  className,
  text = "Job Title",
  frameClassName,
  value,
  onChange,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  const handleFocus = () => {
    setIsFocused(true);
    if (!value) {
      setDisplayValue(''); // Clear the input only if there's no initial value
    }  };

  const handleChange = (newValue) => {
    setDisplayValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (error) {
      setIsFocused(false); // Reset focus state to allow error to show again
      setDisplayValue(''); // Optionally clear the display value
    }
  }, [error]);

  useEffect(() => {
    setDisplayValue(value); // keep displayValue in sync with value
  }, [value]);

  return (
    <>
        <div className={`form-field ${className}`}>
      <div className="job-title">{text}</div>
        <input
          onFocus={handleFocus}
          type="text"
          className={`input-field-custom ${error && !isFocused ? 'error' : ''}`}
          value={error && !isFocused ? error : displayValue}
          style={error && !isFocused ? { color: 'red' } : {}}
          onChange={(e) => handleChange(e.target.value)}
        />
    </div>
</>

  );
};

FormField.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  frameClassName: PropTypes.string,
  softwareEngineerClassName: PropTypes.string,
  error: PropTypes.string,
};

export default FormField;
