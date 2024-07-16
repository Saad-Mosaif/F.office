import React, { useState, useEffect } from 'react';
import { getAllUo, deleteUo } from '../api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../App.css';

const UoList = () => {
  const [uos, setUos] = useState([]);
  const [filteredUos, setFilteredUos] = useState([]);
  const [sortAttribute, setSortAttribute] = useState('intituler');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUos();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, uos]);

  const fetchUos = async () => {
    try {
      const response = await getAllUo();
      setUos(response.data);
      setFilteredUos(response.data);
    } catch (error) {
      console.error('Error fetching UOs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUo(id);
      fetchUos(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting UO:', error);
    }
  };

  const handleSort = (sortBy) => {
    const sortedList = [...filteredUos].sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return 1;
      } else if (a[sortBy] < b[sortBy]) {
        return -1;
      } else {
        return 0;
      }
    });
    setFilteredUos(sortedList);
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = uos.filter(uo => 
      uo.intituler.toLowerCase().includes(term) ||
      uo.codeDR.toLowerCase().includes(term) ||
      uo.typeUO.toLowerCase().includes(term) ||
      uo.ville.toLowerCase().includes(term) ||
      uo.catUo.toLowerCase().includes(term) ||
      uo.department.toLowerCase().includes(term)
    );
    setFilteredUos(results);
  };

  return (
    <div className="container wider-container">
      <div className="table-container">
        <h2 className="table-title">Unit of Operations List</h2>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <label htmlFor="sortAttribute" className="form-label me-2">Sort by:</label>
              <select
                className="form-select d-inline-block w-auto"
                id="sortAttribute"
                value={sortAttribute}
                onChange={(e) => setSortAttribute(e.target.value)}
              >
                <option value="intituler">Name</option>
                <option value="typeUO">Type UO</option>
                <option value="ville">City</option>
              </select>
              <button className="btn btn-primary ms-2" onClick={() => handleSort(sortAttribute)}>Sort</button>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Link to="/form" className="btn btn-success">Create New Entry</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Type UO</th>
              <th>City</th>
              <th>Category UO</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUos.map(uo => (
              <tr key={uo.id}>
                <td>{uo.intituler}</td>
                <td>{uo.codeDR}</td>
                <td>{uo.typeUO}</td>
                <td>{uo.ville}</td>
                <td>{uo.catUo}</td>
                <td>{uo.department}</td>
                <td>
                  <Link to={`/edit-uo/${uo.id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                  <button onClick={() => handleDelete(uo.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UoList;
