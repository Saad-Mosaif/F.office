import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8080/api/auth';
const UO_API_URL = 'http://localhost:8080/api/uo';
const FILIERE_API_URL = 'http://localhost:8080/api/filieres';
const REFERENCE_DATA_API_URL = 'http://localhost:8080/api/reference-data';

export const register = async (email, password) => {
    return await axios.post(`${AUTH_API_URL}/register`, { email, password });
};

export const login = async (email, password) => {
    return await axios.post(`${AUTH_API_URL}/login`, { email, password });
};

export const getAllUo = async () => {
    return await axios.get(UO_API_URL);
};

export const deleteUo = async (id) => {
    return await axios.delete(`${UO_API_URL}/${id}`);
};

export const getUoById = async (id) => {
    return await axios.get(`${UO_API_URL}/${id}`);
};

export const updateUo = async (id, uo) => {
    return await axios.put(`${UO_API_URL}/${id}`, uo);
};

export const getAllFiliere = async () => {
    return await axios.get(FILIERE_API_URL);
};

export const getAllTypeFormations = async () => {
    return await axios.get(`${REFERENCE_DATA_API_URL}/type-formations`);
};

export const getAllNiveauFormations = async () => {
    return await axios.get(`${REFERENCE_DATA_API_URL}/niveau-formations`);
};

export const getAllAnneeFormations = async () => {
    return await axios.get(`${REFERENCE_DATA_API_URL}/annee-formations`);
};

export const getAllModeFormations = async () => {
    return await axios.get(`${REFERENCE_DATA_API_URL}/mode-formations`);
};
