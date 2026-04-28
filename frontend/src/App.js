import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Roadmap from "./pages/Roadmap";
import EnhancedRoadmap from "./pages/EnhancedRoadmap";
import SimplifiedUltimateRoadmap from "./pages/UltimateRoadmap";
import Flowchart from "./pages/Flowchart";
import Mentor from "./pages/Mentor";
import AIChatBot from "./components/AIChatBot";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen w-full transition-all duration-500 professional-background theme-text-primary pt-20 ${isDark ? 'dark' : 'light'}`}>
      <Navbar />
        
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/enhanced-roadmap" element={<EnhancedRoadmap />} />
        <Route path="/simplified-ultimate-roadmap" element={<SimplifiedUltimateRoadmap />} />
        <Route path="/flowchart" element={<Flowchart />} />
        <Route path="/mentor" element={<Mentor />} />
      </Routes>
      <AIChatBot />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}