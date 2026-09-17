import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import { Eye, Download, FunnelSimple, MagnifyingGlass, CaretDown, X, Clock, CheckCircle, XCircle, PenNib, UserCheck, CreditCard, FileText, Calendar, Bank, User } from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--background);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Alert = styled.div`
  background: #ffeded;
  color: #d32f2f;
  padding: 12px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: space-between;
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
    font-size: 16px;
    color: var(--secondary-text);
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
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

const ListContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  padding: 0;
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 0 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
  }
  
  .actions {
    display: flex;
    gap: 12px;
  }
`;

const TermItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const TermInfo = styled.div`
  display: flex;
  flex: 1 1 auto;
  gap: 20px;
  align-items: center;
  
  > div {
    min-width: 140px;
  }
  
  > div:last-child {
    min-width: 140px;
    text-align: right;
    margin-left: auto;
  }
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
  min-width: 280px;
  justify-content: flex-end;
`;

const Status = styled.span`
  color: white;
  border-radius: 24px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  width: 200px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin-right: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 16px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  min-width: 120px;
  
  &:hover {
    background-color: #0056cc;
  }
  
  &.secondary {
    background-color: white;
    color: var(--primary-text);
    border: 1px solid #e0e0e0;

    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 40px;
  padding-bottom: 16px;
`;

const TimelineModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text);
    padding: 8px;
    
    &:hover {
      color: var(--primary-text);
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const OperationInfo = styled.div`
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
  
  .info-item {
    .label {
      font-size: 13px;
      color: var(--secondary-text);
      margin-bottom: 4px;
    }
    
    .value {
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text);
    }
  }
`;

const Timeline = styled.div`
  position: relative;
  margin-left: 16px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 2px;
    background: var(--border-color);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 32px;
  padding-bottom: 24px;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    
    &.completed {
      border-color: #22c55e;
      color: #22c55e;
    }
    
    &.current {
      border-color: #3b82f6;
      color: #3b82f6;
    }
    
    &.pending {
      border-color: #9ca3af;
      color: #9ca3af;
    }
    
    &.rejected {
      border-color: #ef4444;
      color: #ef4444;
    }
  }
  
  .timeline-content {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      
      .title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text);
      }
      
      .date {
        font-size: 13px;
        color: var(--secondary-text);
      }
    }
    
    .timeline-body {
      font-size: 14px;
      color: var(--secondary-text);
      margin-bottom: 8px;
    }
    
    .timeline-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      
      .status {
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 500;
        
        &.completed {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.current {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        
        &.pending {
          background: rgba(156, 163, 175, 0.1);
          color: #6b7280;
        }
        
        &.rejected {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }
  }
`;

const TimelineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => 
    props.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 
    props.status === 'current' ? 'rgba(59, 130, 246, 0.1)' : 
    props.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 
    'rgba(156, 163, 175, 0.1)'};
  color: ${props => 
    props.status === 'completed' ? '#22c55e' : 
    props.status === 'current' ? '#3b82f6' : 
    props.status === 'rejected' ? '#ef4444' : 
    '#6b7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const termsMock = [
  {
    id: 1,
    status: 'Termo Pendente',
    date: '11/10/2024 - 14:10',
    operation: '236/03534',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 51.935,65',
  },
  {
    id: 2,
    status: 'Aguardando Desembolso',
    date: '11/07/2024 - 09:37',
    operation: '236/03106',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 45.432,32',
  },
  {
    id: 3,
    status: 'Emissão de Cobrança Pendente',
    date: '11/07/2024 - 09:03',
    operation: 'j7wP4gB0l',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 2.797,48',
  },
  {
    id: 4,
    status: 'Aguardando Aceite',
    date: '27/05/2024 - 11:58',
    operation: '0gkK9g8z2',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 27.259,38',
  },
  {
    id: 5,
    status: 'Termo Pendente',
    date: '25/03/2024 - 11:20',
    operation: '236/07229',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 10.165,83',
  },
  {
    id: 6,
    status: 'Aguardando Desembolso',
    date: '14/06/2023 - 10:05',
    operation: '236/01365',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 6.291,70',
  },
  {
    id: 7,
    status: 'Aguardando Aceite',
    date: '11/04/2023 - 11:06',
    operation: '236/01125',
    sacado: 'Raia Drogasil S.A.',
    value: 'R$ 84.202,22', 
    timeline: [
      {
        id: 1,
        title: 'Solicitação de Antecipação',
        description: 'Solicitação de antecipação criada pelo fornecedor',
        date: '10/04/2023 - 09:30',
        status: 'completed',
        user: 'João Silva',
        icon: <FileText size={16} />
      },
      {
        id: 2,
        title: 'Análise de Crédito',
        description: 'Análise de crédito realizada pelo financiador',
        date: '10/04/2023 - 14:45',
        status: 'completed',
        user: 'Maria Oliveira',
        icon: <Clock size={16} />
      },
      {
        id: 3,
        title: 'Aprovação do Financiador',
        description: 'Operação aprovada pelo financiador',
        date: '11/04/2023 - 08:15',
        status: 'completed',
        user: 'Carlos Santos',
        icon: <CheckCircle size={16} />
      },
      {
        id: 4,
        title: 'Aguardando Aceite',
        description: 'Aguardando aceite do fornecedor para prosseguir com a operação',
        date: '11/04/2023 - 11:06',
        status: 'current',
        user: 'Sistema',
        icon: <Clock size={16} />
      },
      {
        id: 5,
        title: 'Assinatura do Termo',
        description: 'Assinatura digital do termo de cessão',
        date: '',
        status: 'pending',
        user: '',
        icon: <CreditCard size={16} />
      },
      {
        id: 6,
        title: 'Desembolso',
        description: 'Pagamento realizado ao fornecedor',
        date: '',
        status: 'pending',
        user: '',
        icon: <CreditCard size={16} />
      },
      {
        id: 7,
        title: 'Aceite das Partes',
        description: 'Confirmação de aceite de todas as partes envolvidas',
        date: '',
        status: 'pending',
        user: '',
        icon: <UserCheck size={16} />
      },
      {
        id: 8,
        title: 'Emissão da Cobrança',
        description: 'Emissão do documento de cobrança para o pagador',
        date: '',
        status: 'pending',
        user: '',
        icon: <FileText size={16} />
      }
    ]
  },
];

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 16px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 12px;

  &:first-of-type {
    margin-top: 0;
  }

  .badge {
    background: #FEF3C7;
    color: #92400E;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }
`;

const SignatureModalContent = styled(ModalContent)`
  max-width: 900px;
`;

const TermPreview = styled.div`
  background: var(--background);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 16px;
    text-align: center;
  }

  .term-section {
    margin-bottom: 16px;

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text);
      margin-bottom: 8px;
    }

    .section-content {
      font-size: 14px;
      color: var(--secondary-text);
      line-height: 1.6;
      text-align: justify;
    }
  }
`;

const SignatureArea = styled.div`
  background: white;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 24px;
  text-align: center;

  .signature-icon {
    color: var(--primary-blue);
    margin-bottom: 16px;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--secondary-text);
    margin-bottom: 20px;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #2563eb;
    }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px;

  .success-icon {
    color: #22c55e;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: var(--secondary-text);
    margin-bottom: 24px;
  }

  .success-details {
    background: var(--background);
    border-radius: 8px;
    padding: 16px;
    margin-top: 24px;

    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        border-bottom: none;
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
`;

const ModalFooterButtons = styled.div`
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
      background: var(--primary-blue);
      color: white;
      border: none;

      &:hover {
        background: #2563eb;
      }
    }

    &.success {
      background: #22c55e;
      color: white;
      border: none;

      &:hover {
        background: #16a34a;
      }
    }
  }
