import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(state => state.user.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
