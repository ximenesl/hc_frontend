import React from 'react';
import { useNavigate } from 'react-router-dom';
import RulesCourseSelectionScreen from '../components/RulesCourseSelectionScreen';

const RulesCourseSelectionContainer = () => {
  const navigate = useNavigate();

  const currentUser = {
    role: 'superadmin',
    coordinatorCourses: ['curso-ads']
  };

  const allCourses = [
    { id: 'curso-ads', name: 'Análise e Desenvolvimento de Sistemas', description: 'Curso Superior de Tecnologia' },
    { id: 'curso-jogos', name: 'Jogos Digitais', description: 'Curso Superior de Tecnologia' }
  ];

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
