import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import CourseTurmasScreen from '../components/CourseTurmasScreen';
import api from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';

const CourseTurmasContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isCoordenador, cursoIds } = useAuth();
  const [curso, setCurso] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDados = useCallback(async () => {
    try {
      setLoading(true);
      const [cursoRes, turmasRes] = await Promise.all([
        api.get(`/api/cursos/${id}`),
        api.get('/api/turmas')
      ]);
      setCurso(cursoRes.data);
      setTurmas(turmasRes.data.filter(t => t.cursoId === parseInt(id)));
    } catch (error) {
      console.error(error);
      message.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isCoordenador && !cursoIds.includes(parseInt(id, 10))) {
      message.error('Você não tem permissão para acessar as turmas deste curso');
      navigate('/courses');
      return;
    }
    fetchDados();
  }, [fetchDados, isCoordenador, cursoIds, id, navigate]);


  const handleAddTurma = async (nome) => {
    try {
      await api.post('/api/turmas', { nome, cursoId: parseInt(id) });
      message.success('Turma criada com sucesso!');
      fetchDados();
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Erro ao criar turma');
    }
  };

  const handleEditTurma = async (turmaId, nome) => {
    try {
      await api.put(`/api/turmas/${turmaId}`, { nome, cursoId: parseInt(id) });
      message.success('Turma atualizada com sucesso!');
      fetchDados();
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Erro ao atualizar turma');
    }
  };

  const handleDeleteTurma = async (turmaId) => {
    try {
      await api.delete(`/api/turmas/${turmaId}`);
      message.success('Turma deletada com sucesso!');
      fetchDados();
    } catch (error) {
      console.error(error);
      const backendMessage = error.response?.data?.message;
      message.error(typeof backendMessage === 'string' ? backendMessage : 'Erro ao deletar turma. Verifique se existem alunos vinculados.');
    }
  };


  return (
    <CourseTurmasScreen
      curso={curso}
      turmas={turmas}
      loading={loading}
      onAddTurma={handleAddTurma}
      onEditTurma={handleEditTurma}
      onDeleteTurma={handleDeleteTurma}
    />
  );
};

export default CourseTurmasContainer;
