import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Particle from "../../components/particles";
import ProjectCard from "./firebasecards";
import { FaCheck } from "react-icons/fa";
import AddCarForm from "../addcar";
import Users from "./users";
import { HiXMark } from "react-icons/hi2"
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function Malubulul() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  

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



   const handleclicking = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setShowModal(false);
    
  
  }


  const handleReject = async () => {
    try {
      const response = await fetch('/ital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plates: selectedVehicle.plates, // Assuming 'whip' contains the plates
        }),
      });

      if (response.ok) {
        console.log('Car marked as unavailable');
        alert('The Vehicle is now available')
        setShowModal(false)
        // You may want to update the state or perform other actions upon success
      } else {
        console.error('Failed to mark car as unavailable');
        // Handle the error condition
      }
    } catch (error) {
      console.error('Error marking car as unavailable:', error);
      // Handle the error condition
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch('/makeunavailable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plates: selectedVehicle.plates, // Assuming 'whip' contains the plates
        }),
      });

      if (response.ok) {
        console.log('Car marked as unavailable');
        alert('The vehicle is now unavailable')
        setShowModal(false)
        // You may want to update the state or perform other actions upon success
      } else {
        console.error('Failed to mark car as unavailable');
        // Handle the error condition
      }
    } catch (error) {
      console.error('Error marking car as unavailable:', error);
      // Handle the error condition
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/deleteCar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plates: selectedVehicle.plates,
        }),
      });

      if (response.ok) {
        console.log('Car deleted successfully');
        alert('The vehicle has been deleted');
        setShowModal(false);
        // You may want to update the state or perform other actions upon success
      } else {
        console.error('Failed to delete car');
        
        // Handle the error condition
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      // Handle the error condition
    }
  };


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
          {vehicles.map((vehicle) => (
            <Col key={vehicle.id} md={3} className="project-card">
              <ProjectCard
                onClick={()=> handleclicking(vehicle)}
                imgPath={vehicle.imageUrl} // Assuming your vehicle data has an 'imageUrl' property
                title={vehicle.make}
                state={vehicle.state}
                subtitle={vehicle.model}
                plates={vehicle.plates}
                description={vehicle.plates}
                jump={()=> handleclicking()}  // Use the vehicle id or any unique identifier
                home="/"
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVehicle && (
              <div>
                <Row>
                <h4>{`${selectedVehicle.make} ${selectedVehicle.model}`}</h4>
              <p>Year: {selectedVehicle.year}</p>
              <p>Plates: {selectedVehicle.plates}</p>
              <p>availability: {selectedVehicle.state}</p>
              <img src={selectedVehicle.imageUrl} alt="car-img" className="img-fluid" />
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary'onClick={handleReject}>
              <FaCheck/> Make Available
            </Button>
            

            <Button variant='secondary'onClick={handleApprove}>
            <HiXMark /> Make Unavailable
            </Button> 

                   <Button variant="danger" onClick={handleDelete}>
                   <FaRegTrashAlt /> Delete
        </Button>
          </Modal.Footer>
        </Modal> 
        <AddCarForm/>   
    </Container>
    
    <Container>
   
      
    </Container>
    <Container>
       <Users/>
    </Container>

     

    </section>
  );
}

export default Malubulul;
