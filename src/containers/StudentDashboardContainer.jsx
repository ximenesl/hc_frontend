import React, { useState } from 'react';
import StudentDashboardScreen from '../components/StudentDashboardScreen';

const StudentDashboardContainer = () => {
  // Mock do Aluno logado
  const student = {
    nome: 'Carlos de Oliveira',
    matricula: '202101234',
    cursoId: 'curso-ads',
    horasTotaisNecessarias: 100
  };

  // Mock das Regras (idealmente viria de uma API/Contexto compartilhado)
  const rules = [
    { id: 1, courseId: 'curso-ads', type: 'Ensino', grupo: '1.1', descricao: 'Participação em monitoria no curso', limit: 20 },
    { id: 2, courseId: 'curso-ads', type: 'Ensino', grupo: '1.2', descricao: 'Comparecimento a defesas de monografias', limit: 10 },
    { id: 3, courseId: 'curso-ads', type: 'Pesquisa', grupo: '2.1', descricao: 'Participação em pesquisas', limit: 30 },
    { id: 4, courseId: 'curso-ads', type: 'Extensão', grupo: '3.1', descricao: 'Participação em seminários', limit: 40 }
  ];

  // Mock das horas já enviadas e aprovadas por regra
  const [progressData, setProgressData] = useState([
    { ruleId: 1, approvedHours: 20, sentHours: 25 }, // Enviou 25, mas o limite era 20
    { ruleId: 2, approvedHours: 4, sentHours: 4 }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Estado para o Modal
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  // Filtra apenas as regras do curso do aluno
  const studentRules = rules.filter(r => r.courseId === student.cursoId);

  // Calcula horas totais aprovadas
  const totalApprovedHours = progressData.reduce((acc, curr) => acc + curr.approvedHours, 0);

  // Agrupa dados por categoria para exibir no Collapse
  const categories = ['Ensino', 'Pesquisa', 'Extensão'];
  
  const groupedProgress = categories.map(cat => {
    const catRules = studentRules.filter(r => r.type === cat);
    let catApproved = 0;
    
    const catRulesProgress = catRules.map(rule => {
      const prog = progressData.find(p => p.ruleId === rule.id) || { approvedHours: 0, sentHours: 0 };
      catApproved += prog.approvedHours;
      return {
        ...rule,
        approvedHours: prog.approvedHours,
        sentHours: prog.sentHours
      };
    });

    return {
      category: cat,
      approvedHours: catApproved,
      rules: catRulesProgress
    };
  });

  const handleSubmitCertificate = (values) => {
    const rule = studentRules.find(r => r.id === values.ruleId);
    if (!rule) return;

    // Lógica simulada: como o coordenador quem define as horas, 
    // o certificado fica "em análise" e as horas não entram na conta automática agora.
    // Vamos apenas fechar o modal. Em produção, enviaria para API.
    
    setIsModalVisible(false);
    setSelectedCategoria(null);
  };

  return (
    <StudentDashboardScreen
      student={student}
      totalApprovedHours={totalApprovedHours}
      groupedProgress={groupedProgress}
      studentRules={studentRules}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      selectedCategoria={selectedCategoria}
      setSelectedCategoria={setSelectedCategoria}
      onSubmitCertificate={handleSubmitCertificate}
    />
  );
};

export default StudentDashboardContainer;
