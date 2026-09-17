import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  FunnelSimple,
  Download,
  TrendUp,
  Clock,
  CurrencyCircleDollar,
  Calendar
} from '@phosphor-icons/react';

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
    overflow-y: visible !important;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    position: relative;

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
  min-width: 1000px;

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
  }

  td {
    padding: 16px 24px;
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

    .fornecedor-info {
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

    .value {
      font-weight: 600;
    }

    .rate {
      color: #3b82f6;
      font-weight: 600;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      display: inline-block;

      &.aprovada {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
      }

      &.pendente {
        background: rgba(251, 191, 36, 0.1);
        color: #fbbf24;
      }

      &.em-analise {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }
    }
  }

  tbody tr:hover {
    background: var(--background);
  }
`;

const NegociacoesAncora = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados - Âncora é Raia Drogasil S.A., Fornecedores são os parceiros
  const negociacoes = [
    {
      id: 1,
      fornecedor: 'Parceiro de Ferragens LTDA',
      cnpj: '12.345.678/0001-90',
      valor: 45000,
      taxa: 1.2,
      prazo: 45,
      data: '15/10/2025',
      status: 'aprovada'
    },
    {
      id: 2,
      fornecedor: 'Distribuidora ABC Materiais',
      cnpj: '23.456.789/0001-01',
      valor: 75000,
      taxa: 1.15,
      prazo: 60,
      data: '14/10/2025',
      status: 'aprovada'
    },
    {
      id: 3,
      fornecedor: 'Indústria XYZ Componentes',
      cnpj: '34.567.890/0001-12',
      valor: 120000,
      taxa: 1.3,
      prazo: 30,
      data: '13/10/2025',
      status: 'em-analise'
    },
    {
      id: 4,
      fornecedor: 'Fornecedor Nacional S.A.',
      cnpj: '45.678.901/0001-23',
      valor: 90000,
      taxa: 1.1,
      prazo: 90,
      data: '12/10/2025',
      status: 'aprovada'
    },
    {
      id: 5,
      fornecedor: 'Comércio Brasil Peças',
      cnpj: '56.789.012/0001-34',
      valor: 60000,
      taxa: 1.25,
      prazo: 45,
      data: '11/10/2025',
      status: 'pendente'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredNegociacoes = negociacoes.filter(neg =>
    neg.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    neg.cnpj.includes(searchTerm)
  );

  const totalValor = negociacoes.reduce((acc, neg) => acc + neg.valor, 0);
  const taxaMedia = negociacoes.reduce((acc, neg) => acc + neg.taxa, 0) / negociacoes.length;
  const aprovadas = negociacoes.filter(neg => neg.status === 'aprovada').length;

  return (
    <Container>
      <PageHeader>
        <h1>Negociações - Raia Drogasil S.A.</h1>
        <p>Gerencie as negociações de antecipação com seus fornecedores</p>
      </PageHeader>

      <MetricsContainer>
        <MetricCard>
          <div className="header">
            <div className="icon blue">
              <TrendUp size={20} weight="bold" />
            </div>
            <h3>Total Negociado</h3>
          </div>
          <div className="value">{formatCurrency(totalValor)}</div>
          <div className="subtitle">Soma de todas as operações</div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon green">
              <CurrencyCircleDollar size={20} weight="bold" />
            </div>
            <h3>Taxa Média</h3>
          </div>
          <div className="value">{taxaMedia.toFixed(2)}%</div>
          <div className="subtitle">Taxa média ao mês</div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon purple">
              <Clock size={20} weight="bold" />
            </div>
            <h3>Aprovadas</h3>
          </div>
          <div className="value">{aprovadas}</div>
          <div className="subtitle">Operações aprovadas</div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon orange">
              <Calendar size={20} weight="bold" />
            </div>
            <h3>Total de Operações</h3>
          </div>
          <div className="value">{negociacoes.length}</div>
          <div className="subtitle">Últimos 30 dias</div>
        </MetricCard>
      </MetricsContainer>

      <SearchSection>
        <SearchInput>
          <MagnifyingGlass size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por fornecedor ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>

        <ActionButtons>
          <button className="secondary">
            <FunnelSimple size={16} />
            Filtros
          </button>
          <button className="secondary">
            <Download size={16} />
            Exportar
          </button>
        </ActionButtons>
      </SearchSection>

      <TableSection>
        <div className="table-header">
          <h3>Negociações Ativas</h3>
          <div className="table-info">
            {filteredNegociacoes.length} negociações
          </div>
        </div>

        <div className="table-responsive">
          <Table>
            <thead>
              <tr>
                <th>Fornecedor</th>
                <th>Valor</th>
                <th>Taxa</th>
                <th>Prazo</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredNegociacoes.map(negociacao => (
                <tr key={negociacao.id}>
                  <td>
                    <div className="fornecedor-info">
                      <div className="name">{negociacao.fornecedor}</div>
                      <div className="document">{negociacao.cnpj}</div>
                    </div>
                  </td>
                  <td className="value">{formatCurrency(negociacao.valor)}</td>
                  <td className="rate">{negociacao.taxa}% a.m.</td>
                  <td>{negociacao.prazo} dias</td>
                  <td>{negociacao.data}</td>
                  <td>
                    <span className={`status-badge ${negociacao.status}`}>
                      {negociacao.status === 'aprovada' && 'Aprovada'}
                      {negociacao.status === 'pendente' && 'Pendente'}
                      {negociacao.status === 'em-analise' && 'Em Análise'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </TableSection>
    </Container>
  );
};

export default NegociacoesAncora;
