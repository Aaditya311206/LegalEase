import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle, FileSignature } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DocumentUploader({ onFileUpload }) {
  const { t } = useTranslation();
  const [docType, setDocType] = useState('default');
  const [showWarning, setShowWarning] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (docType === 'default') {
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
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">

      {/* Document Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FileSignature className="w-4 h-4 text-primary" />
          {t('select_doc_type')}
        </label>

        <select
          value={docType}
          onChange={(e) => {
            setDocType(e.target.value);
            setShowWarning(false);
          }}
          className={`w-full p-3 border rounded-xl bg-white ${
            showWarning ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <option value="default" disabled>
            {t('placeholder_doc_type')}
          </option>

          <option disabled>──────── Property & Rental ────────</option>
          <option value="Rent Agreement">Rent Agreement</option>
          <option value="Lease Agreement">Lease Agreement</option>
          <option value="Property Sale Deed">Property Sale Deed</option>

          <option disabled>──────── Work & Employment ────────</option>
          <option value="Employment Contract">Employment Contract</option>
          <option value="Internship Agreement">Internship Agreement</option>
          <option value="Freelance/Service Contract">Freelance/Service Contract</option>

          <option disabled>──────── Business & Startup ────────</option>
          <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
          <option value="Partnership Agreement">Partnership Agreement</option>
          <option value="Memorandum of Understanding (MOU)">Memorandum of Understanding (MOU)</option>

          <option disabled>──────── Legal & Financial ────────</option>
          <option value="Loan Agreement">Loan Agreement</option>
          <option value="Power of Attorney">Power of Attorney</option>
          <option value="Affidavit">Affidavit</option>
          <option value="Legal Notice">Legal Notice</option>
          <option value="Will / Testament">Will / Testament</option>

          <option disabled>──────── Other ────────</option>
          <option value="Other">Other</option>
        </select>

        {showWarning && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {t('warn_select_type')}
          </p>
        )}
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition
          ${docType === 'default' ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'cursor-pointer bg-white'}
          ${isDragActive ? 'border-primary bg-red-50' : 'border-gray-300'}
          ${isDragReject ? 'border-red-500' : ''}
        `}
      >
        <input {...getInputProps()} disabled={docType === 'default'} />

        <UploadCloud className="mx-auto mb-4 w-10 h-10 text-gray-500" />

        <p className="font-medium text-gray-700">
          {docType === 'default'
            ? t('warn_select_type')
            : isDragActive
            ? t('drop_file')
            : t('upload_instruction')}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {t('supports_text')}
        </p>

        <button
          type="button"
          disabled={docType === 'default'}
          className="mt-4 px-4 py-2 border rounded-lg bg-white font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {t('browse_files')}
        </button>
      </div>

      {/* Info Footer */}
      <p className="text-center text-sm text-gray-500 mt-4 italic">
        {t('secure_processing')}
      </p>

    </div>
  );
}