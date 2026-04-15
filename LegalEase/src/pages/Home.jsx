import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Gavel, Lock, ArrowRight, Zap, CheckCircle } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleStart = () => {
    navigate(isAuthenticated ? "/checker" : "/auth");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <section className="relative pt-24 pb-36 overflow-hidden bg-slate-900 text-center">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-black uppercase tracking-[0.2em] text-red-400 bg-red-400/10 border border-red-400/20 rounded-full">
            <Zap className="w-4 h-4 fill-current" /> <span>AI-Powered Legal Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
            {t('home_title_main')} <br />
            <span className="text-red-600">{t('home_title_highlight')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-medium">
            {t('home_desc')}
          </p>
          <button onClick={handleStart} className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-red-600/20 active:scale-95">
            {t('home_btn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck />, title: t('auth_feature_1'), desc: "Find liability traps and hidden risks instantly." },
            { icon: <Gavel />, title: t('auth_feature_2'), desc: "Cross-reference documents with local law compliance." },
            { icon: <Lock />, title: t('auth_feature_3'), desc: "We auto-delete your data after every analysis." }
          ].map((feat, i) => (
            <div key={i} className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{feat.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <CheckCircle className="w-4 h-4 text-green-500"/> Trusted by Legal Firms
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <CheckCircle className="w-4 h-4 text-green-500"/> Secure Data Protocols
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <CheckCircle className="w-4 h-4 text-green-500"/> 99% Analysis Accuracy
          </div>
        </div>
      </section>
    </div>
  );
}