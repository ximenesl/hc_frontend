import React from 'react';
import { Layout, Typography, Progress, Collapse, Button, Modal, Form, Select, Upload, ConfigProvider, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './StudentDashboardScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Panel } = Collapse;
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

const StudentDashboardScreen = ({
  student,
  totalApprovedHours,
  groupedProgress,
  studentRules,
  isModalVisible,
  setIsModalVisible,
  selectedCategoria,
  setSelectedCategoria,
  onSubmitCertificate
}) => {
  const [form] = Form.useForm();
  const percentComplete = Math.round((totalApprovedHours / student.horasTotaisNecessarias) * 100) || 0;

  const handleOpenModal = () => {
    form.resetFields();
    setSelectedCategoria(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (values) => {
    if (!values.file || values.file.fileList.length === 0) {
      message.error("Por favor, anexe o comprovante.");
      return;
    }
    onSubmitCertificate(values);
    message.success("Certificado enviado com sucesso! Aguardando aprovação.");
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const availableModalities = studentRules.filter(r => r.type === selectedCategoria);

  return (
    <Layout className="student-dashboard-layout">
      <MainHeader />
      <Content className="student-dashboard-content">
        <div className="student-dashboard-inner">
          
          <div className="dashboard-header">
            <Title level={4} style={{ color: '#fff', margin: 0 }}>Olá, {student.nome}</Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Acompanhe suas horas complementares</Text>
          </div>

          <div className="progress-card">
            <Progress 
              type="dashboard" 
              percent={percentComplete} 
              strokeColor="#F59120"
              trailColor="#e8e8e8"
              format={(percent) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#004A8F', fontSize: '24px', fontWeight: 'bold' }}>{totalApprovedHours}h</span>
                  <span style={{ color: '#666', fontSize: '12px' }}>de {student.horasTotaisNecessarias}h</span>
                </div>
              )}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleOpenModal}
              className="submit-cert-btn"
            >
              Enviar Certificado
            </Button>
          </div>

          <Title level={5} style={{ color: '#fff', marginTop: '24px', marginBottom: '16px' }}>
            Progresso por Modalidade
          </Title>

          <Collapse className="custom-collapse" defaultActiveKey={['Ensino', 'Pesquisa', 'Extensão']}>
            {groupedProgress.map((group) => (
              <Panel 
                header={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Text strong style={{ color: '#004A8F' }}>{group.category}</Text>
                    <Text style={{ color: '#F59120', fontWeight: 'bold' }}>{group.approvedHours}h</Text>
                  </div>
                } 
                key={group.category}
              >
                {group.rules.map(rule => (
                  <div key={rule.id} className="rule-progress-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <Text style={{ fontSize: '13px', color: '#333' }}>{rule.descricao}</Text>
                      <Text style={{ fontSize: '13px', fontWeight: '600' }}>
                        {rule.approvedHours} / {rule.limit}h
                      </Text>
                    </div>
                    <Progress 
                      percent={Math.round((rule.approvedHours / rule.limit) * 100)} 
                      showInfo={false} 
                      strokeColor={rule.approvedHours >= rule.limit ? "#52c41a" : "#004A8F"}
                      size="small"
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, paddingRight: '8px' }}>
                        {rule.sentHours > rule.limit && (
                          <Text style={{ fontSize: '11px', color: '#faad14' }}>
                            *Você enviou {rule.sentHours}h, mas o limite desta modalidade é {rule.limit}h.
                          </Text>
                        )}
                      </div>
                      <Text style={{ fontSize: '12px', color: '#999', whiteSpace: 'nowrap' }}>
                        Limite: {rule.limit}h
                      </Text>
                    </div>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>

        </div>
      </Content>
      <MainFooter activeKey="home" />

      <ConfigProvider theme={formTheme}>
        <Modal
          title={<span style={{ color: '#000' }}>Enviar Novo Certificado</span>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              name="categoria"
              label="Categoria"
              rules={[{ required: true, message: 'Selecione a categoria' }]}
            >
              <Select 
                placeholder="Selecione..." 
                onChange={(val) => {
                  setSelectedCategoria(val);
                  form.setFieldsValue({ ruleId: undefined });
                }}
              >
                <Option value="Ensino">Ensino</Option>
                <Option value="Pesquisa">Pesquisa</Option>
                <Option value="Extensão">Extensão</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="ruleId"
              label="Atividade / Modalidade"
              rules={[{ required: true, message: 'Selecione a atividade' }]}
            >
              <Select placeholder="Selecione..." disabled={!selectedCategoria}>
                {availableModalities.map(r => (
                  <Option key={r.id} value={r.id}>{r.descricao}</Option>
                ))}
              </Select>
            </Form.Item>



            <Form.Item
              name="file"
              label="Anexo (Foto ou PDF)"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'O anexo é obrigatório' }]}
            >
              <Upload name="logo" action="/upload.do" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Clique para anexar arquivo</Button>
              </Upload>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button onClick={handleCancel} style={{ marginRight: 8, color: '#000' }}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Enviar para Aprovação
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </Layout>
  );
};

export default StudentDashboardScreen;
