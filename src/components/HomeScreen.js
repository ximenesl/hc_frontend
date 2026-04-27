import React from 'react';
import { Layout, Typography, Card, Badge, List, Space, Spin } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './HomeScreen.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomeScreen = ({ stats, recentSubmissions, dashboardData, lastAction, loading }) => {
  if (loading) {
    return (
      <Layout className="home-layout">
        <MainHeader />
        <Content className="home-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
        <MainFooter activeKey="home" />
      </Layout>
    );
  }

  return (
    <Layout className="home-layout">
      <MainHeader />

      <Content className="home-content">
        <div className="content-inner">
          <Space direction="vertical" size={16} className="full-width-space">
            <Card className="stats-card">
              <div className="stats-inner">
                <Text className="stats-label">Total de Alunos</Text>
                <Text className="stats-value">{stats?.totalAlunos || 0}</Text>
              </div>
            </Card>

            <Card className="stats-card">
              <div className="stats-inner">
                <Text className="stats-label">Pendências</Text>
                <Text className="stats-value pending">{stats?.pendencias || 0}</Text>
              </div>
            </Card>
          </Space>

          {/* Dashboard de Cursos */}
          <div className="dashboard-section" style={{ marginTop: 24 }}>
            <Title level={4} className="section-title">Certificados por Curso</Title>
            <Card className="dashboard-card" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 12 }}>
              {dashboardData && dashboardData.length > 0 ? (
                dashboardData.map((curso) => (
                  <div key={curso.id} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text strong style={{ color: '#fff' }}>{curso.nome}</Text>
                      <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                        {curso.aprovados} aprovados / {curso.enviados} enviados
                      </Text>
                    </div>
                    <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ 
                        width: curso.enviados > 0 ? `${(curso.aprovados / curso.enviados) * 100}%` : '0%', 
                        height: '100%', 
                        backgroundColor: curso.cor,
                        borderRadius: 6,
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))
              ) : (
                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Nenhum dado disponível.</Text>
              )}
            </Card>
          </div>

          {/* Última Ação */}
          {lastAction && (
            <div className="last-action-section" style={{ marginTop: 24 }}>
              <Title level={4} className="section-title">Última Ação</Title>
              <Card className="last-action-card" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ color: '#fff', display: 'block', fontSize: 16 }}>{lastAction.aluno}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{lastAction.tipo}</Text>
                  </div>
                  <Badge
                    className={`status-badge ${lastAction.status.toLowerCase()}`}
                    count={lastAction.status}
                    style={{ backgroundColor: lastAction.status === 'PENDENTE' ? '#faad14' : lastAction.status === 'APROVADO' || lastAction.status === 'DEFERIDO' || lastAction.status === 'VALIDADO' ? '#52c41a' : '#f5222d' }}
                  />
                </div>
              </Card>
            </div>
          )}

          <div className="submissions-section" style={{ marginTop: 24, marginBottom: 40 }}>
            <Title level={4} className="section-title">Submissões recentes</Title>

            <List
              dataSource={recentSubmissions}
              renderItem={(item) => (
                <Card className="submission-item-card" key={item.id}>
                  <div className="submission-main">
                    <div className="submission-row">
                      <Text strong className="submission-title">{item.tipo}</Text>
                      <Text strong className="submission-user">{item.aluno}</Text>
                    </div>
                    <div className="submission-row">
                      <Badge
                        className={`status-badge ${item.status.toLowerCase()}`}
                        count={item.status}
                        style={{ backgroundColor: item.status === 'PENDENTE' ? '#faad14' : item.status === 'APROVADO' || item.status === 'DEFERIDO' || item.status === 'VALIDADO' ? '#52c41a' : '#f5222d' }}
                      />
                      <Text className="submission-date">{item.horas} - {item.data}</Text>
                    </div>
                  </div>
                </Card>
              )}
            />
          </div>
        </div>
      </Content>

      <MainFooter activeKey="home" />
    </Layout>
  );
};

export default HomeScreen;
