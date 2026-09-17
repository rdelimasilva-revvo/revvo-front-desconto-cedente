import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  FunnelSimple,
  Download,
  FileText,
  TrendUp,
  Calendar,
  CurrencyDollar,
  Percent,
  X,
  Clock,
  CheckCircle,
  Warning,
  Eye,
  PencilSimple,
  Trash,
  Archive,
  Plus
} from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
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
    font-size: 16px;
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

    &.primary {
      background: var(--primary-blue);
      color: white;
      border: 1px solid var(--primary-blue);

      &:hover {
        background: #2563eb;
        border-color: #2563eb;
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
      .nome {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .cnpj {
        font-size: 12px;
        color: var(--secondary-text);
      }
    }

    .value {
      font-weight: 600;
    }

    .percentage {
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

      &.ativo {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
      }

      &.inativo {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
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

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: background 0.2s;

    &:hover {
      background: var(--background);
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 32px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  .label {
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);

    &.highlight {
      color: #3b82f6;
      font-size: 20px;
    }

    &.success {
      color: #22c55e;
    }

    &.warning {
      color: #f59e0b;
    }
  }
`;

const ProgressBar = styled.div`
  margin-top: 16px;

  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;

    .label {
      color: var(--secondary-text);
    }

    .percentage {
      color: var(--primary-text);
      font-weight: 600;
    }
  }

  .progress-track {
    height: 8px;
    background: var(--background);
    border-radius: 4px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #22c55e);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }
`;

const StatCard = styled.div`
  background: ${props => props.bgColor || 'var(--background)'};
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);

  .stat-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--secondary-text);
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-text);
  }

  .stat-subtitle {
    font-size: 12px;
    color: var(--secondary-text);
    margin-top: 4px;
  }
`;

const TableActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--secondary-text);

  &:hover {
    background: var(--background);
    border-color: var(--primary-text);
    color: var(--primary-text);
  }

  &.view {
    &:hover {
      background: rgba(59, 130, 246, 0.1);
      border-color: #3b82f6;
      color: #3b82f6;
    }
  }

  &.edit {
    &:hover {
      background: rgba(249, 115, 22, 0.1);
      border-color: #f97316;
      color: #f97316;
    }
  }

  &.delete {
    &:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
      color: #ef4444;
    }
  }

  &.archive {
    &:hover {
      background: rgba(139, 92, 246, 0.1);
      border-color: #8b5cf6;
      color: #8b5cf6;
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text);
  }

  input, select {
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    background: white;
    color: var(--primary-text);

    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  position: sticky;
  bottom: 0;
  background: white;

  button {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &.cancel {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);

      &:hover {
        background: var(--background);
      }
    }

    &.submit {
      background: var(--primary-blue);
      color: white;
      border: 1px solid var(--primary-blue);

      &:hover {
        background: #2563eb;
        border-color: #2563eb;
      }
    }
  }
`;

