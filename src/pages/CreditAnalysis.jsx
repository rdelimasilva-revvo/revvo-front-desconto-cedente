import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, User, CaretUp, CaretDown } from '@phosphor-icons/react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { OperationDetails } from '../components/Antecipacoes';
import { getGlobalCompanyId } from '../lib/globalState';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 32px;
    min-width: 500px;
    max-width: 600px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .modal-title {
    font-weight: 600;
    font-size: 18px;
    color: var(--primary-text);
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text);
    padding: 8px;
    
    &:hover {
      color: var(--primary-text);
    }
  }

  .form-field {
    margin-bottom: 16px;

    .label {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text);
      margin-bottom: 4px;
    }

    textarea {
      width: 100%;
      min-height: 100px;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--border-color);
      resize: vertical;
      font-family: inherit;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: var(--primary-blue);
      }
    }
  }

  .actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;

    button {
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;

      &.approve {
        background: var(--primary-blue);
        color: white;

        &:hover {
          background: var(--primary-blue-dark);
        }
      }

      &.reject {
        background: #f3f4f6;
        color: #4b5563;

        &:hover {
          background: #e5e7eb;
        }
      }
    }
  }
`;

const CaixaEntradaContainer = styled.div`
  background: white; 
  padding: ${props => props.compact ? '12px 16px' : '24px'};
  border-radius: 8px; 
  margin-bottom: 16px; 
  border: 1px solid var(--border-color);
  transition: padding 0.2s;
  min-height: 80vh;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const RequestsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const RequestCard = styled.div`
  flex: 0 0 300px;
  cursor: pointer;
  background: var(--background);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  &.selected {
    flex: 0 0 280px;
    cursor: default;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }

    .items-section {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);

      h4 {
        font-size: 13px;
        color: var(--secondary-text);
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .item {
        padding: 8px;
        background: white;
        border-radius: 4px;
        margin-bottom: 8px;
        font-size: 13px;

        &:last-child {
          margin-bottom: 0;
        }

        .item-name {
          margin-bottom: 4px;
          font-weight: 500;
        }

        .item-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--secondary-text);
        }
      }
    }
  }
`;

const DetailView = styled.div`
  flex: 1;
  margin-left: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 24px;
  position: relative;

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text);
    padding: 8px;
    
    &:hover {
      color: var(--primary-text);
    }
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
  }

  .detail-section {
    background: var(--background);
    padding: 16px;
    border-radius: 8px;

    h4 {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .occurrence-count {
      background: var(--primary-blue);
      color: white;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 12px;
      display: inline-block;
    }

    .no-occurrences {
      color: var(--secondary-text);
      font-size: 13px;
    }

    .occurrence-item {
      padding: 12px;
      background: white;
      border-radius: 4px;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }

      .date {
        font-size: 12px;
        color: var(--secondary-text);
        margin-bottom: 4px;
      }

      .value {
        font-size: 14px;
        font-weight: 500;
      }

      .details {
        font-size: 13px;
        color: var(--secondary-text);
        margin-top: 4px;
      }
    }
  }

  .score-section {
    text-align: center;
    padding: 24px;
    
    .score-value {
      font-size: 48px;
      font-weight: 600;
      color: var(--primary-blue);
      margin: 16px 0;
    }

    .score-label {
      font-size: 14px;
      color: var(--success);
      padding: 4px 12px;
      background: rgba(62, 182, 85, 0.1);
      border-radius: 16px;
      display: inline-block;
    }
  }
`;

const HistoryAnalysisContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const CustomerHistory = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  height: 100%;
  overflow-y: auto;
