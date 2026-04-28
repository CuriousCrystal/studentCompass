@echo off
title Student Compass Frontend

echo =========================================
echo   Student Compass Frontend Application   
echo =========================================
echo.
echo This script will start the frontend development server.
echo.
echo Prerequisites:
echo   - Node.js and npm must be installed
echo   - All dependencies must be installed (npm install)
echo   - Backend server should be running on port 8001
echo.
echo Features:
echo   - AI-Powered Career Mentor Chat
echo   - Personalized Roadmaps
echo   - Interactive Flowcharts
echo   - Dark/Light Theme Support
echo   - Fully Responsive Design
echo.
echo Technology Stack:
echo   - React 18.2.0
echo   - Tailwind CSS 3.3.6
echo   - Framer Motion 12.23.24
echo   - React Router 6.8.1
echo.
echo Starting frontend server...
echo.

REM Check if node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js to continue.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm to continue.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo ✅ npm is installed
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ⚠️  node_modules directory not found.
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies.
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully.
    echo.
)

echo 🚀 Starting frontend development server...
echo The application will be available at http://localhost:3000
echo Press CTRL+C to stop the server
echo.

REM Start the development server
npm start