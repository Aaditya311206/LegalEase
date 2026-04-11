import React from 'react';
import { FileText, ShieldAlert, Clock } from 'lucide-react';

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/auth'; // Force redirect to login
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Log Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary"><FileText /></div>
            <div><p className="text-sm text-gray-500">Documents Analyzed</p><p className="text-2xl font-bold">12</p></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-red-50 p-3 rounded-lg text-red-500"><ShieldAlert /></div>
            <div><p className="text-sm text-gray-500">Risks Detected</p><p className="text-2xl font-bold">34</p></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-blue-500"><Clock /></div>
            <div><p className="text-sm text-gray-500">Time Saved</p><p className="text-2xl font-bold">8 hrs</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          <p>Your recent document history will appear here.</p>
        </div>
      </div>
    </div>
  );
}