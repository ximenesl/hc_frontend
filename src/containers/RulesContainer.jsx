import React, { useState } from 'react';
import RulesScreen from '../components/RulesScreen';

const RulesContainer = () => {
  const [activeTab, setActiveTab] = useState('Ensino');

  const validationRules = {
    'Ensino': [
      { id: 1, title: 'Monitoria', limit: '20h/semestre' },
      { id: 2, title: 'Visita Técnica', limit: '4h por visita' },
      { id: 3, title: 'Curso', limit: '20h/semestre' }
    ],
    'Pesquisa': [
      { id: 4, title: 'Bolsa de Iniciação Científica', limit: '20h por bolsa' },
      { id: 5, title: 'Publicação de artigos', limit: '10h por produto publicado' },
      { id: 6, title: 'Publicação em livro na área', limit: '40h por produto publicado' }
    ],
    'Extensão': [
      { id: 7, title: 'Apresentação de trabalhos', limit: '10h pela apresentação' },
      { id: 8, title: 'Representação estudantil', limit: '10h por semestre' },
      { id: 9, title: 'Cursos de extensão universitária', limit: '10h por curso' }
    ]
  };

  const tabs = ['Ensino', 'Pesquisa', 'Extensão'];

  return (
    <RulesScreen 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      rules={validationRules[activeTab]}
    />
  );
};

export default RulesContainer;
