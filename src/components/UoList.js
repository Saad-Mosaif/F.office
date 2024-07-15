import React, { useState, useEffect } from 'react';
import { getAllUo, deleteUo } from '../api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const UoList = () => {
  const [uos, setUos] = useState([]);

  useEffect(() => {
    fetchUos();
  }, []);

  const fetchUos = async () => {
    try {
      const response = await getAllUo();
      setUos(response.data);
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

  return (
    <div className="container">
      <h2 className="text-center my-4">Unit of Operations List</h2>
      <table className="table table-bordered">
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
          {uos.map(uo => (
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
  );
};

export default UoList;
