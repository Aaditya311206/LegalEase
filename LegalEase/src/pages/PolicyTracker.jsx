import React, { useEffect, useState } from "react";
import { Search, BookOpen, ChevronRight, ChevronLeft, Calendar } from "lucide-react";

export default function PolicyTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [policies, setPolicies] = useState([]);
  
  // 🆕 Updated Pagination: 100 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const policiesPerPage = 100; 

  // 🔥 Fetch policies from your Node backend
  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🔥 Filter by Search
  const filteredPolicies = policies.filter((policy) =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset to page 1 if the user types a new search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination Logic
  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = filteredPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy);
  const totalPages = Math.ceil(filteredPolicies.length / policiesPerPage);

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <BookOpen className="text-primary w-8 h-8" />
              Government Policy Tracker
            </h1>
            <p className="text-gray-500 mt-2">
              Showing {filteredPolicies.length} total updates from official sources.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search through 1,000+ policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="grid gap-4">
          {currentPolicies.map((policy, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-light transition-all animate-fade-in group"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-primary bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {policy.category || "General"}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <Calendar className="w-3 h-3" />
                      {policy.date}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                    {policy.title}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={policy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                  >
                    View Document
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredPolicies.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No legal documents match your search.</p>
            </div>
          )}
        </div>

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-12 space-y-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to top on change
                }}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-white hover:text-primary hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-gray-50/50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
                <span className="text-sm text-gray-500">Page</span>
                <span className="text-lg font-bold text-gray-900">{currentPage}</span>
                <span className="text-sm text-gray-500">of {totalPages}</span>
              </div>

              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to top on change
                }}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-white hover:text-primary hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-gray-50/50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-xs text-gray-400 font-medium italic">
              Displaying {indexOfFirstPolicy + 1} - {Math.min(indexOfLastPolicy, filteredPolicies.length)} of {filteredPolicies.length} updates
            </p>
          </div>
        )}

      </div>
    </div>
  );
}