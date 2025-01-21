import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage('User logged in successfully!');
      navigate('/dashboard');
      return null;
    }

    setEmail('');
    setPassword('');
  };

  return (
    <Container className="register-ctn">
      <h2 className="home-title">Register</h2>
      <br />
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="Password"
            placeholder="Password Confirmation"
            value={password}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <br />
      <span className='info-txt'>Already have an account? </span>
      <Link to="/login" className="font-weight-bold info-txt2">Log in</Link>
    </Container>
  );
}

export default Register;