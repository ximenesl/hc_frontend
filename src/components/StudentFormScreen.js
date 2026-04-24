import React from 'react';
import { Layout, Typography, Input, Button } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './StudentFormScreen.css';

const { Content } = Layout;
const { Text } = Typography;

const StudentFormScreen = ({ onSave }) => {
  return (
    <Layout className="student-form-layout">
      <MainHeader />
      
      <Content className="student-form-content">
        <div className="student-form-inner">
          
          <div className="student-form-group">
            <Text strong className="student-form-label">Nome Completo</Text>
            <Input placeholder="Insira o nome completo do aluno" className="student-custom-input" />
          </div>

          <div className="student-form-group">
            <Text strong className="student-form-label">Email do Aluno</Text>
            <Input placeholder="Insira o email do aluno" className="student-custom-input" />
          </div>

          <div className="student-form-group">
            <Text strong className="student-form-label">CPF</Text>
            <Input placeholder="Insira o CPF" className="student-custom-input" />
          </div>

          <div className="student-form-actions-bottom">
            <Button type="primary" className="student-btn-save-bottom" onClick={onSave}>
              Salvar
            </Button>
          </div>
          
        </div>
      </Content>

      <MainFooter activeKey="students" />
    </Layout>
  );
};

export default StudentFormScreen;
