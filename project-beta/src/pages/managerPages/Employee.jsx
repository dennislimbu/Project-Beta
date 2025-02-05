import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../../components/Navbar'; // Corrected import path
import Header from '../../components/Header'; // Corrected import path

function Employees() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header user={{ firstName: 'John', lastName: 'Doe', position: 'Manager', image: 'default-image-url' }} />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Container className="mt-5 flex-grow-1">
          <h1>Employee</h1>
        </Container>
      </div>
    </div>
  );
}

export default Employees;