import React from 'react';
import { Layout, Input, Typography, List, Card, Button, Modal, Form, Select, ConfigProvider, FloatButton, Switch } from 'antd';
import {
  SearchOutlined,
  MailOutlined,
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  UserOutlined,
  RightOutlined,
  PlusOutlined
} from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './CoordinatorsScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;

const formTheme = {
  token: {
    colorText: '#000000',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorTextPlaceholder: '#bfbfbf',
  },
  components: {
    Input: {
      colorText: '#000000',
      colorBgContainer: '#ffffff',
      colorTextPlaceholder: '#bfbfbf',
      controlHeight: 40,
    },
    Select: {
      colorText: '#000000',
      colorBgContainer: '#ffffff',
      colorTextPlaceholder: '#bfbfbf',
      controlHeight: 40,
    },
    Form: {
      labelColor: '#000000',
    }
  }
};

const CoordinatorsScreen = ({
  coordinators,
  cursos,
  onSearch,
  showInactive,
  onToggleInactive,
  onEdit,
  onActionClick,
  isDeleteModalVisible,
  onCloseDeleteModal,
  onConfirmAction,
  actionType,
  isEditModalVisible,
  onCloseEditModal,
  editForm,
  onSaveEdit,
  onAdd,
  isAddModalVisible,
  onCloseAddModal,
  onAddCoordinator
}) => {
  return (
    <Layout className="coordinators-layout">
      <MainHeader />

      <Content className="coordinators-content">
        <div className="coordinators-inner-content">

          <Title level={4} className="coordinators-page-title">Gestão de Coordenadores</Title>

          <Input
            className="coordinators-search-input"
            prefix={<span />}
            suffix={<SearchOutlined style={{ color: '#999', fontSize: 20 }} />}
            placeholder="Busque por nome ou email"
            onChange={(e) => onSearch(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <span style={{ marginRight: 8, color: '#333' }}>Mostrar Inativos</span>
            <Switch checked={showInactive} onChange={onToggleInactive} />
          </div>

          <List
            dataSource={coordinators}
            locale={{ emptyText: 'Nenhum coordenador encontrado.' }}
            renderItem={(coord) => (
              <Card className="coordinator-card" key={coord.id} style={{ opacity: coord.ativo === false ? 0.6 : 1 }}>
                <div className="coordinator-card-header">
                  <div className="coordinator-info">
                    <Text className="coordinator-name">{coord.nome} {coord.ativo === false && '(Inativo)'}</Text>
                    <Text className="coordinator-detail">
                      <MailOutlined /> {coord.email}
                    </Text>
                    <Text className="coordinator-detail">
                      <BookOutlined /> {coord.cursoNome || 'Sem vínculo'}
                    </Text>
                  </div>
                </div>

                <div className="coordinator-actions">
                  <Button
                    className="coord-edit-button"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(coord)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="coord-delete-button"
                    icon={coord.ativo === false ? <DeleteOutlined /> : <StopOutlined />}
                    danger={coord.ativo === false}
                    onClick={() => onActionClick(coord.id, coord.ativo === false ? 'delete' : 'inactivate')}
                    title={coord.ativo === false ? 'Excluir permanentemente' : 'Inativar'}
                  >
                    {coord.ativo === false ? 'Excluir' : 'Inativar'}
                  </Button>
                </div>
              </Card>
            )}
          />
        </div>
      </Content>

      <FloatButton
        className="add-float-button"
        icon={<PlusOutlined />}
        type="primary"
        onClick={onAdd}
      />
      <MainFooter activeKey="courses" />

      {/* Add Modal */}
      <Modal
        open={isAddModalVisible}
        onCancel={onCloseAddModal}
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
          <div className="add-option-btn" onClick={onAddCoordinator}>
            <UserOutlined className="add-option-icon" />
            <div className="add-option-text">
              <Text className="add-option-title" style={{ color: '#fff' }}>Novo Coordenador</Text>
              <Text className="add-option-desc" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Cadastre um novo coordenador</Text>
            </div>
            <RightOutlined className="add-option-arrow" />
          </div>
        </div>
      </Modal>

      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onCancel={onCloseDeleteModal}
        onConfirm={onConfirmAction}
        title={actionType === 'delete' ? "Deseja excluir este coordenador?" : "Deseja inativar este coordenador?"}
        message={actionType === 'delete' ? "Esta ação excluirá permanentemente o acesso do coordenador ao sistema." : "O coordenador não aparecerá nas listagens ativas."}
        confirmText={actionType === 'delete' ? "Excluir" : "Inativar"}
      />

      {/* Edit modal */}
      <ConfigProvider theme={formTheme}>
        <Modal
          open={isEditModalVisible}
          onCancel={onCloseEditModal}
          footer={null}
          title={<span style={{ color: '#000' }}>Editar Coordenador</span>}
          className="coord-edit-modal"
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={onSaveEdit}
          >
            <Form.Item
              name="nome"
              label="Nome Completo"
              rules={[{ required: true, message: 'Nome é obrigatório' }]}
            >
              <Input placeholder="Nome do coordenador" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email é obrigatório' },
                { type: 'email', message: 'Email inválido' }
              ]}
            >
              <Input placeholder="Email institucional" />
            </Form.Item>

            <Form.Item
              name="cursoIds"
              label="Cursos que Coordena"
            >
              <Select 
                mode="multiple" 
                placeholder="Selecione os cursos" 
                allowClear
              >
                {cursos && cursos.map(c => (
                  <Option key={c.id} value={c.id}>{c.nome}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button onClick={onCloseEditModal} style={{ marginRight: 8, color: '#000' }}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </Layout>
  );
};

export default CoordinatorsScreen;
