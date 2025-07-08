Bootcamp Score Tracker

A full-stack application for tracking and visualising bootcamp scoring data.
The backend ingests a CSV into a database and exposes a JSON API; the frontend displays the results in a bullseye chart.

Prerequisites
• Python 3.8+
• Node.js & npm
• (Optional) Git for cloning the repository

Backend Setup

Clone the repo
git clone https://github.com/HoodiNahi/BootcampScore_py.git
cd BootcampScore_py

Create & activate a virtual environment
Windows (PowerShell):
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
& .\venv\Scripts\Activate.ps1
macOS/Linux:
python3 -m venv venv
source venv/bin/activate

Install Python dependencies
pip install -r requirements.txt

Initialise the database (do this only once or any time you need a fresh DB)
py create_db.py
py seed.py

Run the backend server
uvicorn main:app --reload
The API will be available at http://127.0.0.1:8000
Interactive docs at http://127.0.0.1:8000/docs

Frontend Setup

Open a new terminal and navigate to the React app:
cd bootcamp-tracker

Install npm packages
npm install
npm install -D @tailwindcss/postcss

Start the development server
npm start
The UI will be at http://localhost:3000 and will automatically reload on code changes.

Project Structure

BootcampScore_py/
├── create_db.py # Initialises the SQLite/Postgres schema
├── seed.py # Populates the DB with example records
├── database.py # SQLAlchemy engine & declarative base
├── main.py # FastAPI app & route definitions
├── models.py # ORM model classes
├── requirements.txt # Python dependencies
└── bootcamp-tracker/ # React frontend source
├── package.json
├── src/
└── public/

Usage

Select a Pilot

Pick a Weapon/Date

View Passes in a table and a bullseye chart

All data is fetched live from the FastAPI backend.

Tips & Troubleshooting

• Virtualenv Activation Issues:
– Double-check you’re in the correct folder.
– In PowerShell, you may need:
Set-ExecutionPolicy -Scope Process RemoteSigned
& .\venv\Scripts\Activate.ps1

• Missing Packages:
If you see ModuleNotFoundError, re-run:
pip install -r requirements.txt

• Port Conflicts:
– Backend defaults to port 8000; frontend to 3000.
– You can change ports with --port (uvicorn) or set PORT=XXXX npm start.
