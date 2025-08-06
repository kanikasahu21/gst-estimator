import express from "express";
import cors from "cors";
import {fetch} from "undici";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app = express();
app.use(cors({
  origin: "*", // Or restrict it to: "http://localhost:5173"
  methods: ["GET", "POST"],
}));
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function normalizeItemName(name) {
  const lower = name.toLowerCase();
  if (lower.includes("momo")) return "momos";
  if (lower.includes("pizza")) return "pizza";
  if (lower.includes("burger")) return "burger";
  if (lower.includes("sandwich")) return "sandwich";
  if (lower.includes("pasta")) return "pasta";
  if (lower.includes("biryani")) return "biryani";
  if (lower.includes("ice cream")) return "ice cream";
  if (lower.includes("coffee")) return "coffee";
  if (lower.includes("tea")) return "tea";
  if (lower.includes("bread")) return "bread";
  if (lower.includes("roll")) return "roll";
  if (lower.includes("paratha")) return "paratha";
  if (lower.includes("dosa")) return "dosa";
  if (lower.includes("idli")) return "idli";
  if (lower.includes("vada")) return "vada";
  if (lower.includes("chaat")) return "chaat";
  if (lower.includes("samosa")) return "samosa";
  if (lower.includes("pakora")) return "pakora";
  if (lower.includes("fries")) return "fries";
  if (lower.includes("soft drink") || lower.includes("coke") || lower.includes("pepsi")) return "soft drink";
  if (lower.includes("water")) return "water bottle";
  return name;
}

function getRuleBasedGST(itemName) {
  const rules = {
    "momos": { gstRate: 5, reasoning: "Momos are taxed at 5% as a restaurant-served food item." },
    "pizza": { gstRate: 18, reasoning: "Pizza is taxed at 18% because it's restaurant-served." },
    "burger": { gstRate: 18, reasoning: "Burgers are taxed at 18% because they're restaurant-served." },
    "sandwich": { gstRate: 5, reasoning: "Sandwiches are taxed at 5% under GST rules." },
    "pasta": { gstRate: 18, reasoning: "Pasta is taxed at 18% in restaurants." },
    "biryani": { gstRate: 5, reasoning: "Biryani is taxed at 5% under GST rules." },
    "ice cream": { gstRate: 18, reasoning: "Ice cream is taxed at 18% under GST rules." },
    "coffee": { gstRate: 5, reasoning: "Coffee is taxed at 5% under GST rules." },
    "tea": { gstRate: 5, reasoning: "Tea is taxed at 5% under GST rules." },
    "bread": { gstRate: 5, reasoning: "Packaged branded bread is taxed at 5% under GST rules." },
    "roll": { gstRate: 5, reasoning: "Rolls are taxed at 5% under GST rules." },
    "paratha": { gstRate: 5, reasoning: "Paratha is taxed at 5% under GST rules." },
    "dosa": { gstRate: 5, reasoning: "Dosa is taxed at 5% under GST rules." },
    "idli": { gstRate: 5, reasoning: "Idli is taxed at 5% under GST rules." },
    "vada": { gstRate: 5, reasoning: "Vada is taxed at 5% under GST rules." },
    "chaat": { gstRate: 5, reasoning: "Chaat is taxed at 5% under GST rules." },
    "samosa": { gstRate: 5, reasoning: "Samosa is taxed at 5% under GST rules." },
    "pakora": { gstRate: 5, reasoning: "Pakora is taxed at 5% under GST rules." },
    "fries": { gstRate: 18, reasoning: "French fries are taxed at 18% as prepared restaurant food." },
    "soft drink": { gstRate: 18, reasoning: "Soft drinks are taxed at 18% under GST rules." },
    "cold drink": { gstRate: 18, reasoning: "Cold drinks are taxed at 18% under GST rules." },
    "water bottle": { gstRate: 18, reasoning: "Packaged drinking water is taxed at 18% under GST rules." },
    "mineral water": { gstRate: 18, reasoning: "Mineral water is taxed at 18% under GST rules." },
    "bisleri": { gstRate: 18, reasoning: "Branded bottled water is taxed at 18% under GST rules." }
  };

  return rules[itemName.toLowerCase()] || null;
}


function extractJSONFromText(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
  return null;
}

const gstCache = {};

async function getGSTFromAI(itemName) {
  const normalized = normalizeItemName(itemName);
  const key = normalized.toLowerCase();

  if (gstCache[key]) return gstCache[key];

  const ruleBased = getRuleBasedGST(normalized);
  if (ruleBased) {
    gstCache[key] = ruleBased;
    return ruleBased;
  }

  console.log(`🤖 Calling Gemini for: "${normalized}"`);

  try {
    const prompt = `You are a tax assistant. 
Return ONLY valid JSON with keys: "gstRate" (number) and "reasoning" (short text).
Example: {"gstRate": 18, "reasoning": "Pizza is taxed at 18% because it's restaurant-served."}
Food Item: ${normalized}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 }
        }),
      }
    );

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    console.log(`📨 Gemini raw response for "${normalized}":`, text);

    let parsed = extractJSONFromText(text);

    if (!parsed || typeof parsed.gstRate !== "number") {
      console.warn(`⚠️ Gemini response not parsable. Using default 18% for "${normalized}"`);
      parsed = { gstRate: 18, reasoning: `${normalized} is taxed at 18% as default.` };
    }

    gstCache[key] = parsed;
    return parsed;
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    const fallback = { gstRate: 18, reasoning: `${normalized} is taxed at 18% due to API error.` };
    gstCache[key] = fallback;
    return fallback;
  }
}

app.post("/calculate-gst", async (req, res) => {
  const { items } = req.body;
  console.log("📥 Received items:", items);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid or empty items array" });
  }

  let totalBeforeGST = 0;
  let totalGST = 0;

  const uniqueNames = [...new Set(items.map(i => normalizeItemName(i.name)))];

  await Promise.all(uniqueNames.map(name => getGSTFromAI(name)));

  const itemsWithGST = items.map(item => {
    const normalized = normalizeItemName(item.name);
    const { gstRate, reasoning } = gstCache[normalized.toLowerCase()];

    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    const itemTotal = price * quantity;
    const gstAmount = parseFloat(((itemTotal * gstRate) / 100).toFixed(2));

    totalBeforeGST += itemTotal;
    totalGST += gstAmount;

    return { name: item.name, quantity, price, gstRate, gstAmount, reasoning };
  });

  const response = {
    items: itemsWithGST,
    totalBeforeGST: totalBeforeGST.toFixed(2),
    totalGST: totalGST.toFixed(2),
    totalWithGST: (totalBeforeGST + totalGST).toFixed(2),
  };

  console.log("✅ Final bill summary:", response);
  res.json(response);
});

app.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Backend running on port 5000");
});
