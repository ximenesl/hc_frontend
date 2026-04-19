import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordScreen from '../components/ResetPasswordScreen';

const ResetPasswordContainer = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    navigate('/login');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <ResetPasswordScreen
      onSubmit={handleSubmit}
      onBackToLogin={handleBackToLogin}
    />
  );
};

export default ResetPasswordContainer;
