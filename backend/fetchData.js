import axios from "axios";
import fs from "fs";

// ✅ Official MGNREGA Data API endpoint + sample key
const API_URL =
  "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?format=json&offset=0&limit=10&api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

// ✅ Change this to any state you want to test
const TARGET_STATE = "MEGHALAYA";

async function fetchData() {
  try {
    const res = await axios.get(API_URL);
    const all = res.data.records;

    console.log(`🔍 Total records fetched: ${all.length}`);

    // Debug: check all state names to ensure correct filter values
    const stateNames = [...new Set(all.map((item) => item.state_name))];
    console.log("📜 States present in this dataset sample:", stateNames);

    // Filter for target state
    const filtered = all.filter(
      (item) => item.state_name?.toUpperCase() === TARGET_STATE
    );

    fs.writeFileSync(
      "./data/mgnregaData.json",
      JSON.stringify(filtered, null, 2)
    );

    if (filtered.length > 0) {
      console.log(`✅ Data fetched and saved for ${TARGET_STATE}!`);
    } else {
      console.log(`⚠️ No records found for ${TARGET_STATE}. Try another state.`);
    }
  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
  }
}

fetchData();
