import { Form } from "react-bootstrap";

export default function MonthSelector({ months, setMonth }) {
  const handleChange = (e) => {
    e.preventDefault(); // 🧩 Prevent form submission
    setMonth(e.target.value);
  };

  return (
    <div
      className="text-center mb-4"
      onSubmit={(e) => e.preventDefault()} // 🧱 Prevent any reload
    >
      <Form.Select
        className="w-50 mx-auto shadow-sm"
        onChange={handleChange}
        aria-label="Select month"
      >
        <option value="">Select Month</option>
        {months.map((month, idx) => (
          <option key={idx} value={month}>
            {month}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
