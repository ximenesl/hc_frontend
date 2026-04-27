import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import CoordinatorFormScreen from '../components/CoordinatorFormScreen';
import api from '../api/axiosConfig';

const CoordinatorFormContainer = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cursoId: null
  });

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get('/api/cursos');
        setCursos(response.data);
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar cursos');
      }
    };
    fetchCursos();
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.email || !formData.cursoId) {
      message.error('Preencha os campos obrigatórios (Nome, Email, Vínculo com Curso)');
      return;
    }

    try {
      await api.post('/api/users', {
        nome: formData.nome,
        email: formData.email,
        role: 'COORDENADOR',
        cursoId: formData.cursoId
      });
      message.success('Coordenador criado com sucesso!');
      navigate('/courses');
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message;
      message.error(typeof errorMsg === 'string' ? errorMsg : 'Erro ao criar coordenador');
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <CoordinatorFormScreen
      cursos={cursos}
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default CoordinatorFormContainer;
