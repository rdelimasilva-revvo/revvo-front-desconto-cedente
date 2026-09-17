import React from 'react';
import styled from 'styled-components';
import { Calendar, TrendUp, Bank } from '@phosphor-icons/react';

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${props => props.viewMode === 'card-small' ? '16px' : props.viewMode === 'list' ? '16px 24px' : '24px'};
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  cursor: pointer;
  
  /* Layout específicos por modo de visualização */
  ${props => props.viewMode === 'list' && `
    display: flex;
    align-items: center;
    padding: 16px 24px;
    overflow-x: auto;
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
  `}
  
  ${props => props.viewMode === 'card-small' && `
    .client-name {
      font-size: 16px !important;
    }
    
    .value {
      font-size: 16px !important;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }
  `}
  
  ${props => props.viewMode === 'card-large' && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const ClientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.viewMode === 'card-small' ? '16px' : '20px'};
  
  .client-name {
    font-size: ${props => props.viewMode === 'card-small' ? '16px' : '18px'};
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 4px;
  }
  
  .status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: ${props => props.viewMode === 'card-small' ? '10px' : '12px'};
    font-weight: 500;
    text-transform: uppercase;
    
    &.ativo {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    
    &.pendente {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
    }
    
    &.inativo {
      background: rgba(156, 163, 175, 0.1);
      color: #6b7280;
    }
  }
`;

const ValuesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.viewMode === 'card-small' ? '12px' : '16px'};
  margin-bottom: ${props => props.viewMode === 'card-small' ? '16px' : '20px'};
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: var(--background);
  border-radius: 8px;
  padding: ${props => props.viewMode === 'card-small' ? '12px' : '16px'};
  
  .icon {
    width: ${props => props.viewMode === 'card-small' ? '24px' : '32px'};
    height: ${props => props.viewMode === 'card-small' ? '24px' : '32px'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${props => props.viewMode === 'card-small' ? '8px' : '12px'};
    
    &.disponivel {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    
    &.antecipado {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }
  }
  
  .value {
    font-size: ${props => props.viewMode === 'card-small' ? '16px' : '20px'};
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 4px;
  }
  
  .label {
    font-size: ${props => props.viewMode === 'card-small' ? '11px' : '12px'};
    color: var(--secondary-text);
    font-weight: 500;
  }
`;

const LastOperation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${props => props.viewMode === 'card-small' ? '8px 12px' : '12px 16px'};
  background: var(--background);
  border-radius: 8px;
  
  .icon {
    color: var(--secondary-text);
  }
  
  .text {
    font-size: ${props => props.viewMode === 'card-small' ? '11px' : '13px'};
    color: var(--secondary-text);
  }
  
  .date {
    font-weight: 500;
    color: var(--primary-text);
    font-size: ${props => props.viewMode === 'card-small' ? '11px' : '13px'};
  }
