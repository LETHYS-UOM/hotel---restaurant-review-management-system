import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SideBar';
import ReviewsPage from './pages/ReviewsPage';
import DashboardPage from './pages/DashboardPage';
import ReviewSourcesPage from './pages/ReviewSourcesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes - standalone without sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Main app routes with sidebar */}
        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/sources" element={<ReviewSourcesPage />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;