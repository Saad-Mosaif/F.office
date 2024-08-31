import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the UserContext
export const UserContext = createContext();

// Define the API endpoint for fetching user details
const API_URLS = {
    userUoLibelle: 'http://localhost:8080/api/auth/user' // No trailing slash here
  };

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [uoLibelle, setUoLibelle] = useState('');
    const [selectedCmp, setSelectedCmp] = useState(null);

    useEffect(() => {
        // Check if user data is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);

            // Fetch uoLibelle and uoId
            if (userData.userId) {
                axios.get(`${API_URLS.userUoLibelle}/${userData.userId}`)
                    .then(response => {
                        const { libelle, uoId } = response.data;
                        setUoLibelle(libelle);
                        setSelectedCmp(uoId);
                        console.log("Fetched UO Libelle:", libelle, "UO ID:", uoId);
                    })
                    .catch(error => {
                        console.error('Error fetching uo.libelle:', error);
                    });
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage

        // Fetch uoLibelle and uoId
        if (userData.userId) {
            axios.get(`${API_URLS.userUoLibelle}/${userData.userId}`)
                .then(response => {
                    const { libelle, uoId } = response.data;
                    setUoLibelle(libelle);
                    setSelectedCmp(uoId);
                    console.log("Fetched UO Libelle:", libelle, "UO ID:", uoId);
                })
                .catch(error => {
                    console.error('Error fetching uo.libelle:', error);
                });
        }
    };

    const logout = () => {
        setUser(null);
        setUoLibelle('');
        setSelectedCmp(null);
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <UserContext.Provider value={{ user, uoLibelle, selectedCmp, setUser: login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
