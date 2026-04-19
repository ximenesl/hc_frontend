import React from 'react';
import { useNavigate } from 'react-router-dom';
import CodeVerificationScreen from '../components/CodeVerificationScreen';

const CodeVerificationContainer = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    navigate('/reset-password');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <CodeVerificationScreen
      onSubmit={handleSubmit}
      onBackToLogin={handleBackToLogin}
    />
  );
};

export default CodeVerificationContainer;
