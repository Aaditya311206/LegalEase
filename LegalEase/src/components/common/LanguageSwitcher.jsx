import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
      <Globe className="w-4 h-4 text-gray-500" />
      <select 
        onChange={changeLanguage} 
        value={i18n.language}
        className="bg-transparent text-sm font-medium outline-none cursor-pointer"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="ta">தமிழ்</option>
        <option value="te">తెలుగు</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
}