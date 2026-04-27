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

const CourseFormScreen = ({ isEdit, formData, onChange, onSave, onCancel }) => {
  return (
    <Layout className="form-layout">
      <MainHeader />
      
      <Content className="form-content">
        <div className="form-inner">
          
          <div className="form-group">
            <Text strong className="form-label">Nome do Curso</Text>
            <Input 
              placeholder="Insira o nome do curso" 
              className="custom-input" 
              value={formData?.nome}
              onChange={(e) => onChange('nome', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Sigla/Código</Text>
            <Input 
              placeholder="Insira a sigla/código do curso" 
              className="custom-input" 
              value={formData?.sigla}
              onChange={(e) => onChange('sigla', e.target.value)}
            />
          </div>

          <div className="form-group">
            <Text strong className="form-label">Carga Horária Total</Text>
            <div className="hours-input-group">
              <Input 
                placeholder="Insira as horas" 
                className="custom-input hours-input" 
                value={formData?.cargaHoraria}
                onChange={(e) => onChange('cargaHoraria', e.target.value)}
              />
              <Text strong className="hours-text">horas</Text>
            </div>
          </div>

          <div className="form-group">
            <Text strong className="form-label">Categoria do Curso</Text>
            <ConfigProvider theme={selectTheme}>
              <Select 
                placeholder="Selecione a categoria do curso" 
                className="custom-select"
                value={formData?.categoria || undefined}
                onChange={(value) => onChange('categoria', value)}
              >
                <Option value="graduacao">Graduação</Option>
                <Option value="pos">Pós-Graduação</Option>
                <Option value="extensao">Extensão</Option>
              </Select>
            </ConfigProvider>
          </div>

          {isEdit && (
            <div className="form-group">
              <Text strong className="form-label">Coordenador</Text>
              <ConfigProvider theme={selectTheme}>
                <Select 
                  placeholder="Selecione o coordenador" 
                  className="custom-select"
                >
                  <Option value="joao">João Silva</Option>
                  <Option value="maria">Maria Santos</Option>
                </Select>
              </ConfigProvider>
            </div>
          )}

          <div className="form-actions-bottom">
            <Button type="primary" className="btn-save-bottom" onClick={onSave}>
              {isEdit ? 'Salvar Alterações' : 'Salvar'}
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

export default CourseFormScreen;
