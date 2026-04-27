import React, { useState, useEffect, useCallback } from 'react';
import { message, Form } from 'antd';
import CoordinatorsScreen from '../components/CoordinatorsScreen';
import api from '../api/axiosConfig';

const CoordinatorsContainer = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [coordToDelete, setCoordToDelete] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingCoord, setEditingCoord] = useState(null);
  const [editForm] = Form.useForm();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersRes, cursosRes] = await Promise.all([
        api.get('/api/users'),
        api.get('/api/cursos')
      ]);

      setCursos(cursosRes.data);

      const coords = usersRes.data
        .filter(u => u.role === 'COORDENADOR')
        .map(u => ({
          id: u.id,
          nome: u.nome,
          email: u.email,
          cursoId: u.curso ? u.curso.id : null,
          cursoNome: u.curso ? u.curso.nome : null
        }));

      setCoordinators(coords);
    } catch (error) {
      console.error(error);
      message.error('Erro ao carregar coordenadores');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredCoordinators = coordinators.filter(coord => {
    const term = searchText.toLowerCase();
    return (
      coord.nome.toLowerCase().includes(term) ||
      coord.email.toLowerCase().includes(term)
    );
  });

  const handleEdit = (coord) => {
    setEditingCoord(coord);
    editForm.setFieldsValue({
      nome: coord.nome,
      email: coord.email,
      cursoId: coord.cursoId
    });
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async (values) => {
    if (!editingCoord) return;

    try {
      await api.put(`/api/users/${editingCoord.id}`, {
        nome: values.nome,
        email: values.email,
        role: 'COORDENADOR',
        cursoId: values.cursoId || null
      });
      message.success('Coordenador atualizado com sucesso!');
      setIsEditModalVisible(false);
      setEditingCoord(null);
      fetchData();
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message;
      message.error(typeof errorMsg === 'string' ? errorMsg : 'Erro ao atualizar coordenador');
    }
  };

  const handleDelete = (id) => {
    setCoordToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/users/${coordToDelete}`);
      message.success('Coordenador excluído com sucesso!');
      setIsDeleteModalVisible(false);
      setCoordToDelete(null);
      fetchData();
    } catch (error) {
      console.error(error);
      message.error('Erro ao excluir coordenador');
    }
  };

  return (
    <CoordinatorsScreen
      coordinators={filteredCoordinators}
      cursos={cursos}
      loading={loading}
      onSearch={handleSearch}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isDeleteModalVisible={isDeleteModalVisible}
      onCloseDeleteModal={() => setIsDeleteModalVisible(false)}
      onConfirmDelete={confirmDelete}
      isEditModalVisible={isEditModalVisible}
      onCloseEditModal={() => { setIsEditModalVisible(false); setEditingCoord(null); }}
      editForm={editForm}
      onSaveEdit={handleSaveEdit}
    />
  );
};

export default CoordinatorsContainer;
