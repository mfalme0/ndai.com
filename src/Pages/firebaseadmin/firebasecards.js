import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { TbTruckLoading } from "react-icons/tb";
import { CgUnavailable } from "react-icons/cg";
import { MdOutlineEventAvailable, MdEventAvailable } from "react-icons/md";

function ProjectCards(props) {
  const [isAvailable, setIsAvailable] = useState(props.state === "available");
  const [approval, setapproval] = useState(props.state ==='Waiting');
  useEffect(() => {
    setIsAvailable(props.state ==="available");
    setapproval(props.state ==="Waiting");
  },[props.state]);


  return (
    
    <Card className="project-card-view" onClick={props.onClick}>
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="orange">{props.subtitle}</Card.Subtitle>
        <Card.Subtitle className="orange">{props.plates}</Card.Subtitle>
        
        
        <Card.Text style={{ textAlign: "left" }}>{props.description}</Card.Text>


        {isAvailable?(
          <h2 className="orange">
             <MdEventAvailable />available
          </h2>
          ):approval?(
          <h2 className="purple">
          <TbTruckLoading/> Waiting Approval
         </h2>
           ):(
            <h2>
              <CgUnavailable /> unavailable
            </h2>
           )}
        {/* Render the appropriate button based on availability */}
        
       
          <Button variant="primary"  target="">
          <MdOutlineEventAvailable /> &nbsp; Modify
          </Button>
    
      
       
        

        </Card.Body>
    </Card>
  );
}

export default ProjectCards;
