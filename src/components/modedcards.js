import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";

function ProjectCards(props) {
  const [availabilityData, setAvailabilityData] = useState({});
  const [carState, setCarState] = useState("");

  const fetchAvailabilityData = async () => {
    try {
      const response = await fetch("/getcars"); // Replace with your actual Express server URL
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
    const carAvailability = availabilityData[props.state];
    setCarState(carAvailability);
  }, [availabilityData, props.state]);

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="orange">{props.subtitle}</Card.Subtitle>
        <Card.Text style={{ textAlign: "left" }}>{props.description}</Card.Text>

        {/* Render the appropriate button based on availability */}
        {carState === "available" ? (
          <Button variant="primary" ty target="">
            <BsFillBookmarkCheckFill /> &nbsp; Reserve Now
          </Button>
        ) : (
          <Button variant="danger" href={props.home} target="">
            <CgUnavailable /> &nbsp; Not Available
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
