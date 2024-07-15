import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8080/api/auth';
const UO_API_URL = 'http://localhost:8080/api/uo';

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

export const getAllCatUo = async () => {
    return await axios.get(CAT_UO_API_URL);
};
