import React, { useState, useEffect } from 'react';
import { Layout, Typography, List, Button, Spin, Modal, Form, Input, ConfigProvider, FloatButton } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, EditOutlined, DeleteOutlined, RightOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import useAuth from '../hooks/useAuth';
import './CourseTurmasScreen.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const lightTheme = {
  token: {
    colorText: '#333333',
    colorTextHeading: '#000000',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.45)',
  },
  components: {
    Input: {
      colorBgContainer: '#ffffff',
      colorText: '#333333',
    },
    Button: {
      colorText: '#333333',
    }
  }
};

const CourseTurmasScreen = ({ 
  curso, 
  turmas, 
  loading, 
  onAddTurma, 
  onEditTurma, 
  onDeleteTurma 
}) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [editingTurma, setEditingTurma] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalVisible) {
      if (editingTurma) {
        form.setFieldsValue({ nome: editingTurma.nome });
      } else {
        form.resetFields();
      }
    }
  }, [modalVisible, editingTurma, form]);

  const handleOpenBottomModal = () => {
    setBottomModalVisible(true);
  };

  const handleCloseBottomModal = () => {
    setBottomModalVisible(false);
  };

  const handleAddClick = () => {
    setBottomModalVisible(false);
    setEditingTurma(null);
    setModalVisible(true);
  };

  const handleEditClick = (turma) => {
    setEditingTurma(turma);
    setModalVisible(true);
  };

  const handleModalSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingTurma) {
        onEditTurma(editingTurma.id, values.nome);
      } else {
        onAddTurma(values.nome);
      }
      setModalVisible(false);
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  return (
    <ConfigProvider theme={lightTheme}>
      <Layout className="turmas-layout">
        <MainHeader />
        <Content className="turmas-content">
          <div className="turmas-inner-content">
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/courses')}
              className="back-button"
            >
              Voltar para Cursos
            </Button>
            
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: '100px' }}><Spin size="large" /></div>
            ) : (
              <>
                <div className="turmas-header">
                  <Title level={4} className="turmas-title">
                    Turmas: {curso?.nome}
                  </Title>
                </div>
                
                <div className="turmas-card-list">
                  <List
                    itemLayout="horizontal"
                    dataSource={turmas}
                    locale={{ emptyText: 'Nenhuma turma cadastrada.' }}
                    renderItem={(turma) => (
                      <List.Item
                        className="turma-item"
                        actions={isAdmin ? [
                          <Button 
                            type="primary" 
                            ghost 
                            icon={<EditOutlined />} 
                            onClick={() => handleEditClick(turma)}
                            className="action-button edit-btn"
                          >
                            Editar
                          </Button>,
                          <Button 
                            type="primary" 
                            danger 
                            ghost 
                            icon={<DeleteOutlined />} 
                            onClick={() => onDeleteTurma(turma.id)}
                            className="action-button delete-btn"
                          >
                            Excluir
                          </Button>
                        ] : []}
                      >
                        <List.Item.Meta 
                          title={<span className="turma-name">{turma.nome}</span>} 
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </Content>
        
        {isAdmin && (
          <FloatButton
            className="add-float-button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleOpenBottomModal}
          />
        )}

        <MainFooter />
        
        <Modal
          open={bottomModalVisible}
          onCancel={handleCloseBottomModal}
          footer={null}
          title={<span style={{ color: '#fff' }}>Adicionar</span>}
          className="custom-bottom-modal"
          closeIcon={<span style={{color: '#fff'}}>X</span>}
          styles={{
            content: {
              backgroundColor: '#004587',
              borderRadius: '24px 24px 0 0',
              padding: '32px 24px',
              boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.3)'
            },
            body: {
              color: '#fff'
            }
          }}
        >

          <div className="add-drawer-content">
            <div className="add-option-btn" onClick={handleAddClick}>
              <BookOutlined className="add-option-icon" />
              <div className="add-option-text">
                <Text className="add-option-title" style={{ color: '#fff' }}>Nova Turma</Text>
                <Text className="add-option-desc" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Cadastre uma nova turma</Text>
              </div>
              <RightOutlined className="add-option-arrow" />
            </div>
          </div>
        </Modal>

        <Modal
          open={modalVisible}
          title={editingTurma ? "Editar Turma" : "Adicionar Turma"}
          onCancel={() => setModalVisible(false)}
          className="turma-modal"
          footer={[
            <Button key="back" onClick={() => setModalVisible(false)} className="modal-footer-btn cancel-btn">
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleModalSave} className="modal-footer-btn save-btn">
              Salvar
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: '20px' }}
          >
            <Form.Item
              name="nome"
              label="Nome da Turma"
              rules={[{ required: true, message: 'Por favor, insira o nome da turma!' }]}
            >
              <Input placeholder="Ex: Turma 101" />
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default CourseTurmasScreen;
