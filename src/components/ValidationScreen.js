import React from 'react';
import { Layout, Typography, Input, Button, Space } from 'antd';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import './ValidationScreen.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const ValidationScreen = () => {
  return (
    <Layout className="validation-layout">
      <MainHeader />

      <Content className="validation-content">
        <div className="content-inner">
          {/* Espaço para Imagem do Certificado */}
          <div className="certificate-placeholder" />

          {/* Seção Regras de Validação */}
          <div className="rules-section">
            <div className="rules-header">
              <Text className="rules-title">Regras de Validação</Text>
            </div>
            <div className="rules-body">
              <Text>Limite: 20h/semestre</Text>
            </div>
          </div>

          {/* Linhas de Informação */}
          <div className="info-row">
            <Text strong>Nome do Aluno</Text>
            <Text strong>João da Silva</Text>
          </div>

          <div className="info-row">
            <Text strong>Categoria</Text>
            <Text strong>Palestras e Eventos</Text>
          </div>

          <div className="info-row">
            <Text strong>Horas Solicitadas</Text>
            <Text strong>15 horas</Text>
          </div>

          {/* Campos do Formulário */}
          <div className="form-section">
            <div className="form-group">
              <Text strong className="form-label">Horas validadas*</Text>
              <Input placeholder="Digite as horas validadas" className="custom-input" />
            </div>

            <div className="form-group">
              <Text strong className="form-label">Justificativa</Text>
              <TextArea 
                placeholder="Digite a justificativa" 
                rows={4} 
                className="custom-textarea"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="action-buttons">
            <Button type="primary" className="btn-approve">
              Aprovar
            </Button>
            <Button className="btn-reject">
              Reprovar
            </Button>
          </div>
        </div>
      </Content>

      <MainFooter activeKey="validation" />
    </Layout>
  );
};

export default ValidationScreen;
