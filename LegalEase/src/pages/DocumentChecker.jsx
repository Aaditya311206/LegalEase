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
        setServerError(data.error || "An error occurred.");
      }
    } catch (error) {
      setServerError("Failed to connect to backend.");
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
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!analysisComplete && (
          <div className="text-center mb-10">
            <FileSearch className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-gray-900">{t('app_title')}</h1>
            <p className="mt-4 text-lg text-gray-500">{t('upload_desc')}</p>
          </div>
        )}

        {!file && !analysisComplete && <DocumentUploader onFileUpload={handleFileUpload} />}

        {file && !isAnalyzing && !analysisComplete && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800">File Selected: {file.name}</h3>
            <p className="text-primary font-medium mt-1">Type: {docType}</p> 
            <p className="text-gray-500 mt-2">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            {serverError && (
               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center justify-center gap-2">
                 <AlertCircle className="w-5 h-5" />
                 <span className="font-medium">{serverError}</span>
               </div>
            )}
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={handleReset} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">{t('cancel_btn')}</button>
              <button onClick={handleAnalyze} className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark shadow-sm">{t('analyze_btn')}</button>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-900">{t('analyzing')}</h3>
          </div>
        )}

        {analysisComplete && aiData && (
          <AnalysisResults file={file} docType={docType} data={aiData} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}