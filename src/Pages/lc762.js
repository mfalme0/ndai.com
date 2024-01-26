import React, { useEffect, useState } from "react";
import Particle from "../components/particles";
import { Container, Button } from "react-bootstrap";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import kirby from "../Assets/86ii.png"




function Land() {
  const [availabilityData, setAvailabilityData] = useState({});
  const [showButton, setShowButton] = useState(false);

  // Function to fetch availability data from the server
  const fetchAvailabilityData = async () => {
    try {
      const response = await fetch("http://localhost:8080/availability");
      if (response.ok) {
        const data = await response.json();
        setAvailabilityData(data);
      } else {
        console.error("Error fetching availability data");
      }
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  useEffect(() => {
    fetchAvailabilityData();
  }, []);

  useEffect(() => {
    // Check if the vehicle with a specific ID is available
    const vehicleIdToCheck = 3; // Adjust this ID as needed
    if (availabilityData[vehicleIdToCheck] === "available") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [availabilityData]);

  return (
    <Container fluid className="view">
      <Particle />
      <Container>
        <image variant= "top" src ={kirby} />
        <h1 className="project-heading">
          LandCruiser 76 
        </h1>
        <h2><strong className="orange">KDJ 316Q</strong></h2>
      
        <p style={{ color: "white" }}>
          The Land Cruiser 76 Series is a 4.0l Diesel monster that will take you anywhere at any time in any conditions and would be perfect for your next adventure.
        </p>
        {showButton ? (
          <Button variant="primary" href="/" target="">
            
           <BsFillBookmarkCheckFill/> &nbsp; submit
          </Button>
      
        ) : (
          <p>Vehicle is currently not available for reservation.</p>
        )}
      </Container>
    </Container>
  );
}

export default Land;