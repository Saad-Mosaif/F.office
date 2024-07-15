import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const UoTable = () => {
  const [uoList, setUoList] = useState([]);

  useEffect(() => {
    const fetchUoList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/uo');
        setUoList(response.data);
      } catch (error) {
        console.error('There was an error fetching the UO list!', error);
      }
    };

    fetchUoList();
  }, []);

  return (
    <div className="container">
      <div className="table-container">
        <h2 className="table-title">UO List</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Code DR</th>
              <th scope="col">Type UO</th>
              <th scope="col">Cat UO</th>
              <th scope="col">City</th>
              <th scope="col">Department</th>
            </tr>
          </thead>
          <tbody>
            {uoList.map((uo, index) => (
              <tr key={uo.id}>
                <th scope="row">{index + 1}</th>
                <td>{uo.intituler}</td>
                <td>{uo.codeDR}</td>
                <td>{uo.typeUO}</td>
                <td>{uo.catUO}</td>
                <td>{uo.ville}</td>
                <td>{uo.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UoTable;
