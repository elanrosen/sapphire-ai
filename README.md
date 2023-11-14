# Sapphire AI: AI-Powered Recruitment Assistant

## Overview

Sapphire AI is an innovative solution designed to revolutionize the recruitment process. Leveraging the power of artificial intelligence and natural language processing (NLP), Sapphire AI assists recruitment teams in automating and personalizing their outreach efforts. This project demonstrates a full-stack application that embodies the potential of AI in enhancing efficiency and personalization in recruitment.

## Project Context

### Background

Recruitment is a critical yet often cumbersome process for many organizations. Traditional methods involve significant manual effort in reaching out to potential candidates, particularly in personalizing communication. Sapphire AI addresses this challenge by automating the creation and distribution of personalized job outreach emails, thereby streamlining the recruitment workflow.

### Key Qualities Addressed

This project primarily focuses on the following qualities:

1. **Technical Proficiency**: Showcasing full-stack development skills.
2. **Effective Communication**: Demonstrating the capability of AI in crafting clear and personalized messages.
3. **Problem-Solving**: Addressing the real-world challenge of recruitment efficiency.

## Project Components

Sapphire AI consists of several key components, each contributing to a seamless recruitment experience:

### 1. Onboarding Ruby's AI

The onboarding process is designed to be user-friendly, allowing Sapphire AI to learn crucial details about the hiring business. This includes job positions, company ethos, location, desired seniority, and the brand's voice/style. The gathered information is stored for future reference in email generation.

### 2. Email Operations

Sapphire AI excels in generating personalized emails for recruitment. It uses the data gathered during onboarding to tailor emails that resonate with each candidate's background and the job's specifics. These emails are not sent directly but are saved in a database.

### 3. Collecting and Using Feedback

Feedback is an integral part of Sapphire AI's learning process. The system allows recruiters to provide feedback on the generated messages, which is used to refine and improve future communications.

## Project Features

### Onboarding

- Easy-to-use form to input business and job-related information.
- Data saved for future use in email generation.

### Jobs Page

- Displays a list of saved jobs.
- Directs to specific job email generation pages.
- Features an "Add Job" option for new entries.

### Email Operations

- Email generation for selected jobs.
- Overlay for selecting the number of recipients.
- Generated emails stored in a backend database.

### Email Generation Page

- Panel for inputting and editing job details.
- AI feedback mechanism for refining email content.
- Preview and regeneration options for emails.

### UI/UX

- Emphasis on user-friendly and intuitive design.
- Additional features to enhance realism and user experience.

## Technical Architecture

### Front-End

- Developed using JavaScript with React, focusing on a responsive and intuitive user interface.

### Back-End

- Python with Flask framework, ensuring robust and efficient server-side operations.

### Database

- SQLite for storing information about sent emails and user inputs.

### AI Engine

- Integration with OpenAI's ChatGPT for intelligent and context-aware email content generation.

## Conclusion

Sapphire AI exemplifies the practical application of AI in the modern recruitment process. It stands as a testament to the potential of AI in transforming traditional business operations, making them more efficient, personalized, and user-friendly. This project not only showcases technical prowess in full-stack development but also highlights the innovative use of AI in solving real-world problems.