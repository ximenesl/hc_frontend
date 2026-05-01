import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../components/LoginScreen';

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', {
        email: values.username,
        senha: values.password
      });

      const { token, nome, role, cursoIds } = response.data;
      saveSession({ token, nome, role, cursoIds });


      message.success(`Bem-vindo, ${nome}!`);

      if (role === 'ALUNO') {
        navigate('/student-dashboard');
      } else {
        navigate('/home');
      }
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
      onRedefinePassword={() => navigate('/change-password')}
      isLoading={loading} 
    />
  );
};

export default LoginContainer;