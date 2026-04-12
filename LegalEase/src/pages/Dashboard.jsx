import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ShieldAlert, Clock, Plus, File, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [recentDocs, setRecentDocs] = useState([]);

  useEffect(() => {
    // Pulling history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('legalEaseHistory') || '[]');
    setRecentDocs(savedHistory);
  }, []);

  // Logic for the stats cards
  const totalAnalyzed = recentDocs.length;
  const risksDetected = recentDocs.filter(doc => doc.score < 80).length;
  const hoursSaved = (recentDocs.length * 1.5).toFixed(1);

  return (
    <div className="min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8 bg-background animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{t('dash_welcome')}</h1>
            <p className="text-gray-500 mt-2">{t('dash_desc')}</p>
          </div>
          <button 
            onClick={() => navigate('/checker')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            {t('analyze_new')}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-4 rounded-full text-primary">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('total_analyzed')}</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{totalAnalyzed}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="bg-red-50 p-4 rounded-full text-red-500">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('risks_detected')}</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{risksDetected}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-4 rounded-full text-blue-500">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('hours_saved')}</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{hoursSaved}</p>
            </div>
          </div>
        </div>

        {/* Recent Documents Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">{t('recent_docs')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 font-semibold">{t('doc_name')}</th>
                  <th className="p-4 font-semibold">{t('type')}</th>
                  <th className="p-4 font-semibold">{t('date')}</th>
                  <th className="p-4 font-semibold">{t('safety_score')}</th>
                  <th className="p-4 font-semibold">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentDocs.length > 0 ? (
                  recentDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <File className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{doc.type}</td>
                      <td className="p-4 text-gray-500 text-sm">{doc.date}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {doc.score >= 80 ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertTriangle className={`w-5 h-5 ${doc.score <= 50 ? 'text-red-500' : 'text-yellow-500'}`} />
                          )}
                          <span className={`font-bold ${doc.score >= 80 ? 'text-green-700' : doc.score <= 50 ? 'text-red-700' : 'text-yellow-700'}`}>
                            {doc.score}/100
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
                          {t('view_report')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 italic">
                      {t('no_docs')}
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