import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';

const ForgotPasswordContainer = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    navigate('/verify-code');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <ForgotPasswordScreen
      onSubmit={handleSubmit}
      onBackToLogin={handleBackToLogin}
    />
  );
};

export default ForgotPasswordContainer;
