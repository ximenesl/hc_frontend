import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import RulesCourseSelectionScreen from '../components/RulesCourseSelectionScreen';
import api from '../api/axiosConfig';

const RulesCourseSelectionContainer = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/cursos');
        const formattedCourses = response.data.map(c => ({
          id: c.id,
          name: c.nome,
          description: `Coordenador: ${c.coordenadorNome || 'Não atribuído'}`
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error(error);
        message.error('Erro ao buscar cursos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/rules/${courseId}`);
  };

  return (
    <RulesCourseSelectionScreen 
      courses={courses}
      onCourseClick={handleCourseClick}
      loading={loading}
    />
  );
};

export default RulesCourseSelectionContainer;
