import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle, FileSignature } from 'lucide-react';

export default function DocumentUploader({ onFileUpload }) {
  // 1. Start empty so nothing is pre-selected!
  const [docType, setDocType] = useState('');
  
  // 2. State to show the warning if they forget
  const [showWarning, setShowWarning] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // 3. Block the upload if they haven't picked a type
    if (!docType) {
      setShowWarning(true);
      return;
    }

    if (acceptedFiles.length > 0) {
      setShowWarning(false);
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

      {/* Document Type Dropdown */}
      <div className="mb-6 animate-fade-in">
        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FileSignature className="w-4 h-4 text-primary" />
          Select Document Type
        </label>

        <select
          value={docType}
          onChange={(e) => {
            setDocType(e.target.value);
            setShowWarning(false); // Hide warning once they pick something
          }}
          className={`w-full p-3 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 font-medium cursor-pointer ${
            showWarning ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
          }`}
        >
          {/* 🆕 The new default placeholder option */}
          <option value="" disabled>-- Please select a document type --</option>

          {/* Property */}
          <option disabled>──────── Property & Rental ────────</option>
          <option value="Rent Agreement">Rent Agreement</option>
          <option value="Lease Agreement">Lease Agreement</option>
          <option value="Property Sale Deed">Property Sale Deed</option>

          {/* Work */}
          <option disabled>──────── Work & Employment ────────</option>
          <option value="Employment Contract">Employment Contract</option>
          <option value="Internship Agreement">Internship Agreement</option>
          <option value="Freelance/Service Contract">Freelance/Service Contract</option>

          {/* Business */}
          <option disabled>──────── Business & Startup ────────</option>
          <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
          <option value="Partnership Agreement">Partnership Agreement</option>
          <option value="Memorandum of Understanding (MOU)">Memorandum of Understanding (MOU)</option>

          {/* Legal */}
          <option disabled>──────── Legal & Financial ────────</option>
          <option value="Loan Agreement">Loan Agreement</option>
          <option value="Power of Attorney">Power of Attorney</option>
          <option value="Affidavit">Affidavit</option>
          <option value="Legal Notice">Legal Notice</option>
          <option value="Will / Testament">Will / Testament</option>

          {/* Fallback */}
          <option disabled>──────── Other ────────</option>
          <option value="Other">Other</option>
        </select>

        {/* 🆕 Warning Message if they try to drop too early */}
        {showWarning && (
          <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            You must select a document type before uploading.
          </p>
        )}
      </div>

      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out
          ${!docType ? 'cursor-not-allowed opacity-60 bg-gray-50 border-gray-200' : 'cursor-pointer hover:bg-gray-50 hover:border-primary-light'}
          ${isDragActive && docType ? 'border-primary bg-red-50' : ''}
          ${(isDragReject || showWarning) ? 'border-red-500 bg-red-50' : 'border-gray-300'}
        `}
      >
        {/* Disable the actual hidden input if no type is selected */}
        <input {...getInputProps()} disabled={!docType} />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${isDragActive && docType ? 'bg-primary-light text-white' : 'bg-gray-100 text-gray-500'}`}>
            <UploadCloud className="w-10 h-10" />
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-700">
              {!docType 
                ? "Select a document type to enable upload" 
                : isDragActive 
                ? "Drop the document here..." 
                : "Drag & drop your legal document"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports PDF, JPG, and PNG (Max 10MB)
            </p>
          </div>

          <button 
            disabled={!docType}
            className={`mt-4 px-6 py-2 border rounded-lg shadow-sm font-medium transition-colors ${
              !docType 
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary'
            }`}
          >
            Browse Files
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500 justify-center">
        <AlertCircle className="w-4 h-4" />
        <p>All documents are securely processed and temporarily stored for AI analysis.</p>
      </div>

    </div>
  );
}