# 💰 GST Estimator

An AI-powered bill estimator that helps users understand the true cost of their food before the bill arrives.

---

## 🚀 Day 1 Progress

✅ Project Setup:
- Initialized with **Vite + React**
- Integrated **Tailwind CSS**
- Added **Framer Motion** for animations

🎨 UI Completed:
- Responsive **Header** with animated logo and title
- **Upload Menu** with drag-and-drop file support
- **Manual Entry** form for entering items manually
- Toggle functionality between Upload and Manual Entry

🖼️ Design:
- Blue & White theme inspired by brand logo
- Consistent spacing and mobile responsiveness
- Clean layout with interactive transitions

---

## 🚀 Day 2 Progress

⚙️ Backend Setup:
- Created **Node.js + Express.js** backend
- Integrated **Multer** for file uploads
- Added **Sharp** for image preprocessing (resize, grayscale, contrast boost)
- Added **Tesseract.js** for OCR to read menu items from uploaded images
- Automatic deletion of original & processed images after OCR

🧠 OCR Features:
- Extracts menu items & prices from uploaded images
- Cleans text (removes extra dashes, ₹ symbols)
- Parses into `{ name, price }` format

💡 Frontend Updates:
- Connected frontend to backend API
- On image upload → extracted items appear instantly in **Ordered Items**
- Default quantity = 1 for OCR items
- Fully functional **edit, delete, quantity update** for both OCR & manual items
- GST Calculation added for all items

---

## 📁 Tech Stack

### Frontend:
- React + Vite
- Tailwind CSS
- Framer Motion

### Backend:
- Node.js + Express.js
- Multer (file uploads)
- Sharp (image preprocessing)
- Tesseract.js (OCR)
- CORS
=======
## 📁 Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion
>>>>>>> bd6e3e14043d9a247bb430a839e93f33a2c26814
