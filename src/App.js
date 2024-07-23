import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Mainpg from './components/Mainpg';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Form';
import UoList from './components/UoList';
import EditUoForm from './components/EditUoForm';
import { UserContext, UserProvider } from './UserContext';

function AppContent() {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">React Auth</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
              {user && user.role === 'ADMIN' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/main">Main</Link>
                </li>
              )}
              {user && user.role === 'DIRECTOR' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/uo-list">Uo List</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/form">Form</Link>
                  </li>
                </>
              )}
            </ul>
            {user && (
              <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={user ? (user.role === 'ADMIN' ? <Mainpg /> : <Navigate to="/uo-list" />) : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={user && user.role === 'ADMIN' ? <Mainpg /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={user ? <Form /> : <Navigate to="/" />} />
        <Route path="/uo-list" element={user && user.role === 'DIRECTOR' ? <UoList /> : <Navigate to="/" />} />
        <Route path="/edit-uo/:id" element={user ? <EditUoForm /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
