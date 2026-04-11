import React, { useState } from 'react';
import DocumentUploader from '../components/features/DocumentUploader';
import AnalysisResults from '../components/features/AnalysisResults';
import { FileSearch, Loader2, AlertCircle } from 'lucide-react';

export default function DocumentChecker() {
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

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Backend says:", data); 

      if (data.status === 'success') {
        setAiData(data.analysis);
        setAnalysisComplete(true);
        
        // 🚨 NEW: Save the result safely in the user's browser (localStorage)
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
        setServerError(data.error || "An unknown error occurred on the server.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setServerError("Failed to connect to the backend server. Is it running?");
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
        
        {/* Header Section */}
        {!analysisComplete && (
          <div className="text-center mb-10">
            <FileSearch className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Smart Document Checker
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Upload your rent agreement, NDA, or contract. Our AI will scan for missing clauses, hidden risks, and unfair terms instantly.
            </p>
          </div>
        )}

        {/* State 1: Upload UI */}
        {!file && !analysisComplete && (
          <DocumentUploader onFileUpload={handleFileUpload} />
        )}

        {/* State 2: File Selected & Ready to Analyze */}
        {file && !isAnalyzing && !analysisComplete && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800">File Selected: {file.name}</h3>
            <p className="text-primary font-medium mt-1">Type: {docType}</p> 
            <p className="text-gray-500 mt-2">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            {/* Show Server Error if it crashed */}
            {serverError && (
               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center justify-center gap-2">
                 <AlertCircle className="w-5 h-5" />
                 <span className="font-medium">{serverError}</span>
               </div>
            )}

            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAnalyze}
                className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
              >
                Analyze Document
              </button>
            </div>
          </div>
        )}

        {/* State 3: Loading / Processing */}
        {isAnalyzing && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-900">AI is analyzing your document...</h3>
            <p className="text-gray-500 mt-2">Extracting text, comparing legal standards, and detecting risks.</p>
          </div>
        )}

        {/* State 4: Results Dashboard */}
        {analysisComplete && aiData && (
          <AnalysisResults file={file} docType={docType} data={aiData} onReset={handleReset} />
        )}

      </div>
    </div>
  );
}