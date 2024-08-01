import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const FormAjout = () => {
  const [effectif, setEffectif] = useState('');
  const [dateDemarrage, setDateDemarrage] = useState('');
  const [observation, setObservation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      effectif,
      dateDemarrage,
      observation,
    });
  };

  return (
    <div className="container wider-container mt-5">
      <div className="card card-hover" style={{ marginTop: '600px', width: '50%', maxWidth: '1000px', minHeight: '100vh' }}>
        <div className="card-body">
          <h2 className="card-title">Ajouter une Formation</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="codeFiliere" className="form-label">Code Filière</label>
              <input type="text" className="form-control" id="codeFiliere" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="filiere" className="form-label">Filière</label>
              <input type="text" className="form-control" id="filiere" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="niveauFormation" className="form-label">Niveau de formation</label>
              <input type="text" className="form-control" id="niveauFormation" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="typeFormation" className="form-label">Type de formation</label>
              <input type="text" className="form-control" id="typeFormation" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="modeFormation" className="form-label">Mode de formation</label>
              <input type="text" className="form-control" id="modeFormation" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="secteur" className="form-label">Secteur</label>
              <input type="text" className="form-control" id="secteur" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="anneeFormation" className="form-label">Année de formation</label>
              <input type="text" className="form-control" id="anneeFormation" placeholder="N/A" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="exercice" className="form-label">Exercice</label>
              <input type="text" className="form-control" id="exercice" value="2024/2025" readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="effectif" className="form-label">Effectif (obligatoire)</label>
              <select className="form-control" id="effectif" value={effectif} onChange={(e) => setEffectif(e.target.value)}>
                <option value="">Select Effectif</option>
                <option value="30">30</option>
                {/* Add other options as needed */}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dateDemarrage" className="form-label">Date de démarrage (obligatoire)</label>
              <input type="date" className="form-control" id="dateDemarrage" value={dateDemarrage} onChange={(e) => setDateDemarrage(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="observation" className="form-label">Observation (optionnel)</label>
              <textarea className="form-control" id="observation" value={observation} onChange={(e) => setObservation(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-success">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAjout;
