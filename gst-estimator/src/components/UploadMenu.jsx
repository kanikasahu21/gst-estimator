import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import backendURL from "../config";

const UploadMenu = ({ onToggle, onItemsExtracted }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      // ✅ Frontend OCR
      const result = await Tesseract.recognize(file, "eng");
      const rawText = result.data.text;

      const lines = rawText.split("\n").filter(line => line.trim() !== "");
      const parsedItems = lines.map(line => {
        const match = line.match(/(.*?)(\d+(\.\d{1,2})?)$/);
        return match
          ? { name: match[1].trim(), price: parseFloat(match[2]) }
          : null;
      }).filter(Boolean);

      if (parsedItems.length > 0) {
        onItemsExtracted(parsedItems);
      }

    } catch (err) {
      console.error("❌ Error during OCR:", err);

      // 🔄 Backend fallback
      try {
        const formData = new FormData();
        formData.append("menuImage", file);

        const res = await fetch(`${backendURL}/upload-menu`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.items && data.items.length > 0) {
          onItemsExtracted(data.items);
        }
      } catch (backendErr) {
        console.error("❌ Backend OCR failed:", backendErr);
      }
    } finally {
      setLoading(false);
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
          Upload Menu Image
        </h2>
        <button
          onClick={onToggle}
          className="bg-[#0F2B47] hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Use Manual Entry
        </button>
      </div>

      {/* Upload Box */}
      <div
        onClick={handleBoxClick}
        className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition duration-300"
      >
        {loading ? (
          <span className="text-blue-600 text-sm font-medium">Processing...</span>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0l-4 4m4-4l4 4m5 4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <span className="text-blue-600 text-sm">Click to upload or drag file</span>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileUpload}
      />
    </motion.section>
  );
};

export default UploadMenu;
