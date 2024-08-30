import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Particle from "../components/particles";
import ProjectCard from "../components/firebasecards";
import { CiShoppingTag } from "react-icons/ci";
import emailjs from '@emailjs/browser';
import { Axios } from "axios";

function Projects() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const waitingconst ="waiting";
  const form = useRef();
  
  const [formdata, setformdata] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    whip: "",
    location:"",
    date:"",
    state: waitingconst,
  });

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

   const handlekuchange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleclicking = (vehicle) => {
    setSelectedVehicle(vehicle);
    setformdata({ ...formdata, whip: vehicle.plates }); // Set the whip value
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setShowModal(false);
    
  
  }
  const handleKupeleka = async (e) => {
    e.preventDefault();
  
    // Validate form data (add your own validation logic)
    if (!formdata.name || !formdata.email || !formdata.phone) {
      console.error("Please fill in all required fields");
      return;
    }
  
    try {
      // Make a POST request to /shikandai endpoint
      const bookingData = {
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        whip: formdata.whip,
        location: formdata.location,
        reason: formdata.reason,
        date: formdata.date,
        state: formdata.state,
      };
  
      const shikandaiResponse = await fetch("/shikandai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
     
      // Handle the response from /shikandai endpoint
      if (!shikandaiResponse.ok) {
        console.error("Booking failed");
        return;
      }
      emailjs.sendForm( );
      
      // Make a POST request to /nare endpoint
      const nareResponse = await fetch("/nare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plates: formdata.whip,
        }),
      });
  
      // Handle the response from /nare endpoint
      if (!nareResponse.ok) {
        console.error("Error marking car as unavailable");
        // You may want to handle this error condition accordingly
      }
  
      // Handle the success condition
      console.log("Booking successful");
  
      // Send email
     
  
      setShowModal(false);
      sendEmail(e);
      alert('Please wait for management to get back to you');
  
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm()
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  
  
  
 

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
                onClick={()=> handleclicking(vehicle)}
                imgPath={vehicle.imageUrl} // Assuming your vehicle data has an 'imageUrl' property
                title={vehicle.make}
                state={vehicle.state}
                subtitle={vehicle.model}
                plates={vehicle.plates}
                description={`${vehicle.plates} ${vehicle.fuel} ${vehicle.transmission} ${vehicle.type}`}
                jump={()=> handleclicking(vehicle)}  // Use the vehicle id or any unique identifier
                home="/"
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={showModal}  centered onHide={handleCloseModal} variant='dark'>
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
              <p>availability: {selectedVehicle.state}</p>
              <img src={selectedVehicle.imageUrl} alt="car-img" className="img-fluid" />
              {/* Add more details as needed */}
              </Row>
              <Row>
                
                <form onSubmit={handleKupeleka} centered ref={form}>
                  <Row >
                 <label>vehicle</label>
<br/>
                <input 
                
                placeholder={selectedVehicle.Id} 
                name="whip"
                value={formdata.whip} 
                onChange={handlekuchange}
                readOnly
                 />


                 <br/>
                <label>name</label>
                <br/>
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
                 </Row>
                <Row md={1}>
                <label>Location</label>
                <input
                type="text"
                name="location"
                placeholder="Moyale"
                onChange={handlekuchange}
                required
                />  
                <label>Date</label>

                <input
                type="date"
                name="date"
                onChange={handlekuchange}
                required
                />
              
                <label>Reason</label>
                <input
                type="textarea"
                name="reason"
                col={5}
                placeholder="why do you want to visit this area"
                onChange={handlekuchange}
                required/>
               </Row>
                <br/>    <Button type="submit" variant="primary">
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
