import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, TrendUp, Clock, CheckCircle, Download, Funnel, X, CurrencyCircleDollar, Calendar, FileText, Bank } from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';
import { useAccountsPayable } from './useAccountsPayable';

const Container = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  
  .back-button {
    background: none;
    border: none;
    padding: 8px;
    margin-right: 16px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--secondary-text);
    
    &:hover {
      background: var(--background);
      color: var(--primary-text);
    }
  }
  
  .client-info {
    h1 {
      font-size: 28px;
      font-weight: 600;
      color: var(--primary-text);
      margin-bottom: 4px;
    }
    
    p {
      color: var(--secondary-text);
      font-size: 16px;
    }
  }
`;

const IndicatorsColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 8px;
  height: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
  }
`;

const IndicatorCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 8px 8px 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  &:hover {
    transform: translateY(-2px);
  }
  .icon-value-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
    width: 100%;
  }
  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #f3f4f6;
    color: #1a1a1a;
    margin-bottom: 4px;
  }
  .value {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-text);
    text-align: left;
  }
  .label-change-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 2px;
    text-align: left;
  }
  .label {
    font-size: 12px;
    color: var(--secondary-text);
    font-weight: 500;
    text-align: left;
  }
  .change {
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-start;
    text-align: left;
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
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
  min-height: 240px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 24px;
    width: 100%;
    text-align: center;
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
    
    .table-actions {
      display: flex;
      gap: 12px;
      
      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        
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
    }
  }
    .table-scroll-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* Para melhor scroll em dispositivos iOS */
    max-width: 100%;
    margin-bottom: 16px;
    border-radius: 8px;
    position: relative;
    
    /* Indica que há mais conteúdo para scrollar */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 8px;
      background: linear-gradient(to right, rgba(255,255,255,0), rgba(0,0,0,0.05));
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    
    &:hover::after {
      opacity: 1;
    }
    
    &::-webkit-scrollbar {
      height: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 900px; /* Garante que a tabela não fique comprimida demais */
  border-collapse: collapse;
  
  th {
    background: var(--background);
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 13px;
    color: var(--secondary-text);
    border-bottom: 1px solid var(--border-color);
    
    &:first-child {
      border-top-left-radius: 8px;
    }
    
    &:last-child {
      border-top-right-radius: 8px;
    }
  }
  
  td {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--primary-text);
    
    &.status {
      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
          &.antecipado {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.em_analise {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }
        
        &.vencido {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        &.solicitado {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        
        &.paga {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.a_vencer {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        
        &.vencida {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }
  }
  
  tbody tr:hover {
    background: var(--background);
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  select, input {
    padding: 0px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 14px;
    background: white;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  
  .header-content {
    flex: 1;
    
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-text);
      margin-bottom: 4px;
    }
    
    p {
      color: var(--secondary-text);
      font-size: 14px;
    }
  }
  
  .close-button {
    background: none;
    border: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    color: var(--secondary-text);
    
    &:hover {
      background: var(--background);
      color: var(--primary-text);
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const StatusDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 12px;
  background: var(--background);
  
  .status-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }
  
  .status-content {
    text-align: center;
    
    .status-label {
      font-size: 14px;
      color: var(--secondary-text);
      margin-bottom: 4px;
    }
    
    .status-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--primary-text);
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const ClickableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: var(--background);
  }
`;

// Mock data para o cliente específico
const mockClientIndicators = {
  totalDisponivel: 750000,
  totalAprovacao: 125000,
  totalAntecipado: 485000
};

const mockMonthlyData = [
  { month: 'Jan', valorReceber: 65000, valorAntecipado: 42000 },
  { month: 'Fev', valorReceber: 78000, valorAntecipado: 51000 },
  { month: 'Mar', valorReceber: 71000, valorAntecipado: 46000 },
  { month: 'Abr', valorReceber: 89000, valorAntecipado: 58000 },
  { month: 'Mai', valorReceber: 95000, valorAntecipado: 62000 },
  { month: 'Jun', valorReceber: 87000, valorAntecipado: 57000 },
  { month: 'Jul', valorReceber: 102000, valorAntecipado: 67000 },
  { month: 'Ago', valorReceber: 115000, valorAntecipado: 75000 },
  { month: 'Set', valorReceber: 93000, valorAntecipado: 61000 },
  { month: 'Out', valorReceber: 108000, valorAntecipado: 70000 },
  { month: 'Nov', valorReceber: 96000, valorAntecipado: 63000 },
  { month: 'Dez', valorReceber: 112000, valorAntecipado: 73000 },
  { month: 'Jan+1', valorReceber: 118000, valorAntecipado: 77000 }
];

const mockAccountsPayable = [
  {
    id: 1,
    invoice_number: 12345,
    due_date: '2024-07-15',
    gross_value: 25000,
    duplicate_number: 1,
    parcel_value: 25000,
    parcel_due_date: '2024-07-15',
    status: 'solicitado',
    payment_status: 'a_vencer',
    funding_source: 'Caixa próprio'
  },
  {
    id: 2,
    invoice_number: 12346,
    due_date: '2024-07-20',
    gross_value: 45000,
    duplicate_number: 1,
    parcel_value: 22500,
    parcel_due_date: '2024-07-20',
    status: 'antecipado',
    payment_status: 'a_vencer',
    funding_source: 'Banco X'
  },
  {
    id: 3,
    invoice_number: 12346,
    due_date: '2024-07-20',
    gross_value: 45000,
    duplicate_number: 2,
    parcel_value: 22500,
    parcel_due_date: '2024-08-20',
    status: 'em_analise',
    payment_status: 'a_vencer',
    funding_source: 'Banco Y'
  },
  {
    id: 4,
    invoice_number: 12347,
    due_date: '2024-06-30',
    gross_value: 15000,
    duplicate_number: 1,
    parcel_value: 15000,
    parcel_due_date: '2024-06-30',
    status: 'solicitado',
    payment_status: 'vencida',
    funding_source: 'Caixa próprio'
  },
  {
    id: 5,
    invoice_number: 12348,
    due_date: '2024-07-10',
    gross_value: 35000,
    duplicate_number: 1,
    parcel_value: 35000,
    parcel_due_date: '2024-07-10',
    status: 'antecipado',
    payment_status: 'paga',
    funding_source: 'Banco X'
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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const ClientDetails = ({ client, onBack }) => {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use o hook personalizado para gerenciar contas a pagar
  const { 
    accountsPayable, 
    loading, 
    error, 
    refreshData, 
    updateAccountStatus 
  } = useAccountsPayable(client?.id);

  // Se não houver dados reais, use os dados mock
  const displayAccounts = accountsPayable.length > 0 ? accountsPayable : mockAccountsPayable;

  // Filter accounts by status
  useEffect(() => {
    let filtered = displayAccounts;

    if (statusFilter !== 'todos') {
      filtered = filtered.filter(account => account.status === statusFilter);
    }

    setFilteredAccounts(filtered);
  }, [displayAccounts, statusFilter]);

  const handleExport = () => {
    console.log('Exportar dados para Excel/PDF');
  };

  const handleStatusChange = async (accountId, newStatus) => {
    const success = await updateAccountStatus(accountId, newStatus);
    if (success) {
      console.log('Status atualizado com sucesso');
    }
  };

  const handleRowClick = (account) => {
    // Criando dados mais detalhados baseados no account
    const detailedInvoice = {
      ...account,
      sacado: client?.nome || 'ELDORADO CELULOSE S.A',
      sacado_cnpj: '07.405.439/0001-31',
      instituicao_financeira: 'BANCO SOFISA S.A',
      instituicao_cnpj: '60.889.128/0001-80',
      data_emissao: '30/09/2024',
      data_vencimento: formatDate(account.due_date),
      data_pagamento: account.status === 'pago' ? '02/12/2024' : null,
      parcelas: '1/1',
      taxa_mes: '1.0328 %',
      desconto_taxa: 'R$ 929,38',
      valor_bruto: account.gross_value,
      valor_liquido: account.parcel_value,
      status_pago_ancora: account.status === 'pago',
      payment_status: account.payment_status || 'a_vencer',
      funding_source: account.funding_source || 'Caixa próprio'
    };
    
    setSelectedInvoice(detailedInvoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const getStatusText = (status) => {
    const statusMap = {
      'solicitado': 'Solicitado',
      'em_analise': 'Em análise',
      'antecipado': 'Antecipado'
    };
    return statusMap[status] || status;
  };

  const getPaymentStatusText = (status) => {
    const paymentStatusMap = {
      'a_vencer': 'À vencer',
      'vencida': 'Vencida',
      'paga': 'Paga'
    };
    return paymentStatusMap[status] || status;
  };

  return (
    <Container>
      <Header>
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Voltar
        </button>
        <div className="client-info">
          <h1>{client?.nome || 'Detalhes do Cliente'}</h1>
          <p>Visualização detalhada das operações e indicadores</p>
        </div>
      </Header>

      {/* Dashboard com Indicadores e Gráfico */}
      <DashboardSection>        
        <IndicatorsColumn>
          <IndicatorCard>
            <div className="icon-value-container">
              <div className="icon">
                <TrendUp size={24} weight="bold" />
              </div>
              <div className="value">{formatCurrency(mockClientIndicators.totalDisponivel)}</div>
            </div>
            <div className="label-change-container">
              <div className="label">Total Disponível</div>
              <div className="change positive">
                <span>+52% vs mês anterior</span>
              </div>
            </div>
          </IndicatorCard>

          <IndicatorCard>
            <div className="icon-value-container">
              <div className="icon">
                <Clock size={24} weight="bold" />
              </div>
              <div className="value">{formatCurrency(mockClientIndicators.totalAprovacao)}</div>
            </div>
            <div className="label-change-container">
              <div className="label">Total em Aprovação Cliente</div>
              <div className="change negative">
                <span>-1.5% vs mês anterior</span>
              </div>
            </div>
          </IndicatorCard>

          <IndicatorCard>
            <div className="icon-value-container">
              <div className="icon">
                <CheckCircle size={24} weight="bold" />
              </div>
              <div className="value">{formatCurrency(mockClientIndicators.totalAntecipado)}</div>
            </div>
            <div className="label-change-container">
              <div className="label">Total Antecipado Cliente</div>
              <div className="change positive">
                <span>+6.8% vs mês anterior</span>
              </div>
            </div>
          </IndicatorCard>
        </IndicatorsColumn>

        <ChartCard>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 240,
            width: '100%',
            marginBottom: 8,
            flexWrap: 'wrap',
            textAlign: 'center'
          }}>
            <h3 style={{
              margin: 0,
              fontWeight: 600,
              fontSize: 16,
              color: 'var(--primary-text)',
              whiteSpace: 'nowrap',
              maxWidth: '320px',
              flexShrink: 0,
              textAlign: 'center',
              marginBottom: 16
            }}>
              Valores a Receber vs Valores Antecipados por Mês
            </h3>
          </div>
          <ResponsiveContainer width="100%" minHeight={180}>
            <BarChart data={mockMonthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
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
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Bar 
                dataKey="valorReceber" 
                stackId="a" 
                fill="#3b82f6" 
                name="Valores a Receber" 
                radius={[0, 0, 0, 0]} 
              />
              <Bar 
                dataKey="valorAntecipado" 
                stackId="a" 
                fill="#22c55e" 
                name="Valores Antecipados" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 14, height: 8, background: '#3b82f6', display: 'inline-block', borderRadius: 2 }}></span>
              <span style={{ fontSize: 13, color: '#3b82f6', whiteSpace: 'nowrap' }}>Valores a Receber</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 14, height: 8, background: '#22c55e', display: 'inline-block', borderRadius: 2 }}></span>
              <span style={{ fontSize: 13, color: '#22c55e', whiteSpace: 'nowrap' }}>Valores Antecipados</span>
            </span>
          </div>
        </ChartCard>
      </DashboardSection>

      {/* Tabela de Contas a Pagar */}
      <TableSection>
        <div className="table-header">
          <h3>Contas a Pagar - Notas Fiscais</h3>
          <div className="table-actions">
            <button className="secondary" onClick={handleExport}>
              <Download size={16} />
              Exportar
            </button>
            <button className="primary">
              <Funnel size={16} />
              Filtros Avançados
            </button>
          </div>
        </div>

        <FilterSection>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="pago">Pago</option>
            <option value="pendente">Pendente</option>
            <option value="vencido">Vencido</option>
            <option value="antecipado">Antecipado</option>
          </select>
        </FilterSection>
        
        <div className="table-scroll-container">
          <Table>
            <thead>
              <tr>
                <th>Nº da NF</th>
                <th>Vencimento</th>
                <th>Valor Bruto</th>
                <th>Nº Duplicata</th>
                <th>Valor da Parcela</th>
                <th>Vencimento Parcela</th>
                <th>Status de Negociação</th>
                <th>Status Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px' }}>
                    Carregando dados...
                  </td>
                </tr>
              ) : filteredAccounts.map((account) => (
                <ClickableRow key={account.id} onClick={() => handleRowClick(account)}>
                  <td>{account.invoice_number}</td>
                  <td>{formatDate(account.due_date)}</td>
                  <td>{formatCurrency(account.gross_value)}</td>
                  <td>{account.duplicate_number}</td>
                  <td>{formatCurrency(account.parcel_value)}</td>
                  <td>{formatDate(account.parcel_due_date || account.due_date)}</td>
                  <td className="status">
                    <span className={`status-badge ${account.status}`}>
                      {getStatusText(account.status)}
                    </span>
                  </td>
                  <td className="status">
                    <span className={`status-badge ${account.payment_status}`}>
                      {getPaymentStatusText(account.payment_status)}
                    </span>
                  </td>
                </ClickableRow>
              ))}
            </tbody>
          </Table>
        </div>

        {error && (
          <div style={{ 
            textAlign: 'center', 
            padding: '24px', 
            color: 'var(--error)',
            fontSize: '14px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            margin: '16px 0'
          }}>
            Erro ao carregar dados: {error}
          </div>
        )}

        {!loading && filteredAccounts.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '48px', 
            color: 'var(--secondary-text)',
            fontSize: '16px'
          }}>
            Nenhuma conta encontrada com os filtros aplicados.
          </div>
        )}
      </TableSection>

      {/* Modal de Detalhes da Nota Fiscal */}
      {isModalOpen && selectedInvoice && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div className="header-content">
                <h2>Detalhes da Operação</h2>
                <p>Visualização completa dos dados da nota fiscal</p>
              </div>
              <button className="close-button" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </ModalHeader>
            
            <ModalBody>
              <StatusDisplay>
                <div className="status-icon">
                  {selectedInvoice.status_pago_ancora ? (
                    <CheckCircle size={24} weight="bold" />
                  ) : (
                    <CurrencyCircleDollar size={24} weight="bold" />
                  )}
                </div>
                <div className="status-content">
                  <div className="status-label">Valor líquido recebido</div>
                  <div className="status-value">{formatCurrency(selectedInvoice.valor_liquido)}</div>
                </div>
              </StatusDisplay>

              <InfoGrid>
                <InfoSection>
                  <div className="section-title">
                    <FileText size={20} className="icon" />
                    Sacado
                  </div>
                  <div className="info-item">
                    <span className="label">Sacado</span>
                    <span className="value">{selectedInvoice.sacado}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CNPJ</span>
                    <span className="value">{selectedInvoice.sacado_cnpj}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Instituição Financeira</span>
                    <span className="value">{selectedInvoice.instituicao_financeira}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CNPJ</span>
                    <span className="value">{selectedInvoice.instituicao_cnpj}</span>
                  </div>
                </InfoSection>

                <InfoSection>
                  <div className="section-title">
                    <Calendar size={20} className="icon" />
                    Datas e Status
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Emissão</span>
                    <span className="value">{selectedInvoice.data_emissao}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Vencimento</span>
                    <span className="value">{selectedInvoice.data_vencimento}</span>
                  </div>
                  {selectedInvoice.data_pagamento && (
                    <div className="info-item">
                      <span className="label">Data de Pagamento</span>
                      <span className="value">{selectedInvoice.data_pagamento}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="label">Parcelas</span>
                    <span className="value">{selectedInvoice.parcelas}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status</span>
                    <span className={`status-badge ${selectedInvoice.status}`}>
                      {getStatusText(selectedInvoice.status)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status Pagamento</span>
                    <span className={`status-badge ${selectedInvoice.payment_status}`}>
                      {getPaymentStatusText(selectedInvoice.payment_status)}
                    </span>
                  </div>
                </InfoSection>

                <InfoSection>
                  <div className="section-title">
                    <Bank size={20} className="icon" />
                    Dados da NF
                  </div>
                  <div className="info-item">
                    <span className="label">Status</span>
                    <span className="value">
                      {selectedInvoice.status_pago_ancora ? '● Pago pela Âncora' : '● Pendente'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Número Nota Fiscal</span>
                    <span className="value">{selectedInvoice.invoice_number}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">ID Nota Fiscal</span>
                    <span className="value">#{selectedInvoice.id}UajFsfw</span>
                  </div>
                </InfoSection>

                <InfoSection>
                  <div className="section-title">
                    <CurrencyCircleDollar size={20} className="icon" />
                    Valores Financeiros
                  </div>
                  <div className="info-item">
                    <span className="label">Taxa ao mês</span>
                    <span className="value">{selectedInvoice.taxa_mes}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Desconto da Taxa</span>
                    <span className="value">{selectedInvoice.desconto_taxa}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Valor Bruto</span>
                    <span className="value">{formatCurrency(selectedInvoice.valor_bruto)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Valor Líquido</span>
                    <span className="value">{formatCurrency(selectedInvoice.valor_liquido)}</span>
                  </div>
                </InfoSection>

                {/* Nova seção de detalhes bancários */}
                <InfoSection>
                  <div className="section-title">
                    <Bank size={20} className="icon" />
                    Dados Bancários do Favorecido
                  </div>
                  <div className="info-item">
                    <span className="label">Nome do Favorecido</span>
                    <span className="value">Eldorado Celulose S.A</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CNPJ</span>
                    <span className="value">07.405.439/0001-31</span>
                  </div>
                  <div className="info-item">
                    <span className="label">COMP</span>
                    <span className="value">123456</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Banco/Agência/Conta</span>
                    <span className="value">341 / 1234 / 123456-7</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Chave Pix</span>
                    <span className="value">financeiro@eldorado.com.br</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Tipo de Chave</span>
                    <span className="value">E-mail</span>
                  </div>
                </InfoSection>
              </InfoGrid>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ClientDetails;

