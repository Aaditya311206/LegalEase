import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ShieldAlert, Clock, Plus, File, CheckCircle, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recentDocs, setRecentDocs] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('legalEaseHistory') || '[]');
    setRecentDocs(savedHistory);
  }, []);

  const totalAnalyzed = recentDocs.length;
  const risksDetected = recentDocs.filter(doc => doc.score < 80).length;
  const hoursSaved = (recentDocs.length * 1.5).toFixed(1);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 animate-fade-in">
      {/* 🚀 PREMIUM HEADER SECTION */}
      <div className="bg-slate-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome to your <span className="text-red-500">Dashboard</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Here is an overview of your recent legal analyses.</p>
          </div>
          <button 
            onClick={() => navigate('/checker')}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Analyze New Document
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* 📊 STATS GRID: Elevating the cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Analyzed */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-red-50 p-4 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Analyzed</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{totalAnalyzed}</p>
            </div>
          </div>

          {/* Risks Detected */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-orange-50 p-4 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risks Detected</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{risksDetected}</p>
            </div>
          </div>

          {/* Hours Saved */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hours Saved</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{hoursSaved}</p>
            </div>
          </div>
        </div>

        {/* 📜 RECENT DOCUMENTS TABLE */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
            <h2 className="text-xl font-black text-slate-900">Recent Documents</h2>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
              Latest Activity
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-50">
                  <th className="p-6">Document Name</th>
                  <th className="p-6">Type</th>
                  <th className="p-6 text-center">Safety Score</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentDocs.length > 0 ? (
                  recentDocs.map((doc) => (
                    <tr key={doc.id} className="group hover:bg-slate-50/80 transition-all cursor-default">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-red-600 transition-all">
                            <File className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-slate-700 text-sm group-hover:text-slate-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[11px] font-bold uppercase tracking-wider">
                          {doc.type}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-slate-100 shadow-sm">
                          {doc.score >= 80 ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertTriangle className={`w-4 h-4 ${doc.score <= 50 ? 'text-red-500' : 'text-orange-500'}`} />
                          )}
                          <span className={`font-black text-sm ${doc.score >= 80 ? 'text-green-600' : doc.score <= 50 ? 'text-red-600' : 'text-orange-600'}`}>
                            {doc.score}/100
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <button className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-bold text-sm transition-colors group/btn">
                          View Report <ArrowUpRight className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-slate-400 font-medium italic">
                      No documents analyzed yet. Start by uploading a contract.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}