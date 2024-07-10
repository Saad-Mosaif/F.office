import React, { useState } from 'react';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Basic validation
    if (email === '' || password === '') {
      setError('Email and password are required');
      return;
    }

    // Dummy credentials check
    if (email === 'test@example.com' && password === 'password') {
      setMessage('Login successful!');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="logo">
          <img src="/lock.png" alt="Lock Icon" />
        </div>
        <div className="name">Login</div>
        <form onSubmit={handleLogin}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="email"
              placeholder="Username"
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
          {error && <div className="text-danger">{error}</div>}
          {message && <div className="text-success">{message}</div>}
          <button type="submit" className="btn mt-3">Login</button>
        </form>
        <a href="#">Forget password? Or Sign up</a>
      </div>
    </div>
  );
};

export default Login;
