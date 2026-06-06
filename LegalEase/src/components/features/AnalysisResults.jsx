import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, Info, ArrowLeft, Landmark, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChatBox from './ChatBox'; 

export default function AnalysisResults({ file, docType = "Document", data, onReset, language }) {
  const { t } = useTranslation();
  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(true);

  useEffect(() => {
    const fetchLivePolicies = async () => {
      try {
        // 🚀 SWAPPED ENDPOINT URL: Now fetching live scraper records directly from your Render cloud container instead of localhost
        const response = await fetch('https://legalease-zxbe.onrender.com/api/policies');
        const policyData = await response.json();
        setPolicies(policyData);
      } catch (error) {
        console.error("Failed to fetch policies from backend", error);
      } finally {
        setLoadingPolicies(false);
      }
    };
    fetchLivePolicies();
  }, []);

  if (!data) return null;
  const safeClauses = Array.isArray(data.clauses) ? data.clauses : [];
  
  // ✅ Safely read the dynamic headers returned by Gemini matching your selection language
  const headers = data.translatedHeaders || {
    complianceHeader: "Compliance Analysis Complete",
    risksHeader: "Detected Legal Risks",
    issuesFoundLabel: "Issues Found",
    safetyScoreLabel: "Legal Safety Score",
    policyAlignmentLabel: "Policy & Law Alignment",
    verifyAgainstLabel: "Verify against"
  };

  return (
    <div className="w-full animate-fade-in pb-12 text-left">
      
      {/* HEADER SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <button onClick={onReset} className="text-gray-400 hover:text-red-600 flex items-center gap-2 text-sm font-bold mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('cancel_btn', 'Analyze Another Document')}
          </button>
          {/* ✅ Uses dynamic AI translation header */}
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {headers.complianceHeader}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">{file?.name || 'document.pdf'}</span>
            <span>•</span>
            <span className="text-red-600 font-bold">{docType}</span>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 flex flex-col items-end">
          <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <ShieldAlert className={`w-10 h-10 ${data.scoreColor || 'text-gray-500'}`} />
            <div className="flex flex-col">
              <span className={`text-4xl font-black tracking-tighter leading-none ${data.scoreColor || 'text-gray-500'}`}>
                {data.score || 0}<span className="text-2xl text-gray-300">/100</span>
              </span>
              {/* ✅ Uses dynamic AI translation label */}
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                {headers.safetyScoreLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      {/* 🚀 UPGRADED: Changed grid mapping structure to a 5-column system grid layout framework to drop empty workspace margins */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* LEFT COLUMN: Detected Legal Risks (Takes up 3 wide grid paths - 60% view layout) */}
        <div className="lg:col-span-3 w-full">
          <div className="flex items-center justify-between mb-6">
            {/* ✅ Uses dynamic AI translation header */}
            <h3 className="font-extrabold text-2xl text-gray-900 tracking-tight">
              {headers.risksHeader}
            </h3>
            {/* ✅ Uses dynamic AI translation label */}
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              {safeClauses.length} {headers.issuesFoundLabel}
            </span>
          </div>
          
          <div className="space-y-5">
            {safeClauses.length > 0 ? (
              safeClauses.map((clause, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-200 group ${clause.borderColor || 'border-gray-200'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl ${clause.bgColor || 'bg-gray-50'}`}>
                      {clause.borderColor?.includes('red') ? (
                        <ShieldAlert className="text-red-500 w-6 h-6"/>
                      ) : clause.borderColor?.includes('yellow') ? (
                        <AlertTriangle className="text-yellow-600 w-6 h-6" />
                      ) : (
                        <Info className="text-blue-500 w-6 h-6" />
                      )}
                    </div>
                    {/* ✅ Renders the translated clause title smoothly */}
                    <h4 className={`font-bold text-lg ${clause.titleColor || 'text-gray-900'}`}>{clause.title || 'Notable Clause'}</h4>
                  </div>
                  
                  <div className="pl-12">
                    <p className="text-gray-600 font-medium mb-5 text-sm leading-relaxed relative">
                      <span className="absolute -left-4 top-0 text-gray-300 text-xl font-serif">"</span>
                      {clause.text || 'Text could not be extracted.'}
                      <span className="absolute -right-4 bottom-0 text-gray-300 text-xl font-serif">"</span>
                    </p>
                    
                    <div className={`p-4 rounded-xl text-sm border flex flex-col gap-3 ${clause.bgColor || 'bg-gray-50'} ${clause.borderColor || 'border-gray-200'} bg-opacity-40`}>
                      
                      <div className="flex gap-3">
                        <Landmark className={`w-5 h-5 flex-shrink-0 mt-0.5 ${clause.titleColor || 'text-gray-700'}`} />
                        <div>
                          {/* ✅ Uses dynamic AI translation label */}
                          <span className={`font-bold block mb-1 ${clause.titleColor || 'text-gray-900'}`}>
                            {headers.policyAlignmentLabel}
                          </span>
                          {/* ✅ Renders the translated suggestion insights */}
                          <span className="text-gray-700 leading-relaxed">{clause.suggestion || 'No specific suggestion provided.'}</span>
                        </div>
                      </div>

                      {/* Relevant Law Link Button directly under explanation */}
                      {clause.relevantLawLink && clause.relevantLawTitle && (
                        <div className="ml-8 mt-2">
                          <a 
                            href={clause.relevantLawLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-red-600 hover:bg-gray-50 transition-colors font-bold text-xs uppercase tracking-wider"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {/* ✅ Uses dynamic AI translation label */}
                            {headers.verifyAgainstLabel}: {clause.relevantLawTitle}
                          </a>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <p className="text-gray-500 italic p-6 bg-white rounded-xl border border-gray-100 text-center">No compliance risks detected by AI.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar layout (Takes up 2 wide grid paths - 40% view layout area) */}
        {/* 🚀 EXPANDED: This provides both layout tracking modules massive container area width transformations */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full">
          
          {/* LIVE GOVERNMENT POLICIES FROM SCRAPER */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-[400px] overflow-hidden w-full">
            <div className="bg-slate-950 p-5 flex items-center gap-3 border-b border-slate-800">
              <Landmark className="text-emerald-400 w-6 h-6" />
              <h3 className="font-bold text-white text-sm tracking-wide">
                {t('live_policy_title', 'Live Policy Updates (PRS India)')}
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
              {loadingPolicies ? (
                <div className="text-slate-400 text-sm text-center mt-12 animate-pulse">
                  {t('fetching_policies', 'Fetching latest government bills...')}
                </div>
              ) : policies.length > 0 ? (
                policies.map((policy, idx) => (
                  <a 
                    key={idx} 
                    href={policy.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-700 transition-colors group cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-slate-200 text-sm font-medium leading-snug group-hover:text-white">
                        {policy.title}
                      </p>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 flex-shrink-0 mt-0.5" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-slate-500 text-sm text-center mt-10">No recent policies found.</div>
              )}
            </div>
          </div>

          {/* Context ChatBox Widget */}
          {/* ✅ Scales wider seamlessly matching the new 2-column parent width constraints and tracks system language */}
          <ChatBox docType={docType} analysisData={data} language={language} />

        </div>
      </div>
    </div>
  );
}