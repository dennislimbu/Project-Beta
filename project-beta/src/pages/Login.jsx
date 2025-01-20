import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

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
    <div>
                <h2>Register</h2>
                <br />
                {message && <span>{message}</span>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="email"
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
        
                    <button type="submit">Log In</button>
                </form>
                <br />
                <span>Don't have an account? </span>
                <Link to="/register">Register.</Link>
            </div>
  )
}

export default Register
