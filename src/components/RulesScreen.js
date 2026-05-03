import React, { useEffect } from 'react';
import { Layout, Typography, Button, Segmented, Select, ConfigProvider, Modal, Form, Input, FloatButton, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, RightOutlined, FileTextOutlined, AppstoreAddOutlined, StopOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import useAuth from '../hooks/useAuth';
import './RulesScreen.css';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const modalTheme = {
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
      activeBorderColor: '#1677ff',
      hoverBorderColor: '#1677ff',
      colorTextPlaceholder: '#bfbfbf',
      controlHeight: 48,
    },
    Select: {
      colorText: '#000000',
      colorBgContainer: '#ffffff',
      colorTextPlaceholder: '#bfbfbf',
      controlHeight: 48,
    },
    Form: {
      labelColor: '#000000',
    }
  }
};

const RulesScreen = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  showInactive,
  onToggleInactive,
  rules,
  onAdd,
  onEdit,
  onActionClick,
  isDeleteModalVisible,
  onCloseDeleteModal,
  onConfirmAction,
  actionType,
  isModalVisible,
  editingRule,
  onSave,
  onCancel,
  isModalityModalVisible,
  onOpenModalityModal,
  onCloseModalityModal,
  onSaveModality
}) => {
  const { isAdmin } = useAuth();
  const [form] = Form.useForm();
  const [modalityForm] = Form.useForm();
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);

  useEffect(() => {
    if (isModalVisible) {
      if (editingRule) {
        form.setFieldsValue(editingRule);
      } else {
        form.resetFields();
      }
    }
  }, [isModalVisible, editingRule, form]);

  const handleFinish = (values) => {
    onSave(values);
  };

  const handleFinishModality = (values) => {
    onSaveModality(values.modalityName);
    modalityForm.resetFields();
  };

  const handleOpenAddOptions = () => setBottomModalVisible(true);
  const handleCloseAddOptions = () => setBottomModalVisible(false);

  const handleOptionRegra = () => {
    setBottomModalVisible(false);
    onAdd();
  };

  const handleOptionModalidade = () => {
    setBottomModalVisible(false);
    onOpenModalityModal();
  };

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

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <span style={{ marginRight: 8, color: '#666' }}>Mostrar Inativos</span>
            <Switch checked={showInactive} onChange={onToggleInactive} />
          </div>

          <div className="rules-list">
            {rules.map(rule => (
              <div className="rules-card" key={rule.id} style={{ opacity: rule.ativo === false ? 0.6 : 1 }}>
                <div className="rules-card-header">
                  <Text className="rules-group">Grupo {rule.grupo} {rule.ativo === false && '(Inativo)'}</Text>
                  {isAdmin && (
                    <div className="rules-card-actions">
                      <Button type="text" icon={<EditOutlined style={{ color: '#004A8F' }} />} onClick={() => onEdit(rule)} />
                      <Button 
                        type="text" 
                        danger={rule.ativo === false} 
                        icon={rule.ativo === false ? <DeleteOutlined /> : <StopOutlined style={{ color: '#F59120' }} />} 
                        onClick={() => onActionClick(rule.id, rule.ativo === false ? 'delete' : 'inactivate')}
                        title={rule.ativo === false ? 'Excluir permanentemente' : 'Inativar'}
                      />
                    </div>
                  )}
                </div>
                
                <div className="rules-info">
                  <Text className="rules-title">{rule.descricao}</Text>
                  
                  <div className="rules-detail-row">
                    <Text strong style={{ color: '#333' }}>Aproveitamento:</Text>
                    <Text style={{ color: '#666' }}>{rule.aproveitamento}</Text>
                  </div>
                  
                  <div className="rules-detail-row">
                    <Text strong style={{ color: '#333' }}>Requisito:</Text>
                    <Text style={{ color: '#666' }}>{rule.requisito}</Text>
                  </div>
                </div>
              </div>
            ))}
            {rules.length === 0 && (
              <div className="empty-rules-container">
                <AppstoreAddOutlined className="empty-rules-icon" />
                <Text className="empty-rules-text">Nenhuma regra cadastrada para este curso nesta categoria.</Text>
                {isAdmin && <Text className="empty-rules-subtext">Clique no botão + abaixo para começar a adicionar as regras de validação.</Text>}
              </div>
            )}
          </div>

        </div>
      </Content>

      {isAdmin && (
        <FloatButton
          className="add-float-button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleOpenAddOptions}
        />
      )}

      <MainFooter activeKey="rules" />

      <Modal
        open={bottomModalVisible}
        onCancel={handleCloseAddOptions}
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
          <div className="add-option-btn" onClick={handleOptionRegra}>
            <FileTextOutlined className="add-option-icon" />
            <div className="add-option-text">
              <Text className="add-option-title" style={{ color: '#fff' }}>Nova Regra</Text>
              <Text className="add-option-desc" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Cadastre uma nova regra para o curso</Text>
            </div>
            <RightOutlined className="add-option-arrow" />
          </div>
          <div className="add-option-btn" onClick={handleOptionModalidade}>
            <AppstoreAddOutlined className="add-option-icon" />
            <div className="add-option-text">
              <Text className="add-option-title" style={{ color: '#fff' }}>Nova Modalidade</Text>
              <Text className="add-option-desc" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Adicione uma categoria de atividade</Text>
            </div>
            <RightOutlined className="add-option-arrow" />
          </div>
        </div>
      </Modal>

      <ConfigProvider theme={modalTheme}>
        <Modal
          title={<span style={{ color: '#000' }}>{editingRule ? "Editar Regra" : "Nova Regra"}</span>}
          open={isModalVisible}
          onCancel={onCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              name="grupo"
              label="Grupo (ex: 1.1)"
              rules={[{ required: true, message: 'Por favor, insira o grupo' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="descricao"
              label="Descrição da Atividade"
              rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Aproveitamento Máximo" required style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Form.Item
                  name="aproveitamentoHoras"
                  rules={[{ required: true, message: 'Insira a quantidade' }]}
                  style={{ flex: 1, marginBottom: 16 }}
                >
                  <Input type="number" placeholder="Ex: 20" suffix="h" />
                </Form.Item>
                <Form.Item
                  name="aproveitamentoUnidade"
                  rules={[{ required: true, message: 'Selecione a unidade' }]}
                  style={{ flex: 2, marginBottom: 16 }}
                >
                  <Select placeholder="Unidade" allowClear mode="tags" maxCount={1}>
                    <Option value="por semestre">por semestre</Option>
                    <Option value="por disciplina">por disciplina</Option>
                    <Option value="por participação">por participação</Option>
                    <Option value="por produto final">por produto final</Option>
                    <Option value="por bolsa">por bolsa</Option>
                    <Option value="por visita">por visita</Option>
                    <Option value="por material">por material</Option>
                    <Option value="pela apresentação">pela apresentação</Option>
                    <Option value="por curso">por curso</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form.Item>

            <Form.Item
              name="requisito"
              label="Requisito / Comprovante"
              rules={[{ required: true, message: 'Por favor, insira o requisito' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button onClick={onCancel} style={{ marginRight: 8, color: '#000' }}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={<span style={{ color: '#000' }}>Nova Modalidade</span>}
          open={isModalityModalVisible}
          onCancel={onCloseModalityModal}
          footer={null}
        >
          <Form
            form={modalityForm}
            layout="vertical"
            onFinish={handleFinishModality}
          >
            <Form.Item
              name="modalityName"
              label="Nome da Modalidade"
              rules={[{ required: true, message: 'Por favor, insira o nome' }]}
            >
              <Input placeholder="Ex: Extensão, Ensino, Pesquisa, etc." />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button onClick={onCloseModalityModal} style={{ marginRight: 8, color: '#000' }}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Adicionar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onCancel={onCloseDeleteModal}
        onConfirm={onConfirmAction}
        title={actionType === 'delete' ? "Deseja excluir esta regra?" : "Deseja inativar esta regra?"}
        message={actionType === 'delete' ? "Esta ação excluirá permanentemente a regra do sistema." : "A regra não aparecerá nas listagens ativas."}
        confirmText={actionType === 'delete' ? "Excluir" : "Inativar"}
      />
    </Layout>
  );
};

export default RulesScreen;
