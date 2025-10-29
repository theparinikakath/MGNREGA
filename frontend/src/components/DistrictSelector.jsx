import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DistrictSelector({ data, setDistrict }) {
  const [autoDistrict, setAutoDistrict] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [geoError, setGeoError] = useState("");

  // Extract unique district names from API data
  const districts = [...new Set(data.map((item) => item.district_name))];

  // ✅ Run only once — not every time month/data changes
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: {
                "User-Agent": "MGNREGA-Performance-App/1.0 (contact@example.com)",
              },
            }
          );

          const district =
            res.data.address?.district ||
            res.data.address?.county ||
            res.data.address?.state_district;

          if (district) {
            setAutoDistrict(district);

            // Try to auto-select district if it matches data
            const matched = data.find((d) =>
              d.district_name?.toLowerCase().includes(district.toLowerCase())
            );

            if (matched) {
              setSelectedDistrict(matched.district_name);
              setDistrict(matched);
            }
          } else {
            setGeoError("Couldn't detect district from location.");
          }
        } catch (err) {
          console.error("Location lookup failed:", err);
          setGeoError("Failed to retrieve location data.");
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setGeoError("Location access denied or unavailable.");
      },
      { enableHighAccuracy: true }
    );
  }, []); // ✅ only run once

  const handleSelectChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = e.target.value;
    setSelectedDistrict(selected);
    const found = data.find((item) => item.district_name === selected);
    if (found) setDistrict(found);
  };

  return (
    <div className="text-center mb-4" onSubmit={(e) => e.preventDefault()}>
      <Form.Select
        className="w-50 mx-auto shadow-sm border-primary"
        onChange={handleSelectChange}
        value={selectedDistrict}
        aria-label="Select your district"
        style={{ width: "250px" }} // ✅ same width as month dropdown
      >
        <option value="">Select your District</option>
        {districts.map((district, idx) => (
          <option key={idx} value={district}>
            {district}
          </option>
        ))}
      </Form.Select>

      {autoDistrict && !geoError && (
        <p className="mt-3 small text-secondary">
          📍 Your detected district:{" "}
          <b className="text-success">{autoDistrict}</b>
          <br />
          Currently, our data covers only <b>Meghalaya</b>. Please select it above
          if applicable.
        </p>
      )}

      {geoError && (
        <p className="mt-3 small text-danger">
          ⚠️ {geoError}
          <br />
          You can still select your district manually above.
        </p>
      )}
    </div>
  );
}
