import React, { useState } from 'react';
import { Layout, Typography, Button } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './RulesScreen.css';

const { Content } = Layout;
const { Text } = Typography;

const validationRules = [
  { id: 1, title: 'Curso', limit: '20h/semestre' },
  { id: 2, title: 'Bolsa de Iniciação Científica', limit: '20h por bolsa' },
  { id: 3, title: 'Representação estudantil', limit: '10h por semestre' },
  { id: 4, title: 'Cursos de extensão universitária', limit: '10h por curso' },
  { id: 5, title: 'Publicação de artigos', limit: '10h por produto publicado' },
];

const tabs = ['Ensino', 'Pesquisa', 'Extensão'];

const RulesScreen = () => {
  const [activeTab, setActiveTab] = useState('Ensino');

  return (
    <Layout className="rules-layout">
      <MainHeader />

      <Content className="rules-content">
        <div className="rules-inner">
          <div className="rules-tabs-container">
            {tabs.map(tab => (
              <div 
                key={tab} 
                className={`rules-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="rules-list">
            {validationRules.map(rule => (
              <div className="rules-card" key={rule.id}>
                <div className="rules-info">
                  <Text className="rules-title">{rule.title}</Text>
                  <Text className="rules-limit">{rule.limit}</Text>
                </div>
                <Button className="rules-btn">Mais detalhes</Button>
              </div>
            ))}
          </div>
        </div>
      </Content>

      <MainFooter activeKey="rules" />
    </Layout>
  );
};

export default RulesScreen;
