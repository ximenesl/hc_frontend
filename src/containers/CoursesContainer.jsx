import React, { useState } from 'react';
import CoursesScreen from '../components/CoursesScreen';

const CoursesContainer = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
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
    setCourseToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    console.log(`Delete course ${courseToDelete}`);
    setIsDeleteModalVisible(false);
    setCourseToDelete(null);
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  return (
    <CoursesScreen
      courses={courses}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      isAddModalVisible={isAddModalVisible}
      isDeleteModalVisible={isDeleteModalVisible}
      onCloseAddModal={() => setIsAddModalVisible(false)}
      onCloseDeleteModal={() => setIsDeleteModalVisible(false)}
      onConfirmDelete={confirmDelete}
      onAddCoordinator={() => { console.log('Novo Coordenador'); setIsAddModalVisible(false); }}
      onAddCourse={() => { console.log('Novo Curso'); setIsAddModalVisible(false); }}
    />
  );
};

export default CoursesContainer;
