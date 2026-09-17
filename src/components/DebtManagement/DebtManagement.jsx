import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Plus,
  Download, 
  CaretDown,
  Eye,
  Bank,
  Calendar, 
  CurrencyCircleDollar,
  CheckCircle,
  XCircle,
  Printer,
  Copy,
  FileText,
  Gear,
  CreditCard,
  QrCode,
  ArrowsLeftRight
} from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
  
  p {
    font-size: 16px;
    color: var(--secondary-text);
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  overflow: hidden;
`;

const FilterHeader = styled.div`
  padding: 16px 24px;
  background: #F8F9FA;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  .left {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0;
    }
  }

  .icon {
    transition: transform 0.3s ease;
    
    &.open {
      transform: rotate(180deg);
    }
  }
`;

const FilterContent = styled.div`
  padding: 24px;
  background: #F8F9FA;
  
  .filters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .filter-group {
    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text);
      margin-bottom: 4px;
    }

    select,
    input {
      width: 100%;
      height: 40px;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 0 12px;
      font-size: 14px;
      color: var(--primary-text);
      
      &:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  
  input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    background: white;
    height: 40px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
      color: var(--secondary-text);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary-text);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 40px;
    
    &.primary {
      background: var(--primary-blue);
      color: white;
      border: none;
      
      &:hover {
        background: #2563eb;
      }
    }
    
    &.secondary {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);
      
      &:hover {
        background: var(--background);
      }
    }
  }
