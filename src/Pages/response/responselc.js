import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import front from "../../Assets/page.png"


function ConfirmationPage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md ={7}>
      <Alert variant="success">
        <Alert.Heading>Confirmation</Alert.Heading>
        <p>Your reservation has been successfully submitted for the Toyota landcruiser <strong className="orange">KDJ 317Q</strong> please screenshot this to present to the admin desk!</p>
        <hr />
        <p className="mb-0">Thank you for choosing our service. We look forward to serving you.</p>
      </Alert>
</Col>
<Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={front}
                alt="car"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
              </Col>
              </Row>
    </Container>
  );
}

export default ConfirmationPage;
