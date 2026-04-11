import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import DocumentChecker from './pages/DocumentChecker'; 
import PolicyTracker from './pages/PolicyTracker'; 
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
      Legal Intelligence, <span className="text-primary">Simplified.</span>
    </h1>
    <p className="text-xl text-gray-500 max-w-2xl mb-8">
      Upload your legal documents and let AI instantly detect risks, missing clauses, and unfair terms before you sign.
    </p>
    {/* Show Get Started if not logged in, otherwise go to Checker */}
    <a href={localStorage.getItem('isAuthenticated') ? "/checker" : "/auth"} 
       className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-sm">
      Start Analyzing Now
    </a>
  </div>
);

// 🚨 THE GATEKEEPER: This component blocks users who aren't logged in 🚨
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
            {/* Public Routes (Anyone can see these) */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/policies" element={<PolicyTracker />} /> 
            
            {/* Protected Routes (Must be logged in to see these) */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/checker" 
              element={<ProtectedRoute><DocumentChecker /></ProtectedRoute>} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;