`;

const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text);
    }
    
    .table-info {
      color: var(--secondary-text);
      font-size: 14px;
    }
  }

  .table-responsive {
    overflow-x: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    scrollbar-width: thin; /* For Firefox */
    
    /* Custom scrollbar for webkit browsers */
    &::-webkit-scrollbar {
      height: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 4px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* Ensure minimum width for table */
  
  th {
    background: var(--background);
    padding: 12px 16px;
    font-weight: 600;
    font-size: 14px;
    color: var(--secondary-text);
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
    
    &:first-child {
      border-top-left-radius: 8px;
      text-align: left;
      padding-left: 20px;
    }
    
    &:last-child {
      border-top-right-radius: 8px;
      text-align: center;
      padding-right: 20px;
    }
  }
  
  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--primary-text);
    vertical-align: middle;
    
    &:first-child {
      padding-left: 20px;
    }
    
    &:last-child {
      padding-right: 20px;
    }
    
    &.status {
      width: 140px;
      
      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;
        
        &.pago {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.pendente {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }
        
        &.vencido {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }
    
    &.highlight {
      font-weight: 600;
      
      .yes {
        color: #22c55e;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .no {
        color: #ef4444;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
    
    &.actions {
      text-align: center;
      width: 60px;
      
      button {
        background: none;
        border: none;
        color: var(--primary-blue);
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
        
        &:hover {
          color: #2563eb;
          background: rgba(59, 130, 246, 0.1);
        }
      }
    }
  }
  
  tbody tr:hover {
    background: var(--background);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: var(--secondary-text);
  
  .icon {
    margin-bottom: 16px;
    color: var(--secondary-text);
  }
  
  h4 {
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--primary-text);
  }
  
  p {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

// Mock data
const mockBoletos = [
  {
    id: 1,
    numero: '12345678',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-01',
    dataVencimento: '2024-11-15',
    valor: 51935.65,
    status: 'pendente',
    descontado: true,
    novoDomicilio: true
  },
  {
    id: 2,
    numero: '12345679',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-02',
    dataVencimento: '2024-11-20',
    valor: 45432.32,
    status: 'pendente',
    descontado: true,
    novoDomicilio: true
  },
  {
    id: 3,
    numero: '12345680',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-03',
    dataVencimento: '2024-11-25',
    valor: 32797.48,
    status: 'pendente',
    descontado: false,
    novoDomicilio: false
  },
  {
    id: 4,
    numero: '12345681',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-04',
    dataVencimento: '2024-11-30',
    valor: 27259.38,
    status: 'pendente',
    descontado: true,
    novoDomicilio: false
  },
  {
    id: 5,
    numero: '12345682',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-05',
    dataVencimento: '2024-12-05',
    valor: 20165.83,
    status: 'pendente',
    descontado: false,
    novoDomicilio: false
  },
  {
    id: 6,
    numero: '12345683',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-06',
    dataVencimento: '2024-12-10',
    valor: 16291.70,
    status: 'pendente',
    descontado: true,
    novoDomicilio: true
  },
  {
    id: 7,
    numero: '12345684',
    sacado: 'Raia Drogasil S.A.',
    cnpj: '12.345.678/0001-00',
    dataEmissao: '2024-10-07',
    dataVencimento: '2024-12-15',
    valor: 14202.22,
    status: 'pendente',
    descontado: false,
    novoDomicilio: false
  },
];

const DebtManagement = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewInstructionModal, setShowNewInstructionModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [showRegrasCobrancaModal, setShowRegrasCobrancaModal] = useState(false);
  const [selectedBoleto, setSelectedBoleto] = useState(null);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [descontadoFilter, setDescontadoFilter] = useState('todos');
  const [novoDomicilioFilter, setNovoDomicilioFilter] = useState('todos');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredBoletos, setFilteredBoletos] = useState(mockBoletos);

  const handleViewDetails = (boleto) => {
    setSelectedBoleto(boleto);
    setShowPaymentDetailsModal(true);
  };

  // Filter boletos based on search term and filters
  useEffect(() => {
    let filtered = mockBoletos;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(boleto =>
        boleto.sacado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boleto.numero.includes(searchTerm) ||
        boleto.cnpj.includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(boleto => boleto.status === statusFilter);
    }

    // Filter by descontado
    if (descontadoFilter !== 'todos') {
      filtered = filtered.filter(boleto => 
        descontadoFilter === 'sim' ? boleto.descontado : !boleto.descontado
      );
    }

    // Filter by novo domicílio
    if (novoDomicilioFilter !== 'todos') {
      filtered = filtered.filter(boleto => 
        novoDomicilioFilter === 'sim' ? boleto.novoDomicilio : !boleto.novoDomicilio
      );
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(boleto => {
        const vencimento = new Date(boleto.dataVencimento);
        return vencimento.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
      });
    }

    setFilteredBoletos(filtered);
  }, [searchTerm, statusFilter, descontadoFilter, novoDomicilioFilter, dateFilter]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('todos');
    setDescontadoFilter('todos');
    setNovoDomicilioFilter('todos');
    setDateFilter('');
  };

  // Modal de Regras de Cobrança
  const RegrasCobrancaModal = ({ isOpen, onClose }) => {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [paymentMethods, setPaymentMethods] = useState({
      pix: false,
      boleto: false,
      cessao: false,
      transferencia: false
    });
    const [priority, setPriority] = useState('pix');
    const [rules, setRules] = useState([
      {
        id: 1,
        grupo: 'Farmácias Premium',
        metodos: ['PIX', 'Boleto'],
        prioridade: 'PIX',
        ativo: true
      },
      {
        id: 2,
        grupo: 'Drogarias Regionais',
        metodos: ['Boleto', 'Transferência'],
        prioridade: 'Boleto',
        ativo: true
      }
    ]);
    
    if (!isOpen) return null;
    
    const handleMethodChange = (method) => {
      setPaymentMethods(prev => ({
        ...prev,
        [method]: !prev[method]
      }));
    };
    
    const handleSaveRule = () => {
      const selectedMethods = Object.entries(paymentMethods)
        .filter(([_, selected]) => selected)
        .map(([method, _]) => {
          switch(method) {
            case 'pix': return 'PIX';
            case 'boleto': return 'Boleto';
            case 'cessao': return 'Cessão de Recebíveis';
            case 'transferencia': return 'Transferência';
            default: return method;
          }
        });
      
      if (!selectedGroup || selectedMethods.length === 0) {
        alert('Por favor, selecione um grupo e pelo menos um método de cobrança.');
        return;
      }
      
      const newRule = {
        id: rules.length + 1,
        grupo: selectedGroup,
        metodos: selectedMethods,
        prioridade: priority.toUpperCase(),
        ativo: true
      };
      
      setRules([...rules, newRule]);
      
      // Reset form
      setSelectedGroup('');
      setPaymentMethods({ pix: false, boleto: false, cessao: false, transferencia: false });
      setPriority('pix');
      
      alert('Regra de cobrança criada com sucesso!');
    };
    
    const handleDeleteRule = (ruleId) => {
      if (window.confirm('Tem certeza que deseja excluir esta regra?')) {
        setRules(rules.filter(rule => rule.id !== ruleId));
      }
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflowY: 'auto',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '900px',
          margin: '20px auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
              Regras de Cobrança por Grupo de Clientes
            </h3>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: 'var(--secondary-text)'
              }}
            >
              &times;
            </button>
          </div>
          
          {/* Formulário para Nova Regra */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Nova Regra de Cobrança
            </h4>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Grupo de Clientes
              </label>
              <select 
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '40px'
                }}
              >
                <option value="">Selecione um grupo</option>
                <option value="Farmácias Premium">Farmácias Premium</option>
                <option value="Drogarias Regionais">Drogarias Regionais</option>
                <option value="Distribuidoras">Distribuidoras</option>
                <option value="Clientes VIP">Clientes VIP</option>
                <option value="Novos Clientes">Novos Clientes</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500' }}>
                Métodos de Cobrança Disponíveis
              </label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '12px' 
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: paymentMethods.pix ? 'rgba(59, 130, 246, 0.05)' : 'white'
                }}>
                  <input 
                    type="checkbox" 
                    checked={paymentMethods.pix}
                    onChange={() => handleMethodChange('pix')}
                  />
                  <QrCode size={20} color="#00BC8D" />
                  <span style={{ fontWeight: '500' }}>PIX</span>
                </label>
                
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: paymentMethods.boleto ? 'rgba(59, 130, 246, 0.05)' : 'white'
                }}>
                  <input 
                    type="checkbox" 
                    checked={paymentMethods.boleto}
                    onChange={() => handleMethodChange('boleto')}
                  />
                  <FileText size={20} color="#FF6B35" />
                  <span style={{ fontWeight: '500' }}>Boleto</span>
                </label>
                
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: paymentMethods.cessao ? 'rgba(59, 130, 246, 0.05)' : 'white'
                }}>
                  <input 
                    type="checkbox" 
                    checked={paymentMethods.cessao}
                    onChange={() => handleMethodChange('cessao')}
                  />
                  <CreditCard size={20} color="#8B5CF6" />
                  <span style={{ fontWeight: '500' }}>Cessão de Recebíveis</span>
                </label>
                
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: paymentMethods.transferencia ? 'rgba(59, 130, 246, 0.05)' : 'white'
                }}>
                  <input 
                    type="checkbox" 
                    checked={paymentMethods.transferencia}
                    onChange={() => handleMethodChange('transferencia')}
                  />
                  <ArrowsLeftRight size={20} color="#10B981" />
                  <span style={{ fontWeight: '500' }}>Transferência Simples</span>
                </label>
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Método Prioritário
              </label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '40px'
                }}
              >
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
                <option value="cessao">Cessão de Recebíveis</option>
                <option value="transferencia">Transferência Simples</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleSaveRule}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                Adicionar Regra
              </button>
            </div>
          </div>
          
          {/* Lista de Regras Existentes */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Regras Configuradas
            </h4>
            
            {rules.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {rules.map(rule => (
                  <div key={rule.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'white'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {rule.grupo}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                        Métodos: {rule.metodos.join(', ')}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                        Prioridade: <strong>{rule.prioridade}</strong>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: rule.ativo ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                        color: rule.ativo ? '#22c55e' : '#6b7280'
                      }}>
                        {rule.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                      <button 
                        onClick={() => handleDeleteRule(rule.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px'
                        }}
                        title="Excluir regra"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '32px',
                color: 'var(--secondary-text)'
              }}>
                <Gear size={48} style={{ marginBottom: '16px' }} />
                <p>Nenhuma regra configurada ainda.</p>
                <p style={{ fontSize: '14px' }}>Configure regras para automatizar os métodos de cobrança.</p>
              </div>
            )}
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button 
              onClick={onClose}
              style={{
                padding: '10px 16px',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal de Nova Instrução de Cobrança
  const NewInstructionModal = ({ isOpen, onClose }) => {
    const [paymentType, setPaymentType] = useState('boleto');
    const [payer, setPayer] = useState('');
    const [receiver, setReceiver] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    
    if (!isOpen) return null;
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui seria implementada a lógica para gerar o boleto ou código PIX
      alert(`Instrução de cobrança ${paymentType === 'boleto' ? 'Boleto' : 'PIX'} criada com sucesso!`);
      onClose();
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflowY: 'auto',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '900px',
          margin: '20px auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Nova Instrução de Cobrança</h3>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: 'var(--secondary-text)'
              }}
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tipo de Cobrança</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="paymentType" 
                    value="boleto" 
                    checked={paymentType === 'boleto'} 
                    onChange={() => setPaymentType('boleto')}
                  />
                  Boleto
                </label>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="paymentType" 
                    value="pix" 
                    checked={paymentType === 'pix'} 
                    onChange={() => setPaymentType('pix')}
                  />
                  PIX
                </label>
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Pagador</label>
              <select 
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '40px'
                }}
                required
              >
                <option value="">Selecione o pagador</option>
                <option value="farmacia1">Farmácia Saúde Total</option>
                <option value="farmacia2">Drogaria Bem Estar</option>
                <option value="farmacia3">Farmácia Vida & Saúde</option>
                <option value="farmacia4">Drogaria São Lucas</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Recebedor</label>
              <select 
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '40px'
                }}
                required
              >
                <option value="">Selecione o recebedor</option>
                <option value="empresa1">Empresa Distribuidora A</option>
                <option value="empresa2">Distribuidora Medicamentos B</option>
                <option value="empresa3">Fornecedor Farmacêutico C</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Valor</label>
              <input 
                type="text" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="R$ 0,00"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '40px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Data de Vencimento</label>
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '40px'
                }}
                required
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                type="button" 
                onClick={onClose}
                style={{
                  padding: '10px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  height: '40px'
                }}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'var(--primary-blue)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  height: '40px'
                }}
              >
                {paymentType === 'boleto' ? 'Gerar Boleto' : 'Gerar Código PIX'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <PageHeader>
        <h1>Gestão da Cobrança</h1>
        <p>Acompanhe os boletos a vencer e gerencie os descontos e domicílios bancários</p>
      </PageHeader>
      
      {/* Filtros */}
      <FiltersSection>
        <FilterHeader onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <div className="left">
            <FunnelSimple size={20} />
            <h3>Filtros</h3>
          </div>
          <CaretDown 
            size={16}
            className={`icon ${isFilterOpen ? 'open' : ''}`}
          />
        </FilterHeader>
        
        {isFilterOpen && (
          <FilterContent>
            <div className="filters">
              <div className="filter-group">
                <label>Status</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos os status</option>
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="vencido">Vencido</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Descontado</label>
                <select 
                  value={descontadoFilter} 
                  onChange={(e) => setDescontadoFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Novo Domicílio</label>
                <select 
                  value={novoDomicilioFilter} 
                  onChange={(e) => setNovoDomicilioFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Data de Vencimento</label>
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label>Ordenar por</label>
                <select>
                  <option value="vencimento">Data de Vencimento</option>
                  <option value="valor">Valor</option>
                  <option value="sacado">Sacado</option>
                </select>
              </div>
            </div>
          </FilterContent>
        )}
      </FiltersSection>

      {/* Busca e Ações */}
      <SearchSection>
        <SearchInput>
          <MagnifyingGlass size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por número do boleto, sacado ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <ActionButtons>
          <button className="secondary" onClick={handleClearFilters}>
            <FunnelSimple size={16} />
            Limpar Filtros
          </button>
          <button className="secondary" onClick={() => setShowRegrasCobrancaModal(true)}>
            <Gear size={16} />
            Regras de cobrança
          </button>
          <button className="primary" onClick={() => setShowNewInstructionModal(true)}>
            <Plus size={16} />
            Nova Instrução de Cobrança
          </button>
          <button className="primary">
            <Download size={16} />
            Exportar
          </button>
        </ActionButtons>
      </SearchSection>

      {/* Tabela */}
      <TableSection>
        <div className="table-header">
          <h3>Boletos a Vencer</h3>
          <div className="table-info">
            {filteredBoletos.length} boletos
          </div>
        </div>

        <div className="table-responsive">
          {filteredBoletos.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Nº do Boleto</th>
                  <th>Sacado</th>
                  <th>CNPJ</th>
                  <th>Data de Emissão</th>
                  <th>Data de Vencimento</th>
                  <th>Valor (R$)</th>
                  <th>Status</th>
                  <th>Descontado</th>
                  <th>Novo Domicílio</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoletos.map(boleto => (
                  <tr key={boleto.id}>
                    <td>{boleto.numero}</td>
                    <td>{boleto.sacado}</td>
                    <td>{boleto.cnpj}</td>
                    <td>{formatDate(boleto.dataEmissao)}</td>
                    <td>{formatDate(boleto.dataVencimento)}</td>
                    <td>{formatCurrency(boleto.valor)}</td>
                    <td className="status">
                      <span className={`status-badge ${boleto.status}`}>
                        {boleto.status === 'pendente' ? 'Pendente' : 
                         boleto.status === 'pago' ? 'Pago' : 'Vencido'}
                      </span>
                    </td>
                    <td className="highlight">
                      {boleto.descontado ? (
                        <span className="yes">
                          <CheckCircle size={16} weight="fill" />
                          Sim
                        </span>
                      ) : (
                        <span className="no">
                          <XCircle size={16} weight="fill" />
                          Não
                        </span>
                      )}
                    </td>
                    <td className="highlight">
                      {boleto.novoDomicilio ? (
                        <span className="yes">
                          <CheckCircle size={16} weight="fill" />
                          Sim
                        </span>
                      ) : (
                        <span className="no">
                          <XCircle size={16} weight="fill" />
                          Não
                        </span>
                      )}
                    </td>
                    <td className="actions">
                      <button title="Ver detalhes">
                        <Eye size={16} onClick={() => handleViewDetails(boleto)} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState>
              <div className="icon">
                <Bank size={48} />
              </div>
              <h4>Nenhum boleto encontrado</h4>
              <p>Não foram encontrados boletos com os filtros selecionados.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>
      
      {/* Modal de Nova Instrução de Cobrança */}
      {showNewInstructionModal && (
        <NewInstructionModal 
          isOpen={showNewInstructionModal} 
          onClose={() => setShowNewInstructionModal(false)} 
        />
      )}
      
      {/* Modal de Regras de Cobrança */}
      {showRegrasCobrancaModal && (
        <RegrasCobrancaModal 
          isOpen={showRegrasCobrancaModal} 
          onClose={() => setShowRegrasCobrancaModal(false)} 
        />
      )}
      
      {/* Modal de Detalhes de Pagamento */}
      {showPaymentDetailsModal && selectedBoleto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflowY: 'auto',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '900px',
            margin: '20px auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                Detalhes da Cobrança
              </h3>
              <button 
                onClick={() => setShowPaymentDetailsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: 'var(--secondary-text)'
                }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Sacado</div>
                  <div>{selectedBoleto.sacado}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>CNPJ</div>
                  <div>{selectedBoleto.cnpj}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Número do Boleto</div>
                  <div>{selectedBoleto.numero}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Valor</div>
                  <div style={{ fontWeight: 600 }}>{formatCurrency(selectedBoleto.valor)}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Data de Emissão</div>
                  <div>{formatDate(selectedBoleto.dataEmissao)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Data de Vencimento</div>
                  <div>{formatDate(selectedBoleto.dataVencimento)}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Descontado</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {selectedBoleto.descontado ? (
                      <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={16} weight="fill" />
                        Sim
                      </span>
                    ) : (
                      <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <XCircle size={16} weight="fill" />
                        Não
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Novo Domicílio</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {selectedBoleto.novoDomicilio ? (
                      <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={16} weight="fill" />
                        Sim
                      </span>
                    ) : (
                      <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <XCircle size={16} weight="fill" />
                        Não
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {selectedBoleto.descontado ? (
                  <>
                    <CurrencyCircleDollar size={20} />
                    Opção de Cobrança: {Math.random() > 0.5 ? 'Boleto' : 'PIX'}
                  </>
                ) : (
                  <>
                    <CurrencyCircleDollar size={20} />
                    Opção de Cobrança: Não disponível
                  </>
                )}
              </h4>
              
              {selectedBoleto.descontado && (
                <>
                  {Math.random() > 0.5 ? (
                    <div>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 500, color: '#222', marginBottom: '8px' }}>Código de Barras:</div>
                        <div style={{ 
                          padding: '12px', 
                          backgroundColor: 'white', 
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          fontSize: '14px',
                          fontFamily: 'monospace',
                          position: 'relative'
                        }}>
                          23793.38128 60007.702636 95000.063305 9 93430026000
                          <button 
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              color: 'var(--primary-blue)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText('23793.38128 60007.702636 95000.063305 9 93430026000');
                              alert('Código de barras copiado!');
                            }}
                          >
                            <Copy size={16} />
                            Copiar
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            backgroundColor: 'var(--primary-blue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                          onClick={() => alert('Boleto enviado para impressão!')}
                        >
                          <Printer size={18} />
                          Imprimir Boleto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <div style={{
                          width: '200px',
                          height: '200px',
                          backgroundColor: '#f8f9fa',
                          margin: '0 auto 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: '#666',
                          border: '1px solid #ddd'
                        }}>
                          [QR Code do PIX]
                        </div>
                        <div style={{ fontWeight: 500, color: '#222', marginBottom: '8px' }}>Chave PIX:</div>
                        <div style={{ 
                          padding: '12px', 
                          backgroundColor: 'white', 
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          fontSize: '14px',
                          fontFamily: 'monospace',
                          position: 'relative',
                          marginBottom: '16px'
                        }}>
                          00020126580014br.gov.bcb.pix0136a1f86677-94de-4b70-8950-1fc3b4f7a79f5204000053039865802BR5925EMPRESA DISTRIBUIDORA SA6009SAO PAULO62070503***63041D57
                          <button 
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              color: 'var(--primary-blue)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136a1f86677-94de-4b70-8950-1fc3b4f7a79f5204000053039865802BR5925EMPRESA DISTRIBUIDORA SA6009SAO PAULO62070503***63041D57');
                              alert('Código PIX copiado!');
                            }}
                          >
                            <Copy size={16} />
                            Copiar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowPaymentDetailsModal(false)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DebtManagement;