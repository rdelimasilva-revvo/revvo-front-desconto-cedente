import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendUp, Clock, CheckCircle, MagnifyingGlass, Funnel, SquaresFour, List, GridNine, CurrencyCircleDollar, Percent, FileText, Bank } from '@phosphor-icons/react';
import ClientCard from '../RiscoSacado/ClientCard';
import ClientDetails from '../RiscoSacado/ClientDetails';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f8f9fa;
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
    color: var(--secondary-text);
    font-size: 16px;
  }
`;

const IndicatorsSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const IndicatorCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
  }
  .icon-value-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .label-change-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
  .icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
    background: rgba(51,51,51,0.07);
    color: #333333;
  }
  .value {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-text);
  }
  .label {
    font-size: 14px;
    color: var(--secondary-text);
    font-weight: 500;
  }
  .change {
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    &.positive {
      color: #22c55e;
    }
    &.negative {
      color: #ef4444;
    }
  }
`;

const DashboardSection = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
  .chart-card {
    grid-row: 1 / -1;
  }
  .top-suppliers-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
  }
  .right-cards-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    .top-suppliers-col, .right-cards-col {
      flex-direction: row;
      > * {
        flex: 1;
      }
    }
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
`;

const TopSuppliersCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  min-height: unset;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
    flex-shrink: 0;
  }
`;

const SuppliersScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: -8px;
  padding-right: 8px;
  max-height: 240px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const SupplierItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  .supplier-info {
    .name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text);
      margin-bottom: 4px;
    }
    
    .percentage {
      font-size: 12px;
      color: var(--secondary-text);
    }
  }
  
  .value {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
  }
`;

const ClientsSection = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 24px;
  }
`;

const FiltersSection = styled.div`
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

const FilterSelect = styled.select`
  padding: 0px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: var(--primary-text);
  cursor: pointer;
  height: 40px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  &.card-small {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  &.list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 1200px) {
    &.card-large {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }

    &.card-small {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }

  @media (max-width: 768px) {
    &.card-large, &.card-small {
      grid-template-columns: 1fr;
    }
  }
`;

const OperationsTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr 0.8fr;
  gap: 16px;
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 14px;
  color: var(--secondary-text);
  text-transform: uppercase;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 0.8fr;

    .hide-mobile {
      display: none;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr 0.8fr;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  transition: background 0.2s ease;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8f9fa;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 0.8fr;

    .hide-mobile {
      display: none;
    }
  }
`;

const OperationCell = styled.div`
  font-size: 14px;
  color: var(--primary-text);

  &.operation-number {
    font-weight: 600;
    color: var(--primary-blue);
  }

  &.value {
    font-weight: 600;
  }

  &.date {
    color: var(--secondary-text);
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  &.ativo {
    background: #dcfce7;
    color: #16a34a;
  }

  &.pendente {
    background: #fef3c7;
    color: #d97706;
  }

  &.concluido {
    background: #e0e7ff;
    color: #4f46e5;
  }
`;

const ViewOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }
  
  .view-options {
    display: flex;
    gap: 8px;
    background: white;
    padding: 4px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--secondary-text);
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: var(--background);
        color: var(--primary-text);
      }
      
      &.active {
        background: var(--primary-blue);
        color: white;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    
    .view-options {
      align-self: flex-end;
    }
  }
`;

const CompactIndicatorCard = styled(IndicatorCard)`
  padding: 6px 10px;
  .icon-value-container {
    gap: 6px;
    margin-bottom: 4px;
  }
  .icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  .value {
    font-size: 20px;
  }
  .label {
    font-size: 14px;
  }
