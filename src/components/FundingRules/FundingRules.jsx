import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, DollarSign, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getGlobalCompanyId } from '../../lib/globalState';
import FundingRuleModal from './FundingRuleModal';
import { toast } from 'react-hot-toast';

const FundingRules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRule, setSelectedRule] = useState(null);

  useEffect(() => {
    loadRules();
  }, []);

  async function loadRules() {
    try {
      const { data, error } = await supabase
        .from('funding_rules')
        .select('*')
        .eq('company_id', getGlobalCompanyId())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error loading funding rules:', error);
      toast.error('Erro ao carregar regras de funding');
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      if (selectedRule) {
        // Update existing rule
        const { error } = await supabase
          .from('funding_rules')
          .update({
            supplier_name: formData.supplier_name,
            value_range_min: formData.value_range_min,
            value_range_max: formData.value_range_max,
            due_date_range_min: formData.due_date_range_min,
            due_date_range_max: formData.due_date_range_max,
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
            updated_by: (await supabase.auth.getUser()).data.user?.id
          })
          .eq('id', selectedRule.id);

        if (error) throw error;
        toast.success('Regra atualizada com sucesso!');
      } else {
        // Create new rule
        const { error } = await supabase
          .from('funding_rules')
          .insert([
            {
              supplier_name: formData.supplier_name,
              value_range_min: formData.value_range_min,
              value_range_max: formData.value_range_max,
              due_date_range_min: formData.due_date_range_min,
              due_date_range_max: formData.due_date_range_max,
              is_active: formData.is_active,
              company_id: getGlobalCompanyId(),
              created_by: (await supabase.auth.getUser()).data.user?.id
            }
          ]);

        if (error) throw error;
        toast.success('Regra criada com sucesso!');
      }
      await loadRules();
      setIsModalOpen(false);
      setSelectedRule(null);
    } catch (error) {
      console.error('Error saving funding rule:', error);
      toast.error('Erro ao salvar regra de funding');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ruleId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta regra?')) {
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('funding_rules')
        .delete()
        .eq('id', ruleId);

      if (error) throw error;
      await loadRules();
      toast.success('Regra excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting funding rule:', error);
      toast.error('Erro ao excluir regra de funding');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDateRange = (minDays, maxDays) => {
    if (minDays === maxDays) {
      return `${minDays} dias`;
    }
    return `${minDays} - ${maxDays} dias`;
  };

  return (
    <div className="h-full">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Gerenciamento de Regras de Funding</h2>
          <p className="text-gray-600 mt-2">
            Configure regras para automatizar o processo de funding baseado em fornecedores, valores e prazos.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Regras de Funding</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {rules.length} regra{rules.length !== 1 ? 's' : ''} cadastrada{rules.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button 
                onClick={() => {
                  setSelectedRule(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nova Regra
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-6 p-4 border-b border-gray-200 bg-gray-100">
                <div className="font-medium text-sm text-gray-700">Fornecedor</div>
                <div className="font-medium text-sm text-gray-700">Faixa de Valor</div>
                <div className="font-medium text-sm text-gray-700">Prazo de Vencimento</div>
                <div className="font-medium text-sm text-gray-700">Status</div>
                <div className="font-medium text-sm text-gray-700">Criado em</div>
                <div className="font-medium text-sm text-gray-700">Ações</div>
              </div>

              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    Carregando regras...
                  </div>
                ) : rules.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Nenhuma regra cadastrada</p>
                    <p className="text-gray-500">Comece criando sua primeira regra de funding.</p>
                  </div>
                ) : (
                  rules.map((rule) => (
                    <div key={rule.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-6 items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {rule.supplier_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(rule.value_range_min)} - {formatCurrency(rule.value_range_max)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDateRange(rule.due_date_range_min, rule.due_date_range_max)}
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rule.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {rule.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(rule.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(rule)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(rule.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FundingRuleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRule(null);
        }}
        onSave={handleSave}
        initialData={selectedRule}
      />
    </div>
  );
};

export default FundingRules; 