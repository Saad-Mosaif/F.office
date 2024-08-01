import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Mainpg from './components/Mainpg';
import Mainpage2 from './components/Mainpage2';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Form';
import UoList from './components/UoList';
import EditUoForm from './components/EditUoForm';
import FormAjout from './components/FormAjout';
import Card from './components/Card';  // Import the Card component
import { UserContext, UserProvider } from './UserContext';

function AppContent() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                  <li className="nav-item">
                    <Link className="nav-link" to="/form-ajout">Ajouter Form</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/card">Card</Link>
                  </li>
                </>
              )}
              {user.role === 'DIR_EFP' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/uo-list">Uo List</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mainpage2">Main</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/form-ajout">Ajouter Form</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/card">Card</Link>
                  </li>
                </>
              )}
              {(user.role === 'DF' || user.role === 'DIR_CMP' || user.role === 'SRIO') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/uo-list">Uo List</Link>
                </li>
              )}
            </ul>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to={user.role === 'ADMIN' ? "/main" : user.role === 'DIR_EFP' ? "/mainpage2" : "/uo-list"} />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'ADMIN' ? "/main" : user.role === 'DIR_EFP' ? "/mainpage2" : "/uo-list"} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={user.role === 'ADMIN' ? "/main" : user.role === 'DIR_EFP' ? "/mainpage2" : "/uo-list"} /> : <Register />} />
        <Route path="/main" element={user.role === 'ADMIN' ? <Mainpg /> : <Navigate to="/" />} />
        <Route path="/mainpage2" element={user.role === 'DIR_EFP' ? <Mainpage2 /> : <Navigate to="/" />} />
        <Route path="/form" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <Form /> : <Navigate to="/" />} />
        <Route path="/uo-list" element={<UoList />} />
        <Route path="/edit-uo/:id" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <EditUoForm /> : <Navigate to="/" />} />
        <Route path="/form-ajout" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <FormAjout /> : <Navigate to="/" />} />
        <Route path="/card" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <Card /> : <Navigate to="/" />} />
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
