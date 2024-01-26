import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../../components/particles";
import ProjectCard from "./admincards";
import chatify from "../../Assets/86.png";
import jump from "../../Assets/Hillux1.png";
import jc from "../../Assets/86ii.png";
import Admin2 from "./moddedadmin2";
import { IoMdAdd } from "react-icons/io";


function admin() {


  return (
    <section>
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Our <strong className="purple">Fleet </strong>
        </h1>
        <p style={{ color: "white" }}>
          Browse through our selection of available vehicles
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={chatify}
              title="LandCruiser 76"
              id={1}
              subtitle="KDJ 316Q"
              description="The Land Cruiser 76 Series is a 4.0l Diesel monster that will take you anywhere at any time in any conditions and would be perfect for your next adventure"
              jump="/316q"
              home="/"
           
            />
          </Col>
          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={jump}
              title="Hillux"
              id="2"
              subtitle="KDL 294F"
              description="The Hillux is an offroading Beast with a 2.8-liter turbo diesel giving it the ability to go anywhere and carry as much as you want and with comfort making it a more versatile counterpart to the LandCruiser 76 since it has a bed in order to carry all your essentials for your missions"
              jump="/294f"
              home="/"
           
            />
          </Col>
          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={jc}
              id={3}
              isBlog={true}
              title="LandCruiser 76"
              subtitle="KDJ 317Q"
              description="The Land Cruiser 76 Series is a 4.0l Diesel monster that will take you anywhere at any time in any conditions and would be perfect for your next adventure"
              jump="/317q"
              home="/"
           
            />
          </Col>
          <Col md={3} className="project-card">
            <ProjectCard
              imgPath={jc}
              id={3}
              isBlog={true}
              title="LandCruiser 76"
              subtitle="KBJ 690E"
              description="The Land Cruiser 76 Series is a 4.0l Diesel monster that will take you anywhere at any time in any conditions and would be perfect for your next adventure"
              jump="/690E"
              home="/"
           
            />
          </Col>
          </Row>
          <Row>
          <Button variant="primary" href="/add">
          <IoMdAdd />add vehicle
          </Button>
        </Row>
      </Container> 

    </Container>
    <Admin2 />
   </section>
  );
}

export default admin;
