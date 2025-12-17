import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SideBar'; // Fixed "SideBar" to "Sidebar"
import ReviewsPage from './pages/ReviewsPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    // 1. Router wraps EVERYTHING
    <BrowserRouter>
      <div className="app-container">
        
        {/* 2. Sidebar sits here ONCE. Inside Router so links work */}
        <Sidebar />

        <main className="main-content">
          <Routes>
            {/* Redirect root "/" to Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* The actual pages */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;