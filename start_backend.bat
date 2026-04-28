@echo off
echo Starting Student Compass Backend...
echo ==================================

REM Activate virtual environment if it exists
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
) else (
    echo Creating virtual environment...
    python -m venv .venv
    call .venv\Scripts\activate.bat
)

REM Install requirements if not already installed
echo Installing/updating Python dependencies...
pip install -r requirements.txt

REM Start the backend server
echo Starting FastAPI backend server on port 8001...
python main.py