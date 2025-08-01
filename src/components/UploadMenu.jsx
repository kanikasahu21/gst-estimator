// Add onToggle as props
import {motion} from "framer-motion";
const UploadMenu = ({ onToggle }) => {
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

      {/* Upload box */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition duration-300"
      >
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
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
        />
      </label>
    </motion.section>
  );
};
export default UploadMenu;