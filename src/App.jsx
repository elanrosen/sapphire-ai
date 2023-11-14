import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Onboarding } from "./screens/Onboarding";
import { Jobs } from "./screens/Jobs";
import { SendEmails } from "./screens/SendEmails";
import { EmailScreen } from "./screens/EmailScreen";

export const App = () => {
  // Define a state variable to store user inputs
  const [userData, setUserData] = useState({
    fullName: "Elan Rosen",
    emailAddress: "earosen@umich.edu",
    company: "Microsoft",
    missionStatement: "",
    companyMottos: "",
  });
  const initialJobs = [
    {
      jobTitle: "Software Engineer I",
      location: "Redmond, WA",
      seniority: "L3",
      skills: "HTML, CSS, JavaScript",
      jobResponsibilities: "Frontend web development, UI/UX design",
      status: "paused",
      delivered: 10,
      reply: 5,
      dateCreated: "2/10/2023",
    },
    {
      jobTitle: "Director, Financial & Business Operations",
      location: "New York, NY",
      seniority: "L6",
      skills: "ERP, strong analytical and problem solving skills, and excellent communication",
      jobResponsibilities: "In this role, you will be a critical leader responsible for directing the financial and business operations of our company",
      status: "active",
      delivered: 15,
      reply: 12,
      dateCreated: "08/20/2023",
    },
    // Add more job objects as needed
  ];  

  const [jobs, setJobs] = useState(initialJobs);

    const [feedbackFramesGlobal, setFeedbackFramesGlobal] = useState({});

    const updateFeedbackFrames = (frames, jobIndex) => {
      setFeedbackFramesGlobal({
        ...feedbackFramesGlobal,
        [jobIndex]: frames
      });
    };
    useEffect(() => {
      // Define the backend URL
      const backendUrl = 'http://localhost:5000';
  
      // Make an API call to check if the user is onboarded
      fetch(`${backendUrl}/api/check_onboard`)
        .then((response) => response.json())
        .then((data) => {
          router.navigate("/");//no longer doing this
        })
        .catch((error) => {
          console.error("Error checking onboard status:", error);
        });
    }, []); // Run this effect only once on component mount


  // Create a function to update the state with user inputs
  const updateUserInput = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  const saveJob = (job, jobIndex) => {
    if (typeof jobIndex !== "undefined" && jobs[jobIndex]) {
      // Update existing job
      const updatedJobs = [...jobs];
      updatedJobs[jobIndex] = job;
      setJobs(updatedJobs);
    } else {
      // Add a new job
      setJobs([...jobs, job]);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Onboarding updateUserInput={updateUserInput} />, // Pass updateUserInput here
    },
    // {
    //   path: "/*",
    //   element: <Jobs userData={userData} jobs={jobs} feedbackFramesGlobal={feedbackFramesGlobal} />, // Pass userData to the Jobs component

    // },
    {
      path: "/jobs",
      element: <Jobs userData={userData} jobs={jobs} feedbackFramesGlobal={feedbackFramesGlobal} />, // Pass userData to the Jobs component
    },
    {
      path: "/send-emails",
      element: <SendEmails />,
    },
    {
      path: "/email",
      element: <EmailScreen userData={userData} saveJob={saveJob} jobs={jobs} feedbackFramesGlobal={feedbackFramesGlobal}
      updateFeedbackFrames={updateFeedbackFrames}/>,
    },
    {
      path: "/email/:jobIndex",
      element: <EmailScreen userData={userData} saveJob={saveJob} jobs={jobs} feedbackFramesGlobal={feedbackFramesGlobal}
      updateFeedbackFrames={updateFeedbackFrames}/>,
    },
  ]);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
};
