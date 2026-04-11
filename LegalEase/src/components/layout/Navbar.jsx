import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Menu, User, LogOut } from 'lucide-react'; // 🆕 Added LogOut icon

export default function Navbar() {
  const navigate = useNavigate();
  
  // Check if the user is currently logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // 🆕 The Logout Function
  const handleLogout = () => {
    // 1. Clear the fake token from the browser
    localStorage.removeItem('isAuthenticated');
    
    // 2. Redirect back to the login page
    navigate('/auth');
    
    // 3. Refresh the page so the Navbar updates instantly
    window.location.reload(); 
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-gray-900 tracking-tight">
              Legal<span className="text-primary">Ease</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">Home</Link>
            
            {/* Only show Document Checker link if logged in */}
            {isAuthenticated && (
              <Link to="/checker" className="text-gray-600 hover:text-primary transition-colors font-medium">Document Checker</Link>
            )}
            
            <Link to="/policies" className="text-gray-600 hover:text-primary transition-colors font-medium">Policies</Link>
            
            {/* 🆕 Smart Buttons: Show Logout if logged in, Sign In if not */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-6 border-l pl-6 border-gray-200">
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-500 hover:text-red-600 font-medium transition-colors flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-l pl-6 border-gray-200">
                <Link to="/auth" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-primary">
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}