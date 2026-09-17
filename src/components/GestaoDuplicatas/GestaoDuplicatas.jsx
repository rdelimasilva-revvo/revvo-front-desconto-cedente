import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  Download,
  Plus,
  Eye,
  FileArrowUp,
  CloudArrowUp,
  Trash,
  FileText,
  PaperPlaneRight,
  CheckCircle,
  X,
  CloudCheck,
  ArrowsClockwise
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

const TabsContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`;

const Tab = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--primary-blue)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--secondary-text)'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--primary-blue);
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
    white-space: nowrap;

    &.primary {
      background: var(--primary-blue);
      color: white;
      border: none;

      &:hover {
        background: #2563eb;
      }

      &:disabled {
        background: #94a3b8;
        cursor: not-allowed;
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

    &.success {
      background: #22c55e;
      color: white;
      border: none;

      &:hover {
        background: #16a34a;
      }

      &:disabled {
        background: #94a3b8;
        cursor: not-allowed;
      }
    }
  }
`;

const ContentArea = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
`;

const UploadArea = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 48px 32px;
  text-align: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-blue);
    background: rgba(59, 130, 246, 0.05);
  }

  .icon {
    font-size: 48px;
    color: var(--secondary-text);
    margin-bottom: 16px;
  }

  h4 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--primary-text);
  }

  p {
    color: var(--secondary-text);
    margin-bottom: 16px;
    font-size: 14px;
  }

  button {
    background: var(--primary-blue);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: #2563eb;
    }
  }
`;

const FormSection = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--primary-text);
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 16px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .form-row.full {
    grid-template-columns: 1fr;
  }

  .form-group {
    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--primary-text);

      .required {
        color: #ef4444;
        margin-left: 4px;
      }
    }

    input, select, textarea {
      width: 100%;
      height: 40px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 0 12px;
      font-size: 14px;
      color: var(--primary-text);

      &:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      &::placeholder {
        color: var(--secondary-text);
      }
    }

    textarea {
      height: 80px;
      padding: 12px;
      resize: vertical;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
  }