const Convenios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConvenio, setSelectedConvenio] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Dados mockados de convênios
  const convenios = [
    {
      id: 1,
      fornecedor: 'Parceiro de Ferragens LTDA',
      cnpj: '12.345.678/0001-90',
      dataInicio: '01/01/2024',
      vigencia: '12 meses',
      limiteTotal: 150000,
      limiteDisponivel: 120000,
      taxaMedia: 1.2,
      prazoMedio: 45,
      status: 'ativo'
    },
    {
      id: 2,
      fornecedor: 'Distribuidora ABC Materiais',
      cnpj: '23.456.789/0001-01',
      dataInicio: '15/02/2024',
      vigencia: '12 meses',
      limiteTotal: 200000,
      limiteDisponivel: 175000,
      taxaMedia: 1.15,
      prazoMedio: 60,
      status: 'ativo'
    },
    {
      id: 3,
      fornecedor: 'Indústria XYZ Componentes',
      cnpj: '34.567.890/0001-12',
      dataInicio: '10/03/2024',
      vigencia: '12 meses',
      limiteTotal: 180000,
      limiteDisponivel: 140000,
      taxaMedia: 1.3,
      prazoMedio: 30,
      status: 'ativo'
    },
    {
      id: 4,
      fornecedor: 'Fornecedor Nacional S.A.',
      cnpj: '45.678.901/0001-23',
      dataInicio: '05/04/2024',
      vigencia: '12 meses',
      limiteTotal: 300000,
      limiteDisponivel: 280000,
      taxaMedia: 1.1,
      prazoMedio: 90,
      status: 'ativo'
    },
    {
      id: 5,
      fornecedor: 'Comércio Brasil Peças',
      cnpj: '56.789.012/0001-34',
      dataInicio: '20/05/2024',
      vigencia: '12 meses',
      limiteTotal: 250000,
      limiteDisponivel: 220000,
      taxaMedia: 1.25,
      prazoMedio: 45,
      status: 'ativo'
    },
    {
      id: 6,
      fornecedor: 'Importadora Premium LTDA',
      cnpj: '67.890.123/0001-45',
      dataInicio: '01/06/2024',
      vigencia: '12 meses',
      limiteTotal: 220000,
      limiteDisponivel: 195000,
      taxaMedia: 1.18,
      prazoMedio: 60,
      status: 'ativo'
    },
    {
      id: 7,
      fornecedor: 'Atacadista Central LTDA',
      cnpj: '78.901.234/0001-56',
      dataInicio: '15/01/2024',
      vigencia: '12 meses',
      limiteTotal: 170000,
      limiteDisponivel: 150000,
      taxaMedia: 1.22,
      prazoMedio: 30,
      status: 'ativo'
    },
    {
      id: 8,
      fornecedor: 'Distribuidora Sul Materiais',
      cnpj: '89.012.345/0001-67',
      dataInicio: '10/02/2024',
      vigencia: '12 meses',
      limiteTotal: 190000,
      limiteDisponivel: 160000,
      taxaMedia: 1.35,
      prazoMedio: 45,
      status: 'ativo'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredConvenios = convenios.filter(convenio =>
    convenio.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convenio.cnpj.includes(searchTerm)
  );

  const totalLimite = convenios.reduce((acc, conv) => acc + conv.limiteTotal, 0);
  const totalDisponivel = convenios.reduce((acc, conv) => acc + conv.limiteDisponivel, 0);
  const taxaMediaGeral = convenios.reduce((acc, conv) => acc + conv.taxaMedia, 0) / convenios.length;

  return (
    <Container>
      <PageHeader>
        <h1>Convênios de Antecipação</h1>
        <p>Gerencie os convênios firmados com seus fornecedores</p>
      </PageHeader>

      <MetricsContainer>
        <MetricCard>
          <div className="header">
            <div className="icon blue">
              <FileText size={20} weight="bold" />
            </div>
            <h3>Total de Convênios</h3>
          </div>
          <div className="value">{convenios.length}</div>
          <div className="subtitle">Contratos ativos</div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon green">
              <CurrencyDollar size={20} weight="bold" />
            </div>
            <h3>Limite Total</h3>
          </div>
          <div className="value">{formatCurrency(totalLimite)}</div>
          <div className="subtitle">Soma de todos os limites</div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon orange">
              <TrendUp size={20} weight="bold" />
            </div>
            <h3>Limite Disponível</h3>
          </div>
          <div className="value">{formatCurrency(totalDisponivel)}</div>
          <div className="subtitle">Disponível para antecipação</div>
        </MetricCard>

        <MetricCard>
          <div className="header">
            <div className="icon purple">
              <Percent size={20} weight="bold" />
            </div>
            <h3>Taxa Média</h3>
          </div>
          <div className="value">{taxaMediaGeral.toFixed(2)}%</div>
          <div className="subtitle">Taxa média ao mês</div>
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
          <button
            className="primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} weight="bold" />
            Criar Novo Convênio
          </button>
          <button className="secondary">
            <Download size={16} />
            Exportar
          </button>
        </ActionButtons>
      </SearchSection>

      <TableSection>
        <div className="table-header">
          <h3>Convênios Ativos</h3>
          <div className="table-info">
            {filteredConvenios.length} convênios
          </div>
        </div>

        <div className="table-responsive">
          <Table>
            <thead>
              <tr>
                <th>Fornecedor</th>
                <th>Data Início</th>
                <th>Vigência</th>
                <th>Limite Total</th>
                <th>Disponível</th>
                <th>Taxa Média</th>
                <th>Prazo Médio</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredConvenios.map(convenio => (
                <tr key={convenio.id}>
                  <td>
                    <div className="fornecedor-info">
                      <div className="nome">{convenio.fornecedor}</div>
                      <div className="cnpj">{convenio.cnpj}</div>
                    </div>
                  </td>
                  <td>{convenio.dataInicio}</td>
                  <td>{convenio.vigencia}</td>
                  <td className="value">{formatCurrency(convenio.limiteTotal)}</td>
                  <td className="value">{formatCurrency(convenio.limiteDisponivel)}</td>
                  <td className="percentage">{convenio.taxaMedia}% a.m.</td>
                  <td>{convenio.prazoMedio} dias</td>
                  <td>
                    <span className={`status-badge ${convenio.status}`}>
                      {convenio.status}
                    </span>
                  </td>
                  <td>
                    <TableActionButtons>
                      <ActionButton
                        className="view"
                        onClick={() => setSelectedConvenio(convenio)}
                        title="Ver detalhes"
                      >
                        <Eye size={18} weight="regular" />
                      </ActionButton>
                      <ActionButton
                        className="edit"
                        onClick={() => console.log('Editar', convenio.id)}
                        title="Editar convênio"
                      >
                        <PencilSimple size={18} weight="regular" />
                      </ActionButton>
                      <ActionButton
                        className="archive"
                        onClick={() => console.log('Arquivar', convenio.id)}
                        title="Arquivar convênio"
                      >
                        <Archive size={18} weight="regular" />
                      </ActionButton>
                      <ActionButton
                        className="delete"
                        onClick={() => console.log('Excluir', convenio.id)}
                        title="Excluir convênio"
                      >
                        <Trash size={18} weight="regular" />
                      </ActionButton>
                    </TableActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </TableSection>

      {selectedConvenio && (
        <ModalOverlay onClick={() => setSelectedConvenio(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Gestão do Convênio - {selectedConvenio.fornecedor}</h2>
              <button className="close-button" onClick={() => setSelectedConvenio(null)}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <InfoSection>
                <h3>
                  <FileText size={18} />
                  Informações Gerais
                </h3>
                <InfoGrid>
                  <InfoItem>
                    <div className="label">Fornecedor</div>
                    <div className="value">{selectedConvenio.fornecedor}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">CNPJ</div>
                    <div className="value">{selectedConvenio.cnpj}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Data de Início</div>
                    <div className="value">{selectedConvenio.dataInicio}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Vigência</div>
                    <div className="value">{selectedConvenio.vigencia}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Prazo Médio</div>
                    <div className="value">{selectedConvenio.prazoMedio} dias</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Status</div>
                    <div className="value success">
                      <CheckCircle size={16} weight="fill" style={{ display: 'inline', marginRight: '4px' }} />
                      Ativo
                    </div>
                  </InfoItem>
                </InfoGrid>
              </InfoSection>

              <InfoSection>
                <h3>
                  <CurrencyDollar size={18} />
                  Limites e Utilização
                </h3>
                <InfoGrid>
                  <InfoItem>
                    <div className="label">Limite Total</div>
                    <div className="value highlight">{formatCurrency(selectedConvenio.limiteTotal)}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Limite Disponível</div>
                    <div className="value success">{formatCurrency(selectedConvenio.limiteDisponivel)}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Limite Utilizado</div>
                    <div className="value">{formatCurrency(selectedConvenio.limiteTotal - selectedConvenio.limiteDisponivel)}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Taxa de Utilização</div>
                    <div className="value">
                      {(((selectedConvenio.limiteTotal - selectedConvenio.limiteDisponivel) / selectedConvenio.limiteTotal) * 100).toFixed(1)}%
                    </div>
                  </InfoItem>
                </InfoGrid>

                <ProgressBar>
                  <div className="progress-info">
                    <div className="label">Utilização do Limite</div>
                    <div className="percentage">
                      {(((selectedConvenio.limiteTotal - selectedConvenio.limiteDisponivel) / selectedConvenio.limiteTotal) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${((selectedConvenio.limiteTotal - selectedConvenio.limiteDisponivel) / selectedConvenio.limiteTotal) * 100}%`
                      }}
                    />
                  </div>
                </ProgressBar>
              </InfoSection>

              <InfoSection>
                <h3>
                  <Percent size={18} />
                  Condições Financeiras
                </h3>
                <InfoGrid>
                  <StatCard bgColor="rgba(59, 130, 246, 0.05)">
                    <div className="stat-header">
                      <Percent size={14} />
                      Taxa Média
                    </div>
                    <div className="stat-value">{selectedConvenio.taxaMedia}%</div>
                    <div className="stat-subtitle">ao mês</div>
                  </StatCard>
                  <StatCard bgColor="rgba(34, 197, 94, 0.05)">
                    <div className="stat-header">
                      <Clock size={14} />
                      Prazo Médio
                    </div>
                    <div className="stat-value">{selectedConvenio.prazoMedio}</div>
                    <div className="stat-subtitle">dias</div>
                  </StatCard>
                  <StatCard bgColor="rgba(249, 115, 22, 0.05)">
                    <div className="stat-header">
                      <TrendUp size={14} />
                      Volume Mensal
                    </div>
                    <div className="stat-value">{formatCurrency((selectedConvenio.limiteTotal - selectedConvenio.limiteDisponivel))}</div>
                    <div className="stat-subtitle">média utilizada</div>
                  </StatCard>
                  <StatCard bgColor="rgba(139, 92, 246, 0.05)">
                    <div className="stat-header">
                      <Calendar size={14} />
                      Operações
                    </div>
                    <div className="stat-value">{Math.floor(Math.random() * 20) + 5}</div>
                    <div className="stat-subtitle">últimos 30 dias</div>
                  </StatCard>
                </InfoGrid>
              </InfoSection>

              <InfoSection>
                <h3>
                  <Clock size={18} />
                  Histórico Recente
                </h3>
                <div style={{ fontSize: '14px', color: 'var(--secondary-text)', marginTop: '8px' }}>
                  <div style={{ padding: '12px', background: 'var(--background)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--primary-text)' }}>Última Antecipação</span>
                      <span>18/10/2025</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Valor: {formatCurrency(Math.floor(Math.random() * 30000) + 10000)}</span>
                      <span style={{ color: '#22c55e' }}>Aprovada</span>
                    </div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--background)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--primary-text)' }}>Penúltima Antecipação</span>
                      <span>12/10/2025</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Valor: {formatCurrency(Math.floor(Math.random() * 30000) + 10000)}</span>
                      <span style={{ color: '#22c55e' }}>Aprovada</span>
                    </div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--background)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--primary-text)' }}>Terceira Antecipação</span>
                      <span>05/10/2025</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Valor: {formatCurrency(Math.floor(Math.random() * 30000) + 10000)}</span>
                      <span style={{ color: '#22c55e' }}>Aprovada</span>
                    </div>
                  </div>
                </div>
              </InfoSection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {showCreateModal && (
        <ModalOverlay onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Criar Novo Convênio</h2>
              <button className="close-button" onClick={() => setShowCreateModal(false)}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <label>Nome do Fornecedor *</label>
                  <input type="text" placeholder="Digite o nome do fornecedor" />
                </FormGroup>

                <FormGroup>
                  <label>CNPJ *</label>
                  <input type="text" placeholder="00.000.000/0000-00" />
                </FormGroup>

                <FormGroup>
                  <label>Data de Início *</label>
                  <input type="date" />
                </FormGroup>

                <FormGroup>
                  <label>Vigência (meses) *</label>
                  <select>
                    <option value="">Selecione...</option>
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Limite Total *</label>
                  <input type="text" placeholder="R$ 0,00" />
                </FormGroup>

                <FormGroup>
                  <label>Taxa Média (% a.m.) *</label>
                  <input type="text" placeholder="1.5" />
                </FormGroup>

                <FormGroup>
                  <label>Prazo Médio (dias) *</label>
                  <input type="number" placeholder="45" />
                </FormGroup>

                <FormGroup>
                  <label>Status *</label>
                  <select>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </FormGroup>

                <FormGroup className="full-width">
                  <label>Observações</label>
                  <input type="text" placeholder="Informações adicionais sobre o convênio (opcional)" />
                </FormGroup>
              </FormGrid>
            </ModalBody>

            <ModalFooter>
              <button className="cancel" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </button>
              <button className="submit" onClick={() => {
                // Aqui seria a lógica para criar o convênio
                console.log('Criar convênio');
                setShowCreateModal(false);
              }}>
                Criar Convênio
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Convenios;
