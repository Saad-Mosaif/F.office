import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [typeUOs, setTypeUOs] = useState([]); // For storing TypeUO options
  const [selectedTypeUO, setSelectedTypeUO] = useState(''); // Selected TypeUO
  const [uniteOrganisations, setUniteOrganisations] = useState([]); // For storing UOs
  const [selectedUniteOrganisation, setSelectedUniteOrganisation] = useState('');

  useEffect(() => {
    const fetchTypeUOs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/unite-organisations/types');
        setTypeUOs(response.data);
      } catch (error) {
        console.error('Error fetching TypeUOs:', error);
      }
    };

    fetchTypeUOs();
  }, []);

  useEffect(() => {
    if (selectedTypeUO) {
      const fetchUniteOrganisations = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/unite-organisations/by-type/${selectedTypeUO}`);
          setUniteOrganisations(response.data);
        } catch (error) {
          console.error('Error fetching UniteOrganisations:', error);
        }
      };

      fetchUniteOrganisations();
    } else {
      setUniteOrganisations([]); // Clear the list if no type is selected
    }
  }, [selectedTypeUO]);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="container">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Register</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="typeUO" className="form-label">Type of Unite Organisation</label>
                <select
                  className="form-control"
                  id="typeUO"
                  value={selectedTypeUO}
                  onChange={(e) => setSelectedTypeUO(e.target.value)}
                  required
                >
                  <option value="">Select TypeUO</option>
                  {typeUOs.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="uniteOrganisation" className="form-label">Unite Organisation</label>
                <select
                  className="form-control"
                  id="uniteOrganisation"
                  value={selectedUniteOrganisation}
                  onChange={(e) => setSelectedUniteOrganisation(e.target.value)}
                  required
                  disabled={!selectedTypeUO} // Disable this field until a TypeUO is selected
                >
                  <option value="">Select Unite Organisation</option>
                  {uniteOrganisations.map((uo) => (
                    <option key={uo.id} value={uo.id}>
                      {uo.libelleuo}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
