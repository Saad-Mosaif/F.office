import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (email === '' || password === '') {
            setError('Email and password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.role) {
                setUser({ email, role: response.data.role });
                if (response.data.role === 'ADMIN') {
                    navigate('/main');
                } else if (response.data.role === 'DIRECTOR') {
                    navigate('/main');
                }
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            // Extract the error message or a fallback message
            const errorMessage = error.response?.data?.message || 'Login failed';
            setError(errorMessage);
        }
    };

    return (
        <div className="container">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Login</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                />
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
