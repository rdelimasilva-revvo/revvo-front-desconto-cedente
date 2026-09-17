import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendUp, Clock, CheckCircle, MagnifyingGlass, Funnel, SquaresFour, List, GridNine, CurrencyCircleDollar, Percent, FileText, Bank, Tag, Sparkle } from '@phosphor-icons/react';
import ClientCard from './ClientCard';
import ClientDetails from './ClientDetails';

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
    font-size: 26px;
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

const IndicatorsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 12px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SmallIndicatorCard = styled(IndicatorCard)`
  padding: 14px 14px;
  .icon {
    width: 28px;
    height: 28px;
    font-size: 15px;
  }
  .value {
    font-size: 18px;
  }
  .label {
    font-size: 11px;
  }
`;

const DashboardSection = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
  .chart-card {
    grid-row: 1 / -1;
  }
  .right-cards-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    .right-cards-col {
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
    font-size: 15px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
`;

const PromoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #22c55e;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  position: relative;
  height: 100%;

  .promo-badge {
    background: #22c55e;
    color: white;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 6px;
    align-self: flex-start;
    letter-spacing: 0.5px;
  }

  .promo-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--primary-text);
    margin: 0;
    line-height: 1.2;
  }

  .promo-highlight {
    font-size: 28px;
    font-weight: 800;
    color: #22c55e;
    margin: 4px 0;
    line-height: 1;
  }

  .promo-date {
    font-size: 13px;
    color: var(--secondary-text);
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      color: #f59e0b;
    }
  }

  .promo-divider {
    height: 1px;
    background: var(--border-color);
    margin: 4px 0;
  }

  .promo-button {
    background: #22c55e;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
    text-align: center;
    width: 100%;

    &:hover {
      background: #16a34a;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(34, 197, 94, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
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

      &.sacado {
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

// Mock data for the dashboard
const mockIndicators = {
  totalDisponivel: 185000,
  totalAprovacao: 145000,
  totalAntecipado: 120000,
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


// Mock data for recent operations
const mockRecentOperations = [
  {
    id: 1,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-001234',
    valor: 125000,
    taxa: 2.3,
    prazo: 45,
    status: 'aprovado',
    data: '2024-06-15'
  },
  {
    id: 2,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-001189',
    valor: 98000,
    taxa: 2.5,
    prazo: 60,
    status: 'aprovado',
    data: '2024-06-14'
  },
  {
    id: 3,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-001156',
    valor: 156000,
    taxa: 2.2,
    prazo: 30,
    status: 'aprovado',
    data: '2024-06-13'
  },
  {
    id: 4,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-001098',
    valor: 87000,
    taxa: 2.4,
    prazo: 45,
    status: 'aprovado',
    data: '2024-06-12'
  },
  {
    id: 5,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-001045',
    valor: 142000,
    taxa: 2.3,
    prazo: 50,
    status: 'em_analise',
    data: '2024-06-11'
  },
  {
    id: 6,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-000987',
    valor: 112000,
    taxa: 2.6,
    prazo: 60,
    status: 'aprovado',
    data: '2024-06-10'
  },
  {
    id: 7,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-000923',
    valor: 95000,
    taxa: 2.4,
    prazo: 45,
    status: 'aprovado',
    data: '2024-06-09'
  },
  {
    id: 8,
    sacado: 'Léo S.A.',
    nf: 'NF-2024-000876',
    valor: 178000,
    taxa: 2.1,
    prazo: 30,
    status: 'aprovado',
    data: '2024-06-08'
  }
];

const mockClients = [
  {
    id: 1,
    nome: 'Farmácia Saúde Total',
    valorDisponivel: 38500,
    valorAntecipado: 32000,
    status: 'ativo',
    ultimaOperacao: '2024-06-01'
  },
  {
    id: 2,
    nome: 'Drogaria Bem Estar',
    valorDisponivel: 39200,
    valorAntecipado: 35800,
    status: 'ativo',
    ultimaOperacao: '2024-06-03'
  },
  {
    id: 3,
    nome: 'Farmácia Vida & Saúde',
    valorDisponivel: 33400,
    valorAntecipado: 30100,
    status: 'pendente',
    ultimaOperacao: '2024-05-28'
  },
  {
    id: 4,
    nome: 'Drogaria São Lucas',
    valorDisponivel: 40000,
    valorAntecipado: 37500,
    status: 'ativo',
    ultimaOperacao: '2024-06-05'
  },
  {
    id: 5,
    nome: 'Farmácia Popular Express',
    valorDisponivel: 31800,
    valorAntecipado: 28400,
    status: 'ativo',
    ultimaOperacao: '2024-06-02'
  },
  {
    id: 6,
    nome: 'Drogaria Saúde & Cia',
    valorDisponivel: 30200,
    valorAntecipado: 27500,
    status: 'inativo',
    ultimaOperacao: '2024-05-15'
  },
  {
    id: 7,
    nome: 'Farmácia Central',
    valorDisponivel: 37600,
    valorAntecipado: 34200,
    status: 'ativo',
    ultimaOperacao: '2024-06-07'
  },
  {
    id: 8,
    nome: 'Drogaria Esperança',
    valorDisponivel: 35500,
    valorAntecipado: 31900,
    status: 'ativo',
    ultimaOperacao: '2024-06-04'
  },
  {
    id: 9,
    nome: 'Farmácia Integrada',
    valorDisponivel: 36200,
    valorAntecipado: 32800,
    status: 'pendente',
    ultimaOperacao: '2024-05-30'
  },
  {
    id: 10,
    nome: 'Drogaria Mais Saúde',
    valorDisponivel: 32700,
    valorAntecipado: 29300,
    status: 'ativo',
    ultimaOperacao: '2024-06-06'
  },
  {
    id: 11,
    nome: 'Farmácia Vitória',
    valorDisponivel: 34900,
    valorAntecipado: 31200,
    status: 'ativo',
    ultimaOperacao: '2024-06-08'
  },
  {
    id: 12,
    nome: 'Drogaria Confiança',
    valorDisponivel: 33100,
    valorAntecipado: 29800,
    status: 'pendente',
    ultimaOperacao: '2024-05-29'
  },
  {
    id: 13,
    nome: 'Farmácia Naturalis',
    valorDisponivel: 38200,
    valorAntecipado: 34600,
    status: 'ativo',
    ultimaOperacao: '2024-06-07'
  },
  {
    id: 14,
    nome: 'Drogaria Farma Vida',
    valorDisponivel: 36800,
    valorAntecipado: 33200,
    status: 'ativo',
    ultimaOperacao: '2024-06-05'
  },
  {
    id: 15,
    nome: 'Farmácia Bem Viver',
    valorDisponivel: 32500,
    valorAntecipado: 28900,
    status: 'inativo',
    ultimaOperacao: '2024-05-20'
  },
  {
    id: 16,
    nome: 'Drogaria Saúde Plena',
    valorDisponivel: 39800,
    valorAntecipado: 36100,
    status: 'ativo',
    ultimaOperacao: '2024-06-09'
  },
  {
    id: 17,
    nome: 'Farmácia Medicinal',
    valorDisponivel: 35200,
    valorAntecipado: 31800,
    status: 'ativo',
    ultimaOperacao: '2024-06-04'
  },
  {
    id: 18,
    nome: 'Drogaria Farma Express',
    valorDisponivel: 37100,
    valorAntecipado: 33700,
    status: 'pendente',
    ultimaOperacao: '2024-05-31'
  },
  {
    id: 19,
    nome: 'Farmácia Saúde e Vida',
    valorDisponivel: 39500,
    valorAntecipado: 36400,
    status: 'ativo',
    ultimaOperacao: '2024-06-10'
  },
  {
    id: 20,
    nome: 'Drogaria Farma Center',
    valorDisponivel: 38900,
    valorAntecipado: 35200,
    status: 'ativo',
    ultimaOperacao: '2024-06-08'
  },
  {
    id: 21,
    nome: 'Farmácia Viva Bem',
    valorDisponivel: 30800,
    valorAntecipado: 27200,
    status: 'inativo',
    ultimaOperacao: '2024-05-18'
  },
  {
    id: 22,
    nome: 'Drogaria Farma Plus',
    valorDisponivel: 39100,
    valorAntecipado: 35600,
    status: 'ativo',
    ultimaOperacao: '2024-06-11'
  },
  {
    id: 23,
    nome: 'Farmácia Saúde Integral',
    valorDisponivel: 34600,
    valorAntecipado: 30900,
    status: 'ativo',
    ultimaOperacao: '2024-06-03'
  },
  {
    id: 24,
    nome: 'Drogaria Farma Vida',
    valorDisponivel: 36300,
    valorAntecipado: 32700,
    status: 'pendente',
    ultimaOperacao: '2024-06-01'
  },
  {
    id: 25,
    nome: 'Farmácia Saúde Essencial',
    valorDisponivel: 39600,
    valorAntecipado: 35900,
    status: 'ativo',
    ultimaOperacao: '2024-06-12'
  },
  {
    id: 26,
    nome: 'Drogaria Farma Bem',
    valorDisponivel: 38400,
    valorAntecipado: 34800,
    status: 'ativo',
    ultimaOperacao: '2024-06-09'
  },
  {
    id: 27,
    nome: 'Farmácia Vida Saudável',
    valorDisponivel: 31200,
    valorAntecipado: 27800,
    status: 'inativo',
    ultimaOperacao: '2024-05-22'
  },
  {
    id: 28,
    nome: 'Drogaria Farma Saúde',
    valorDisponivel: 39300,
    valorAntecipado: 36200,
    status: 'ativo',
    ultimaOperacao: '2024-06-13'
  },
  {
    id: 29,
    nome: 'Farmácia Bem Estar Total',
    valorDisponivel: 33900,
    valorAntecipado: 30400,
    status: 'ativo',
    ultimaOperacao: '2024-06-02'
  },
  {
    id: 30,
    nome: 'Drogaria Farma Vida Plus',
    valorDisponivel: 35800,
    valorAntecipado: 32100,
    status: 'pendente',
    ultimaOperacao: '2024-06-01'
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

const RiscoSacado = () => {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [viewMode, setViewMode] = useState('card-small'); // 'card-large', 'card-small', 'list'

  // Debug log
  console.log('RiscoSacado component rendering');
  console.log('showClientDetails:', showClientDetails);
  console.log('selectedClient:', selectedClient);

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

      {/* Feed de Antecipações */}
      <ClientsSection>
        <ViewOptionsContainer>
          <h2>Feed de antecipações</h2>
        </ViewOptionsContainer>

        <OperationsHeader>
          <div className="header-label">Sacado</div>
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
                <div className="field-label">Sacado</div>
                <div className="field-value sacado">{operation.sacado}</div>
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
      </ClientsSection>
    </Container>
  );
};

export default RiscoSacado;
