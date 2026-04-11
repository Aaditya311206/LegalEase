import React from 'react';
import { AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import ChatBox from './ChatBox'; // <-- We imported the chatbox!

export default function AnalysisResults({ file, onReset }) {
  const mockResults = {
    score: 45,
    summary: "This rent agreement heavily favors the landlord. Several standard tenant protections are missing, and penalty clauses are unusually high.",
    clauses: [
      {
        id: 1, type: 'high', title: "Unfair Penalty Clause",
        text: "Tenant must pay 3 months rent as penalty if notice is less than 60 days.",
        suggestion: "Standard legal practice caps this at 1 month. Renegotiate this term."
      },
      {
        id: 2, type: 'medium', title: "Missing Maintenance Terms",
        text: "No clause specifying who handles major structural repairs.",
        suggestion: "Ensure a clause is added stating the landlord is responsible."
      }
    ]
  };

  const getRiskStyles = (type) => {
    switch(type) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'safe': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getRiskIcon = (type) => {
    switch(type) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium': return <Info className="w-5 h-5 text-yellow-600" />;
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 animate-fade-in">
      
      {/* Header & Score */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
          <p className="text-gray-500 mt-1">File: {file.name}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <span className="text-4xl font-extrabold text-red-500">{mockResults.score}/100</span>
          </div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Safety Score</span>
        </div>
      </div>

      {/* Grid Layout: Clauses on Left, Chat on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Clauses (Takes up 2/3 of the space) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-primary-light mb-2">AI Summary</h3>
            <p className="text-gray-300 leading-relaxed">{mockResults.summary}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Detected Clauses</h3>
            {mockResults.clauses.map((clause) => (
              <div key={clause.id} className={`p-5 rounded-lg border ${getRiskStyles(clause.type)}`}>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">{getRiskIcon(clause.type)}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{clause.title}</h4>
                    <p className="opacity-90 mb-3 text-sm font-medium">"{clause.text}"</p>
                    <div className="bg-white/60 p-3 rounded-md text-sm border border-white/40">
                      <strong>AI Suggestion:</strong> {clause.suggestion}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onReset}
            className="mt-4 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm w-full"
          >
            Analyze Another Document
          </button>
        </div>

        {/* Right Column: ChatBox (Takes up 1/3 of the space) */}
        <div className="lg:col-span-1">
          <ChatBox />
        </div>

      </div>
    </div>
  );
}