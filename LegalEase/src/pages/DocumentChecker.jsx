import React, { useState } from 'react';
import DocumentUploader from '../components/features/DocumentUploader';
import AnalysisResults from '../components/features/AnalysisResults';
import { FileSearch, Loader2 } from 'lucide-react';

export default function DocumentChecker() {
  const [file, setFile] = useState(null);
  // 1. 🆕 Added state to catch the document type from the uploader
  const [docType, setDocType] = useState(''); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // 2. 🆕 Updated to catch BOTH the file and the selected type
  const handleFileUpload = (uploadedFile, selectedDocType) => {
    setFile(uploadedFile);
    setDocType(selectedDocType); 
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('document', file);
    // 3. 🆕 Send the document type to the backend for later AI use
    formData.append('docType', docType); 

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Backend says:", data); 

      setIsAnalyzing(false);
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDocType(''); // Clear it on reset
    setAnalysisComplete(false);
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
            {/* 🆕 Show the user what type they selected */}
            <p className="text-primary font-medium mt-1">Type: {docType}</p> 
            <p className="text-gray-500 mt-2">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={() => setFile(null)}
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
        {analysisComplete && (
          // 4. 🆕 Passed docType down into AnalysisResults!
          <AnalysisResults file={file} docType={docType} onReset={handleReset} />
        )}

      </div>
    </div>
  );
}