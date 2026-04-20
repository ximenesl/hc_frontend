import React, { useState } from 'react';
import StudentsScreen from '../components/StudentsScreen';

const StudentsContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState('');

  // Dados mockados baseados no print fornecido
  const students = [
    {
      id: 1,
      nome: 'Carlos de Oliveira',
      matricula: '202101234',
      horasCompletas: 100,
      horasTotais: 100,
    },
    {
      id: 2,
      nome: 'Ana Souza',
      matricula: '202101234',
      horasCompletas: 60,
      horasTotais: 100,
    },
    {
      id: 3,
      nome: 'Pedro Santos',
      matricula: '202101234',
      horasCompletas: 90,
      horasTotais: 100,
    },
    {
      id: 4,
      nome: 'Lucas Almeida',
      matricula: '202101234',
      horasCompletas: 45,
      horasTotais: 100,
    }
  ];

  // Função para lidar com a digitação na busca
  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <StudentsScreen 
      students={students}
      onSearch={handleSearch}
    />
  );
};

export default StudentsContainer;
