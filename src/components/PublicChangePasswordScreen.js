import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import logo from '../assets/imgs/logo-senac.png';
import './LoginScreen.css'; // Reutilizando os estilos de login

const { Title, Text } = Typography;

const PublicChangePasswordScreen = ({ onSubmit, onBack, isLoading }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Senac Logo" className="login-logo" />
        <Title level={1} className="login-title">Redefinir Senha</Title>
        <Text style={{ color: 'white', opacity: 0.8, marginBottom: 20, display: 'block' }}>
          Use sua senha provisória para definir uma nova senha.
        </Text>
      </div>

      <Form
        name="public-change-password"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        className="login-form"
        requiredMark={false}
      >
        <Form.Item
          label={<span className="form-label">E-mail de Usuário</span>}
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
        >
          <Input placeholder="Seu e-mail cadastrado" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Senha Provisória (ou Atual)</span>}
          name="senhaAntiga"
          rules={[{ required: true, message: 'Insira a senha recebida por e-mail' }]}
        >
          <Input.Password placeholder="Senha atual" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Nova Senha</span>}
          name="senhaNova"
          rules={[
            { required: true, message: 'Crie sua nova senha' },
            { min: 6, message: 'Mínimo de 6 caracteres' }
          ]}
        >
          <Input.Password placeholder="Mínimo 6 caracteres" className="login-input" />
        </Form.Item>

        <Form.Item
          label={<span className="form-label">Confirmar Nova Senha</span>}
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
          <Input.Password placeholder="Repita a nova senha" className="login-input" />
        </Form.Item>

        <div className="login-links" style={{ justifyContent: 'center' }}>
          <Text className="login-link" onClick={onBack}>Voltar para o Login</Text>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-button" 
            block 
            loading={isLoading}
          >
            Atualizar e Acessar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PublicChangePasswordScreen;
