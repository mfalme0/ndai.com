import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Container, Row } from 'react-bootstrap';
import { CiViewBoard } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import emailjs from '@emailjs/browser'
function Users() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [abiria, setAbiria] = useState(null);

  
    const handleclicking = (user) => {
      setAbiria(user);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setAbiria(null);
      setShowModal(false);
    }

    const handleApprove = async () => {
      try {
        // First fetch request
        const unres = await fetch('/makeunavailable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plates: abiria.whip, // Assuming 'whip' contains the plates
          }),
        });
  
        if (!unres.ok) {
          console.error("Error marking car as rejected in '/makeunavailable'");
          // Handle the error condition for '/makeunavailable'
          return;
        }
  
        // Extract necessary data from the response
        const unresData = await unres.json();
        const approved = unresData.approved;
  
        // Second fetch request to '/samosa'
        const samosaResponse = await fetch('/samosa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            whip: abiria.whip,
            name: abiria.name,
            date: abiria.date,
            location: abiria.location,
          }),
        });
  
        if (!samosaResponse.ok) {
          console.error("Error marking car as rejected in '/samosa'");
          // Handle the error condition for '/samosa'
          return;
        }
  
        // Now, use the extracted data to send an email
        var mastuff = {
          plates: abiria.whip,
          name: abiria.name,
          date: abiria.date,
          location: abiria.location,
          email: abiria.email,
          approved: 'approved', // Add the 'approved' information here
          // Add other relevant parameters as needed
        };
  
        // Call emailjs.sendForm with the required parameters
        emailjs.send('service_c8z8ynf', 'template_l4hbv7r', mastuff, 'aoDRpb3cUrp3tYH93');
  
        console.log('Car marked as rejected');
        alert('the trip has been approved');
        setShowModal(false);
        // You may want to update the state or perform other actions upon success
      } catch (error) {
        console.error('Error marking car as rejected:', error);
        // Handle the error condition
      }
    };

    const handleReject = async () => {
      try {
        // First fetch request
        const italres = await fetch('/ital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plates: abiria.whip, // Assuming 'whip' contains the plates
          }),
        });
  
        if (!italres.ok) {
          console.error("Error marking car as rejected in '/ital'");
          // Handle the error condition for '/makeunavailable'
          return;
        }
  
        // Extract necessary data from the response
        const italresData = await italres.json();
        const approved = italresData.approved;
  
        // Second fetch request to '/samosa'
        const morioResponse = await fetch('/morio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            whip: abiria.whip,
            name: abiria.name,
            date: abiria.date,
            location: abiria.location,
          }),
        });
  
        if (!morioResponse.ok) {
          console.error("Error marking car as rejected in '/morio'");
          // Handle the error condition for '/samosa'
          return;
        }
  
        // Now, use the extracted data to send an email
        var makeria = {
          plates: abiria.whip,
          name: abiria.name,
          date: abiria.date,
          location: abiria.location,
          email: abiria.email,
          approved: 'rejected', // Add the 'approved' information here
          // Add other relevant parameters as needed
        };
  
        // Call emailjs.sendForm with the required parameters
        emailjs.send('service_4soykrc', 'template_l4hbv7r', makeria, 'aoDRpb3cUrp3tYH93');
  
        console.log('Car marked as rejected');
        alert('the trip has been rejected');
        setShowModal(false);
        // You may want to update the state or perform other actions upon success
      } catch (error) {
        console.error('Error marking car as rejected:', error);
        // Handle the error condition
      }
    };
  
  useEffect(() => {


    const fetchUsers = async () => {
      try {
        const response = await fetch("/people");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []);

  const renderTableRows = () => {
    return users.map((user, index) => (
      <tr key={index}>
        <td>{user.date}</td>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{user.phone}</td>
        <td>{user.location}</td>
        <td>{user.reason}</td>
        <td>{user.whip}</td>
        <td>{user.state ==='waiting'?(
                  <Button variant='primary' onClick={() => handleclicking(user)}>
                  <CiViewBoard /> Awaiting
                </Button>
        ):user.state ==='approved'?(
          <Button variant='success' disabled>
          <CiViewBoard /> Approved
        </Button>

        ):(
          <Button variant='danger' disabled>
          <CiViewBoard /> Rejected
        </Button>

        )}


        </td>
      </tr>
    ));
  };


  return (
    <div>
    <Container fluid className='users'>
      <Table striped bordered hover variant='dark' responsive  >
        <thead>
          <tr>
            <th>Date</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Reason</th>
            <th>Vehicle</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {abiria && (
              <div>
                <Row>
                  <p><strong className='orange'>{abiria.name}</strong> wants to borrow <strong className='orange'>{abiria.whip}</strong> to travel to <strong className='orange'>{abiria.location} </strong>during the date of <strong className='orange'>{abiria.date} </strong>contact <strong className='orange'>{abiria.email}</strong></p>
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary'onClick={handleApprove}>
              <FaCheck/> Approve
            </Button>

            <Button variant='danger'onClick={handleReject}>
            <HiXMark /> Reject
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Users;
