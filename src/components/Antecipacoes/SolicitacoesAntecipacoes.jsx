import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  CurrencyDollar, 
  ChartBar, 
  ChartLineUp, 
  Users, 
  FunnelSimple, 
  CaretDown, 
  ArrowsDownUp, 
  Clock, 
  CheckCircle, 
  CaretUp,
  Eye
} from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { getGlobalCompanyId } from '../../lib/globalState';
import OperationDetails from './OperationDetails';
import CreditAnalysis from '../../pages/CreditAnalysis';

// Verificar se o módulo de localidade do dayjs está disponível antes de usar
try {
  // Configurando o locale do dayjs para português brasileiro
  dayjs.locale('pt-br');
} catch (err) {
  console.warn('Falha ao configurar a localidade do dayjs:', err);
}

const FilterSection = styled.div`
  background: white;
  border-radius: 8px;
  margin: 24px 0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  .filter-header {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon {
      transition: transform 0.3s ease;
      
      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .filter-content {
    padding: 24px;
    background: #F8F9FA;
    position: relative;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .filter-actions {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
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
    .react-select__control {
      width: 100%;
      height: 40px;
      min-height: 40px;
      background: white;
    }

    .react-select__menu {
      z-index: 100;
    }

    .react-select__control {
      border-color: var(--border-color);
      box-shadow: none;
      border-radius: 4px;
      
      &:hover {
        border-color: var(--primary-blue);
      }
      
      &--is-focused {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 1px var(--primary-blue);
      }
    }

    .react-select__value-container {
      padding: 2px 8px;
    }

    .react-select__input-container {
      margin: 0;
      padding: 0;
    }
    
    .react-select__placeholder {
      color: #9CA3AF;
    }

    .react-select__menu-portal {
      z-index: 9999;
    }
    
    select {
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 0 12px;
      color: var(--primary-text);
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      appearance: none;
      
      &:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 1px var(--primary-blue);
      }
    }
  }
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h3 {
    color: var(--secondary-text);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .value {
    font-size: 24px;
    font-weight: 600;
    margin: 8px 0;
  }

  .subtitle {
    font-size: 12px;
    color: var(--secondary-text);
  }

  .status {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-top: 4px;

    &.warning {
      background: #FEF3C7;
      color: #92400E;
    }
  }
`;

const InboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InboxSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;

  .section-header {
    padding: 16px;
    background: #F8F9FA;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0;
    }

    .count {
      background: #E9ECEF;
      color: var(--secondary-text);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .status-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    display: inline-block;
    margin-top: 8px;

    &.pending {
      background: rgba(249, 207, 88, 0.2);
      color: #B58E2D;
    }

    &.approved {
      background: rgba(62, 182, 85, 0.2);
      color: #3EB655;
    }

    &.rejected {
      background: rgba(204, 23, 23, 0.2);
      color: #CC1717;
    }
  }
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-blue);
  background: rgba(37, 99, 235, 0.1);
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.2);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--secondary-text);
  
  svg {
    margin-bottom: 16px;
    color: #E9ECEF;
  }
  
  h4 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--primary-text);
  }
  
  p {
    font-size: 14px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: var(--primary-blue);
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorState = styled.div`
  background-color: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  color: #B91C1C;
  
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
  }
`;

// Dados de exemplo (serão substituídos pelos dados do Supabase)
const mockAntecipacoesData = [
  {
    id: 1,
    fornecedor: 'Distribuidora Farmacêutica Nacional LTDA',
    valor: 45000,
    status: 'pendente',
    data_solicitacao: '2025-06-10T14:25:00',
    email: 'contato@fornecedormedical.com.br',
    telefone: '(11) 3456-7890',
    observacao: 'Pagamento antecipado para compra de equipamentos',
    documento: 'NF-12345',
    vencimento: '2025-07-15',
    tipo_pagamento: 'Transferência Bancária'
  },
  {
    id: 2,
    fornecedor: 'Distribuidora de Medicamentos Brasil',
    valor: 27500,
    status: 'aprovado',
    data_solicitacao: '2025-06-08T09:15:00',
    email: 'financeiro@instrumentalcirurgico.com.br',
    telefone: '(11) 2345-6789',
    observacao: 'Adiantamento para importação de materiais',
    documento: 'PED-7891',
    vencimento: '2025-07-10',
    tipo_pagamento: 'TED'
  },
  {
    id: 3,
    fornecedor: 'Distribuidora Farmacêutica Expressa S.A.',
    valor: 18750,
    status: 'recusado',
    data_solicitacao: '2025-06-05T11:30:00',
    email: 'faturamento@pharmasuprimentos.com.br',
    telefone: '(21) 3456-7890',
    observacao: 'Antecipação para liberação de medicamentos controlados',
    documento: 'PO-5432',
    vencimento: '2025-06-30',
    tipo_pagamento: 'Boleto Bancário'
  },
  {
    id: 4,
    fornecedor: 'Distribuidora de Produtos Farmacêuticos MedPharma',
    valor: 65000,
    status: 'pendente',
    data_solicitacao: '2025-06-12T16:45:00',
    email: 'vendas@medtechequip.com.br',
    telefone: '(11) 4567-8901',
    observacao: 'Adiantamento para equipamento de ressonância',
    documento: 'NF-9876',
    vencimento: '2025-07-20',
    tipo_pagamento: 'PIX'
  },
  {
    id: 5,
    fornecedor: 'Distribuidora Farmacêutica Global LTDA',
    valor: 33200,
    status: 'aprovado',
    data_solicitacao: '2025-06-07T10:20:00',
    email: 'financeiro@globalhealth.com.br',
    telefone: '(31) 2345-6789',
    observacao: 'Antecipação para liberação de importação',
    documento: 'PED-3210',
    vencimento: '2025-06-25',
    tipo_pagamento: 'Transferência Bancária'
  },
  {
    id: 6,
    fornecedor: 'Distribuidora de Medicamentos BioFarma',
    valor: 22800,
    status: 'pendente',
    data_solicitacao: '2025-06-11T08:30:00',
    email: 'adm@biomedlabs.com.br',
    telefone: '(11) 3322-4455',
    observacao: 'Adiantamento para pesquisa clínica',
    documento: 'PO-7788',
    vencimento: '2025-07-05',
    tipo_pagamento: 'Transferência Bancária'
  },
  {
    id: 7,
    fornecedor: 'Distribuidora Farmacêutica Rápida LTDA',
    valor: 15600,
    status: 'recusado',
    data_solicitacao: '2025-06-04T13:20:00',
    email: 'financeiro@cirurgicaexpress.com',
    telefone: '(21) 2233-4455',
    observacao: 'Adiantamento para equipamentos descartáveis',
    documento: 'NF-4567',
    vencimento: '2025-06-20',
    tipo_pagamento: 'Boleto Bancário'
  },
  {
    id: 8,
    fornecedor: 'Distribuidora de Produtos Farmacêuticos Saúde Total',
    valor: 42300,
    status: 'aprovado',
    data_solicitacao: '2025-06-09T11:00:00',
    email: 'pagamentos@dentalpremium.com.br',
    telefone: '(11) 4488-9900',
    observacao: 'Adiantamento para equipamentos odontológicos',
    documento: 'PO-1122',
    vencimento: '2025-07-12',
    tipo_pagamento: 'PIX'
  }
];

function SolicitacoesAntecipacoes() {
  // Estados
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [fornecedorFilter, setFornecedorFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [dataInicioFilter, setDataInicioFilter] = useState('');
  const [dataFimFilter, setDataFimFilter] = useState('');
  const [valorMinimoFilter, setValorMinimoFilter] = useState('');
  const [valorMaximoFilter, setValorMaximoFilter] = useState('');
  
  const [sortField, setSortField] = useState('data_solicitacao');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const [showPendentes, setShowPendentes] = useState(true);
  const [showConcluidas, setShowConcluidas] = useState(true);
  
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [fornecedoresOptions, setFornecedoresOptions] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalPendentes: 0,
    totalAprovadas: 0,
    valorTotal: 0,
    mediaValor: 0
  });
  
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);

  // Estados adicionais para tratamento de erros e carregamento
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Efeito para carregar dados
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);
      
      try {
        // Obter ID da empresa do usuário logado
        const companyId = getGlobalCompanyId();
        if (!companyId) {
          console.warn('ID da empresa não encontrado');
          // Usar dados mockados como fallback
          setSolicitacoes(mockAntecipacoesData);
        } else {
          // Em um ambiente real, descomentar este código e adaptá-lo à estrutura do seu banco
          // try {
          //   const { data: solicitacoesData, error } = await supabase
          //     .from('adiantamento_solicitacoes')
          //     .select('*, fornecedor:fornecedor_id(nome, email, telefone)')
          //     .eq('company_id', companyId)
          //     .order('data_solicitacao', { ascending: false });
          //   
          //   if (error) throw error;
          //   
          //   if (solicitacoesData && solicitacoesData.length > 0) {
          //     const formattedData = solicitacoesData.map(item => ({
          //       id: item.id,
          //       fornecedor: item.fornecedor?.nome || 'Fornecedor não identificado',
          //       valor: item.valor || 0,
          //       status: item.status || 'pendente',
          //       data_solicitacao: item.data_solicitacao,
          //       email: item.fornecedor?.email || 'Não informado',
          //       telefone: item.fornecedor?.telefone || 'Não informado',
          //       observacao: item.observacao || 'Sem observações',
          //       documento: item.documento || 'Não informado',
          //       vencimento: item.vencimento || new Date().toISOString().split('T')[0],
          //       tipo_pagamento: item.tipo_pagamento || 'Não especificado'
          //     }));
          //     setSolicitacoes(formattedData);
          //   } else {
          //     setSolicitacoes([]);
          //   }
          // } catch (supabaseError) {
          //   console.error('Erro ao buscar dados do Supabase:', supabaseError);
          //   setHasError(true);
          //   setErrorMessage('Falha ao conectar ao banco de dados. Usando dados de exemplo.');
          //   // Fallback para dados mockados em caso de erro
          //   setSolicitacoes(mockAntecipacoesData);
          // }
          
          // Por enquanto, usamos os dados mockados enquanto a tabela real não existe
          setSolicitacoes(mockAntecipacoesData);
        }
        
        // Processamento de estatísticas para o dashboard
        // Utilizar os dados reais do Supabase quando disponíveis
        const dados = mockAntecipacoesData; // Trocar por solicitacoesData quando implementado
        
        const pendentes = dados.filter(item => item.status === 'pendente').length;
        const aprovadas = dados.filter(item => item.status === 'aprovado').length;
        const valorTotal = dados.reduce((acc, item) => acc + item.valor, 0);
        const mediaValor = dados.length > 0 ? valorTotal / dados.length : 0;
        
        setDashboardStats({
          totalPendentes: pendentes,
          totalAprovadas: aprovadas,
          valorTotal,
          mediaValor
        });
        
        // Criação das opções de fornecedores para o filtro
        const options = dados.map(item => ({
          value: item.fornecedor,
          label: item.fornecedor
        }));
        
        // Remover duplicados
        setFornecedoresOptions([...new Map(options.map(item => [item.value, item])).values()]);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setHasError(true);
        setErrorMessage('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.');
        // Usar dados mockados como fallback em caso de erro
        setSolicitacoes(mockAntecipacoesData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Função para filtrar as solicitações
  const filteredSolicitacoes = solicitacoes.filter(item => {
    // Filtro de fornecedor
    if (fornecedorFilter && item.fornecedor !== fornecedorFilter.value) return false;
    
    // Filtro de status
    if (statusFilter && item.status !== statusFilter) return false;
    
    // Filtro de data inicial
    if (dataInicioFilter) {
      const dataInicio = new Date(dataInicioFilter);
      const dataSolicitacao = new Date(item.data_solicitacao);
      if (dataSolicitacao < dataInicio) return false;
    }
    
    // Filtro de data final
    if (dataFimFilter) {
      const dataFim = new Date(dataFimFilter + 'T23:59:59');
      const dataSolicitacao = new Date(item.data_solicitacao);
      if (dataSolicitacao > dataFim) return false;
    }
    
    // Filtro de valor mínimo
    if (valorMinimoFilter && item.valor < parseFloat(valorMinimoFilter)) return false;
    
    // Filtro de valor máximo
    if (valorMaximoFilter && item.valor > parseFloat(valorMaximoFilter)) return false;
    
    return true;
  });

  // Função para ordenar as solicitações
  const getSortedSolicitacoes = (items) => {
    return [...items].sort((a, b) => {
      if (sortField === 'fornecedor') {
        return sortDirection === 'asc'
          ? a.fornecedor.localeCompare(b.fornecedor)
          : b.fornecedor.localeCompare(a.fornecedor);
      }
      
      if (sortField === 'valor') {
        return sortDirection === 'asc'
          ? a.valor - b.valor
          : b.valor - a.valor;
      }
      
      if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      
      // Default: ordenar por data
      const dateA = new Date(a.data_solicitacao);
      const dateB = new Date(b.data_solicitacao);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  // Função para gerar badges de status
  const getStatusBadge = (status) => {
    let color = '#2563eb';
    let text = 'Novo';
    
    if (status === 'pendente') { color = '#F9CF58'; text = 'Pendente'; }
    if (status === 'aprovado') { color = '#3EB655'; text = 'Aprovado'; }
    if (status === 'recusado') { color = '#CC1717'; text = 'Recusado'; }
    
    return (
      <span style={{
        background: color + '22',
        color: color,
        fontWeight: 600,
        fontSize: 13,
        borderRadius: 12,
        padding: '2px 12px',
        marginLeft: 8,
        display: 'inline-block',
        minWidth: 80,
        textAlign: 'center',
      }}>{text}</span>
    );
  };

  // Função para limpar filtros
  const handleClearFilters = () => {
    setFornecedorFilter(null);
    setStatusFilter('');
    setDataInicioFilter('');
    setDataFimFilter('');
    setValorMinimoFilter('');
    setValorMaximoFilter('');
  };
  // Função para visualizar detalhes da solicitação
  const handleViewSolicitacao = (solicitacao) => {
    setSelectedSolicitacao(solicitacao);
  };
  // Se um item estiver selecionado, mostrar análise de crédito
  if (selectedSolicitacao) {
    return (
      <CreditAnalysis 
        request={selectedSolicitacao} 
        onBack={() => setSelectedSolicitacao(null)} 
      />
    );
  }

  // Separar solicitações pendentes e concluídas
  const solicitacoesPendentes = filteredSolicitacoes.filter(item => item.status === 'pendente');
  const solicitacoesConcluidas = filteredSolicitacoes.filter(item => item.status === 'aprovado' || item.status === 'recusado');

  return (
    <div>
      <Header>
        <h2 className="text-2xl font-semibold">Solicitações de Adiantamento</h2>
      </Header>

      <DashboardGrid>
        <MetricCard>
          <h3>
            <Clock size={20} />
            Solicitações Pendentes
          </h3>
          <div className="value">{dashboardStats.totalPendentes}</div>
          <div className="subtitle">aguardando análise</div>
        </MetricCard>

        <MetricCard>
          <h3>
            <CheckCircle size={20} />
            Solicitações Aprovadas
          </h3>
          <div className="value">{dashboardStats.totalAprovadas}</div>
          <div className="subtitle">nos últimos 30 dias</div>
        </MetricCard>

        <MetricCard>
          <h3>
            <CurrencyDollar size={20} />
            Valor Total
          </h3>
          <div className="value">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dashboardStats.valorTotal)}
          </div>
          <div className="subtitle">em adiantamentos</div>
        </MetricCard>

        <MetricCard>
          <h3>
            <ChartBar size={20} />
            Valor Médio
          </h3>
          <div className="value">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dashboardStats.mediaValor)}
          </div>
          <div className="subtitle">por solicitação</div>
        </MetricCard>
      </DashboardGrid>

      <FilterSection>
        <div className="filter-header" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <div className="left">
            <FunnelSimple size={20} />
            <span>Filtros</span>
          </div>
          <CaretDown 
            size={16} 
            className={`icon ${isFilterOpen ? 'open' : ''}`}
            style={{ color: 'var(--secondary-text)' }}
          />
        </div>
        
        {isFilterOpen && (
          <div className="filter-content">
            <div className="filters">
              <div className="filter-group">
                <label>Fornecedor</label>
                <Select
                  options={fornecedoresOptions}
                  value={fornecedorFilter}
                  onChange={setFornecedorFilter}
                  isClearable
                  placeholder="Selecione um fornecedor..."
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999
                    })
                  }}
                />
              </div>
              
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Todos os status</option>
                  <option value="pendente">Pendente</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="recusado">Recusado</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Período</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="date"
                    value={dataInicioFilter}
                    onChange={(e) => setDataInicioFilter(e.target.value)}
                    style={{ width: '50%' }}
                  />
                  <input
                    type="date"
                    value={dataFimFilter}
                    onChange={(e) => setDataFimFilter(e.target.value)}
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
              
              <div className="filter-group">
                <label>Valor Mínimo (R$)</label>
                <input
                  type="number"
                  value={valorMinimoFilter}
                  onChange={(e) => setValorMinimoFilter(e.target.value)}
                  placeholder="Valor mínimo"
                  style={{ 
                    width: '100%', 
                    height: '40px',
                    padding: '0 12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div className="filter-group">
                <label>Valor Máximo (R$)</label>
                <input
                  type="number"
                  value={valorMaximoFilter}
                  onChange={(e) => setValorMaximoFilter(e.target.value)}
                  placeholder="Valor máximo"
                  style={{ 
                    width: '100%', 
                    height: '40px',
                    padding: '0 12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            
            <div className="filter-actions">
              <button 
                onClick={handleClearFilters}
                style={{
                  padding: '8px 16px',
                  background: '#fff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Limpar
              </button>
            </div>
          </div>
        )}
      </FilterSection>

      {/* Opções de ordenação */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 8px 0' }}>
        <span style={{ fontWeight: 500, fontSize: 14 }}>Ordenar por:</span>
        <select
          value={sortField}
          onChange={e => setSortField(e.target.value)}
          style={{ 
            height: 32, 
            borderRadius: 6, 
            border: '1px solid var(--border-color)', 
            fontSize: 14 
          }}
        >
          <option value="data_solicitacao">Data da Solicitação</option>
          <option value="fornecedor">Nome do Fornecedor</option>
          <option value="valor">Valor</option>
          <option value="status">Status</option>
        </select>
        
        <button
          onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
          style={{ 
            height: 32, 
            borderRadius: 6, 
            border: '1px solid var(--border-color)', 
            background: '#fff', 
            cursor: 'pointer', 
            fontSize: 14,
            padding: '0 10px' 
          }}
          title={sortDirection === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
        >
          {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>      {isLoading ? (
        <LoadingState>
          <div className="spinner"></div>
        </LoadingState>
      ) : hasError ? (
        <ErrorState>
          <h4>Erro ao carregar dados</h4>
          <p>{errorMessage}</p>
        </ErrorState>
      ) : (
        <InboxContainer>
          {/* Seção de Solicitações Pendentes */}
          <InboxSection>
            <div 
              className="section-header" 
              style={{cursor: 'pointer', justifyContent: 'space-between'}} 
              onClick={() => setShowPendentes(v => !v)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Clock size={20} weight="fill" color="#F9CF58" />
                <h3>Solicitações Pendentes</h3>
                <span className="count">{solicitacoesPendentes.length}</span>
              </div>
              {showPendentes ? 
                <CaretUp size={18} style={{color: 'var(--secondary-text)'}} /> : 
                <CaretDown size={18} style={{color: 'var(--secondary-text)'}} />
              }
            </div>
            
            {showPendentes && solicitacoesPendentes.length === 0 ? (
              <EmptyState>
                <Clock size={48} weight="light" />
                <h4>Nenhuma solicitação pendente</h4>
                <p>Não há solicitações de adiantamento pendentes para análise no momento.</p>
              </EmptyState>
            ) : showPendentes && getSortedSolicitacoes(solicitacoesPendentes).map(solicitacao => (
              <OrderCard key={solicitacao.id} onClick={() => handleViewSolicitacao(solicitacao)}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-bold" style={{ color: '#333333' }}>
                      {solicitacao.fornecedor}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Solicitação #{solicitacao.id}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      E-mail: {solicitacao.email}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Telefone: {solicitacao.telefone}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Documento: {solicitacao.documento}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                      <Eye 
                        size={16} 
                        style={{ color: 'var(--primary-blue)', cursor: 'pointer' }} 
                        onClick={(e) => e.stopPropagation()}
                        title="Visualizar detalhes"
                      />
                    </div>
                    <div className="text-lg font-semibold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(solicitacao.valor)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {dayjs(solicitacao.data_solicitacao).format('DD/MM/YYYY HH:mm')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Vencimento: {dayjs(solicitacao.vencimento).format('DD/MM/YYYY')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {getStatusBadge(solicitacao.status)}
                    </div>
                  </div>
                </div>
              </OrderCard>
            ))}
          </InboxSection>

          {/* Seção de Solicitações Concluídas */}
          <InboxSection>
            <div 
              className="section-header" 
              style={{cursor: 'pointer', justifyContent: 'space-between'}} 
              onClick={() => setShowConcluidas(v => !v)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <CheckCircle size={20} weight="fill" color="#3EB655" />
                <h3>Solicitações Concluídas</h3>
                <span className="count">{solicitacoesConcluidas.length}</span>
              </div>
              {showConcluidas ? 
                <CaretUp size={18} style={{color: 'var(--secondary-text)'}} /> : 
                <CaretDown size={18} style={{color: 'var(--secondary-text)'}} />
              }
            </div>
              {showConcluidas && solicitacoesConcluidas.length === 0 ? (
            <EmptyState>
              <CheckCircle size={48} weight="light" />
              <h4>Nenhuma solicitação concluída</h4>
              <p>Não há solicitações de adiantamento concluídas para exibir.</p>
            </EmptyState>
          ) : showConcluidas && getSortedSolicitacoes(solicitacoesConcluidas).map(solicitacao => (
              <OrderCard key={solicitacao.id} onClick={() => handleViewSolicitacao(solicitacao)}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-bold" style={{ color: '#333333' }}>
                      {solicitacao.fornecedor}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Solicitação #{solicitacao.id}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      E-mail: {solicitacao.email}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Telefone: {solicitacao.telefone}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Documento: {solicitacao.documento}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                      <Eye 
                        size={16} 
                        style={{ color: 'var(--primary-blue)', cursor: 'pointer' }} 
                        onClick={(e) => e.stopPropagation()}
                        title="Visualizar detalhes"
                      />
                    </div>
                    <div className="text-lg font-semibold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(solicitacao.valor)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {dayjs(solicitacao.data_solicitacao).format('DD/MM/YYYY HH:mm')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Vencimento: {dayjs(solicitacao.vencimento).format('DD/MM/YYYY')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {getStatusBadge(solicitacao.status)}
                    </div>
                  </div>
                </div>
              </OrderCard>
            ))}
          </InboxSection>
        </InboxContainer>
      )}
    </div>
  );
}

export default SolicitacoesAntecipacoes;