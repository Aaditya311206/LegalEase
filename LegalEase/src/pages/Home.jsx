import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Gavel, Lock, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const isEnglish = i18n.language === 'en';
  const headingStyle = isEnglish ? "leading-[0.95] tracking-tighter" : "leading-[1.2] md:leading-[1.3]";

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <section className="relative pt-24 pb-36 overflow-hidden bg-slate-900 text-center">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-black uppercase tracking-[0.2em] text-red-400 bg-red-400/10 border border-red-400/20 rounded-full">
            <ShieldCheck className="w-4 h-4 fill-current" /> 
            <span>{t('your_legal_guardian')}</span>
          </div>
          <h1 className={`text-5xl md:text-8xl font-black text-white mb-8 ${headingStyle}`}>
            {t('home_title_main')} <br />
            <span className="text-red-600">{t('home_title_highlight')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-medium leading-relaxed">
            {t('home_desc')}
          </p>
          <button onClick={() => navigate(isAuthenticated ? "/checker" : "/auth")} className="group inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95">
            {t('home_btn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { icon: <ShieldCheck className="w-8 h-8" />, title: t('auth_feature_1'), desc: t('feature_1_desc') },
            { icon: <Gavel className="w-8 h-8" />, title: t('auth_feature_2'), desc: t('feature_2_desc') },
            { icon: <Lock className="w-8 h-8" />, title: t('auth_feature_3'), desc: t('feature_3_desc') }
          ].map((feat, i) => (
            <div key={i} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8">{feat.icon}</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}