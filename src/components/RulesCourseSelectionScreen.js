import React from 'react';
import { Layout, Typography, Card, List } from 'antd';
import { RightOutlined, BookOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './RulesScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;

const RulesCourseSelectionScreen = ({ courses, onCourseClick }) => {
  return (
    <Layout className="rules-layout">
      <MainHeader />

      <Content className="rules-content">
        <div className="rules-inner">
          <div style={{ marginBottom: '24px' }}>
            <Title level={4} style={{ color: '#fff', marginTop: 0 }}>Selecione o Curso</Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Escolha o curso para visualizar ou editar suas regras de validação.
            </Text>
          </div>

          <List
            className="rules-course-list"
            dataSource={courses}
            renderItem={(course) => (
              <Card 
                className="rules-course-card" 
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                hoverable
                style={{ marginBottom: '16px', borderRadius: '8px', cursor: 'pointer' }}
                bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '8px', 
                    backgroundColor: '#F59120', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center' 
                  }}>
                    <BookOutlined style={{ color: '#fff', fontSize: '24px' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#004A8F' }}>
                      {course.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '13px' }}>
                      {course.description}
                    </div>
                  </div>
                </div>
                <RightOutlined style={{ color: '#F59120', fontSize: '18px' }} />
              </Card>
            )}
          />
        </div>
      </Content>

      <MainFooter activeKey="rules" />
    </Layout>
  );
};

export default RulesCourseSelectionScreen;
