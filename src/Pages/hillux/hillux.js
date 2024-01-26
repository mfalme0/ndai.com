import React, {useState, useEffect} from "react";
import { Container, Row, Col,Button } from "react-bootstrap";
import homeLogo from "../../Assets/front.png";
import Particle from "../../components/particles";
import Hillux2 from "./hillux2.js";
import Type from "./Type";
import { FaHome } from "react-icons/fa";


function Hillux() {

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
    if (2 in availabilityData) {
      setIsAvailable(availabilityData[2] === "available");
    }
  }, [availabilityData, ]);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">


              <h1 className="orange">
                Toyota
                <strong className="main-name"> Hillux </strong>
              </h1>
              <h2 >KDL 294F</h2>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      {isAvailable ?(
       <Hillux2 />
      ):(
        <Button variant="danger" href="/" target="">
           <FaHome /> &nbsp; Not Available
          </Button>
      )}
     
    </section>
  );
}

export default Hillux;
