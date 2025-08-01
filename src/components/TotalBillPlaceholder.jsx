// src/components/TotalBillPlaceholder.jsx
import React from "react";
import { motion } from "framer-motion";

const TotalBillPlaceholder = ({ items = [] }) => {
  const subtotal = items.reduce((acc, item) => acc + Number(item.price), 0);
  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const total = subtotal + gstAmount;

  return (
    <motion.section
      className="bg-white border border-blue-200 shadow-md rounded-2xl p-6 mx-4 my-4 sm:mx-8 sm:my-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-lg sm:text-xl font-semibold text-[#0F2B47] mb-4">
        Bill Summary
      </h2>
      <div className="text-[#0F2B47] font-[Manrope] space-y-2 text-base sm:text-lg">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹{gstAmount.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-blue-800 text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </motion.section>
  );
};

export default TotalBillPlaceholder;
