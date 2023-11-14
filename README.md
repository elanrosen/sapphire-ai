# Sapphire AI: AI-Powered Recruitment Assistant

## Table of Contents

1. [Overview](#overview)
2. [Capabilities](#capabilities)
3. [Key User Flows and Functional Requirements](#key-user-flows-and-functional-requirements)
4. [Technical Architecture](#technical-architecture)

## Overview

Sapphire AI is a tool designed to automate the recruitment process by utilizing artificial intelligence. It focuses on generating personalized emails and managing recruitment data, aiming to simplify the outreach process to potential candidates.

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

## Key User Flows and Functional Requirements

### User Onboarding

1. **Entering Business Information**: Users start by entering details about their company, including the nature of their business and the types of roles they are hiring for.
2. **Data Storage**: This information is stored and used to personalize the recruitment emails.

### Job Management

1. **Viewing Job Listings**: Users can view all entered job listings on the Jobs Page.
2. **Adding New Jobs**: Users can add new job listings, which will then appear on the Jobs Page.

### Email Generation and Sending

1. **Selecting Jobs for Emailing**: Users can select one or several jobs for which they wish to send out recruitment emails.
2. **Customizing Email Recipients**: Users can choose the number of recipients for each email.
3. **Email Creation and Review**: The system generates emails, which can then be reviewed and modified if necessary.

### Feedback and AI Improvement

1. **Providing Feedback on Emails**: After reviewing the generated emails, users can provide feedback, which is used to improve future email generations.

## Technical Architecture

### Front-End

- **JavaScript with React**: The front-end is built using JavaScript and React, focusing on a responsive and intuitive interface.

### Back-End

- **Python with Flask**: The back-end is developed using Python and Flask, ensuring effective data handling and server operations.

### Database

- **SQLite**: Used for storing email content and user inputs, facilitating data management and retrieval.

### AI Engine

- **OpenAI ChatGPT**: Integrated for intelligent and personalized email content generation.