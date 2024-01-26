import React, { useState, useEffect } from "react";
import { Table, Container, Tabs, Tab, Row, Col, Nav } from "react-bootstrap";

function Admin2() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("/data")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const renderTableRows = () => {
    return userData.map((user, index) => (
      <tr key={index}>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.phone}</td>
        <td>{user.location}</td>
        <td>{user.date}</td>
        <td>{user.reason}</td>  
      </tr>
    ));
  };

  return (
    <Container>
      <Tabs defaultActiveKey="table" id="admin-tabs">
        <Tab eventKey="table" title="Landcruiser Info">
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </Table>
        </Tab>
        {/* Add additional tabs if needed */}
      </Tabs>
    </Container>
  );
}

export default Admin2;
