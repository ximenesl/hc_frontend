import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from '../api/axiosConfig';
import PublicChangePasswordScreen from '../components/PublicChangePasswordScreen';

const PublicChangePasswordContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/auth/change-password', {
        email: values.email,
        senhaAntiga: values.senhaAntiga,
        senhaNova: values.senhaNova
      });
      
      message.success('Senha atualizada com sucesso! Agora você pode entrar.');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao redefinir senha:', error.response?.data);
      
      // Tratamento refinado para erros de senha incorreta vs erros de servidor
      if (error.response && error.response.status === 400) {
          message.error('Senha provisória/atual incorreta. Verifique o e-mail recebido.');
      } else if (error.response && error.response.status === 404) {
          message.error('Usuário não encontrado com este e-mail.');
      } else {
          message.error('Erro no servidor ao tentar redefinir senha. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <PublicChangePasswordScreen
      onSubmit={handleSubmit}
      onBack={handleBack}
      isLoading={loading}
    />
  );
};

export default PublicChangePasswordContainer;
