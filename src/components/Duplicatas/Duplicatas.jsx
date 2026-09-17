import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  Download,
  FunnelSimple,
  FileText,
  CheckCircle,
  Lock,
  XCircle,
  Clock,
  X,
  TrendUp,
  Calendar,
  CurrencyCircleDollar
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
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
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
`;

const SearchSection = styled.div`
  background: #1e3a5f;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

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
    border: 1px solid #2d4a6a;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    color: var(--primary-text);

    &:focus {
      outline: none;
      border-color: #0070F2;
      box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #2d4a6a;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: var(--primary-text);
  cursor: pointer;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #0070F2;
    box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TableSection = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: var(--background);
    padding: 16px;
    font-weight: 600;
    font-size: 12px;
    color: var(--secondary-text);
    text-transform: uppercase;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--primary-text);
    vertical-align: middle;
  }

  tbody tr:hover {
    background: var(--background);
  }

  .duplicate-number {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: var(--primary-text);

    .icon {
      color: var(--secondary-text);
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .number {
        font-size: 14px;
        font-weight: 600;
      }

      .date {
        font-size: 12px;
        color: var(--secondary-text);
      }
    }
  }

  .company-info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .name {
      font-size: 14px;
      color: var(--primary-text);
    }

    .cnpj {
      font-size: 12px;
      color: var(--secondary-text);
    }
  }

  .value {
    font-weight: 600;
    color: var(--primary-text);
  }

  .value-garantia {
    font-weight: 600;
    color: #22c55e;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;

    &.emitida {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    &.manifestacao_aceita {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    &.domicilio_trocado {
      background: rgba(251, 191, 36, 0.1);
      color: #f59e0b;
    }

    &.liquidada {
      background: rgba(107, 114, 128, 0.1);
      color: #6b7280;
    }
  }

  .extra-info {
    font-size: 12px;
    color: var(--secondary-text);
  }

  .actions {
    text-align: center;

    button {
      padding: 8px 16px;
      background: #ff6b35;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;

      &:hover {
        background: #e55a2b;
      }

      &:disabled {
        background: #d1d5db;
        cursor: not-allowed;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  margin: 50px auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    margin: 20px auto;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: var(--secondary-text);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: var(--background);
      color: var(--primary-text);
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const DuplicataInfo = styled.div`
  background: var(--background);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text);
      text-transform: uppercase;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
    }

    &.highlight .value {
      font-size: 20px;
      color: #0070F2;
    }
  }
`;

const OffersSection = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const OfferCard = styled.div`
  border: 2px solid ${props => props.$selected ? '#0070F2' : 'var(--border-color)'};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  background: ${props => props.$selected ? 'rgba(0, 112, 242, 0.05)' : 'white'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

  .offer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .offer-title {
      display: flex;
      align-items: center;
      gap: 12px;

      .icon-wrapper {
        width: 48px;
        height: 48px;
        background: ${props => props.$selected ? '#0070F2' : '#f3f4f6'};
        color: ${props => props.$selected ? 'white' : '#6b7280'};
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .title-text {
        h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--primary-text);
          margin: 0 0 4px 0;
        }

        p {
          font-size: 14px;
          color: var(--secondary-text);
          margin: 0;
        }
      }
    }

    .offer-badge {
      background: #22c55e;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  .offer-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .label {
        font-size: 12px;
        color: var(--secondary-text);
      }

      .value {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-text);

        &.highlight {
          color: #22c55e;
        }
      }
    }
  }
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  button {
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    white-space: nowrap;

    &.cancel {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);

      &:hover {
        background: var(--background);
      }
    }

    &.confirm {
      background: #0070F2;
      color: white;

      &:hover {
        background: #0061d5;
      }

      &:disabled {
        background: #d1d5db;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

// Mock data
const mockDuplicatas = [
  {
    id: 1,
    numero: 'DUP-2025-011',
    dataEmissao: '14/01/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Cliente XYZ S.A.',
    clienteCnpj: '98.765.432/0001-10',
    dataVencimento: '14/04/2025',
    valor: 15420.50,
    valorGarantia: 13500.00,
    status: 'emitida',
    extraInfo: null
  },
  {
    id: 2,
    numero: 'DUP-2025-012',
    dataEmissao: '09/02/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Cliente Beta Corp',
    clienteCnpj: '11.222.333/0001-44',
    dataVencimento: '09/05/2025',
    valor: 8750.00,
    valorGarantia: 7650.00,
    status: 'manifestacao_aceita',
    taxa: '2,5%',
    extraInfo: 'Aceita em 11/02/2025'
  },
  {
    id: 3,
    numero: 'DUP-2025-013',
    dataEmissao: '19/02/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Cliente Gamma Ind.',
    clienteCnpj: '55.666.777/0001-88',
    dataVencimento: '19/05/2025',
    valor: 25000.00,
    valorGarantia: 22000.00,
    status: 'emitida',
    extraInfo: null
  },
  {
    id: 4,
    numero: 'DUP-2025-014',
    dataEmissao: '04/02/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Cliente Delta Ltda',
    clienteCnpj: '22.333.444/0001-55',
    dataVencimento: '04/06/2025',
    valor: 12300.00,
    valorGarantia: 0.00,
    status: 'domicilio_trocado',
    taxa: '3,2%',
    extraInfo: 'Novo banco: Bradesco - 07/03/2025'
  },
  {
    id: 5,
    numero: 'DUP-2025-015',
    dataEmissao: '11/03/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Comércio Epsilon ME',
    clienteCnpj: '33.444.555/0001-66',
    dataVencimento: '11/06/2025',
    valor: 18500.00,
    valorGarantia: 16200.00,
    status: 'manifestacao_aceita',
    extraInfo: null
  },
  {
    id: 6,
    numero: 'DUP-2025-016',
    dataEmissao: '17/03/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Indústria Zeta S.A.',
    clienteCnpj: '44.555.666/0001-77',
    dataVencimento: '17/04/2025',
    valor: 5400.00,
    valorGarantia: 0.00,
    status: 'liquidada',
    extraInfo: 'Pago em 17/04/2025'
  },
  {
    id: 7,
    numero: 'DUP-2025-017',
    dataEmissao: '22/03/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Cliente Theta Ltd',
    clienteCnpj: '66.777.888/0001-99',
    dataVencimento: '22/06/2025',
    valor: 31200.00,
    valorGarantia: 28000.00,
    status: 'manifestacao_aceita',
    taxa: '2,8%',
    extraInfo: 'Aceita em 25/03/2025'
  },
  {
    id: 8,
    numero: 'DUP-2025-018',
    dataEmissao: '28/03/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Distribuidora Iota',
    clienteCnpj: '77.888.999/0001-00',
    dataVencimento: '28/05/2025',
    valor: 19800.00,
    valorGarantia: 17500.00,
    status: 'emitida',
    extraInfo: null
  },
  {
    id: 9,
    numero: 'DUP-2025-019',
    dataEmissao: '05/04/2025',
    empresa: 'Empresa ABC Ltda',
    empresaCnpj: '12.345.678/0001-90',
    cliente: 'Comércio Kappa ME',
    clienteCnpj: '88.999.000/0001-11',
    dataVencimento: '05/07/2025',
    valor: 27500.00,
    valorGarantia: 24200.00,
    status: 'liquidada',
    taxa: '3,0%',
    extraInfo: 'Pago em 05/07/2025'
  },
];

const Duplicatas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showNegociacaoModal, setShowNegociacaoModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [selectedDuplicata, setSelectedDuplicata] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcular totais
  const valorTotal = mockDuplicatas.reduce((sum, dup) => sum + dup.valor, 0);
  const valorGarantiaTotal = mockDuplicatas.reduce((sum, dup) => sum + dup.valorGarantia, 0);
  const emitidas = mockDuplicatas.filter(d => d.status === 'emitida').length;
  const manifestacoesAceitas = mockDuplicatas.filter(d => d.status === 'manifestacao_aceita').length;
  const domiciliosTrocados = mockDuplicatas.filter(d => d.status === 'domicilio_trocado').length;
  const liquidadas = mockDuplicatas.filter(d => d.status === 'liquidada').length;

  // Filtrar duplicatas
  const filteredDuplicatas = mockDuplicatas.filter(dup => {
    const matchesSearch =
      dup.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dup.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dup.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dup.empresaCnpj.includes(searchTerm) ||
      dup.clienteCnpj.includes(searchTerm);

    const matchesStatus = !statusFilter || dup.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Taxa de antecipação padrão
  const taxaAntecipacao = {
    taxaMensal: 2.5,
    prazo: 30
  };

  const calculateDiscount = (valor, taxaMensal, prazo) => {
    const diasAno = 365;
    const taxaDiaria = (Math.pow(1 + taxaMensal / 100, 1/30) - 1);
    const desconto = valor * taxaDiaria * prazo;
    const valorLiquido = valor - desconto;

    return {
      desconto,
      valorLiquido,
      taxaDiaria: taxaDiaria * 100
    };
  };

  const handleNegociar = (duplicata, event) => {
    event.stopPropagation();
    setSelectedDuplicata(duplicata);
    setShowNegociacaoModal(true);
  };

  const handleViewDetalhes = (duplicata) => {
    setSelectedDuplicata(duplicata);
    setShowDetalhesModal(true);
  };

  const handleCloseDetalhesModal = () => {
    setShowDetalhesModal(false);
    setSelectedDuplicata(null);
  };

  const handleExportar = () => {
    alert('Exportar duplicatas');
  };

  const handleConfirmarNegociacao = () => {
    const calculation = calculateDiscount(
      selectedDuplicata.valor,
      taxaAntecipacao.taxaMensal,
      taxaAntecipacao.prazo
    );

    alert(
      `Antecipação confirmada!\n\n` +
      `Duplicata: ${selectedDuplicata.numero}\n` +
      `Taxa: ${taxaAntecipacao.taxaMensal}% a.m.\n` +
      `Desconto: ${formatCurrency(calculation.desconto)}\n` +
      `Valor a receber: ${formatCurrency(calculation.valorLiquido)}`
    );

    setShowNegociacaoModal(false);
    setSelectedDuplicata(null);
  };

  const handleCloseModal = () => {
    setShowNegociacaoModal(false);
    setSelectedDuplicata(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'emitida':
        return <FileText size={16} weight="fill" />;
      case 'manifestacao_aceita':
        return <CheckCircle size={16} weight="fill" />;
      case 'domicilio_trocado':
        return <Clock size={16} weight="fill" />;
      case 'liquidada':
        return <Lock size={16} weight="fill" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'emitida':
        return 'Emitida';
      case 'manifestacao_aceita':
        return 'Manifestação Aceita';
      case 'domicilio_trocado':
        return 'Domicílio Trocado';
      case 'liquidada':
        return 'Liquidada';
      default:
        return status;
    }
  };

  return (
    <Container>
      <PageHeader>
        <h1>Duplicatas</h1>
        <ExportButton onClick={handleExportar}>
          <Download size={16} weight="bold" />
          Exportar
        </ExportButton>
      </PageHeader>

      <SummaryCards>
        <SummaryCard $color="#06b6d4">
          <div className="label">Valor Total</div>
          <div className="value">{formatCurrency(valorTotal)}</div>
        </SummaryCard>

        <SummaryCard $color="#3b82f6">
          <div className="label">Emitidas</div>
          <div className="value">{emitidas}</div>
        </SummaryCard>

        <SummaryCard $color="#22c55e">
          <div className="label">Manifestação Aceita</div>
          <div className="value">{manifestacoesAceitas}</div>
        </SummaryCard>

        <SummaryCard $color="#f59e0b">
          <div className="label">Domicílio Trocado</div>
          <div className="value">{domiciliosTrocados}</div>
        </SummaryCard>

        <SummaryCard $color="#6b7280">
          <div className="label">Liquidadas</div>
          <div className="value">{liquidadas}</div>
        </SummaryCard>
      </SummaryCards>

      <SearchSection>
        <SearchRow>
          <SearchInput>
            <MagnifyingGlass size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por duplicata, NF, cedente ou sacado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>

          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="emitida">Emitida</option>
            <option value="manifestacao_aceita">Manifestação Aceita</option>
            <option value="domicilio_trocado">Domicílio Trocado</option>
            <option value="liquidada">Liquidada</option>
          </FilterSelect>
        </SearchRow>
      </SearchSection>

      <TableSection>
        {filteredDuplicatas.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Duplicata</th>
                <th>Cliente (Sacado)</th>
                <th>Vencimento</th>
                <th>Valor Duplicata</th>
                <th>Valor Garantia</th>
                <th>Status</th>
                <th>Informações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDuplicatas.map((dup) => (
                <tr
                  key={dup.id}
                  onClick={() => handleViewDetalhes(dup)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="duplicate-number">
                      <FileText size={20} className="icon" />
                      <div className="details">
                        <span className="number">{dup.numero}</span>
                        <span className="date">Emissão: {dup.dataEmissao}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="company-info">
                      <span className="name">{dup.cliente}</span>
                      <span className="cnpj">{dup.clienteCnpj}</span>
                    </div>
                  </td>
                  <td>{dup.dataVencimento}</td>
                  <td className="value">{formatCurrency(dup.valor)}</td>
                  <td className="value-garantia">{formatCurrency(dup.valorGarantia)}</td>
                  <td>
                    <span className={`status-badge ${dup.status}`}>
                      {getStatusIcon(dup.status)}
                      {getStatusLabel(dup.status)}
                    </span>
                  </td>
                  <td className="extra-info">
                    {dup.extraInfo || '-'}
                    {dup.taxa && <div>Taxa: {dup.taxa}</div>}
                  </td>
                  <td className="actions">
                    <button
                      onClick={(e) => handleNegociar(dup, e)}
                      disabled={dup.status === 'liquidada'}
                    >
                      Negociar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            <div className="icon">
              <FileText size={64} />
            </div>
            <h4>Nenhuma duplicata encontrada</h4>
            <p>Ajuste os filtros ou termos de busca para ver os resultados.</p>
          </EmptyState>
        )}
      </TableSection>

      {/* Modal de Detalhes */}
      {showDetalhesModal && selectedDuplicata && (
        <ModalOverlay onClick={handleCloseDetalhesModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Detalhes da Duplicata</h2>
              <button onClick={handleCloseDetalhesModal}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <DuplicataInfo>
                <div className="info-grid">
                  <div className="info-item highlight">
                    <span className="label">Número da Duplicata</span>
                    <span className="value">{selectedDuplicata.numero}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status</span>
                    <span className={`status-badge ${selectedDuplicata.status}`} style={{ display: 'inline-flex', marginTop: '4px' }}>
                      {getStatusIcon(selectedDuplicata.status)}
                      {getStatusLabel(selectedDuplicata.status)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Emissão</span>
                    <span className="value">{selectedDuplicata.dataEmissao}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Vencimento</span>
                    <span className="value">{selectedDuplicata.dataVencimento}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Empresa (Cedente)</span>
                    <span className="value">{selectedDuplicata.empresa}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CNPJ Cedente</span>
                    <span className="value">{selectedDuplicata.empresaCnpj}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cliente (Sacado)</span>
                    <span className="value">{selectedDuplicata.cliente}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CNPJ Sacado</span>
                    <span className="value">{selectedDuplicata.clienteCnpj}</span>
                  </div>
                  <div className="info-item highlight">
                    <span className="label">Valor da Duplicata</span>
                    <span className="value">{formatCurrency(selectedDuplicata.valor)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Valor Garantia</span>
                    <span className="value" style={{ color: '#22c55e' }}>{formatCurrency(selectedDuplicata.valorGarantia)}</span>
                  </div>
                  {selectedDuplicata.taxa && (
                    <div className="info-item">
                      <span className="label">Taxa Aplicada</span>
                      <span className="value">{selectedDuplicata.taxa}</span>
                    </div>
                  )}
                  {selectedDuplicata.extraInfo && (
                    <div className="info-item">
                      <span className="label">Informações Adicionais</span>
                      <span className="value">{selectedDuplicata.extraInfo}</span>
                    </div>
                  )}
                </div>
              </DuplicataInfo>
            </ModalBody>

            <ModalFooter>
              <button className="cancel" onClick={handleCloseDetalhesModal}>
                Fechar
              </button>
              {selectedDuplicata.status !== 'liquidada' && (
                <button
                  className="confirm"
                  onClick={(e) => {
                    handleCloseDetalhesModal();
                    handleNegociar(selectedDuplicata, e);
                  }}
                >
                  Negociar Duplicata
                </button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de Negociação */}
      {showNegociacaoModal && selectedDuplicata && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Negociar Duplicata</h2>
              <button onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <DuplicataInfo>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Número da Duplicata</span>
                    <span className="value">{selectedDuplicata.numero}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Vencimento</span>
                    <span className="value">{selectedDuplicata.dataVencimento}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Empresa (Cedente)</span>
                    <span className="value">{selectedDuplicata.empresa}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cliente (Sacado)</span>
                    <span className="value">{selectedDuplicata.cliente}</span>
                  </div>
                  <div className="info-item highlight">
                    <span className="label">Valor da Duplicata</span>
                    <span className="value">{formatCurrency(selectedDuplicata.valor)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Valor Garantia</span>
                    <span className="value">{formatCurrency(selectedDuplicata.valorGarantia)}</span>
                  </div>
                </div>
              </DuplicataInfo>

              <OffersSection>
                <h3>
                  <TrendUp size={20} />
                  Condições de Antecipação
                </h3>

                {(() => {
                  const calculation = calculateDiscount(
                    selectedDuplicata.valor,
                    taxaAntecipacao.taxaMensal,
                    taxaAntecipacao.prazo
                  );

                  return (
                    <OfferCard $selected={true}>
                      <div className="offer-header">
                        <div className="offer-title">
                          <div className="icon-wrapper">
                            <CurrencyCircleDollar size={24} weight="bold" />
                          </div>
                          <div className="title-text">
                            <h4>Antecipação de Recebível</h4>
                            <p>Receba o valor antecipado em até 24 horas</p>
                          </div>
                        </div>
                      </div>

                      <div className="offer-details">
                        <div className="detail-item">
                          <span className="label">Taxa Mensal</span>
                          <span className="value">{taxaAntecipacao.taxaMensal}%</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Prazo</span>
                          <span className="value">{taxaAntecipacao.prazo} dias</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Taxa Diária</span>
                          <span className="value">{calculation.taxaDiaria.toFixed(4)}%</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Desconto</span>
                          <span className="value">{formatCurrency(calculation.desconto)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Valor a Receber</span>
                          <span className="value highlight">{formatCurrency(calculation.valorLiquido)}</span>
                        </div>
                      </div>
                    </OfferCard>
                  );
                })()}
              </OffersSection>
            </ModalBody>

            <ModalFooter>
              <button className="cancel" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button
                className="confirm"
                onClick={handleConfirmarNegociacao}
              >
                Confirmar Antecipação
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Duplicatas;