`;

const FinancialAnalysisContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  h4 {
    margin-bottom: 16px;
    font-weight: 500;
    color: black;
  }
  
  .load-calculated-limit {
    position: absolute;
    top: 24px;
    right: 24px;
    padding: 6px 12px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &:hover {
      background: #2563EB;
    }
    
    &:disabled {
      background: #93C5FD;
      cursor: not-allowed;
    }
  }
  
  .form-group {
    margin-bottom: 20px;
    
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text);
      margin-bottom: 8px;
    }
    
    input {
      width: 100%;
      height: 40px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 0 12px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      }
    }
    
    textarea {
      width: 100%;
      min-height: 150px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 12px;
      font-size: 14px;
      resize: vertical;
      
      &:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      }
    }
    
    .prefix {
      position: relative;
      
      input {
        padding-left: 34px;
      }
      
      &:before {
        content: "R$";
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--secondary-text);
      }
    }
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: auto;
    
    button {
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &.primary {
        background-color: var(--primary-blue);
        color: white;
        border: none;
      }
      
      &.secondary {
        background-color: white;
        color: var(--primary-text);
        border: 1px solid var(--border-color);
      }
    }
  }
`;

const Header = styled.header`
  margin-bottom: 24px;

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
  }

  .company-name {
    font-size: 16px;
    color: var(--secondary-text);
    margin-top: 4px;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--secondary-text);
    display: flex;
    align-items: center;
    height: 26px;
    
    &:hover {
      color: var(--primary-text);
      transform: scale(1.1);
    }
  }
`;

const CustomerHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px 32px 24px 32px;
  margin-bottom: 16px;
  box-shadow: none;
  border: 1px solid var(--border-color);

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .main-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0;
    line-height: 1.1;
  }

  .company-name {
    font-size: 18px;
    color: #6B7280;
    font-weight: 400;
    margin-bottom: 2px;
    margin-top: 2px;
    letter-spacing: 0.5px;
  }

  .company-doc {
    font-size: 16px;
    color: #6B7280;
    margin-bottom: 0;
    font-weight: 400;
  }

  .divider {
    border: none;
    border-top: 1px solid #E5E7EB;
    margin: 24px 0 20px 0;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
    align-items: flex-start;
  }

  .info-block {
    font-size: 15px;
    color: #222;
    font-weight: 400;
    margin-bottom: 0;
  }

  .info-label {
    font-size: 13px;
    color: #6B7280;
    font-weight: 600;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
  }

  .contact-card {
    background: #f8fafd;
    border-radius: 10px;
    padding: 18px 20px;
    min-width: 220px;
    box-shadow: none;
    font-size: 15px;
    color: #222;
    font-weight: 400;
  }
  .contact-card .contact-name {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 4px;
    color: #222;
  }
  .contact-card .contact-email {
    color: #2563eb;
    text-decoration: underline;
    font-size: 15px;
    margin-top: 2px;
    display: block;
  }
`;

const ScrollableDetails = styled.div`
  margin-left: 16px;
  flex: 1;
  max-height: 760px;
  min-height: 660px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;

