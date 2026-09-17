import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Building } from 'lucide-react';

const FundingRuleModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplier_name: '',
    value_range_min: '',
    value_range_max: '',
    due_date_range_min: '',
    due_date_range_max: '',
    is_active: true
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          supplier_name: initialData.supplier_name || '',
          value_range_min: initialData.value_range_min || '',
          value_range_max: initialData.value_range_max || '',
          due_date_range_min: initialData.due_date_range_min || '',
          due_date_range_max: initialData.due_date_range_max || '',
          is_active: initialData.is_active !== undefined ? initialData.is_active : true
        });
      } else {
        setFormData({
          supplier_name: '',
          value_range_min: '',
          value_range_max: '',
          due_date_range_min: '',
          due_date_range_max: '',
          is_active: true
        });
      }
    }
  }, [isOpen, initialData]);

  // Função utilitária para formatar como moeda BRL
  function formatCurrency(value) {
    if (value == null || value === '') return '';
    const num = Number(value);
    if (isNaN(num)) return '';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function parseCurrency(formatted) {
    const valueStr = String(formatted).replace(/[^\d]/g, '');
    if (valueStr === '') return '';
    const num = parseInt(valueStr, 10) / 100;
    return isNaN(num) ? '' : num;
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCurrencyChange = (field, value) => {
    const parsedValue = parseCurrency(value);
    setFormData(prev => ({
      ...prev,
      [field]: parsedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!formData.supplier_name.trim()) {
      alert('Por favor, informe o nome do fornecedor.');
      return;
    }

    if (!formData.value_range_min || !formData.value_range_max) {
      alert('Por favor, informe a faixa de valores.');
      return;
    }

    if (Number(formData.value_range_min) >= Number(formData.value_range_max)) {
      alert('O valor mínimo deve ser menor que o valor máximo.');
      return;
    }

    if (!formData.due_date_range_min || !formData.due_date_range_max) {
      alert('Por favor, informe a faixa de prazo de vencimento.');
      return;
    }

    if (Number(formData.due_date_range_min) > Number(formData.due_date_range_max)) {
      alert('O prazo mínimo deve ser menor ou igual ao prazo máximo.');
      return;
    }

    setLoading(true);
    try {
      await onSave({
        ...formData,
        value_range_min: Number(formData.value_range_min),
        value_range_max: Number(formData.value_range_max),
        due_date_range_min: Number(formData.due_date_range_min),
        due_date_range_max: Number(formData.due_date_range_max)
      });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {initialData ? 'Editar Regra de Funding' : 'Nova Regra de Funding'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Nome do Fornecedor
                </label>
                <input
                  type="text"
                  value={formData.supplier_name}
                  onChange={(e) => handleInputChange('supplier_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o nome do fornecedor"
                  required
                />
              </div>

              {/* Faixa de Valores */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Faixa de Valores
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Valor Mínimo</label>
                    <input
                      type="text"
                      value={formData.value_range_min ? formatCurrency(formData.value_range_min) : ''}
                      onChange={(e) => handleCurrencyChange('value_range_min', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="R$ 0,00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Valor Máximo</label>
                    <input
                      type="text"
                      value={formData.value_range_max ? formatCurrency(formData.value_range_max) : ''}
                      onChange={(e) => handleCurrencyChange('value_range_max', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="R$ 0,00"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Faixa de Prazo de Vencimento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Prazo de Vencimento (em dias)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Prazo Mínimo</label>
                    <input
                      type="number"
                      value={formData.due_date_range_min}
                      onChange={(e) => handleInputChange('due_date_range_min', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Prazo Máximo</label>
                    <input
                      type="number"
                      value={formData.due_date_range_max}
                      onChange={(e) => handleInputChange('due_date_range_max', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Regra ativa</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : (initialData ? 'Atualizar' : 'Criar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundingRuleModal; 