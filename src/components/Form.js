// components/Form.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Form = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '100px' }}>
      <div className="card w-50">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create New Entry</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name" />
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">Code</label>
              <input type="text" className="form-control" id="code" placeholder="Code" />
            </div>
            <div className="mb-3">
              <label htmlFor="type_uo" className="form-label">Type UO</label>
              <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="typeUOButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: 'white', color: 'black' }}>
    Select Type UO
  </button>
  <ul className="dropdown-menu" aria-labelledby="typeUOButton">
    <li><a className="dropdown-item" href="#">Type UO 1</a></li>
    <li><a className="dropdown-item" href="#">Type UO 2</a></li>
    <li><a className="dropdown-item" href="#">Type UO 3</a></li>
  </ul>
</div>
            </div>
            <div className="mb-3">
              <label htmlFor="cat_uo" className="form-label">Cat UO</label>
              <input type="text" className="form-control" id="cat_uo" placeholder="Cat UO" />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
            <div className="dropdown">
             <button className="btn btn-secondary dropdown-toggle" type="button" id="typeUOButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: 'white', color: 'black' }}> Select Type UO
             </button>
             <ul className="dropdown-menu" aria-labelledby="typeUOButton">
               <li><a className="dropdown-item" href="#">city 1</a></li>
               <li><a className="dropdown-item" href="#">city 2</a></li>
               <li><a className="dropdown-item" href="#">city 3</a></li>
            </ul>
            </div>
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <input type="text" className="form-control" id="department" placeholder="Department" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
