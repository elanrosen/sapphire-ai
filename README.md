# Sapphire AI: AI-Powered Recruitment Assistant

## Overview

Sapphire AI is a tool designed to automate the recruitment process by utilizing artificial intelligence. It focuses on generating personalized emails and managing recruitment data, aiming to simplify the outreach process to potential candidates.

### Important Note

For me this project served as an opportunity for me to improve my front-end software engineering skills, leading to a product with a polished and user-friendly interface. Consequently, the back-end development, while functional, is less comprehensive, reflecting the focus on the aesthetic and interactive aspects of the application.

A secondary goal of this project was to explore the Open AI API and potential for sales and marketing technology.

## Table of Contents

1. [Background](#background)
3. [Key User Flows](#key-user-flows)
4. [Capabilities](#capabilities)
5. [Technical Architecture](#technical-architecture)
6. [Setup Guide](#setup-guide)


## Background

Recruitment is a critical yet often cumbersome process for many organizations. Traditional methods involve significant manual effort in reaching out to potential candidates, particularly in personalizing communication. Sapphire AI addresses this challenge by automating the creation and distribution of personalized job outreach emails, thereby streamlining the recruitment workflow.


## Key User Flows

### 1. User Onboarding Flow

- **Step 1**: User inputs user & company information, including business nature and hiring roles.
- **Step 2**: The system stores this information for future reference in email personalization.

### 2. Job Management Flow

- **Step 1**: User accesses the Jobs Page to view current job listings.
- **Step 2**: User adds new job listings as needed, which are then displayed on the Jobs Page.

### 3. Email Generation and Sending Flow

- **Step 1**: User selects the desired jobs for which to generate recruitment emails.
- **Step 2**: User chooses the number of recipients for each email.
- **Step 3**: The system "sends" the emails to identified recipients. (assumes black-box AI to identify recipients)

### 4. Feedback Submission Flow

- **Step 1**: After generating a preview email, the user submits feedback on them.
- **Step 2**: The system utilizes this feedback to improve future email generations.

## Capabilities

The current implementation of Sapphire AI includes a variety of capabilities. However, it's important to note that several elements in the user interface serve as placeholders to demonstrate potential features. The actual functionalities implemented in this demo are as follows:

### Onboarding

- **User Input Form**: Allows users to enter details about their business and recruitment needs, which are stored for future reference.
- **Data Storage**: Information entered during onboarding is saved for subsequent use in email generation.

### Jobs Page

- **Job Listings**: Displays saved job listings in a tabular format.
- **Email Generation Navigation**: Clicking a job listing navigates to the email generation page for that job.
- **Job Addition Feature**: Includes a button to add new job listings.

### Email Operations

- **Email Selection and Sending**: Facilitates the selection of jobs and initiation of the email sending process.
- **Send Email Overlay**: A feature to select the number of email recipients.
- **Email Generation and Storage**: Generates and stores emails based on selected jobs.

### Email Generation Page

- **Job Details Panel**: Enables input and editing of job-specific details.
- **AI Feedback Panel**: Allows users to provide feedback on the AI-generated emails.
- **Email Preview and Regeneration**: Offers a preview of the email content and the option to regenerate it.

## Technical Architecture

<img src="readme_images/arch-diagram.svg" alt="Architecture Diagram" width="600" height="400">

### Front-End

- **JavaScript with React**: The front-end is built using JavaScript and React, focusing on a responsive and intuitive interface.

### Back-End

- **Python with Flask**: The back-end is developed using Python and Flask, ensuring effective data handling and server operations.

### Database

- **SQLite**: Used for storing email content and user inputs, facilitating data management and retrieval.

### AI Engine

- **OpenAI ChatGPT**: Integrated for intelligent and personalized email content generation.

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


