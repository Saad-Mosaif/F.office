import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Card = () => {
  const [typeFormations, setTypeFormations] = useState([]);
  const [niveauFormations, setNiveauFormations] = useState([]);
  const [anneeFormations, setAnneeFormations] = useState([]);
  const [modeFormations, setModeFormations] = useState([]);
  const [filieres, setFilieres] = useState([]);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const [
        typeFormationsResponse,
        niveauFormationsResponse,
        anneeFormationsResponse,
        modeFormationsResponse,
        filieresResponse
      ] = await Promise.all([
        axios.get('http://localhost:8080/api/reference-data/type-formations'),
        axios.get('http://localhost:8080/api/reference-data/niveau-formations'),
        axios.get('http://localhost:8080/api/reference-data/annee-formations'),
        axios.get('http://localhost:8080/api/reference-data/mode-formations'),
        axios.get('http://localhost:8080/api/filieres')
      ]);

      setTypeFormations(typeFormationsResponse.data);
      setNiveauFormations(niveauFormationsResponse.data);
      setAnneeFormations(anneeFormationsResponse.data);
      setModeFormations(modeFormationsResponse.data);
      setFilieres(filieresResponse.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container wider-container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Gestion de la carte de l’établissement X</h1>
      </div>
      <div className="table-container">
        <form>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="typeFormation" className="form-label">Type de formation:</label>
              <select className="form-control" id="typeFormation">
                {typeFormations.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="niveauFormation" className="form-label">Niveau de formation:</label>
              <select className="form-control" id="niveauFormation">
                {niveauFormations.map(niveau => (
                  <option key={niveau.id} value={niveau.id}>{niveau.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="anneeFormation" className="form-label">Année de formation:</label>
              <select className="form-control" id="anneeFormation">
                {anneeFormations.map(annee => (
                  <option key={annee.id} value={annee.id}>{annee.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="modeFormation" className="form-label">Mode de formation:</label>
              <select className="form-control" id="modeFormation">
                {modeFormations.map(mode => (
                  <option key={mode.id} value={mode.id}>{mode.name}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <h2 className="table-title">Résultats</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Code Filière</th>
              <th>Libellé Filière</th>
              <th>Effectif</th>
              <th>Date Prévue de Démarrage</th>
              <th>Action</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filieres.map(filiere => (
              <tr key={filiere.id}>
                <td>{filiere.codeFil}</td>
                <td>{filiere.intituler}</td>
                <td>{filiere.effectif ?? 'N/A'}</td>
                <td>{filiere.datePrevueDemarrage ?? 'N/A'}</td>
                <td>
                  <a href="#modifier">Modifier</a> | <a href="#supprimer">Supprimer</a>
                </td>
                <td>Ajoutée</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-success">Enregistrer</button>
          <button className="btn btn-primary">Valider</button>
        </div>
        <div className="mt-2">
          <p><strong>Enregistrer:</strong> Vous permet de sauvegarder les modifications et de continuer à les modifier à tout moment avant la validation définitive.</p>
          <p><strong>Valider:</strong> Une fois validé, les modifications sont définitives et ne peuvent plus être modifiées.</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
