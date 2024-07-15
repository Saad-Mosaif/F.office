// components/Mainpg.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../UserContext';

const Mainpg = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center">Welcome to the Main Page!</h1>
              <p className="card-text text-center">
                {user ? `Welcome, ${user.email}!` : 'This is the main page of the application.'}
              </p>
              <div className="text-center">
                <Link to="/form" className="btn btn-primary m-2">Create New Entry</Link>
                <Link to="/uo-list" className="btn btn-secondary m-2">Search in List</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpg;
