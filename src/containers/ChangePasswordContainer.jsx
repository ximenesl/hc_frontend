import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import ChangePasswordScreen from '../components/ChangePasswordScreen';
import api from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';

const ChangePasswordContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userEmail } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/auth/change-password', {
        email: userEmail,
        senhaAntiga: values.senhaAntiga,
        senhaNova: values.senhaNova
      });
      
      message.success('Senha atualizada com sucesso!');
      navigate(-1); // Volta para a tela anterior
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Erro ao atualizar senha. Verifique se a senha atual está correta.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ChangePasswordScreen
      onSubmit={handleSubmit}
      onBack={handleBack}
      isLoading={loading}
    />
  );
};

export default ChangePasswordContainer;
