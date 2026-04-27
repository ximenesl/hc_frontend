import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import CourseFormScreen from '../components/CourseFormScreen';
import api from '../api/axiosConfig';

const CourseFormContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.pathname.includes('/edit');

  const [formData, setFormData] = useState({
    nome: '',
    sigla: '',
    cargaHoraria: '',
    categoria: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.nome) {
      message.error('O nome do curso é obrigatório');
      return;
    }

    try {
      await api.post('/api/cursos', { nome: formData.nome });
      message.success('Curso criado com sucesso!');
      navigate('/courses');
    } catch (error) {
      console.error(error);
      message.error('Erro ao criar curso');
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <CourseFormScreen
      isEdit={isEdit}
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default CourseFormContainer;
