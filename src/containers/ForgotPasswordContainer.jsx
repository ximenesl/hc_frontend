import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from '../api/axiosConfig';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';

const ForgotPasswordContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/auth/forgot-password', {
        email: values.email
      });
      message.success('Uma nova senha temporária foi enviada para o seu e-mail!');
      message.info('Verifique sua caixa de entrada e spam.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        message.error('Usuário não encontrado com o e-mail fornecido.');
      } else {
        message.error('Erro ao solicitar recuperação. Tente novamente mais tarde.');
      }
    } finally {

      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <ForgotPasswordScreen
      onSubmit={handleSubmit}
      onBackToLogin={handleBackToLogin}
      isLoading={loading}
    />
  );
};

export default ForgotPasswordContainer;
