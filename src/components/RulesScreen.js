import React, { useEffect } from 'react';
import { Layout, Typography, Button, Segmented, Select, ConfigProvider, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './RulesScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;
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
  rules,
  onAdd,
  onEdit,
  onDelete,
  isModalVisible,
  editingRule,
  onSave,
  onCancel
}) => {
  const [form] = Form.useForm();

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

          <div className="rules-add-container">
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={onAdd}
              className="add-rule-btn"
            >
              Nova Regra
            </Button>
          </div>

          <div className="rules-list">
            {rules.map(rule => (
              <div className="rules-card" key={rule.id}>
                <div className="rules-card-header">
                  <Text className="rules-group">Grupo {rule.grupo}</Text>
                  <div className="rules-card-actions">
                    <Button type="text" icon={<EditOutlined style={{ color: '#004A8F' }} />} onClick={() => onEdit(rule)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(rule.id)} />
                  </div>
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
              <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                Nenhuma regra cadastrada para este curso nesta categoria.
              </div>
            )}
          </div>
        </div>
      </Content>

      <MainFooter activeKey="rules" />

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
      </ConfigProvider>
    </Layout>
  );
};

export default RulesScreen;
