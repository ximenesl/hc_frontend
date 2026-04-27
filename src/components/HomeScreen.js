import React from 'react';
import { Layout, Typography, Card, Badge, List, Space, Spin } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px' }}>
          <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>{label}</p>
          <p style={{ color: '#1890ff', margin: 0 }}>{`Enviados: ${payload[0].value}`}</p>
          <p style={{ color: '#52c41a', margin: 0 }}>{`Aprovados: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

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

          <div className="dashboard-section" style={{ marginTop: 24 }}>
            <Title level={4} className="section-title">Certificados por Curso</Title>
            <Card className="dashboard-card" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 12 }}>
              {dashboardData && dashboardData.length > 0 ? (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="nome" stroke="#fff" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                      <YAxis stroke="#fff" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
                      <Bar dataKey="enviados" name="Enviados" radius={[4, 4, 0, 0]}>
                        {dashboardData.map((entry, index) => (
                          <Cell key={`cell-env-${index}`} fill={entry.cor} opacity={0.5} />
                        ))}
                      </Bar>
                      <Bar dataKey="aprovados" name="Aprovados" radius={[4, 4, 0, 0]}>
                        {dashboardData.map((entry, index) => (
                          <Cell key={`cell-apr-${index}`} fill={entry.cor} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Nenhum dado disponível.</Text>
              )}
            </Card>
          </div>

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
