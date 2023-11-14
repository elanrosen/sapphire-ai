import React, { useState } from "react";
import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Onboarding = ({ updateUserInput }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    company: '',
    missionStatement: '',
    companyMottos: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // Function to validate email format
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Function to handle input changes and update the state
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    updateUserInput(field, value);

    setIsButtonEnabled(formData.fullName && formData.company && isValidEmail(formData.emailAddress));
  };

  const handleContinue = (e) => {
    if (e) {
      e.preventDefault();
    }

    let errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required.";
    if (!isValidEmail(formData.emailAddress)) errors.emailAddress = "Valid Email Address is required.";
    if (!formData.company) errors.company = "Company is required.";

    setFormErrors(errors);
    console.log(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }
    navigate("/jobs");

    // Continue logic here (navigate or any other action)
  };


  return (
    <div className="onboarding">
      <div className="frame-5">
        <div className="frame-6">
          <div className="text-wrapper-10">Let’s get you started</div>
          <div className="frame-7">
            <div className="frame-8">
            <FormField
              className="first-name-field"
              text="Full Name"
              onChange={(value) => handleInputChange("fullName", value)}
              error={formErrors.fullName}
            />
            <FormField
              className="first-name-field"
              text="Email Address"
              onChange={(value) => handleInputChange("emailAddress", value)}
              error={formErrors.emailAddress}
            />
            <FormField
              className="first-name-field"
              text="Company"
              onChange={(value) => handleInputChange("company", value)}
              error={formErrors.company}
            />
              <FormField
                className="first-name-field"
                text="Mission Statement"
                onChange={(value) => handleInputChange("missionStatement", value)}
              />
              <FormField
                className="first-name-field"
                text="Company Mottos"
                onChange={(value) => handleInputChange("companyMottos", value)}
              />
            </div>
            <Button
              color="primary"
              colorPrimaryClassName="button-3"
              divClassName="button-5"
              frameClassName="button-4"
              showIconLeft={false}
              showIconRight={false}
              onClick={handleContinue}
              text="Continue"
            />
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="frame-9">
            <img className="img" alt="Ba c bd" src="/img/b6a88616-c461-4b5d-8836-52550dbd3d7f-1.png" />
            <div className="text-wrapper-11">Sapphire AI</div>
          </div>
        </div>
      </div>
      <img
        className="DALLE"
        alt="Dalle"
        src="/img/dall-e-2023-10-22-14-23-30-illustration-of-a-vast-space-statio.png"
      />
    </div>
  );
};
