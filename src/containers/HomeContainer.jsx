import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import HomeScreen from '../components/HomeScreen';
import api from '../api/axiosConfig';

const HomeContainer = () => {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    pendencias: 0
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [lastAction, setLastAction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, certsRes, cursosRes] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/certificates'),
          api.get('/api/cursos')
        ]);

        const users = usersRes.data;
        const certs = certsRes.data;
        const cursos = cursosRes.data;

        const alunos = users.filter(u => u.role === 'ALUNO');
        const totalAlunos = alunos.length;

        const pendencias = certs.filter(c => c.status === 'PENDENTE').length;

        setStats({ totalAlunos, pendencias });

        const sortedCerts = [...certs].sort((a, b) => b.id - a.id);
        
        const recent = sortedCerts.slice(0, 3).map(cert => ({
          id: cert.id,
          tipo: cert.nome || 'Certificado de Curso',
          aluno: cert.alunoNome || 'Desconhecido',
          status: cert.status,
          horas: `${cert.cargaHoraria || 0} horas`,
          data: cert.dataEmissao ? new Date(`${cert.dataEmissao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'
        }));
        
        setRecentSubmissions(recent);

        if (sortedCerts.length > 0) {
          const lastCert = sortedCerts[0];
          setLastAction({
            aluno: lastCert.alunoNome || 'Desconhecido',
            status: lastCert.status,
            tipo: lastCert.nome || 'Certificado',
            horas: lastCert.cargaHoraria || 0
          });
        }

        const userCourseMap = {};
        users.forEach(u => {
          if (u.curso) {
            userCourseMap[u.id] = u.curso.id;
          }
        });

        const courseStatsMap = {};
        cursos.forEach(c => {
          courseStatsMap[c.id] = {
            id: c.id,
            nome: c.nome,
            cor: '#1890ff', 
            enviados: 0,
            aprovados: 0
          };
        });

        const colors = ['#F59120', '#1890ff', '#52c41a', '#eb2f96', '#722ed1', '#13c2c2'];
        let colorIndex = 0;

        cursos.forEach(c => {
            courseStatsMap[c.id].cor = colors[colorIndex % colors.length];
            colorIndex++;
        });

        certs.forEach(cert => {
          const cursoId = userCourseMap[cert.alunoId];
          if (cursoId && courseStatsMap[cursoId]) {
            courseStatsMap[cursoId].enviados += 1;
            if (cert.status === 'APROVADO' || cert.status === 'DEFERIDO' || cert.status === 'VALIDADO') {
              courseStatsMap[cursoId].aprovados += 1;
            }
          }
        });

        const dashboardList = Object.values(courseStatsMap).filter(c => c.enviados > 0 || c.aprovados > 0);
        setDashboardData(dashboardList);

      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <HomeScreen 
      stats={stats} 
      recentSubmissions={recentSubmissions} 
      dashboardData={dashboardData}
      lastAction={lastAction}
      loading={loading}
    />
  );
};

export default HomeContainer;
