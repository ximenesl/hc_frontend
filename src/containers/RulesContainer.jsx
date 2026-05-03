import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { message } from 'antd';
import RulesScreen from '../components/RulesScreen';
import api from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';

const RulesContainer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isCoordenador, cursoIds } = useAuth();
  const [activeTab, setActiveTab] = useState('Ensino');
  const [dynamicTabs, setDynamicTabs] = useState(['Ensino', 'Pesquisa', 'Extensão']);
  const [showInactive, setShowInactive] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalityModalVisible, setIsModalityModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = useCallback(async () => {
    try {
      setLoading(true);
      const [rulesRes, tiposRes] = await Promise.all([
        api.get(`/api/regras/curso/${courseId}`),
        api.get(`/api/regras/curso/${courseId}/tipos`)
      ]);

      const formattedRules = rulesRes.data.map(r => ({
        id: r.id,
        courseId: r.courseId,
        type: r.type,
        grupo: r.grupo,
        descricao: r.descricao,
        aproveitamento: r.aproveitamento,
        requisito: r.requisito,
        ativo: r.ativo
      }));
      setRules(formattedRules);

      const defaultTabs = ['Ensino', 'Pesquisa', 'Extensão'];
      const backendTipos = tiposRes.data || [];
      setDynamicTabs([...new Set([...defaultTabs, ...backendTipos])]);

    } catch (error) {
      console.error('Erro ao buscar regras:', error);
      message.error('Erro ao carregar regras');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (isCoordenador && !cursoIds.includes(parseInt(courseId, 10))) {
      message.error('Você não tem permissão para acessar as regras deste curso');
      navigate('/courses');
      return;
    }
    if (courseId) {
      fetchRules();
    }
  }, [courseId, fetchRules, isCoordenador, cursoIds, navigate]);


  const filteredRules = rules.filter(r => {
    if (r.courseId.toString() !== courseId) return false;
    if (r.type !== activeTab) return false;
    if (showInactive) return r.ativo === false;
    return r.ativo !== false;
  });

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

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [ruleToActOn, setRuleToActOn] = useState(null);
  const [actionType, setActionType] = useState('inactivate');

  const handleActionClick = (id, type) => {
    setRuleToActOn(id);
    setActionType(type);
    setIsDeleteModalVisible(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === 'delete') {
        await api.delete(`/api/regras/${ruleToActOn}`);
        message.success('Regra excluída com sucesso!');
      } else {
        await api.put(`/api/regras/${ruleToActOn}/inativar`);
        message.success('Regra inativada com sucesso!');
      }
      setIsDeleteModalVisible(false);
      fetchRules();
    } catch (error) {
      console.error(error);
      const backendMessage = error.response?.data?.message;
      message.error(typeof backendMessage === 'string' ? backendMessage : `Erro ao ${actionType === 'delete' ? 'excluir' : 'inativar'} regra`);
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
      showInactive={showInactive}
      onToggleInactive={setShowInactive}
      rules={filteredRules}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onActionClick={handleActionClick}
      isDeleteModalVisible={isDeleteModalVisible}
      onCloseDeleteModal={() => setIsDeleteModalVisible(false)}
      onConfirmAction={confirmAction}
      actionType={actionType}
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
