import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import StudentFormScreen from '../components/StudentFormScreen';
import api from '../api/axiosConfig';

const StudentFormContainer = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cursoId: null,
    turmaId: null
  });

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [cursosRes, turmasRes] = await Promise.all([
          api.get('/api/cursos'),
          api.get('/api/turmas')
        ]);
        setCursos(cursosRes.data);
        setTurmas(turmasRes.data);
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar dados');
      }
    };
    fetchDados();
  }, []);

  const availableTurmas = turmas.filter(t => t.cursoId === formData.cursoId);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.email || !formData.cursoId || !formData.turmaId) {
      message.error('Preencha os campos obrigatórios (Nome, Email, Curso, Turma)');
      return;
    }

    try {
      await api.post('/api/users', {
        nome: formData.nome,
        email: formData.email,
        role: 'ALUNO',
        cursoId: formData.cursoId,
        turmaId: formData.turmaId
      });
      message.success('Aluno criado com sucesso!');
      navigate('/students');
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message;
      message.error(typeof errorMsg === 'string' ? errorMsg : 'Erro ao criar aluno');
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <StudentFormScreen 
      cursos={cursos}
      turmas={availableTurmas}
      formData={formData}
      onChange={handleChange}
      onSave={handleSave} 
      onCancel={handleCancel}
    />
  );
};

export default StudentFormContainer;
