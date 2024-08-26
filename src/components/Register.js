
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/roles');
        setRoles(response.data);
        const data = response.data;

        console.log('Fetched roles:', data); // Debugging line

        // Set roles based on actual response structure
        setRoles(Array.isArray(data) ? data : data.roles || []);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]); // Default to an empty array in case of error
      }
    };

    fetchRoles();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password,
       
        role: { name: role }
      });
     

      // Directly set the message based on the response data
      setMessage(response.data); // The response is a string message
    } catch (error) {
      setMessage(error.response.data);
      // Handle error response
      setMessage(error.response?.data || 'Registration failed'); // Display error message
    }
  };

  return (
    <div className="container">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Register</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  className="form-control"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                 
                  {roles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
                </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
