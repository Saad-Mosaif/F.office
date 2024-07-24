import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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

  // Handle the case where `user` might be null
  if (!user) {
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
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Navigate to="/" />} />
          <Route path="/form" element={<Navigate to="/" />} />
          <Route path="/uo-list" element={<Navigate to="/" />} />
          <Route path="/edit-uo/:id" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

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
              {user.role === 'ADMIN' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/main">Main</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/uo-list">Uo List</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/form">Form</Link>
                  </li>
                </>
              )}
              {user.role === 'DIR_EFP' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/uo-list">Uo List</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/form">Form</Link>
                  </li>
                </>
              )}
              {(user.role === 'DF' || user.role === 'DIR_CMP') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/uo-list">Uo List</Link>
                </li>
              )}
            </ul>
            {user && (
              <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to={user.role === 'ADMIN' ? "/main" : "/uo-list"} />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'ADMIN' ? "/main" : "/uo-list"} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={user.role === 'ADMIN' ? "/main" : "/uo-list"} /> : <Register />} />
        <Route path="/main" element={user.role === 'ADMIN' ? <Mainpg /> : <Navigate to="/" />} />
        <Route path="/form" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <Form /> : <Navigate to="/" />} />
        <Route path="/uo-list" element={<UoList />} />
        <Route path="/edit-uo/:id" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <EditUoForm /> : <Navigate to="/" />} />
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
