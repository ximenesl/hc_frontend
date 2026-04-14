import React from 'react';
import { Layout, Typography, Card, Badge, List, Space } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './HomeScreen.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomeScreen = ({ stats, recentSubmissions }) => {
  return (
    <Layout className="home-layout">
      <MainHeader />

      <Content className="home-content">
        <div className="content-inner">
          {/* Cards de Estatísticas */}
          <Space direction="vertical" size={16} className="full-width-space">
            <Card className="stats-card">
              <div className="stats-inner">
                <Text className="stats-label">Total de Alunos</Text>
                <Text className="stats-value">{stats.totalAlunos}</Text>
              </div>
            </Card>

            <Card className="stats-card">
              <div className="stats-inner">
                <Text className="stats-label">Pendências</Text>
                <Text className="stats-value pending">{stats.pendencias}</Text>
              </div>
            </Card>
          </Space>

          {/* Imagem Cinza */}
          <div className="chart-placeholder" />

          {/* Lista de Submissões Recentes */}
          <div className="submissions-section">
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
