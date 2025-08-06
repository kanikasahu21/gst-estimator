# AI-Powered GST & Billing Estimator

An AI-powered bill estimator that allows users to upload a menu image or manually enter items and get the total bill amount with applicable GST, calculated using both **rule-based logic** and **AI classification**.

## 🚀 Live Demo
🔗 [View GST Estimator Live](https://gst-estimator-frontend.vercel.app/)

---

## Overview

This project combines **OCR (Tesseract.js)** for menu text extraction, **Gemini API** for AI-based GST classification, and **rule-based GST mapping** for common items to provide an accurate, real-time bill estimation experience.
The application is fully responsive, optimized for mobile and desktop, and features smooth animations with **Framer Motion**.

---

## Day 1 Progress

**Project Setup**

* Initialized with **Vite + React**.
* Configured **Tailwind CSS** for responsive design.
* Added **Framer Motion** for interactive animations.

**UI Development**

* Designed:

  * **Header** with animated logo and title.
  * **Upload Menu** section with drag-and-drop file support.
  * **Manual Entry** form for adding items manually.
  * **ItemListPlaceholder** UI for displaying ordered items.
  * **TotalBillPlaceholder** UI for showing total cost.
* Added toggle functionality between **Upload** and **Manual Entry** modes.

**Design**

* Blue & White theme based on project branding.
* Consistent spacing and clean layout.
* Mobile-friendly structure with smooth transitions.

---

## Day 2 Progress

**OCR Integration (Frontend)**

* Added **Tesseract.js** for extracting text from uploaded menu images directly in the browser.
* Implemented text preprocessing:

  * Removed unwanted symbols (₹, dashes).
  * Parsed extracted text into `{ name, price }` format.
* Auto-populated **Ordered Items** list with default quantity = 1.

**Backend Setup**

* Built lightweight **Node.js + Express.js** server to handle API requests and AI integration.
* Enabled **CORS** for secure frontend-backend communication.

**Frontend Enhancements**

* Connected frontend to backend API for GST classification.
* Enabled real-time editing, deleting, and updating of quantities for both OCR and manual items.
* Created GST calculation logic integrated into the UI.

---

## Final Day Progress (Project Completion)

**Key Features**

* **Rule-based GST calculation:**

  * Common menu items (e.g., pizza, coffee, water bottle) directly mapped to predefined GST rates for faster calculation.
* **AI-based GST classification:**

  * Integrated **Gemini API** to identify correct GST rates for items not covered by rules.
* **Bill summary with GST breakdown:**

  * Displays subtotal, GST per item, and total amount in a clean, animated layout.

**Performance and UX Improvements**

* Added loading states and error handling for API calls.
* Reduced unnecessary re-renders and optimized component structure.
* Finalized fully functional flow for **OCR + Manual Entry + Bill Summary**.

---

## Tech Stack

### Frontend

* React + Vite
* Tailwind CSS (responsive UI)
* Framer Motion (animations)
* Tesseract.js (OCR AI for text extraction)

### Backend

* Node.js + Express.js
* Gemini API (AI-based GST classification)
* CORS (secure communication)

### Development Tools

* GitHub (version control)

---

## How to Use the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kanikasahu21/gst-estimator.git
   ```
2. **Navigate to frontend and install dependencies:**

   ```bash
   cd gst-estimator/frontend
   npm install
   npm run dev
   ```
3. **Start backend in another terminal:**

   ```bash
   cd ../backend
   npm install
   npm start
   ```
4. **Open the app in your browser** (usually `http://localhost:5173`).
5. **Use the app:**

   * Upload a menu image to auto-detect items and prices using OCR.
   * Or switch to manual entry to add items yourself.
   * Edit, delete, or update item quantities.
   * View total bill with GST breakdown.

---

## Folder Structure

```
gst-estimator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── ...
├── backend/
│   ├── server.js
├── .env (ignored in git)
└── README.md
```

---

## Project Status

The GST Estimator project is **completed and fully functional**, combining:

* Rule-based GST logic for speed.
* AI classification (Gemini API)** for flexibility.
* **OCR (Tesseract.js)** for intelligent menu extraction.
* Fully responsive.
