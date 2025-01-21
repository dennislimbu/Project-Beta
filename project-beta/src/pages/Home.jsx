import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col className="text-center">
          <h1>Home</h1>
          <Link to="/register" className="btn btn-primary m-2">Register</Link>
          <Link to="/login" className="btn btn-secondary m-2">Login</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;