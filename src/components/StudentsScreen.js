import React from 'react';
import { Layout, Input, Typography, List, Card, Progress, Select, ConfigProvider, FloatButton, Modal, Button } from 'antd';
import { SearchOutlined, RightOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './StudentsScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;

const selectTheme = {
  token: {
    colorText: '#000000',
    colorTextPlaceholder: '#bfbfbf',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorIcon: '#000000'
  }
};

const StudentsScreen = ({ 
  students, 
  onSearch, 
  courses, 
  availableClasses, 
  selectedCourse, 
  selectedClass, 
  onCourseChange, 
  onClassChange,
  onAdd,
  isAddModalVisible,
  onCloseAddModal,
  onAddStudent,
  onEdit,
  onDelete,
  isDeleteModalVisible,
  onCloseDeleteModal,
  onConfirmDelete
}) => {
  return (
    <Layout className="students-layout">
      <MainHeader />

      <Content className="students-content">
        <div className="students-inner-content">
          <Title level={4} className="students-page-title">Gestão de Aluno</Title>

          <Input
            className="students-search-input"
            prefix={<span />}
            suffix={<SearchOutlined className="search-icon" />}
            placeholder="Busque por nome, matrícula ou turma"
            onChange={(e) => onSearch(e.target.value)}
          />

          <div className="students-filter-section">
            <Text className="filter-title">Filtrar por:</Text>
            <ConfigProvider theme={selectTheme}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                <Select 
                  placeholder="Selecione o Curso"
                  value={selectedCourse}
                  onChange={onCourseChange}
                  style={{ flex: 1, minWidth: 150 }}
                  allowClear
                >
                  {courses.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                </Select>
                <Select 
                  placeholder="Selecione a Turma"
                  value={selectedClass}
                  onChange={onClassChange}
                  style={{ flex: 1, minWidth: 150 }}
                  disabled={!selectedCourse}
                  allowClear
                >
                  {availableClasses.map(cls => <Option key={cls} value={cls}>{cls}</Option>)}
                </Select>
              </div>
            </ConfigProvider>
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
                      <Text className="student-matricula">Curso: {student.cursoNome}</Text>
                      <Text className="student-matricula">Turma: {student.codigoTurma}</Text>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button 
                        icon={<EditOutlined />} 
                        onClick={() => onEdit(student.id)}
                        className="edit-button-mini"
                      />
                      <Button 
                        icon={<DeleteOutlined />} 
                        danger
                        onClick={() => onDelete(student.id)}
                        className="delete-button-mini"
                      />
                    </div>
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

      <FloatButton
        className="add-float-button"
        icon={<PlusOutlined />}
        type="primary"
        onClick={onAdd}
      />
      <MainFooter activeKey="students" />

      <Modal
        open={isAddModalVisible}
        onCancel={onCloseAddModal}
        footer={null}
        title={<span style={{ color: '#fff' }}>Adicionar</span>}
        className="custom-bottom-modal"
        closeIcon={<span style={{color: '#fff'}}>X</span>}
      >
        <div className="add-drawer-content">
          <div className="add-option-btn" onClick={onAddStudent}>
            <TeamOutlined className="add-option-icon" />
            <div className="add-option-text">
              <Text className="add-option-title">Novo Aluno</Text>
              <Text className="add-option-desc">Cadastre um novo aluno</Text>
            </div>
            <RightOutlined className="add-option-arrow" />
          </div>
        </div>
      </Modal>
      
      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onCancel={onCloseDeleteModal}
        onConfirm={onConfirmDelete}
        title="Deseja excluir este cadastro?"
        message="Esta ação excluirá permanentemente o aluno do sistema."
      />
    </Layout>
  );
};

export default StudentsScreen;
