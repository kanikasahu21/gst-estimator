import React, { useState } from "react";
import ManualEntryForm from "./ManualEntryForm";
import ItemList from "./ItemListPlaceholder";
import TotalBillPlaceholder from "./TotalBillPlaceholder";
import UploadMenu from "./UploadMenu";

export default function BillingSection() {
  const [items, setItems] = useState([]);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // ✅ track editing

  // Add or Update item manually
  const handleAddOrUpdateItem = (item) => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = { ...updatedItems[editingIndex], ...item };
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, item]);
    }
  };

  // ✅ Add items from OCR
  const handleItemsExtracted = (ocrItems) => {
  const itemsWithQuantity = ocrItems.map(item => ({
    ...item,
    name: item.name.replace(/[-₹]/g, "").trim(), // remove dash & rupee sign
    quantity: 1
  }));
  setItems(prev => [...prev, ...itemsWithQuantity]);
};


  // Delete item
  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  // Update quantity (+/-)
  const handleUpdateQuantity = (index, change) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(0, updatedItems[index].quantity + change);
    setItems(updatedItems);
  };

  // Toggle between modes
  const handleToggleMode = () => {
    setShowManualEntry(prev => !prev);
    setEditingIndex(null);
  };

  // Edit item
  const handleEditItem = (index) => {
    setEditingIndex(index);
    if (!showManualEntry) setShowManualEntry(true);
  };

  return (
    <div>
      {showManualEntry ? (
        <ManualEntryForm
          onToggle={handleToggleMode}
          onAddItem={handleAddOrUpdateItem}
          editingItem={editingIndex !== null ? items[editingIndex] : null}
        />
      ) : (
        <UploadMenu
          onToggle={handleToggleMode}
          onItemsExtracted={handleItemsExtracted} // ✅ pass handler
        />
      )}

      <ItemList
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateQuantity={handleUpdateQuantity}
        onEditItem={handleEditItem}
      />
      <TotalBillPlaceholder items={items} />
    </div>
  );
}
