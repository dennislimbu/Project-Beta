import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== passwordConfirmation) {
            setMessage('Passwords do not match');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data) {
            setMessage('User account created successfully!');
        }

        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
    };

    return (
        <div>
            <h2>Register</h2>
            <br />
            {message && <span>{message}</span>}
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="Username"
                    required
                />
                <br />
                <label>Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Email"
                    required
                />
                <br />
                <label>Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    required
                />
                <br />
                <label>Confirm Password</label>
                <input
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={passwordConfirmation}
                    type="password"
                    placeholder="Confirm Password"
                    required
                />
                <br />
                <button type="submit">Create Account</button>
            </form>
            <br />
            <span>Already have an account? </span>
            <Link to="/login">Log in.</Link>
        </div>
    );
}

export default Register;