import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === 'ALUNO') {
      return <Navigate to="/student-dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
