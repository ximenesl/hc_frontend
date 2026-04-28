import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import RulesScreen from '../components/RulesScreen';
import api from '../api/axiosConfig';

const RulesContainer = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('Ensino');
  const [dynamicTabs, setDynamicTabs] = useState(['Ensino', 'Pesquisa', 'Extensão']);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalityModalVisible, setIsModalityModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/regras/curso/${courseId}`);

      const formattedRules = response.data.map(r => ({
        id: r.id,
        courseId: r.courseId,
        type: r.type, // Ensino, Pesquisa, Extensão
        grupo: r.grupo,
        descricao: r.descricao,
        aproveitamento: r.aproveitamento,
        requisito: r.requisito
      }));
      setRules(formattedRules);

      const fetchedTypes = [...new Set(formattedRules.map(r => r.type))].filter(Boolean);
      setDynamicTabs(prev => [...new Set([...prev, ...fetchedTypes])]);

    } catch (error) {
      console.error('Erro ao buscar regras:', error);
      message.error('Erro ao carregar regras');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      fetchRules();
    }
  }, [courseId, fetchRules]);

  // Converter courseId useParams (string) para número para comparar com r.courseId (number)
  const filteredRules = rules.filter(r => r.courseId.toString() === courseId && r.type === activeTab);

  const handleAdd = () => {
    setEditingRule(null);
    setIsModalVisible(true);
  };

  const handleEdit = (rule) => {
    let horas = '';
    let unidade = rule.aproveitamento;

    const match = rule.aproveitamento.match(/^(\d+)\s*h?\s*(.*)$/i);
    if (match) {
      horas = match[1];
      unidade = match[2];
    }

    setEditingRule({
      ...rule,
      aproveitamentoHoras: horas,
      aproveitamentoUnidade: unidade
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/regras/${id}`);
      message.success('Regra deletada com sucesso!');
      fetchRules();
    } catch (error) {
      console.error(error);
      message.error('Erro ao deletar regra');
    }
  };

  const handleSave = async (values) => {
    const combinedAproveitamento = `${values.aproveitamentoHoras}h ${values.aproveitamentoUnidade}`;
    const payload = {
      cursoId: parseInt(courseId, 10),
      tipo: activeTab,
      grupo: values.grupo,
      descricao: values.descricao,
      requisito: values.requisito,
      aproveitamento: combinedAproveitamento
    };

    try {
      if (editingRule) {
        await api.put(`/api/regras/${editingRule.id}`, payload);
        message.success('Regra atualizada com sucesso!');
      } else {
        await api.post('/api/regras', payload);
        message.success('Regra criada com sucesso!');
      }
      setIsModalVisible(false);
      fetchRules();
    } catch (error) {
      console.error(error);
      message.error('Erro ao salvar regra');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRule(null);
  };

  const handleAddModality = (newModality) => {
    if (!dynamicTabs.includes(newModality)) {
      setDynamicTabs(prev => [...prev, newModality]);
    }
    setActiveTab(newModality);
    setIsModalityModalVisible(false);
  };

  return (
    <RulesScreen
      tabs={dynamicTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      rules={filteredRules}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isModalVisible={isModalVisible}
      editingRule={editingRule}
      onSave={handleSave}
      onCancel={handleCancel}
      loading={loading}
      isModalityModalVisible={isModalityModalVisible}
      onOpenModalityModal={() => setIsModalityModalVisible(true)}
      onCloseModalityModal={() => setIsModalityModalVisible(false)}
      onSaveModality={handleAddModality}
    />
  );
};

export default RulesContainer;
