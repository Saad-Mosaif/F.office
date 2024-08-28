import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user data is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <UserContext.Provider value={{ user, setUser: login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
