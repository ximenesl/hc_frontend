import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { message } from 'antd';
import CourseFormScreen from '../components/CourseFormScreen';
import api from '../api/axiosConfig';

const CourseFormContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEdit = location.pathname.includes('/edit');

  const [formData, setFormData] = useState({
    nome: '',
    sigla: '',
    cargaHoraria: '',
    categoria: ''
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchCourse = async () => {
        try {
          const response = await api.get(`/api/cursos/${id}`);
          const course = response.data;
          setFormData({
            nome: course.nome,
            sigla: '', // O backend não tem sigla ainda na entidade Curso, mas o form tem
            cargaHoraria: course.horasTotais?.toString() || '',
            categoria: '' // O backend não tem categoria ainda na entidade Curso
          });
        } catch (error) {
          console.error(error);
          message.error('Erro ao carregar dados do curso');
        }
      };
      fetchCourse();
    }
  }, [isEdit, id]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.nome) {
      message.error('O nome do curso é obrigatório');
      return;
    }

    try {
      const payload = { 
        nome: formData.nome,
        horasTotais: formData.cargaHoraria ? parseInt(formData.cargaHoraria) : 100
      };
      
      if (isEdit && id) {
        await api.put(`/api/cursos/${id}`, payload);
        message.success('Curso atualizado com sucesso!');
      } else {
        await api.post('/api/cursos', payload);
        message.success('Curso criado com sucesso!');
      }
      navigate('/courses');
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message;
      message.error(typeof errorMsg === 'string' ? errorMsg : (isEdit ? 'Erro ao atualizar curso' : 'Erro ao criar curso'));
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
