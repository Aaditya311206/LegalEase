import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle, FileSignature } from 'lucide-react';

export default function DocumentUploader({ onFileUpload }) {
  // State to track the selected document type
  const [docType, setDocType] = useState('Rent Agreement'); 

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      // Now we pass BOTH the file and the selected type up to the parent page!
      onFileUpload(acceptedFiles[0], docType);
    }
  }, [onFileUpload, docType]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      
      {/* 🆕 Document Type Dropdown Menu */}
      <div className="mb-6 animate-fade-in">
        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FileSignature className="w-4 h-4 text-primary" />
          Select Document Type
        </label>
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 font-medium cursor-pointer"
        >
          <option value="Rent Agreement">Rent Agreement</option>
          <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
          <option value="Employment Contract">Employment Contract</option>
          <option value="Freelance/Service Contract">Freelance/Service Contract</option>
          <option value="Property Sale Deed">Property Sale Deed</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Drag and Drop Zone */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ease-in-out
          ${isDragActive ? 'border-primary bg-red-50' : 'border-gray-300 hover:border-primary-light hover:bg-gray-50'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${isDragActive ? 'bg-primary-light text-white' : 'bg-gray-100 text-gray-500'}`}>
            <UploadCloud className="w-10 h-10" />
          </div>
          
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {isDragActive ? "Drop the document here..." : "Drag & drop your legal document"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports PDF, JPG, and PNG (Max 10MB)
            </p>
          </div>

          <button className="mt-4 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors">
            Browse Files
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500 justify-center">
        <AlertCircle className="w-4 h-4" />
        <p>All documents are securely processed and temporarily stored for AI analysis.</p>
      </div>
    </div>
  );
}