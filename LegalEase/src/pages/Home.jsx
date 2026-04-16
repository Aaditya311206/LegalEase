import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Gavel, Lock, ArrowRight, Zap, CheckCircle } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleStart = () => {
    navigate(isAuthenticated ? "/checker" : "/auth");
  };

  // ✅ Fix for overlapping: Increase leading (line-height) for non-English scripts
  const isEnglish = i18n.language === 'en';
  const headingStyle = isEnglish 
    ? "leading-[0.95] tracking-tighter" 
    : "leading-[1.2] md:leading-[1.3] tracking-normal";

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 🚀 HERO SECTION */}
      <section className="relative pt-24 pb-36 overflow-hidden bg-slate-900 text-center">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          
          {/* 🛡️ THE NEW CATCHY BADGE */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-black uppercase tracking-[0.2em] text-red-400 bg-red-400/10 border border-red-400/20 rounded-full shadow-lg shadow-red-900/20 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <ShieldCheck className="w-4 h-4 fill-current" /> 
            <span>YOUR PERSONAL LEGAL GUARDIAN</span>
          </div>

          <h1 className={`text-5xl md:text-8xl font-black text-white mb-8 ${headingStyle}`}>
            {t('home_title_main')} <br />
            <span className="text-red-600">{t('home_title_highlight')}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-medium leading-relaxed">
            {t('home_desc')}
          </p>

          <button 
            onClick={handleStart} 
            className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-red-600/20 active:scale-95"
          >
            {t('home_btn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 📊 FEATURES GRID */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <ShieldCheck className="w-8 h-8" />, 
              title: t('auth_feature_1'), 
              desc: "Identify liability traps, predatory clauses, and hidden legal risks instantly." 
            },
            { 
              icon: <Gavel className="w-8 h-8" />, 
              title: t('auth_feature_2'), 
              desc: "Ensure every document aligns with local laws and standard compliance protocols." 
            },
            { 
              icon: <Lock className="w-8 h-8" />, 
              title: t('auth_feature_3'), 
              desc: "Privacy is paramount. We auto-purge your documents immediately after analysis." 
            }
          ].map((feat, i) => (
            <div key={i} className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛡️ TRUST SECTION */}
      <section className="py-12 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            <CheckCircle className="w-4 h-4 text-green-500 shadow-sm"/> Trusted by Legal Experts
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            <CheckCircle className="w-4 h-4 text-green-500 shadow-sm"/> Bank-Grade Security
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            <CheckCircle className="w-4 h-4 text-green-500 shadow-sm"/> 99% Analysis Accuracy
          </div>
        </div>
      </section>

    </div>
  );
}