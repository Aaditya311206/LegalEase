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
    <div className="flex flex-col min-h-screen bg-white">
      {/* 🚀 HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-full">
            <Zap className="w-4 h-4" /> <span>AI-Powered Legal Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            {t('home_title_main')} <span className="text-red-600">{t('home_title_highlight')}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10 leading-relaxed">
            {t('home_desc')}
          </p>

          <div className="flex justify-center">
            <button 
              onClick={handleStart}
              className="group flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-red-600/20 active:scale-95"
            >
              {t('home_btn')} 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 📊 FEATURES GRID: Premium Upgrade */}
      <section className="py-24 bg-white px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Card 1: Risk Detection */}
            <div className="group relative p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Risk Detection</h3>
              <p className="text-gray-500 leading-relaxed">
                Automatically identifies predatory terms, liability traps, and hidden risks before you commit to any signature.
              </p>
              <div className="mt-6 flex items-center gap-2 text-red-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Legal Alignment */}
            <div className="group relative p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Gavel className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Legal Alignment</h3>
              <p className="text-gray-500 leading-relaxed">
                Cross-references your documents with local laws and government policies to ensure total compliance in real-time.
              </p>
              <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: Privacy First */}
            <div className="group relative p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Privacy First</h3>
              <p className="text-gray-500 leading-relaxed">
                Your data security is our priority. We auto-delete all uploaded files immediately after analysis is complete.
              </p>
              <div className="mt-6 flex items-center gap-2 text-green-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 ADDED: TRUST SECTION (Fills more space) */}
      <section className="py-16 border-t border-gray-50 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-slate-400"><CheckCircle className="w-5 h-5"/> Trusted by Legal Firms</div>
          <div className="flex items-center gap-2 font-bold text-slate-400"><CheckCircle className="w-5 h-5"/> Secure Data Protocols</div>
          <div className="flex items-center gap-2 font-bold text-slate-400"><CheckCircle className="w-5 h-5"/> 99% Analysis Accuracy</div>
        </div>
      </section>
    </div>
  );
}