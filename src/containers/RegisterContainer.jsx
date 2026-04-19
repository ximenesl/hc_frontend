import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import RegisterScreen from '../components/RegisterScreen';

const RegisterContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      message.success('Conta criada com sucesso! Faça seu login.');
      navigate('/login');
    } catch (error) {
      message.error('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterScreen
      onRegister={handleRegister}
      onBackToLogin={() => navigate('/login')}
      isLoading={loading}
    />
  );
};

export default RegisterContainer;
