import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Info, Bot, Send, ArrowLeft } from 'lucide-react';

export default function AnalysisResults({ file, docType = "Document", data, onReset }) {
  const [chatInput, setChatInput] = useState('');

  // 🛡️ BULLETPROOF CHECK: If data is completely missing, don't crash, just show nothing.
  if (!data) return null;

  // 🛡️ BULLETPROOF CHECK: Guarantee clauses is ALWAYS an array, even if the AI messes up.
  const safeClauses = Array.isArray(data.clauses) ? data.clauses : [];

  return (
    <div className="w-full animate-fade-in pb-12">
      
      {/* HEADER SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <button onClick={onReset} className="text-gray-400 hover:text-primary flex items-center gap-2 text-sm font-bold mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Analyze Another Document
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analysis Complete</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">{file?.name || 'document.pdf'}</span>
            <span>•</span>
            <span className="text-primary">{docType}</span>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 flex flex-col items-end">
          <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <ShieldAlert className={`w-10 h-10 ${data.scoreColor || 'text-gray-500'}`} />
            <div className="flex flex-col">
              <span className={`text-4xl font-black tracking-tighter leading-none ${data.scoreColor || 'text-gray-500'}`}>
                {data.score || 0}<span className="text-2xl text-gray-300">/100</span>
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Safety Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ONLY Clauses Now */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-2xl text-gray-900 tracking-tight">Detected Risks & Clauses</h3>
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              {safeClauses.length} Issues Found
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
                    <h4 className={`font-bold text-lg ${clause.titleColor || 'text-gray-900'}`}>{clause.title || 'Notable Clause'}</h4>
                  </div>
                  
                  <div className="pl-12">
                    <p className="text-gray-600 font-medium mb-5 text-sm leading-relaxed relative">
                      <span className="absolute -left-4 top-0 text-gray-300 text-xl font-serif">"</span>
                      {clause.text || 'Text could not be extracted.'}
                      <span className="absolute -right-4 bottom-0 text-gray-300 text-xl font-serif">"</span>
                    </p>
                    
                    <div className={`p-4 rounded-xl text-sm border flex gap-3 ${clause.bgColor || 'bg-gray-50'} ${clause.borderColor || 'border-gray-200'} bg-opacity-40`}>
                      <Bot className={`w-5 h-5 flex-shrink-0 mt-0.5 ${clause.titleColor || 'text-gray-700'}`} />
                      <div>
                        <span className={`font-bold block mb-1 ${clause.titleColor || 'text-gray-900'}`}>AI Recommendation</span>
                        <span className="text-gray-700 leading-relaxed">{clause.suggestion || 'No specific suggestion provided.'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <p className="text-gray-500 italic p-6 bg-white rounded-xl border border-gray-100 text-center">No risky clauses detected by AI.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Chatbot */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col h-[700px] overflow-hidden sticky top-8">
          <div className="bg-gray-900 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="text-white w-7 h-7" />
              <div>
                <h3 className="font-bold text-white text-sm tracking-wide">LegalEase Assistant</h3>
                <p className="text-gray-400 text-xs mt-0.5 font-medium">Context-aware document chat</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-5 bg-[#F8FAFC] overflow-y-auto space-y-4">
            <div className="flex gap-3">
              <div className="bg-gray-900 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm text-sm text-gray-700 leading-relaxed font-medium">
                Hi! I've read your <span className="font-bold text-primary">{docType}</span> completely. What would you like to know about the detected clauses?
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your agreement..." 
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-4 py-3 text-sm transition-all outline-none font-medium text-gray-700"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl transition-all shadow-sm">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}