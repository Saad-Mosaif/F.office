import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

const Mainpg = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container wider-container">
      <div className="jumbotron text-center mt-5">
        <h1 className="display-4">Welcome to the Main Page!</h1>
        <p className="lead">
          {user ? `Hello, ${user.email}! Your role is ${user.role}.` : 'This is the main page of the application.'}
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="card mt-4">
            <div className="card-body text-center">
              <h1 className="card-title">Explore Our Features</h1>
              <p className="card-text">
                Use the buttons below to create a new entry or search the list.
              </p>
              <div>
                <Link to="/form" className="btn btn-primary m-2">
                  <FontAwesomeIcon icon={faPlus} /> Create New Entry
                </Link>
                <Link to="/uo-list" className="btn btn-secondary m-2">
                  <FontAwesomeIcon icon={faSearch} /> Search in List
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mt-4">
            <div className="card-body text-center">
              <h1 className="card-title">Explore Our Features</h1>
              <p className="card-text">
                Use the buttons below to create a new entry or search the list.
              </p>
              <div>
                <Link to="/form" className="btn btn-primary m-2">
                  <FontAwesomeIcon icon={faPlus} /> Create New Entry
                </Link>
                <Link to="/uo-list" className="btn btn-secondary m-2">
                  <FontAwesomeIcon icon={faSearch} /> Search in List
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mt-4">
            <div className="card-body text-center">
              <h1 className="card-title">Explore Our Features</h1>
              <p className="card-text">
                Use the buttons below to create a new entry or search the list.
              </p>
              <div>
                <Link to="/form" className="btn btn-primary m-2">
                  <FontAwesomeIcon icon={faPlus} /> Create New Entry
                </Link>
                <Link to="/uo-list" className="btn btn-secondary m-2">
                  <FontAwesomeIcon icon={faSearch} /> Search in List
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mt-4">
            <div className="card-body text-center">
              <h1 className="card-title">Explore Our Features</h1>
              <p className="card-text">
                Use the buttons below to create a new entry or search the list.
              </p>
              <div>
                <Link to="/form" className="btn btn-primary m-2">
                  <FontAwesomeIcon icon={faPlus} /> Create New Entry
                </Link>
                <Link to="/uo-list" className="btn btn-secondary m-2">
                  <FontAwesomeIcon icon={faSearch} /> Search in List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpg;
