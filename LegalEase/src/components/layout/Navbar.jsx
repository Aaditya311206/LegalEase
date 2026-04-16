import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, User, ChevronDown, Gavel, ShieldCheck, Settings } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // ✅ DYNAMIC DATA: Pulling exactly what Auth.jsx saves
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userName = localStorage.getItem('userName'); 
  const userPicture = localStorage.getItem('userPicture');
  const userEmail = localStorage.getItem('userEmail'); 

  const handleLogout = () => {
    localStorage.clear();
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
    text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-200 relative pb-1
    ${isActive(path) 
      ? 'text-red-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-600 after:rounded-full' 
      : 'text-slate-500 hover:text-red-600'}
  `;

  return (
    <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 rounded-lg shadow-lg group-hover:rotate-3 transition-transform">
            <Gavel className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">
            Legal<span className="text-red-600">Ease</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLinkClass('/')}>{t('home') || 'Home'}</Link>
          {isAuthenticated && <Link to="/checker" className={navLinkClass('/checker')}>{t('checker') || 'Checker'}</Link>}
          <Link to="/policies" className={navLinkClass('/policies')}>{t('policies') || 'Policies'}</Link>
          {isAuthenticated && <Link to="/dashboard" className={navLinkClass('/dashboard')}>{t('dashboard') || 'Dashboard'}</Link>}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {!isAuthenticated ? (
            <Link to="/auth" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
              <User className="w-4 h-4" />
              {t('sign_in') || 'Sign In'}
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-slate-50">
                  {userPicture ? (
                    <img src={userPicture} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-3xl border border-slate-100 shadow-2xl z-50 overflow-hidden">
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-md overflow-hidden bg-white">
                        {userPicture ? (
                           <img src={userPicture} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center bg-slate-100"><User className="text-slate-300 w-6 h-6" /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1">
                           {/* ✅ DYNAMIC NAME */}
                           <p className="font-black text-slate-900 text-[11px] truncate uppercase tracking-tight">{userName || "Guest User"}</p>
                           <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        {/* ✅ DYNAMIC EMAIL */}
                        <p className="text-[10px] text-slate-400 font-bold truncate lowercase mt-0.5">{userEmail || "no-email@google.com"}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-1.5 border border-slate-100 inline-flex items-center gap-2 shadow-sm">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Premium Plan</span>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-all">
                      <Settings className="w-4 h-4" /> Account Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-red-600 hover:bg-red-50 transition-all mt-1">
                      <LogOut className="w-4 h-4" /> {t('logout') || 'Sign Out'}
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