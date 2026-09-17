import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Calculator, 
  TrendUp, 
  Clock, 
  Percent,
  CurrencyCircleDollar,
  ChartLine,
  Bank,
  Calendar,
  MagnifyingGlass,
  FunnelSimple,
  Download,
  Plus,
  CaretDown,
  Eye,
  Pencil,
  X
} from '@phosphor-icons/react';
import { Trash2 } from 'lucide-react';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--secondary-text);
  }
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.blue {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }

      &.green {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
      }

      &.orange {
        background: rgba(249, 115, 22, 0.1);
        color: #f97316;
      }

      &.purple {
        background: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
      }
    }

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0;
    }
  }
  
  .value {
    font-size: 28px;
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
  
  .subtitle {
    font-size: 14px;
    color: var(--secondary-text);
  }
  
  .trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    margin-top: 8px;
    
    &.up {
      color: #22c55e;
    }
    
    &.down {
      color: #ef4444;
    }
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
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    
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
  min-width: 900px;
  
  th {
    background: var(--background);
    padding: 12px 16px;
    font-weight: 600;
    font-size: 13px;
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
    
    &.actions {
      text-align: center;
      width: 120px;
      
      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
      
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
        
        &.edit:hover {
          color: #0070F2;
        }
        
        &.delete:hover {
          color: #ef4444;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text);
    padding: 8px;
    
    &:hover {
      color: var(--primary-text);
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 2px rgba(0, 112, 242, 0.1);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  
  button {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &.secondary {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);
      
      &:hover {
        background: var(--background);
      }
    }
    
    &.primary {
      background: var(--primary-blue);
      color: white;
      border: none;
      
      &:hover {
        background: #2563eb;
      }
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoSection = styled.div`
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 16px;
    
    .icon {
      color: var(--primary-blue);
    }
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-size: 14px;
      color: var(--secondary-text);
      font-weight: 500;
    }
    
    .value {
      font-size: 14px;
      color: var(--primary-text);
      font-weight: 600;
      text-align: right;
    }
  }
`;

// Mock data para precificação
const mockMetrics = {
  taxaMediaMercado: 2.45,
  margemLucro: 15.8,
  volumeNegociado: 2850000,
  numeroOperacoes: 127
};

const mockPrecificacao = [
  {
    id: 1,
    cliente: 'Farmácia Saúde Total',
    cnpj: '12.345.678/0001-90',
    prazoMedio: 45,
    volumeMensal: 150000,
    taxaAtual: 2.35,
    taxaSugerida: 2.28,
    risco: 'Baixo',
    ultimaRevisao: '2024-05-15'
  },
  {
    id: 2,
    cliente: 'Drogaria Bem Estar',
    cnpj: '23.456.789/0001-01',
    prazoMedio: 60,
    volumeMensal: 180000,
    taxaAtual: 2.65,
    taxaSugerida: 2.52,
    risco: 'Médio',
    ultimaRevisao: '2024-05-20'
  },
  {
    id: 3,
    cliente: 'Farmácia Vida & Saúde',
    cnpj: '34.567.890/0001-12',
    prazoMedio: 30,
    volumeMensal: 120000,
    taxaAtual: 2.15,
    taxaSugerida: 2.08,
    risco: 'Baixo',
    ultimaRevisao: '2024-05-18'
  },
  {
    id: 4,
    cliente: 'Drogaria São Lucas',
    cnpj: '45.678.901/0001-23',
    prazoMedio: 75,
    volumeMensal: 200000,
    taxaAtual: 2.85,
    taxaSugerida: 2.78,
    risco: 'Alto',
    ultimaRevisao: '2024-05-12'
  },
  {
    id: 5,
    cliente: 'Farmácia Popular Express',
    cnpj: '56.789.012/0001-34',
    prazoMedio: 45,
    volumeMensal: 90000,
    taxaAtual: 2.45,
    taxaSugerida: 2.35,
    risco: 'Médio',
    ultimaRevisao: '2024-05-25'
  }
];

const Precificacao = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [riscoFilter, setRiscoFilter] = useState('todos');
  const [prazoFilter, setPrazoFilter] = useState('todos');
  const [filteredPrecificacao, setFilteredPrecificacao] = useState(mockPrecificacao);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    cliente: '',
    cnpj: '',
    prazoMedio: '',
    volumeMensal: '',
    taxaAtual: '',
    taxaSugerida: '',
    risco: '',
    observacoes: ''
  });
  const [newFormData, setNewFormData] = useState({
    cliente: '',
    cnpj: '',
    tipoTaxa: 'fixa',
    prazoMedio: '',
    volumeMensal: '',
    taxaAtual: '',
    taxaSugerida: '',
    taxaBase: '',
    taxaMaxima: '',
    taxaMinima: '',
    criterioVariacao: 'volume',
    risco: 'Baixo',
    observacoes: ''
  });

  // Filter data based on search term and filters
  useEffect(() => {
    let filtered = mockPrecificacao;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cnpj.includes(searchTerm)
      );
    }

    // Filter by risco
    if (riscoFilter !== 'todos') {
      filtered = filtered.filter(item => item.risco.toLowerCase() === riscoFilter);
    }

    // Filter by prazo
    if (prazoFilter !== 'todos') {
      if (prazoFilter === 'curto') {
        filtered = filtered.filter(item => item.prazoMedio <= 30);
      } else if (prazoFilter === 'medio') {
        filtered = filtered.filter(item => item.prazoMedio > 30 && item.prazoMedio <= 60);
      } else if (prazoFilter === 'longo') {
        filtered = filtered.filter(item => item.prazoMedio > 60);
      }
    }

    setFilteredPrecificacao(filtered);
  }, [searchTerm, riscoFilter, prazoFilter]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRiscoFilter('todos');
    setPrazoFilter('todos');
  };

  const getRiscoColor = (risco) => {
    switch (risco.toLowerCase()) {
      case 'baixo':
        return '#22c55e';
      case 'médio':
        return '#f59e0b';
      case 'alto':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setEditFormData({
      cliente: item.cliente,
      cnpj: item.cnpj,
      prazoMedio: item.prazoMedio.toString(),
      volumeMensal: item.volumeMensal.toString(),
      taxaAtual: item.taxaAtual.toString(),
      taxaSugerida: item.taxaSugerida.toString(),
      risco: item.risco,
      observacoes: 'Observações sobre a precificação do cliente...'
    });
    setShowEditModal(true);
  };

  const handleCloseModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowNewModal(false);
    setSelectedItem(null);
    setEditFormData({
      cliente: '',
      cnpj: '',
      prazoMedio: '',
      volumeMensal: '',
      taxaAtual: '',
      taxaSugerida: '',
      risco: '',
      observacoes: ''
    });
    setNewFormData({
      cliente: '',
      cnpj: '',
      tipoTaxa: 'fixa',
      prazoMedio: '',
      volumeMensal: '',
      taxaAtual: '',
      taxaSugerida: '',
      taxaBase: '',
      taxaMaxima: '',
      taxaMinima: '',
      criterioVariacao: 'volume',
      risco: 'Baixo',
      observacoes: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as alterações
    console.log('Salvando alterações:', editFormData);
    alert('Precificação atualizada com sucesso!');
    handleCloseModals();
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveNew = (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!newFormData.cliente.trim()) {
      alert('Por favor, informe o nome do cliente.');
      return;
    }
    
    if (!newFormData.cnpj.trim()) {
      alert('Por favor, informe o CNPJ do cliente.');
      return;
    }
    
    if (!newFormData.prazoMedio || !newFormData.volumeMensal || !newFormData.taxaAtual || !newFormData.taxaSugerida) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Criar nova precificação
    const newPrecificacao = {
      id: mockPrecificacao.length + 1,
      cliente: newFormData.cliente,
      cnpj: newFormData.cnpj,
      prazoMedio: parseInt(newFormData.prazoMedio),
      volumeMensal: parseFloat(newFormData.volumeMensal),
      taxaAtual: parseFloat(newFormData.taxaAtual),
      taxaSugerida: parseFloat(newFormData.taxaSugerida),
      risco: newFormData.risco,
      ultimaRevisao: new Date().toISOString().split('T')[0]
    };
    
    // Adicionar à lista (em produção seria salvo no banco)
    mockPrecificacao.push(newPrecificacao);
    setFilteredPrecificacao([...mockPrecificacao]);
    
    console.log('Nova precificação criada:', newPrecificacao);
    alert('Nova precificação criada com sucesso!');
    handleCloseModals();
  };
  return (
    <Container>
      <PageHeader>
        <h1>Precificação</h1>
        <p>Gerencie as taxas e precificação das operações de antecipação</p>
      </PageHeader>

      {/* Métricas */}
      <MetricsContainer>
        <MetricCard>
          <div className="header">
            <div className="icon blue">
              <Percent size={24} weight="bold" />
            </div>
            <h3>Taxa Média de Mercado</h3>
          </div>
          <div className="value">{formatPercentage(mockMetrics.taxaMediaMercado)}</div>
          <div className="subtitle">ao mês</div>
          <div className="trend up">
            <ChartLine size={16} />
            +0.15% vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon green">
              <TrendUp size={24} weight="bold" />
            </div>
            <h3>Margem de Lucro</h3>
          </div>
          <div className="value">{formatPercentage(mockMetrics.margemLucro)}</div>
          <div className="subtitle">média das operações</div>
          <div className="trend up">
            <ChartLine size={16} />
            +2.3% vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon orange">
              <CurrencyCircleDollar size={24} weight="bold" />
            </div>
            <h3>Volume Negociado</h3>
          </div>
          <div className="value">{formatCurrency(mockMetrics.volumeNegociado)}</div>
          <div className="subtitle">no último mês</div>
          <div className="trend up">
            <ChartLine size={16} />
            +12.5% vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon purple">
              <Calculator size={24} weight="bold" />
            </div>
            <h3>Operações</h3>
          </div>
          <div className="value">{mockMetrics.numeroOperacoes}</div>
          <div className="subtitle">no último mês</div>
          <div className="trend up">
            <ChartLine size={16} />
            +8 vs mês anterior
          </div>
        </MetricCard>
      </MetricsContainer>

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
                <label>Nível de Risco</label>
                <select 
                  value={riscoFilter} 
                  onChange={(e) => setRiscoFilter(e.target.value)}
                >
                  <option value="todos">Todos os níveis</option>
                  <option value="baixo">Baixo</option>
                  <option value="médio">Médio</option>
                  <option value="alto">Alto</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Prazo Médio</label>
                <select 
                  value={prazoFilter} 
                  onChange={(e) => setPrazoFilter(e.target.value)}
                >
                  <option value="todos">Todos os prazos</option>
                  <option value="curto">Curto (até 30 dias)</option>
                  <option value="medio">Médio (31-60 dias)</option>
                  <option value="longo">Longo (acima de 60 dias)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Ordenar por</label>
                <select>
                  <option value="cliente">Nome do Cliente</option>
                  <option value="taxa">Taxa Atual</option>
                  <option value="volume">Volume Mensal</option>
                  <option value="risco">Nível de Risco</option>
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
            placeholder="Buscar por cliente ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <ActionButtons>
          <button className="secondary" onClick={handleClearFilters}>
            <FunnelSimple size={16} />
            Limpar Filtros
          </button>
          <button className="secondary">
            <Download size={16} />
            Exportar
          </button>
          <button className="primary" onClick={() => setShowNewModal(true)}>
            <Plus size={16} />
            Nova Precificação
          </button>
        </ActionButtons>
      </SearchSection>

      {/* Tabela de Precificação */}
      <TableSection>
        <div className="table-header">
          <h3>Precificação por Cliente</h3>
          <div className="table-info">
            {filteredPrecificacao.length} clientes
          </div>
        </div>

        <div className="table-responsive">
          {filteredPrecificacao.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>CNPJ</th>
                  <th>Prazo Médio</th>
                  <th>Volume Mensal</th>
                  <th>Taxa Atual</th>
                  <th>Taxa Sugerida</th>
                  <th>Nível de Risco</th>
                  <th>Última Revisão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrecificacao.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>{item.cliente}</td>
                    <td>{item.cnpj}</td>
                    <td>{item.prazoMedio} dias</td>
                    <td>{formatCurrency(item.volumeMensal)}</td>
                    <td style={{ fontWeight: '600' }}>{formatPercentage(item.taxaAtual)}</td>
                    <td style={{ 
                      fontWeight: '600',
                      color: item.taxaSugerida < item.taxaAtual ? '#22c55e' : '#ef4444'
                    }}>
                      {formatPercentage(item.taxaSugerida)}
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: `${getRiscoColor(item.risco)}20`,
                        color: getRiscoColor(item.risco)
                      }}>
                        {item.risco}
                      </span>
                    </td>
                    <td>{formatDate(item.ultimaRevisao)}</td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button 
                          title="Ver detalhes"
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="edit"
                          title="Editar precificação"
                          onClick={() => handleEditItem(item)}
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState>
              <div className="icon">
                <Calculator size={48} />
              </div>
              <h4>Nenhuma precificação encontrada</h4>
              <p>Não foram encontradas precificações com os filtros selecionados.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>

      {/* Modal de Visualização */}
      {showViewModal && selectedItem && (
        <Modal onClick={handleCloseModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Detalhes da Precificação</h2>
              <button onClick={handleCloseModals}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <ModalBody>
              <InfoGrid>
                <InfoSection>
                  <div className="section-title">
                    <Bank className="icon" size={20} />
                    Informações do Cliente
                  </div>
                  <div className="info-item">
                    <span className="label">Nome</span>
                    <span className="value">{selectedItem.cliente}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CNPJ</span>
                    <span className="value">{selectedItem.cnpj}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Nível de Risco</span>
                    <span className="value" style={{ color: getRiscoColor(selectedItem.risco) }}>
                      {selectedItem.risco}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Última Revisão</span>
                    <span className="value">{formatDate(selectedItem.ultimaRevisao)}</span>
                  </div>
                </InfoSection>

                <InfoSection>
                  <div className="section-title">
                    <Calculator className="icon" size={20} />
                    Dados Financeiros
                  </div>
                  <div className="info-item">
                    <span className="label">Prazo Médio</span>
                    <span className="value">{selectedItem.prazoMedio} dias</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Volume Mensal</span>
                    <span className="value">{formatCurrency(selectedItem.volumeMensal)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Taxa Atual</span>
                    <span className="value">{formatPercentage(selectedItem.taxaAtual)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Taxa Sugerida</span>
                    <span className="value" style={{ 
                      color: selectedItem.taxaSugerida < selectedItem.taxaAtual ? '#22c55e' : '#ef4444'
                    }}>
                      {formatPercentage(selectedItem.taxaSugerida)}
                    </span>
                  </div>
                </InfoSection>
              </InfoGrid>

              <div style={{
                background: 'var(--background)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--primary-text)'
                }}>
                  Análise de Precificação
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--secondary-text)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Com base no histórico de operações, volume mensal e perfil de risco do cliente, 
                  a taxa sugerida oferece uma margem competitiva mantendo a rentabilidade da operação. 
                  O prazo médio de {selectedItem.prazoMedio} dias está dentro dos parâmetros aceitáveis 
                  para o nível de risco {selectedItem.risco.toLowerCase()}.
                </p>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <button className="secondary" onClick={handleCloseModals}>
                Fechar
              </button>
              <button className="primary" onClick={() => {
                setShowViewModal(false);
                handleEditItem(selectedItem);
              }}>
                Editar Precificação
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Edição */}
      {showEditModal && selectedItem && (
        <Modal onClick={handleCloseModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Editar Precificação - {selectedItem.cliente}</h2>
              <button onClick={handleCloseModals}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <form onSubmit={handleSaveEdit}>
              <ModalBody>
                <FormRow>
                  <FormGroup>
                    <label>Cliente</label>
                    <input
                      type="text"
                      name="cliente"
                      value={editFormData.cliente}
                      onChange={handleInputChange}
                      disabled
                      style={{ background: '#f8f9fa', cursor: 'not-allowed' }}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>CNPJ</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={editFormData.cnpj}
                      onChange={handleInputChange}
                      disabled
                      style={{ background: '#f8f9fa', cursor: 'not-allowed' }}
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <label>Prazo Médio (dias)</label>
                    <input
                      type="number"
                      name="prazoMedio"
                      value={editFormData.prazoMedio}
                      onChange={handleInputChange}
                      min="1"
                      max="365"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>Volume Mensal (R$)</label>
                    <input
                      type="number"
                      name="volumeMensal"
                      value={editFormData.volumeMensal}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <label>Taxa Atual (%)</label>
                    <input
                      type="number"
                      name="taxaAtual"
                      value={editFormData.taxaAtual}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>Taxa Sugerida (%)</label>
                    <input
                      type="number"
                      name="taxaSugerida"
                      value={editFormData.taxaSugerida}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <label>Nível de Risco</label>
                  <select
                    name="risco"
                    value={editFormData.risco}
                    onChange={handleInputChange}
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label>Observações</label>
                  <textarea
                    name="observacoes"
                    value={editFormData.observacoes}
                    onChange={handleInputChange}
                    placeholder="Digite observações sobre a precificação..."
                  />
                </FormGroup>
              </ModalBody>
              
              <ModalFooter>
                <button type="button" className="secondary" onClick={handleCloseModals}>
                  Cancelar
                </button>
                <button type="submit" className="primary">
                  Salvar Alterações
                </button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Nova Precificação */}
      {showNewModal && (
        <Modal onClick={handleCloseModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Nova Precificação</h2>
              <button onClick={handleCloseModals}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <form onSubmit={handleSaveNew}>
              <ModalBody>
                <FormRow>
                  <FormGroup>
                    <label>Nome do Cliente *</label>
                    <input
                      type="text"
                      name="cliente"
                      value={newFormData.cliente}
                      onChange={handleNewInputChange}
                      placeholder="Digite o nome do cliente"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>CNPJ *</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={newFormData.cnpj}
                      onChange={handleNewInputChange}
                      placeholder="00.000.000/0000-00"
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <label>Prazo Médio (dias) *</label>
                    <input
                      type="number"
                      name="prazoMedio"
                      value={newFormData.prazoMedio}
                      onChange={handleNewInputChange}
                      min="1"
                      max="365"
                      placeholder="45"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>Volume Mensal (R$) *</label>
                    <input
                      type="number"
                      name="volumeMensal"
                      value={newFormData.volumeMensal}
                      onChange={handleNewInputChange}
                      min="0"
                      step="0.01"
                      placeholder="100000.00"
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <label>Tipo de Taxa *</label>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'normal'
                    }}>
                      <input 
                        type="radio" 
                        name="tipoTaxa" 
                        value="fixa" 
                        checked={newFormData.tipoTaxa === 'fixa'} 
                        onChange={handleNewInputChange}
                      />
                      Taxa Fixa
                    </label>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'normal'
                    }}>
                      <input 
                        type="radio" 
                        name="tipoTaxa" 
                        value="dinamica" 
                        checked={newFormData.tipoTaxa === 'dinamica'} 
                        onChange={handleNewInputChange}
                      />
                      Taxa Dinâmica
                    </label>
                  </div>
                </FormGroup>
                
                {newFormData.tipoTaxa === 'fixa' ? (
                  <FormRow>
                    <FormGroup>
                      <label>Taxa Atual (%) *</label>
                      <input
                        type="number"
                        name="taxaAtual"
                        value={newFormData.taxaAtual}
                        onChange={handleNewInputChange}
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="2.50"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>Taxa Sugerida (%) *</label>
                      <input
                        type="number"
                        name="taxaSugerida"
                        value={newFormData.taxaSugerida}
                        onChange={handleNewInputChange}
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="2.35"
                        required
                      />
                    </FormGroup>
                  </FormRow>
                ) : (
                  <>
                    <FormRow>
                      <FormGroup>
                        <label>Taxa Base (%) *</label>
                        <input
                          type="number"
                          name="taxaBase"
                          value={newFormData.taxaBase}
                          onChange={handleNewInputChange}
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="2.50"
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Critério de Variação *</label>
                        <select
                          name="criterioVariacao"
                          value={newFormData.criterioVariacao}
                          onChange={handleNewInputChange}
                          required
                        >
                          <option value="volume">Volume da Operação</option>
                          <option value="prazo">Prazo de Vencimento</option>
                          <option value="risco">Nível de Risco</option>
                          <option value="historico">Histórico do Cliente</option>
                        </select>
                      </FormGroup>
                    </FormRow>
                    
                    <FormRow>
                      <FormGroup>
                        <label>Taxa Mínima (%) *</label>
                        <input
                          type="number"
                          name="taxaMinima"
                          value={newFormData.taxaMinima}
                          onChange={handleNewInputChange}
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="2.00"
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <label>Taxa Máxima (%) *</label>
                        <input
                          type="number"
                          name="taxaMaxima"
                          value={newFormData.taxaMaxima}
                          onChange={handleNewInputChange}
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="3.00"
                          required
                        />
                      </FormGroup>
                    </FormRow>
                    
                    {/* Visualização da Banda de Variação */}
                    {newFormData.taxaMinima && newFormData.taxaMaxima && newFormData.taxaBase && (
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.05)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '16px'
                      }}>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: 'var(--primary-blue)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <TrendUp size={16} />
                          Banda de Variação
                        </h4>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '14px'
                        }}>
                          <span>Mínima: <strong>{newFormData.taxaMinima}%</strong></span>
                          <span>Base: <strong>{newFormData.taxaBase}%</strong></span>
                          <span>Máxima: <strong>{newFormData.taxaMaxima}%</strong></span>
                        </div>
                        <p style={{
                          fontSize: '13px',
                          color: 'var(--secondary-text)',
                          margin: '8px 0 0 0',
                          lineHeight: '1.4'
                        }}>
                          A taxa será ajustada automaticamente dentro desta faixa baseada no critério: <strong>{
                            newFormData.criterioVariacao === 'volume' ? 'Volume da Operação' :
                            newFormData.criterioVariacao === 'prazo' ? 'Prazo de Vencimento' :
                            newFormData.criterioVariacao === 'risco' ? 'Nível de Risco' :
                            'Histórico do Cliente'
                          }</strong>
                        </p>
                      </div>
                    )}
                  </>
                )}
                
                <FormGroup>
                  <label>Nível de Risco *</label>
                  <select
                    name="risco"
                    value={newFormData.risco}
                    onChange={handleNewInputChange}
                    required
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label>Observações</label>
                  <textarea
                    name="observacoes"
                    value={newFormData.observacoes}
                    onChange={handleNewInputChange}
                    placeholder="Digite observações sobre a precificação deste cliente..."
                  />
                </FormGroup>
              </ModalBody>
              
              <ModalFooter>
                <button type="button" className="secondary" onClick={handleCloseModals}>
                  Cancelar
                </button>
                <button type="submit" className="primary">
                  Criar Precificação
                </button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Precificacao;