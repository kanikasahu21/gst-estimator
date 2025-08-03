import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ManualEntryForm = ({ onToggle, onAddItem, editingItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (editingItem) {
      setItemName(editingItem.name);
      setItemPrice(editingItem.price);
    } else {
      setItemName("");
      setItemPrice("");
    }
  }, [editingItem]);

  const handleSubmit = () => {
    if (itemName && itemPrice) {
      onAddItem({
        name: itemName,
        price: parseFloat(itemPrice),
        quantity: editingItem ? editingItem.quantity : 1, // Keep old quantity if editing
      });
      setItemName("");
      setItemPrice("");
    }
  };

  return (
    <motion.section
      className="bg-white border border-blue-200 shadow-md rounded-2xl p-6 mx-4 my-4 sm:mx-8 sm:my-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#0F2B47]">
          {editingItem ? "Edit Item" : "Manual Entry Mode"}
        </h2>
        {!editingItem && (
          <button
            onClick={onToggle}
            className="bg-[#0F2B47] hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            Use Upload Mode
          </button>
        )}
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          min="0"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#0F2B47] hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 sm:col-span-2"
        >
          {editingItem ? "Update Item" : "Add Item"}
        </button>
      </div>
    </motion.section>
  );
};

export default ManualEntryForm;
