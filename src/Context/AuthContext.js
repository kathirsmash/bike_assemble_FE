import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState(localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')) : '');

    const login = (data) => {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user_data', JSON.stringify(data));
        setToken(data.accessToken);
        setUserData(data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, userData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
