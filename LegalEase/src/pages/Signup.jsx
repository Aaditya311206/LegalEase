import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Gavel, CheckCircle2, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Saving the data for the Navbar to pick up
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', name || email.split('@')[0]);
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* ⬅️ LEFT PANEL (Matching Auth) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-600 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-600 p-2 rounded-xl"><Gavel className="w-8 h-8 text-white" /></div>
            <span className="text-2xl font-black text-white uppercase tracking-widest">LegalEase</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">Create your account</h2>
          <div className="space-y-6">
            {['Access all legal tools', 'Verify documents in seconds', 'Stay updated on policies'].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-red-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ➡️ RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Join LegalEase</h2>
            <p className="text-slate-500 mt-2 font-medium">Start your professional legal journey today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans text-left">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-red-600 outline-none transition-all shadow-sm" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans text-left">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-red-600 outline-none transition-all shadow-sm" placeholder="name@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans text-left">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-red-600 outline-none transition-all shadow-sm" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider text-sm mt-4">
              Register Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-10 text-slate-500 text-sm font-medium">
            Already have an account? <Link to="/auth" className="text-red-600 font-bold ml-1 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}