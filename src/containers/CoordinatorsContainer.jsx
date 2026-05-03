import React, { useState, useEffect, useCallback } from 'react';
import { message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import CoordinatorsScreen from '../components/CoordinatorsScreen';
import api from '../api/axiosConfig';

const CoordinatorsContainer = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [coordToDelete, setCoordToDelete] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingCoord, setEditingCoord] = useState(null);
  const [editForm] = Form.useForm();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const navigate = useNavigate();

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
        .map(u => {
          const courseNames = (u.cursos && u.cursos.length > 0) 
            ? u.cursos.map(c => c.nome).join(', ') 
            : 'Sem vínculo';
          const courseIds = (u.cursos && u.cursos.length > 0) ? u.cursos.map(c => c.id) : [];
          return {
            id: u.id,
            nome: u.nome,
            email: u.email,
            cursoIds: courseIds,
            cursoNome: courseNames,
            ativo: u.ativo
          };
        });

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
    const matchSearch = coord.nome.toLowerCase().includes(term) || coord.email.toLowerCase().includes(term);
    const matchStatus = showInactive ? coord.ativo === false : coord.ativo !== false;
    return matchSearch && matchStatus;
  });

  const handleEdit = (coord) => {
    setEditingCoord(coord);
    editForm.setFieldsValue({
      nome: coord.nome,
      email: coord.email,
      cursoIds: coord.cursoIds
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
        cursoIds: values.cursoIds || []
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

  const [actionType, setActionType] = useState('inactivate');

  const handleActionClick = (id, type) => {
    setCoordToDelete(id);
    setActionType(type);
    setIsDeleteModalVisible(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === 'delete') {
        await api.delete(`/api/users/${coordToDelete}`);
        message.success('Coordenador excluído com sucesso!');
      } else {
        await api.put(`/api/users/${coordToDelete}/inativar`);
        message.success('Coordenador inativado com sucesso!');
      }
      setIsDeleteModalVisible(false);
      setCoordToDelete(null);
      fetchData();
    } catch (error) {
      console.error(error);
      message.error(`Erro ao ${actionType === 'delete' ? 'excluir' : 'inativar'} coordenador`);
    }
  };

  const handleAdd = () => setIsAddModalVisible(true);
  const handleCloseAddModal = () => setIsAddModalVisible(false);
  const handleAddCoordinator = () => {
    setIsAddModalVisible(false);
    navigate('/coordinators/new');
  };

  return (
    <CoordinatorsScreen
      coordinators={filteredCoordinators}
      cursos={cursos}
      loading={loading}
      onSearch={handleSearch}
      showInactive={showInactive}
      onToggleInactive={setShowInactive}
      onEdit={handleEdit}
      onActionClick={handleActionClick}
      isDeleteModalVisible={isDeleteModalVisible}
      onCloseDeleteModal={() => setIsDeleteModalVisible(false)}
      onConfirmAction={confirmAction}
      actionType={actionType}
      isEditModalVisible={isEditModalVisible}
      onCloseEditModal={() => { setIsEditModalVisible(false); setEditingCoord(null); }}
      editForm={editForm}
      onSaveEdit={handleSaveEdit}
      onAdd={handleAdd}
      isAddModalVisible={isAddModalVisible}
      onCloseAddModal={handleCloseAddModal}
      onAddCoordinator={handleAddCoordinator}
    />
  );
};

export default CoordinatorsContainer;
