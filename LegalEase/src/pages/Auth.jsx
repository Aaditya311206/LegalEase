import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, ArrowRight, Gavel, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', email.split('@')[0]);
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  // ✅ Defining Guardian-themed features locally to ensure "AI" is removed
  const guardianFeatures = [
    "Precision risk detection engine",
    "Instant clear-language simplification",
    "Bank-grade data encryption & privacy"
  ];

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* ⬅️ LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-red-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-600 p-2.5 rounded-xl shadow-lg shadow-red-600/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-widest uppercase">LegalEase</span>
          </div>

          <h2 className="text-4xl font-black text-white leading-tight mb-8 tracking-tight">
            Understand your contracts before you sign them.
          </h2>

          <div className="space-y-6">
            {guardianFeatures.map((text, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="font-semibold text-lg tracking-wide">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
            <p className="text-slate-400 italic text-sm leading-relaxed">
              "{t('auth_quote')}"
            </p>
            <p className="text-white font-black mt-4 text-[10px] uppercase tracking-[0.3em]">— {t('auth_author')}</p>
          </div>
        </div>
      </div>

      {/* ➡️ RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="lg:hidden flex justify-center mb-8">
             <div className="bg-red-600 p-2.5 rounded-xl shadow-xl">
                <ShieldCheck className="w-8 h-8 text-white" />
             </div>
          </div>
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {t('auth_subtitle')}
            </h2>
            <p className="text-slate-500 mt-3 font-medium">
                Enter your credentials to access your personal legal guardian.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {t('email_label')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-red-600 focus:ring-0 outline-none transition-all shadow-sm font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    {t('password_label')}
                </label>
                <button type="button" className="text-xs font-black text-red-600 hover:text-red-700 transition-colors uppercase tracking-widest">
                    {t('forgot_password')}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-red-600 focus:ring-0 outline-none transition-all shadow-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-2xl transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] uppercase tracking-[0.2em] text-xs mt-4"
            >
              {t('login_btn')} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative my-10 text-center">
            <span className="relative z-10 bg-gray-50 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Or continue with</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-0"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 text-slate-700 transition-all font-bold text-xs bg-white active:scale-95 uppercase tracking-widest">
              <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 text-slate-700 transition-all font-bold text-xs bg-white active:scale-95 uppercase tracking-widest">
              <img src="https://authjs.dev/img/providers/apple.svg" className="w-5 h-5" alt="Apple" />
              Apple
            </button>
          </div>

          <p className="text-center mt-12 text-slate-500 text-sm font-medium">
            {t('no_account')} 
            <Link 
              to="/signup" 
              className="text-red-600 font-black ml-2 cursor-pointer hover:underline decoration-2 underline-offset-4"
            >
              {t('create_account')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}