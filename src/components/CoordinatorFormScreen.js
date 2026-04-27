import React from 'react';
import { Layout, Typography, Input, Select, Button, ConfigProvider } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './CourseFormScreen.css';

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

const CoordinatorFormScreen = ({ cursos, formData, onChange, onSave, onCancel }) => {
  return (
    <Layout className="form-layout">
      <MainHeader />
      
      <Content className="form-content">
        <div className="form-inner">
          
          <div className="form-group">
            <Text strong className="form-label">Nome Completo*</Text>
            <Input 
              placeholder="Insira o nome do coordenador" 
              className="custom-input" 
              value={formData?.nome}
              onChange={(e) => onChange('nome', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Email Institucional*</Text>
            <Input 
              placeholder="Insira o email institucional" 
              className="custom-input" 
              type="email" 
              value={formData?.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Vínculo com Curso</Text>
            <ConfigProvider theme={selectTheme}>
              <Select 
                placeholder="Selecione o curso a ser vinculado" 
                className="custom-select"
                value={formData?.cursoId}
                onChange={(value) => onChange('cursoId', value)}
              >
                {cursos && cursos.map(c => (
                  <Option key={c.id} value={c.id}>{c.nome}</Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>

          <div className="form-actions-bottom">
            <Button type="primary" className="btn-save-bottom" onClick={onSave}>
              Salvar
            </Button>
            <Button className="btn-cancel-bottom" onClick={onCancel} style={{ marginLeft: 16 }}>
              Cancelar
            </Button>
          </div>
          
        </div>
      </Content>

      <MainFooter activeKey="courses" />
    </Layout>
  );
};

export default CoordinatorFormScreen;
