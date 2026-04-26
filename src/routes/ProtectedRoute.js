import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole, isAluno } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (isAluno) {
      return <Navigate to="/student-dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
