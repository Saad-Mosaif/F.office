import React, { useContext } from 'react';
import '../App.css'; // Assuming you want to include any global styles
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpg;
