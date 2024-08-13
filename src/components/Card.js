import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import '../App.css';

const API_URLS = {
  typeFormations: 'http://localhost:8080/api/reference-data/type-formations',
  niveauFormations: 'http://localhost:8080/api/reference-data/niveau-formations',
  anneeFormations: 'http://localhost:8080/api/reference-data/annee-formations',
  modeFormations: 'http://localhost:8080/api/reference-data/mode-formations',
  filieres: 'http://localhost:8080/api/filieres',
};

const fetchData = async (setters, selectedCriteria) => {
  const { setTypeFormations, setNiveauFormations, setAnneeFormations, setModeFormations, setFilieres, setError, setLoading } = setters;

  try {
    const [
      { data: typeFormationsData },
      { data: niveauFormationsData },
      { data: anneeFormationsData },
      { data: modeFormationsData },
    ] = await Promise.all([
      axios.get(API_URLS.typeFormations),
      axios.get(API_URLS.niveauFormations),
      axios.get(API_URLS.anneeFormations),
      axios.get(API_URLS.modeFormations),
    ]);

    setTypeFormations(typeFormationsData);
    setNiveauFormations(niveauFormationsData);
    setAnneeFormations(anneeFormationsData);
    setModeFormations(modeFormationsData);

    // Fetch filieres based on selected criteria
    const { data: filieresData } = await axios.get(API_URLS.filieres, {
      params: selectedCriteria
    });
    setFilieres(filieresData);

  } catch (error) {
    setError('Error fetching data.');
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

const Card = () => {
  const [typeFormations, setTypeFormations] = useState([]);
  const [niveauFormations, setNiveauFormations] = useState([]);
  const [anneeFormations, setAnneeFormations] = useState([]);
  const [modeFormations, setModeFormations] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedCriteria, setSelectedCriteria] = useState({
    modeFormationId: null,
    typeFormationId: null,
    niveauFormationId: null,
    anneeFormationId: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      setTypeFormations,
      setNiveauFormations,
      setAnneeFormations,
      setModeFormations,
      setFilieres,
      setError,
      setLoading,
    }, selectedCriteria);
  }, [selectedCriteria]);

  const handleSelectionChange = (e) => {
    const { id, value } = e.target;
    setSelectedCriteria(prevCriteria => ({
      ...prevCriteria,
      [`${id}Id`]: value
    }));
  };
  
  const handleAjouterClick = (rowData) => {
    console.log(rowData)
    // Extract filiereId and other necessary information
    const selectedCriteriaForCard = {
      codeFiliere: rowData.codeFil,
      filiere: rowData.intituler,
      niveauFormation: rowData.niveauFormation?.name || '',
      typeFormation: rowData.typeFormation?.name || '',
      modeFormation: rowData.modeFormation?.name || '',
      anneeFormation: rowData.anneeFormation?.name || '',
      filiereId: rowData.id, // Ensure this value is correct
    };
  
    // Log the selected criteria for debugging
    console.log("Selected criteria for card:", selectedCriteriaForCard);
  
    // Navigate to FormAjout with the state including filiereId
    navigate('/form-ajout', { state: selectedCriteriaForCard });
  };
  
  return (
    <div className="container wider-container mt-5">
      <div className="jumbotron p-5 rounded mb-4" style={{ marginTop: '1000px', backgroundColor: '#405D45' }}>
        <h1 className="display-4">Gestion de la carte de l’établissement X</h1>
      </div>
      <div className="table-container">
        <form>
          <div className="row mb-3">
            {[
              { label: 'Type de formation', id: 'typeFormation', options: typeFormations },
              { label: 'Niveau de formation', id: 'niveauFormation', options: niveauFormations },
              { label: 'Année de formation', id: 'anneeFormation', options: anneeFormations },
              { label: 'Mode de formation', id: 'modeFormation', options: modeFormations },
            ].map(({ label, id, options }, index) => (
              <div className="col-md-4" key={index}>
                <label htmlFor={id} className="form-label">{label}:</label>
                <select className="form-control" id={id} onChange={handleSelectionChange}>
                  <option value="">Select</option>
                  {options.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </form>
        <h2 className="table-title">Résultats</h2>
        <div className="table-responsive">
          <div className="table">
            <div className="table-header-background">
              <DataTable value={filieres} paginator rows={rows} first={first} onPage={(e) => setFirst(e.first)} rowsPerPageOptions={[10, 20, 50]}>
                <Column field="codeFil" header="Code Filière"></Column>
                <Column field="intituler" header="Libellé Filière"></Column>
                <Column field="effectif" header="Effectif" body={(rowData) => rowData.effectif ?? 'N/A'}></Column>
                <Column field="datePrevueDemarrage" header="Date Prévue de Démarrage" body={(rowData) => rowData.datePrevueDemarrage ?? 'N/A'}></Column>
                <Column
                  header="Action"
                  body={(rowData) => (
                    <a href="#" onClick={() => handleAjouterClick(rowData)}>Ajouter</a>
                  )}
                ></Column>
                <Column field="statut" header="Statut" body={() => null}></Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-success">Enregistrer</button>
          <Paginator first={first} rows={rows} totalRecords={filieres.length} onPageChange={(e) => setFirst(e.first)} />
        </div>
      </div>
    </div>
  );
};

export default Card;
