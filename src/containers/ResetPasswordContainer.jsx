import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from '../api/axiosConfig';
import ResetPasswordScreen from '../components/ResetPasswordScreen';

const ResetPasswordContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const email = localStorage.getItem('resetEmail');
    const codigo = localStorage.getItem('resetCode');

    if (!email || !codigo) {
      message.error('Sessão de recuperação inválida. Tente novamente.');
      navigate('/forgot-password');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/auth/reset-password', {
        email: email,
        codigo: codigo,
        novaSenha: values.password
      });

      message.success('Senha redefinida com sucesso! Você já pode fazer login.');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetCode');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('Código inválido ou expirado.');
      } else {
        message.error('Erro ao redefinir a senha. Tente novamente mais tarde.');
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
    <ResetPasswordScreen
      onSubmit={handleSubmit}
      onBackToLogin={handleBackToLogin}
      isLoading={loading}
    />
  );
};

export default ResetPasswordContainer;
