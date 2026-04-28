# Student Compass Frontend

This is the frontend component of the Student Compass application, an AI-powered career guidance platform built with React, Tailwind CSS, and Framer Motion.

## Project Overview

Student Compass is a comprehensive career guidance platform that helps students navigate their career paths through AI-powered recommendations, personalized roadmaps, and interactive mentorship.

## Key Features

1. **AI-Powered Career Mentor** - Interactive chat interface with Gemini AI for personalized career advice
2. **Personalized Roadmaps** - Step-by-step career guidance based on skills and interests
3. **Interactive Flowcharts** - Visual representation of career paths and skill development
4. **Dark/Light Theme** - User preference-based theme switching
5. **Responsive Design** - Mobile-first approach for all device sizes

## Technology Stack

- **React** (v18.2.0) - Core frontend library
- **Tailwind CSS** (v3.3.6) - Utility-first CSS framework
- **Framer Motion** (v12.23.24) - Animation library
- **React Router** (v6.8.1) - Client-side routing
- **Axios** (v1.6.2) - HTTP client for API requests

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── App.js              # Main application component
│   └── index.js            # Entry point
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
Removes the single build dependency from your project.

## Executable Prompts

For easier startup, we've provided several executable prompt scripts:

### Windows Batch File
```
start_frontend.bat
```
Double-click this file to automatically check dependencies and start the frontend server.

### PowerShell Script
```
start_frontend.ps1
```
Run this script in PowerShell to automatically check dependencies and start the frontend server with colored output.

### Bash Script
```
start_frontend.sh
```
Run this script in bash environments (WSL, Git Bash, macOS, Linux) to automatically check dependencies and start the frontend server.

## Components Overview

### Main Pages
1. **Landing** - Home page with platform introduction
2. **Roadmap** - Career pathway visualization
3. **Flowchart** - Interactive career flow diagrams
4. **Mentor** - AI-powered career mentor chat interface

### Key Components
1. **Navbar** - Navigation with theme toggle
2. **AIChatBot** - Floating chat interface
3. **ThemeToggle** - Dark/light mode switcher

## API Integration

The frontend communicates with the backend API at `http://localhost:8001` for all AI-powered features including:
- Career analysis
- Roadmap generation
- Mentor chat functionality
- Skill recommendations

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:8001
```

## Responsive Design

The application is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Development Guidelines

1. **Component Structure** - Use functional components with hooks
2. **Styling** - Use Tailwind CSS classes exclusively
3. **State Management** - Use React Context for global state
4. **API Calls** - Use the centralized api.js service
5. **Animations** - Use Framer Motion for smooth transitions

## Deployment

The app can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages) by running `npm run build` and serving the build folder.

## Troubleshooting

1. **Port Conflicts** - If port 3000 is in use, the app will prompt for an alternative port
2. **API Connection** - Ensure the backend server is running on port 8001
3. **Missing Dependencies** - Run `npm install` to install all required packages

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).