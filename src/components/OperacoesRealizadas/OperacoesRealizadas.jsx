import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FastForward, Calendar, CurrencyDollar, FileText, MagnifyingGlass, FunnelSimple } from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 300px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f7fafc;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #718096;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #1a202c;
`;

const StatChange = styled.div`
  font-size: 12px;
  color: ${props => props.positive ? '#48bb78' : '#f56565'};
  margin-top: 4px;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f7fafc;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;

  &:hover {
    background: #f7fafc;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #2d3748;
`;

const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'concluida':
        return '#c6f6d5';
      case 'pendente':
        return '#fed7d7';
      case 'processando':
        return '#feebc8';
      default:
        return '#e2e8f0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'concluida':
        return '#22543d';
      case 'pendente':
        return '#742a2a';
      case 'processando':
        return '#7c2d12';
      default:
        return '#4a5568';
    }
  }};
`;

const OperacoesRealizadas = () => {
  const [operacoes, setOperacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados mockados para exemplo
  useEffect(() => {
    const mockData = [
      {
        id: 'OP001',
        cliente: 'Empresa ABC Ltda',
        valor: 'R$ 50.000,00',
        data: '15/10/2025',
        status: 'concluida',
        documento: 'NF 12345'
      },
      {
        id: 'OP002',
        cliente: 'Comércio XYZ S/A',
        valor: 'R$ 75.000,00',
        data: '14/10/2025',
        status: 'processando',
        documento: 'NF 12346'
      },
      {
        id: 'OP003',
        cliente: 'Indústria 123',
        valor: 'R$ 120.000,00',
        data: '13/10/2025',
        status: 'pendente',
        documento: 'NF 12347'
      },
      {
        id: 'OP004',
        cliente: 'Serviços Rápidos',
        valor: 'R$ 30.000,00',
        data: '12/10/2025',
        status: 'concluida',
        documento: 'NF 12348'
      }
    ];

    setTimeout(() => {
      setOperacoes(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOperacoes = operacoes.filter(op =>
    op.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.documento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: operacoes.length,
    concluidas: operacoes.filter(op => op.status === 'concluida').length,
    pendentes: operacoes.filter(op => op.status === 'pendente').length,
    processando: operacoes.filter(op => op.status === 'processando').length
  };

  if (loading) {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div>Carregando...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FastForward size={24} weight="regular" />
          Operações Realizadas
        </Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar operações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton>
            <Filter size={16} weight="regular" />
            Filtros
          </FilterButton>
        </SearchContainer>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatLabel>Total de Operações</StatLabel>
          <StatValue>{stats.total}</StatValue>
          <StatChange positive>Últimos 30 dias</StatChange>
        </StatCard>
        <StatCard>
          <StatLabel>Concluídas</StatLabel>
          <StatValue>{stats.concluidas}</StatValue>
          <StatChange positive>+12% este mês</StatChange>
        </StatCard>
        <StatCard>
          <StatLabel>Em Processamento</StatLabel>
          <StatValue>{stats.processando}</StatValue>
          <StatChange>Estável</StatChange>
        </StatCard>
        <StatCard>
          <StatLabel>Pendentes</StatLabel>
          <StatValue>{stats.pendentes}</StatValue>
          <StatChange positive>-5% esta semana</StatChange>
        </StatCard>
      </StatsContainer>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Cliente</TableHeaderCell>
              <TableHeaderCell>Valor</TableHeaderCell>
              <TableHeaderCell>Data</TableHeaderCell>
              <TableHeaderCell>Documento</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {filteredOperacoes.map((operacao) => (
              <TableRow key={operacao.id}>
                <TableCell>{operacao.id}</TableCell>
                <TableCell>{operacao.cliente}</TableCell>
                <TableCell>{operacao.valor}</TableCell>
                <TableCell>{operacao.data}</TableCell>
                <TableCell>{operacao.documento}</TableCell>
                <TableCell>
                  <StatusBadge status={operacao.status}>
                    {operacao.status === 'concluida' && 'Concluída'}
                    {operacao.status === 'pendente' && 'Pendente'}
                    {operacao.status === 'processando' && 'Processando'}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OperacoesRealizadas;
