import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Download, 
  Plus, 
  CaretDown,
  Eye,
  FileArrowUp,
  CloudArrowUp,
  CheckCircle,
  XCircle,
  Copy,
  FileText,
  ArrowsClockwise,
  CloudCheck
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

const TabsContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
`;

const Tab = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--primary-blue)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--secondary-text)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-blue);
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  overflow: hidden;
`;

const FilterHeader = styled.div`
  padding: 16px 24px;
  background: #F8F9FA;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  .left {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0;
    }
  }

  .icon {
    transition: transform 0.3s ease;
    
    &.open {
      transform: rotate(180deg);
    }
  }
`;

const FilterContent = styled.div`
  padding: 24px;
  background: #F8F9FA;
  
  .filters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .filter-group {
    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text);
      margin-bottom: 4px;
    }

    select,
    input {
      width: 100%;
      height: 40px;
      background: white;
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
    }
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
`;

const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  
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
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    scrollbar-width: thin; /* For Firefox */
    
    /* Custom scrollbar for webkit browsers */
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
  min-width: 900px; /* Ensure minimum width for table */
  
  th {
    background: var(--background);
    padding: 12px 16px;
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
    }
    
    &.status {
      width: 140px;
      
      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;
        
        &.disponivel {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.em-negociacao {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        
        &.antecipada {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }
        
        &.erro {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }
    
    &.actions {
      text-align: center;
      width: 120px;
      
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
    margin-bottom: 24px;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  margin-bottom: 24px;
  background: var(--background);
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
  }
  
  p {
    color: var(--secondary-text);
    margin-bottom: 16px;
  }
  
  button {
    background: var(--primary-blue);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background: #2563eb;
    }
  }
`;

const SearchForm = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--border-color);
  margin-bottom: 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  .form-group {
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    input, select {
      width: 100%;
      height: 40px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 0 12px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-blue);
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
`;

// Mock data para as notas fiscais
const mockNotasXML = [
  {
    id: 1,
    numero: 'NF-e 123456',
    emitente: 'Fornecedor Medical LTDA',
    cnpj: '12.345.678/0001-90',
    dataEmissao: '2025-06-10',
    valor: 45000.00,
    status: 'disponivel',
    chaveAcesso: '12345678901234567890123456789012345678901234',
    origem: 'upload-xml'
  },
  {
    id: 2,
    numero: 'NF-e 789012',
    emitente: 'Instrumental Cirúrgico Brasil',
    cnpj: '98.765.432/0001-10',
    dataEmissao: '2025-06-08',
    valor: 27500.00,
    status: 'em-negociacao',
    chaveAcesso: '09876543210987654321098765432109876543210987',
    origem: 'upload-xml'
  },
  {
    id: 3,
    numero: 'NF-e 345678',
    emitente: 'Pharma Suprimentos S.A.',
    cnpj: '45.678.901/0001-23',
    dataEmissao: '2025-06-05',
    valor: 18750.00,
    status: 'antecipada',
    chaveAcesso: '45678901234567890123456789012345678901234567',
    origem: 'upload-xml'
  },
  {
    id: 4,
    numero: 'NF-e 901234',
    emitente: 'MedTech Equipamentos',
    cnpj: '78.901.234/0001-56',
    dataEmissao: '2025-06-12',
    valor: 65000.00,
    status: 'disponivel',
    chaveAcesso: '78901234567890123456789012345678901234567890',
    origem: 'upload-xml'
  },
  {
    id: 5,
    numero: 'NF-e 567890',
    emitente: 'Global Health Suprimentos',
    cnpj: '23.456.789/0001-01',
    dataEmissao: '2025-06-07',
    valor: 33200.00,
    status: 'erro',
    chaveAcesso: '23456789012345678901234567890123456789012345',
    origem: 'upload-xml'
  }
];

const mockNotasSefaz = [
  {
    id: 6,
    numero: 'NF-e 654321',
    emitente: 'Distribuidora Medicamentos Brasil',
    cnpj: '34.567.890/0001-12',
    dataEmissao: '2025-06-15',
    valor: 52800.00,
    status: 'disponivel',
    chaveAcesso: '34567890123456789012345678901234567890123456',
    origem: 'busca-sefaz'
  },
  {
    id: 7,
    numero: 'NF-e 098765',
    emitente: 'Distribuidora Farmacêutica Nacional',
    cnpj: '56.789.012/0001-34',
    dataEmissao: '2025-06-14',
    valor: 41250.00,
    status: 'em-negociacao',
    chaveAcesso: '56789012345678901234567890123456789012345678',
    origem: 'busca-sefaz'
  },
  {
    id: 8,
    numero: 'NF-e 432109',
    emitente: 'Distribuidora Saúde Total',
    cnpj: '90.123.456/0001-78',
    dataEmissao: '2025-06-13',
    valor: 29600.00,
    status: 'antecipada',
    chaveAcesso: '90123456789012345678901234567890123456789012',
    origem: 'busca-sefaz'
  },
  {
    id: 9,
    numero: 'NF-e 876543',
    emitente: 'Distribuidora Médica Express',
    cnpj: '67.890.123/0001-45',
    dataEmissao: '2025-06-11',
    valor: 18900.00,
    status: 'disponivel',
    chaveAcesso: '67890123456789012345678901234567890123456789',
    origem: 'busca-sefaz'
  },
  {
    id: 10,
    numero: 'NF-e 210987',
    emitente: 'Distribuidora Pharma Plus',
    cnpj: '12.345.678/0002-71',
    dataEmissao: '2025-06-09',
    valor: 37500.00,
    status: 'erro',
    chaveAcesso: '12345678901234567890123456789012345678901235',
    origem: 'busca-sefaz'
  }
];

const mockNotasSap = [
  {
    id: 11,
    numero: 'NF-e 111222',
    emitente: 'SAP Fornecedor Alpha',
    cnpj: '11.222.333/0001-44',
    dataEmissao: '2025-06-16',
    valor: 48500.00,
    status: 'disponivel',
    chaveAcesso: '11222333444555666777888999000111222333444555',
    origem: 'carga-sap',
    documentoSap: 'DOC-SAP-001',
    centroCusto: 'CC-1001'
  },
  {
    id: 12,
    numero: 'NF-e 333444',
    emitente: 'SAP Fornecedor Beta',
    cnpj: '22.333.444/0001-55',
    dataEmissao: '2025-06-17',
    valor: 35700.00,
    status: 'em-negociacao',
    chaveAcesso: '22333444555666777888999000111222333444555666',
    origem: 'carga-sap',
    documentoSap: 'DOC-SAP-002',
    centroCusto: 'CC-1002'
  },
  {
    id: 13,
    numero: 'NF-e 555666',
    emitente: 'SAP Fornecedor Gamma',
    cnpj: '33.444.555/0001-66',
    dataEmissao: '2025-06-18',
    valor: 62100.00,
    status: 'disponivel',
    chaveAcesso: '33444555666777888999000111222333444555666777',
    origem: 'carga-sap',
    documentoSap: 'DOC-SAP-003',
    centroCusto: 'CC-1003'
  },
  {
    id: 14,
    numero: 'NF-e 777888',
    emitente: 'SAP Fornecedor Delta',
    cnpj: '44.555.666/0001-77',
    dataEmissao: '2025-06-19',
    valor: 25300.00,
    status: 'antecipada',
    chaveAcesso: '44555666777888999000111222333444555666777888',
    origem: 'carga-sap',
    documentoSap: 'DOC-SAP-004',
    centroCusto: 'CC-1004'
  },
  {
    id: 15,
    numero: 'NF-e 999000',
    emitente: 'SAP Fornecedor Epsilon',
    cnpj: '55.666.777/0001-88',
    dataEmissao: '2025-06-20',
    valor: 54900.00,
    status: 'disponivel',
    chaveAcesso: '55666777888999000111222333444555666777888999',
    origem: 'carga-sap',
    documentoSap: 'DOC-SAP-005',
    centroCusto: 'CC-1005'
  }
];

const CapturaNotas = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [notasXML, setNotasXML] = useState(mockNotasXML);
  const [notasSefaz, setNotasSefaz] = useState(mockNotasSefaz);
  const [notasSap, setNotasSap] = useState(mockNotasSap);
  const [selectedNotasXML, setSelectedNotasXML] = useState(new Set());

  // Estados para o formulário de busca SEFAZ
  const [cnpjEmitente, setCnpjEmitente] = useState('');
  const [numeroNota, setNumeroNota] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    alert('Funcionalidade de upload de XML será implementada aqui.');
  };

  const handleSearchSefaz = (e) => {
    e.preventDefault();
    alert('Funcionalidade de busca na SEFAZ será implementada aqui.');
  };

  const handleNegociar = (nota) => {
    alert(`Iniciar negociação para a nota ${nota.numero}`);
  };

  const handleViewDetails = (nota) => {
    alert(`Visualizar detalhes da nota ${nota.numero}`);
  };

  const handleSelectNotaXML = (notaId, checked) => {
    const newSelected = new Set(selectedNotasXML);
    if (checked) {
      newSelected.add(notaId);
    } else {
      newSelected.delete(notaId);
    }
    setSelectedNotasXML(newSelected);
  };

  const handleSelectAllXML = (checked) => {
    if (checked) {
      const availableNotes = filteredNotasXML
        .filter(nota => nota.status === 'disponivel')
        .map(nota => nota.id);
      setSelectedNotasXML(new Set(availableNotes));
    } else {
      setSelectedNotasXML(new Set());
    }
  };

  const handleSolicitarAntecipacao = () => {
    if (selectedNotasXML.size === 0) {
      alert('Selecione pelo menos uma nota fiscal para solicitar antecipação.');
      return;
    }
    
    const selectedNotes = filteredNotasXML.filter(nota => selectedNotasXML.has(nota.id));
    alert(`Solicitando antecipação para ${selectedNotes.length} nota(s) fiscal(is).`);
  };

  // Filtrar notas com base nos filtros aplicados
  const filteredNotasXML = notasXML.filter(nota => {
    const matchesSearch = nota.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.emitente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.cnpj.includes(searchTerm);
    const matchesStatus = !statusFilter || nota.status === statusFilter;
    const matchesDate = !dateFilter || nota.dataEmissao === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const filteredNotasSefaz = notasSefaz.filter(nota => {
    const matchesSearch = nota.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.emitente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.cnpj.includes(searchTerm);
    const matchesStatus = !statusFilter || nota.status === statusFilter;
    const matchesDate = !dateFilter || nota.dataEmissao === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const filteredNotasSap = notasSap.filter(nota => {
    const matchesSearch = nota.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.emitente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.cnpj.includes(searchTerm) ||
                         nota.documentoSap.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || nota.status === statusFilter;
    const matchesDate = !dateFilter || nota.dataEmissao === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Container>
      <PageHeader>
        <h1>Captura de Notas</h1>
        <p>Importe notas fiscais via XML, busque diretamente na SEFAZ ou carregue de cargas externas</p>
      </PageHeader>

      <TabsContainer>
        <Tab
          active={activeTab === 'upload'}
          onClick={() => setActiveTab('upload')}
        >
          Upload de XML
        </Tab>
        <Tab
          active={activeTab === 'sefaz'}
          onClick={() => setActiveTab('sefaz')}
        >
          Busca SEFAZ
        </Tab>
        <Tab
          active={activeTab === 'sap'}
          onClick={() => setActiveTab('sap')}
        >
          Cargas Externas
        </Tab>
      </TabsContainer>

      {/* Filtros */}
      <FiltersSection>
        <FilterHeader onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <div className="left">
            <FunnelSimple size={20} />
            <h3>Filtros</h3>
          </div>
          <CaretDown 
            size={16}
            className={`icon ${isFilterOpen ? 'open' : ''}`}
          />
        </FilterHeader>
        
        {isFilterOpen && (
          <FilterContent>
            <div className="filters">
              <div className="filter-group">
                <label>Status</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Todos os status</option>
                  <option value="disponivel">Disponível</option>
                  <option value="em-negociacao">Em Negociação</option>
                  <option value="antecipada">Antecipada</option>
                  <option value="erro">Erro</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Data de Emissão</label>
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label>Ordenar por</label>
                <select>
                  <option value="data">Data de Emissão</option>
                  <option value="valor">Valor</option>
                  <option value="emitente">Emitente</option>
                </select>
              </div>
            </div>
          </FilterContent>
        )}
      </FiltersSection>

      {/* Busca e Ações */}
      <SearchSection>
        <SearchInput>
          <MagnifyingGlass size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por número da nota, emitente ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <ActionButtons>
          <button className="secondary" onClick={handleClearFilters}>
            <FunnelSimple size={16} />
            Limpar Filtros
          </button>
          <button className="primary">
            <Download size={16} />
            Exportar
          </button>
        </ActionButtons>
      </SearchSection>

      {/* Conteúdo da aba Upload de XML */}
      {activeTab === 'upload' && (
        <>
          <UploadArea onClick={() => document.getElementById('file-upload').click()}>
            <CloudArrowUp size={48} className="icon" />
            <h4>Arraste e solte arquivos XML aqui</h4>
            <p>ou</p>
            <button onClick={handleFileUpload}>Selecionar Arquivos</button>
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }} 
              accept=".xml"
              multiple
              onChange={handleFileUpload}
            />
          </UploadArea>

          <TableSection>
            <div className="table-header">
              <h3>Notas Fiscais Importadas via XML</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="table-info">
                  {filteredNotasXML.length} notas
                </div>
                <button 
                  className="primary"
                  onClick={handleSolicitarAntecipacao}
                  disabled={selectedNotasXML.size === 0}
                  style={{
                    opacity: selectedNotasXML.size === 0 ? 0.5 : 1,
                    cursor: selectedNotasXML.size === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Solicitar Antecipação
                </button>
              </div>
            </div>

            <div className="table-responsive">
              {filteredNotasXML.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: '40px', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          onChange={(e) => handleSelectAllXML(e.target.checked)}
                          checked={
                            filteredNotasXML.filter(nota => nota.status === 'disponivel').length > 0 &&
                            filteredNotasXML
                              .filter(nota => nota.status === 'disponivel')
                              .every(nota => selectedNotasXML.has(nota.id))
                          }
                          style={{ cursor: 'pointer' }}
                        />
                      </th>
                      <th>Número da Nota</th>
                      <th>Emitente</th>
                      <th>CNPJ</th>
                      <th>Data de Emissão</th>
                      <th>Valor (R$)</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotasXML.map(nota => (
                      <tr key={nota.id}>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={selectedNotasXML.has(nota.id)}
                            onChange={(e) => handleSelectNotaXML(nota.id, e.target.checked)}
                            disabled={nota.status !== 'disponivel'}
                            style={{ 
                              cursor: nota.status === 'disponivel' ? 'pointer' : 'not-allowed',
                              opacity: nota.status === 'disponivel' ? 1 : 0.3
                            }}
                          />
                        </td>
                        <td>{nota.numero}</td>
                        <td>{nota.emitente}</td>
                        <td>{nota.cnpj}</td>
                        <td>{formatDate(nota.dataEmissao)}</td>
                        <td>{formatCurrency(nota.valor)}</td>
                        <td className="status">
                          <span className={`status-badge ${nota.status}`}>
                            {nota.status === 'disponivel' ? 'Disponível' : 
                             nota.status === 'em-negociacao' ? 'Em Negociação' : 
                             nota.status === 'antecipada' ? 'Antecipada' : 'Erro'}
                          </span>
                        </td>
                        <td className="actions">
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button 
                              title="Ver detalhes"
                              onClick={() => handleViewDetails(nota)}
                            >
                              <Eye size={16} />
                            </button>
                            {nota.status === 'disponivel' && (
                              <button 
                                title="Negociar"
                                onClick={() => handleNegociar(nota)}
                                style={{ color: '#22c55e' }}
                              >
                                <CheckCircle size={16} />
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
                    <FileArrowUp size={48} />
                  </div>
                  <h4>Nenhuma nota encontrada</h4>
                  <p>Faça upload de arquivos XML para visualizar as notas fiscais.</p>
                </EmptyState>
              )}
            </div>
          </TableSection>
        </>
      )}

      {/* Conteúdo da aba Busca SEFAZ */}
      {activeTab === 'sefaz' && (
        <>
          <SearchForm>
            <h3>Buscar Notas Fiscais na SEFAZ</h3>
            <form onSubmit={handleSearchSefaz}>
              <div className="form-row">
                <div className="form-group">
                  <label>CNPJ do Emitente</label>
                  <input 
                    type="text" 
                    value={cnpjEmitente}
                    onChange={(e) => setCnpjEmitente(e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div className="form-group">
                  <label>Número da Nota</label>
                  <input 
                    type="text" 
                    value={numeroNota}
                    onChange={(e) => setNumeroNota(e.target.value)}
                    placeholder="Opcional"
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Nota</label>
                  <select>
                    <option value="entrada">Nota de Entrada</option>
                    <option value="saida">Nota de Saída</option>
                    <option value="todas">Todas</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Data Inicial</label>
                  <input 
                    type="date" 
                    value={dataInicial}
                    onChange={(e) => setDataInicial(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data Final</label>
                  <input 
                    type="date" 
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>UF</label>
                  <select>
                    <option value="">Todas</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="BA">Bahia</option>
                    <option value="DF">Distrito Federal</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="secondary"
                  onClick={() => {
                    setCnpjEmitente('');
                    setNumeroNota('');
                    setDataInicial('');
                    setDataFinal('');
                  }}
                >
                  Limpar
                </button>
                <button type="submit" className="primary">
                  <MagnifyingGlass size={16} />
                  Buscar
                </button>
              </div>
            </form>
          </SearchForm>

          <TableSection>
            <div className="table-header">
              <h3>Notas Fiscais Encontradas na SEFAZ</h3>
              <div className="table-info">
                {filteredNotasSefaz.length} notas
              </div>
            </div>

            <div className="table-responsive">
              {filteredNotasSefaz.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Número da Nota</th>
                      <th>Emitente</th>
                      <th>CNPJ</th>
                      <th>Data de Emissão</th>
                      <th>Valor (R$)</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotasSefaz.map(nota => (
                      <tr key={nota.id}>
                        <td>{nota.numero}</td>
                        <td>{nota.emitente}</td>
                        <td>{nota.cnpj}</td>
                        <td>{formatDate(nota.dataEmissao)}</td>
                        <td>{formatCurrency(nota.valor)}</td>
                        <td className="status">
                          <span className={`status-badge ${nota.status}`}>
                            {nota.status === 'disponivel' ? 'Disponível' : 
                             nota.status === 'em-negociacao' ? 'Em Negociação' : 
                             nota.status === 'antecipada' ? 'Antecipada' : 'Erro'}
                          </span>
                        </td>
                        <td className="actions">
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button 
                              title="Ver detalhes"
                              onClick={() => handleViewDetails(nota)}
                            >
                              <Eye size={16} />
                            </button>
                            {nota.status === 'disponivel' && (
                              <button 
                                title="Negociar"
                                onClick={() => handleNegociar(nota)}
                                style={{ color: '#22c55e' }}
                              >
                                <CheckCircle size={16} />
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
                    <CloudCheck size={48} />
                  </div>
                  <h4>Nenhuma nota encontrada</h4>
                  <p>Use o formulário acima para buscar notas fiscais na SEFAZ.</p>
                </EmptyState>
              )}
            </div>
          </TableSection>
        </>
      )}

      {/* Conteúdo da aba Cargas Externas */}
      {activeTab === 'sap' && (
        <>
          <SearchForm>
            <h3>Carregar Notas Fiscais de Cargas Externas</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Funcionalidade de carga externa será implementada aqui.');
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Empresa</label>
                  <select>
                    <option value="">Selecione a empresa</option>
                    <option value="emp001">Empresa 001 - Matriz</option>
                    <option value="emp002">Empresa 002 - Filial SP</option>
                    <option value="emp003">Empresa 003 - Filial RJ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Centro de Custo</label>
                  <input
                    type="text"
                    placeholder="Ex: CC-1001"
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Documento</label>
                  <select>
                    <option value="nfe">NF-e</option>
                    <option value="cte">CT-e</option>
                    <option value="nfse">NFS-e</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Data Inicial</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Data Final</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Status Carga Externa</label>
                  <select>
                    <option value="">Todos</option>
                    <option value="aberto">Aberto</option>
                    <option value="processado">Processado</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary"
                >
                  Limpar
                </button>
                <button type="submit" className="primary">
                  <ArrowsClockwise size={16} />
                  Sincronizar com Cargas Externas
                </button>
              </div>
            </form>
          </SearchForm>

          <TableSection>
            <div className="table-header">
              <h3>Notas Fiscais Carregadas de Cargas Externas</h3>
              <div className="table-info">
                {filteredNotasSap.length} notas
              </div>
            </div>

            <div className="table-responsive">
              {filteredNotasSap.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Número da Nota</th>
                      <th>Emitente</th>
                      <th>CNPJ</th>
                      <th>Doc. Externo</th>
                      <th>Centro de Custo</th>
                      <th>Data de Emissão</th>
                      <th>Valor (R$)</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotasSap.map(nota => (
                      <tr key={nota.id}>
                        <td>{nota.numero}</td>
                        <td>{nota.emitente}</td>
                        <td>{nota.cnpj}</td>
                        <td>{nota.documentoSap}</td>
                        <td>{nota.centroCusto}</td>
                        <td>{formatDate(nota.dataEmissao)}</td>
                        <td>{formatCurrency(nota.valor)}</td>
                        <td className="status">
                          <span className={`status-badge ${nota.status}`}>
                            {nota.status === 'disponivel' ? 'Disponível' :
                             nota.status === 'em-negociacao' ? 'Em Negociação' :
                             nota.status === 'antecipada' ? 'Antecipada' : 'Erro'}
                          </span>
                        </td>
                        <td className="actions">
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button
                              title="Ver detalhes"
                              onClick={() => handleViewDetails(nota)}
                            >
                              <Eye size={16} />
                            </button>
                            {nota.status === 'disponivel' && (
                              <button
                                title="Negociar"
                                onClick={() => handleNegociar(nota)}
                                style={{ color: '#22c55e' }}
                              >
                                <CheckCircle size={16} />
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
                    <ArrowsClockwise size={48} />
                  </div>
                  <h4>Nenhuma nota encontrada</h4>
                  <p>Use o formulário acima para carregar notas fiscais de cargas externas.</p>
                </EmptyState>
              )}
            </div>
          </TableSection>
        </>
      )}
    </Container>
  );
};

export default CapturaNotas;