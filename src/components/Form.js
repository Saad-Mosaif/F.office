import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, createUser } from '../services/UserService'; // Adjust import based on your file structure
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Form = () => {
  const [name, setName] = useState('');
  const [codeDR, setCodeDR] = useState('');
  const [typeUO, setTypeUO] = useState('');
  const [catUO, setCatUO] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      intituler: name,
      codeDR: codeDR,
      typeUO: typeUO,
      catUo: catUO,
      ville: city,
      department: department,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/uo', data);
      console.log(response.data);
      alert('Entry created successfully!');
    } catch (error) {
      console.error('There was an error creating the entry!', error);
      alert('Failed to create entry');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '100px' }}>
      <div className="card w-50">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create New Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name" 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="codeDR" className="form-label">Code</label>
              <input 
                type="text" 
                className="form-control" 
                id="codeDR" 
                value={codeDR} 
                onChange={(e) => setCodeDR(e.target.value)} 
                placeholder="Code" 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="typeUO" className="form-label">Type UO</label>
              <select 
                className="form-control" 
                id="typeUO" 
                value={typeUO} 
                onChange={(e) => setTypeUO(e.target.value)}
              >
                <option value="">Select Type UO</option>
                <option value="DC">DC</option>
                <option value="DR">DR</option>
                <option value="CMP">CMP</option>
                <option value="EFP">EFP</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="catUO" className="form-label">Cat UO</label>
              <select 
                className="form-control" 
                id="catUO" 
                value={catUO} 
                onChange={(e) => setCatUO(e.target.value)}
              >
                <option value="">Select Cat UO</option>
                <option value="DC">DC</option>
                <option value="DR">DR</option>
                <option value="CMP">CMP</option>
                <option value="EFP">EFP</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <select 
                className="form-control" 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select City</option>
                <option value="CASABLANCA">Casablanca</option>
                <option value="RABAT">Rabat</option>
                <option value="MARRAKECH">Marrakech</option>
                <option value="TANGER">Tanger</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <input 
                type="text" 
                className="form-control" 
                id="department" 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)} 
                placeholder="Department" 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
