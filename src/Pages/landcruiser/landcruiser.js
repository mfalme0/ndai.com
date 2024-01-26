import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/page.png";
import Particle from "../../components/particles";
import Landcruiser2 from "./landcruiser2.js";
import Type from "./Type";

function hillux() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">


              <h1 className="orange">
                Toyota
                <strong className="main-name"> Hillux </strong>
              </h1>
              <h2 >KDJ 316Q</h2>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Landcruiser2 />
    </section>
  );
}

export default hillux;
