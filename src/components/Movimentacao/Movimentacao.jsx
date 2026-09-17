import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  Download,
  FunnelSimple,
  CheckCircle,
  XCircle,
  FileText,
  CurrencyCircleDollar,
  Calendar,
  CaretDown,
  CaretUp
} from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--background);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #0070F2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0061d5;
  }
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  border-top: 3px solid ${props => props.$color || '#0070F2'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

  .label {
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text);
    text-transform: uppercase;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-text);
    margin: 0;
  }

  .subvalue {
    font-size: 14px;
    color: var(--secondary-text);
    margin-top: 4px;
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;

  label {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text);
  }

  input, select {
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 14px;
    background: white;

    &:focus {
      outline: none;
      border-color: #0070F2;
      box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
    }
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 2;
  min-width: 300px;

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text);
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 14px;
    background: white;

    &:focus {
      outline: none;
      border-color: #0070F2;
      box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
    }

    &::placeholder {
      color: var(--secondary-text);
    }
  }

  .search-icon {
    position: absolute;
    left: 12px;
    bottom: 12px;
    color: var(--secondary-text);
  }
`;

const TimelineSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const DateGroup = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isExpanded ? '#f8f9fa' : 'white'};

  &:hover {
    background: #f8f9fa;
    border-color: #0070F2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .date-icon {
    width: 40px;
    height: 40px;
    background: #dff3ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0070F2;
  }

  .date-info {
    flex: 1;

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0 0 4px 0;
    }

    p {
      font-size: 13px;
      color: var(--secondary-text);
      margin: 0;
    }
  }

  .date-summary {
    text-align: right;
    font-size: 13px;
    color: var(--secondary-text);
    margin-right: 12px;

    .total {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
    }
  }

  .expand-icon {
    color: var(--secondary-text);
    transition: transform 0.3s ease;
    transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const OperationCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    border-color: #0070F2;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const OperationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OperationInfo = styled.div`
  flex: 1;

  .operation-number {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 4px;
  }

  .operation-client {
    font-size: 14px;
    color: var(--secondary-text);
  }
`;

const OperationBadges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &.antecipado {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }

  &.nao-antecipado {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  &.com-escrituracao {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }

  &.sem-escrituracao {
    background: rgba(251, 191, 36, 0.1);
    color: #fbbf24;
  }
`;

const OperationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  .detail-item {
    .label {
      font-size: 12px;
      color: var(--secondary-text);
      margin-bottom: 4px;
    }

    .value {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text);

      &.highlight {
        color: #22c55e;
        font-size: 16px;
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
  color: var(--secondary-text);

  .icon {
    margin-bottom: 16px;
    color: var(--secondary-text);
  }

  h4 {
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--primary-text);
  }

  p {
    font-size: 14px;
  }
`;

// Mock data
const mockOperacoes = [
  {
    id: 1,
    data: '2025-11-30',
    numero: 'DUP-2025-018',
    cliente: 'Cliente ABC Ltda',
    cnpj: '12.345.678/0001-90',
    valor: 25000.00,
    valorLiquido: 24375.00,
    taxa: 2.5,
    vencimento: '2025-12-30',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-30',
    banco: 'Banco Itaú'
  },
  {
    id: 2,
    data: '2025-11-30',
    numero: 'DUP-2025-019',
    cliente: 'Empresa XYZ S.A.',
    cnpj: '98.765.432/0001-10',
    valor: 18500.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-25',
    antecipado: false,
    escriturado: true,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 3,
    data: '2025-11-30',
    numero: 'DUP-2025-020',
    cliente: 'Fornecedor Omega Ltda',
    cnpj: '44.555.666/0001-77',
    valor: 38900.00,
    valorLiquido: 37927.50,
    taxa: 2.5,
    vencimento: '2025-12-28',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-30',
    banco: 'Banco Santander'
  },
  {
    id: 4,
    data: '2025-11-30',
    numero: 'DUP-2025-021',
    cliente: 'Indústria Kappa ME',
    cnpj: '66.777.888/0001-99',
    valor: 21300.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-22',
    antecipado: false,
    escriturado: false,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 5,
    data: '2025-11-29',
    numero: 'DUP-2025-015',
    cliente: 'Comércio Beta ME',
    cnpj: '11.222.333/0001-44',
    valor: 32000.00,
    valorLiquido: 31200.00,
    taxa: 2.5,
    vencimento: '2025-12-29',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-29',
    banco: 'Banco Bradesco'
  },
  {
    id: 6,
    data: '2025-11-29',
    numero: 'DUP-2025-016',
    cliente: 'Indústria Gamma Ltda',
    cnpj: '55.666.777/0001-88',
    valor: 15000.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-20',
    antecipado: false,
    escriturado: false,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 7,
    data: '2025-11-29',
    numero: 'DUP-2025-017',
    cliente: 'Atacado Sigma S.A.',
    cnpj: '77.888.999/0001-11',
    valor: 54200.00,
    valorLiquido: 52845.00,
    taxa: 2.5,
    vencimento: '2025-12-27',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-29',
    banco: 'Banco Itaú'
  },
  {
    id: 8,
    data: '2025-11-28',
    numero: 'DUP-2025-012',
    cliente: 'Distribuidora Delta S.A.',
    cnpj: '22.333.444/0001-55',
    valor: 42500.00,
    valorLiquido: 41437.50,
    taxa: 2.5,
    vencimento: '2025-12-28',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-28',
    banco: 'Banco do Brasil'
  },
  {
    id: 9,
    data: '2025-11-28',
    numero: 'DUP-2025-013',
    cliente: 'Comércio Epsilon EIRELI',
    cnpj: '33.444.555/0001-66',
    valor: 12800.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-15',
    antecipado: false,
    escriturado: true,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 10,
    data: '2025-11-28',
    numero: 'DUP-2025-014',
    cliente: 'Varejo Lambda Ltda',
    cnpj: '88.999.111/0001-22',
    valor: 28400.00,
    valorLiquido: 27690.00,
    taxa: 2.5,
    vencimento: '2025-12-26',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-28',
    banco: 'Banco Bradesco'
  },
  {
    id: 11,
    data: '2025-11-27',
    numero: 'DUP-2025-009',
    cliente: 'Indústria Theta EIRELI',
    cnpj: '99.111.222/0001-33',
    valor: 61500.00,
    valorLiquido: 59962.50,
    taxa: 2.5,
    vencimento: '2025-12-25',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-27',
    banco: 'Banco Santander'
  },
  {
    id: 12,
    data: '2025-11-27',
    numero: 'DUP-2025-010',
    cliente: 'Comércio Iota ME',
    cnpj: '11.222.333/0001-44',
    valor: 19700.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-18',
    antecipado: false,
    escriturado: true,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 13,
    data: '2025-11-27',
    numero: 'DUP-2025-011',
    cliente: 'Distribuidora Zeta S.A.',
    cnpj: '22.333.444/0001-55',
    valor: 33800.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-24',
    antecipado: false,
    escriturado: false,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 14,
    data: '2025-11-26',
    numero: 'DUP-2025-006',
    cliente: 'Atacado Rho Ltda',
    cnpj: '33.444.555/0001-66',
    valor: 47200.00,
    valorLiquido: 46020.00,
    taxa: 2.5,
    vencimento: '2025-12-23',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-26',
    banco: 'Banco do Brasil'
  },
  {
    id: 15,
    data: '2025-11-26',
    numero: 'DUP-2025-007',
    cliente: 'Varejo Psi EIRELI',
    cnpj: '44.555.666/0001-77',
    valor: 16900.00,
    valorLiquido: 16477.50,
    taxa: 2.5,
    vencimento: '2025-12-21',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-26',
    banco: 'Banco Itaú'
  },
  {
    id: 16,
    data: '2025-11-26',
    numero: 'DUP-2025-008',
    cliente: 'Indústria Chi ME',
    cnpj: '55.666.777/0001-88',
    valor: 24300.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-19',
    antecipado: false,
    escriturado: false,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 17,
    data: '2025-11-25',
    numero: 'DUP-2025-003',
    cliente: 'Comércio Phi S.A.',
    cnpj: '66.777.888/0001-99',
    valor: 52800.00,
    valorLiquido: 51480.00,
    taxa: 2.5,
    vencimento: '2025-12-20',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-25',
    banco: 'Banco Bradesco'
  },
  {
    id: 18,
    data: '2025-11-25',
    numero: 'DUP-2025-004',
    cliente: 'Distribuidora Upsilon Ltda',
    cnpj: '77.888.999/0001-11',
    valor: 39100.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-17',
    antecipado: false,
    escriturado: true,
    dataAntecipacao: null,
    banco: null
  },
  {
    id: 19,
    data: '2025-11-25',
    numero: 'DUP-2025-005',
    cliente: 'Atacado Tau EIRELI',
    cnpj: '88.999.111/0001-22',
    valor: 26700.00,
    valorLiquido: 26032.50,
    taxa: 2.5,
    vencimento: '2025-12-16',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-25',
    banco: 'Banco Santander'
  },
  {
    id: 20,
    data: '2025-11-24',
    numero: 'DUP-2025-001',
    cliente: 'Indústria Nu ME',
    cnpj: '99.111.222/0001-33',
    valor: 35600.00,
    valorLiquido: 34710.00,
    taxa: 2.5,
    vencimento: '2025-12-14',
    antecipado: true,
    escriturado: true,
    dataAntecipacao: '2025-11-24',
    banco: 'Banco Itaú'
  },
  {
    id: 21,
    data: '2025-11-24',
    numero: 'DUP-2025-002',
    cliente: 'Varejo Mu S.A.',
    cnpj: '11.333.555/0001-44',
    valor: 18200.00,
    valorLiquido: 0,
    taxa: 0,
    vencimento: '2025-12-12',
    antecipado: false,
    escriturado: false,
    dataAntecipacao: null,
    banco: null
  },
];

const Movimentacao = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusAntecipacao, setStatusAntecipacao] = useState('');
  const [statusEscrituracao, setStatusEscrituracao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [expandedDates, setExpandedDates] = useState(new Set());

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Calcular resumos
  const totalOperacoes = mockOperacoes.length;
  const totalAntecipado = mockOperacoes.filter(op => op.antecipado).length;
  const totalNaoAntecipado = mockOperacoes.filter(op => !op.antecipado).length;
  const totalComEscrituracao = mockOperacoes.filter(op => op.escriturado).length;
  const totalSemEscrituracao = mockOperacoes.filter(op => !op.escriturado).length;
  const valorTotalAntecipado = mockOperacoes
    .filter(op => op.antecipado)
    .reduce((sum, op) => sum + op.valorLiquido, 0);

  // Filtrar operações
  const filteredOperacoes = mockOperacoes.filter(op => {
    const matchesSearch =
      op.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.cnpj.includes(searchTerm);

    const matchesAntecipacao =
      !statusAntecipacao ||
      (statusAntecipacao === 'antecipado' && op.antecipado) ||
      (statusAntecipacao === 'nao-antecipado' && !op.antecipado);

    const matchesEscrituracao =
      !statusEscrituracao ||
      (statusEscrituracao === 'com-escrituracao' && op.escriturado) ||
      (statusEscrituracao === 'sem-escrituracao' && !op.escriturado);

    const matchesDataInicio = !dataInicio || op.data >= dataInicio;
    const matchesDataFim = !dataFim || op.data <= dataFim;

    return matchesSearch && matchesAntecipacao && matchesEscrituracao && matchesDataInicio && matchesDataFim;
  });

  // Agrupar por data
  const groupedByDate = filteredOperacoes.reduce((groups, op) => {
    const date = op.data;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(op);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  const handleExportar = () => {
    alert('Exportar movimentação');
  };

  const toggleDateExpansion = (date) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  return (
    <Container>
      <PageHeader>
        <h1>Movimentação</h1>
        <ExportButton onClick={handleExportar}>
          <Download size={16} weight="bold" />
          Exportar
        </ExportButton>
      </PageHeader>

      <SummaryCards>
        <SummaryCard $color="#0070F2">
          <div className="label">Total de Operações</div>
          <div className="value">{totalOperacoes}</div>
          <div className="subvalue">Últimos 30 dias</div>
        </SummaryCard>

        <SummaryCard $color="#22c55e">
          <div className="label">Antecipadas</div>
          <div className="value">{totalAntecipado}</div>
          <div className="subvalue">{formatCurrency(valorTotalAntecipado)}</div>
        </SummaryCard>

        <SummaryCard $color="#ef4444">
          <div className="label">Não Antecipadas</div>
          <div className="value">{totalNaoAntecipado}</div>
        </SummaryCard>

        <SummaryCard $color="#3b82f6">
          <div className="label">Com Escrituração</div>
          <div className="value">{totalComEscrituracao}</div>
          <div className="subvalue">{totalSemEscrituracao} sem escrituração</div>
        </SummaryCard>
      </SummaryCards>

      <FiltersSection>
        <SearchInput>
          <label>Buscar</label>
          <MagnifyingGlass size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Número, cliente ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>

        <FilterGroup>
          <label>Status Antecipação</label>
          <select value={statusAntecipacao} onChange={(e) => setStatusAntecipacao(e.target.value)}>
            <option value="">Todos</option>
            <option value="antecipado">Antecipado</option>
            <option value="nao-antecipado">Não Antecipado</option>
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Escrituração</label>
          <select value={statusEscrituracao} onChange={(e) => setStatusEscrituracao(e.target.value)}>
            <option value="">Todos</option>
            <option value="com-escrituracao">Com Escrituração</option>
            <option value="sem-escrituracao">Sem Escrituração</option>
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Data Início</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <label>Data Fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </FilterGroup>
      </FiltersSection>

      <TimelineSection>
        {sortedDates.length > 0 ? (
          sortedDates.map(date => {
            const operations = groupedByDate[date];
            const dailyTotal = operations.reduce((sum, op) => sum + op.valor, 0);
            const isExpanded = expandedDates.has(date);

            return (
              <DateGroup key={date}>
                <DateHeader
                  $isExpanded={isExpanded}
                  onClick={() => toggleDateExpansion(date)}
                >
                  <div className="date-icon">
                    <Calendar size={20} weight="bold" />
                  </div>
                  <div className="date-info">
                    <h3>{formatDate(date)}</h3>
                    <p>{operations.length} operação(ões)</p>
                  </div>
                  <div className="date-summary">
                    <div className="total">{formatCurrency(dailyTotal)}</div>
                    <div>Total do dia</div>
                  </div>
                  <div className="expand-icon">
                    <CaretDown size={24} weight="bold" />
                  </div>
                </DateHeader>

                {isExpanded && operations.map(op => (
                  <OperationCard key={op.id}>
                    <OperationHeader>
                      <OperationInfo>
                        <div className="operation-number">{op.numero}</div>
                        <div className="operation-client">{op.cliente} - {op.cnpj}</div>
                      </OperationInfo>
                      <OperationBadges>
                        {op.antecipado ? (
                          <Badge className="antecipado">
                            <CheckCircle size={14} weight="fill" />
                            Antecipado
                          </Badge>
                        ) : (
                          <Badge className="nao-antecipado">
                            <XCircle size={14} weight="fill" />
                            Não Antecipado
                          </Badge>
                        )}
                        {op.escriturado ? (
                          <Badge className="com-escrituracao">
                            <FileText size={14} weight="fill" />
                            Com Escrituração
                          </Badge>
                        ) : (
                          <Badge className="sem-escrituracao">
                            <FileText size={14} weight="fill" />
                            Sem Escrituração
                          </Badge>
                        )}
                      </OperationBadges>
                    </OperationHeader>

                    <OperationDetails>
                      <div className="detail-item">
                        <div className="label">Valor Original</div>
                        <div className="value">{formatCurrency(op.valor)}</div>
                      </div>
                      {op.antecipado && (
                        <>
                          <div className="detail-item">
                            <div className="label">Valor Líquido</div>
                            <div className="value highlight">{formatCurrency(op.valorLiquido)}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Taxa</div>
                            <div className="value">{op.taxa}% a.m.</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Banco</div>
                            <div className="value">{op.banco}</div>
                          </div>
                        </>
                      )}
                      <div className="detail-item">
                        <div className="label">Vencimento</div>
                        <div className="value">{formatDateShort(op.vencimento)}</div>
                      </div>
                    </OperationDetails>
                  </OperationCard>
                ))}
              </DateGroup>
            );
          })
        ) : (
          <EmptyState>
            <div className="icon">
              <CurrencyCircleDollar size={64} />
            </div>
            <h4>Nenhuma operação encontrada</h4>
            <p>Ajuste os filtros para visualizar as operações.</p>
          </EmptyState>
        )}
      </TimelineSection>
    </Container>
  );
};

export default Movimentacao;
