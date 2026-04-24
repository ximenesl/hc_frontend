import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RulesScreen from '../components/RulesScreen';

const RulesContainer = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('Ensino');
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const courses = [
    { id: 'curso-ads', name: 'Análise e Desenvolvimento de Sistemas' },
    { id: 'curso-jogos', name: 'Jogos Digitais' }
  ];

  const [rules, setRules] = useState([
    { id: 1, courseId: 'curso-ads', type: 'Ensino', grupo: '1.1', descricao: 'Participação em monitoria no curso', aproveitamento: '20 h por semestre', requisito: 'Declaração e relatório das atividades' },
    { id: 2, courseId: 'curso-ads', type: 'Ensino', grupo: '1.2', descricao: 'Comparecimento a defesas de monografias', aproveitamento: '2h por participação', requisito: 'Relatório do evento e Lista de presença' },
    { id: 3, courseId: 'curso-ads', type: 'Ensino', grupo: '1.3', descricao: 'Disciplina cursada em outros cursos da Faculdade Senac', aproveitamento: '20h por disciplina', requisito: 'Histórico oficial' },
    { id: 4, courseId: 'curso-ads', type: 'Pesquisa', grupo: '2.1', descricao: 'Participação em pesquisas ou atividades de pesquisa', aproveitamento: '10h por produto final', requisito: 'Relatório do professor orientador' },
    { id: 5, courseId: 'curso-ads', type: 'Pesquisa', grupo: '2.2', descricao: 'Programas de bolsa de Iniciação Científica', aproveitamento: '20h por bolsa', requisito: 'Relatório do professor orientador' },
    { id: 6, courseId: 'curso-ads', type: 'Extensão', grupo: '3.1', descricao: 'Participação em seminários, congressos, conferências', aproveitamento: '10h por participação /4h como público', requisito: 'Atestado ou Certificado de participação' },
    { id: 7, courseId: 'curso-ads', type: 'Extensão', grupo: '3.2', descricao: 'Atendimento comunitário de cunho social', aproveitamento: '10h por semestre', requisito: 'Atestado de participação' }
  ]);

  const tabs = ['Ensino', 'Pesquisa', 'Extensão'];

  const filteredRules = rules.filter(r => r.courseId === courseId && r.type === activeTab);

  const handleAdd = () => {
    setEditingRule(null);
    setIsModalVisible(true);
  };

  const handleEdit = (rule) => {
    let horas = '';
    let unidade = rule.aproveitamento;
    
    const match = rule.aproveitamento.match(/^(\d+)\s*h?\s*(.*)$/i);
    if (match) {
      horas = match[1];
      unidade = match[2];
    }

    setEditingRule({
      ...rule,
      aproveitamentoHoras: horas,
      aproveitamentoUnidade: unidade
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleSave = (values) => {
    const combinedAproveitamento = `${values.aproveitamentoHoras}h ${values.aproveitamentoUnidade}`;
    const finalValues = {
      grupo: values.grupo,
      descricao: values.descricao,
      requisito: values.requisito,
      aproveitamento: combinedAproveitamento
    };

    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? { ...r, ...finalValues } : r));
    } else {
      const newRule = {
        ...finalValues,
        id: Date.now(),
        courseId: courseId,
        type: activeTab
      };
      setRules([...rules, newRule]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRule(null);
  };

  return (
    <RulesScreen 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      rules={filteredRules}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isModalVisible={isModalVisible}
      editingRule={editingRule}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default RulesContainer;
