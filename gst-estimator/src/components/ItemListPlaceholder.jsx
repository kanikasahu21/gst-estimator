import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete, MdEdit } from "react-icons/md";

const ItemList = ({ items = [], onDeleteItem, onUpdateQuantity, onEditItem }) => {
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
              className="flex justify-between items-center pb-2 border-b border-gray-200"
            >
              {/* Item Name + Price */}
              <span className="text-[#0F2B47] font-medium">
                {item.name} - ₹{item.price?.toFixed(2) || "0.00"}
              </span>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(index, -1)}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={item.quantity || 1}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-semibold text-[#0F2B47]"
                  >
                    {item.quantity || 1}
                  </motion.span>
                </AnimatePresence>
                <button
                  onClick={() => onUpdateQuantity(index, 1)}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  +
                </button>

                {/* Edit */}
                <button
                  onClick={() => onEditItem(index)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Edit item"
                >
                  <MdEdit size={20} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDeleteItem(index)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete item"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
};

export default ItemList;
