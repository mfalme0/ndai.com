import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Particle from "./particles";
import ProjectCard from "./firebasecards";
import { CiShoppingTag } from"react-icons/ci"

function Projects() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formdata, setformdata] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    plates: "",
  });

  const handlekuchange =(e) =>{
    const {name, value } =e.target;
    setformdata({...formdata, [name]:value});
  }

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

  const handleCardClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setShowModal(false);
  };
  const handlekupeleka = async (e) =>{
    e.preventDefault();
    
    try{
        const response = await fetch("/takeout",{
            method :"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                name: formdata.name,
                email: formdata.email,
                phone: formdata.phone,
                datep: formdata.datep,
                document: formdata.document,
                state: formdata.state,
            }),
        });
        if (response.ok){
            console.log("ime ingia");

            setShowModal(false);
        }
        else{
            console.log("buda imeinanama")
        }
    }
    catch (error){
        console.log("rada msee" + error);
    }
  };
  return (
    <Container>
      <Particle />
      <h2>Vehicle Projects</h2>
      <Row>
        {vehicles.map((vehicle) => (
          <Col key={vehicle.id} md={4}>
            <ProjectCard
              vehicle={vehicle}
              onClick={() => handleCardClick(vehicle)}
              
            />
          </Col>
        ))}
      </Row>

      {/* Modal for displaying additional details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVehicle && (
            <div>
              <Row>
              <h4>{`${selectedVehicle.make} ${selectedVehicle.model}`}</h4>
              <p>Year: {selectedVehicle.year}</p>
              <p>Plates: {selectedVehicle.plates}</p>
              {/* Add more details as needed */}
              </Row>
              <Row>
                <form onSubmit={handlekupeleka} >
                                  <label>vehicle</label>

                <input 
                placeholder={selectedVehicle.make} 
                name="document"
                value={selectedVehicle.make} 
                onChange={handlekuchange}
                readOnly
                 />

                <label>name</label>

                <input 
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handlekuchange}
                required
                />

                <label>email</label>

                <input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                onChange={handlekuchange}
                required
                />
 
                <labe>phone</labe>

                <input
                type="tel"
                name="phone"
                placeholder="0712345689"
                onChange={handlekuchange}
                required
                />

                <label>Date</label>

                <input
                type="date"
                name="datep"
                onChange={handlekuchange}
                required
                />
                <br/>
                <Button type="submit" variant="primary">
                <CiShoppingTag /> Request 
                </Button>
                </form>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Projects;
