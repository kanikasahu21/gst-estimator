import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/gst.webp"; // Ensure the logo is saved in this path

const Header = () => {
  return (
    <motion.header
      className="flex flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8 py-4 px-4 sm:px-8"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12 }}
    >
      <motion.img
        src={logo}
        alt="GST Estimator Logo"
        className="w-20 sm:w-24 h-auto"
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <motion.div
        className="flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h1 className="font-[Manrope] text-4xl sm:text-5xl font-bold text-[#0F2B47] leading-tight tracking-wide">
          GST&nbsp;<span className="text-[#0F2B47] tracking-normal">ESTIMATOR</span>
        </h1>
        <p className="font-[Manrope] text-sm sm:text-lg text-[#0d1986]">
          Know your real bill before it arrives.
        </p>
      </motion.div>
    </motion.header>
  );
};

export default Header;
