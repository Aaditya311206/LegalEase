import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import DocumentChecker from './pages/DocumentChecker'; 
import PolicyTracker from './pages/PolicyTracker'; // <-- New import

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
      Legal Intelligence, <span className="text-primary">Simplified.</span>
    </h1>
    <p className="text-xl text-gray-500 max-w-2xl">
      Upload your legal documents and let AI instantly detect risks, missing clauses, and unfair terms before you sign.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checker" element={<DocumentChecker />} /> 
            <Route path="/policies" element={<PolicyTracker />} /> {/* <-- New Route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;