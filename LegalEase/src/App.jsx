import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home'; 
import DocumentChecker from './pages/DocumentChecker'; 
import PolicyTracker from './pages/PolicyTracker'; 
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth'; 
import Signup from './pages/Signup'; // 🚨 NEW IMPORT ADDED

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            {/* 🚨 NEW ROUTE ADDED */}
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/policies" element={<PolicyTracker />} /> 
            
            <Route path="/checker" element={
              <ProtectedRoute>
                <DocumentChecker />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;