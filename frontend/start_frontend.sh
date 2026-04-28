#!/bin/bash

# Student Compass Frontend Startup Script
# This script serves as an executable prompt to run the frontend application

echo "========================================="
echo "  Student Compass Frontend Application   "
echo "========================================="
echo ""
echo "This script will start the frontend development server."
echo ""
echo "Prerequisites:"
echo "  - Node.js and npm must be installed"
echo "  - All dependencies must be installed (npm install)"
echo "  - Backend server should be running on port 8001"
echo ""
echo "Features:"
echo "  - AI-Powered Career Mentor Chat"
echo "  - Personalized Roadmaps"
echo "  - Interactive Flowcharts"
echo "  - Dark/Light Theme Support"
echo "  - Fully Responsive Design"
echo ""
echo "Technology Stack:"
echo "  - React 18.2.0"
echo "  - Tailwind CSS 3.3.6"
echo "  - Framer Motion 12.23.24"
echo "  - React Router 6.8.1"
echo ""
echo "Starting frontend server..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm to continue."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules directory not found."
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
    echo "✅ Dependencies installed successfully."
    echo ""
fi

echo "🚀 Starting frontend development server..."
echo "The application will be available at http://localhost:3000"
echo "Press CTRL+C to stop the server"
echo ""

# Start the development server
npm start