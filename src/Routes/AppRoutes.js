import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './../Context/AuthContext';
import Login from './../Components/Login';
import BikeAssembly from './../Components/BikeAssembly';
import AdminDashboard from './../Components/AdminDashboard';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {

    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/assemble"
                            element={
                                <ProtectedRoute>
                                    <BikeAssembly />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to="/login" />} /> {/* Catch-all for unknown routes */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
