import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import LoginScreen from '../components/LoginScreen';

const API_BASE_URL = 'http://localhost:8080';

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: values.username,
        senha: values.password
      });
      
      const { token, nome, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', nome);
      localStorage.setItem('userRole', role);
      
      message.success(`Bem-vindo, ${nome}!`);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Usuário ou senha inválidos.');
      } else {
        message.error('Erro ao acessar. Verifique sua conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginScreen 
      onLogin={handleLogin} 
      onShowRegister={() => navigate('/register')}
      onForgotPassword={() => navigate('/forgot-password')}
      isLoading={loading} 
    />
  );
};

export default LoginContainer;