`;

const InfoBox = styled.div`
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--primary-text);
  }

  ul {
    font-size: 13px;
    color: var(--secondary-text);
    margin-left: 28px;
    line-height: 1.6;

    li {
      margin-bottom: 4px;
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
    width: 100%;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;

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
  min-width: 900px;

  th {
    background: var(--background);
    padding: 12px 16px;
    font-weight: 600;
    font-size: 13px;
    color: var(--secondary-text);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 20px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 20px;
      text-align: center;
    }
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--primary-text);
    vertical-align: middle;

    &:first-child {
      padding-left: 20px;
    }

    &:last-child {
      padding-right: 20px;
      text-align: center;
    }

    &.status {
      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;

        &.pendente {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }

        &.enviada {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        &.erro {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }

    &.actions {
      button {
        background: none;
        border: none;
        color: var(--primary-blue);
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
          color: #2563eb;
          background: rgba(59, 130, 246, 0.1);
        }

        &.delete {
          color: #ef4444;

          &:hover {
            background: rgba(239, 68, 68, 0.1);
          }
        }
      }
    }
  }

  tbody tr:hover {
    background: var(--background);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: var(--secondary-text);

  .icon {
    margin-bottom: 16px;
    color: var(--secondary-text);
  }

  h4 {
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--primary-text);
  }

  p {
    font-size: 14px;
  }
`;

const SyncButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const GestaoDuplicatas = () => {
  const [activeTab, setActiveTab] = useState('xml');
  const [searchTerm, setSearchTerm] = useState('');
  const [duplicatas, setDuplicatas] = useState([
    {
      id: 1,
      numero: 'DUP-001/2025',
      sacado: 'Hospital São Lucas',
      cnpjSacado: '12.345.678/0001-90',
      valor: 45000.00,
      vencimento: '2025-07-15',
      emissao: '2025-06-15',
      status: 'pendente',
      origem: 'xml'
    },
    {
      id: 2,
      numero: 'DUP-002/2025',
      sacado: 'Clínica Medical Center',
      cnpjSacado: '98.765.432/0001-10',
      valor: 27500.00,
      vencimento: '2025-07-20',
      emissao: '2025-06-18',
      status: 'enviada',
      origem: 'manual'
    },
    {
      id: 3,
      numero: 'DUP-003/2025',
      sacado: 'Empresa Beta Ltda',
      cnpjSacado: '11.222.333/0001-44',
      valor: 32000.00,
      vencimento: '2025-07-25',
      emissao: '2025-06-20',
      status: 'pendente',
      origem: 'sefaz'
    }
  ]);

  // Estados do formulário manual
  const [formData, setFormData] = useState({
    numero: '',
    sacado: '',
    cnpjSacado: '',
    valor: '',
    vencimento: '',
    emissao: '',
    observacoes: ''
  });

  // Estados para busca SEFAZ
  const [sefazForm, setSefazForm] = useState({
    cnpj: '',
    dataInicio: '',
    dataFim: ''
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleFileUpload = (e, tipo) => {
    e.preventDefault();
    alert(`Funcionalidade de upload de ${tipo} será implementada. Os arquivos serão processados e convertidos em duplicatas.`);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSefazFormChange = (field, value) => {
    setSefazForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBuscarSEFAZ = (e) => {
    e.preventDefault();
    alert('Funcionalidade de busca na SEFAZ será implementada aqui.');
  };

  const handleSincronizarSAP = () => {
    alert('Sincronização com cargas externas (SAP) será implementada aqui.');
  };

  const handleAddDuplicata = (e) => {
    e.preventDefault();

    if (!formData.numero || !formData.sacado || !formData.cnpjSacado || !formData.valor || !formData.vencimento || !formData.emissao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaDuplicata = {
      id: duplicatas.length + 1,
      numero: formData.numero,
      sacado: formData.sacado,
      cnpjSacado: formData.cnpjSacado,
      valor: parseFloat(formData.valor),
      vencimento: formData.vencimento,
      emissao: formData.emissao,
      status: 'pendente',
      origem: 'manual',
      observacoes: formData.observacoes
    };

    setDuplicatas([...duplicatas, novaDuplicata]);

    setFormData({
      numero: '',
      sacado: '',
      cnpjSacado: '',
      valor: '',
      vencimento: '',
      emissao: '',
      observacoes: ''
    });

    alert('Duplicata adicionada com sucesso!');
  };

  const handleClearForm = () => {
    setFormData({
      numero: '',
      sacado: '',
      cnpjSacado: '',
      valor: '',
      vencimento: '',
      emissao: '',
      observacoes: ''
    });
  };

  const handleViewDetails = (duplicata) => {
    alert(`Visualizar detalhes da duplicata ${duplicata.numero}`);
  };

  const handleDeleteDuplicata = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta duplicata?')) {
      setDuplicatas(duplicatas.filter(dup => dup.id !== id));
    }
  };

  const handleEnviarRegistradora = () => {
    const pendentes = duplicatas.filter(dup => dup.status === 'pendente');

    if (pendentes.length === 0) {
      alert('Não há duplicatas pendentes para enviar à registradora.');
      return;
    }

    if (window.confirm(`Deseja enviar ${pendentes.length} duplicata(s) para a registradora?`)) {
      setDuplicatas(duplicatas.map(dup =>
        dup.status === 'pendente' ? { ...dup, status: 'enviada' } : dup
      ));

      alert(`${pendentes.length} duplicata(s) enviada(s) para a registradora com sucesso!`);
    }
  };

  const filteredDuplicatas = duplicatas.filter(dup => {
    const matchesSearch = dup.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dup.sacado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dup.cnpjSacado.includes(searchTerm);
    return matchesSearch;
  });

  const duplicatasPendentes = duplicatas.filter(dup => dup.status === 'pendente').length;

  return (
    <Container>
      <PageHeader>
        <h1>Gestão de Duplicatas</h1>
        <p>Importe, crie e gerencie duplicatas de diversas fontes para negociações de crédito</p>
      </PageHeader>

      <TabsContainer>
        <Tab
          active={activeTab === 'xml'}
          onClick={() => setActiveTab('xml')}
        >
          <FileArrowUp size={16} weight="regular" />
          Upload XML
        </Tab>
        <Tab
          active={activeTab === 'sefaz'}
          onClick={() => setActiveTab('sefaz')}
        >
          <CloudCheck size={16} weight="regular" />
          Busca SEFAZ
        </Tab>
        <Tab
          active={activeTab === 'sap'}
          onClick={() => setActiveTab('sap')}
        >
          <ArrowsClockwise size={16} weight="regular" />
          Cargas Externas
        </Tab>
        <Tab
          active={activeTab === 'planilha'}
          onClick={() => setActiveTab('planilha')}
        >
          <FileText size={16} weight="regular" />
          Upload Planilha
        </Tab>
        <Tab
          active={activeTab === 'manual'}
          onClick={() => setActiveTab('manual')}
        >
          <Plus size={16} weight="regular" />
          Entrada Manual
        </Tab>
      </TabsContainer>

      {/* Busca e Ações */}
      <SearchSection>
        <SearchInput>
          <MagnifyingGlass size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por número, sacado ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>

        <ActionButtons>
          <button className="secondary">
            <Download size={16} />
            Exportar
          </button>
          <button
            className="success"
            onClick={handleEnviarRegistradora}
            disabled={duplicatasPendentes === 0}
          >
            <PaperPlaneRight size={16} />
            Enviar para Registradora ({duplicatasPendentes})
          </button>
        </ActionButtons>
      </SearchSection>

      {/* Conteúdo da aba Upload XML */}
      {activeTab === 'xml' && (
        <ContentArea>
          <UploadArea onClick={() => document.getElementById('file-upload-xml').click()}>
            <CloudArrowUp size={48} className="icon" />
            <h4>Arraste e solte arquivos XML aqui</h4>
            <p>Arquivos de notas fiscais em formato XML</p>
            <button onClick={(e) => handleFileUpload(e, 'XML')}>Selecionar Arquivos XML</button>
            <input
              type="file"
              id="file-upload-xml"
              style={{ display: 'none' }}
              accept=".xml"
              multiple
              onChange={(e) => handleFileUpload(e, 'XML')}
            />
          </UploadArea>

          <InfoBox>
            <h4>
              <FileText size={16} />
              Instruções para upload de XML
            </h4>
            <ul>
              <li>Arquivos devem estar no formato XML padrão de notas fiscais (NF-e)</li>
              <li>Após o upload, as duplicatas serão automaticamente criadas a partir dos dados da nota</li>
              <li>Revise as duplicatas na tabela abaixo antes de enviar para a registradora</li>
            </ul>
          </InfoBox>
        </ContentArea>
      )}

      {/* Conteúdo da aba Busca SEFAZ */}
      {activeTab === 'sefaz' && (
        <ContentArea>
          <FormSection>
            <h3>Buscar Notas Fiscais na SEFAZ</h3>
            <form onSubmit={handleBuscarSEFAZ}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    CNPJ do Emitente
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={sefazForm.cnpj}
                    onChange={(e) => handleSefazFormChange('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Data Início
                    <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={sefazForm.dataInicio}
                    onChange={(e) => handleSefazFormChange('dataInicio', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Data Fim
                    <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={sefazForm.dataFim}
                    onChange={(e) => handleSefazFormChange('dataFim', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="primary">
                  <CloudCheck size={16} />
                  Buscar na SEFAZ
                </button>
              </div>
            </form>
          </FormSection>

          <InfoBox>
            <h4>
              <CloudCheck size={16} />
              Como funciona a busca na SEFAZ
            </h4>
            <ul>
              <li>Informe o CNPJ do emitente e o período para buscar as notas fiscais</li>
              <li>O sistema buscará todas as notas fiscais emitidas no período informado</li>
              <li>As duplicatas serão criadas automaticamente a partir das notas encontradas</li>
            </ul>
          </InfoBox>
        </ContentArea>
      )}

      {/* Conteúdo da aba Cargas Externas (SAP) */}
      {activeTab === 'sap' && (
        <ContentArea>
          <FormSection>
            <h3>Carregar Notas Fiscais de Cargas Externas</h3>
            <p style={{ color: 'var(--secondary-text)', marginBottom: '24px' }}>
              Sincronize com sistemas externos como SAP, ERP ou outras fontes de dados.
            </p>

            <SyncButton onClick={handleSincronizarSAP}>
              <ArrowsClockwise size={16} />
              Sincronizar com Cargas Externas
            </SyncButton>
          </FormSection>

          <InfoBox>
            <h4>
              <ArrowsClockwise size={16} />
              Integração com Sistemas Externos
            </h4>
            <ul>
              <li>Conecte-se ao SAP ou outros sistemas ERP para importar notas fiscais</li>
              <li>As duplicatas serão criadas automaticamente a partir dos dados sincronizados</li>
              <li>A sincronização pode levar alguns minutos dependendo do volume de dados</li>
            </ul>
          </InfoBox>
        </ContentArea>
      )}

      {/* Conteúdo da aba Upload Planilha */}
      {activeTab === 'planilha' && (
        <ContentArea>
          <UploadArea onClick={() => document.getElementById('file-upload-planilha').click()}>
            <CloudArrowUp size={48} className="icon" />
            <h4>Arraste e solte planilhas aqui</h4>
            <p>Formatos aceitos: .xlsx, .csv, .txt</p>
            <button onClick={(e) => handleFileUpload(e, 'planilha')}>Selecionar Arquivos</button>
            <input
              type="file"
              id="file-upload-planilha"
              style={{ display: 'none' }}
              accept=".xlsx,.csv,.txt"
              multiple
              onChange={(e) => handleFileUpload(e, 'planilha')}
            />
          </UploadArea>

          <InfoBox>
            <h4>
              <FileText size={16} />
              Instruções para upload de planilhas
            </h4>
            <ul>
              <li>Os arquivos devem conter as seguintes colunas: Número, Sacado, CNPJ do Sacado, Valor, Data de Vencimento, Data de Emissão</li>
              <li>Após o upload, as duplicatas serão automaticamente criadas e ficarão com status "Pendente"</li>
              <li>Revise as duplicatas na tabela abaixo antes de enviar para a registradora</li>
            </ul>
          </InfoBox>
        </ContentArea>
      )}

      {/* Conteúdo da aba Entrada Manual */}
      {activeTab === 'manual' && (
        <ContentArea>
          <FormSection>
            <h3>Criar Nova Duplicata</h3>
            <form onSubmit={handleAddDuplicata}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Número da Duplicata
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.numero}
                    onChange={(e) => handleFormChange('numero', e.target.value)}
                    placeholder="Ex: DUP-001/2025"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Data de Emissão
                    <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.emissao}
                    onChange={(e) => handleFormChange('emissao', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Data de Vencimento
                    <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.vencimento}
                    onChange={(e) => handleFormChange('vencimento', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Sacado (Nome/Razão Social)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sacado}
                    onChange={(e) => handleFormChange('sacado', e.target.value)}
                    placeholder="Ex: Hospital São Lucas"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    CNPJ do Sacado
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cnpjSacado}
                    onChange={(e) => handleFormChange('cnpjSacado', e.target.value)}
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Valor (R$)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => handleFormChange('valor', e.target.value)}
                    placeholder="0,00"
                    required
                  />
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label>Observações</label>
                  <textarea
                    value={formData.observacoes}
                    onChange={(e) => handleFormChange('observacoes', e.target.value)}
                    placeholder="Informações adicionais sobre a duplicata (opcional)"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={handleClearForm}
                >
                  <X size={16} />
                  Limpar
                </button>
                <button type="submit" className="primary">
                  <Plus size={16} />
                  Adicionar Duplicata
                </button>
              </div>
            </form>
          </FormSection>
        </ContentArea>
      )}

      {/* Tabela de Duplicatas */}
      <TableSection>
        <div className="table-header">
          <h3>Duplicatas Criadas</h3>
          <div className="table-info">
            {filteredDuplicatas.length} duplicata(s) | {duplicatasPendentes} pendente(s)
          </div>
        </div>

        <div className="table-responsive">
          {filteredDuplicatas.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Sacado</th>
                  <th>CNPJ</th>
                  <th>Data Emissão</th>
                  <th>Data Vencimento</th>
                  <th>Valor (R$)</th>
                  <th>Origem</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredDuplicatas.map(duplicata => (
                  <tr key={duplicata.id}>
                    <td>{duplicata.numero}</td>
                    <td>{duplicata.sacado}</td>
                    <td>{duplicata.cnpjSacado}</td>
                    <td>{formatDate(duplicata.emissao)}</td>
                    <td>{formatDate(duplicata.vencimento)}</td>
                    <td>{formatCurrency(duplicata.valor)}</td>
                    <td>
                      <span style={{ textTransform: 'capitalize' }}>
                        {duplicata.origem === 'xml' ? 'XML' :
                         duplicata.origem === 'sefaz' ? 'SEFAZ' :
                         duplicata.origem === 'sap' ? 'SAP' :
                         duplicata.origem === 'planilha' ? 'Planilha' : 'Manual'}
                      </span>
                    </td>
                    <td className="status">
                      <span className={`status-badge ${duplicata.status}`}>
                        {duplicata.status === 'pendente' ? 'Pendente' :
                         duplicata.status === 'enviada' ? 'Enviada' : 'Erro'}
                      </span>
                    </td>
                    <td className="actions">
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          title="Ver detalhes"
                          onClick={() => handleViewDetails(duplicata)}
                        >
                          <Eye size={16} />
                        </button>
                        {duplicata.status === 'pendente' && (
                          <button
                            title="Excluir"
                            className="delete"
                            onClick={() => handleDeleteDuplicata(duplicata.id)}
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState>
              <div className="icon">
                <FileText size={48} />
              </div>
              <h4>Nenhuma duplicata encontrada</h4>
              <p>Use as abas acima para criar duplicatas através de diferentes fontes.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>
    </Container>
  );
};

export default GestaoDuplicatas;
