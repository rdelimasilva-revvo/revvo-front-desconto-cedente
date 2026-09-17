import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  Download,
  CheckCircle,
  XCircle,
  Calendar,
  CurrencyCircleDollar,
  FileText,
  TrendUp,
  TrendDown,
  Minus
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
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
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

  .icon-container {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: ${props => props.$color ? `${props.$color}15` : '#0070F215'};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .label {
    font-size: 13px;
    font-weight: 500;
    color: var(--secondary-text);
    text-transform: uppercase;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 28px;
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 4px;
  }

  .subvalue {
    font-size: 14px;
    color: var(--secondary-text);
  }

  .count {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.$color || '#0070F2'};
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
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

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 180px;

  label {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text);
  }

  select {
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

const TimelineSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const DayGroup = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6a 100%);
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .date-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-wrapper {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .date-text {
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: white;
        margin: 0 0 4px 0;
      }

      p {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
      }
    }
  }

  .day-totals {
    display: flex;
    gap: 32px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
      align-items: flex-end;
    }

    .total-item {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 4px;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: 20px;
        font-weight: 700;
        color: white;

        &.positive {
          color: #86efac;
        }

        &.negative {
          color: #fca5a5;
        }
      }
    }
  }
`;

const MovimentacaoCard = styled.div`
  background: ${props => props.$tipo === 'entrada' ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'};
  border-left: 4px solid ${props => props.$tipo === 'entrada' ? '#22c55e' : '#ef4444'};
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  .movimentacao-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 12px;

      .icon-wrapper {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: ${props => props.$tipo === 'entrada' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.$tipo === 'entrada' ? '#22c55e' : '#ef4444'};
      }

      .info {
        h4 {
          font-size: 16px;
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
    }

    .right {
      text-align: right;

      .valor {
        font-size: 24px;
        font-weight: 700;
        color: ${props => props.$tipo === 'entrada' ? '#22c55e' : '#ef4444'};
        margin-bottom: 4px;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        background: ${props => props.$tipo === 'entrada' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
        color: ${props => props.$tipo === 'entrada' ? '#22c55e' : '#ef4444'};
      }
    }
  }

  .movimentacao-details {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding-top: 12px;
    border-top: 1px solid ${props => props.$tipo === 'entrada' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .detail-item {
      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: var(--secondary-text);
        margin-bottom: 4px;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text);
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

// Mock data com movimentações por data
const mockMovimentacoes = [
  // 27/02/2025
  {
    id: 1,
    data: '2025-02-27',
    tipo: 'entrada',
    duplicata: 'DUP-2025-010',
    sacado: 'Varejo Kappa Ltda',
    cnpj: '88.999.111/0001-22',
    valorOriginal: 29600.00,
    valorLiquido: 28860.00,
    taxa: '2.5%',
    vencimento: '2025-04-25'
  },
  // 20/02/2025
  {
    id: 2,
    data: '2025-02-20',
    tipo: 'saida',
    duplicata: 'DUP-2025-009',
    sacado: 'Distribuidora Iota S.A.',
    cnpj: '77.888.999/0001-11',
    valorOriginal: 42100.00,
    valorLiquido: null,
    taxa: null,
    vencimento: '2025-04-20'
  },
  // 17/02/2025
  {
    id: 3,
    data: '2025-02-17',
    tipo: 'entrada',
    duplicata: 'DUP-2025-008',
    sacado: 'Indústria Theta ME',
    cnpj: '66.777.888/0001-99',
    valorOriginal: 37800.00,
    valorLiquido: 36855.00,
    taxa: '2.5%',
    vencimento: '2025-04-15'
  },
  // 10/02/2025
  {
    id: 4,
    data: '2025-02-10',
    tipo: 'saida',
    duplicata: 'DUP-2025-007',
    sacado: 'Comércio Eta Ltda',
    cnpj: '44.555.666/0001-77',
    valorOriginal: 24300.00,
    valorLiquido: null,
    taxa: null,
    vencimento: '2025-04-10'
  },
  // 07/02/2025
  {
    id: 5,
    data: '2025-02-07',
    tipo: 'entrada',
    duplicata: 'DUP-2025-006',
    sacado: 'Atacado Zeta S.A.',
    cnpj: '33.444.555/0001-66',
    valorOriginal: 63400.00,
    valorLiquido: 61815.00,
    taxa: '2.5%',
    vencimento: '2025-04-05'
  },
  // 01/02/2025
  {
    id: 6,
    data: '2025-02-01',
    tipo: 'saida',
    duplicata: 'DUP-2025-005',
    sacado: 'Varejo Epsilon EIRELI',
    cnpj: '22.333.444/0001-55',
    valorOriginal: 18900.00,
    valorLiquido: null,
    taxa: null,
    vencimento: '2025-04-01'
  },
  // 27/01/2025
  {
    id: 7,
    data: '2025-01-27',
    tipo: 'entrada',
    duplicata: 'DUP-2025-004',
    sacado: 'Distribuidora Delta Ltda',
    cnpj: '55.666.777/0001-88',
    valorOriginal: 51200.00,
    valorLiquido: 49920.00,
    taxa: '2.5%',
    vencimento: '2025-03-25'
  },
  {
    id: 8,
    data: '2025-01-27',
    tipo: 'entrada',
    duplicata: 'DUP-2025-011',
    sacado: 'Empresa Teste S.A.',
    cnpj: '11.222.333/0001-99',
    valorOriginal: 35000.00,
    valorLiquido: 34125.00,
    taxa: '2.5%',
    vencimento: '2025-03-27'
  },
  // 22/01/2025
  {
    id: 9,
    data: '2025-01-22',
    tipo: 'entrada',
    duplicata: 'DUP-2025-003',
    sacado: 'Indústria Gamma ME',
    cnpj: '11.222.333/0001-44',
    valorOriginal: 28500.00,
    valorLiquido: 27787.50,
    taxa: '2.5%',
    vencimento: '2025-03-20'
  },
  // 15/01/2025
  {
    id: 10,
    data: '2025-01-15',
    tipo: 'saida',
    duplicata: 'DUP-2025-002',
    sacado: 'Comércio Beta S.A.',
    cnpj: '98.765.432/0001-10',
    valorOriginal: 32000.00,
    valorLiquido: null,
    taxa: null,
    vencimento: '2025-03-15'
  },
  // 12/01/2025
  {
    id: 11,
    data: '2025-01-12',
    tipo: 'entrada',
    duplicata: 'DUP-2025-001',
    sacado: 'Empresa Alpha Ltda',
    cnpj: '12.345.678/0001-90',
    valorOriginal: 45000.00,
    valorLiquido: 43875.00,
    taxa: '2.5%',
    vencimento: '2025-03-10'
  },
];

const Liquidacoes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatDateLong = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days[date.getDay()];
  };

  // Calcular totais
  const entradas = mockMovimentacoes.filter(m => m.tipo === 'entrada');
  const saidas = mockMovimentacoes.filter(m => m.tipo === 'saida');

  const totalEntradas = entradas.reduce((sum, m) => sum + (m.valorLiquido || 0), 0);
  const totalSaidas = saidas.reduce((sum, m) => sum + m.valorOriginal, 0);
  const saldo = totalEntradas - totalSaidas;

  // Filtrar movimentações
  const filteredMovimentacoes = mockMovimentacoes.filter(mov => {
    const matchesSearch =
      mov.duplicata.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.sacado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.cnpj.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'todos' ||
      (statusFilter === 'entradas' && mov.tipo === 'entrada') ||
      (statusFilter === 'saidas' && mov.tipo === 'saida');

    return matchesSearch && matchesStatus;
  });

  // Agrupar por data
  const groupedByDate = filteredMovimentacoes.reduce((groups, mov) => {
    const date = mov.data;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(mov);
    return groups;
  }, {});

  // Ordenar datas (mais recente primeiro)
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

  const handleExportar = () => {
    alert('Exportar liquidações');
  };

  const getMovimentacaoIcon = (tipo) => {
    if (tipo === 'entrada') {
      return <TrendUp size={20} weight="bold" />;
    }
    return <TrendDown size={20} weight="bold" />;
  };

  return (
    <Container>
      <PageHeader>
        <h1>Liquidações</h1>
        <ExportButton onClick={handleExportar}>
          <Download size={16} weight="bold" />
          Exportar
        </ExportButton>
      </PageHeader>

      <SummaryCards>
        <SummaryCard $color="#22c55e">
          <div className="icon-container">
            <TrendUp size={24} weight="fill" color="#22c55e" />
          </div>
          <div className="label">Entradas (Efeito Caixa)</div>
          <div className="value">{formatCurrency(totalEntradas)}</div>
          <div className="count">{entradas.length} movimentações</div>
          <div className="subvalue">Duplicatas descontadas</div>
        </SummaryCard>

        <SummaryCard $color="#ef4444">
          <div className="icon-container">
            <TrendDown size={24} weight="fill" color="#ef4444" />
          </div>
          <div className="label">Saídas (Em Aberto)</div>
          <div className="value">{formatCurrency(totalSaidas)}</div>
          <div className="count">{saidas.length} duplicatas</div>
          <div className="subvalue">Aguardando desconto</div>
        </SummaryCard>

        <SummaryCard $color={saldo >= 0 ? '#0070F2' : '#f59e0b'}>
          <div className="icon-container">
            <CurrencyCircleDollar size={24} weight="fill" color={saldo >= 0 ? '#0070F2' : '#f59e0b'} />
          </div>
          <div className="label">Saldo</div>
          <div className="value">{formatCurrency(saldo)}</div>
          <div className="count">{mockMovimentacoes.length} movimentações</div>
          <div className="subvalue">Entradas - Saídas</div>
        </SummaryCard>
      </SummaryCards>

      <FiltersSection>
        <SearchInput>
          <label>Buscar</label>
          <MagnifyingGlass size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Duplicata, sacado ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>

        <FilterGroup>
          <label>Tipo</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="todos">Todas as Movimentações</option>
            <option value="entradas">Apenas Entradas</option>
            <option value="saidas">Apenas Saídas</option>
          </select>
        </FilterGroup>
      </FiltersSection>

      <TimelineSection>
        {sortedDates.length > 0 ? (
          sortedDates.map(date => {
            const movimentacoes = groupedByDate[date];
            const totalDiaEntradas = movimentacoes
              .filter(m => m.tipo === 'entrada')
              .reduce((sum, m) => sum + (m.valorLiquido || 0), 0);
            const totalDiaSaidas = movimentacoes
              .filter(m => m.tipo === 'saida')
              .reduce((sum, m) => sum + m.valorOriginal, 0);
            const saldoDia = totalDiaEntradas - totalDiaSaidas;

            return (
              <DayGroup key={date}>
                <DayHeader>
                  <div className="date-info">
                    <div className="icon-wrapper">
                      <Calendar size={20} weight="fill" color="white" />
                    </div>
                    <div className="date-text">
                      <h3>{formatDate(date)}</h3>
                      <p>{getDayOfWeek(date)}</p>
                    </div>
                  </div>
                  <div className="day-totals">
                    <div className="total-item">
                      <span className="label">Entradas</span>
                      <span className="value positive">{formatCurrency(totalDiaEntradas)}</span>
                    </div>
                    <div className="total-item">
                      <span className="label">Saídas</span>
                      <span className="value negative">{formatCurrency(totalDiaSaidas)}</span>
                    </div>
                    <div className="total-item">
                      <span className="label">Saldo do Dia</span>
                      <span className={`value ${saldoDia >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(saldoDia)}
                      </span>
                    </div>
                  </div>
                </DayHeader>

                {movimentacoes.map(mov => (
                  <MovimentacaoCard key={mov.id} $tipo={mov.tipo}>
                    <div className="movimentacao-header">
                      <div className="left">
                        <div className="icon-wrapper">
                          {getMovimentacaoIcon(mov.tipo)}
                        </div>
                        <div className="info">
                          <h4>{mov.duplicata}</h4>
                          <p>{mov.sacado}</p>
                        </div>
                      </div>
                      <div className="right">
                        <div className="valor">
                          {mov.tipo === 'entrada' ? '+' : '-'} {formatCurrency(mov.tipo === 'entrada' ? mov.valorLiquido : mov.valorOriginal)}
                        </div>
                        <div className="badge">
                          {mov.tipo === 'entrada' ? (
                            <>
                              <CheckCircle size={12} weight="fill" />
                              Descontada
                            </>
                          ) : (
                            <>
                              <XCircle size={12} weight="fill" />
                              Em Aberto
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="movimentacao-details">
                      <div className="detail-item">
                        <div className="label">CNPJ</div>
                        <div className="value">{mov.cnpj}</div>
                      </div>
                      <div className="detail-item">
                        <div className="label">Vencimento</div>
                        <div className="value">{formatDate(mov.vencimento)}</div>
                      </div>
                      <div className="detail-item">
                        <div className="label">Valor Original</div>
                        <div className="value">{formatCurrency(mov.valorOriginal)}</div>
                      </div>
                      {mov.taxa && (
                        <div className="detail-item">
                          <div className="label">Taxa</div>
                          <div className="value">{mov.taxa}</div>
                        </div>
                      )}
                    </div>
                  </MovimentacaoCard>
                ))}
              </DayGroup>
            );
          })
        ) : (
          <EmptyState>
            <div className="icon">
              <CurrencyCircleDollar size={64} />
            </div>
            <h4>Nenhuma movimentação encontrada</h4>
            <p>Ajuste os filtros para visualizar as movimentações.</p>
          </EmptyState>
        )}
      </TimelineSection>
    </Container>
  );
};

export default Liquidacoes;
