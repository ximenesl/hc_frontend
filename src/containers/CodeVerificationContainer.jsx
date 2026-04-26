import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from '../api/axiosConfig';
import CodeVerificationScreen from '../components/CodeVerificationScreen';

const CodeVerificationContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const email = localStorage.getItem('resetEmail');
    if (!email) {
      message.error('Erro no fluxo de recuperação. Tente novamente do início.');
      navigate('/forgot-password');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/auth/verify-code', {
        email: email,
        codigo: values.otp
      });
      localStorage.setItem('resetCode', values.otp);
      message.success('Código verificado com sucesso!');
      navigate('/reset-password');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('Código inválido ou expirado.');
      } else {
        message.error('Erro ao verificar código. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    localStorage.removeItem('resetEmail');
    localStorage.removeItem('resetCode');
    navigate('/login');
  };

  return (
    <CodeVerificationScreen
      onSubmit={handleSubmit}
      onBackToLogin={handleBackToLogin}
      isLoading={loading}
    />
  );
};

export default CodeVerificationContainer;
