import React from 'react';
import { Layout, Typography, Card, Form, Input, Button } from 'antd';
import { LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './ChangePasswordScreen.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ChangePasswordScreen = ({ onSubmit, onBack, isLoading }) => {
  return (
    <Layout className="change-pw-layout">
      <MainHeader />
      
      <Content className="change-pw-content">
        <div className="change-pw-inner">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
            className="back-btn"
          >
            Voltar
          </Button>

          <Card className="change-pw-card">
            <div className="change-pw-header">
              <div className="icon-wrapper">
                <LockOutlined className="lock-icon" />
              </div>
              <Title level={3} className="change-pw-title">Redefinir Senha</Title>
              <Text type="secondary" className="change-pw-subtitle">
                Para sua segurança, informe sua senha atual e escolha uma nova senha forte.
              </Text>
            </div>

            <Form
              layout="vertical"
              onFinish={onSubmit}
              requiredMark={false}
              className="change-pw-form"
            >
              <Form.Item
                label="Senha Atual"
                name="senhaAntiga"
                rules={[{ required: true, message: 'Por favor, informe sua senha atual' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />} 
                  placeholder="Sua senha atual"
                />
              </Form.Item>

              <Form.Item
                label="Nova Senha"
                name="senhaNova"
                rules={[
                  { required: true, message: 'Por favor, informe a nova senha' },
                  { min: 6, message: 'A senha deve ter pelo menos 6 caracteres' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />} 
                  placeholder="Mínimo 6 caracteres"
                />
              </Form.Item>

              <Form.Item
                label="Confirmar Nova Senha"
                name="confirmarSenha"
                dependencies={['senhaNova']}
                rules={[
                  { required: true, message: 'Confirme sua nova senha' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('senhaNova') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não coincidem'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />} 
                  placeholder="Repita a nova senha"
                />
              </Form.Item>

              <Form.Item className="submit-item">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={isLoading}
                  className="change-pw-btn"
                >
                  Atualizar Senha
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>

      <MainFooter />
    </Layout>
  );
};

export default ChangePasswordScreen;
