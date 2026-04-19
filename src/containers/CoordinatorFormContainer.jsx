import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinatorFormScreen from '../components/CoordinatorFormScreen';

const CoordinatorFormContainer = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Criando novo coordenador');
    navigate('/courses');
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <CoordinatorFormScreen
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default CoordinatorFormContainer;
