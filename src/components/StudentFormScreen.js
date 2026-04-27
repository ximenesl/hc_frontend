import React from 'react';
import { Layout, Typography, Input, Button, Select, ConfigProvider } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './StudentFormScreen.css';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const selectTheme = {
  token: {
    colorText: '#000000',
    colorTextPlaceholder: '#bfbfbf',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorIcon: '#000000'
  }
};

const StudentFormScreen = ({ cursos, formData, onChange, onSave, onCancel }) => {
  return (
    <Layout className="student-form-layout">
      <MainHeader />
      
      <Content className="student-form-content">
        <div className="student-form-inner">
          
          <div className="student-form-group">
            <Text strong className="student-form-label">Nome Completo</Text>
            <Input 
              placeholder="Insira o nome completo do aluno" 
              className="student-custom-input" 
              value={formData?.nome}
              onChange={(e) => onChange('nome', e.target.value)}
            />
          </div>

          <div className="student-form-group">
            <Text strong className="student-form-label">Email do Aluno</Text>
            <Input 
              placeholder="Insira o email do aluno" 
              className="student-custom-input" 
              value={formData?.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>

          <div className="student-form-group">
            <Text strong className="student-form-label">CPF</Text>
            <Input 
              placeholder="Insira o CPF" 
              className="student-custom-input" 
              value={formData?.cpf}
              onChange={(e) => onChange('cpf', e.target.value)}
            />
          </div>

          <div className="student-form-group">
            <Text strong className="student-form-label">Curso</Text>
            <ConfigProvider theme={selectTheme}>
              <Select 
                placeholder="Selecione o curso" 
                className="student-custom-select"
                value={formData?.cursoId}
                onChange={(value) => onChange('cursoId', value)}
              >
                {cursos && cursos.map(c => (
                  <Option key={c.id} value={c.id}>{c.nome}</Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>

          <div className="student-form-actions-bottom">
            <Button type="primary" className="student-btn-save-bottom" onClick={onSave}>
              Salvar
            </Button>
            <Button className="student-btn-cancel-bottom" onClick={onCancel} style={{ marginLeft: 16 }}>
              Cancelar
            </Button>
          </div>
          
        </div>
      </Content>

      <MainFooter activeKey="students" />
    </Layout>
  );
};

export default StudentFormScreen;
