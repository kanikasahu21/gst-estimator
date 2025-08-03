// src/App.jsx
import React from "react";
import Header from "./components/Header";
import BillingSection from "./components/BillingSection";

function App() {
  return (
    <div className="min-h-screen bg-secondary px-4 sm:px-10 py-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <Header />
        <BillingSection />
      </div>
    </div>
  );
}

export default App;
