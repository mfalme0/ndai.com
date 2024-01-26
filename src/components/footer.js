import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UseAnimations from "react-useanimations";
import linkedin from "react-useanimations/lib/linkedin"


function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Developed By Joseph Gitau for Vision Fund Ke</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} JG</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">

            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/joseph-gitau-471678208/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                 <UseAnimations animation={linkedin} size={56} />

              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
