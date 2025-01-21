import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <Container className="mt-5 login-ctn">
            <h2>Sign In</h2>
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
                
                <Form.Group controlId="formPassword" className="d-flex justify-content-between align-items-center">
                    <Form.Label className="mb-0">Password</Form.Label>
                    <Link to="#" class="info-txt2">Forgotten Password</Link>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
            <br />
            <span class="info-txt">Don't have an account? <Link to="/register" class="info-txt2">Register.</Link></span>
    
        </Container>
    );
}

export default Login;