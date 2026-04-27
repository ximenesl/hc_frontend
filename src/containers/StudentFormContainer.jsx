import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import StudentFormScreen from '../components/StudentFormScreen';
import api from '../api/axiosConfig';

const StudentFormContainer = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
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
      message.error('Preencha os campos obrigatórios (Nome, Email, Curso)');
      return;
    }

    try {
      await api.post('/api/users', {
        nome: formData.nome,
        email: formData.email,
        role: 'ALUNO',
        cursoId: formData.cursoId
      });
      message.success('Aluno criado com sucesso!');
      navigate('/students');
    } catch (error) {
      console.error(error);
      message.error('Erro ao criar aluno');
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <StudentFormScreen 
      cursos={cursos}
      formData={formData}
      onChange={handleChange}
      onSave={handleSave} 
      onCancel={handleCancel}
    />
  );
};

export default StudentFormContainer;
