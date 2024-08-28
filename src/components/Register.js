import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [drs, setDrs] = useState([]);
  const [cmps, setCmps] = useState([]);
  const [efps, setEfps] = useState([]);
  const [selectedDr, setSelectedDr] = useState('');
  const [selectedCmp, setSelectedCmp] = useState('');
  const [selectedEfp, setSelectedEfp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]); // Default to an empty array in case of error
      }
    };

    const fetchDrs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/unite-organisations/dr');
        setDrs(response.data);
      } catch (error) {
        console.error('Error fetching DRs:', error);
        setDrs([]); // Default to an empty array in case of error
      }
    };

    fetchRoles();
    fetchDrs();
  }, []);

  const handleDrChange = async (e) => {
    const drId = e.target.value;
    setSelectedDr(drId);
    setSelectedCmp('');
    setSelectedEfp('');
    setCmps([]);
    setEfps([]);

    if (drId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/unite-organisations/cmp/by-dr/${drId}`);
        setCmps(response.data);
      } catch (error) {
        console.error('Error fetching CMPs:', error);
      }
    }
  };

  const handleCmpChange = async (e) => {
    const cmpId = e.target.value;
    setSelectedCmp(cmpId);
    setSelectedEfp('');
    setEfps([]);

    if (cmpId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/unite-organisations/efp/by-cmp/${cmpId}`);
        setEfps(response.data);
      } catch (error) {
        console.error('Error fetching EFPs:', error);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const uniteOrganisationId = selectedEfp || selectedCmp || selectedDr || null;

      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        {
          email,
          password,
          role: { name: role },
          uniteOrganisation: uniteOrganisationId ? { id: uniteOrganisationId } : null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage(response.data); // The response is a string message
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || 'Registration failed';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Register</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  className="form-control"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="dr" className="form-label">Direction Régionale (DR)</label>
                <select
                  className="form-control"
                  id="dr"
                  value={selectedDr}
                  onChange={handleDrChange}
                  
                >
                  <option value="">Select DR</option>
                  {drs.map((dr) => (
                    <option key={dr.id} value={dr.id}>
                      {dr.libelleuo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="cmp" className="form-label">Complexe (CMP)</label>
                <select
                  className="form-control"
                  id="cmp"
                  value={selectedCmp}
                  onChange={handleCmpChange}
                  disabled={!selectedDr} // Disable until DR is selected
                >
                  <option value="">Select CMP</option>
                  {cmps.map((cmp) => (
                    <option key={cmp.id} value={cmp.id}>
                      {cmp.libelleuo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="efp" className="form-label">Etablissement de Formation Professionnelle (EFP)</label>
                <select
                  className="form-control"
                  id="efp"
                  value={selectedEfp}
                  onChange={(e) => setSelectedEfp(e.target.value)}
                  disabled={!selectedCmp} // Disable until CMP is selected
                >
                  <option value="">Select EFP</option>
                  {efps.map((efp) => (
                    <option key={efp.id} value={efp.id}>
                      {efp.libelleuo}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {message && <p className="mt-3">{typeof message === 'string' ? message : 'An error occurred'}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
