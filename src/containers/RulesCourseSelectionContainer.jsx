import React from 'react';
import { useNavigate } from 'react-router-dom';
import RulesCourseSelectionScreen from '../components/RulesCourseSelectionScreen';

const RulesCourseSelectionContainer = () => {
  const navigate = useNavigate();

  // Mock de usuário atual (poderia vir de um contexto de autenticação)
  const currentUser = {
    role: 'superadmin', // Mude para 'coordinator' para testar a visão de coordenador
    coordinatorCourses: ['curso-ads'] // Cursos que ele coordena
  };

  // Mock de todos os cursos
  const allCourses = [
    { id: 'curso-ads', name: 'Análise e Desenvolvimento de Sistemas', description: 'Curso Superior de Tecnologia' },
    { id: 'curso-jogos', name: 'Jogos Digitais', description: 'Curso Superior de Tecnologia' }
  ];

  // Filtra os cursos baseado no cargo
  const visibleCourses = currentUser.role === 'superadmin' 
    ? allCourses 
    : allCourses.filter(c => currentUser.coordinatorCourses.includes(c.id));

  const handleCourseClick = (courseId) => {
    navigate(`/rules/${courseId}`);
  };

  return (
    <RulesCourseSelectionScreen 
      courses={visibleCourses}
      onCourseClick={handleCourseClick}
    />
  );
};

export default RulesCourseSelectionContainer;
