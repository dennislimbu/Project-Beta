import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../components/Navbar';

function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container className="mt-5">
        <h1>Welcome to the Dashboard</h1>
      </Container>
    </div>
  );
}

export default Dashboard;