import React from 'react';
import { Layout, Typography, Button, Segmented } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './RulesScreen.css';

const { Content } = Layout;
const { Text } = Typography;

const RulesScreen = ({ tabs, activeTab, onTabChange, rules }) => {
  return (
    <Layout className="rules-layout">
      <MainHeader />

      <Content className="rules-content">
        <div className="rules-inner">
          <div className="rules-tabs-container">
            <Segmented 
              block 
              options={tabs} 
              value={activeTab} 
              onChange={onTabChange} 
              className="custom-segmented"
            />
          </div>

          <div className="rules-list">
            {rules.map(rule => (
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
