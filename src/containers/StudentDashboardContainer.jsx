import React, { useState, useEffect } from 'react';
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

  const fetchData = async () => {
    try {
      setLoading(true);
      // Pega o usuario atual (mockando pegar todos e filtrar pelo token ou email logado)
      // Como não temos a rota /me exata que retorne tudo detalhado, pegamos a lista de usuarios e o email salvo no localStorage ou decodificado
      // Para simplificar, vou assumir que tem endpoint ou usar a lista
      const usersRes = await api.get('/api/users');
      // Precisa do ID do usuário logado. Idealmente viria do contexto ou JWT. 
      // Como workaround temporário, pegar o primeiro ALUNO ou simular.
      // Vou buscar todos e tentar pegar o aluno atual pelo token. Se não der, pega o primeiro.
      const userStr = localStorage.getItem('user'); // Supondo que salvou algo no login
      let currentUser = null;
      if (userStr) {
        const parsed = JSON.parse(userStr);
        currentUser = usersRes.data.find(u => u.email === parsed.email);
      }
      
      if (!currentUser) {
        currentUser = usersRes.data.find(u => u.role === 'ALUNO');
      }

      if (!currentUser) {
        setLoading(false);
        return; // Sem alunos
      }

      setStudent({
        id: currentUser.id,
        nome: currentUser.nome,
        matricula: `MAT-${currentUser.id}`,
        cursoId: currentUser.curso ? currentUser.curso.id : null,
        horasTotaisNecessarias: 100
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

      // Agrupar por regra. Não temos ruleId no certificado atual no BD, então associamos por nome temporariamente ou apenas mostramos.
      // Assumindo que a categoria vem como nome do certificado no BD (Gambiarra temporaria pq o BD nao tem regra_id no Certificado)
      const progress = courseRules.map(rule => {
        const certsForRule = studentCerts.filter(c => c.nome === rule.descricao);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      formData.append('nome', rule.descricao); // Salvando a descricao da regra como nome para vincular depois
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
