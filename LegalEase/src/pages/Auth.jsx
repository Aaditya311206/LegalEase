import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Gavel, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

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
            <div className="bg-red-600 p-2 rounded-xl">
              <Gavel className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase tracking-widest">LegalEase</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            {t('auth_title')}
          </h2>

          <div className="space-y-6">
            {[
              t('auth_feature_1'),
              t('auth_feature_2'),
              t('auth_feature_3')
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-red-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <p className="text-slate-400 italic text-sm">
              "{t('auth_quote')}"
            </p>
            <p className="text-white font-bold mt-4 text-xs uppercase tracking-widest">— {t('auth_author')}</p>
          </div>
        </div>
      </div>

      {/* ➡️ RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="lg:hidden flex justify-center mb-8">
             <div className="bg-red-600 p-2 rounded-xl shadow-lg">
                <Gavel className="w-8 h-8 text-white" />
             </div>
          </div>
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {t('auth_subtitle')}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
                {t('auth_desc')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t('email_label')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all shadow-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                    {t('password_label')}
                </label>
                <button type="button" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
                    {t('forgot_password')}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-red-600/10 active:scale-[0.98] uppercase tracking-wider text-sm"
            >
              {t('login_btn')} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative my-8 text-center">
            <span className="relative z-10 bg-gray-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-0"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm hover:border-slate-300 text-slate-700 transition-all font-bold text-sm bg-white">
              <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm hover:border-slate-300 text-slate-700 transition-all font-bold text-sm bg-white">
              <img src="https://authjs.dev/img/providers/apple.svg" className="w-5 h-5" alt="Apple" />
              Apple
            </button>
          </div>

          <p className="text-center mt-10 text-slate-500 text-sm font-medium">
            {t('no_account')} <span className="text-red-600 font-bold cursor-pointer hover:underline decoration-2">{t('create_account')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}