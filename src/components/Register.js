import React, { useState } from 'react';
import '../App.css';
import { register } from '../api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Basic validation
    if (email === '' || password === '' || confirmPassword === '') {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register(email, password);
      setMessage(response.data);
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="logo">
          <img src="/public/key.png" alt="Lock Icon" />
        </div>
        <div className="name">Register</div>
        <form onSubmit={handleRegister}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-danger">{error}</div>}
          {message && <div className="text-success">{message}</div>}
          <button type="submit" className="btn mt-3">Register</button>
        </form>
        <a href="#">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Register;
