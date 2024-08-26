import React, { useEffect, useState } from 'react';
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
  cards: 'http://localhost:8080/api/cards/search',
};

const fetchData = async (setters, selectedCriteria) => {
  const { setTypeFormations, setNiveauFormations, setAnneeFormations, setModeFormations, setData, setError, setLoading } = setters;

  try {
    const [
      { data: typeFormationsData },
      { data: niveauFormationsData },
      { data: anneeFormationsData },
      { data: modeFormationsData },
      { data: cardsData }
    ] = await Promise.all([
      axios.get(API_URLS.typeFormations),
      axios.get(API_URLS.niveauFormations),
      axios.get(API_URLS.anneeFormations),
      axios.get(API_URLS.modeFormations),
      axios.get(API_URLS.cards, { params: selectedCriteria })
    ]);

    setTypeFormations(typeFormationsData);
    setNiveauFormations(niveauFormationsData);
    setAnneeFormations(anneeFormationsData);
    setModeFormations(modeFormationsData);
    setData(cardsData);

  } catch (error) {
    setError('Error fetching data.');
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

const ValidCard = () => {
  const [typeFormations, setTypeFormations] = useState([]);
  const [niveauFormations, setNiveauFormations] = useState([]);
  const [anneeFormations, setAnneeFormations] = useState([]);
  const [modeFormations, setModeFormations] = useState([]);
  const [data, setData] = useState([]);
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

  useEffect(() => {
    fetchData({
      setTypeFormations,
      setNiveauFormations,
      setAnneeFormations,
      setModeFormations,
      setData,
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

  return (
    <div className="container wider-container mt-5">
      <div className="jumbotron p-5 rounded mb-4" style={{ backgroundColor: '#405D45' }}>
        <h1 className="display-4">Validation des Cartes</h1>
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
              <div className="col-md-3" key={index}>
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
              <DataTable value={data} paginator rows={rows} first={first} onPage={(e) => setFirst(e.first)} rowsPerPageOptions={[10, 20, 50]}>
                <Column field="codeFil" header="Code Filière"></Column>
                <Column field="intituler" header="Filière"></Column>
                <Column field="effectif" header="Effectif Prévu"></Column>
                <Column field="datePrevueDemarrage" header="Date Prévue de Démarrage"></Column>
                <Column
                  header="Action"
                  body={(rowData) => (
                    <div className="action-buttons">
                      <button className="btn btn-success">Valider</button>
                      <button className="btn btn-danger ml-2">Rejeter</button>
                    </div>
                  )}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Paginator first={first} rows={rows} totalRecords={data.length} onPageChange={(e) => setFirst(e.first)} />
        </div>
      </div>
    </div>
  );
};

export default ValidCard;