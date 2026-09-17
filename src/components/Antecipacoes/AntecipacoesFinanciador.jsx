import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Download, 
  Plus, 
  DotsThreeVertical,
  TrendUp,
  Clock,
  Bank,
  CaretDown,
  CurrencyCircleDollar,
  Calendar,
  ChartLine
} from '@phosphor-icons/react';
import OperationDetails from './OperationDetails';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Select from 'react-select';
import NovaAntecipacaoModal from './NovaAntecipacaoModal';
import styledMenu from 'styled-components';

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
  /* overflow: hidden;  Removido para permitir que o menu suspenso apareça */
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h3 {
      font-size: 16px;
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
    overflow-y: visible !important;
    width: 100%;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    scrollbar-width: thin; /* For Firefox */
    position: relative;
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
  min-width: 1100px; /* Ensure minimum width for table */

  th {
    background: var(--background);
    padding: 12px 24px;
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

// Mock data
const mockMetrics = {
  volumeTotal: 2850000,
  duracaoMedia: 45,
  limitesEmAberto: 1250000,
  limitesTomados: 1600000
};

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

const MenuWrapper = styledMenu.div`
  position: relative;
`;

const DropdownMenu = styledMenu.div`
  position: fixed;
  top: ${props => props.menuTop || 0}px;
  left: ${props => props.menuLeft || 0}px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  min-width: 180px;
  z-index: 9999;
  padding: 8px;
  pointer-events: auto;

  display: flex;
  flex-direction: column;
  button {
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
    font-size: 14px;
    color: var(--primary-text);
    cursor: pointer;
    transition: background 0.2s;
    display: block;
    &:hover {
      background: var(--background);
      border: 1px solid var(--border-color);
    }
    &:last-child {
      border: 1px solid var(--border-color);
    }
  }
`;

const AntecipacoesFinanciador = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [dateFilter, setDateFilter] = useState('');
  const [ancorFilter, setAncorFilter] = useState('');
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [showOperationDetails, setShowOperationDetails] = useState(false);
  const [showNovaAntecipacao, setShowNovaAntecipacao] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 });

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

  const filteredAntecipacoes = mockAntecipacoes.filter(item => {
    const matchesSearch = item.ancoraNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.ancoraDocumento.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || item.status === statusFilter;
    const matchesAncor = !ancorFilter || item.ancoraNome.includes(ancorFilter);
    
    return matchesSearch && matchesStatus && matchesAncor;
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
        <h1>Gestão da Carteira</h1>
        <p>Controle todas as operações da sua empresa</p>
      </PageHeader>

      {/* Métricas */}
      <MetricsContainer>
        <MetricCard>
          <div className="header">
            <div className="icon blue">
              <CurrencyCircleDollar size={24} weight="bold" />
            </div>
            <h3>Volume Total</h3>
          </div>
          <div className="value">{formatCurrency(mockMetrics.volumeTotal)}</div>
          <div className="subtitle">em operações ativas</div>
          <div className="trend up">
            <ChartLine size={16} />
            +12.5% vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon green">
              <Clock size={24} weight="bold" />
            </div>
            <h3>Duração Média</h3>
          </div>
          <div className="value">{mockMetrics.duracaoMedia} dias</div>
          <div className="subtitle">tempo médio das operações</div>
          <div className="trend down">
            <ChartLine size={16} />
            -3 dias vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon orange">
              <Bank size={24} weight="bold" />
            </div>
            <h3>Limites em Aberto</h3>
          </div>
          <div className="value">{formatCurrency(mockMetrics.limitesEmAberto)}</div>
          <div className="subtitle">disponível para antecipação</div>
          <div className="trend up">
            <ChartLine size={16} />
            +8.2% vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon purple">
              <TrendUp size={24} weight="bold" />
            </div>
            <h3>Limites Tomados</h3>
          </div>
          <div className="value">{formatCurrency(mockMetrics.limitesTomados)}</div>
          <div className="subtitle">já utilizados pelos clientes</div>
          <div className="trend up">
            <ChartLine size={16} />
            +15.3% vs mês anterior
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

      {/* Tabela */}
      <TableSection>
        <div className="table-header">
          <h3>Operações</h3>
          <div className="table-info">
            {filteredAntecipacoes.length} registros
          </div>
        </div>

        <div className="table-responsive">
          {filteredAntecipacoes.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Operação</th>
                  <th>Âncora</th>
                  <th>Taxa Média</th>
                  <th>Valor Bruto (R$)</th>
                  <th>Desconto (R$)</th>
                  <th>IOF (R$)</th>
                  <th>Valor Líquido (R$)</th>
                  <th>Ações</th>
                </tr>
              </thead>            <tbody>
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
                    <td className="value">{formatCurrency(item.desconto)}</td>
                    <td className="value">{formatCurrency(item.iof)}</td>
                    <td className="value">{formatCurrency(item.valorLiquido)}</td>
                    <td className="actions">
                      <MenuWrapper>
                        <button 
                          title="Ações"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onClick={e => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const menuWidth = 180;
                            const left = Math.max(rect.left - menuWidth, 8);
                            setMenuCoords({
                              top: rect.bottom + 4,
                              left
                            });
                            setOpenMenuId(openMenuId === item.id ? null : item.id);
                          }}
                        >
                          <DotsThreeVertical size={20} />
                        </button>
                        {openMenuId === item.id && (
                          <DropdownMenu 
                            menuTop={menuCoords.top} 
                            menuLeft={menuCoords.left}
                            onClick={e => e.stopPropagation()}
                          >
                            <button onClick={() => { setOpenMenuId(null); handleViewDetails(item); }}>Detalhes</button>
                            <button onClick={() => setOpenMenuId(null)}>Termo de cessão</button>
                          </DropdownMenu>
                        )}
                      </MenuWrapper>
                    </td>
                  </tr>
                ))}
              </tbody>            </Table>
          ) : (
            <EmptyState>
              <div className="icon">
                <Bank size={48} />
              </div>
              <h4>Nenhuma antecipação encontrada</h4>
              <p>Não foram encontradas operações com os filtros selecionados.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>
      {showNovaAntecipacao && (
        <NovaAntecipacaoModal 
          isOpen={showNovaAntecipacao}
          onClose={() => setShowNovaAntecipacao(false)}
        />
      )}
    </Container>
  );
};

export default AntecipacoesFinanciador;