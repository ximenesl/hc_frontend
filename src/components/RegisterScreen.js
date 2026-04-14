import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import logo from '../assets/imgs/logo-senac.png';
import './LoginScreen.css'; // Reutilizando a base de estilos

const { Title, Text } = Typography;

const RegisterScreen = ({ onRegister, onBackToLogin, isLoading }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Senac Logo" className="login-logo" />
        <Title level={1} className="login-title">Criar Conta</Title>
      </div>

      <Form
        name="register"
        layout="vertical"
        onFinish={onRegister}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item
          label={<span className="form-label">E-mail</span>}
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira seu e-mail!' },
            { type: 'email', message: 'Insira um e-mail válido!' }
          ]}
        >
          <Input placeholder="seu@email.com" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Matrícula</span>}
          name="matricula"
          rules={[{ required: true, message: 'Por favor, insira sua matrícula!' }]}
        >
          <Input placeholder="Ex: 20230001" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Senha</span>}
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Crie uma senha forte" className="login-input" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-button" 
            block 
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </Form.Item>

        <div className="auth-footer">
          <Text className="auth-footer-text">Já tem uma conta? </Text>
          <Text 
            onClick={onBackToLogin}
            className="auth-footer-link"
          >
            Entrar
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default RegisterScreen;
