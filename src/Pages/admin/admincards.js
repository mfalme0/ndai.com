import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgUnavailable } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";

function ProjectCards(props) {
  const [availabilityData, setAvailabilityData] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchAvailabilityData = async () => {
    try {
      const response = await fetch("/availability");
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

  useEffect(() =>{
    fetchAvailabilityData()
  }, []);

  useEffect(() => {
    if (props.id in availabilityData) {
      setIsAvailable(availabilityData[props.id] === "available");
    }
  }, [availabilityData, props.id]);

  

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="orange">{props.subtitle}</Card.Subtitle>
       
        {/* Render the appropriate button based on availability */}

          {isAvailable?(
          <h2 className="orange">
             <MdEventAvailable />available
          </h2>
          ):(
          <h2 className="purple">
          <CgUnavailable /> unavailable
         </h2>
           )}
         
         <Button variant="primary" className="orange">
            <MdEventAvailable /> &nbsp; Make Available
          </Button>
        
          <Button variant="danger" className="purple">
           <CgUnavailable />     &nbsp; Make unavailable
          </Button>
        

       
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
