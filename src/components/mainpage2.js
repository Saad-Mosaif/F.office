import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const mainpage2 = () => {
  const { user } = useContext(UserContext);

  const renderCard = () => (
    <div className="card mt-4 card-hover">
      <div className="card-body text-center">
        <h1 className="card-title">Explore Our Features</h1>
        <p className="card-text">
          Use the button below to search the list.
        </p>
        <div>
          <Link to="/uo-list" className="btn btn-secondary m-2">
            <FontAwesomeIcon icon={faSearch} /> Search in List
          </Link>
        </div>
      </div>
    </div>
  );

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
          {renderCard()}
        </div>
        <div className="col-md-3">
          {renderCard()}
        </div>
        <div className="col-md-3">
          {renderCard()}
        </div>
        <div className="col-md-3">
          {renderCard()}
        </div>
      </div>
    </div>
  );
};

export default mainpage2;
