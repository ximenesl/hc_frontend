import React, { useState } from 'react';
import { message } from 'antd';
import RegisterScreen from '../components/RegisterScreen';

const RegisterContainer = ({ onBackToLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      console.log('Dados de Cadastro:', values);
      
      // Simulação de chamada de API para Cadastro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success('Conta criada com sucesso! Faça seu login.');
      onBackToLogin(); // Volta para a tela de login
    } catch (error) {
      message.error('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterScreen 
      onRegister={handleRegister}
      onBackToLogin={onBackToLogin}
      isLoading={loading}
    />
  );
};

export default RegisterContainer;
