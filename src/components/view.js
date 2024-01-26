import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";

function view(props) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (props.id in props.availabilityData) {
      setIsAvailable(props.availabilityData[props.id] === "available");
    }
  }, [props.availabilityData, props.id]);

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="orange">{props.subtitle}</Card.Subtitle>
        <Card.Text style={{ textAlign: "left" }}>{props.description}</Card.Text>

        {/* Render the appropriate button based on availability */}
        {isAvailable ? (
          <Button variant="danger" href={props.jump} target="">
            <CgUnavailable /> &nbsp; Reserve Now
          </Button>
        ) : (
          <Button variant="primary" href={props.jump} target="">
            <BsFillBookmarkCheckFill /> &nbsp; Check Availability
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
