import React, { useState } from 'react';
import { Search, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export default function PolicyTracker() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [simplifiedView, setSimplifiedView] = useState({});

  const categories = ['All', 'Renting', 'Business', 'Property'];

  // Dummy data simulating government policies
  const policies = [
    {
      id: 1,
      category: 'Renting',
      title: 'Model Tenancy Act, 2021',
      date: 'Updated: Oct 2023',
      legalText: 'The Act mandates that no person shall let or take on rent any premises except by an agreement in writing, which shall be informed to the Rent Authority by the landlord and tenant jointly.',
      simpleText: 'You and your landlord MUST sign a written rent agreement. Verbal agreements are no longer legally valid. You also have to register this agreement with the local government.'
    },
    {
      id: 2,
      category: 'Business',
      title: 'MSME Registration & Protection',
      date: 'Updated: Jan 2024',
      legalText: 'Where any buyer fails to make payment of the amount to the supplier, the buyer shall be liable to pay compound interest with monthly rests to the supplier on that amount from the appointed day.',
      simpleText: 'If a client delays paying your small business (MSME) on time, they are legally forced to pay you compound interest as a penalty. Register your startup to get this protection!'
    },
    {
      id: 3,
      category: 'Property',
      title: 'RERA Carpet Area Rules',
      date: 'Updated: Mar 2024',
      legalText: 'Carpet area means the net usable floor area of an apartment, excluding the area covered by the external walls, areas under services shafts, exclusive balcony or verandah area.',
      simpleText: 'Builders can only charge you for the space you can actually walk on inside your house. They cannot charge you for the thickness of the walls or the common hallway.'
    }
  ];

  // Filter logic
  const filteredPolicies = policies.filter(policy => 
    (activeCategory === 'All' || policy.category === activeCategory) &&
    policy.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle AI Simplifier
  const toggleSimplify = (id) => {
    setSimplifiedView(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
            <p className="text-gray-500 mt-2">Stay updated with the latest laws, translated into plain English.</p>
          </div>

          {/* Search Bar */}
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

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${activeCategory === category 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Policy Cards */}
        <div className="grid gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-red-50 px-3 py-1 rounded-full">
                      {policy.category}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mt-3">{policy.title}</h2>
                    <span className="text-sm text-gray-400">{policy.date}</span>
                  </div>
                  
                  {/* AI Toggle Button */}
                  <button 
                    onClick={() => toggleSimplify(policy.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                      ${simplifiedView[policy.id] 
                        ? 'bg-primary-light/10 border-primary-light text-primary' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Sparkles className={`w-4 h-4 ${simplifiedView[policy.id] ? 'text-primary' : 'text-gray-400'}`} />
                    {simplifiedView[policy.id] ? 'View Legal Text' : "Explain like I'm 18"}
                  </button>
                </div>

                <div className={`p-4 rounded-lg border-l-4 ${simplifiedView[policy.id] ? 'bg-primary-light/5 border-primary text-gray-800' : 'bg-gray-50 border-gray-300 text-gray-600'}`}>
                  <p className="leading-relaxed">
                    {simplifiedView[policy.id] ? policy.simpleText : policy.legalText}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="text-primary font-medium text-sm flex items-center gap-1 hover:text-primary-dark transition-colors">
                    Read full official document <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredPolicies.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No policies found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}