import React from 'react';
import { Layout, Typography, Card, Button, Divider, FloatButton } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './CoursesScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;

const CoursesScreen = ({ courses, onEdit, onDelete, onAdd }) => {
  return (
    <Layout className="courses-layout">
      <MainHeader />

      <Content className="courses-content">
        <div className="courses-inner-content">
          {courses.map(course => (
            <Card className="course-card" key={course.id}>
              <Title level={5} className="course-title">{course.name}</Title>

              <div className="course-info-row">
                <UserOutlined className="course-icon" />
                <Text className="course-text">{course.coordinatorName}</Text>
              </div>
              <div className="course-info-row">
                <MailOutlined className="course-icon" />
                <Text className="course-text">{course.coordinatorEmail}</Text>
              </div>

              <Divider className="course-divider" />

              <div className="course-stats-row">
                <div className="course-stat-item">
                  <TeamOutlined className="course-stat-icon" />
                  <div className="course-stat-text-col">
                    <Text className="course-stat-value">{course.studentsCount}</Text>
                    <Text className="course-stat-label">alunos</Text>
                  </div>
                </div>
                <div className="course-stat-item">
                  <CalendarOutlined className="course-stat-icon" />
                  <div className="course-stat-text-col">
                    <Text className="course-stat-value">{course.creationDate}</Text>
                    <Text className="course-stat-label">Data de criação</Text>
                  </div>
                </div>
              </div>

              <div className="course-actions">
                <Button
                  className="edit-button"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(course.id)}
                >
                  Editar
                </Button>
                <Button
                  className="delete-button"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(course.id)}
                />
              </div>
            </Card>
          ))}
        </div>
      </Content>

      {/* Botão flutuante */}
      <FloatButton
        className="add-float-button"
        icon={<PlusOutlined />}
        type="primary"
        onClick={onAdd}
      />

      {/* Rodapé padrão */}
      <MainFooter />
    </Layout>
  );
};

export default CoursesScreen;
