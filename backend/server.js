import express from "express";
import fs from "fs";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;
const DATA_FILE = "data/mgnregaData.json";

app.use(cors());

// 🧠 Utility: Load data safely from local file
function loadLocalData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      console.warn("⚠️ Local data file not found, returning empty array.");
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Error reading local data:", err);
    return [];
  }
}

// 🌐 Fetch latest data from the API
async function fetchLatestData() {
  try {
    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          api_key: "YOUR_API_KEY_HERE", // optional if public endpoint
          format: "json",
          limit: 1000,
        },
      }
    );

    const records = (response.data.records || []).filter(
      (item) =>
        item.state_name &&
        item.state_name.toLowerCase() === "madhya pradesh"
    );

    // Ensure data directory exists before writing
    fs.mkdirSync("data", { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));

    console.log("✅ Fetched and updated latest MGNREGA data.");
    return records;
  } catch (err) {
    console.warn("⚠️ Failed to fetch from API, using cached data instead.");
    return loadLocalData();
  }
}

// ✅ Endpoint: Serve filtered data
app.get("/api/data", async (req, res) => {
  const { month } = req.query;
  let data = loadLocalData();

  // Try refreshing data if file is empty
  if (!data || data.length === 0) {
    data = await fetchLatestData();
  }

  // 🔍 Filter by month if specified (flexible matching)
  if (month) {
    const normalized = month.toLowerCase();
    data = data.filter((item) => {
      const m = (item.month || "").toLowerCase();
      return (
        m.includes(normalized) || // e.g. "jan" in "jan-2024"
        m.startsWith(normalized.slice(0, 3)) // e.g. "jan" in "january"
      );
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No MGNREGA data available." });
  }

  res.json(data);
});

// 🟢 Start the server
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
