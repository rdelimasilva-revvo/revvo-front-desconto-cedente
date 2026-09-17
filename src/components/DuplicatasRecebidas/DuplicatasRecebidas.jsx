import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  Download,
  FunnelSimple,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  X,
  UserPlus,
  Bank,
  Warning
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

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;

    &.fornecedor_nao_cadastrado {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    &.emitida {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    &.manifestacao_aceita {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    &.manifestacao_recusada {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    &.solicitacao_troca_domicilio {
      background: rgba(251, 191, 36, 0.1);
      color: #f59e0b;
    }

    &.domicilio_trocado {
      background: rgba(168, 85, 247, 0.1);
      color: #a855f7;
    }
  }

  .actions {
    text-align: center;

    button {
      padding: 8px 16px;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;

      &.register {
        background: #0070F2;
        &:hover {
          background: #0061d5;
        }
      }

      &.accept {
        background: #22c55e;
        &:hover {
          background: #16a34a;
        }
      }

      &.reject {
        background: #ef4444;
        &:hover {
          background: #dc2626;
        }
      }

      &.approve {
        background: #a855f7;
        &:hover {
          background: #9333ea;
        }
      }

      &:disabled {
        background: #d1d5db;
        cursor: not-allowed;
      }

      & + button {
        margin-left: 8px;
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
  max-width: 600px;
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
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
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

  .info-section {
    background: var(--background);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;

      &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
      }

      .label {
        font-size: 14px;
        color: var(--secondary-text);
      }

      .value {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text);
      }
    }
  }

  .form-group {
    margin-bottom: 16px;

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text);
      margin-bottom: 8px;
    }

    input, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;

      &:focus {
        outline: none;
        border-color: #0070F2;
        box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }
  }

  .alert {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;

    &.warning {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid #f59e0b;
      color: #92400e;
    }

    &.info {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  button {
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;

    &.cancel {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);

      &:hover {
        background: var(--background);
      }
    }

    &.primary {
      background: #0070F2;
      color: white;

      &:hover {
        background: #0061d5;
      }
    }

    &.success {
      background: #22c55e;
      color: white;

      &:hover {
        background: #16a34a;
      }
    }

    &.danger {
      background: #ef4444;
      color: white;

      &:hover {
        background: #dc2626;
      }
    }
  }
`;

// Mock data
const mockDuplicatas = [
  {
    id: 1,
    numero: 'DUP-2025-001',
    dataEmissao: '01/12/2025',
    fornecedor: 'Fornecedor ABC Ltda',
    fornecedorCnpj: '11.222.333/0001-44',
    dataVencimento: '01/03/2026',
    valor: 25000.00,
    status: 'fornecedor_nao_cadastrado'
  },
  {
    id: 2,
    numero: 'DUP-2025-002',
    dataEmissao: '02/12/2025',
    fornecedor: 'Fornecedor XYZ S.A.',
    fornecedorCnpj: '22.333.444/0001-55',
    dataVencimento: '02/03/2026',
    valor: 18500.00,
    status: 'emitida'
  },
  {
    id: 3,
    numero: 'DUP-2025-003',
    dataEmissao: '03/12/2025',
    fornecedor: 'Fornecedor Beta Corp',
    fornecedorCnpj: '33.444.555/0001-66',
    dataVencimento: '03/03/2026',
    valor: 32000.00,
    status: 'emitida'
  },
  {
    id: 4,
    numero: 'DUP-2025-004',
    dataEmissao: '04/12/2025',
    fornecedor: 'Fornecedor Gamma Ind.',
    fornecedorCnpj: '44.555.666/0001-77',
    dataVencimento: '04/03/2026',
    valor: 15200.00,
    status: 'solicitacao_troca_domicilio',
    bancoAtual: 'Banco Itaú - Ag: 1234 CC: 56789-0',
    bancoNovo: 'Banco Bradesco - Ag: 5678 CC: 12345-6'
  },
  {
    id: 5,
    numero: 'DUP-2025-005',
    dataEmissao: '05/12/2025',
    fornecedor: 'Fornecedor Delta Ltda',
    fornecedorCnpj: '55.666.777/0001-88',
    dataVencimento: '05/03/2026',
    valor: 28900.00,
    status: 'manifestacao_aceita'
  },
  {
    id: 6,
    numero: 'DUP-2025-006',
    dataEmissao: '06/12/2025',
    fornecedor: 'Fornecedor Epsilon ME',
    fornecedorCnpj: '66.777.888/0001-99',
    dataVencimento: '06/03/2026',
    valor: 12400.00,
    status: 'manifestacao_recusada'
  }
];

const DuplicatasRecebidas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'register', 'manifest', 'domicile'
  const [selectedDuplicata, setSelectedDuplicata] = useState(null);
  const [justificativa, setJustificativa] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcular totais
  const fornecedoresNaoCadastrados = mockDuplicatas.filter(d => d.status === 'fornecedor_nao_cadastrado').length;
  const aguardandoManifestacao = mockDuplicatas.filter(d => d.status === 'emitida').length;
  const aguardandoTrocaDomicilio = mockDuplicatas.filter(d => d.status === 'solicitacao_troca_domicilio').length;
  const manifestacoesAceitas = mockDuplicatas.filter(d => d.status === 'manifestacao_aceita').length;

  // Filtrar duplicatas
  const filteredDuplicatas = mockDuplicatas.filter(dup => {
    const matchesSearch =
      dup.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dup.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dup.fornecedorCnpj.includes(searchTerm);

    const matchesStatus = !statusFilter || dup.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleRegisterSupplier = (duplicata) => {
    setSelectedDuplicata(duplicata);
    setModalType('register');
    setShowModal(true);
  };

  const handleManifest = (duplicata) => {
    setSelectedDuplicata(duplicata);
    setModalType('manifest');
    setShowModal(true);
  };

  const handleDomicileChange = (duplicata) => {
    setSelectedDuplicata(duplicata);
    setModalType('domicile');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedDuplicata(null);
    setJustificativa('');
  };

  const handleConfirmRegister = () => {
    alert(`Fornecedor ${selectedDuplicata.fornecedor} cadastrado com sucesso!\nDuplicata ${selectedDuplicata.numero} agora está com status "Emitida".`);
    handleCloseModal();
  };

  const handleConfirmAccept = () => {
    alert(`Manifestação de ACEITE registrada com sucesso!\nDuplicata ${selectedDuplicata.numero} agora está com status "Manifestação Aceita".`);
    handleCloseModal();
  };

  const handleConfirmReject = () => {
    if (!justificativa.trim()) {
      alert('Por favor, informe a justificativa da recusa.');
      return;
    }
    alert(`Manifestação de RECUSA registrada com sucesso!\nDuplicata ${selectedDuplicata.numero} foi recusada.\nJustificativa: ${justificativa}`);
    handleCloseModal();
  };

  const handleConfirmDomicileApprove = () => {
    alert(`Troca de domicílio APROVADA com sucesso!\nDuplicata ${selectedDuplicata.numero} agora será paga no novo domicílio bancário.`);
    handleCloseModal();
  };

  const handleConfirmDomicileReject = () => {
    if (!justificativa.trim()) {
      alert('Por favor, informe a justificativa da recusa.');
      return;
    }
    alert(`Troca de domicílio RECUSADA!\nDuplicata ${selectedDuplicata.numero} continuará no domicílio original.\nJustificativa: ${justificativa}`);
    handleCloseModal();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fornecedor_nao_cadastrado':
        return <Warning size={16} weight="fill" />;
      case 'emitida':
        return <Clock size={16} weight="fill" />;
      case 'manifestacao_aceita':
        return <CheckCircle size={16} weight="fill" />;
      case 'manifestacao_recusada':
        return <XCircle size={16} weight="fill" />;
      case 'solicitacao_troca_domicilio':
        return <Bank size={16} weight="fill" />;
      case 'domicilio_trocado':
        return <CheckCircle size={16} weight="fill" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'fornecedor_nao_cadastrado':
        return 'Fornecedor Não Cadastrado';
      case 'emitida':
        return 'Aguardando Manifestação';
      case 'manifestacao_aceita':
        return 'Manifestação Aceita';
      case 'manifestacao_recusada':
        return 'Manifestação Recusada';
      case 'solicitacao_troca_domicilio':
        return 'Aguardando Troca de Domicílio';
      case 'domicilio_trocado':
        return 'Domicílio Trocado';
      default:
        return status;
    }
  };

  return (
    <Container>
      <PageHeader>
        <h1>Duplicatas Recebidas</h1>
        <ExportButton>
          <Download size={16} weight="bold" />
          Exportar
        </ExportButton>
      </PageHeader>

      <SummaryCards>
        <SummaryCard $color="#ef4444">
          <div className="label">Fornecedor Não Cadastrado</div>
          <div className="value">{fornecedoresNaoCadastrados}</div>
        </SummaryCard>

        <SummaryCard $color="#3b82f6">
          <div className="label">Aguardando Manifestação</div>
          <div className="value">{aguardandoManifestacao}</div>
        </SummaryCard>

        <SummaryCard $color="#f59e0b">
          <div className="label">Aguardando Troca Domicílio</div>
          <div className="value">{aguardandoTrocaDomicilio}</div>
        </SummaryCard>

        <SummaryCard $color="#22c55e">
          <div className="label">Manifestações Aceitas</div>
          <div className="value">{manifestacoesAceitas}</div>
        </SummaryCard>
      </SummaryCards>

      <SearchSection>
        <SearchRow>
          <SearchInput>
            <MagnifyingGlass size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por número, fornecedor ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>

          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="fornecedor_nao_cadastrado">Fornecedor Não Cadastrado</option>
            <option value="emitida">Aguardando Manifestação</option>
            <option value="solicitacao_troca_domicilio">Aguardando Troca de Domicílio</option>
            <option value="manifestacao_aceita">Manifestação Aceita</option>
            <option value="manifestacao_recusada">Manifestação Recusada</option>
          </FilterSelect>
        </SearchRow>
      </SearchSection>

      <TableSection>
        {filteredDuplicatas.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Duplicata</th>
                <th>Fornecedor (Cedente)</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDuplicatas.map((dup) => (
                <tr key={dup.id}>
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
                      <span className="name">{dup.fornecedor}</span>
                      <span className="cnpj">{dup.fornecedorCnpj}</span>
                    </div>
                  </td>
                  <td>{dup.dataVencimento}</td>
                  <td className="value">{formatCurrency(dup.valor)}</td>
                  <td>
                    <span className={`status-badge ${dup.status}`}>
                      {getStatusIcon(dup.status)}
                      {getStatusLabel(dup.status)}
                    </span>
                  </td>
                  <td className="actions">
                    {dup.status === 'fornecedor_nao_cadastrado' && (
                      <button
                        className="register"
                        onClick={() => handleRegisterSupplier(dup)}
                      >
                        <UserPlus size={16} />
                        Cadastrar Fornecedor
                      </button>
                    )}
                    {dup.status === 'emitida' && (
                      <button
                        className="accept"
                        onClick={() => handleManifest(dup)}
                      >
                        Manifestar
                      </button>
                    )}
                    {dup.status === 'solicitacao_troca_domicilio' && (
                      <button
                        className="approve"
                        onClick={() => handleDomicileChange(dup)}
                      >
                        <Bank size={16} />
                        Avaliar Troca
                      </button>
                    )}
                    {(dup.status === 'manifestacao_aceita' || dup.status === 'manifestacao_recusada') && (
                      <span style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>
                        Processada
                      </span>
                    )}
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

      {/* Modal de Cadastro de Fornecedor */}
      {showModal && modalType === 'register' && selectedDuplicata && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>
                <UserPlus size={24} />
                Cadastrar Fornecedor
              </h2>
              <button onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <div className="alert warning">
                <Warning size={20} />
                <div>
                  <strong>Atenção:</strong> Este fornecedor não está cadastrado no sistema.
                  É necessário realizar o cadastro antes de manifestar aceite da duplicata.
                </div>
              </div>

              <div className="info-section">
                <div className="info-row">
                  <span className="label">Duplicata</span>
                  <span className="value">{selectedDuplicata.numero}</span>
                </div>
                <div className="info-row">
                  <span className="label">Fornecedor</span>
                  <span className="value">{selectedDuplicata.fornecedor}</span>
                </div>
                <div className="info-row">
                  <span className="label">CNPJ</span>
                  <span className="value">{selectedDuplicata.fornecedorCnpj}</span>
                </div>
                <div className="info-row">
                  <span className="label">Valor</span>
                  <span className="value">{formatCurrency(selectedDuplicata.valor)}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Observações (Opcional)</label>
                <textarea
                  placeholder="Adicione observações sobre o cadastro deste fornecedor..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <button className="cancel" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="primary" onClick={handleConfirmRegister}>
                <UserPlus size={16} />
                Cadastrar e Prosseguir
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de Manifestação */}
      {showModal && modalType === 'manifest' && selectedDuplicata && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Manifestar Aceite ou Recusa</h2>
              <button onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <div className="alert info">
                <FileText size={20} />
                <div>
                  Você está prestes a manifestar sua posição sobre esta duplicata.
                  Esta ação ficará registrada no sistema.
                </div>
              </div>

              <div className="info-section">
                <div className="info-row">
                  <span className="label">Duplicata</span>
                  <span className="value">{selectedDuplicata.numero}</span>
                </div>
                <div className="info-row">
                  <span className="label">Fornecedor</span>
                  <span className="value">{selectedDuplicata.fornecedor}</span>
                </div>
                <div className="info-row">
                  <span className="label">CNPJ</span>
                  <span className="value">{selectedDuplicata.fornecedorCnpj}</span>
                </div>
                <div className="info-row">
                  <span className="label">Valor</span>
                  <span className="value">{formatCurrency(selectedDuplicata.valor)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Vencimento</span>
                  <span className="value">{selectedDuplicata.dataVencimento}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Justificativa (obrigatório para recusa)</label>
                <textarea
                  placeholder="Em caso de recusa, informe o motivo..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <button className="cancel" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="danger" onClick={handleConfirmReject}>
                <XCircle size={16} />
                Recusar
              </button>
              <button className="success" onClick={handleConfirmAccept}>
                <CheckCircle size={16} />
                Aceitar
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de Troca de Domicílio */}
      {showModal && modalType === 'domicile' && selectedDuplicata && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>
                <Bank size={24} />
                Aprovar Troca de Domicílio Bancário
              </h2>
              <button onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </ModalHeader>

            <ModalBody>
              <div className="alert warning">
                <Warning size={20} />
                <div>
                  <strong>Solicitação de Troca de Domicílio:</strong> O fornecedor solicitou
                  alteração do domicílio bancário para pagamento desta duplicata.
                </div>
              </div>

              <div className="info-section">
                <div className="info-row">
                  <span className="label">Duplicata</span>
                  <span className="value">{selectedDuplicata.numero}</span>
                </div>
                <div className="info-row">
                  <span className="label">Fornecedor</span>
                  <span className="value">{selectedDuplicata.fornecedor}</span>
                </div>
                <div className="info-row">
                  <span className="label">Valor</span>
                  <span className="value">{formatCurrency(selectedDuplicata.valor)}</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  padding: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                    Domicílio Atual
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-text)' }}>
                    {selectedDuplicata.bancoAtual}
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                    Novo Domicílio Proposto
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-text)' }}>
                    {selectedDuplicata.bancoNovo}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Justificativa (obrigatório para recusa)</label>
                <textarea
                  placeholder="Em caso de recusa, informe o motivo..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <button className="cancel" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="danger" onClick={handleConfirmDomicileReject}>
                <XCircle size={16} />
                Recusar Troca
              </button>
              <button className="success" onClick={handleConfirmDomicileApprove}>
                <CheckCircle size={16} />
                Aprovar Troca
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default DuplicatasRecebidas;
