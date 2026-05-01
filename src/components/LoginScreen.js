import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import logo from '../assets/imgs/logo-senac.png';
import './LoginScreen.css';

const { Title, Text } = Typography;

const LoginScreen = ({ onLogin, onShowRegister, onForgotPassword, onRedefinePassword, isLoading }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Senac Logo" className="login-logo" />
        <Title level={1} className="login-title">Entrar</Title>
      </div>

      <Form
        name="login"
        layout="vertical"
        onFinish={onLogin}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item
          label={<span className="form-label">Usuário</span>}
          name="username"
          rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
        >
          <Input placeholder="Insira seu usuário" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Senha</span>}
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Insira sua senha" className="login-input" />
        </Form.Item>

        <div className="login-links">
          <Text className="login-link" onClick={onForgotPassword}>Esqueceu a senha?</Text>
          <Text className="login-link" onClick={onRedefinePassword}>Redefinir Senha</Text>
        </div>


        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-button" 
            block 
            loading={isLoading}
          >
            Acessar
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default LoginScreen;
