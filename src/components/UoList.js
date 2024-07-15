import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUo, deleteUo } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const UoList = () => {
  const [uoList, setUoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUoList();
  }, []);

  const fetchUoList = async () => {
    try {
      const response = await getAllUo();
      setUoList(response.data);
    } catch (error) {
      console.error('Error fetching Uo list:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUo(id);
      fetchUoList(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting Uo:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-uo/${id}`);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Uo List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
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
          {uoList.map(uo => (
            <tr key={uo.id}>
              <td>{uo.id}</td>
              <td>{uo.intituler}</td>
              <td>{uo.codeDR}</td>
              <td>{uo.typeUO}</td>
              <td>{uo.ville}</td>
              <td>{uo.cat_uo}</td>
              <td>{uo.department}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(uo.id)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(uo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UoList;
