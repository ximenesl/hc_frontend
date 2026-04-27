import React, { useState, useEffect } from 'react';
import { Layout, Typography, List, Button, Spin, Modal, Form, Input } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

const { Content } = Layout;
const { Title } = Typography;

const CourseTurmasScreen = ({ 
  curso, 
  turmas, 
  loading, 
  onAddTurma, 
  onEditTurma, 
  onDeleteTurma 
}) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleAddClick = () => {
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
    <Layout className="courses-layout">
      <MainHeader />
      <Content className="courses-content" style={{ padding: '20px' }}>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/courses')}
          style={{ marginBottom: '20px', color: '#fff' }}
        >
          Voltar para Cursos
        </Button>
        
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Title level={4} style={{ margin: 0 }}>Turmas do Curso: {curso?.nome}</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
                Adicionar Turma
              </Button>
            </div>
            
            <List
              itemLayout="horizontal"
              dataSource={turmas}
              locale={{ emptyText: 'Nenhuma turma cadastrada para este curso.' }}
              renderItem={(turma) => (
                <List.Item
                  actions={[
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEditClick(turma)}>Editar</Button>,
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDeleteTurma(turma.id)}>Excluir</Button>
                  ]}
                >
                  <List.Item.Meta title={turma.nome} />
                </List.Item>
              )}
            />
          </div>
        )}
      </Content>
      <MainFooter />
      
      <Modal
        open={modalVisible}
        title={editingTurma ? "Editar Turma" : "Adicionar Turma"}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalSave}>
            Salvar
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
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
  );
};

export default CourseTurmasScreen;
