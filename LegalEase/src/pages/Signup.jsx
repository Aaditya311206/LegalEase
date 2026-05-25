import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Gavel, CheckCircle2, User, AlertCircle, ShieldCheck } from 'lucide-react'; // ✅ Fixed: Added ShieldCheck import reference here
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient'; // ✅ Import Supabase bridge

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState(null); // ✅ State to track backend errors

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError(null); // Clear errors before sending request

    try {
      // 🚀 Send sanitized signup data to Supabase Backend Auth Engine
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(), // ✅ Fixed: Cleans trailing spaces and forces lowercasing
        password: password,
        options: {
          data: {
            full_name: name, // Securely stores their text name inside metadata profile
          },
        },
      });

      if (error) {
        setServerError(error.message); // Catch backend errors (e.g., password too short)
      } else {
        // Fallback sync to local state matching your Navbar layout session
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', name || email.trim().toLowerCase().split('@')[0]);
        localStorage.setItem('userEmail', email.trim().toLowerCase());
        
        // Let the user know an activation link has been dispatched
        alert(t('signup_success', 'Account registered successfully! Please check your email inbox to verify your account link.'));
        navigate('/dashboard');
      }
    } catch (err) {
      setServerError(t('connection_error', 'Failed to establish connection with the Auth engine server.'));
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-left">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-600 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-600 p-2.5 rounded-xl shadow-lg"><ShieldCheck className="w-8 h-8 text-white" /></div>
            <span className="text-2xl font-black text-white uppercase tracking-widest">LegalEase</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">{t('create_account_title', 'Create your account')}</h2>
          <div className="space-y-6">
            {[t('signup_feat_1', 'Access all legal tools'), t('signup_feat_2', 'Verify documents in seconds'), t('signup_feat_3', 'Stay updated on policies')].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 text-left">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
          {/* ✅ FIXED LOWERCASE KEYS HERE TOO */}
          <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
            <p className="text-slate-400 italic text-sm leading-relaxed text-left">
              "{t('auth_quote')}"
            </p>
            <p className="text-white font-black mt-4 text-[10px] uppercase tracking-[0.3em] text-left">
              — {t('auth_author')}
            </p>
          </div>
        </div>
      </div>

      {/* ➡️ RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 text-left">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('join_legalease', 'Join LegalEase')}</h2>
            <p className="text-slate-500 mt-2 font-medium">{t('signup_desc', 'Start your professional legal journey today.')}</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans">{t('full_name', 'Full Name')}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 focus:border-red-600 outline-none transition-all shadow-sm" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans">{t('email_label', 'Email Address')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 focus:border-red-600 outline-none transition-all shadow-sm" placeholder="name@company.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans">{t('password_label', 'Password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 focus:border-red-600 outline-none transition-all shadow-sm" placeholder="••••••••" />
              </div>
            </div>

            {/* ✅ DYNAMIC ERROR BANNER IF BACKEND REJECTS INPUT */}
            {serverError && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wide text-left">{serverError}</span>
              </div>
            )}

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider text-sm mt-4">
              {t('register_btn', 'Register Account')} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-10 text-slate-500 text-sm font-medium">
            {t('already_account', 'Already have an account?')} <Link to="/auth" className="text-red-600 font-bold ml-1 hover:underline">{t('login_btn', 'Sign In')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}