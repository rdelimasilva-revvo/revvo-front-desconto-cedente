import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Download, 
  CaretDown,
  Eye,
  Bank,
  Calendar, 
  CurrencyCircleDollar,
  CheckCircle,
  XCircle,
  ChartBar,
  ChartPie,
  ChartLine,
  Buildings
} from '@phosphor-icons/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
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

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 24px;
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  
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
        
        &.alto {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.medio {
          background: rgba(249, 115, 22, 0.1);
          color: #f97316;
        }
        
        &.baixo {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
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
const mockMetrics = {
  totalAntecipado: 2850000,
  totalDistribuidores: 12,
  totalSacados: 35,
  percentualCrescimento: 8.5
};

const mockDistribuidoresPorVolume = [
  { name: 'Distribuidora Farmacêutica Nacional', value: 850000 },
  { name: 'Distribuidora de Medicamentos Brasil', value: 650000 },
  { name: 'Distribuidora Farmacêutica Expressa', value: 450000 },
  { name: 'Distribuidora de Produtos Farmacêuticos MedPharma', value: 350000 },
  { name: 'Distribuidora Farmacêutica Global', value: 250000 },
  { name: 'Outros', value: 300000 }
];

const mockSacadosPorVolume = [
  { name: 'Farmácia Saúde Total', value: 450000 },
  { name: 'Drogaria Bem Estar', value: 350000 },
  { name: 'Farmácia Vida & Saúde', value: 300000 },
  { name: 'Drogaria São Lucas', value: 250000 },
  { name: 'Farmácia Popular Express', value: 200000 },
  { name: 'Outros', value: 1300000 }
];

const mockAntecipacoesUltimos6Meses = [
  { month: 'Jan', valor: 350000 },
  { month: 'Fev', valor: 420000 },
  { month: 'Mar', valor: 380000 },
  { month: 'Abr', valor: 510000 },
  { month: 'Mai', valor: 480000 },
  { month: 'Jun', valor: 710000 }
];

const mockOperacoesLeoMadeiras = [
  {
    id: 1,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-001',
    valorTotal: 150000,
    valorAntecipado: 142500,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-15',
    dataVencimento: '2024-08-15',
    prazoMedio: 60,
    status: 'ativo'
  },
  {
    id: 2,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-002',
    valorTotal: 185000,
    valorAntecipado: 175750,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-18',
    dataVencimento: '2024-08-18',
    prazoMedio: 60,
    status: 'ativo'
  },
  {
    id: 3,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-003',
    valorTotal: 220000,
    valorAntecipado: 209000,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-20',
    dataVencimento: '2024-08-20',
    prazoMedio: 60,
    status: 'ativo'
  },
  {
    id: 4,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-004',
    valorTotal: 195000,
    valorAntecipado: 185250,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-22',
    dataVencimento: '2024-08-22',
    prazoMedio: 60,
    status: 'ativo'
  },
  {
    id: 5,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-005',
    valorTotal: 175000,
    valorAntecipado: 166250,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-25',
    dataVencimento: '2024-08-25',
    prazoMedio: 60,
    status: 'ativo'
  },
  {
    id: 6,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-006',
    valorTotal: 160000,
    valorAntecipado: 152000,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-28',
    dataVencimento: '2024-08-28',
    prazoMedio: 60,
    status: 'ativo'
  },
  {
    id: 7,
    cliente: 'LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.',
    cnpjCliente: '12.345.678/0001-90',
    numeroOperacao: 'OP-2024-007',
    valorTotal: 140000,
    valorAntecipado: 133000,
    taxaDesconto: 2.5,
    dataOperacao: '2024-06-30',
    dataVencimento: '2024-08-30',
    prazoMedio: 60,
    status: 'ativo'
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnaliseFinanciador = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredOperacoes, setFilteredOperacoes] = useState(mockOperacoesLeoMadeiras);

  // Filter data based on search term and filters
  useEffect(() => {
    let filtered = mockOperacoesLeoMadeiras;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.numeroOperacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.dataOperacao);
        return itemDate.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
      });
    }

    setFilteredOperacoes(filtered);
  }, [searchTerm, statusFilter, dateFilter]);

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
    setStatusFilter('');
    setDateFilter('');
  };

  return (
    <Container>
      <PageHeader>
        <h1>Operações Recentes</h1>
        <p>LEO MADEIRAS, MAQUINAS E FERRAGENS S.A.</p>
      </PageHeader>

      {/* Métricas */}
      <DashboardGrid>
        <MetricCard>
          <div className="header">
            <div className="icon blue">
              <CurrencyCircleDollar size={24} weight="bold" />
            </div>
            <h3>Total Antecipado</h3>
          </div>
          <div className="value">{formatCurrency(mockMetrics.totalAntecipado)}</div>
          <div className="subtitle">Valor total antecipado</div>
          <div className="trend up">
            <ChartLine size={16} />
            +{mockMetrics.percentualCrescimento}% vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon green">
              <Buildings size={24} weight="bold" />
            </div>
            <h3>Distribuidores</h3>
          </div>
          <div className="value">{mockMetrics.totalDistribuidores}</div>
          <div className="subtitle">Distribuidores ativos</div>
          <div className="trend up">
            <ChartLine size={16} />
            +2 vs mês anterior
          </div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon orange">
              <Bank size={24} weight="bold" />
            </div>
            <h3>Sacados</h3>
          </div>
          <div className="value">{mockMetrics.totalSacados}</div>
          <div className="subtitle">Sacados ativos</div>
          <div className="trend up">
            <ChartLine size={16} />
            +5 vs mês anterior
          </div>
        </MetricCard>
      </DashboardGrid>

      {/* Gráficos */}
      <ChartGrid>
        <ChartCard>
          <h3>Antecipações nos Últimos 6 Meses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAntecipacoesUltimos6Meses}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => 
                  value >= 1000000 
                    ? `${(value / 1000000).toFixed(1)}M` 
                    : value >= 1000 
                    ? `${(value / 1000).toFixed(0)}K` 
                    : value
                } 
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), "Valor Antecipado"]}
              />
              <Bar dataKey="valor" fill="#0070F2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <h3>Distribuição por Cedente</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockDistribuidoresPorVolume}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
              >
                {mockDistribuidoresPorVolume.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartGrid>

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
                  <option value="">Todos os status</option>
                  <option value="ativo">Ativo</option>
                  <option value="pendente">Pendente</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Data da Operação</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
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
            placeholder="Buscar por número de operação"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <ActionButtons>
          <button className="secondary" onClick={handleClearFilters}>
            <FunnelSimple size={16} />
            Limpar Filtros
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
          <h3>Lista de Operações</h3>
          <div className="table-info">
            {filteredOperacoes.length} registros
          </div>
        </div>

        <div className="table-responsive">
          {filteredOperacoes.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Operação</th>
                  <th>Valor Total</th>
                  <th>Valor Antecipado</th>
                  <th>Taxa</th>
                  <th>Data Operação</th>
                  <th>Vencimento</th>
                  <th>Prazo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOperacoes.map(item => (
                  <tr key={item.id}>
                    <td style={{fontWeight: 600, color: 'var(--primary-blue)'}}>{item.numeroOperacao}</td>
                    <td>{formatCurrency(item.valorTotal)}</td>
                    <td>{formatCurrency(item.valorAntecipado)}</td>
                    <td>{item.taxaDesconto}% a.m.</td>
                    <td>{formatDate(item.dataOperacao)}</td>
                    <td>{formatDate(item.dataVencimento)}</td>
                    <td>{item.prazoMedio} dias</td>
                    <td className="status">
                      <span className={`status-badge ${item.status}`} style={{
                        background: item.status === 'ativo' ? '#dcfce7' : item.status === 'pendente' ? '#fef3c7' : '#e0e7ff',
                        color: item.status === 'ativo' ? '#16a34a' : item.status === 'pendente' ? '#d97706' : '#4f46e5'
                      }}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="actions">
                      <button title="Ver detalhes">
                        <Eye size={16} />
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
              <h4>Nenhuma operação encontrada</h4>
              <p>Não foram encontradas operações com os filtros selecionados.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>
    </Container>
  );
};

export default AnaliseFinanciador;