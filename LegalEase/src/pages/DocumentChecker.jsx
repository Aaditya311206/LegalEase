import React, { useState } from 'react';
import DocumentUploader from '../components/features/DocumentUploader';
import AnalysisResults from '../components/features/AnalysisResults';
import { FileSearch, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DocumentChecker() {
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState(''); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const handleFileUpload = (uploadedFile, selectedDocType) => {
    setFile(uploadedFile);
    setDocType(selectedDocType); 
    setServerError(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setServerError(null);
    
    const formData = new FormData();
    formData.append('document', file);
    formData.append('docType', docType); 
    formData.append('language', i18n.language);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAiData(data.analysis);
        setAnalysisComplete(true);
        
        const newHistoryItem = {
          id: Date.now(),
          name: file.name,
          type: docType,
          date: new Date().toLocaleDateString(),
          score: data.analysis.score
        };
        const existingHistory = JSON.parse(localStorage.getItem('legalEaseHistory') || '[]');
        localStorage.setItem('legalEaseHistory', JSON.stringify([newHistoryItem, ...existingHistory]));
      } else {
        setServerError(data.details || data.error || t('server_error', "An error occurred during the audit."));
      }
    } catch (error) {
      setServerError(t('connection_error', "Failed to connect to the LegalEase analysis engine."));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDocType(''); 
    setAnalysisComplete(false);
    setAiData(null);
    setServerError(null);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {!analysisComplete && (
          <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="bg-red-600/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileSearch className="w-10 h-10 text-red-600" />
            </div>
            {/* ✅ FIXED FOR TRANSLATION */}
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('app_title')}</h1>
            <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              {t('upload_desc')}
            </p>
          </div>
        )}

        {!file && !analysisComplete && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <DocumentUploader onFileUpload={handleFileUpload} />
          </div>
        )}

        {file && !isAnalyzing && !analysisComplete && (
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-in zoom-in-95 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-900 truncate px-4">{file.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-red-100">
                  {docType}
                </span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>

            {serverError && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center justify-center gap-3 animate-pulse">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-bold uppercase tracking-tight">{serverError}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <button 
                onClick={handleReset} 
                className="w-full sm:w-auto px-8 py-4 border-2 border-slate-100 rounded-2xl text-slate-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
              >
                {t('cancel_btn')}
              </button>
              <button 
                onClick={handleAnalyze} 
                className="w-full sm:w-auto px-10 py-4 bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all active:scale-95"
              >
                {/* ✅ FIXED FOR TRANSLATION */}
                {t('analyze_btn')}
              </button>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="bg-white p-20 rounded-[2.5rem] shadow-xl border border-slate-50 text-center flex flex-col items-center justify-center animate-pulse">
            <div className="relative">
               <Loader2 className="w-16 h-16 text-red-600 animate-spin mb-6" />
               <div className="absolute inset-0 bg-red-600/10 blur-2xl -z-10 rounded-full animate-ping"></div>
            </div>
            {/* ✅ FIXED FOR TRANSLATION */}
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">{t('analyzing')}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mt-4">{t('analyzing_status')}</p>
          </div>
        )}

        {analysisComplete && aiData && (
          <div className="animate-in slide-in-from-bottom-8 duration-700">
            <AnalysisResults 
              file={file} 
              docType={docType} 
              data={aiData} 
              onReset={handleReset} 
            />
          </div>
        )}
      </div>
    </div>
  );
}