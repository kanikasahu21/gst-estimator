import React from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

const ItemList = ({ items = [], onDeleteItem }) => {
  return (
    <motion.section
      className="bg-white border border-blue-200 shadow-md rounded-2xl p-6 mx-4 my-4 sm:mx-8 sm:my-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-lg sm:text-xl font-semibold text-[#0F2B47] mb-4">
        Ordered Items
      </h2>

      {items.length === 0 ? (
        <p className="text-blue-500">No items added yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center pb-2"
            >
              <span className="text-[#0F2B47] font-medium">
                {item.name} - ₹{item.price.toFixed(2)}
              </span>
              <button
                onClick={() => onDeleteItem(index)}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete item"
              >
                <MdDelete size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
};

export default ItemList;
