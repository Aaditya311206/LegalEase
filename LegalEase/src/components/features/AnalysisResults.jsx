import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Info, Bot, Send, ArrowLeft } from 'lucide-react';

export default function AnalysisResults({ file, docType = "Document", onReset }) {
  const [chatInput, setChatInput] = useState('');

  // 🧠 DYNAMIC MOCK DATA ENGINE
  // This changes the UI completely based on what the user selected in the dropdown!
  const getAnalysisData = (type) => {
    if (type.includes("NDA") || type.includes("Non-Disclosure")) {
      return {
        score: 72,
        scoreColor: "text-yellow-500",
        summary: "This Non-Disclosure Agreement is relatively standard, but contains overly broad definitions of 'Confidential Information' and lacks a clear expiration date.",
        clauses: [
          { icon: <AlertTriangle className="text-yellow-500 w-5 h-5"/>, titleColor: "text-yellow-800", bgColor: "bg-yellow-50", borderColor: "border-yellow-200", title: "Missing Term Limit", text: "No expiration date specified for the confidentiality obligations.", suggestion: "Standard NDAs usually expire after 2 to 5 years. Add a clear termination clause." },
          { icon: <ShieldAlert className="text-red-500 w-5 h-5"/>, titleColor: "text-red-800", bgColor: "bg-red-50", borderColor: "border-red-200", title: "Overly Broad Scope", text: "\"Confidential Information includes any and all data shared during conversations.\"", suggestion: "Restrict this to information explicitly marked as 'Confidential' in writing." }
        ]
      };
    } else if (type.includes("Employment")) {
      return {
        score: 65,
        scoreColor: "text-yellow-500",
        summary: "This Employment Contract is mostly standard but contains a strict non-compete clause that may not be legally enforceable in your jurisdiction.",
        clauses: [
          { icon: <ShieldAlert className="text-red-500 w-5 h-5"/>, titleColor: "text-red-800", bgColor: "bg-red-50", borderColor: "border-red-200", title: "Aggressive Non-Compete", text: "\"Employee may not work for any competitor globally for 5 years.\"", suggestion: "Courts rarely enforce 5-year global bans. Negotiate down to 1 year within a 50-mile radius." }
        ]
      };
    } else {
      // Default (Rent Agreement)
      return {
        score: 45,
        scoreColor: "text-red-500",
        summary: "This rent agreement heavily favors the landlord. Several standard tenant protections are missing, and penalty clauses are unusually high.",
        clauses: [
          { icon: <ShieldAlert className="text-red-500 w-5 h-5"/>, titleColor: "text-red-800", bgColor: "bg-red-50", borderColor: "border-red-200", title: "Unfair Penalty Clause", text: "\"Tenant must pay 3 months rent as penalty if notice is less than 60 days.\"", suggestion: "Standard legal practice caps this at 1 month. Renegotiate this term." },
          { icon: <Info className="text-yellow-600 w-5 h-5"/>, titleColor: "text-yellow-800", bgColor: "bg-yellow-50", borderColor: "border-yellow-200", title: "Missing Maintenance Terms", text: "\"No clause specifying who handles major structural repairs.\"", suggestion: "Ensure a clause is added stating the landlord is responsible." }
        ]
      };
    }
  };

  // Load the correct dummy data for the selected document
  const data = getAnalysisData(docType);

  return (
    <div className="w-full animate-fade-in pb-10">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div>
          <button onClick={onReset} className="text-gray-400 hover:text-primary flex items-center gap-2 text-sm font-medium mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Analyze Another Document
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900">Analysis Complete</h1>
          <p className="text-gray-500 mt-1">File: {file?.name || 'document.pdf'} • Type: {docType}</p>
        </div>
        
        <div className="mt-4 md:mt-0 text-right">
          <div className="flex items-center gap-2 justify-end">
            <ShieldAlert className={`w-8 h-8 ${data.scoreColor}`} />
            <span className={`text-4xl font-black tracking-tight ${data.scoreColor}`}>
              {data.score}/100
            </span>
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Safety Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Summary Card */}
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">AI Summary</h3>
            <p className="text-gray-300 leading-relaxed">{data.summary}</p>
          </div>

          {/* Detected Clauses List */}
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-4">Detected Clauses</h3>
            <div className="space-y-4">
              {data.clauses.map((clause, idx) => (
                <div key={idx} className={`p-5 rounded-xl border ${clause.borderColor} ${clause.bgColor}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {clause.icon}
                    <h4 className={`font-bold ${clause.titleColor}`}>{clause.title}</h4>
                  </div>
                  <p className="text-gray-700 font-medium mb-4 italic">
                    {clause.text}
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-white/40 text-sm shadow-sm">
                    <span className="font-bold text-gray-900">AI Suggestion:</span> <span className="text-gray-600">{clause.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Chatbot */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col h-[500px] overflow-hidden sticky top-24">
          <div className="bg-gray-900 p-4 flex items-center gap-3">
            <Bot className="text-white w-6 h-6" />
            <div>
              <h3 className="font-bold text-white text-sm">LegalEase AI Assistant</h3>
              <p className="text-gray-400 text-xs">Context-aware document chat</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="bg-gray-200 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-sm text-gray-700">
                Hi! I have analyzed your {docType.toLowerCase()}. Ask me anything about the risks, missing clauses, or legal terms!
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
                className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-2 text-sm transition-all"
              />
              <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-xl transition-colors shadow-sm">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}