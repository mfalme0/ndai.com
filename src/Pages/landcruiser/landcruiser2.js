import React, { useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

function Landcruiser2() {
  const navigate = useNavigate();
  const vehicleconstant='1';
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    reason: "",
    vehicle:vehicleconstant,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/insertUserinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data inserted successfully");
        // Call the function to update state to "unavailable"
        await updateAvailabilityState();
      
        // You can add additional logic or redirect after successful submission
      } else {
        console.error("Error inserting data");
      }
    } catch (error) {
      console.error("Error inserting data", error);
    }
  };

  const updateAvailabilityState = async () => {
    try {
      const response = await fetch(`/updateAvailability/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newState: "unavailable",
        }),
      });

      if (response.ok) {
        console.log("Availability state updated successfully");
      navigate("/con")
      } else {
        console.error("Error updating availability state");
      }
    } catch (error) {
      console.error("Error updating availability state", error);
    }
  };

  return (
    <Container fluid className="home" id="about">
      <Container>
        <h2>
          the ultimate offroading pickup truck with a 2.8-liter diesel engine it
          can take you anywhere with relative ease and with a lot of space to
          store your belongings
        </h2>
        <Row>
          <Col md={4} className="Landcruiser2">
            <h1 style={{ fontSize: "2.6em" }}>
              Book this{" "}
              <strong className="orange">vehicle</strong>{" "}
            </h1>

            <form onSubmit={handleSubmit}>
            <label>Last name </label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
         <br/>

              <label>First name </label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Phone </label>
              <input
                type="tel"
                name="phone"
                placeholder="0712345689"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Area of Travel</label>
              <input
                type="text"
                name="location"
                placeholder="Kerio Valley"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Date of Travel</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Reason for travel </label>
              <textarea   
                
                name="reason"
                placeholder="Why are you going there?"
                value={formData.reason}
                onChange={handleInputChange}
                required
              />
              <br />
              <Button type="submit" variant="primary" >
                <BsFillBookmarkCheckFill /> Reserve Now
              </Button>
            </form>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Landcruiser2;
