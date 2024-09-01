import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import Register from './components/Register';
import EditUoForm from './components/EditUoForm';
import FormAjout from './components/FormAjout';
import Card from './components/Card';
import EditForm from './components/EditForm';
import ValidCard from './components/ValidCard'; // Import the ValidCard component
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
            <Link className="navbar-brand" to="/">OFPPT</Link>
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
          <Route path="/edit-card/:id" element={<EditForm />} />
          <Route path="/edit-uo/:id" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OFPPT</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user.role === 'ADMIN' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/card">Card</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/validcard">Valid Card</Link> {/* Added ValidCard link */}
                  </li>
                </>
              )}
              {user.role === 'DIR_EFP' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/card">Card</Link>
                  </li>
                </>
              )}
              {(user.role === 'DF' || user.role === 'DIR_CMP' || user.role === 'SRIO') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/validcard">Valid Card</Link> {/* Added ValidCard link */}
                </li>
              )}
            </ul>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to={user.role === 'ADMIN' ? "/card" : user.role === 'DIR_EFP' ? "/card" : "/validcard"} />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'ADMIN' ? "/card" : user.role === 'DIR_EFP' ? "/card" : "/validcard"} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={user.role === 'ADMIN' ? "/card" : user.role === 'DIR_EFP' ? "/card" : "/validcard"} /> : <Register />} />
        <Route path="/edit-uo/:id" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <EditUoForm /> : <Navigate to="/" />} />
        <Route path="/form-ajout" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <FormAjout /> : <Navigate to="/" />} />
        <Route path="/card" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <Card /> : <Navigate to="/" />} />
        <Route path="/edit-card/:id" element={(user.role === 'ADMIN' || user.role === 'DIR_EFP') ? <EditForm /> : <Navigate to="/" />} />
        <Route path="/validcard" element={(user.role === 'ADMIN' || user.role === 'DF' || user.role === 'DIR_CMP' || user.role === 'SRIO') ? <ValidCard /> : <Navigate to="/" />} /> {/* Added ValidCard route */}
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
