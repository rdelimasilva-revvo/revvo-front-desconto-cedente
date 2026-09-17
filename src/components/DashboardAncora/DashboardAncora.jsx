import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendUp, Clock, CheckCircle, Percent, FileText, CurrencyCircleDollar, Building } from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f8f9fa;
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
    color: var(--secondary-text);
    font-size: 14px;
  }
`;

const IndicatorsSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  padding: 8px 16px;
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
    justify-content: space-between;
    align-items: center;
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

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
`;

const TopSuppliersCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: 100%;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 16px;
  }
`;

const SupplierItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  .supplier-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .rank {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--primary-blue);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .name {
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text);
    }
  }

  .value {
    font-size: 13px;
    font-weight: 600;
    color: var(--primary-blue);
  }
`;

const FeedSection = styled.div`
  margin-top: 32px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 24px;
  }
`;

const OperationItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 0.8fr 0.8fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-blue);
    box-shadow: 0 2px 8px rgba(0, 112, 242, 0.1);
  }

  .operation-field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .field-label {
      font-size: 11px;
      color: var(--secondary-text);
      font-weight: 500;
      text-transform: uppercase;
    }

    .field-value {
      font-size: 14px;
      color: var(--primary-text);
      font-weight: 500;

      &.fornecedor {
        font-weight: 600;
        color: #0070F2;
      }

      &.valor {
        font-weight: 600;
        color: #22c55e;
      }
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;

    &.aprovado {
      background: #dcfce7;
      color: #16a34a;
    }

    &.em_analise {
      background: #fef3c7;
      color: #d97706;
    }

    &.pendente {
      background: #f3f4f6;
      color: #6b7280;
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    .operation-field:nth-child(n+3) {
      grid-column: span 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OperationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OperationsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 0.8fr 0.8fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;

  .header-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text);
    text-transform: uppercase;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

// Mock data
const mockIndicators = {
  totalDisponivel: 185000,
  totalAprovacao: 145000,
  totalAntecipado: 120000,
  ticketMedio: 125000
};

const mockMonthlyData = [
  { month: 'Jan', valorReceber: 120000, valorAntecipado: 85000 },
  { month: 'Fev', valorReceber: 145000, valorAntecipado: 92000 },
  { month: 'Mar', valorReceber: 130000, valorAntecipado: 78000 },
  { month: 'Abr', valorReceber: 165000, valorAntecipado: 110000 },
  { month: 'Mai', valorReceber: 180000, valorAntecipado: 125000 },
  { month: 'Jun', valorReceber: 175000, valorAntecipado: 118000 }
];

const topSuppliers = [
  { rank: 1, name: 'Madeireira São Paulo', value: 'R$ 85.400,00' },
  { rank: 2, name: 'Ferragens Paraná Ltda', value: 'R$ 72.300,00' },
  { rank: 3, name: 'Compensados Premium', value: 'R$ 68.900,00' },
  { rank: 4, name: 'Parafusos & Ferramentas Brasil', value: 'R$ 61.200,00' },
  { rank: 5, name: 'Fórmica Center', value: 'R$ 54.800,00' }
];

const mockRecentOperations = [
  {
    id: 1,
    fornecedor: 'Madeireira São Paulo',
    nf: 'NF-2024-001234',
    valor: 35000,
    taxa: 2.3,
    prazo: 45,
    status: 'aprovado',
    data: '2024-06-15'
  },
  {
    id: 2,
    fornecedor: 'Ferragens Paraná Ltda',
    nf: 'NF-2024-001189',
    valor: 38000,
    taxa: 2.5,
    prazo: 60,
    status: 'aprovado',
    data: '2024-06-14'
  },
  {
    id: 3,
    fornecedor: 'Compensados Premium',
    nf: 'NF-2024-001156',
    valor: 32000,
    taxa: 2.2,
    prazo: 30,
    status: 'aprovado',
    data: '2024-06-13'
  },
  {
    id: 4,
    fornecedor: 'Parafusos & Ferramentas Brasil',
    nf: 'NF-2024-001098',
    valor: 37000,
    taxa: 2.4,
    prazo: 45,
    status: 'aprovado',
    data: '2024-06-12'
  },
  {
    id: 5,
    fornecedor: 'Fórmica Center',
    nf: 'NF-2024-001045',
    valor: 34000,
    taxa: 2.3,
    prazo: 50,
    status: 'em_analise',
    data: '2024-06-11'
  },
  {
    id: 6,
    fornecedor: 'Colas & Adesivos Industriais',
    nf: 'NF-2024-000987',
    valor: 36000,
    taxa: 2.6,
    prazo: 60,
    status: 'aprovado',
    data: '2024-06-10'
  },
  {
    id: 7,
    fornecedor: 'Ferramentas Express',
    nf: 'NF-2024-000923',
    valor: 33000,
    taxa: 2.4,
    prazo: 45,
    status: 'aprovado',
    data: '2024-06-09'
  },
  {
    id: 8,
    fornecedor: 'Madeiras Nobres do Brasil',
    nf: 'NF-2024-000876',
    valor: 39000,
    taxa: 2.1,
    prazo: 30,
    status: 'aprovado',
    data: '2024-06-08'
  }
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatShortCurrency = (value) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  }
  return formatCurrency(value);
};

const DashboardAncora = () => {
  return (
    <Container>
      <PageHeader>
        <h1>Dashboard - Visão do Âncora</h1>
        <p>Acompanhe as operações e fornecedores</p>
      </PageHeader>

      {/* Indicadores */}
      <IndicatorsSection>
        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <TrendUp size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">{formatCurrency(mockIndicators.totalDisponivel)}</div>
          </div>
          <div className="label-change-container">
            <div className="label">Limite Total</div>
            <div className="change positive">
              <span>+5.2%</span>
              <span>vs mês anterior</span>
            </div>
          </div>
        </IndicatorCard>

        <IndicatorCard>
          <div className="icon-value-container">
            <div className="icon">
              <Clock size={24} weight="bold" color="#333333" />
            </div>
            <div className="value">{formatCurrency(mockIndicators.totalAprovacao)}</div>
          </div>
          <div className="label-change-container">
            <div className="label">Em Aprovação</div>
            <div className="change positive">
              <span>+3.4%</span>
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
            <h3>Top 5 Fornecedores em Antecipações</h3>
            {topSuppliers.map(supplier => (
              <SupplierItem key={supplier.rank}>
                <div className="supplier-info">
                  <div className="rank">{supplier.rank}</div>
                  <div className="name">{supplier.name}</div>
                </div>
                <div className="value">{supplier.value}</div>
              </SupplierItem>
            ))}
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
                <Building size={20} weight="bold" color="#333333" />
              </div>
              <div className="value">32</div>
            </div>
            <div className="label-change-container">
              <div className="label">Fornecedores ativos</div>
            </div>
          </CompactIndicatorCard>
        </div>
      </DashboardSection>

      {/* Feed de Antecipações */}
      <FeedSection>
        <h2>Feed de antecipações</h2>

        <OperationsHeader>
          <div className="header-label">Fornecedor</div>
          <div className="header-label">Nota Fiscal</div>
          <div className="header-label">Valor</div>
          <div className="header-label">Taxa</div>
          <div className="header-label">Prazo</div>
          <div className="header-label">Status</div>
          <div className="header-label">Data</div>
        </OperationsHeader>

        <OperationsList>
          {mockRecentOperations.map(operation => (
            <OperationItem key={operation.id}>
              <div className="operation-field">
                <div className="field-label">Fornecedor</div>
                <div className="field-value fornecedor">{operation.fornecedor}</div>
              </div>
              <div className="operation-field">
                <div className="field-label">Nota Fiscal</div>
                <div className="field-value">{operation.nf}</div>
              </div>
              <div className="operation-field">
                <div className="field-label">Valor</div>
                <div className="field-value valor">{formatCurrency(operation.valor)}</div>
              </div>
              <div className="operation-field">
                <div className="field-label">Taxa</div>
                <div className="field-value">{operation.taxa}%</div>
              </div>
              <div className="operation-field">
                <div className="field-label">Prazo</div>
                <div className="field-value">{operation.prazo} dias</div>
              </div>
              <div className="operation-field">
                <div className="field-label">Status</div>
                <div className={`status-badge ${operation.status}`}>
                  {operation.status === 'aprovado' ? 'Aprovado' :
                   operation.status === 'em_analise' ? 'Em Análise' : 'Pendente'}
                </div>
              </div>
              <div className="operation-field">
                <div className="field-label">Data</div>
                <div className="field-value">
                  {new Date(operation.data).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </OperationItem>
          ))}
        </OperationsList>
      </FeedSection>
    </Container>
  );
};

export default DashboardAncora;
