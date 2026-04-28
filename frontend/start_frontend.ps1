# Student Compass Frontend Startup Script
# This script serves as an executable prompt to run the frontend application

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Student Compass Frontend Application   " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will start the frontend development server."
Write-Host ""
Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "  - Node.js and npm must be installed"
Write-Host "  - All dependencies must be installed (npm install)"
Write-Host "  - Backend server should be running on port 8001"
Write-Host ""
Write-Host "Features:" -ForegroundColor Yellow
Write-Host "  - AI-Powered Career Mentor Chat"
Write-Host "  - Personalized Roadmaps"
Write-Host "  - Interactive Flowcharts"
Write-Host "  - Dark/Light Theme Support"
Write-Host "  - Fully Responsive Design"
Write-Host ""
Write-Host "Technology Stack:" -ForegroundColor Yellow
Write-Host "  - React 18.2.0"
Write-Host "  - Tailwind CSS 3.3.6"
Write-Host "  - Framer Motion 12.23.24"
Write-Host "  - React Router 6.8.1"
Write-Host ""
Write-Host "Starting frontend server..." -ForegroundColor Green
Write-Host ""

# Check if node is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js to continue." -ForegroundColor Red
    pause
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm to continue." -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules directory not found." -ForegroundColor Yellow
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies." -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "✅ Dependencies installed successfully." -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 Starting frontend development server..." -ForegroundColor Green
Write-Host "The application will be available at http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press CTRL+C to stop the server" -ForegroundColor Cyan
Write-Host ""

# Start the development server
npm start