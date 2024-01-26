import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Col, Row, Container, Button } from "react-bootstrap";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Hillux2() {
  const navigate = useNavigate();

  const vehicleConstant = 2;
  const [formData, setFormData] = useState({
    lastname: "",
    name: "",
    email: "",
    phone: "",
    Location: "",
    date: "",
    reason: "",
    vehicle: vehicleConstant,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastname: formData.lastname,
          firstName: formData.name,
          email: formData.email,
          phone: formData.phone,
          Location: formData.Location,
          date: formData.date,
          reason: formData.reason,
          vehicle: formData.vehicle,
        }),
      });

      if (response.ok) {
        console.log("Data inserted successfully");

        // Call the function to update state to "unavailable"
        await updateAvailabilityState();

        console.log("navigating to confirm");
        // Redirect to another page
        navigate("/confirm");
      } else {
        console.error("Error inserting data");
      }
    } catch (error) {
      console.error("Error inserting data", error);
    }
  };

  const updateAvailabilityState = async () => {
    try {
      const response = await fetch(`/updateAvailability/${vehicleConstant}`, {
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
          <Col md={4} className="hillux2">
            <h1 style={{ fontSize: "2.6em" }}>
              Book this{" "}
              <strong className="orange">vehicle</strong>{" "}
            </h1>

            <form onSubmit={handleSubmit}>
            <label>Last name </label>
              <input
                type="text"
                name="lastname"
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
              <br />

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
                name="Location"
                placeholder="Kerio Valley"
                value={formData.Location}
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
              <Button type="submit"  variant="primary">
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

export default Hillux2;
