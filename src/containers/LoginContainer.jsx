import React, { useState } from 'react';
import { message } from 'antd';
import LoginScreen from '../components/LoginScreen';
import RegisterContainer from './RegisterContainer';

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login');

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log('Login:', values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Bem-vindo ao HC Senac!');
    } catch (error) {
      message.error('Erro ao acessar. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  if (view === 'register') {
    return (
      <RegisterContainer 
        onBackToLogin={() => setView('login')}
      />
    );
  }

  return (
    <LoginScreen 
      onLogin={handleLogin} 
      onShowRegister={() => setView('register')}
      isLoading={loading} 
    />
  );
};

export default LoginContainer;