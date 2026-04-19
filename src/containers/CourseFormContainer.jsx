import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CourseFormScreen from '../components/CourseFormScreen';

const CourseFormContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isEdit = location.pathname.includes('/edit');

  const handleSave = () => {
    console.log(isEdit ? `Editando curso ${id}` : 'Criando novo curso');
    navigate('/courses');
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <CourseFormScreen
      isEdit={isEdit}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default CourseFormContainer;
