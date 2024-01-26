import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../components/particles";
import ProjectCard from "../components/modedcards";

function Projects() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/getcars"); // Change the URL as needed
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          console.error("Failed to fetch vehicle data");
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
  
    fetchVehicles();
  }, []);
   // Empty dependency array means this effect runs once when the component mounts

  return (
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
          {vehicles.map((vehicle) => (
            <Col key={vehicle.id} md={4} className="project-card">
              <ProjectCard
                imgPath={vehicle.imageUrl} // Assuming your vehicle data has an 'imageUrl' property
                title={vehicle.carname}
                id={vehicle.model}
                subtitle={vehicle.model}
                description={vehicle.plates}
                jump={`/${vehicle.id}`} // Use the vehicle id or any unique identifier
                home="/"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
