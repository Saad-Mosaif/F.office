import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">React Auth</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
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
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/uo-list">Uo List</Link>
                </li>
              )}
            </ul>
            {user && (
              <button className="btn btn-outline-danger" onClick={() => setUser(null)}>Logout</button>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={user ? <Mainpg /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Mainpg />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={user ? <Form /> : <Login />} />
        <Route path="/uo-list" element={user ? <UoList /> : <Login />} />
        <Route path="/edit-uo/:id" element={user ? <EditUoForm /> : <Login />} />
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
