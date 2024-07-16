import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, createUser } from '../services/UserService'; // Adjust import based on your file structure
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const UO_API_URL = 'http://localhost:8080/api/uo';

const Form = () => {
  const [name, setName] = useState('');
  const [codeDR, setCodeDR] = useState('');
  const [typeUO, setTypeUO] = useState('');
  const [catUO, setCatUO] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const checkResponse = await axios.get(`${UO_API_URL}/check-intituler`, {
        params: { intituler: name },
      });

      if (!checkResponse.data) {
        setToastMessage('Intituler is not unique!');
        setShowToast(true);
        return;
      }

      const data = {
        intituler: name,
        codeDR: codeDR,
        typeUO: typeUO,
        cat_uo: catUO,
        ville: city,
        department: department,
      };

      const response = await axios.post(UO_API_URL, data);
      console.log(response.data);
      setToastMessage('Entry created successfully!');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/uo-list');
      }, 500); // Adjust the timeout duration as needed
    } catch (error) {
      console.error('There was an error creating the entry!', error);
      setToastMessage('Failed to create entry');
      setShowToast(true);
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
              <input 
                type="text" 
                className="form-control" 
                id="catUO" 
                value={catUO} 
                onChange={(e) => setCatUO(e.target.value)} 
                placeholder="Cat UO" 
              />
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
      {showToast && (
        <div className="toast show position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">{toastMessage.includes('successfully') ? 'Success' : 'Error'}</strong>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
