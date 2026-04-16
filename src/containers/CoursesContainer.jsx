import React from 'react';
import CoursesScreen from '../components/CoursesScreen';

const CoursesContainer = () => {
  const courses = [
    {
      id: 1,
      name: 'Análise e Desenvolvimento de Sistemas',
      coordinatorName: 'João Silva',
      coordinatorEmail: 'joao@email.com',
      studentsCount: 150,
      creationDate: '10/08/2021',
    },
    {
      id: 2,
      name: 'Jogos Digitais',
      coordinatorName: 'Maria Santos',
      coordinatorEmail: 'maria@email.com',
      studentsCount: 80,
      creationDate: '15/05/2020',
    }
  ];

  const handleEdit = (id) => {
    console.log(`Edit course ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete course ${id}`);
  };

  const handleAdd = () => {
    console.log('Add new course');
  };

  return (
    <CoursesScreen
      courses={courses}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
};

export default CoursesContainer;
