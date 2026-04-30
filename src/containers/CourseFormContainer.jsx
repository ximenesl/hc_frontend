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

  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const usersRes = await api.get('/api/users');
        const coords = usersRes.data.filter(u => u.role === 'COORDENADOR');
        setCoordinators(coords);
      } catch (error) {
        console.error('Erro ao buscar coordenadores:', error);
      }
    };
    fetchCoordinators();
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      const fetchCourse = async () => {
        try {
          const response = await api.get(`/api/cursos/${id}`);
          const course = response.data;
          console.log('Curso carregado para edição:', course);
          setFormData({
            nome: course.nome,
            sigla: course.sigla || '',
            cargaHoraria: course.horasTotais?.toString() || '',
            categoria: course.categoria || '',
            coordenadorId: course.coordenadorId || ''
          });
        } catch (error) {
          console.error('Erro ao carregar curso:', error);

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
        horasTotais: formData.cargaHoraria ? parseInt(formData.cargaHoraria) : 100,
        coordenadorId: formData.coordenadorId || null,
        sigla: formData.sigla,
        categoria: formData.categoria
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
      coordinators={coordinators}
    />
  );
};

export default CourseFormContainer;
