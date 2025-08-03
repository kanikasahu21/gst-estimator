import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Tesseract from "tesseract.js";
import sharp from "sharp";
// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Create uploads folder if not exists
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Route to handle file upload + OCR
app.post("/upload-menu", upload.single("menuImage"), async (req, res) => {
  try {
    console.log("File uploaded:", req.file);

    // Path for processed image
    const processedImagePath = `${req.file.destination}/processed-${req.file.filename}`;

    // Preprocess image: resize, grayscale, increase contrast
    await sharp(req.file.path)
      .resize({ width: 1000 }) // reduce width for faster OCR
      .grayscale() // convert to black & white
      .normalize() // improve contrast
      .toFile(processedImagePath);

    // Run OCR on preprocessed image
    const result = await Tesseract.recognize(processedImagePath, "eng");
    const rawText = result.data.text;
    console.log("Extracted text:", rawText);

    // Parse lines into items
    const lines = rawText.split("\n").filter(line => line.trim() !== "");
    const items = lines.map(line => {
      const match = line.match(/(.*?)(\d+(\.\d{1,2})?)$/);
      return match
        ? { name: match[1].trim(), price: parseFloat(match[2]) }
        : null;
    }).filter(Boolean);

    // ✅ Delete processed image after OCR
    fs.unlink(processedImagePath, (err) => {
      if (err) console.error("Error deleting processed image:", err);
      else console.log("Processed image deleted:", processedImagePath);
    });
    setTimeout(() => {
  fs.unlink(path.resolve(req.file.path), (err) => {
    if (err) console.error("Error deleting original image:", err);
    else console.log("Original image deleted:", req.file.path);
  });
}, 500); // 0.5s delay

    res.json({ items });
  } catch (err) {
    console.error("OCR Error:", err);
    res.status(500).json({ error: "Failed to process image" });
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
