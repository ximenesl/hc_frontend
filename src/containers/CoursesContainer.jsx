import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import CoursesScreen from '../components/CoursesScreen';
import api from '../api/axiosConfig';

const CoursesContainer = () => {
  const navigate = useNavigate();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/cursos');
      
      // Formatting the courses for the table
      const formattedCourses = response.data.map(c => ({
        id: c.id,
        name: c.nome,
        coordinatorName: c.coordenadorNome || 'Não atribuído',
        coordinatorEmail: c.coordenadorEmail || '-',
        studentsCount: c.studentsCount || 0,
        creationDate: c.dataCriacao ? new Date(c.dataCriacao).toLocaleDateString('pt-BR') : '-',
      }));
      setCourses(formattedCourses);
    } catch (error) {
      console.error(error);
      message.error('Erro ao carregar cursos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (id) => {
    navigate(`/courses/edit/${id}`);
  };

  const handleViewTurmas = (id) => {
    navigate(`/courses/${id}/turmas`);
  };

  const handleDelete = (id) => {
    setCourseToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/cursos/${courseToDelete}`);
      message.success('Curso deletado com sucesso!');
      setIsDeleteModalVisible(false);
      setCourseToDelete(null);
      fetchCourses();
    } catch (error) {
      console.error(error);
      message.error('Erro ao deletar o curso');
    }
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  return (
    <CoursesScreen
      courses={courses}
      loading={loading}
      onEdit={handleEdit}
      onViewTurmas={handleViewTurmas}
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
