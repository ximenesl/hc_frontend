import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentFormScreen from '../components/StudentFormScreen';

const StudentFormContainer = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/students');
  };

  return (
    <StudentFormScreen 
      onSave={handleSave} 
    />
  );
};

export default StudentFormContainer;
