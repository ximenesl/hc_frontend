import React from 'react';
import HomeScreen from '../components/HomeScreen';

const HomeContainer = () => {
  // Dados mockados (simulando virem de uma API futuramente)
  const stats = {
    totalAlunos: 250,
    pendencias: 18
  };

  const recentSubmissions = [
    {
      id: 1,
      tipo: 'Certificado de Curso',
      aluno: 'Ana Souza',
      status: 'Pendente',
      horas: '2 horas',
      data: '10/04/2024'
    },
    {
      id: 2,
      tipo: 'Evento Voluntário',
      aluno: 'Ana Souza',
      status: 'Deferido',
      horas: '4 horas',
      data: '08/04/2024'
    },
    {
      id: 3,
      tipo: 'Projeto de Pesquia',
      aluno: 'Ana Souza',
      status: 'Indeferido',
      horas: '5 horas',
      data: '05/04/2024'
    }
  ];

  return (
    <HomeScreen 
      stats={stats} 
      recentSubmissions={recentSubmissions} 
    />
  );
};

export default HomeContainer;
