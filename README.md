# Sapphire AI: AI-Powered Recruitment Assistant

## Overview

Sapphire AI is an innovative tool that leverages artificial intelligence to revolutionize the recruitment process. This application automates the creation and management of personalized emails, streamlining outreach to potential candidates. It's designed to simplify recruitment workflows, enhancing efficiency and user experience.

This project provided an opportunity to enhance my front-end software engineering skills, resulting in a product that emphasizes a polished and user-friendly interface. While the back-end is functional, it's less comprehensive, reflecting a primary focus on the interface's aesthetic and interactive qualities. The UI includes various placeholder elements to demonstrate potential features.

Exploring the capabilities of the OpenAI API, Sapphire AI also delves into the realm of sales and marketing technology.

**Demo Video** https://youtu.be/BCpS5gj4WB4

**Project State:** Please note that this project is in a developmental stage, built over approximately 8 hours, and may lack some advanced features.

---

**Deployment Notes:**
This project was not initially intended for deployment, and as such, there are a few unresolved issues specific to its hosted version on AWS:

1. **Icon Loading Issue**: There may be inconsistencies in icon loading.
2. **Job Editing Limitation**: Creation of new jobs is possible, but editing existing ones is not currently supported.
3. **OpenAI Features**: The OpenAI functionalities are not enabled in the online version, and explanatory error messages are yet to be incorporated.

---

## Table of Contents

1. [Background](#background)
2. [User Interface](#user-interface)
3. [Capabilities](#capabilities)
4. [Technical Architecture](#technical-architecture)
5. [Setup Guide](#setup-guide)

## Background

Recruitment is a critical yet often cumbersome process for many organizations. Traditional methods involve significant manual effort in reaching out to potential candidates, particularly in personalizing communication. Sapphire AI addresses this challenge by automating the creation and distribution of personalized job outreach emails, thereby streamlining the recruitment workflow.


## User Interface

### 1. Onboarding Page
<p align="center">
  <img src="readme_images/onboarding.png" alt="Onboarding Page" width="500">
</p>

### 2. Jobs Page
<p align="center">
  <img src="readme_images/jobs.png" alt="Jobs Page" width="500">
</p>

### 3. Email Generation Page
<p align="center">
  <img src="readme_images/email-gen.png" alt="Email Gen Page" width="500">
</p>

### 4. Email Send Overlay
<p align="center">
  <img src="readme_images/email-send.png" alt="Email Send Page" width="500">
</p>

## Capabilities

It's crucial to recognize that some user interface elements are conceptual placeholders, showcasing potential features. The actual functionalities available in this demo include:
<p align="center">
  <img src="readme_images/pages.svg" alt="Page Flows" width="700">
</p>

### Onboarding

- **User Input Form**: Users can input details about their business and recruitment needs. This information is crucial for tailoring the user experience and is stored for future reference.
- **Data Storage**: The information provided during onboarding is securely saved, ensuring its availability for subsequent processes like email generation.

### Jobs Page

- **Job Listings Display**: This feature presents the saved job listings in an organized, tabular format, allowing for easy viewing and management.
- **Navigation to Email Generation**: Users can navigate to the email generation page for a specific job by clicking on a job listing.
- **Addition of New Job Listings**: A dedicated feature for adding new job listings, enhancing the dynamic nature of job management.

### Email Operations

- **Selection and Sending of Emails**: This functionality enables the selection of specific jobs for which emails need to be sent, streamlining the email sending process.
- **Send Email Overlay**: A specialized overlay that allows users to specify the number of email recipients, adding a layer of customization to the email sending process.
- **Email Generation and Data Storage**: The system is capable of generating emails based on the selected jobs and storing them efficiently for future reference.

### Email Generation Page

- **Job Details Panel**: This panel is designed for inputting and editing details specific to each job, ensuring that the emails generated are accurate and relevant.
- **AI Feedback Mechanism**: Users can provide feedback on the AI-generated emails, which is crucial for the continuous improvement of the AI system.
- **Preview and Regeneration of Emails**: Users are offered a preview of the email content with the option to regenerate it, ensuring satisfaction with the final output.


## Technical Architecture
<p align="center">
    <img src="readme_images/arch-diagram.svg" alt="Architecture Diagram" width="900" height="500">
</p>

### Front-End

- **JavaScript with React**: The front-end is built using JavaScript and React, focusing on a responsive and intuitive interface.

### Back-End

- **Python with Flask**: The back-end is developed using Python and Flask, ensuring effective data handling and server operations.

### Database

- **SQLite**: Used for storing email content and user inputs, facilitating data management and retrieval.

### AI Engine

- **OpenAI ChatGPT**: Integrated for intelligent and personalized email content generation.

### Hosting

- **AWS Amplify**: Open AI capabilites are disabled.

# Setup Guide

## Pre-requisites

- Python3
- node v18.18.0 (npm v10.1.0)

---

## Backend Setup

### Step 1: Create a Python Virtual Environment
Navigate to the project directory and execute the following command to create a Python virtual environment:
```bash
python3 -m venv myenv
```
### Step 2: Activate the Virtual Environment
On macOS and Linux:
```bash
source myenv/bin/activate
```
On Windows:
```bash
.\myenv\Scripts\activate
```
### Step 3: Install Python Dependencies
```bash
pip install  openai Flask Flask-CORS sqlite3
```
## Frontend Setup

### Step 4: Install Node Dependencies
In the root directory of the project, run:
```bash
npm install
```

## Running the App
### Step 5: Start the Backend
Navigate to the src directory and run:
```bash
cd src
python app.py
```
### Step 6: Start the Frontend
Open another terminal window, navigate to the src folder in the project directory and run:
```bash
npm run dev
```
The React app should now be up and running.