`;

const UtilizationBar = styled.div`
  margin-bottom: ${props => props.viewMode === 'card-small' ? '12px' : '16px'};
  
  .utilization-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
    .label {
      font-size: ${props => props.viewMode === 'card-small' ? '11px' : '12px'};
      color: var(--secondary-text);
      font-weight: 500;
    }
    
    .percentage {
      font-size: ${props => props.viewMode === 'card-small' ? '11px' : '12px'};
      font-weight: 600;
      color: var(--primary-text);
    }
  }
  
  .bar-container {
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
    
    .bar-fill {
      height: 100%;
      background: ${props => {
        const percentage = props.percentage;
        if (percentage >= 90) return 'linear-gradient(90deg, #ef4444, #dc2626)';
        if (percentage >= 70) return 'linear-gradient(90deg, #f59e0b, #d97706)';
        return 'linear-gradient(90deg, #3b82f6, #1d4ed8)';
      }};
      border-radius: 3px;
      transition: width 0.3s ease;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: ${props => props.viewMode === 'card-small' ? '12px' : '16px'};
  
  button {
    flex: 1;
    padding: ${props => props.viewMode === 'card-small' ? '6px 10px' : '8px 12px'};
    border-radius: 6px;
    font-size: ${props => props.viewMode === 'card-small' ? '11px' : '12px'};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 32px;
    
    &.primary {
      background: var(--primary-blue);
      color: white;
      border: none;
      padding: 0px;
      
      &:hover {
        background: #2563eb;
      }
    }
    
    &.secondary {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);
      padding: 0px;
      
      &:hover {
        background: var(--background);
      }
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 24px;
  overflow-x: auto;
  min-width: 0;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    padding-bottom: 8px; /* Space for potential scrollbar */
  }
`;

const ListClientInfo = styled.div`
  flex: 2;
  min-width: 200px;
  
  .client-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 4px;
  }
  
  .last-operation {
    font-size: 12px;
    color: var(--secondary-text);
  }
`;

const ListStatus = styled.div`
  flex: 1;
  min-width: 80px;
  
  .status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    
    &.ativo {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    
    &.pendente {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
    }
    
    &.inativo {
      background: rgba(156, 163, 175, 0.1);
      color: #6b7280;
    }
  }
`;

const ListValues = styled.div`
  flex: 2;
  display: flex;
  gap: 20px;
  min-width: 200px;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
  
  .value-item {
    .label {
      font-size: 12px;
      color: var(--secondary-text);
      margin-bottom: 2px;
    }
    
    /* Ensure minimum width for value items */
    min-width: 100px;
  }
`;

const ListUtilization = styled.div`
  flex: 1;
  min-width: 100px;
  
  .utilization-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    
    .label {
      font-size: 12px;
      color: var(--secondary-text);
    }
    
    .percentage {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text);
    }
  }
  
  .bar-container {
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
    
    .bar-fill {
      height: 100%;
      background: ${props => {
        const percentage = props.percentage;
        if (percentage >= 90) return 'linear-gradient(90deg, #ef4444, #dc2626)';
        if (percentage >= 70) return 'linear-gradient(90deg, #f59e0b, #d97706)';
        return 'linear-gradient(90deg, #3b82f6, #1d4ed8)';
      }};
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }
`;

const ListActions = styled.div`
  flex: 1;
  min-width: 120px;
  display: flex;
  gap: 8px;
  
  button {
    flex: 1;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const ClientCard = ({ client, onClick, onViewDetails, viewMode = 'card-large' }) => {
  const utilizationPercentage = (client.valorAntecipado / client.valorDisponivel) * 100;

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(client);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(client);
    }
  };

  // Renderização específica para visualização em lista
  if (viewMode === 'list') {
    const limiteDisponivel = client.valorDisponivel - client.valorAntecipado;
    return (
      <CardContainer onClick={handleCardClick} viewMode={viewMode}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <span className="client-name" style={{ fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: 12 }}>{client.nome}</span>
            <span className={`status ${client.status}`} style={{ padding: '2px 10px', borderRadius: 16, fontSize: 11, fontWeight: 500, textTransform: 'uppercase', marginRight: 12 }}>{client.status}</span>
            <span style={{ color: 'var(--secondary-text)', fontSize: 12, marginRight: 10 }}>Utilização</span>
            <span style={{ fontWeight: 600, color: 'var(--primary-text)', fontSize: 13 }}>{utilizationPercentage.toFixed(1)}%</span>
          </div>
        </div>
        <div style={{ width: '100%', height: 12, background: '#e5e7eb', borderRadius: 6, marginTop: 20, marginBottom: 32, marginLeft: 16, marginRight: 16 }}>
          <div style={{ height: '100%', borderRadius: 6, width: `${Math.min(utilizationPercentage, 100)}%`, background: utilizationPercentage >= 90 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : utilizationPercentage >= 70 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #2563eb, #1d4ed8)', transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', marginBottom: 0 }}>
          {/* Card Valor Antecipado */}
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 8, padding: '12px 8px', textAlign: 'center', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 12, color: 'var(--secondary-text)', marginBottom: 2 }}>Valor Antecipado</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--primary-text)' }}>R$ {formatCurrency(client.valorAntecipado).replace('R$ ', '')}</div>
          </div>
          {/* Card Limite Crédito */}
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 8, padding: '12px 8px', textAlign: 'center', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 12, color: 'var(--secondary-text)', marginBottom: 2 }}>Limite Crédito</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--primary-text)' }}>R$ {formatCurrency(client.valorDisponivel).replace('R$ ', '')}</div>
          </div>
          {/* Card Limite Disponível */}
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 8, padding: '12px 8px', textAlign: 'center', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 12, color: 'var(--secondary-text)', marginBottom: 2 }}>Limite Disponível</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--primary-text)' }}>R$ {formatCurrency(limiteDisponivel).replace('R$ ', '')}</div>
          </div>
          {/* Botão Ver Detalhes */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
            <button className="secondary" style={{ height: '100%', minWidth: 110, fontSize: 13, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleViewDetails}>
              Ver Detalhes
            </button>
          </div>
        </div>
      </CardContainer>
    );
  }
  // Renderização para cards pequenos (compacta)
  if (viewMode === 'card-small') {
    const limiteDisponivel = client.valorDisponivel - client.valorAntecipado;
    const handleSmallCardClick = () => {
      if (onViewDetails) {
        onViewDetails(client);
      }
    };
    return (
      <CardContainer onClick={handleSmallCardClick} viewMode={viewMode}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span className="client-name" style={{ fontWeight: 600, fontSize: 15 }}>{client.nome}</span>
          <span className={`status ${client.status}`} style={{ padding: '2px 8px', borderRadius: 14, fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}>{client.status}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ color: 'var(--secondary-text)', fontSize: 11 }}>Utilização</span>
          <span style={{ fontWeight: 600, color: 'var(--primary-text)', fontSize: 12 }}>{utilizationPercentage.toFixed(1)}%</span>
        </div>
        <div style={{ width: '100%', height: 3, background: '#e5e7eb', borderRadius: 2, marginBottom: 8 }}>
          <div style={{ height: '100%', borderRadius: 2, width: `${Math.min(utilizationPercentage, 100)}%`, background: utilizationPercentage >= 90 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : utilizationPercentage >= 70 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #3b82f6, #1d4ed8)', transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ background: 'var(--background)', borderRadius: 7, padding: 8, textAlign: 'center', marginBottom: 6, border: '1px solid var(--border-color)', fontWeight: 600, fontSize: 13, color: 'var(--primary-text)' }}>
          <div style={{ fontSize: 11, color: 'var(--secondary-text)', marginBottom: 1 }}>Valor Antecipado</div>
          R$ {formatCurrency(client.valorAntecipado).replace('R$ ', '')}
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 5, padding: 6, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 10, color: 'var(--secondary-text)', marginBottom: 1 }}>Limite Crédito</div>
            <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--primary-text)' }}>R$ {formatCurrency(client.valorDisponivel).replace('R$ ', '')}</div>
          </div>
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 5, padding: 6, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 10, color: 'var(--secondary-text)', marginBottom: 1 }}>Limite Disponível</div>
            <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--primary-text)' }}>R$ {formatCurrency(limiteDisponivel).replace('R$ ', '')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="secondary" style={{ width: '100%', maxWidth: 120, fontSize: 11 }} onClick={handleViewDetails}>
            Ver Detalhes
          </button>
        </div>
      </CardContainer>
    );
  }

  // Renderização para cards grandes (normal)
  if (viewMode === 'card-large') {
    const limiteDisponivel = client.valorDisponivel - client.valorAntecipado;
    return (
      <CardContainer onClick={handleCardClick} viewMode={viewMode}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div className="client-name" style={{ fontSize: 18, fontWeight: 600, color: 'var(--primary-text)' }}>{client.nome}</div>
          <div className={`status ${client.status}`} style={{ padding: '4px 16px', borderRadius: 20, fontSize: 12, fontWeight: 500, textTransform: 'uppercase' }}>{client.status}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ color: 'var(--secondary-text)', fontSize: 13 }}>Utilização</span>
          <span style={{ fontWeight: 600, color: 'var(--primary-text)', fontSize: 16 }}>{utilizationPercentage.toFixed(1)}%</span>
        </div>
        <div style={{ width: '100%', height: 6, background: '#e5e7eb', borderRadius: 3, marginBottom: 20 }}>
          <div style={{ height: '100%', borderRadius: 3, width: `${Math.min(utilizationPercentage, 100)}%`, background: utilizationPercentage >= 90 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : utilizationPercentage >= 70 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #3b82f6, #1d4ed8)', transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ background: 'var(--background)', borderRadius: 10, padding: 20, textAlign: 'center', marginBottom: 16, border: '1px solid var(--border-color)', fontWeight: 600, fontSize: 20, color: 'var(--primary-text)' }}>
          <div style={{ fontSize: 14, color: 'var(--secondary-text)', marginBottom: 4 }}>Valor Antecipado</div>
          R$ {formatCurrency(client.valorAntecipado).replace('R$ ', '')}
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 8, padding: 16, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 13, color: 'var(--secondary-text)', marginBottom: 4 }}>Limite Crédito</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--primary-text)' }}>R$ {formatCurrency(client.valorDisponivel).replace('R$ ', '')}</div>
          </div>
          <div style={{ flex: 1, background: 'var(--background)', borderRadius: 8, padding: 16, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 13, color: 'var(--secondary-text)', marginBottom: 4 }}>Limite Disponível</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--primary-text)' }}>R$ {formatCurrency(limiteDisponivel).replace('R$ ', '')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="secondary" style={{ width: '100%', maxWidth: 220 }} onClick={handleViewDetails}>
            Ver Detalhes
          </button>
        </div>
      </CardContainer>
    );
  }

  // Renderização para cards grandes (normal)
  return (
    <CardContainer onClick={handleCardClick} viewMode={viewMode}>
      <ClientHeader viewMode={viewMode}>
        <div>
          <div className="client-name">{client.nome}</div>
        </div>
        <div className={`status ${client.status}`}>
          {client.status}
        </div>
      </ClientHeader>

      <UtilizationBar percentage={utilizationPercentage} viewMode={viewMode}>
        <div className="utilization-header">
          <span className="label">Utilização</span>
          <span className="percentage">{utilizationPercentage.toFixed(1)}%</span>
        </div>
        <div className="bar-container">
          <div 
            className="bar-fill" 
            style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
          />
        </div>
      </UtilizationBar>

      <ValuesSection viewMode={viewMode}>
        <ValueCard viewMode={viewMode}>
          <div className="icon disponivel">
            <Bank size={16} weight="bold" />
          </div>
          <div className="value">{formatCurrency(client.valorDisponivel)}</div>
          <div className="label">Valor Disponível</div>
        </ValueCard>

        <ValueCard viewMode={viewMode}>
          <div className="icon antecipado">
            <TrendUp size={16} weight="bold" />
          </div>
          <div className="value">{formatCurrency(client.valorAntecipado)}</div>
          <div className="label">Valor Antecipado</div>
        </ValueCard>
      </ValuesSection>

      <LastOperation viewMode={viewMode}>
        <Calendar size={16} className="icon" />
        <span className="text">Última operação:</span>
        <span className="date">{formatDate(client.ultimaOperacao)}</span>
      </LastOperation>

      <ActionButtons viewMode={viewMode}>
        <button className="secondary" onClick={handleViewDetails}>
          Ver Detalhes
        </button>
      </ActionButtons>
    </CardContainer>
  );
};

export default ClientCard;
