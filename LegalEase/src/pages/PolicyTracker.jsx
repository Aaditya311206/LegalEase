import React, { useEffect, useState } from "react";
import { Search, BookOpen, ChevronRight, ChevronLeft, Calendar, Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function PolicyTracker() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🚨 UPDATED: Changed from 10 to 100
  const policiesPerPage = 100; 

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => {
        setPolicies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredPolicies = policies.filter((policy) =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = filteredPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy);
  const totalPages = Math.ceil(filteredPolicies.length / policiesPerPage);

  // Helper to scroll to top smoothly when page changes
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* 🚀 Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/20">
                <BookOpen className="text-white w-7 h-7" />
              </div>
              {t('policy_title') || "Government Policy Tracker"}
            </h1>
            <p className="text-slate-500 mt-3 font-medium ml-1">
              {isLoading 
                ? "Synchronizing with government databases..." 
                : t('policy_sub', { count: filteredPolicies.length }) || `Showing ${filteredPolicies.length} updates from verified sources.`}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('policy_search') || "Search through policies..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 shadow-sm transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* 📜 Results Area */}
        <div className="grid gap-5">
          {isLoading ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-4" />
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                Fetching Live Policies...
              </p>
            </div>
          ) : currentPolicies.length > 0 ? (
            currentPolicies.map((policy, index) => (
              <div
                key={index}
                className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 hover:border-red-600/30 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
              >
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">
                        {policy.category || t('policy_tag') || "Government"}
                      </span>
                      <div className="flex items-center text-slate-400 text-xs font-bold gap-1.5 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        {policy.date}
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-snug">
                      {policy.title}
                    </h2>
                  </div>

                  <div className="flex items-center">
                    <a
                      href={policy.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap bg-slate-50 text-slate-600 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 group/btn active:scale-95 shadow-sm"
                    >
                      {t('view_doc') || "View Document"}
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                {t('no_docs') || "No Matching Policies Found"}
              </p>
            </div>
          )}
        </div>

        {/* 🔢 Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex flex-col items-center mt-16 space-y-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  scrollToTop();
                }}
                disabled={currentPage === 1}
                className="p-3.5 rounded-2xl border border-slate-200 text-slate-600 bg-white hover:text-red-600 hover:border-red-600 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="bg-white px-8 py-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('page')}</span>
                <span className="text-xl font-black text-slate-900">{currentPage}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('of')} {totalPages}</span>
              </div>

              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  scrollToTop();
                }}
                disabled={currentPage === totalPages}
                className="p-3.5 rounded-2xl border border-slate-200 text-slate-600 bg-white hover:text-red-600 hover:border-red-600 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Displaying current range for clarity */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Showing {indexOfFirstPolicy + 1}-{Math.min(indexOfLastPolicy, filteredPolicies.length)} of {filteredPolicies.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}