import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import logo from '../assets/imgs/logo-senac.png';
import './LoginScreen.css'; // Reusing login styles

const { Title, Text } = Typography;

const ForgotPasswordScreen = ({ onSubmit, onBackToLogin }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Senac Logo" className="login-logo" />
        <Title level={2} className="login-title" style={{ textAlign: 'center' }}>Esqueci a Senha</Title>
      </div>

      <Form
        name="forgot-password"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        className="login-form"
      >
        <Text style={{ color: '#fff', display: 'block', marginBottom: '24px', textAlign: 'center' }}>
          Digite o e-mail cadastrado para receber o código de recuperação.
        </Text>

        <Form.Item
          label={<span className="form-label">E-mail</span>}
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira seu e-mail!' },
            { type: 'email', message: 'Por favor, insira um e-mail válido!' }
          ]}
        >
          <Input placeholder="Insira seu e-mail" className="login-input" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-button" 
            block 
          >
            Avançar
          </Button>
        </Form.Item>

        <div className="auth-footer">
          <Text className="auth-footer-text">Lembrou da senha? </Text>
          <Text 
            onClick={onBackToLogin}
            className="auth-footer-link"
          >
            Voltar para o login
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordScreen;
