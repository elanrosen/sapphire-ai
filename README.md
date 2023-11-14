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


