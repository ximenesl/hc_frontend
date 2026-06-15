import React, { useState, useEffect } from 'react';
import { Layout, Typography, Input, Button, Spin, message, Space, List, Card, Select, ConfigProvider } from 'antd';
import { SolutionOutlined, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import api from '../api/axiosConfig';
import './ValidationScreen.css';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const selectTheme = {
  token: {
    colorText: '#000000',
    colorTextPlaceholder: '#bfbfbf',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorIcon: '#000000'
  }
};

const ValidationScreen = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [horasValidadas, setHorasValidadas] = useState('');
  const [justificativa, setJustificativa] = useState('');
  
  // Estados para fluxo de listagem e filtro
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleReset = async () => {
    try {
      setLoading(true);
      await api.post('/api/certificates/reset-tests');
      message.success('Todos os certificados foram resetados para PENDENTE!');
      setSelectedCert(null);
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
      const response = await api.get('/api/certificates', { params: { size: 1000 } });
      const certsList = response.data.content || response.data || [];
      const pending = certsList.filter(c => c.status === 'PENDENTE');
      setCertificates(pending);
    } catch (error) {
      console.error('Erro ao buscar certificados', error);
      message.error('Erro ao carregar certificados pendentes');
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = async (status) => {
    if (!selectedCert) return;

    if (status === 'APROVADO' && !horasValidadas) {
      message.warning('Por favor, insira as horas validadas para aprovar.');
      return;
    }

    try {
      await api.put(`/api/certificates/${selectedCert.id}/status`, {
        status: status,
        justificativa: justificativa,
        horasValidadas: horasValidadas ? parseInt(horasValidadas, 10) : 0
      });
      message.success(`Certificado ${status.toLowerCase()} com sucesso!`);
      
      // Remove o certificado validado do estado local
      const newCertificates = certificates.filter(c => c.id !== selectedCert.id);
      setCertificates(newCertificates);
      
      // Retorna para a tela de lista
      setSelectedCert(null);
      setHorasValidadas('');
      setJustificativa('');
    } catch (error) {
      console.error('Erro ao atualizar certificado', error);
      message.error('Erro ao atualizar o certificado.');
    }
  };

  // Coletar cursos únicos presentes na lista de certificados para filtrar
  const uniqueCourses = [];
  certificates.forEach(c => {
    if (c.cursoId && c.cursoNome && !uniqueCourses.some(item => item.id === c.cursoId)) {
      uniqueCourses.push({ id: c.cursoId, nome: c.cursoNome });
    }
  });

  // Filtragem local dos certificados
  const filteredCertificates = certificates.filter(c => {
    const term = searchText.toLowerCase();
    const matchSearch = (
      (c.alunoNome && c.alunoNome.toLowerCase().includes(term)) ||
      (c.nome && c.nome.toLowerCase().includes(term))
    );
    const matchCourse = selectedCourse ? c.cursoId === selectedCourse : true;
    return matchSearch && matchCourse;
  });

  return (
    <Layout className="validation-layout">
      <MainHeader />

      <Content className="validation-content">
        <div className="content-inner">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          ) : !selectedCert ? (
            /* Visualização 1: Listagem das Solicitações Pendentes */
            <>
              <Title level={4} className="validation-page-title">Validação de Horas</Title>

              <Input
                className="validation-search-input"
                prefix={<span />}
                suffix={<SearchOutlined className="search-icon" />}
                placeholder="Busque por nome do aluno ou certificado"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              {uniqueCourses.length > 1 && (
                <div className="validation-filter-section">
                  <Text className="filter-title" style={{ color: '#333333', fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>
                    Filtrar por Curso:
                  </Text>
                  <ConfigProvider theme={selectTheme}>
                    <Select
                      placeholder="Todos os Cursos"
                      value={selectedCourse}
                      onChange={setSelectedCourse}
                      style={{ width: '100%', marginBottom: '24px' }}
                      allowClear
                    >
                      {uniqueCourses.map(c => (
                        <Option key={c.id} value={c.id}>{c.nome}</Option>
                      ))}
                    </Select>
                  </ConfigProvider>
                </div>
              )}

              <List
                dataSource={filteredCertificates}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  hideOnSinglePage: true
                }}
                locale={{ emptyText: 'Nenhum certificado pendente de validação.' }}
                renderItem={(cert) => (
                  <Card className="validation-card" key={cert.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <Text className="validation-student-name">{cert.alunoNome || 'Não informado'}</Text>
                        <Text className="validation-detail-text">Atividade: {cert.nome || 'Certificado'}</Text>
                        <Text className="validation-detail-text">Curso: {cert.cursoNome || 'Não informado'}</Text>
                        <Text className="validation-detail-text">
                          Horas Solicitadas: <strong>{cert.cargaHoraria} horas</strong>
                        </Text>
                      </div>
                      <Button
                        type="primary"
                        onClick={() => {
                          setSelectedCert(cert);
                          setHorasValidadas('');
                          setJustificativa('');
                        }}
                        style={{ backgroundColor: '#F59120', borderColor: '#F59120', borderRadius: '8px', fontWeight: '600' }}
                      >
                        Validar
                      </Button>
                    </div>
                  </Card>
                )}
              />

              <div style={{ marginTop: 40, textAlign: 'center', padding: '20px', background: '#fff0f0', borderRadius: '8px', border: '1px dashed #ff4d4f' }}>
                <Text type="secondary" style={{ display: 'block', marginBottom: 10 }}>Área de Testes</Text>
                <Button 
                  danger 
                  onClick={handleReset}
                  style={{ fontWeight: 'bold' }}
                >
                  RESETAR TODOS OS CERTIFICADOS PARA PENDENTE
                </Button>
              </div>
            </>
          ) : (
            /* Visualização 2: Detalhe e Formulário de Validação de um Certificado */
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  onClick={() => setSelectedCert(null)}
                  style={{ color: '#000000', borderRadius: '8px' }}
                >
                  Voltar para a Lista
                </Button>
                <Text strong style={{ color: '#000000', fontSize: '15px' }}>
                  Validando: {selectedCert.alunoNome}
                </Text>
              </div>

              <div className="certificate-placeholder" style={{ height: '400px', padding: 0, background: '#f0f2f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
                {selectedCert.arquivoUrl ? (
                  <object
                    data={`${API_BASE_URL}${selectedCert.arquivoUrl}`}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '8px' }}
                  >
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <Space direction="vertical">
                        <Text strong style={{ color: '#333' }}>Visualização não disponível no navegador</Text>
                        <Button 
                          type="primary" 
                          style={{ backgroundColor: '#f57c00', borderColor: '#f57c00' }}
                          icon={<SolutionOutlined />} 
                          onClick={() => window.open(`${API_BASE_URL}${selectedCert.arquivoUrl}`, '_blank')}
                        >
                          Abrir Certificado em Nova Aba
                        </Button>
                      </Space>
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
                  <Text>{selectedCert.regraDescricao || 'Regra não informada'}</Text>
                </div>
              </div>

              <div className="info-row">
                <Text strong>Nome do Aluno</Text>
                <Text strong>{selectedCert.alunoNome || 'Não informado'}</Text>
              </div>

              <div className="info-row">
                <Text strong>Categoria / Regra</Text>
                <Text strong>{selectedCert.regraDescricao || selectedCert.nome}</Text>
              </div>

              <div className="info-row">
                <Text strong>Horas Solicitadas</Text>
                <Text strong>{selectedCert.cargaHoraria} horas</Text>
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
            </>
          )}
        </div>
      </Content>

      <MainFooter activeKey="validation" />
    </Layout>
  );
};

export default ValidationScreen;
