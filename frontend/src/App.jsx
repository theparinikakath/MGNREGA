import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import PerformanceCard from "./components/PerformanceCard";
import { Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import DistrictSelector from "./components/DistrictSelector";
import MonthSelector from "./components/MonthSelector";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [month, setMonth] = useState("");

  const monthMap = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  // ✅ Fetch data from backend
  const fetchData = async (selectedMonth = month) => {
    try {
      setLoading(true);
      setError(false);

      const fullMonth = monthMap[selectedMonth] || selectedMonth;

      const res = await axios.get(`${API_BASE_URL}/api/data`, {
      params: fullMonth ? { month: fullMonth } : {},
      timeout: 8000,
    });

      console.log("✅ Received data:", res.data);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching data:", err.message);
      setError(true);
      setLoading(false);
    }
  };

  // ✅ Fetch when month changes
  useEffect(() => {
    fetchData(month);
    // eslint-disable-next-line
  }, [month]);

  // 🌀 Loader view
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
        <p className="ms-3 text-secondary fw-semibold">
          Loading MGNREGA data...
        </p>
      </div>
    );
  }

  // ⚠️ Error view
  if (error && data.length === 0) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger" className="shadow-sm w-75 mx-auto">
          <h5>⚠️ Unable to connect to MGNREGA API</h5>
          <p className="mb-2">
            The data service might be temporarily down or your backend may not
            be running on <b>http://localhost:5000</b>.
          </p>
          <p className="small text-muted mb-3">
            You can retry manually below.
          </p>
          <Button variant="primary" onClick={() => fetchData(month)}>
            🔄 Retry Now
          </Button>
        </Alert>
      </div>
    );
  }

  // 🌐 Main UI
  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(to bottom right, #e3f2fd, #ffffff)",
        width: "98.8vw",
        overflowX: "hidden",
      }}
    >
      <div className="text-center px-4 mx-auto" style={{ maxWidth: "1400px" }}>
        {/* 🔹 Header */}
        <div className="mb-4">
          <h1 className="fw-bold text-primary display-5 mb-2 d-flex justify-content-center align-items-center gap-2">
            <img
              src="https://cdn.magicdecor.in/com/2024/11/26190327/Satyamev-Jayate-Indian-National-Emblem-Wallpaper-Mural-M.jpg"
              alt="logo"
              width="45"
              height="45"
            />
            Our Voice, Our Rights
          </h1>
          <p className="text-secondary fs-5">
            Empowering transparency through{" "}
            <b>MGNREGA Performance Insights</b> for <b>Meghalaya</b>.
          </p>
          <hr
            className="mx-auto"
            style={{ width: "80px", borderTop: "3px solid #007bff" }}
          />
        </div>

        {/* 🔹 Month Selector (wider) */}
        <div onSubmit={(e) => e.preventDefault()}>
          <MonthSelector
            months={[
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ]}
            setMonth={setMonth}
            style={{ width: "250px" }} // wider dropdown
          />
        </div>

        {/* 🔹 Main Section */}
        {data.length > 0 ? (
          <>
            <DistrictSelector data={data} setDistrict={setSelectedDistrict} />

            {selectedDistrict ? (
              <Row className="justify-content-center mt-4">
                <Col xs={12} md={11} lg={10} xl={9}>
                  <PerformanceCard item={selectedDistrict} />
                </Col>
              </Row>
            ) : (
              <Alert variant="info" className="shadow-sm w-75 mx-auto">
                Please select your district above to view MGNREGA performance.
              </Alert>
            )}
          </>
        ) : (
          <Alert variant="warning" className="shadow-sm w-75 mx-auto">
            No MGNREGA data available for the selected month. Please try again later.
          </Alert>
        )}

        {/* 🔹 Footer */}
        <footer className="mt-5 text-muted small">
          <p>
            Built with ❤️ for better governance & transparency.
            <br />
            <span className="text-secondary">
              Data Source: Ministry of Rural Development, Govt. of India.
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
