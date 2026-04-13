import React, { useState } from 'react';
import { message } from 'antd';
import LoginScreen from '../components/LoginScreen';

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      console.log('Dados enviados para o back:', values);

      await new Promise(resolve => setTimeout(resolve, 1500));

      message.success('Login realizado com sucesso!');


    } catch (error) {
      message.error('Erro ao acessar. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      isLoading={loading}
    />
  );
};

export default LoginContainer;