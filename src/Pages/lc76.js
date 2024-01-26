import React, { useEffect, useState } from "react";
import Particle from "../components/particles";
import { Container, Button, Form } from "react-bootstrap";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

function Land() {
  const [availabilityData, setAvailabilityData] = useState({});
  const [showButton, setShowButton] = useState(false);

  // Function to fetch availability data from the server and handle form submission
  const fetchAvailabilityData = async () => {
    try {
      const response = await fetch("http://localhost:8080/availability");
      if (response.ok) {
        const data = await response.json();
        setAvailabilityData(data);

        // Check if the vehicle with a specific ID is available
        const vehicleIdToCheck = 1; // Adjust this ID as needed
        if (data[vehicleIdToCheck] === "available") {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      } else {
        console.error("Error fetching availability data");
      }
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  // Function to handle form submission
  const handleReservation = async () => {
    // Perform form validation here
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    const pickTime = prompt("Enter pick time:");

    // Basic form validation
    if (!name || !email || !pickTime) {
      alert("All fields are required");
      return;
    }

    // Assume a simple check for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    // If validation passes, you can now submit the form
    // For demonstration purposes, I'm just logging the data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Pick Time:', pickTime);

    // Now, you can redirect to another page
    window.location.href = '/success-page'; // Adjust the URL as needed
  };

  useEffect(() => {
    fetchAvailabilityData();
  }, []);

  return (
    <Container fluid className="view">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Toyota <strong className="purple">LandCruiser 76</strong> 
        </h1>
        <h2><strong className="orange">KDJ 317Q</strong></h2>
        <p style={{ color: "white" }}>
          Vehicle Description: The Land Cruiser 76 Series is a 4.0l Diesel monster that will take you anywhere at any time in any conditions and would be perfect for your next adventure.
        </p>

        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="formPickTime">
            <Form.Label>Pick Time:</Form.Label>
            <Form.Control type="time" placeholder="Select pick time" />
          </Form.Group>

          {showButton ? (
            <Button variant="primary" onClick={handleReservation}>
              <BsFillBookmarkCheckFill/> &nbsp; Reserve Now
            </Button>
          ) : (
            <p>Vehicle is currently not available for reservation.</p>
          )}
        </Form>
      </Container>
    </Container>
  );
}

export default Land;
