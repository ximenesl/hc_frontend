import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesScreen from '../components/CoursesScreen';

const CoursesContainer = () => {
  const navigate = useNavigate();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
    navigate(`/courses/edit/${id}`);
  };

  const handleDelete = (id) => {
    setCourseToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
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
      onAddCoordinator={() => { setIsAddModalVisible(false); navigate('/coordinators/new'); }}
      onAddCourse={() => { setIsAddModalVisible(false); navigate('/courses/new'); }}
      onAddStudent={() => { setIsAddModalVisible(false); navigate('/students/new'); }}
    />
  );
};

export default CoursesContainer;
