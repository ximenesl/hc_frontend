import React from 'react';
import { Form, Button, Typography, Input } from 'antd';
import logo from '../assets/imgs/logo-senac.png';
import './LoginScreen.css';

const { Title, Text } = Typography;

const CodeVerificationScreen = ({ onSubmit, onBackToLogin, isLoading }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Senac Logo" className="login-logo" />
        <Title level={2} className="login-title" style={{ textAlign: 'center' }}>Verificar Código</Title>
      </div>

      <Form
        name="verify-code"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        className="login-form"
      >
        <Text style={{ color: '#fff', display: 'block', marginBottom: '32px', textAlign: 'center' }}>
          Enviamos um código de 6 dígitos para o seu e-mail. Digite-o abaixo.
        </Text>

        <Form.Item
          name="otp"
          rules={[{ required: true, message: 'Por favor, insira o código!' }]}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
        >
          <Input.OTP length={6} size="large" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-button" 
            block 
            loading={isLoading}
          >
            Avançar
          </Button>
        </Form.Item>

        <div className="auth-footer">
          <Text className="auth-footer-text">Não recebeu o código? </Text>
          <Text 
            onClick={() => {}}
            className="auth-footer-link"
          >
            Reenviar
          </Text>
        </div>

        <div className="auth-footer" style={{ marginTop: '16px' }}>
          <Text 
            onClick={onBackToLogin}
            className="auth-footer-link"
            style={{ fontWeight: 400 }}
          >
            Voltar para o login
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default CodeVerificationScreen;
