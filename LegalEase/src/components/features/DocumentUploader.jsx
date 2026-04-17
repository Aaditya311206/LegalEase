import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle, FileSignature, ShieldCheck } from 'lucide-react';
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
    <div className="w-full max-w-2xl mx-auto mt-10 animate-in fade-in duration-700">

      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <FileSignature className="w-4 h-4 text-red-600" />
          {/* ✅ FIXED FOR TRANSLATION */}
          {t('select_doc_type')}
        </label>

        <select
          value={docType}
          onChange={(e) => {
            setDocType(e.target.value);
            setShowWarning(false);
          }}
          className={`w-full p-4 border-2 rounded-2xl bg-white font-medium transition-all appearance-none cursor-pointer ${
            showWarning 
              ? 'border-red-500 ring-4 ring-red-500/10' 
              : 'border-slate-100 focus:border-red-600 focus:ring-4 focus:ring-red-600/10'
          }`}
        >
          <option value="default" disabled>
            {/* ✅ FIXED FOR TRANSLATION */}
            {t('placeholder_doc_type')}
          </option>

          <optgroup label="Property & Real Estate">
            <option value="Rent Agreement">Rent / Lease Agreement</option>
            <option value="Property Sale Deed">Property Sale Deed</option>
            <option value="Mortgage Contract">Mortgage / Home Loan Contract</option>
          </optgroup>

          <optgroup label="Professional & Work">
            <option value="Employment Contract">Employment Contract / Offer Letter</option>
            <option value="Internship Agreement">Internship Agreement</option>
            <option value="Freelance/Service Contract">Service / Freelance Agreement</option>
            <option value="Consulting Agreement">Consulting Services Agreement</option>
          </optgroup>

          <optgroup label="Corporate & Business">
            <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
            <option value="Partnership Agreement">Partnership Deed / Agreement</option>
            <option value="Memorandum of Understanding (MOU)">Memorandum of Understanding (MOU)</option>
            <option value="Vendor Agreement">Vendor / Supply Contract</option>
          </optgroup>

          <optgroup label="Legal & Personal">
            <option value="Loan Agreement">Personal / Business Loan Agreement</option>
            <option value="Power of Attorney">Power of Attorney</option>
            <option value="Affidavit">Affidavit / Sworn Statement</option>
            <option value="Will / Testament">Last Will & Testament</option>
            <option value="Privacy Policy">Privacy Policy / Terms of Service</option>
          </optgroup>

          <option value="Other">Other Legal Instrument</option>
        </select>

        {showWarning && (
          <p className="text-red-600 text-xs font-bold mt-3 flex items-center gap-1 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            {/* ✅ FIXED FOR TRANSLATION */}
            {t('warn_select_type')}
          </p>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-500
          ${docType === 'default' 
            ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200' 
            : 'cursor-pointer bg-white border-slate-200 hover:border-red-600 hover:bg-red-50/30'
          }
          ${isDragActive ? 'border-red-600 bg-red-50 scale-[1.02]' : ''}
          ${isDragReject ? 'border-orange-500 bg-orange-50' : ''}
        `}
      >
        <input {...getInputProps()} disabled={docType === 'default'} />

        <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-colors group-hover:bg-white">
          <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-red-600' : 'text-slate-400'}`} />
        </div>

        <h4 className="font-black text-slate-900 uppercase tracking-tight text-lg mb-2">
          {/* ✅ FIXED FOR TRANSLATION */}
          {docType === 'default'
            ? t('warn_select_type')
            : isDragActive
            ? t('drop_file')
            : t('analyzing_status').replace('...', '')}
        </h4>

        <p className="text-slate-500 font-medium text-sm max-w-xs mx-auto mb-8 leading-relaxed">
          {/* ✅ FIXED FOR TRANSLATION */}
          {docType === 'default'
            ? t('warn_select_type')
            : t('upload_instruction')}
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            disabled={docType === 'default'}
            className="px-8 py-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all disabled:opacity-0"
          >
            {/* ✅ FIXED FOR TRANSLATION */}
            {t('browse_files')}
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            End-to-End Encryption Enabled
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
        <span className="h-px w-8 bg-slate-100"></span>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] italic">
          {/* ✅ FIXED FOR TRANSLATION */}
          {t('secure_processing')}
        </p>
        <span className="h-px w-8 bg-slate-100"></span>
      </div>

    </div>
  );
}