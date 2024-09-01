import React, { useEffect, useState, useContext } from 'react';
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
import { UserContext } from '../UserContext';

const API_URLS = {
  typeFormations: 'http://localhost:8080/api/reference-data/type-formations',
  niveauFormations: 'http://localhost:8080/api/reference-data/niveau-formations',
  anneeFormations: 'http://localhost:8080/api/reference-data/annee-formations',
  modeFormations: 'http://localhost:8080/api/reference-data/mode-formations',
  etablissements: 'http://localhost:8080/api/unite-organisations/efp/by-cmp',
  cards: 'http://localhost:8080/api/cards/search',
  userUoLibelle: 'http://localhost:8080/api/auth/user', // Endpoint to get the user's uo.libelle
};

const fetchData = async (setters, selectedCriteria, selectedCmp) => {
  const { setTypeFormations, setNiveauFormations, setAnneeFormations, setModeFormations, setEtablissements, setData, setError, setLoading } = setters;

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
    console.log('Fetched cards data:', cardsData);

    if (selectedCmp) {
      const { data: etablissementsData } = await axios.get(`${API_URLS.etablissements}/${selectedCmp}`);
      console.log("Fetched Etablissements Data:", etablissementsData);
      setEtablissements(etablissementsData);  
    }

  } catch (error) {
    setError('Error fetching data.');
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

const ValidCard = () => {
  const { user } = useContext(UserContext); // Access user from context
  const [uoLibelle, setUoLibelle] = useState(''); 
  const [typeFormations, setTypeFormations] = useState([]);
  const [niveauFormations, setNiveauFormations] = useState([]);
  const [anneeFormations, setAnneeFormations] = useState([]);
  const [modeFormations, setModeFormations] = useState([]);
  const [etablissements, setEtablissements] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState({
    modeFormationId: null,
    typeFormationId: null,
    niveauFormationId: null,
    anneeFormationId: null,
  });

  useEffect(() => {
    console.log('User:', user);
    console.log('Fetching UO Libelle for user ID:', user?.userId);

    if (user?.userId) {
      axios.get(`${API_URLS.userUoLibelle}/${user.userId}/uo-libelle`)
          .then(response => {
              const { libelle, uoId } = response.data;
              setUoLibelle(libelle);
              setSelectedCmp(uoId); // Store uoId in selectedCmp
              console.log('Fetched UO Libelle:', libelle, 'UO ID:', uoId);
          })
          .catch(error => {
              console.error('Error fetching uo.libelle:', error);
          });
    }

    fetchData({
        setTypeFormations,
        setNiveauFormations,
        setAnneeFormations,
        setModeFormations,
        setEtablissements,
        setData,
        setError,
        setLoading,
    }, selectedCriteria, selectedCmp);
  }, [selectedCriteria, selectedCmp, user]);

  const handleSelectionChange = (e) => {
    const { id, value } = e.target;
    if (id === 'cmp') {
      setSelectedCmp(value);
    } else {
      setSelectedCriteria(prevCriteria => ({
        ...prevCriteria,
        [`${id}Id`]: value,
      }));
    }
  };

  const handleValidate = async (cardId) => {
    try {
        await axios.put(`http://localhost:8080/api/cards/${cardId}/update-stat`, { statut: 3 });
        // Refresh data to reflect the updated status
        fetchData({
            setTypeFormations,
            setNiveauFormations,
            setAnneeFormations,
            setModeFormations,
            setData,
            setError,
            setLoading,
        }, selectedCriteria, selectedCmp);
    } catch (error) {
        console.error('Error validating card:', error);
        setError('Error validating card.');
    }
  };

  const handleReject = async (cardId) => {
    try {
        await axios.put(`http://localhost:8080/api/cards/${cardId}/update-stat`, { statut: 1 });
        // Refresh data to reflect the updated status
        fetchData({
            setTypeFormations,
            setNiveauFormations,
            setAnneeFormations,
            setModeFormations,
            setData,
            setError,
            setLoading,
        }, selectedCriteria, selectedCmp);
    } catch (error) {
        console.error('Error rejecting card:', error);
        setError('Error rejecting card.');
    }
  };

  return (
    <div className="container wider-container mt-5">
      <div className="jumbotron p-5 rounded mb-4" style={{marginTop: '500px', backgroundColor: '#405D45' }}>
        <h1 className="display-4">Validation des Cartes reçues ({uoLibelle})</h1>
      </div>
      <div className="table-container">
        <form>
          <div className="row mb-3">
            {[
              { label: 'Type de formation', id: 'typeFormation', options: typeFormations },
              { label: 'Niveau de formation', id: 'niveauFormation', options: niveauFormations },
              { label: 'Année de formation', id: 'anneeFormation', options: anneeFormations },
              { label: 'Mode de formation', id: 'modeFormation', options: modeFormations },
              { label: 'Établissement', id: 'cmp', options: etablissements.map(etab => ({ id: etab.id, name: etab.libelleuo })) },
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
                  body={(rowData) => {
                    const isReadOnly = rowData.statut === 1 || rowData.statut === 3;
                    return (
                      <>
                        <button
                          onClick={() => handleValidate(rowData.id)}
                          style={{ 
                            cursor: isReadOnly ? 'not-allowed' : 'pointer', 
                            color: rowData.statut === 2 ? '#007bff' : '#6c757d',
                            border: 'none',
                            background: 'none'
                          }}
                          disabled={isReadOnly || rowData.statut !== 2}
                        >
                          Valider
                        </button>
                        |
                        <button
                          onClick={() => handleReject(rowData.id)}
                          style={{ 
                            cursor: isReadOnly ? 'not-allowed' : 'pointer', 
                            color: '#dc3545', 
                            border: 'none', 
                            background: 'none'
                          }}
                          disabled={isReadOnly}
                        >
                          Rejeter
                        </button>
                      </>
                    );
                  }}
                />
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
