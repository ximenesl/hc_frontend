import React, { useState, useEffect } from 'react';
import { Layout, Typography, Input, Button, Spin, message, Empty } from 'antd';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import api from '../api/axiosConfig';
import './ValidationScreen.css';

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ValidationScreen = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex] = useState(0);
  const [horasValidadas, setHorasValidadas] = useState('');
  const [justificativa, setJustificativa] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleReset = async () => {
    try {
      setLoading(true);
      await api.post('/api/certificates/reset-tests');
      message.success('Todos os certificados foram resetados para PENDENTE!');
      await fetchCertificates();
    } catch (error) {
      console.error('Erro ao resetar certificados', error);
      message.error('Erro ao resetar certificados');
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/certificates');
      const pending = response.data.filter(c => c.status === 'PENDENTE');
      setCertificates(pending);
    } catch (error) {
      console.error('Erro ao buscar certificados', error);
      message.error('Erro ao carregar certificados pendentes');
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = async (status) => {
    if (!currentCert) return;

    if (status === 'APROVADO' && !horasValidadas) {
      message.warning('Por favor, insira as horas validadas para aprovar.');
      return;
    }

    try {
      await api.put(`/api/certificates/${currentCert.id}/status`, {
        status: status,
        justificativa: justificativa,
        horasValidadas: horasValidadas ? parseInt(horasValidadas, 10) : 0
      });
      message.success(`Certificado ${status.toLowerCase()} com sucesso!`);
      const newCertificates = [...certificates];
      newCertificates.splice(currentIndex, 1);
      setCertificates(newCertificates);
      setHorasValidadas('');
      setJustificativa('');
    } catch (error) {
      console.error('Erro ao atualizar certificado', error);
      message.error('Erro ao atualizar o certificado.');
    }
  };

  const currentCert = certificates[currentIndex];

  return (
    <Layout className="validation-layout">
      <MainHeader />

      <Content className="validation-content">
        <div className="content-inner">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          ) : !currentCert ? (
            <div style={{ padding: '50px 0' }}>
              <Empty description="Nenhum certificado pendente de validação." />
            </div>
          ) : (
            <>
              <div className="certificate-placeholder" style={{ height: '400px', padding: 0, background: '#f0f2f5' }}>
                {currentCert.arquivoUrl ? (
                  <object
                    data={`${API_BASE_URL}${currentCert.arquivoUrl}`}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  >
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <Text>Seu navegador não suporta visualização de PDF. <a href={`${API_BASE_URL}${currentCert.arquivoUrl}`} target="_blank" rel="noopener noreferrer">Clique aqui para baixar</a></Text>
                    </div>
                  </object>
                ) : (
                  <Text type="secondary">Nenhum arquivo disponível</Text>
                )}
              </div>

              <div className="rules-section">
                <div className="rules-header">
                  <Text className="rules-title">Regras de Validação</Text>
                </div>
                <div className="rules-body">
                  <Text>Limite: 20h/semestre (Exemplo)</Text>
                </div>
              </div>

              <div className="info-row">
                <Text strong>Nome do Aluno</Text>
                <Text strong>{currentCert.alunoNome || 'Não informado'}</Text>
              </div>

              <div className="info-row">
                <Text strong>Categoria / Regra</Text>
                <Text strong>{currentCert.regraDescricao || currentCert.nome}</Text>
              </div>

              <div className="info-row">
                <Text strong>Horas Solicitadas</Text>
                <Text strong>{currentCert.cargaHoraria} horas</Text>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <Text strong className="form-label">Horas validadas*</Text>
                  <Input
                    type="number"
                    placeholder="Digite as horas validadas"
                    className="custom-input"
                    value={horasValidadas}
                    onChange={(e) => setHorasValidadas(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <Text strong className="form-label">Justificativa</Text>
                  <TextArea
                    placeholder="Digite a justificativa"
                    rows={4}
                    className="custom-textarea"
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                  />
                </div>
              </div>

              <div className="action-buttons">
                <Button type="primary" className="btn-approve" onClick={() => handleValidation('APROVADO')}>
                  Aprovar
                </Button>
                <Button className="btn-reject" onClick={() => handleValidation('REJEITADO')}>
                  Reprovar
                </Button>
              </div>

              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button 
                  type="link" 
                  danger 
                  onClick={handleReset}
                  style={{ fontSize: 12, opacity: 0.7 }}
                >
                  [ RESETAR TODOS PARA TESTE ]
                </Button>
              </div>
            </>
          )}
        </div>
      </Content>

      <MainFooter activeKey="validation" />
    </Layout>
  );
};

export default ValidationScreen;