`;

const TermsOfAssignment = () => {
  const [status, setStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureStep, setSignatureStep] = useState('preview'); // preview, signing, success

  // Filtrar operações pendentes de assinatura
  const termsPendentes = termsMock.filter(term =>
    term.status === 'Termo Pendente' ||
    term.status === 'Aguardando Aceite'
  );

  // Demais operações
  const termsGerais = termsMock.filter(term =>
    term.status !== 'Termo Pendente' &&
    term.status !== 'Aguardando Aceite'
  );
  
  const handleViewDetails = (term) => {
    setSelectedTerm(term);
    setShowTimelineModal(true);
  };

  const handleCloseModal = () => {
    setShowTimelineModal(false);
    setSelectedTerm(null);
  };

  const handleOpenSignature = (term) => {
    setSelectedTerm(term);
    setSignatureStep('preview');
    setShowSignatureModal(true);
  };

  const handleCloseSignatureModal = () => {
    setShowSignatureModal(false);
    setSignatureStep('preview');
    setSelectedTerm(null);
  };

  const handleProceedToSign = () => {
    setSignatureStep('signing');
  };

  const handleConfirmSignature = () => {
    // Aqui você pode integrar com o certificado digital
    setSignatureStep('success');

    // Simular atualização do status após 2 segundos
    setTimeout(() => {
      handleCloseSignatureModal();
      // Aqui você atualizaria o status no backend
      alert('Termo assinado com sucesso! Status atualizado para "Aguardando Desembolso"');
    }, 2000);
  };
  
  const getTimelineIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={12} />;
      case 'current':
        return <Clock size={12} />;
      case 'rejected':
        return <XCircle size={12} />;
      default:
        return null;
    }
  };
  
  const getCustomIcon = (item) => {
    if (item.icon) {
      return React.cloneElement(item.icon, { size: 16 });
    }
    
    // Fallback icons based on title if no custom icon provided
    if (item.title.includes('Solicitação')) return <FileText size={16} />;
    if (item.title.includes('Análise')) return <Clock size={16} />;
    if (item.title.includes('Aprovação')) return <CheckCircle size={16} />;
    if (item.title.includes('Aceite')) return <UserCheck size={16} />;
    if (item.title.includes('Assinatura')) return <FileSignature size={16} />;
    if (item.title.includes('Desembolso')) return <CreditCard size={16} />;
    if (item.title.includes('Emissão')) return <FileText size={16} />;
    
    return <Clock size={16} />;
  };

  return (
    <Container>
      <PageHeader>
        <h1>Operações em Formalização</h1>
        <p>Gerencie seus documentos e acompanhe o status das suas assinaturas.</p>
      </PageHeader>
        
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
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Todos">Todos</option>
                    <option value="Termo Pendente">Termo Pendente</option>
                    <option value="Aguardando Desembolso">Aguardando Desembolso</option>
                    <option value="Emissão de Cobrança Pendente">Emissão de Cobrança Pendente</option>
                    <option value="Aguardando Aceite">Aguardando Aceite</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Período</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                
                <div className="filter-group">
                  <label>Ordenar por</label>
                  <select>
                    <option value="data">Mais Recente</option>
                    <option value="valor">Maior Valor</option>
                    <option value="status">Status</option>
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
              placeholder="Filtre por operação ou sacado"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          
          <ActionButtons>
            <button className="secondary">
              <FunnelSimple size={16} />
              Limpar Filtros
            </button>
            <button className="primary">
              <Download size={16} />
              Visualizar documentos
            </button>
          </ActionButtons>
        </SearchSection>
        
        {/* Operações Pendentes de Assinatura */}
        <SectionTitle>
          Operações Pendentes de Assinatura
          <span className="badge">{termsPendentes.length}</span>
        </SectionTitle>
        <ListContainer>
          {termsPendentes.length > 0 ? (
            termsPendentes.map(term => (
              <TermItem key={term.id}>
                <TermInfo>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222' }}>Data da Operação</div>
                    <div>{term.date}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222' }}>Operação</div>
                    <div>{term.operation}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222', minWidth: '120px' }}>Sacado</div>
                    <div>{term.sacado}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222' }}>Valor</div>
                    <div style={{ textAlign: 'right', fontWeight: 600 }}>{term.value}</div>
                  </div>
                </TermInfo>
                <ActionGroup>
                  <Status style={{
                    background: term.status === 'Termo Pendente' ? '#f59e0b' :
                               term.status === 'Aguardando Aceite' ? '#8b5cf6' : '#2ecc71'
                  }}>
                    {term.status}
                  </Status>
                  {term.status === 'Termo Pendente' && (
                    <ActionButton onClick={() => handleOpenSignature(term)} style={{ background: '#22c55e' }}>
                      <PenNib size={14} />
                      Assinar Termo
                    </ActionButton>
                  )}
                  <ActionButton onClick={() => handleViewDetails(term)} className="secondary">
                    <Eye size={14} />
                    Detalhes
                  </ActionButton>
                </ActionGroup>
              </TermItem>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--secondary-text)' }}>
              Nenhuma operação pendente de assinatura
            </div>
          )}
        </ListContainer>

        {/* Operações Gerais */}
        <SectionTitle>
          Operações Gerais
          <span className="badge">{termsGerais.length}</span>
        </SectionTitle>
        <ListContainer>
          {termsGerais.length > 0 ? (
            termsGerais.map(term => (
              <TermItem key={term.id}>
                <TermInfo>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222' }}>Data da Operação</div>
                    <div>{term.date}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222' }}>Operação</div>
                    <div>{term.operation}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222', minWidth: '120px' }}>Sacado</div>
                    <div>{term.sacado}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: '#222' }}>Valor</div>
                    <div style={{ textAlign: 'right', fontWeight: 600 }}>{term.value}</div>
                  </div>
                </TermInfo>
                <ActionGroup>
                  <Status style={{
                    background: term.status === 'Aguardando Desembolso' ? '#3b82f6' :
                               term.status === 'Emissão de Cobrança Pendente' ? '#ef4444' : '#2ecc71'
                  }}>
                    {term.status}
                  </Status>
                  <ActionButton onClick={() => handleViewDetails(term)}>
                    <Eye size={14} />
                    Detalhes
                  </ActionButton>
                </ActionGroup>
              </TermItem>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--secondary-text)' }}>
              Nenhuma operação geral
            </div>
          )}
        </ListContainer>
        
        {/* Timeline Modal */}
        {showTimelineModal && selectedTerm && (
          <TimelineModal onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>Jornada da Transação</h2>
                <button onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </ModalHeader>
              <ModalBody>
                <OperationInfo>
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="label">Operação</div>
                      <div className="value">{selectedTerm.operation}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Sacado</div>
                      <div className="value">{selectedTerm.sacado}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Valor</div>
                      <div className="value">{selectedTerm.value}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Data da Operação</div>
                      <div className="value">{selectedTerm.date}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">Status</div>
                      <div className="value">{selectedTerm.status}</div>
                    </div>
                  </div>
                </OperationInfo>
                
                <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Histórico da Operação</h3>
                
                <Timeline>
                  {selectedTerm.timeline && selectedTerm.timeline.map((item) => (
                    <TimelineItem key={item.id}>
                      <div className={`timeline-icon ${item.status}`}>
                        {getTimelineIcon(item.status)}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <div className="title">{item.title}</div>
                          <div className="date">{item.date || 'Pendente'}</div>
                        </div>
                        <div className="timeline-body">
                          {item.description}
                        </div>
                        <div className="timeline-footer">
                          {item.user && (
                            <div className="user">Por: {item.user}</div>
                          )}
                          <div className={`status ${item.status}`}>
                            {item.status === 'completed' ? 'Concluído' : 
                             item.status === 'current' ? 'Em andamento' : 
                             item.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                          </div>
                        </div>
                      </div>
                    </TimelineItem>
                  ))}
                  
                  {/* Se não houver timeline, criar uma padrão baseada no status */}
                  {!selectedTerm.timeline && (
                    <>
                      <TimelineItem>
                        <div className="timeline-icon completed">
                          <CheckCircle size={12} />
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <div className="title">Solicitação de Antecipação</div>
                            <div className="date">{selectedTerm.date.split(' - ')[0] + ' - 09:30'}</div>
                          </div>
                          <div className="timeline-body">
                            Solicitação de antecipação criada pelo fornecedor
                          </div>
                          <div className="timeline-footer">
                            <div className="user">Por: Sistema</div>
                            <div className="status completed">Concluído</div>
                          </div>
                        </div>
                      </TimelineItem>
                      
                      <TimelineItem>
                        <div className="timeline-icon completed">
                          <CheckCircle size={12} />
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <div className="title">Análise de Crédito</div>
                            <div className="date">{selectedTerm.date.split(' - ')[0] + ' - 10:15'}</div>
                          </div>
                          <div className="timeline-body">
                            Análise de crédito realizada pelo financiador
                          </div>
                          <div className="timeline-footer">
                            <div className="user">Por: Analista de Crédito</div>
                            <div className="status completed">Concluído</div>
                          </div>
                        </div>
                      </TimelineItem>
                      
                      <TimelineItem>
                        <div className="timeline-icon completed">
                          <CheckCircle size={12} />
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <div className="title">Aprovação do Financiador</div>
                            <div className="date">{selectedTerm.date.split(' - ')[0] + ' - 11:30'}</div>
                          </div>
                          <div className="timeline-body">
                            Operação aprovada pelo financiador
                          </div>
                          <div className="timeline-footer">
                            <div className="user">Por: Gerente de Operações</div>
                            <div className="status completed">Concluído</div>
                          </div>
                        </div>
                      </TimelineItem>
                      
                      {/* Status atual baseado no status do termo */}
                      <TimelineItem>
                        <div className={`timeline-icon ${
                          selectedTerm.status === 'Termo Pendente' || 
                          selectedTerm.status === 'Aguardando Aceite' ? 'current' : 'completed'
                        }`}>
                          <Clock size={12} />
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <div className="title">
                              {selectedTerm.status === 'Termo Pendente' ? 'Assinatura do Termo' :
                               selectedTerm.status === 'Aguardando Aceite' ? 'Aguardando Aceite' :
                               selectedTerm.status === 'Aguardando Desembolso' ? 'Desembolso' :
                               'Emissão de Cobrança'}
                            </div>
                            <div className="date">{selectedTerm.date}</div>
                          </div>
                          <div className="timeline-body">
                            {selectedTerm.status === 'Termo Pendente' ? 'Aguardando assinatura digital do termo de cessão' :
                             selectedTerm.status === 'Aguardando Aceite' ? 'Aguardando aceite do fornecedor para prosseguir com a operação' :
                             selectedTerm.status === 'Aguardando Desembolso' ? 'Aguardando pagamento ao fornecedor' :
                             'Aguardando emissão do documento de cobrança para o pagador'}
                          </div>
                          <div className="timeline-footer">
                            <div className="user">Por: Sistema</div>
                            <div className="status current">Em andamento</div>
                          </div>
                        </div>
                      </TimelineItem>
                      
                      {/* Etapas pendentes */}
                      {(selectedTerm.status === 'Termo Pendente' || selectedTerm.status === 'Aguardando Aceite') && (
                        <>
                          <TimelineItem>
                            <div className="timeline-icon pending">
                              <Clock size={12} />
                            </div>
                            <div className="timeline-content">
                              <div className="timeline-header">
                                <div className="title">Desembolso</div>
                                <div className="date">Pendente</div>
                              </div>
                              <div className="timeline-body">
                                Pagamento a ser realizado ao fornecedor
                              </div>
                              <div className="timeline-footer">
                                <div className="status pending">Pendente</div>
                              </div>
                            </div>
                          </TimelineItem>
                          
                          <TimelineItem>
                            <div className="timeline-icon pending">
                              <Clock size={12} />
                            </div>
                            <div className="timeline-content">
                              <div className="timeline-header">
                                <div className="title">Emissão da Cobrança</div>
                                <div className="date">Pendente</div>
                              </div>
                              <div className="timeline-body">
                                Emissão do documento de cobrança para o pagador
                              </div>
                              <div className="timeline-footer">
                                <div className="status pending">Pendente</div>
                              </div>
                            </div>
                          </TimelineItem>
                        </>
                      )}
                      
                      {selectedTerm.status === 'Aguardando Desembolso' && (
                        <TimelineItem>
                          <div className="timeline-icon pending">
                            <Clock size={12} />
                          </div>
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <div className="title">Emissão da Cobrança</div>
                              <div className="date">Pendente</div>
                            </div>
                            <div className="timeline-body">
                              Emissão do documento de cobrança para o pagador
                            </div>
                            <div className="timeline-footer">
                              <div className="status pending">Pendente</div>
                            </div>
                          </div>
                        </TimelineItem>
                      )}
                    </>
                  )}
                </Timeline>
              </ModalBody>
            </ModalContent>
          </TimelineModal>
        )}

        {/* Signature Modal */}
        {showSignatureModal && selectedTerm && (
          <TimelineModal onClick={handleCloseSignatureModal}>
            <SignatureModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>
                  {signatureStep === 'preview' && 'Assinar Termo de Cessão'}
                  {signatureStep === 'signing' && 'Assinatura Digital'}
                  {signatureStep === 'success' && 'Assinatura Concluída'}
                </h2>
                <button onClick={handleCloseSignatureModal}>
                  <X size={20} />
                </button>
              </ModalHeader>

              <ModalBody>
                {signatureStep === 'preview' && (
                  <>
                    <OperationInfo>
                      <div className="info-grid">
                        <div className="info-item">
                          <div className="label">Operação</div>
                          <div className="value">{selectedTerm.operation}</div>
                        </div>
                        <div className="info-item">
                          <div className="label">Sacado</div>
                          <div className="value">{selectedTerm.sacado}</div>
                        </div>
                        <div className="info-item">
                          <div className="label">Valor</div>
                          <div className="value">{selectedTerm.value}</div>
                        </div>
                        <div className="info-item">
                          <div className="label">Data</div>
                          <div className="value">{selectedTerm.date}</div>
                        </div>
                      </div>
                    </OperationInfo>

                    <TermPreview>
                      <h3>TERMO DE CESSÃO DE CRÉDITO</h3>

                      <div className="term-section">
                        <div className="section-title">1. PARTES</div>
                        <div className="section-content">
                          <strong>CEDENTE:</strong> Empresa ABC Ltda, inscrita no CNPJ sob o nº 12.345.678/0001-90, com sede na Rua Exemplo, 123, São Paulo - SP.
                          <br /><br />
                          <strong>CESSIONÁRIO:</strong> {selectedTerm.sacado}, conforme qualificação nos registros desta operação.
                        </div>
                      </div>

                      <div className="term-section">
                        <div className="section-title">2. OBJETO</div>
                        <div className="section-content">
                          O presente instrumento tem por objeto a cessão de crédito referente à operação nº {selectedTerm.operation},
                          no valor de {selectedTerm.value}, conforme detalhamento anexo. A cessão é realizada de forma definitiva
                          e irrevogável, transferindo ao CESSIONÁRIO todos os direitos, garantias e acessórios relacionados ao crédito cedido.
                        </div>
                      </div>

                      <div className="term-section">
                        <div className="section-title">3. VALOR E CONDIÇÕES</div>
                        <div className="section-content">
                          O valor da cessão é de {selectedTerm.value}, a ser pago nas condições previamente acordadas entre as partes.
                          O CEDENTE declara que o crédito cedido está livre e desembaraçado de quaisquer ônus, gravames ou restrições.
                        </div>
                      </div>

                      <div className="term-section">
                        <div className="section-title">4. OBRIGAÇÕES DO CEDENTE</div>
                        <div className="section-content">
                          O CEDENTE obriga-se a: (i) notificar o devedor sobre a cessão; (ii) fornecer toda documentação necessária;
                          (iii) garantir a veracidade das informações prestadas; (iv) responder pela existência e liquidez do crédito cedido.
                        </div>
                      </div>

                      <div className="term-section">
                        <div className="section-title">5. FORO</div>
                        <div className="section-content">
                          Fica eleito o foro da comarca de São Paulo - SP para dirimir quaisquer questões oriundas deste instrumento,
                          com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                        </div>
                      </div>

                      <div className="term-section">
                        <div className="section-content" style={{ marginTop: '24px', textAlign: 'center', fontStyle: 'italic' }}>
                          Ao assinar digitalmente este termo, você declara estar ciente e de acordo com todas as cláusulas aqui estabelecidas.
                        </div>
                      </div>
                    </TermPreview>
                  </>
                )}

                {signatureStep === 'signing' && (
                  <>
                    <OperationInfo>
                      <div className="info-grid">
                        <div className="info-item">
                          <div className="label">Operação</div>
                          <div className="value">{selectedTerm.operation}</div>
                        </div>
                        <div className="info-item">
                          <div className="label">Valor</div>
                          <div className="value">{selectedTerm.value}</div>
                        </div>
                      </div>
                    </OperationInfo>

                    <SignatureArea>
                      <div className="signature-icon">
                        <PenNib size={48} />
                      </div>
                      <h4>Assinar com Certificado Digital</h4>
                      <p>Clique no botão abaixo para assinar digitalmente este termo utilizando seu certificado digital A1 ou A3.</p>
                      <button onClick={handleConfirmSignature}>
                        <PenNib size={16} />
                        Assinar com Certificado Digital
                      </button>
                    </SignatureArea>

                    <div style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <FileText size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '14px', color: '#1e40af' }}>
                        <strong>Importante:</strong> A assinatura digital garante a autenticidade e validade jurídica deste documento.
                        Certifique-se de que seu certificado digital está instalado e válido antes de prosseguir.
                      </div>
                    </div>
                  </>
                )}

                {signatureStep === 'success' && (
                  <SuccessMessage>
                    <div className="success-icon">
                      <CheckCircle size={64} weight="fill" />
                    </div>
                    <h3>Termo Assinado com Sucesso!</h3>
                    <p>O termo de cessão foi assinado digitalmente e já está disponível para as demais partes.</p>

                    <div className="success-details">
                      <div className="detail-item">
                        <span className="label">Operação</span>
                        <span className="value">{selectedTerm.operation}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Valor</span>
                        <span className="value">{selectedTerm.value}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Data da Assinatura</span>
                        <span className="value">{new Date().toLocaleDateString('pt-BR')} - {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Próximo Status</span>
                        <span className="value" style={{ color: '#3b82f6' }}>Aguardando Desembolso</span>
                      </div>
                    </div>
                  </SuccessMessage>
                )}
              </ModalBody>

              <ModalFooterButtons>
                {signatureStep === 'preview' && (
                  <>
                    <button className="cancel" onClick={handleCloseSignatureModal}>
                      Cancelar
                    </button>
                    <button className="primary" onClick={handleProceedToSign}>
                      <PenNib size={16} />
                      Prosseguir para Assinatura
                    </button>
                  </>
                )}

                {signatureStep === 'signing' && (
                  <>
                    <button className="cancel" onClick={() => setSignatureStep('preview')}>
                      Voltar
                    </button>
                  </>
                )}

                {signatureStep === 'success' && (
                  <button className="success" onClick={handleCloseSignatureModal}>
                    <CheckCircle size={16} />
                    Concluir
                  </button>
                )}
              </ModalFooterButtons>
            </SignatureModalContent>
          </TimelineModal>
        )}

      <Footer>
        © 2025 Revvo - Todos os direitos reservados
      </Footer>
    </Container>
  );
};

export default TermsOfAssignment;