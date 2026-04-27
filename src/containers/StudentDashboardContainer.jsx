import React, { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import StudentDashboardScreen from '../components/StudentDashboardScreen';
import api from '../api/axiosConfig';

const StudentDashboardContainer = () => {
  const [student, setStudent] = useState(null);
  const [rules, setRules] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const userRes = await api.get('/api/users/me');
      const currentUser = userRes.data;

      if (!currentUser) {
        setLoading(false);
        return; 
      }

      setStudent({
        id: currentUser.id,
        nome: currentUser.nome,
        matricula: `MAT-${currentUser.id}`,
        cursoId: currentUser.curso ? currentUser.curso.id : null,
        horasTotaisNecessarias: currentUser.curso && currentUser.curso.horasTotais ? currentUser.curso.horasTotais : 100
      });

      let courseRules = [];
      if (currentUser.curso) {
        const rulesRes = await api.get(`/api/regras/curso/${currentUser.curso.id}`);
        courseRules = rulesRes.data.map(r => ({
          id: r.id,
          courseId: r.courseId,
          type: r.type,
          grupo: r.grupo,
          descricao: r.descricao,
          limit: 100 // Poderia extrair do texto da regra
        }));
        setRules(courseRules);
      }

      const certsRes = await api.get('/api/certificates');
      const studentCerts = certsRes.data.filter(c => c.alunoId === currentUser.id);

      // Agrupar por regra.
      const progress = courseRules.map(rule => {
        const certsForRule = studentCerts.filter(c => c.regraId === rule.id);
        const sentHours = certsForRule.reduce((sum, c) => sum + (c.cargaHoraria || 0), 0);
        const approvedCerts = certsForRule.filter(c => c.status === 'APROVADO' || c.status === 'DEFERIDO' || c.status === 'VALIDADO');
        const approvedHours = approvedCerts.reduce((sum, c) => sum + (c.cargaHoraria || 0), 0);
        
        return {
          ruleId: rule.id,
          sentHours: sentHours,
          approvedHours: approvedHours
        };
      });

      setProgressData(progress);

    } catch (error) {
      console.error(error);
      message.error('Erro ao carregar dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalApprovedHours = progressData.reduce((acc, curr) => acc + curr.approvedHours, 0);
  const categories = ['Ensino', 'Pesquisa', 'Extensão'];
  
  const groupedProgress = categories.map(cat => {
    const catRules = rules.filter(r => r.type === cat);
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

  const handleSubmitCertificate = async (values) => {
    const rule = rules.find(r => r.id === values.ruleId);
    if (!rule || !student) return;

    try {
      const formData = new FormData();
      formData.append('alunoId', student.id);
      formData.append('nome', "Certificado - " + rule.descricao); 
      formData.append('regraId', rule.id);
      formData.append('cargaHoraria', values.horas);
      formData.append('file', values.file);

      await api.post('/api/certificates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      message.success('Certificado submetido com sucesso!');
      setIsModalVisible(false);
      setSelectedCategoria(null);
      fetchData(); // Recarrega os dados
    } catch (error) {
      console.error(error);
      message.error('Erro ao enviar certificado');
    }
  };

  if (!student && !loading) {
    return <div>Nenhum dado de aluno encontrado.</div>;
  }

  return (
    <StudentDashboardScreen
      student={student || {}}
      totalApprovedHours={totalApprovedHours}
      groupedProgress={groupedProgress}
      studentRules={rules}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      selectedCategoria={selectedCategoria}
      setSelectedCategoria={setSelectedCategoria}
      onSubmitCertificate={handleSubmitCertificate}
      loading={loading}
    />
  );
};

export default StudentDashboardContainer;
