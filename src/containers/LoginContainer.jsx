import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import LoginScreen from '../components/LoginScreen';

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log('Login:', values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Bem-vindo ao HC Senac!');
      navigate('/home');
    } catch (error) {
      message.error('Erro ao acessar. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginScreen 
      onLogin={handleLogin} 
      onShowRegister={() => navigate('/register')}
      isLoading={loading} 
    />
  );
};

export default LoginContainer;