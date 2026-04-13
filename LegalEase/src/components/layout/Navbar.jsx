import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, User, ChevronDown, Gavel } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com"
};

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setDropdownOpen(false);
    navigate('/');
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const navLinkClass = (path) => `
    text-sm font-bold tracking-widest uppercase transition-all duration-200 relative pb-1
    ${isActive(path) 
      ? 'text-red-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-600 after:rounded-full' 
      : 'text-slate-600 hover:text-red-600'}
  `;

  return (
    <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 rounded-lg shadow-lg shadow-red-600/20 group-hover:rotate-3 transition-transform">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            Legal<span className="text-red-600">Ease</span>
          </span>
        </Link>

        {/* 2. REORDERED NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home */}
          <Link to="/" className={navLinkClass('/')}>
            {t('home') || 'Home'}
          </Link>

          {/* Checker */}
          {isAuthenticated && (
            <Link to="/checker" className={navLinkClass('/checker')}>
              {t('checker') || 'Checker'}
            </Link>
          )}

          {/* Policies */}
          <Link to="/policies" className={navLinkClass('/policies')}>
            {t('policies') || 'Policies'}
          </Link>

          {/* Dashboard (Moved to the end) */}
          {isAuthenticated && (
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              {t('dashboard') || 'Dashboard'}
            </Link>
          )}
        </div>

        {/* 3. ACTIONS */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {!isAuthenticated ? (
            <Link 
              to="/auth" 
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <User className="w-4 h-4" />
              {t('sign_in') || 'Sign In'}
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center border border-slate-300 shadow-sm transition-all">
                  <User className="w-6 h-6" />
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 animate-fade-in-down">
                  <div className="p-4 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-sm truncate">{mockUser.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Verified User</p>
                  </div>

                  <div className="p-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout') || 'Sign Out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}