const CreditAnalysis = ({ request, onBack }) => {
  const [selectedDetailCard, setSelectedDetailCard] = useState(null);
  const [creditLimit, setCreditLimit] = useState('');
  const [prepaidLimit, setPrepaidLimit] = useState('');
  const [comments, setComments] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingCalculatedLimit, setLoadingCalculatedLimit] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [customerHeaderCollapsed, setCustomerHeaderCollapsed] = useState(true);

  // Workflow states and functions
  const [workflowData, setWorkflowData] = useState(null);
  const [loadingWorkflow, setLoadingWorkflow] = useState(false);
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [workflowHistory, setWorkflowHistory] = useState([]);
  const [loadingWorkflowHistory, setLoadingWorkflowHistory] = useState(false);
  const [expandedWorkflows, setExpandedWorkflows] = useState(new Set());
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  useEffect(() => {
    async function fetchCompany() {
      setLoadingCompany(true);
      try {
        const companyId = getGlobalCompanyId();
        if (!companyId) return;
        const { data: company, error } = await supabase
          .from('company')
          .select('*')
          .eq('id', companyId)
          .single();
        if (error) throw error;
        if (company) {
          setSelectedDetailCard({
            id: company.id,
            customer: {
              name: company.name,
              company: company.name,
              doc: company.doc_num,
              cnpj: company.doc_num,
              endereco: company.address || '-',
              contato: {
                nome: '-',
                telefone: company.phone || '-',
                email: company.email || '-',
              },
            },
            created_at: company.created_at,
            total_amt: company.income_yr || 0,
            status: { name: 'Ativa' },
          });
        }
      } catch (err) {
        console.error('Erro ao buscar empresa:', err);
      } finally {
        setLoadingCompany(false);
      }
    }
    fetchCompany();
  }, []);

  // Mock workflow data
  const mockWorkflowData = {
    order: {
      id: 'mock-order-1',
      credit_limit_req_id: 'mock-request-1',
      status: 'pending'
    },
    details: [
      {
        id: 'step-1',
        workflow_step: 1,
        jurisdiction: {
          name: 'Analista Financeiro',
          description: 'Análise inicial do pedido'
        },
        approval: null,
        started_at: new Date().toISOString(),
        finished_at: null,
        approver: null
      },
      {
        id: 'step-2',
        workflow_step: 2,
        jurisdiction: {
          name: 'Gerente de Crédito',
          description: 'Aprovação final'
        },
        approval: null,
        started_at: null,
        finished_at: null,
        approver: null
      }
    ]
  };

  // Mock workflow history
  const mockWorkflowHistory = [
    {
      id: 'history-1',
      creditRequest: {
        id: 'mock-request-1',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      workflowOrder: {
        id: 'mock-order-1',
        status: 'completed'
      },
      details: [
        {
          id: 'step-1',
          workflow_step: 1,
          jurisdiction: {
            name: 'Analista Financeiro',
            description: 'Análise inicial do pedido'
          },
          approval: true,
          started_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          finished_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          approver: 'John Doe'
        },
        {
          id: 'step-2',
          workflow_step: 2,
          jurisdiction: {
            name: 'Gerente de Crédito',
            description: 'Aprovação final'
          },
          approval: true,
          started_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          finished_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          approver: 'Jane Smith'
        }
      ],
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      computedStatus: 'approved'
    }
  ];

  // Mock function to fetch workflow data
  const fetchWorkflowData = async (creditLimitReqId) => {
    if (!creditLimitReqId) return;
    
    setLoadingWorkflow(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setWorkflowData(mockWorkflowData);
    } catch (error) {
      console.error('Error fetching workflow data:', error);
      toast.error('Erro ao carregar dados do workflow');
    } finally {
      setLoadingWorkflow(false);
    }
  };

  // Mock function to fetch workflow history
  const fetchWorkflowHistory = async (customerId) => {
    if (!customerId) return;
    
    setLoadingWorkflowHistory(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setWorkflowHistory(mockWorkflowHistory);
    } catch (error) {
      console.error('Error fetching workflow history:', error);
      setWorkflowHistory([]);
    } finally {
      setLoadingWorkflowHistory(false);
    }
  };

  // Mock function to handle workflow step approval
  const handleWorkflowApproval = async (approved) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the workflow data with the approval
      const updatedDetails = workflowData.details.map(detail => {
        if (detail.id === selectedWorkflowStep.id) {
          return {
            ...detail,
            approval: approved,
            finished_at: new Date().toISOString(),
            approver: 'Current User' // Mock current user
          };
        }
        if (detail.workflow_step === selectedWorkflowStep.workflow_step + 1) {
          return {
            ...detail,
            started_at: new Date().toISOString()
          };
        }
        return detail;
      });

      setWorkflowData({
        ...workflowData,
        details: updatedDetails
      });

      setShowApprovalModal(false);
      setSelectedWorkflowStep(null);
      toast.success(approved ? 'Aprovação registrada com sucesso' : 'Rejeição registrada com sucesso');
    } catch (error) {
      console.error('Error updating workflow:', error);
      toast.error('Erro ao atualizar workflow');
    }
  };

  const toggleWorkflowExpansion = (workflowId) => {
    const newExpanded = new Set(expandedWorkflows);
    if (newExpanded.has(workflowId)) {
      newExpanded.delete(workflowId);
    } else {
      newExpanded.add(workflowId);
    }
    setExpandedWorkflows(newExpanded);
  };

  const handleWorkflowStepClick = (step) => {
    setSelectedWorkflowStep(step);
    setShowWorkflowModal(true);
  };

  // Effect to fetch workflow data when selectedDetailCard changes
  useEffect(() => {
    if (selectedDetailCard?.id) {
      fetchWorkflowData(selectedDetailCard.id);
    }
  }, [selectedDetailCard]);

  // Effect to fetch workflow history when selectedDetailCard changes
  useEffect(() => {
    if (selectedDetailCard?.customer?.id || selectedDetailCard?.customer_id) {
      const customerId = selectedDetailCard.customer?.id || selectedDetailCard.customer_id;
      fetchWorkflowHistory(customerId);
    }
  }, [selectedDetailCard]);

  const handleSaveAnalysis = async () => {
    if (!selectedDetailCard?.customer_id) {
      toast.error('Nenhum cliente selecionado');
      return;
    }

    setSaving(true);
    try {
      // Implement save logic here
      toast.success('Análise financeira salva com sucesso!');
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast.error('Erro ao salvar análise financeira');
    } finally {
      setSaving(false);
    }
  };

  const handleLoadCalculatedLimit = async () => {
    if (!selectedDetailCard?.customer_id) return;
    
    setLoadingCalculatedLimit(true);
    try {
      // Implement load calculated limit logic here
      setCreditLimit('250.000,00');
    } catch (error) {
      console.error('Error loading calculated limit:', error);
      toast.error('Erro ao carregar limite calculado');
    } finally {
      setLoadingCalculatedLimit(false);
    }
  };

  return (
    <>
      {loadingCompany ? (
        <div style={{ padding: 32, textAlign: 'center' }}>Carregando dados da empresa...</div>
      ) : selectedDetailCard ? (
        <>
          <CustomerHeader>
            <div className="header-row" style={{ cursor: 'pointer' }}>
              <div onClick={() => setCustomerHeaderCollapsed((c) => !c)} style={{ flex: 1 }}>
                <div className="main-title">{selectedDetailCard.customer?.name}</div>
                {!customerHeaderCollapsed && (
                  <>
                    <div className="company-name">{selectedDetailCard.customer?.company}</div>
                    <div className="company-doc">{selectedDetailCard.customer?.doc}</div>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  onClick={() => setCustomerHeaderCollapsed((c) => !c)}
                  aria-label={customerHeaderCollapsed ? 'Expandir' : 'Colapsar'}
                >
                  {customerHeaderCollapsed ? <CaretDown size={22} /> : <CaretUp size={22} />}
                </button>
                <X size={22} style={{ color: '#6B7280', cursor: 'pointer' }} onClick={onBack} />
              </div>
            </div>
            {!customerHeaderCollapsed && (
              <>
                <hr className="divider" />
                <div className="info-grid">
                  <div className="info-block">
                    <span className="info-label">CNPJ</span>
                    <div>{selectedDetailCard.customer?.cnpj}</div>
                  </div>
                  <div className="info-block">
                    <span className="info-label">Endereço</span>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectedDetailCard.customer?.endereco}</div>
                  </div>
                  <div className="contact-card">
                    <div className="contact-name">{selectedDetailCard.customer?.contato?.nome || '-'}</div>
                    <div style={{ color: '#6B7280', fontSize: 15 }}>{selectedDetailCard.customer?.contato?.telefone || '-'}</div>
                    <a className="contact-email" href={selectedDetailCard.customer?.contato?.email ? `mailto:${selectedDetailCard.customer?.contato?.email}` : undefined}>{selectedDetailCard.customer?.contato?.email || '-'}</a>
                  </div>
                </div>
              </>
            )}
          </CustomerHeader>
          <CaixaEntradaContainer compact={!!selectedDetailCard}>
            <h3 style={{ marginBottom: '16px' }}>Visão Geral de Risco</h3>
            <div style={{ display: 'flex', gap: 16 }}>
              <RequestCard className="selected" style={{ minWidth: 300, maxWidth: 340, minHeight: 660 }}>
                <div style={{ marginBottom: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    {selectedDetailCard.customer?.name}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: '500',
                    backgroundColor: 'rgba(62, 182, 85, 0.1)', 
                    color: '#3EB655', 
                    padding: '4px 12px', 
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: '#3EB655',
                      display: 'inline-block'
                    }}></span>
                    {selectedDetailCard.status?.name}
                  </div>
                </div>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', color: 'var(--secondary-text)', marginTop: '4px' }}>
                    {selectedDetailCard.created_at ? new Date(selectedDetailCard.created_at).toLocaleDateString('pt-BR') : '-'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                    Empresa #{selectedDetailCard.id}
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>Receita Anual</div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    R$ {selectedDetailCard.total_amt?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className='items-section' style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>Limite calculado</div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>R$ 250.000,00</div>
                  </div>
                </div>
                <div className='items-section' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>Limite atual</div>
                    <div style={{ fontSize: '14px' }}>R$ 70.000,00</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>% utilizado</div>
                    <div style={{ fontSize: '14px' }}>45%</div>
                  </div>
                </div>
                {/* Workflow de Aprovação */}
                <div className="items-section">
                  <h4 style={{ fontSize: '13px', color: 'black', marginBottom: '12px', fontWeight: '500' }}>
                    Workflow de Aprovação
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'}}>
                    {loadingWorkflow ? (
                      <div style={{ textAlign: 'center', padding: '16px', color: 'var(--secondary-text)' }}>
                        Carregando workflow...
                      </div>
                    ) : workflowData?.details ? (
                      workflowData.details.map((detail, index) => (
                        <div
                          key={detail.id}
                          onClick={() => {
                            if (detail.approval === null) {
                              setSelectedWorkflowStep(detail);
                              setShowApprovalModal(true);
                            } else {
                              setSelectedWorkflowStep(detail);
                              setShowViewModal(true);
                            }
                          }}
                          style={{
                            padding: '8px',
                            background: 'white',
                            borderRadius: '4px',
                            border: detail.approval === null ? '1px solid var(--primary-blue)' : '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{detail.jurisdiction?.name || 'N/A'}</div>
                            <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>
                              {detail.approval === null ? 'Pendente' :
                               detail.approval ? 'Aprovado' : 'Rejeitado'}
                            </div>
                          </div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: detail.approval === null ? 'var(--border-color)' :
                                      detail.approval ? 'var(--success)' : '#DC2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ color: 'white', fontSize: '10px' }}>
                              {detail.approval === null ? '!' :
                               detail.approval ? '✓' : '✕'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '16px', color: 'var(--secondary-text)' }}>
                        Nenhum workflow encontrado
                      </div>
                    )}
                  </div>
                </div>
              </RequestCard>
              <ScrollableDetails>
                <OperationDetails operation={selectedDetailCard} showBackButton={false} />
              </ScrollableDetails>
            </div>
          </CaixaEntradaContainer>
          {selectedDetailCard && (
            <HistoryAnalysisContainer>
              <CustomerHistory>
                <h4 style={{ marginBottom: '16px', color: 'black', fontWeight: '500'}}>Histórico</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    {
                      evento: 'Antecipação',
                      financiador: 'Banco X',
                      data: '2024-03-10',
                      valor: 150000,
                      status: 'Aprovada'
                    },
                    {
                      evento: 'Antecipação',
                      financiador: 'Âncora Y',
                      data: '2024-02-05',
                      valor: 90000,
                      status: 'Negada'
                    }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'var(--background)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 4
                      }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#3EB655'
                        }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 2 }}>Evento: {item.evento}</div>
                        <div style={{
                          background: 'var(--background)',
                          borderRadius: 10,
                          padding: '16px 20px',
                          marginBottom: 0,
                          boxShadow: 'none',
                          border: 'none',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          gap: 32,
                          minWidth: 220
                        }}>
                          {/* Coluna esquerda: Financiador e Valor */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                            <div style={{ fontSize: 15, color: 'var(--secondary-text)' }}>
                              Financiador: <span style={{ color: 'black', fontWeight: 500 }}>{item.financiador}</span>
                            </div>
                            <div style={{ fontSize: 15, color: 'var(--secondary-text)' }}>
                              Valor: <span style={{ fontWeight: 600, fontSize: 17, color: 'black' }}>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                          {/* Coluna direita: Data e Status */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                            <div style={{ fontSize: 14, color: 'var(--secondary-text)' }}>
                              Data: <span style={{ color: 'black', fontWeight: 500 }}>{new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                            </div>
                            <div style={{ fontSize: 15, color: 'var(--secondary-text)' }}>
                              Status: <span style={{ fontWeight: 600, color: item.status === 'Aprovada' ? '#3EB655' : '#E11D48', fontSize: 15 }}>{item.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CustomerHistory>
              <FinancialAnalysisContainer>
                <h4>Análise de Crédito</h4>
                <div className="form-group">
                  <label htmlFor="analysisComments">Comentários e Análise</label>
                  <textarea 
                    id="analysisComments"
                    placeholder="Digite aqui os comentários e análise financeira para esta solicitação..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>
                <div className="button-group">
                  <button className="secondary">Rejeitar</button>
                  <button 
                    className="primary"
                    onClick={handleSaveAnalysis}
                    disabled={saving}
                  >
                    {saving ? 'Aprovando...' : 'Aprovar'}
                  </button>
                </div>
              </FinancialAnalysisContainer>
            </HistoryAnalysisContainer>
          )}
        </>
      ) : null}

      {/* Approval Modal */}
      {showApprovalModal && (
        <Modal>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Aprovação {selectedWorkflowStep?.jurisdiction?.name || 'Comercial'}</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedWorkflowStep(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="form-field">
              <div className="label">Alçada</div>
              <div>{selectedWorkflowStep?.jurisdiction?.name || 'Não definida'}</div>
            </div>

            <div className="form-field">
              <div className="label">Data de Recebimento</div>
              <div>{selectedWorkflowStep?.started_at ? 
                new Date(selectedWorkflowStep.started_at).toLocaleString('pt-BR') : 
                '15/03/2024, 09:30:00'}</div>
            </div>
            <div className="form-field">
              <div className="label">Data de Conclusão</div>
              <div>{selectedWorkflowStep?.finished_at ? 
                new Date(selectedWorkflowStep.finished_at).toLocaleString('pt-BR') : 
                'Pendente'}</div>
            </div>

            <div className="form-field">
              <div className="label">Parecer</div>
              <textarea placeholder="Digite seu parecer..." />
            </div>

            <div className="actions">
              <button 
                className="reject"
                onClick={() => handleWorkflowApproval(false)}
              >
                Rejeitar
              </button>
              <button 
                className="approve"
                onClick={() => handleWorkflowApproval(true)}
              >
                Aprovar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Approved Modal */}
      {showApprovedModal && (
        <Modal>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">ETAPA APROVADA</h2>
              <button 
                className="close-button"
                onClick={() => setShowApprovedModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="form-field">
              <div className="label">Alçada</div>
              <div>RESPONSÁVEL</div>
            </div>

            <div className="form-field">
              <div className="label">Data de Recebimento</div>
              <div>15/03/2024, 09:30:00</div>
            </div>

            <div className="form-field">
              <div className="label">Prazo</div>
              <div>15/03/2024, 13:30:00</div>
            </div>

            <div className="form-field">
              <div className="label">Parecer</div>
              <p
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  resize: 'vertical'
                }}
              >PARECER DEFINIDO</p>
            </div>
          </div>
        </Modal>
      )}

      {/* View Completed Step Modal */}
      {showViewModal && (
        <Modal>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Detalhes da Etapa {selectedWorkflowStep?.jurisdiction?.name || 'Comercial'}</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedWorkflowStep(null);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="form-field">
              <div className="label">Alçada</div>
              <div>{selectedWorkflowStep?.jurisdiction?.name || 'Não definida'}</div>
            </div>

            <div className="form-field">
              <div className="label">Data de Recebimento</div>
              <div>{selectedWorkflowStep?.started_at ? 
                new Date(selectedWorkflowStep.started_at).toLocaleString('pt-BR') : 
                'N/A'}</div>
            </div>

            <div className="form-field">
              <div className="label">Data de Conclusão</div>
              <div>{selectedWorkflowStep?.finished_at ? 
                new Date(selectedWorkflowStep.finished_at).toLocaleString('pt-BR') : 
                'N/A'}</div>
            </div>

            <div className="form-field">
              <div className="label">Status</div>
              <div style={{ 
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '16px',
                backgroundColor: selectedWorkflowStep?.approval ? 'rgba(62, 182, 85, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                color: selectedWorkflowStep?.approval ? '#3EB655' : '#DC2626',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {selectedWorkflowStep?.approval ? 'Aprovado' : 'Rejeitado'}
              </div>
            </div>

            <div className="form-field">
              <div className="label">Parecer</div>
              <div style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--background)',
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }}>
                {selectedWorkflowStep?.comments || 'Nenhum parecer registrado'}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Workflow Step Details Modal - Para histórico do workflow */}
      {showWorkflowModal && selectedWorkflowStep && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '32px',
            minWidth: '500px',
            maxWidth: '600px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontWeight: '600',
                fontSize: '18px',
                color: 'var(--primary-text)'
              }}>
                Detalhes da Etapa: {selectedWorkflowStep.jurisdiction?.name || 'N/A'}
              </h2>
              <button
                onClick={() => {
                  setShowWorkflowModal(false);
                  setSelectedWorkflowStep(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: 'var(--secondary-text)'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Etapa do Workflow
                  </label>
                  <div style={{ fontSize: '14px' }}>
                    {selectedWorkflowStep.workflow_step || 'N/A'}
                  </div>
                </div>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Status
                  </label>
                  <div style={{ 
                    fontSize: '14px',
                    color: selectedWorkflowStep.approval === null ? '#EA580C' :
                           selectedWorkflowStep.approval === true ? '#3EB655' : '#E11D48'
                  }}>
                    {selectedWorkflowStep.approval === null ? 'Pendente' :
                     selectedWorkflowStep.approval === true ? 'Aprovado' : 'Rejeitado'}
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Data de Início
                  </label>
                  <div style={{ fontSize: '14px' }}>
                    {selectedWorkflowStep.started_at ? 
                      new Date(selectedWorkflowStep.started_at).toLocaleString('pt-BR') : 
                      'Não iniciado'
                    }
                  </div>
                </div>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Data de Conclusão
                  </label>
                  <div style={{ fontSize: '14px' }}>
                    {selectedWorkflowStep.finished_at ? 
                      new Date(selectedWorkflowStep.finished_at).toLocaleString('pt-BR') : 
                      'Pendente'
                    }
                  </div>
                </div>
              </div>

              {selectedWorkflowStep.approver && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Aprovador
                  </label>
                  <div style={{ fontSize: '14px' }}>
                    {selectedWorkflowStep.approver}
                  </div>
                </div>
              )}

              {selectedWorkflowStep.comments && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Parecer
                  </label>
                  <div style={{ 
                    fontSize: '14px',
                    backgroundColor: 'var(--background)',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedWorkflowStep.comments}
                  </div>
                </div>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <button
                onClick={() => {
                  setShowWorkflowModal(false);
                  setSelectedWorkflowStep(null);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreditAnalysis; 