// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import BillingSection from "./components/BillingSection";

function App() {
  const [items, setItems] = useState([]);

  // 📌 Called when OCR is done
  const handleItemsExtracted = (extractedItems) => {
    setItems(extractedItems);
  };

  return (
    <div className="min-h-screen bg-secondary px-4 sm:px-10 py-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <Header />

        {/* 📌 Billing Section (uses extracted items) */}
        <BillingSection ocrItems={items} />
      </div>
    </div>
  );
}

export default App;
