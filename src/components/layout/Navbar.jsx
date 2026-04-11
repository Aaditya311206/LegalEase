import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Menu, User } from 'lucide-react';

export default function Navbar() {
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
            <Link to="/checker" className="text-gray-600 hover:text-primary transition-colors font-medium">Document Checker</Link>
            <Link to="/policies" className="text-gray-600 hover:text-primary transition-colors font-medium">Policies</Link>
            
            <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
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