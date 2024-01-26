import React, { useState } from "react";
import { Col, Row, Container, Button, Form, Image } from "react-bootstrap";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import { Alert } from "bootstrap";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    plates: "",
    make: "",
    model: "",
    year: "",
    state: "available",
    transmission: "automatic",
    type: "suv",
    fuel: "petrol",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const handleAddCar = async () => {
    try {
      if (!image) {
        console.error("Please select an image.");
        return;
      }
  
      const carFormData = new FormData();
      carFormData.append("image", image);
      carFormData.append("plates", formData.plates);
      carFormData.append("make", formData.make);
      carFormData.append("model", formData.model);
      carFormData.append("year", formData.year);
      carFormData.append("state", formData.state);
      carFormData.append("transmission", formData.transmission);
      carFormData.append("type",formData.type);
      carFormData.append("fuel", formData.fuel);
  
      await axios.post("/addCar", carFormData);
  
      setFormData({
        plates: "",
        make: "",
        model: "",
        year: "",
        state: "",
        transmission: "",
        type: "",
        fuel: "",
      });
      setImage(null);
      setPreviewImage(null);
      console.log("Car added successfully!");
      alert('car added succesfully')
    } catch (error) {
      console.error("Error adding car: ", error);
    }
  };
  

  return (
    <Container >
      <Row>
        <Col>
          <h2>Add Car</h2>
          <Form >
            <Col className="addcarform" >
            <Row md={2}>
            <Form.Group controlId="formPlates">
              <Form.Label>Number Plate:</Form.Label>
              <Form.Control
                type="text"
                name="plates"
                placeholder="KDJ 316Q"
                value={formData.plates}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formmake">
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type="text"
                name="make"
                placeholder="Toyota"
                value={formData.make}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formModel">
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="landcruiser"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="text"
                name="year"
                placeholder="2023"
                value={formData.year}
                onChange={handleInputChange}
              />
            </Form.Group>
            </Row>
            <Row md={4}>
            <Form.Group controlId="formTransmission">
              <Form.Label>Transmission:</Form.Label>
              <Form.Select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFuel">
              <Form.Label>Fuel:</Form.Label>
              <Form.Select name="fuel" value={formData.fuel} onChange={handleInputChange}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group controlId="formState">
              <Form.Label>State:</Form.Label>
              <Form.Select name="state" value={formData.state} onChange={handleInputChange}>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formType">
              <Form.Label>Vehilce Type:</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup Truck</option>
                <option value="sedan">Sedan</option>
                <option value="bus">Bus</option>
              </Form.Select>
            </Form.Group>
               </Row>           
             <Tilt>
            {previewImage && <Image src={previewImage} alt="Preview" fluid />}
            </Tilt>
            <Row  centered >
            <Form.Group controlId="formImage">
              <Form.Label>Image:</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            </Row>
                        <Button variant="primary" onClick={handleAddCar}>
              Add Car
            </Button>            
            </Col>

           

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCarForm;
