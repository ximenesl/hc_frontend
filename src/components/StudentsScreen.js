import React from 'react';
import { Layout, Input, Typography, List, Card, Progress } from 'antd';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './StudentsScreen.css';

const { Content } = Layout;
const { Text } = Typography;

const StudentsScreen = ({ students, onSearch }) => {
  return (
    <Layout className="students-layout">
      <MainHeader />

      <Content className="students-content">
        <div className="students-inner-content">

          <Input
            className="students-search-input"
            prefix={<span />}
            suffix={<SearchOutlined className="search-icon" />}
            placeholder="Busque por nome ou matrícula"
            onChange={(e) => onSearch(e.target.value)}
          />

          <div className="students-filter-section">
            <Text className="filter-title">Filtrar por:</Text>
            <Text className="filter-subtitle">Status</Text>
            <div className="filter-pills-container">
              <div className="filter-pill"></div>
              <div className="filter-pill"></div>
            </div>
          </div>

          <List
            className="students-list"
            dataSource={students}
            renderItem={(student) => {
              const progressPercent = Math.round((student.horasCompletas / student.horasTotais) * 100);
              return (
                <Card className="student-card" key={student.id}>
                  <div className="student-card-header">
                    <div className="student-info">
                      <Text className="student-name">{student.nome}</Text>
                      <Text className="student-matricula">Matrícula: {student.matricula}</Text>
                    </div>
                    <RightOutlined className="student-arrow" />
                  </div>

                  <div className="student-progress-row">
                    <Progress
                      percent={progressPercent}
                      strokeColor="#004A8F"
                      trailColor="#F59120"
                      showInfo={false}
                      style={{ flex: 1, margin: 0 }}
                    />
                    <Text className="student-progress-text">{student.horasCompletas}/{student.horasTotais}h</Text>
                  </div>
                </Card>
              );
            }}
          />
        </div>
      </Content>

      <MainFooter activeKey="students" />
    </Layout>
  );
};

export default StudentsScreen;
