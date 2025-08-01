// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import UploadMenu from "./components/UploadMenu";
import ManualEntryForm from "./components/ManualEntryForm";
import ItemList from "./components/ItemListPlaceholder";
import TotalBillPlaceholder from "./components/TotalBillPlaceholder";

function App() {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [items, setItems] = useState([]);

  // Toggle between Upload and Manual Entry
  const handleToggleMode = () => {
    setShowManualEntry((prev) => !prev);
  };

  // Add Item
  const handleAddItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  // ❌ Delete Item
  const handleDeleteItem = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-secondary px-4 sm:px-10 py-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <Header />

        {/* Toggle between Upload and Manual Entry modes */}
        {showManualEntry ? (
          <ManualEntryForm onToggle={handleToggleMode} onAddItem={handleAddItem} />
        ) : (
          <UploadMenu onToggle={handleToggleMode} />
        )}

        <ItemList items={items} onDeleteItem={handleDeleteItem} />

        <TotalBillPlaceholder items={items} />
      </div>
    </div>
  );
}

export default App;
