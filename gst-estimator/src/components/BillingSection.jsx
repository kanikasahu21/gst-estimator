import React, { useState, useEffect } from "react";
import ManualEntryForm from "./ManualEntryForm";
import ItemList from "./ItemListPlaceholder";
import TotalBillPlaceholder from "./TotalBillPlaceholder";
import UploadMenu from "./UploadMenu";

export default function BillingSection({ ocrItems = [] }) {
  const [items, setItems] = useState([]);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ When OCR items come from App.jsx, add them automatically
  useEffect(() => {
    if (ocrItems.length > 0) {
      const itemsWithQuantity = ocrItems.map((item) => ({
        ...item,
        name: item.name.replace(/[-₹]/g, "").trim(),
        quantity: 1
      }));
      setItems((prev) => [...prev, ...itemsWithQuantity]);
    }
  }, [ocrItems]);

  // ✅ Add or update item manually
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

  // ✅ Add items directly from UploadMenu OCR
  const handleItemsExtracted = (extractedItems) => {
    const itemsWithQuantity = extractedItems.map((item) => ({
      ...item,
      name: item.name.replace(/[-₹]/g, "").trim(),
      quantity: 1
    }));
    setItems((prev) => [...prev, ...itemsWithQuantity]);
  };

  // ✅ Delete item
  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  // ✅ Update quantity
  const handleUpdateQuantity = (index, change) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(0, updatedItems[index].quantity + change);
    setItems(updatedItems);
  };

  // ✅ Toggle between Manual & Upload modes
  const handleToggleMode = () => {
    setShowManualEntry((prev) => !prev);
    setEditingIndex(null);
  };

  // ✅ Edit item
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
          onItemsExtracted={handleItemsExtracted}
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
