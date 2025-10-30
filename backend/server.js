import express from "express";
import fs from "fs";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to JSON file (inside backend/data folder)
const DATA_FILE = path.join(__dirname, "data", "mgnregaData.json");

app.use(cors());

// ✅ Load cached data if available
function loadLocalData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      console.warn("⚠️ Local data file not found.");
      return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (err) {
    console.error("❌ Error reading local data:", err);
    return [];
  }
}

// ✅ Fetch and cache latest API data
async function fetchLatestData() {
  try {
    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          api_key: "YOUR_API_KEY_HERE",
          format: "json",
          limit: 1000,
        },
      }
    );

    const records = (response.data.records || []).filter(
      (item) => item.state_name?.toLowerCase() === "madhya pradesh"
    );

    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));

    console.log("✅ Data fetched & cached.");
    return records;
  } catch (err) {
    console.warn("⚠️ API failed → using cached data");
    return loadLocalData();
  }
}

// ✅ API endpoint
app.get("/api/data", async (req, res) => {
  const { month } = req.query;
  let data = loadLocalData();

  // If data empty, fetch latest
  if (!data || data.length === 0) {
    data = await fetchLatestData();
  }

  // Filter by month
  if (month) {
    const normalized = month.toLowerCase();
    data = data.filter((item) => {
      const m = (item.month || "").toLowerCase();
      return m.includes(normalized) || m.startsWith(normalized.slice(0, 3));
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No MGNREGA data available." });
  }

  res.json(data);
});

// ✅ Serve React frontend build for Render deployment
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ✅ Start server
app.listen(PORT, () =>
  console.log(`✅ Server live at http://localhost:${PORT}`)
);
