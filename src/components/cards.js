import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";

function ProjectCards(props) {
  const [availabilityData, setAvailabilityData] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCarpoolAvailable, setIsCarpoolAvailable] = useState(false);

  const fetchAvailabilityData = async () => {
    try {
      const response = await fetch("/getcars");
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
    if (props.id in availabilityData) {
      setIsAvailable(availabilityData[props.id] === "available");
      setIsCarpoolAvailable(availabilityData[props.id] === "carpool");
    }
  }, [availabilityData, props.id]);

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="orange">{props.subtitle}</Card.Subtitle>
        <Card.Text style={{ textAlign: "left" }}>{props.description}</Card.Text>

        {/* Render the appropriate button based on availability */}
        {isAvailable ? (
          <Button variant="primary" href={props.jump} target="">
            <BsFillBookmarkCheckFill /> &nbsp; Reserve Now
          </Button>
        ) : (
          <Button variant="info" href={props.carpool} target="">
            Car Pool
          </Button>
        )}

        {/* Render the unavailable button */}
        {!isAvailable && !isCarpoolAvailable && (
          <Button variant="danger" href={props.home} target="">
            <CgUnavailable /> &nbsp; Not Available
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
