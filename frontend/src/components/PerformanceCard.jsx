import { Card, Container, Row, Col } from "react-bootstrap";

export default function PerformanceCard({ item }) {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Header
              className="text-white text-center py-3 fs-4 fw-bold"
              style={{
                background: "linear-gradient(90deg, #007bff, #00b4d8)",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
              }}
            >
              {item.district_name || "District Data"}
            </Card.Header>
            <Card.Body className="p-4 bg-light">
              <Row className="g-3">
                <Col sm={6}>
                  <p><b>Month:</b> {item.month || "N/A"}</p>
                  <p><b>Financial Year:</b> {item.fin_year || "N/A"}</p>
                  <p><b>Households Worked:</b> {item.Total_Households_Worked || "N/A"}</p>
                  <p><b>Individuals Worked:</b> {item.Total_Individuals_Worked || "N/A"}</p>
                  <p><b>Women Person-Days:</b> {item.Women_Persondays || "N/A"}</p>
                </Col>
                <Col sm={6}>
                  <p><b>Expenditure (₹ Lakhs):</b> {item.Total_Exp || "N/A"}</p>
                  <p><b>Average Wage Rate (₹/day):</b> {item.Average_Wage_rate_per_day_per_person || "N/A"}</p>
                  <p><b>Average Employment per HH (days):</b> {item.Average_days_of_employment_provided_per_Household || "N/A"}</p>
                  <p><b>Ongoing Works:</b> {item.Number_of_Ongoing_Works || "N/A"}</p>
                  <p><b>Completed Works:</b> {item.Number_of_Completed_Works || "N/A"}</p>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center text-muted small bg-white rounded-bottom-4">
              Data Source: MGNREGA (2024–25)
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
