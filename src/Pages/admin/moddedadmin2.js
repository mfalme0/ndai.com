import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";

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
    // Sort the data based on the userid property in ascending order
    const sortedData = [...userData].sort((a, b) => b.userid - a.userid);

    // Group sorted data by the "vehicle" column
    const groupedData = sortedData.reduce((acc, user) => {
      const vehicle = user.vehicle;
      if (!acc[vehicle]) {
        acc[vehicle] = [];
      }
      acc[vehicle].push(user);
      return acc;
    }, {});

    // Render rows for each group
    return Object.keys(groupedData).map((vehicle, index) => (
      <React.Fragment key={index}>
        <tr className="table-secondary">
          <td colSpan={6}>{vehicle}</td>
        </tr>
        {groupedData[vehicle].map((user, userIndex) => (
          <tr key={userIndex}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.phone}</td>
            <td>{user.location}</td>
            <td>{user.date}</td>
            <td>{user.reason}</td>
          </tr>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Container>
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
        <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
          {renderTableRows()}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin2;
