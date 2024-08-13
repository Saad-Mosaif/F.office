import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const FormAjout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codeFiliere: '',
    filiere: '',
    typeFormation: '',
    niveauFormation: '',
    anneeFormation: '',
    modeFormation: '',
    effectif: '',
    datePrevueDemarrage: '',
    commentaire: '',
  });

  useEffect(() => {
    console.log("Component mounted or location.state changed:", location.state);
    if (location.state) {
      const { codeFiliere, filiere, typeFormation, niveauFormation, anneeFormation, modeFormation, filiereId } = location.state;
  
      // Initialize form data if location.state is present
      setFormData(prevData => ({
        ...prevData,
        codeFiliere: codeFiliere || '',
        filiere: filiere || '',
        typeFormation: typeFormation || '',
        niveauFormation: niveauFormation || '',
        anneeFormation: anneeFormation || '',
        modeFormation: modeFormation || '',
        filiereId : filiereId || '',
      }));
    }
  }, [location.state]);
  

  useEffect(() => {
    console.log("Selected Filiere:", formData); // Log the entire formData
  }, [formData]); // Log only when formData changes

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(e)
    const  filiereId = formData.codeFiliere ;
    console.log(filiereId)

    
    
    // console.log("Location state:", location.state); // Log entire location.state
    // console.log("Filiere ID:", filiereId); // Log filiereId
  
    // if (!filiereId) {
    //   console.error('Filiere ID is undefined or null');
    //   return;
    // }
  
    const cardData = {
      filiereId: formData.filiereId,
      effectif: formData.effectif,
      datePrevueDemarrage: formData.datePrevueDemarrage,
      commentaire: formData.commentaire,
    
    };
  console.log(cardData)
    try {
      const response = await axios.post('http://localhost:8080/api/cards/create', cardData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Card created:', response.data);
      navigate('/card'); // Navigate after success
    } catch (error) {
      console.error('Error saving card:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container wider-container mt-5">
      <div className="card card-hover" style={{ marginTop: '600px', width: '50%', maxWidth: '1000px', minHeight: '100vh' }}>
        <div className="card-body">
          <h2 className="card-title">Ajouter une Formation</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="codeFiliere" className="form-label">Code Filière</label>
              <input type="text" className="form-control" id="codeFiliere" value={formData.codeFiliere} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="filiere" className="form-label">Filière</label>
              <input type="text" className="form-control" id="filiere" value={formData.filiere} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="niveauFormation" className="form-label">Niveau de formation</label>
              <input type="text" className="form-control" id="niveauFormation" value={formData.niveauFormation} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="typeFormation" className="form-label">Type de formation</label>
              <input type="text" className="form-control" id="typeFormation" value={formData.typeFormation} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="modeFormation" className="form-label">Mode de formation</label>
              <input type="text" className="form-control" id="modeFormation" value={formData.modeFormation} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="anneeFormation" className="form-label">Année de formation</label>
              <input type="text" className="form-control" id="anneeFormation" value={formData.anneeFormation} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="effectif" className="form-label">Effectif (obligatoire)</label>
              <input type="number" className="form-control" id="effectif" value={formData.effectif} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="datePrevueDemarrage" className="form-label">Date de démarrage (obligatoire)</label>
              <input type="date" className="form-control" id="datePrevueDemarrage" value={formData.datePrevueDemarrage} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="commentaire" className="form-label">Observation (optionnel)</label>
              <textarea className="form-control" id="commentaire" value={formData.commentaire} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-success">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAjout;
