import React, { useEffect, useState } from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";

export default function PolicyTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [policies, setPolicies] = useState([]);

  // 🔥 Fetch policies
  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 Filter
  const filteredPolicies = policies.filter((policy) =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <BookOpen className="text-primary w-8 h-8" />
              Government Policy Tracker
            </h1>
            <p className="text-gray-500 mt-2">
              Stay updated with the latest laws, translated into plain English.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6">
          {filteredPolicies.map((policy, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">

                <div className="mb-4">
                  <span className="text-xs font-bold text-primary bg-red-50 px-3 py-1 rounded-full">
                    {policy.category}
                  </span>

                  <h2 className="text-xl font-bold text-gray-900 mt-3">
                    {policy.title}
                  </h2>

                  <span className="text-sm text-gray-400">
                    {policy.date}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 rounded-lg border-l-4 bg-gray-50 border-gray-300 text-gray-600">
                  <p className="leading-relaxed">
                    This is a newly published government policy. Click below to
                    read full details.
                  </p>
                </div>

                {/* Link */}
                <div className="mt-4 flex justify-end">
                  <a
                    href={policy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium text-sm flex items-center gap-1 hover:text-primary-dark"
                  >
                    Read full official document
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No policies found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}