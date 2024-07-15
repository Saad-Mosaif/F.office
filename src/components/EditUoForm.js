import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUoById, updateUo } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const EditUoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uo, setUo] = useState({
    intituler: '',
    codeDR: '',
    typeUO: '',
    ville: '',
    cat_uo: '',
    department: ''
  });

  useEffect(() => {
    fetchUo();
  }, []);

  const fetchUo = async () => {
    try {
      const response = await getUoById(id);
      setUo(response.data);
    } catch (error) {
      console.error('Error fetching Uo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUo(id, uo);
      navigate('/uo-list');
    } catch (error) {
      console.error('Error updating Uo:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Edit Uo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="intituler" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="intituler"
            name="intituler"
            value={uo.intituler}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codeDR" className="form-label">Code</label>
          <input
            type="text"
            className="form-control"
            id="codeDR"
            name="codeDR"
            value={uo.codeDR}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="typeUO" className="form-label">Type UO</label>
          <select
            className="form-control"
            id="typeUO"
            name="typeUO"
            value={uo.typeUO}
            onChange={handleChange}
            required
          >
            <option value="">Select Type UO</option>
            <option value="DC">DC</option>
            <option value="DR">DR</option>
            <option value="CMP">CMP</option>
            <option value="EFP">EFP</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ville" className="form-label">City</label>
          <select
            className="form-control"
            id="ville"
            name="ville"
            value={uo.ville}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option value="CASABLANCA">Casablanca</option>
            <option value="RABAT">Rabat</option>
            <option value="MARRAKECH">Marrakech</option>
            <option value="TANGER">Tanger</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cat_uo" className="form-label">Category UO</label>
          <input
            type="text"
            className="form-control"
            id="cat_uo"
            name="cat_uo"
            value={uo.cat_uo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={uo.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
};

export default EditUoForm;
