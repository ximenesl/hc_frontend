import React from 'react';
import { Layout, Typography, Card, Button, Divider, FloatButton, Modal } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  RightOutlined,
  ReadOutlined
} from '@ant-design/icons';
import useAuth from '../hooks/useAuth';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './CoursesScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;

const CoursesScreen = ({
  courses,
  onEdit,
  onDelete,
  onAdd,
  isAddModalVisible,
  isDeleteModalVisible,
  onCloseAddModal,
  onCloseDeleteModal,
  onConfirmDelete,
  onAddCoordinator,
  onAddCourse,
  onAddStudent,
  onViewTurmas
}) => {
  const { isAdmin, isCoordenador } = useAuth();

  return (
    <Layout className="courses-layout">
      <MainHeader />

      <Content className="courses-content">
        <div className="courses-inner-content">
          <Title level={4} className="courses-page-title">Gestão de Curso</Title>
          {courses.map(course => (
            <Card className="course-card" key={course.id}>
              <div className="course-header-row">
                <Title level={5} className="course-title">{course.name}</Title>
                {course.sigla && <Text className="course-sigla-tag">{course.sigla}</Text>}
              </div>

              <div className="course-info-row">
                <UserOutlined className="course-icon" />
                <Text className="course-text">{course.coordinatorName}</Text>
              </div>
              <div className="course-info-row">
                <MailOutlined className="course-icon" />
                <Text className="course-text">{course.coordinatorEmail}</Text>
              </div>
              <div className="course-info-row">
                <ReadOutlined className="course-icon" />
                <Text className="course-text" style={{ textTransform: 'capitalize' }}>{course.categoria || '-'}</Text>
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
                  className="view-turmas-button"
                  onClick={() => onViewTurmas(course.id)}
                  style={{ marginRight: '8px' }}
                >
                  Turmas
                </Button>
                {isAdmin && (
                  <>
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
                  </>
                )}
              </div>

            </Card>
          ))}
        </div>
      </Content>

      {isAdmin && (
        <FloatButton
          className="add-float-button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={onAdd}
        />
      )}
      <MainFooter />

      {isAdmin && (
        <Modal
          open={isAddModalVisible}
          onCancel={onCloseAddModal}
          footer={null}
          title="Adicionar"
          className="custom-bottom-modal"
          closeIcon={<span style={{ color: '#fff' }}>X</span>}
        >
          <div className="add-drawer-content">
            <div className="add-option-btn" onClick={onAddCourse}>
              <ReadOutlined className="add-option-icon" />
              <div className="add-option-text">
                <Text className="add-option-title">Novo Curso</Text>
                <Text className="add-option-desc">Cadastre um novo curso</Text>
              </div>
              <RightOutlined className="add-option-arrow" />
            </div>
          </div>
        </Modal>
      )}

      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onCancel={onCloseDeleteModal}
        onConfirm={onConfirmDelete}
        title="Deseja excluir este curso?"
        message="Esta ação excluirá permanentemente o curso e todos os dados vinculados."
      />

    </Layout>
  );
};

export default CoursesScreen;
