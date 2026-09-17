import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Download, 
  Plus, 
  Eye,
  TrendUp,
  Clock,
  Bank,
  CaretDown,
  FileText,
  CheckCircle,
  XCircle,
  CurrencyCircleDollar,
  Building
} from '@phosphor-icons/react';
import OperationDetails from './OperationDetails';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Select from 'react-select';
import NovaAntecipacaoModal from './NovaAntecipacaoModal';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 28px;
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
    grid-template-columns: repeat(4, 1fr);
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
    
    &:nth-child(3) { /* Taxa Média */
      text-align: center;
    }
    
    &:nth-child(4), /* Valor Bruto */
    &:nth-child(5), /* Desconto */
    &:nth-child(6), /* IOF */
    &:nth-child(7) { /* Valor Líquido */
      text-align: right;
    }
  }
    td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--primary-text);
    vertical-align: top;
    
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
        
        &.antecipado {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        
        &.pendente {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }
      }
      
      .date {
        font-size: 12px;
        color: var(--secondary-text);
        margin-top: 4px;
      }
    }
    
    &.anchor {
      min-width: 280px;
      
      .name {
        font-weight: 500;
        margin-bottom: 2px;
        font-size: 14px;
      }
      
      .document {
        font-size: 12px;
        color: var(--secondary-text);
      }
    }
    
    &.value {
      font-weight: 600;
      text-align: right;
      font-variant-numeric: tabular-nums;
      min-width: 120px;
    }
    
    &.rate {
      text-align: center;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      min-width: 100px;
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

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ColumnCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ColumnHeader = styled.div`
  padding: 16px 24px;
  background: #F8F9FA;
  border-bottom: 1px solid var(--border-color);
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const ColumnContent = styled.div`
  padding: 16px 24px;
  flex: 1;
  overflow-y: auto;
  max-height: 600px;
`;

const NotaFiscalItem = styled.div`
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .title {
    font-weight: 600;
    font-size: 16px;
  }
  
  .number {
    color: var(--secondary-text);
    font-size: 14px;
  }
  
  .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
    
    .detail-item {
      .label {
        font-size: 12px;
        color: var(--secondary-text);
      }
      
      .value {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      
      &.disponivel {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
      }
      
      &.pendente {
        background: rgba(251, 191, 36, 0.1);
        color: #fbbf24;
      }
    }
    
    .action-button {
      background: var(--primary-blue);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 13px;
      cursor: pointer;
      
      &:hover {
        background: #2563eb;
      }
    }
  }
`;

const EmptyColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: var(--secondary-text);
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  h4 {
    font-size: 18px;
    font-weight: 500;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const TabsContainer = styled.div`
  display: none;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Tab = styled.button`
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--primary-blue)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--secondary-text)'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  height: auto;
  
  &:hover {
    color: var(--primary-blue);
  }
`;

// Mock data
const mockIndicators = {
  totalOperacoes: 127,
  valorTotal: 2856742.33,
  totalPago: 1983521.67,
  totalPendente: 873220.66
};

const mockAntecipacoes = [
  {
    id: 1,
    operacao: 'Pago',
    ancoraNome: 'Farmácia Saúde Total',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 1.0324,
    valorBruto: 51935.65,
    desconto: 929.38,
    iof: 0.00,
    valorLiquido: 51006.27,
    dataOperacao: '2024-10-11',
    status: 'pago'
  },
  {
    id: 2,
    operacao: 'Pago',
    ancoraNome: 'Drogaria Bem Estar',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 1.0718,
    valorBruto: 45432.32,
    desconto: 649.26,
    iof: 0.00,
    valorLiquido: 44783.06,
    dataOperacao: '2024-10-11',
    status: 'pago'
  },
  {
    id: 3,
    operacao: 'Antecipada',
    ancoraNome: 'Farmácia Vida & Saúde',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 0.987,
    valorBruto: 2797.48,
    desconto: 10.12,
    iof: 0.00,
    valorLiquido: 2787.36,
    dataOperacao: '2024-07-11',
    status: 'antecipado'
  },
  {
    id: 4,
    operacao: 'Antecipada',
    ancoraNome: 'Drogaria São Lucas',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 1.2,
    valorBruto: 27269.38,
    desconto: 697.84,
    iof: 0.00,
    valorLiquido: 26561.54,
    dataOperacao: '2024-05-21',
    status: 'antecipado'
  },
  {
    id: 5,
    operacao: 'Antecipada',
    ancoraNome: 'Farmácia Popular Express',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 1.1904,
    valorBruto: 10165.83,
    desconto: 112.94,
    iof: 0.00,
    valorLiquido: 10052.89,
    dataOperacao: '2024-03-25',
    status: 'antecipado'
  },
  {
    id: 6,
    operacao: 'Antecipada',
    ancoraNome: 'Drogaria Saúde & Cia',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 1.4951,
    valorBruto: 6291.70,
    desconto: 81.51,
    iof: 0.00,
    valorLiquido: 6210.19,
    dataOperacao: '2024-06-14',
    status: 'antecipado'
  },
  {
    id: 7,
    operacao: 'Antecipada',
    ancoraNome: 'Farmácia Central',
    ancoraDocumento: '07.401.436/0001-31',
    taxaMedia: 1.3751,
    valorBruto: 5144.38,
    desconto: 134.37,
    iof: 0.00,
    valorLiquido: 5010.01,
    dataOperacao: '2024-04-12',
    status: 'antecipado'
  }
];

// Mock data para notas fiscais disponíveis
const mockNotasFiscais = [
  {
    id: 1,
    fornecedor: 'Farmácia Saúde Total',
    numero: 'NF-e 123456',
    emissao: '2024-06-10',
    vencimento: '2024-07-15',
    valor: 45000.00,
    status: 'disponivel'
  },
  {
    id: 2,
    fornecedor: 'Drogaria Bem Estar',
    numero: 'NF-e 789012',
    emissao: '2024-06-08',
    vencimento: '2024-07-10',
    valor: 27500.00,
    status: 'disponivel'
  },
  {
    id: 3,
    fornecedor: 'Farmácia Vida & Saúde',
    numero: 'NF-e 345678',
    emissao: '2024-06-05',
    vencimento: '2024-06-30',
    valor: 18750.00,
    status: 'disponivel'
  },
  {
    id: 4,
    fornecedor: 'Drogaria São Lucas',
    numero: 'NF-e 901234',
    emissao: '2024-06-12',
    vencimento: '2024-07-20',
    valor: 65000.00,
    status: 'disponivel'
  },
  {
    id: 5,
    fornecedor: 'Farmácia Popular Express',
    numero: 'NF-e 567890',
    emissao: '2024-06-07',
    vencimento: '2024-06-25',
    valor: 33200.00,
    status: 'disponivel'
  }
];

const Antecipacoes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [dateFilter, setDateFilter] = useState('');
  const [ancorFilter, setAncorFilter] = useState('');
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [showOperationDetails, setShowOperationDetails] = useState(false);
  const [showNovaAntecipacao, setShowNovaAntecipacao] = useState(false);
  const [activeTab, setActiveTab] = useState('notas');
  const [notasFiscais, setNotasFiscais] = useState(mockNotasFiscais);
  const [selectedNota, setSelectedNota] = useState(null);
  const [showOperationModal, setShowOperationModal] = useState(false);
  const [selectedOperationForModal, setSelectedOperationForModal] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatPercentage = (value) => {
    return `${value.toFixed(4)} %`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleViewDetails = (operation) => {
    setSelectedOperation(operation);
    setShowOperationDetails(true);
  };

  const handleBackToList = () => {
    setShowOperationDetails(false);
    setSelectedOperation(null);
  };

  const handleSolicitarAntecipacao = (nota) => {
    setSelectedNota(nota);
    setShowNovaAntecipacao(true);
  };

  const handleViewOperationDetails = (operation) => {
    setSelectedOperationForModal(operation);
    setShowOperationModal(true);
  };

  const filteredAntecipacoes = mockAntecipacoes.filter(item => {
    const matchesSearch = item.ancoraNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.ancoraDocumento.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || item.status === statusFilter;
    const matchesAncor = !ancorFilter || item.ancoraNome.includes(ancorFilter);
    
    return matchesSearch && matchesStatus && matchesAncor;
  });
  
  const filteredNotasFiscais = notasFiscais.filter(nota => {
    if (searchTerm) {
      return nota.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
             nota.numero.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Se uma operação foi selecionada, mostrar a tela de detalhes
  if (showOperationDetails && selectedOperation) {
    return (
      <OperationDetails 
        operation={selectedOperation} 
        onBack={handleBackToList}
      />
    );
  }
  return (
    <Container>
      <PageHeader>
        <h1>Negociações</h1>
        <p>Controle todas as operações da sua empresa</p>
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
                  <option value="todos">Todos</option>
                  <option value="pago">Pago</option>
                  <option value="antecipado">Antecipado</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Período</label>
                <input 
                  type="month" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label>Âncora</label>
                <select 
                  value={ancorFilter} 
                  onChange={(e) => setAncorFilter(e.target.value)}
                >
                  <option value="">Todas as âncoras</option>
                  <option value="TESTE">EMPRESA TESTE LTDA</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Ordenar por</label>
                <select>
                  <option value="data">Mais Recente</option>
                  <option value="valor">Maior Valor</option>
                  <option value="taxa">Maior Taxa</option>
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
            placeholder="Filtre por CNPJ ou nome do Âncora"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <ActionButtons>
          <button className="secondary">
            <Download size={16} />
            Exportar
          </button>
          <button className="primary" onClick={() => setShowNovaAntecipacao(true)}>
            <Plus size={16} />
            Nova Antecipação
          </button>
        </ActionButtons>
      </SearchSection>

      {/* Tabs para mobile */}
      <TabsContainer>
        <Tab 
          active={activeTab === 'notas'} 
          onClick={() => setActiveTab('notas')}
        >
          Notas Disponíveis
        </Tab>
        <Tab 
          active={activeTab === 'operacoes'} 
          onClick={() => setActiveTab('operacoes')}
        >
          Operações Realizadas
        </Tab>
      </TabsContainer>

      {/* Layout de duas colunas */}
      <TwoColumnLayout style={{ display: activeTab === 'notas' && window.innerWidth <= 1024 ? 'block' : null }}>
        {/* Coluna 1: Notas Fiscais Disponíveis */}
        <ColumnCard style={{ display: (activeTab === 'notas' || window.innerWidth > 1024) ? 'flex' : 'none' }}>
          <ColumnHeader>
            <h3>
              <FileText size={20} />
              Notas Fiscais Disponíveis
            </h3>
          </ColumnHeader>
          <ColumnContent>
            {filteredNotasFiscais.length > 0 ? (
              filteredNotasFiscais.map(nota => (
                <NotaFiscalItem key={nota.id}>
                  <div className="header">
                    <div className="title">{nota.fornecedor}</div>
                    <div className="number">{nota.numero}</div>
                  </div>
                  <div className="details">
                    <div className="detail-item">
                      <div className="label">Emissão</div>
                      <div className="value">{formatDate(nota.emissao)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="label">Vencimento</div>
                      <div className="value">{formatDate(nota.vencimento)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="label">Valor</div>
                      <div className="value">{formatCurrency(nota.valor)}</div>
                    </div>
                  </div>
                  <div className="footer">
                    <div className="status disponivel">
                      Disponível para Antecipação
                    </div>
                    <button 
                      className="action-button"
                      onClick={() => handleSolicitarAntecipacao(nota)}
                    >
                      Solicitar Antecipação
                    </button>
                  </div>
                </NotaFiscalItem>
              ))
            ) : (
              <EmptyColumn>
                <FileText size={48} className="icon" />
                <h4>Nenhuma nota fiscal disponível</h4>
                <p>Não foram encontradas notas fiscais disponíveis para antecipação.</p>
              </EmptyColumn>
            )}
          </ColumnContent>
        </ColumnCard>
        
        {/* Coluna 2: Operações Realizadas */}
        <ColumnCard style={{ display: (activeTab === 'operacoes' || window.innerWidth > 1024) ? 'flex' : 'none' }}>
          <ColumnHeader>
            <h3>
              <Bank size={20} />
              Operações Realizadas
            </h3>
          </ColumnHeader>
          <ColumnContent>
            {filteredAntecipacoes.length > 0 ? (
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>Operação</th>
                      <th>Âncora</th>
                      <th>Taxa Média</th>
                      <th>Valor Bruto</th>
                      <th>Valor Líquido</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAntecipacoes.map(item => (
                      <tr key={item.id}>
                        <td className="status">
                          <div className={`status-badge ${item.status}`}>
                            {item.operacao}
                          </div>
                          <div className="date">
                            {formatDate(item.dataOperacao)}
                          </div>
                        </td>
                        <td className="anchor">
                          <div className="name">{item.ancoraNome}</div>
                          <div className="document">{item.ancoraDocumento}</div>
                        </td>
                        <td className="rate">{formatPercentage(item.taxaMedia)}</td>
                        <td className="value">{formatCurrency(item.valorBruto)}</td>
                        <td className="value">{formatCurrency(item.valorLiquido)}</td>
                        <td className="actions">
                          <button 
                            title="Ver detalhes"
                            onClick={() => handleViewOperationDetails(item)}
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <EmptyColumn>
                <Bank size={48} className="icon" />
                <h4>Nenhuma operação encontrada</h4>
                <p>Não foram encontradas operações com os filtros selecionados.</p>
              </EmptyColumn>
            )}
          </ColumnContent>
        </ColumnCard>
      </TwoColumnLayout>
      
      {showNovaAntecipacao && (
        <NovaAntecipacaoModal 
          isOpen={showNovaAntecipacao}
          onClose={() => {
            setShowNovaAntecipacao(false);
            setSelectedNota(null);
          }}
          notaFiscal={selectedNota}
        />
      )}
      
      {/* Modal de Detalhes da Operação */}
      {showOperationModal && selectedOperationForModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            {/* Header do Modal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--primary-text)',
                margin: 0
              }}>
                Detalhes da Operação #{selectedOperationForModal.id}
              </h2>
              <button 
                onClick={() => setShowOperationModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--secondary-text)',
                  padding: '8px',
                  fontSize: '24px'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Corpo do Modal */}
            <div style={{
              padding: '24px',
              overflowY: 'auto',
              maxHeight: 'calc(90vh - 80px)'
            }}>
              {/* Status e Valor Principal */}
              <div style={{
                background: 'var(--background)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: selectedOperationForModal.status === 'pago' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: selectedOperationForModal.status === 'pago' ? '#22c55e' : '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CurrencyCircleDollar size={24} weight="bold" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                      Valor líquido recebido
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-text)' }}>
                      {formatCurrency(selectedOperationForModal.valorLiquido)}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  background: selectedOperationForModal.status === 'pago' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: selectedOperationForModal.status === 'pago' ? '#22c55e' : '#3b82f6'
                }}>
                  <CheckCircle size={16} weight="bold" />
                  {selectedOperationForModal.operacao}
                </div>
              </div>

              {/* Grid de Informações */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* Informações Gerais */}
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--primary-text)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Building size={20} />
                    Informações Gerais
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>Status</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedOperationForModal.operacao}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>Âncora</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedOperationForModal.ancoraNome}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>CNPJ</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedOperationForModal.ancoraDocumento}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>Data de Operação</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatDate(selectedOperationForModal.dataOperacao)}</span>
                    </div>
                  </div>
                </div>

                {/* Valores Financeiros */}
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--primary-text)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CurrencyCircleDollar size={20} />
                    Valores Financeiros
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>Taxa Média</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatPercentage(selectedOperationForModal.taxaMedia)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>Valor Bruto</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatCurrency(selectedOperationForModal.valorBruto)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>Desconto</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatCurrency(selectedOperationForModal.desconto)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>IOF</span>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatCurrency(selectedOperationForModal.iof)}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondary-text)', fontWeight: '600' }}>Valor Líquido</span>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-blue)' }}>{formatCurrency(selectedOperationForModal.valorLiquido)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Bancárias */}
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                marginBottom: '24px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--primary-text)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Bank size={20} />
                  Dados Bancários
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--secondary-text)', marginBottom: '4px' }}>Banco</div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>341 - ITAÚ UNIBANCO S.A</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--secondary-text)', marginBottom: '4px' }}>Agência</div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>2900</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--secondary-text)', marginBottom: '4px' }}>Conta</div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>75409-4</div>
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div style={{
                background: 'var(--background)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--primary-text)',
                  marginBottom: '8px'
                }}>
                  Observações
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--secondary-text)',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Operação de antecipação processada com sucesso. Todos os documentos foram validados e o pagamento foi realizado conforme acordado.
                </p>
              </div>

              {/* Botões de Ação */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)'
              }}>
                <button
                  onClick={() => setShowOperationModal(false)}
                  style={{
                    padding: '10px 16px',
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    setShowOperationModal(false);
                    handleViewDetails(selectedOperationForModal);
                  }}
                  style={{
                    padding: '10px 16px',
                    background: 'var(--primary-blue)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  Ver Detalhes Completos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Antecipacoes;