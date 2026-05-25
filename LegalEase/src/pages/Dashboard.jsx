import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ShieldAlert, Clock, Plus, File, CheckCircle, AlertTriangle, ArrowUpRight, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient'; // ✅ Connected Supabase Bridge

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Track database async lifecycle

  useEffect(() => {
    async function streamCloudHistory() {
      try {
        setLoading(true);
        
        // 🚀 1. Fetch current logged-in user profile metadata
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // 🚀 2. Query Postgres audit table filtered by active session ID
          const { data, error } = await supabase
            .from('audit_history')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error("Error retrieving dashboard records:", error.message);
          } else if (data) {
            // Map columns into your premium UI table dataset properties
            const formattedDocs = data.map(row => ({
              id: row.id,
              name: row.document_name,
              type: row.document_type,
              score: row.safety_score,
              date: new Date(row.created_at).toLocaleDateString()
            }));
            setRecentDocs(formattedDocs);
          }
        }
      } catch (err) {
        console.error("Failed to compile cloud history sync:", err);
      } finally {
        setLoading(false);
      }
    }

    streamCloudHistory();
  }, []);

  // 📊 Stats calculations bound securely to your database stream state
  const totalAnalyzed = recentDocs.length;
  const risksDetected = recentDocs.filter(doc => doc.score < 80).length;
  const hoursSaved = (recentDocs.length * 1.5).toFixed(1);

  // ⏳ Render clean loading gate while fetching transaction response data
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Fetching secure document vault records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 animate-fade-in text-left">
      {/* 🚀 PREMIUM HEADER SECTION */}
      <div className="bg-slate-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              {t('dash_welcome', 'Your Legal Workspace')}
            </h1>
            <p className="text-slate-400 mt-2 font-medium">{t('dash_desc', 'Monitor contract analysis compliance metrics and risks instantly.')}</p>
          </div>
          <button 
            onClick={() => navigate('/checker')}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95 uppercase tracking-widest text-xs"
          >
            <Plus className="w-5 h-5" />
            {t('analyze_new', 'Analyze New Document')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* 📊 STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-red-50 p-4 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('total_analyzed', 'Total Audited')}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{totalAnalyzed}</p>
            </div>
          </div>

          <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-orange-50 p-4 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('risks_detected', 'Risks Detected')}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{risksDetected}</p>
            </div>
          </div>

          <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('hours_saved', 'Hours Defended')}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{hoursSaved}</p>
            </div>
          </div>
        </div>

        {/* 📜 RECENT DOCUMENTS TABLE */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">{t('recent_docs', 'Cloud History Repository')}</h2>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
              {t('latest_tag', 'Live Feed')}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-50">
                  <th className="p-6">{t('doc_name', 'Document details')}</th>
                  <th className="p-6">{t('type', 'Instrument classification')}</th>
                  <th className="p-6">{t('date', 'Audit timestamp')}</th>
                  <th className="p-6 text-center">{t('safety_score', 'Safety evaluation')}</th>
                  <th className="p-6 text-right">{t('action', 'Operations')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentDocs.length > 0 ? (
                  recentDocs.map((doc) => (
                    <tr key={doc.id} className="group hover:bg-slate-50/80 transition-all cursor-default">
                      <td className="p-6 max-w-xs">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex flex-shrink-0 items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-red-600 transition-all">
                            <File className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-slate-700 text-sm group-hover:text-slate-900 truncate">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {doc.type}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-xs font-semibold text-slate-400">
                          {doc.date} 
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
                          {t('view_report', 'View Report')} <ArrowUpRight className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-slate-400 font-bold uppercase tracking-wide text-xs">
                      {t('no_docs', 'No active audits logged in your account environment.')}
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