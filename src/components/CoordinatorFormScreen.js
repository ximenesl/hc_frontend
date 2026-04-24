import React from 'react';
import { Layout, Typography, Input, Select, Button, ConfigProvider } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './CourseFormScreen.css'; /* Reusing the same layout css */

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

const CoordinatorFormScreen = ({ onSave, onCancel }) => {
  return (
    <Layout className="form-layout">
      <MainHeader />
      
      <Content className="form-content">
        <div className="form-inner">
          
          <div className="form-group">
            <Text strong className="form-label">Nome Completo*</Text>
            <Input placeholder="Insira o nome do coordenador" className="custom-input" />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Email Institucional*</Text>
            <Input placeholder="Insira o email institucional" className="custom-input" type="email" />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Vínculo com Curso</Text>
            <ConfigProvider theme={selectTheme}>
              <Select 
                placeholder="Selecione o curso a ser vinculado" 
                className="custom-select"
              >
                <Option value="curso1">Análise e Desenvolvimento de Sistemas</Option>
                <Option value="curso2">Jogos Digitais</Option>
              </Select>
            </ConfigProvider>
          </div>

          <div className="form-actions-bottom">
            <Button type="primary" className="btn-save-bottom" onClick={onSave}>
              Salvar
            </Button>
          </div>
          
        </div>
      </Content>

      <MainFooter activeKey="courses" />
    </Layout>
  );
};

export default CoordinatorFormScreen;
