import csv
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from flask_cors import cross_origin
import sqlite3
from datetime import datetime
import os

# Constants for API call limits
MAX_CALLS_PER_5_MINUTES = 5
MAX_CALLS_PER_DAY = 20


openai.api_key = "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"

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:1234"}}, supports_credentials=True)
user_onboarded = False
# Read the CSV file during application startup
csv_file_path = 'sample_contacts.csv'
csv_data = []
##The headers are Prospect Name	Company Name	Company URL	Prospect Industry	Prospect Linkedin URL	Prospect Bio	Prospect Title
try:
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            csv_data.append(row)
except Exception as e:
    print(f"Error importing CSV: {str(e)}")

if os.path.exists("emails.db"):
    os.remove("emails.db")



def init_db():
    conn = sqlite3.connect("emails.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            JobIndex INTEGER,
            JobTitle TEXT,
            Location TEXT,
            CandidateFullName TEXT,
            EmailBody TEXT,
            TimeSent TEXT
        );
        """
    )
    cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS api_call_tracking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        call_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    )
    conn.commit()
    conn.close()

init_db()

def record_api_call():
    conn = sqlite3.connect("emails.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO api_call_tracking (id) VALUES (NULL)")
    conn.commit()
    conn.close()

def can_make_api_call():
    conn = sqlite3.connect("emails.db")
    cursor = conn.cursor()
    # Check calls in the last 5 minutes
    cursor.execute("SELECT COUNT(*) FROM api_call_tracking WHERE call_time >= datetime('now', '-5 minutes')")
    calls_last_5_minutes = cursor.fetchone()[0]
    # Check calls in the current day
    cursor.execute("SELECT COUNT(*) FROM api_call_tracking WHERE date(call_time) = date('now')")
    calls_today = cursor.fetchone()[0]
    conn.close()

    return calls_last_5_minutes < MAX_CALLS_PER_5_MINUTES and calls_today < MAX_CALLS_PER_DAY


@cross_origin(origin='http://localhost:1234')
@app.route('/api/generate_bulk_emails', methods=['POST'])
def generate_bulk_emails():
    jobs = request.json.get('jobs', [])
    userData = request.json.get('userData', {})
    selectedJobIndexes = request.json.get('selectedJobIndexes', [])
    feedbackFramesGlobal = request.json.get('feedbackFramesGlobal', [])
    numberOfRecipients = int(request.json.get('numberOfRecipients', 1))
    if can_make_api_call() and numberOfRecipients < 5:

        if len(csv_data) < numberOfRecipients:
                return jsonify({"error": "Not enough candidates in the CSV file"}), 400

        print("Jobs:", jobs)
        print("UserData:", userData)
        print("SelectedJobIndexes:", selectedJobIndexes)
        print("FeedbackFramesGlobal:", feedbackFramesGlobal)
        print("NumberOfRecipients:", numberOfRecipients)
        if not jobs or not userData:
            return jsonify({"error": "Missing jobs or userData"}), 400
        
        conn = sqlite3.connect("emails.db")
        cursor = conn.cursor()

        try:
            for idx in selectedJobIndexes:
                jobFormData = jobs[idx]
                feedbackFrames = feedbackFramesGlobal.get(str(idx), [])

                for i in range(numberOfRecipients):
                    candidate_data = csv_data[i]  # Assuming csv_data is sorted appropriately

                    prompt = (f"Craft a 4-sentence personalized email for a candidate named {candidate_data.get('Prospect Name')} who currently works as a {candidate_data.get('Prospect Title')} at {candidate_data.get('Company Name')}. "
                            f"Introduce them to the {jobFormData.get('jobTitle', '')} role at {userData.get('company', '')}. "
                            f"Job Responsibilities: {jobFormData.get('jobResponsibilities', '')} "
                            f"Skills Needed: {jobFormData.get('skills', '')}. "
                            f"Also, convey the company's values and mottos: {userData.get('companyMottos', '')}. "
                            f"Company mission: {userData.get('missionStatement', '')}. "
                            f"Finish by encouraging them to explore the role given the location {jobFormData.get('location', '')} and provide a warm closing.")
                    
                    for frame in feedbackFrames:
                        prompt += f"I also have the following requests for the email: {frame}"
                    
                    system_message = f"You are an email-writing assistant. For a recruiter named {userData.get('fullName', '')}. You will receive a prompt and you will write a 4-sentence email to a prospect. Use a professional tone. Do not include a subject line."
                    print("Prompt:", prompt)
                    response = openai.ChatCompletion.create(
                        model="gpt-3.5-turbo",
                        messages=[
                            {"role": "system", "content": system_message},
                            {"role": "user", "content": prompt},
                        ],
                        max_tokens=300,
                        temperature=0.7,
                        top_p=0.8
                    )
                    if response.get('error'):
                        print(f"OpenAI API Error: {response['error']}")
                    print("OpenAI Response:", response)

                    
                    email_body = response.choices[0].message["content"].strip()
                    time_sent = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    cursor.execute(
                        "INSERT INTO emails (JobIndex, JobTitle, Location, CandidateFullName, EmailBody, TimeSent) VALUES (?, ?, ?, ?, ?, ?)",
                        (idx, jobFormData.get('jobTitle'), jobFormData.get('location'), candidate_data.get('Prospect Name'), email_body, time_sent)
                    )
                    record_api_call()
            
            conn.commit()
        except Exception as e:
            print("Exception occurred:", e)
            conn.rollback()
            return jsonify({"error": str(e)}), 500
        finally:
            conn.close()
        return jsonify({"message": "Emails generated and saved to database successfully"}), 200
    else:
        return jsonify({"message": "Requested number of recipients exceeds daily API limit"}), 400


@cross_origin(origin='http://localhost:1234')
@app.route('/api/generate_preview_email', methods=['POST'])
def generate_preview_email():
    print("Generating preview email")
    if not can_make_api_call():
        return jsonify({"error": "Daily API limit exceeded"}), 400
    jobFormData = request.json.get('jobFormData')
    userData = request.json.get('userData')
    candidate_data = csv_data[44]  # Using the 46th row as the candidate data

    if not jobFormData or not userData:
        return jsonify({"error": "Missing jobFormData or userData"}), 400

    # Extract feedback frame messages
    feedback_frames = request.json.get('feedbackFrames', [])

    # Create a prompt including feedback frame messages
    prompt = (f"Craft a 4-sentence personalized email for a candidate named {candidate_data.get('Prospect Name')} who currently works as a {candidate_data.get('Prospect Title')} at {candidate_data.get('Company Name')}. "
              f"Introduce them to the {jobFormData.get('jobTitle', '')} role at {userData.get('company', '')}. "
              f"Job Responsibilities: {jobFormData.get('jobResponsibilities', '')} "
              f"Skills Needed: {jobFormData.get('skills', '')}. "
              f"Also, convey the company's values and mottos: {userData.get('companyMottos', '')}. "
              f"Company mission: {userData.get('missionStatement', '')}. "
              f"Finish by encouraging them to explore the role given the location {jobFormData.get('location', '')} and provide a warm closing.")

    # Add feedback frame messages to the prompt
    for frame in feedback_frames:
        prompt += f"I also have the following requests for the email: {frame}"

    system_message = f"You are an email-writing assistant. For a recruiter named {userData.get('fullName', '')}. You will receive a prompt and you will write a 4-sentence email to a prospect. Use a professional tone."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt},
            ],
            max_tokens=300,
            temperature=0.7,
            top_p=0.8
        )
    except openai.error.APIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500
    message = response.choices[0].message["content"].strip()
    print("Generating preview email")
    record_api_call()
    return jsonify({"message": message}), 200

# Create a route to notify the backend when a user is onboarded
@cross_origin(origin='http://localhost:1234')
@app.route('/api/onboard', methods=['POST'])
def onboard_user():
    global user_onboarded  # Declare as global
    user_onboarded = True
    return jsonify(message='User onboarded successfully'), 200

@cross_origin(origin='http://localhost:1234')
@app.route('/api/check_onboard', methods=['GET'])
def check_onboard():
    return jsonify(user_onboarded), 200


if __name__ == '__main__':
    app.run(debug=True)