`;

// Mock data for the dashboard
const mockIndicators = {
  totalDisponivel: 15750000,
  totalAprovacao: 2850000,
  totalAntecipado: 8420000,
  ticketMedio: 125000
};

const mockMonthlyData = [
  { month: 'Jan', valorReceber: 1200000, valorAntecipado: 850000 },
  { month: 'Fev', valorReceber: 1450000, valorAntecipado: 920000 },
  { month: 'Mar', valorReceber: 1300000, valorAntecipado: 780000 },
  { month: 'Abr', valorReceber: 1650000, valorAntecipado: 1100000 },
  { month: 'Mai', valorReceber: 1800000, valorAntecipado: 1250000 },
  { month: 'Jun', valorReceber: 1750000, valorAntecipado: 1180000 },
  { month: 'Jul', valorReceber: 1900000, valorAntecipado: 1300000 },
  { month: 'Ago', valorReceber: 2100000, valorAntecipado: 1450000 },
  { month: 'Set', valorReceber: 1850000, valorAntecipado: 1200000 },
  { month: 'Out', valorReceber: 2200000, valorAntecipado: 1550000 },
  { month: 'Nov', valorReceber: 2050000, valorAntecipado: 1400000 },
  { month: 'Dez', valorReceber: 2300000, valorAntecipado: 1600000 },
  { month: 'Jan+1', valorReceber: 2450000, valorAntecipado: 1650000 }
];

const mockTopSuppliers = [
  { name: 'Madeireira São Paulo', value: 2850000, percentage: 18.5 },
  { name: 'Ferragens Paraná Ltda', value: 2420000, percentage: 15.7 },
  { name: 'Compensados Premium', value: 1980000, percentage: 12.8 },
  { name: 'Parafusos & Ferramentas Brasil', value: 1650000, percentage: 10.7 },
  { name: 'Fórmica Center', value: 1420000, percentage: 9.2 }
];

const mockClients = [
  {
    id: 1,
    nome: 'Madeireira São Paulo',
    valorDisponivel: 150000,
    valorAntecipado: 95000,
    status: 'ativo',
    ultimaOperacao: '2024-06-01'
  },
  {
    id: 2,
    nome: 'Ferragens Paraná Ltda',
    valorDisponivel: 180000,
    valorAntecipado: 120000,
    status: 'ativo',
    ultimaOperacao: '2024-06-03'
  },
  {
    id: 3,
    nome: 'Compensados Premium',
    valorDisponivel: 120000,
    valorAntecipado: 75000,
    status: 'pendente',
    ultimaOperacao: '2024-05-28'
  },
  {
    id: 4,
    nome: 'Parafusos & Ferramentas Brasil',
    valorDisponivel: 200000,
    valorAntecipado: 140000,
    status: 'ativo',
    ultimaOperacao: '2024-06-05'
  },
  {
    id: 5,
    nome: 'Fórmica Center',
    valorDisponivel: 90000,
    valorAntecipado: 60000,
    status: 'ativo',
    ultimaOperacao: '2024-06-02'
  },
  {
    id: 6,
    nome: 'Ferragens & Cola Industriais',
    valorDisponivel: 75000,
    valorAntecipado: 50000,
    status: 'inativo',
    ultimaOperacao: '2024-05-15'
  }
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatShortCurrency = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
};

const DashboardFinanciador = () => {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [viewMode, setViewMode] = useState('card-small');

  // Filter clients based on search term and status
  useEffect(() => {
    let filtered = clients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(client => client.status === statusFilter);
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter]);

  const handleViewClientDetails = (client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleBackToList = () => {
    setShowClientDetails(false);
    setSelectedClient(null);
  };

  if (showClientDetails && selectedClient) {
    return (
      <ClientDetails 
        client={selectedClient} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <Container>
      <PageHeader>
        <h1>Dashboard das Negociações</h1>
        <p>Acompanhe seus recebíveis descontados e controle sua carteira de crédito de farmácias</p>
      </PageHeader>
      
      {/* Indicadores Macro */}
      <IndicatorsSection>
        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <Bank size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">{formatCurrency(mockIndicators.totalDisponivel)}</div>
          </div>
          <div className="label-change-container">
            <div className="label">Limite Total Contratado</div>
            <div className="change positive">
              <span>+5.2%</span>
              <span>vs mês anterior</span>
            </div>
          </div>
        </IndicatorCard>

        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <TrendUp size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">{formatCurrency(mockIndicators.totalDisponivel - mockIndicators.totalAntecipado)}</div>
          </div>
          <div className="label-change-container">
            <div className="label">Limite Disponível</div>
            <div className="change negative">
              <span>-2.1%</span>
              <span>vs mês anterior</span>
            </div>
          </div>
        </IndicatorCard>

        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <CheckCircle size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">{formatCurrency(mockIndicators.totalAntecipado)}</div>
          </div>
          <div className="label-change-container">
            <div className="label">Total Antecipado</div>
            <div className="change positive">
              <span>+8.7%</span>
              <span>vs mês anterior</span>
            </div>
          </div>
        </IndicatorCard>

        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <Percent size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">2,5% ao mês</div>
          </div>
          <div className="label-change-container">
            <div className="label">Taxa média ( últimos 3 meses ) </div>
          </div>
        </IndicatorCard>

        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <Clock size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">45 dias</div>
          </div>
          <div className="label-change-container">
            <div className="label">Prazo Médio</div>
          </div>
        </IndicatorCard>
      </IndicatorsSection>
      
      {/* Dashboard */}
      <DashboardSection>
        <ChartCard className="chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Valores a Receber x Valores Antecipados</h3>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 16 }}>
                <span style={{ width: 16, height: 8, background: '#3b82f6', display: 'inline-block', borderRadius: 2, marginRight: 4 }}></span>
                <span style={{ color: '#3b82f6', fontSize: 14 }}>Valores a Receber</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ width: 16, height: 8, background: '#22c55e', display: 'inline-block', borderRadius: 2, marginRight: 4 }}></span>
                <span style={{ color: '#22c55e', fontSize: 14 }}>Valores Antecipados</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockMonthlyData} margin={{ top: 20, right: 30, left: 20, bottom: -10}}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => formatShortCurrency(value)}
              />
              <Tooltip 
                formatter={(value, name) => [
                  formatCurrency(value), 
                  name === 'valorReceber' ? 'Valores a Receber' : 'Valores Antecipados'
                ]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Bar dataKey="valorReceber" fill="#3b82f6" name="Valores a Receber" radius={[4, 4, 0, 0]} />
              <Bar dataKey="valorAntecipado" fill="#22c55e" name="Valores Antecipados" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <div className="top-suppliers-col">
          <TopSuppliersCard>
            <h3>Antecipações</h3>
            <SuppliersScrollContainer>
              {mockTopSuppliers.map((supplier, index) => (
                <SupplierItem key={index}>
                  <div className="supplier-info">
                    <div className="name">{supplier.name}</div>
                    <div className="percentage">{supplier.percentage}% do total</div>
                  </div>
                  <div className="value">{formatCurrency(supplier.value)}</div>
                </SupplierItem>
              ))}
            </SuppliersScrollContainer>
          </TopSuppliersCard>
        </div>
        
        <div className="right-cards-col">
          <CompactIndicatorCard>
            <div className="icon-value-container">
              <div className="icon">
                <FileText size={24} weight="bold" color="#333333" />
              </div>
              <div className="value">5</div>
            </div>
            <div className="label-change-container">
              <div className="label">Aguardando assinatura</div>
            </div>
          </CompactIndicatorCard>
          <CompactIndicatorCard>
            <div className="icon-value-container">
              <div className="icon">
                <CurrencyCircleDollar size={20} weight="bold" color="#333333" />
              </div>
              <div className="value">4</div>
            </div>
            <div className="label-change-container">
              <div className="label">Bancos que autorizaram</div>
            </div>
          </CompactIndicatorCard>
        </div>
      </DashboardSection>

      {/* Tabela de Clientes */}
      <ClientsSection>
        <ViewOptionsContainer>
          <h2>Antecipações</h2>
            <div className="view-options">
            <button
              className={viewMode === 'card-small' ? 'active' : ''}
              onClick={() => setViewMode('card-small')}
              title="Cards Pequenos"
            >
              <GridNine size={20} />
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="Visualização em Lista"
            >
              <List size={20} />
            </button>
          </div>
        </ViewOptionsContainer>

        <FiltersSection>
          <SearchInput>
            <MagnifyingGlass size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome da farmácia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="pendente">Pendente</option>
            <option value="inativo">Inativo</option>
          </FilterSelect>
        </FiltersSection>

        <ClientsGrid className={viewMode}>
          {filteredClients.map(client => (
            <ClientCard
              key={client.id}
              client={client}
              onViewDetails={handleViewClientDetails}
              viewMode={viewMode}
            />
          ))}
        </ClientsGrid>

        {filteredClients.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            color: 'var(--secondary-text)',
            fontSize: '16px'
          }}>
            Nenhuma farmácia encontrada com os filtros aplicados.
          </div>
        )}
      </ClientsSection>
    </Container>
  );
};

export default DashboardFinanciador;