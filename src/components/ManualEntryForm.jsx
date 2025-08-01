import React, { useState } from "react";
import { motion } from "framer-motion";

const ManualEntryForm = ({ onToggle, onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleAddItem = () => {
    if (itemName && itemPrice) {
      onAddItem({
        name: itemName,
        price: parseFloat(itemPrice),
      }); // 🔁 Send to App.jsx
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
          Manual Entry Mode
        </h2>
        <button
          onClick={onToggle}
          className="bg-[#0F2B47] hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Use Upload Mode
        </button>
      </div>

      {/* Input Fields */}
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
          onClick={handleAddItem}
          className="bg-[#0F2B47] hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 sm:col-span-2"
        >
          Add Item
        </button>
      </div>
    </motion.section>
  );
};

export default ManualEntryForm;
