import React from 'react';
import { Layout, Typography, Input, Select, Button } from 'antd';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import './CourseFormScreen.css';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const CourseFormScreen = ({ isEdit, onSave, onCancel }) => {
  return (
    <Layout className="form-layout">
      <MainHeader />
      
      <Content className="form-content">
        <div className="form-inner">
          
          <div className="form-group">
            <Text strong className="form-label">Nome do Curso</Text>
            <Input placeholder="Insira o nome do curso" className="custom-input" />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Sigla/Código</Text>
            <Input placeholder="Insira a sigla/código do curso" className="custom-input" />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Carga Horária Total</Text>
            <div className="hours-input-group">
              <Input placeholder="Insira as horas" className="custom-input hours-input" />
              <Text strong className="hours-text">horas</Text>
            </div>
          </div>

          <div className="form-group">
            <Text strong className="form-label">Categoria do Curso</Text>
            <Select 
              placeholder="Selecione a categoria do curso" 
              className="custom-select"
            >
              <Option value="graduacao">Graduação</Option>
              <Option value="pos">Pós-Graduação</Option>
              <Option value="extensao">Extensão</Option>
            </Select>
          </div>

          {isEdit && (
            <div className="form-group">
              <Text strong className="form-label">Coordenador</Text>
              <Select 
                placeholder="Selecione o coordenador" 
                className="custom-select"
                defaultValue="joao"
              >
                <Option value="joao">João Silva</Option>
                <Option value="maria">Maria Santos</Option>
              </Select>
            </div>
          )}

          <div className="form-actions-bottom">
            <Button type="primary" className="btn-save-bottom" onClick={onSave}>
              {isEdit ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </div>
          
        </div>
      </Content>

      <MainFooter activeKey="courses" />
    </Layout>
  );
};

export default CourseFormScreen;
