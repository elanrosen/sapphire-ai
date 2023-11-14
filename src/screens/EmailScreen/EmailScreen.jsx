import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AutoFixNormal } from "../../components/AutoFixNormal";
import { Edit } from "../../components/Edit";
import { Email } from "../../components/Email";
import { FeedbackFrame } from "../../components/FeedbackFrame";
import { FormField } from "../../components/FormField";
import { NameChatColor } from "../../components/NameChatColor";
import { NameGridColor } from "../../components/NameGridColor";
import { NameHomeColor } from "../../components/NameHomeColor";
import { NameLayersColor } from "../../components/NameLayersColor";
import { NamePieChartColor } from "../../components/NamePieChartColor";
import { NameSettingsColor } from "../../components/NameSettingsColor";
import { NameBellColor } from "../../components/NameBellColor";
import { NameCheckColor } from "../../components/NameCheckColor";
import { Sidebar } from "../../components/Sidebar";
import { Button } from "../../components/Button";
import { NameUploadCloud } from "../../components/NameUploadCloud";
import { NamePlusColor } from "../../components/NamePlusColor";
import { Frame } from "../../components/Frame";
import "./style.css";
import { HeaderContainer } from "../../components/HeaderContainer";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { NameSendColor } from "../../components/NameSendColor";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export const EmailScreen = ({ userData, saveJob, jobs, feedbackFramesGlobal, updateFeedbackFrames }) => {
  const navigate = useNavigate();
  const defaultEmailText = `Click generate to see a preview of your email here.`;
  const [emailText, setEmailText] = useState(defaultEmailText.replace(/\n/g, '<br>')); // Define a state variable to store the email text
  const [jobFormData, setJobFormData] = useState({
    jobTitle: "",
    location: "",
    seniority: "",
    skills: "",
    jobResponsibilities: "",
    lastGeneratedEmail: "", // <-- Added
    status: "created",
    delivered: 0,
    reply: 0,
    dateCreated: new Date().toLocaleDateString(), // Set to today's date
  });
  const { jobIndex } = useParams(); // Get jobIndex from the URL parameters
   const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [inputText, setInputText] = useState(""); // Stateto capture input text
  const [feedbackFrames, setFeedbackFrames] = useState([]); // State to hold feedback frames
  const [formErrors, setFormErrors] = useState({});


  const handleFeedbackFrameDelete = (frameId) => {
    // Filter out the feedback frame with the given frameId
    const updatedFeedbackFrames = feedbackFrames.filter(
      (frame) => frame.id !== frameId
    );
    setFeedbackFrames(updatedFeedbackFrames);

    // Update the feedback frames in the state
    updateFeedbackFrames(updatedFeedbackFrames, jobIndex);
  };


  // Handler to update the form field values in the state
  const handleFormFieldChange = (fieldName, value) => {

    setJobFormData({
      ...jobFormData,
      [fieldName]: value
    });

    // console.log(jobFormData)
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create a new feedback frame with the input text
    const newFeedbackFrame = {
      id: feedbackFrames.length + 1, // You can use a unique ID here
      text: inputText,
    };
    const newFeedbackFrames = [...feedbackFrames, newFeedbackFrame];
    setFeedbackFrames(newFeedbackFrames);

    // Add the new feedback frame to the state
    updateFeedbackFrames(newFeedbackFrames, jobIndex);

    setInputText(""); // Clear the input field after submission
  };


  const handleRegenerateClick = () => {
    setIsLoading(true);
    // Define the URL for the backend endpoint
    const apiUrl = "http://localhost:5000/api/generate_preview_email"; // Update the URL as needed
    // Prepare the payload data
    const payload = {
      jobFormData,
      userData,
      feedbackFrames: feedbackFrames.map((frame) => frame.text), // Include feedback frame message
    };

    // Make the API GET request
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),  // Include the payload
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend here
        // console.log(data); // You can log the response data for now
        const formattedEmailText = data.message.replace(/\n/g, '<br>');
        setJobFormData(prevJobFormData => ({
          ...prevJobFormData,
          lastGeneratedEmail: formattedEmailText,
        }));
        // setEmailText(formattedEmailText);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error making API request:", error);
        setIsLoading(false);
      });

  };

  const handleSaveJob = (e) => {
    if (e) {
      e.preventDefault();
    }

    let errors = {};
    if (!jobFormData.jobTitle) errors.jobTitle = "Job Title is required.";
    if (!jobFormData.location) errors.location = "Location is required.";
    if (!jobFormData.seniority) errors.seniority = "Seniority is required.";
    console.log(jobFormData)
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const updatedJobFormData = {
      ...jobFormData,
      delivered: jobFormData.delivered || 0,  // Make sure 'delivered' is defined
      reply: jobFormData.reply || 0            // Make sure 'reply' is defined
    };

    // Call saveJob to update state
    if (jobIndex !== undefined) {
      saveJob(updatedJobFormData, jobIndex);
    } else {
      saveJob(updatedJobFormData);
    }
    navigate("/jobs");

  };

  useEffect(() => {
    // Convert jobIndex to integer in case it is a string
    const idx = parseInt(jobIndex, 10);
  
    // Check if jobs array is defined and if an item exists at the jobIndex
    if (jobs && jobs[idx]) {
      setJobFormData(jobs[idx]);
      setFeedbackFrames(feedbackFramesGlobal[idx] || []);
  
      // If lastGeneratedEmail exists, set the emailText
      if (jobs[idx].lastGeneratedEmail) {
        setEmailText(jobs[idx].lastGeneratedEmail.replace(/\n/g, '<br>'));
      }
    } else {
      // Check if jobTitle is empty before calling handleRegenerateClick
      if (jobFormData.jobTitle != "") {
        console.log("Job Title is empty, regenerating..."); // Debugging
      }
    }
  }, [jobs, jobIndex, feedbackFramesGlobal, jobFormData]); // Add jobFormData to the dependency array
  
  

  // console.log("Parent re-rendering, jobFormData:", jobFormData);

  return (
    <>
      <div className="email-screen">
        <Sidebar
          className="sidebar-instance jobs"
          nameBellColorNameBellColorClassName="design-component-instance-node-3"
          nameCheckColorNameCheckColorClassName="design-component-instance-node-3"
          nameChevronColorNameChevronColorClassName="sidebar-2"
          navBase={<NameGridColor className="design-component-instance-node-3" />}
          navBase1={<NamePieChartColor className="design-component-instance-node-3" />}
          navBase2={<NameSettingsColor className="design-component-instance-node-3" />}
          navBase3={<NameChatColor className="design-component-instance-node-3" />}
          navBase4={<NameHomeColor className="design-component-instance-node-3" />}
          navBase5={<NameBellColor className="design-component-instance-node-3" />}
          navBase6={<NameCheckColor className="design-component-instance-node-3" />}
          override={<NameLayersColor className="design-component-instance-node-3" />}
          userData={userData} // Pass the userData prop to Sidebar
          to="/jobs"
        />
        <div className="main-wrap-2">

          <HeaderContainer formErrors={formErrors} className="header-container-instance" onSave={handleSaveJob} />

          <div className="outer-container">
            <div className="left-container">
              <div className="job-details">
                <div className="header-5">
                  <div className="text-wrapper-21">Job Details</div>
                  <Edit className="design-component-instance-node-7" style="outlined" styleOutlined="/img/edit.png" />
                </div>
                <div className="form-container-2">
                  <div className="row-3">
                  <FormField
                    className="form-field-instance"
                    text="Job Title"
                    frameClassName="frame"
                    value={jobFormData.jobTitle}
                    onChange={(value) => handleFormFieldChange("jobTitle", value)}
                    error={formErrors.jobTitle}
                  />
                  <FormField
                    className="location-field"
                    text="Location"
                    frameClassName="frame"
                    value={jobFormData.location}
                    onChange={(value) => handleFormFieldChange("location", value)}
                    error={formErrors.location}
                 />
                  <FormField
                    className="seniority-field"
                    text="Seniority"
                    frameClassName="frame"
                    value={jobFormData.seniority}
                    onChange={(value) => handleFormFieldChange("seniority", value)}
                    error={formErrors.seniority}
                  />
                </div>
                  <div className="row-3">
                  <FormField
                    className="form-field-instance"
                    text="Skills"
                    frameClassName="frame"
                    value={jobFormData.skills}
                    onChange={(value) => handleFormFieldChange("skills", value)}
                    softwareEngineerClassName="software-engineer-2"
                  />              
                  </div>
                  <div className="form-field-wrapper">
                    <FormField
                    className="form-field-instance-long"
                    text="Job Responsibilities"
                    frameClassName="long-frame"
                    value={jobFormData.jobResponsibilities}
                    onChange={(value) => handleFormFieldChange("jobResponsibilities", value)}
                    softwareEngineerClassName="software-engineer-2"
                    />
                  </div>

                </div>

              </div>
              <div className="AI-feedback">
                <div className="header-5">
                  <div className="text-wrapper-22">Feedback for sapphire</div>
                  <AutoFixNormal
                    className="design-component-instance-node-7"
                    style="outlined"
                    styleOutlined="/img/auto-fix-normal.png"
                  />
                </div>
                <div className="body">
                  <div className="feedback-cards">
                    {feedbackFrames.map((frame) => (
                      <FeedbackFrame
                      handleFeedbackFrameDelete={handleFeedbackFrameDelete}
                        key={frame.id} // Use the unique ID as the key
                        frameId={frame.id} // Pass the frame ID as a prop
                        className="feedback-frame-instance"
                        text={frame.text} // Pass the request text as a prop
                      />
                    ))}
                  </div>
                  <div className="message-padding">
                    <form className="fix-form" onSubmit={handleSubmit}>
                      <div className="message-bar">
                        <div className="ex-use-a-more-wrapper">
                          <input
                            className="ex-use-a-more"
                            type="text"
                            placeholder="Type your message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)} />

                        </div>
                        <button
                          type="submit"
                          className="chatgpt-button" // Apply the chatgpt-button class to the button
                        />
                      </div>
                    </form>

                  </div>

                </div>
              </div>
            </div>
            <div className="email-draft">
              <div className="header-5">
                <div className="text-wrapper-22">Sample Email</div>
                <Email className="design-component-instance-node-7" style="outlined" styleOutlined="/img/email.png" />
              </div>
              {/* <div className="preview-for-example">
              <p className="this-is-a-preview">
                <span className="text-wrapper-23">This is a preview for an example contact. Click </span>
                <span className="text-wrapper-24">here</span>
                <span className="text-wrapper-23"> to generate for a specific contact.</span>
              </p>
            </div> */}
              <div className="email-padding">
              <div className="button-container">
                  <Button
                    color="green"

                    colorPrimaryClassName="button-84"
                    frameClassName="design-component-instance-node-84"
                    override1={<NameUploadCloud className="icons-3" nameUploadCloud="/img/6808239-white-cropped-1.png" />}
                    showIconRight={true}
                    showIconLeft={false}
                    text="Regenerate"
                    onClick={handleRegenerateClick}
                  />
                  <Button
                    color="secondary"
                    colorPrimaryClassName="button-84"
                    frameClassName="design-component-instance-node-84"
                    override1={<NameUploadCloud className="icons-3" nameUploadCloud="/img/grid-01.png" />}
                    showIconRight={true}
                    showIconLeft={false}
                    text="Change Contact"
                  />
                </div>
                <div className="email-background">
                  {isLoading ? (
                    <div className="loading-container">
                      <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                    </div>
                  ) : (
                    <div>
                      <p className="to">
                        <span className="text-wrapper-25">To:</span>
                        <span className="text-wrapper-26"> Thomas Farrow</span>
                      </p>
                      <p className="subject">
                        <span className="text-wrapper-25">Subject:</span>
                        <span className="text-wrapper-26"> Exciting New Opportunity</span>
                      </p>
                      <div className="br">{""}</div>
                      <br></br>
                      <div>
                        <p className="dear-prospect-name-i" dangerouslySetInnerHTML={{ __html: emailText }} />
                      </div>                  </div>
                  )}

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
