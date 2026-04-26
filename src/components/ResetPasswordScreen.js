import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import logo from '../assets/imgs/logo-senac.png';
import './LoginScreen.css';

const { Title, Text } = Typography;

const ResetPasswordScreen = ({ onSubmit, onBackToLogin, isLoading }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Senac Logo" className="login-logo" />
        <Title level={2} className="login-title" style={{ textAlign: 'center' }}>Criar Nova Senha</Title>
      </div>

      <Form
        name="reset-password"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        className="login-form"
      >
        <Text style={{ color: '#fff', display: 'block', marginBottom: '24px', textAlign: 'center' }}>
          Digite sua nova senha abaixo.
        </Text>

        <Form.Item
          label={<span className="form-label">Nova Senha</span>}
          name="password"
          rules={[{ required: true, message: 'Por favor, insira a nova senha!' }]}
        >
          <Input.Password placeholder="Insira a nova senha" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Confirmar Senha</span>}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Por favor, confirme a nova senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirme a nova senha" className="login-input" />
        </Form.Item>

        <Form.Item style={{ marginTop: '32px' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-button" 
            block 
            loading={isLoading}
          >
            Salvar
          </Button>
        </Form.Item>

        <div className="auth-footer">
          <Text 
            onClick={onBackToLogin}
            className="auth-footer-link"
            style={{ fontWeight: 400 }}
          >
            Cancelar e voltar para o login
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordScreen;
