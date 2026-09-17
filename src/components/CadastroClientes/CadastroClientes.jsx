import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pencil } from 'lucide-react';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Download,
  Tabs,
  Plus, 
  CaretDown,
  Eye,
  Calendar,
  CurrencyCircleDollar,
  Trash,
  User,
  Buildings,
  IdentificationCard,
  MapPin,
  Phone,
  Envelope,
  CheckCircle,
  FileText,
  Bank,
  Clock,
  ChartBar
} from '@phosphor-icons/react';
import { supabase } from '../../lib/supabase';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  
  .tabs {
    display: flex;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .tab {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--secondary-text);
    cursor: pointer;
    transition: all 0.2s ease;
    height: auto;
    
    &:hover {
      color: var(--primary-text);
    }
    
    &.active {
      color: var(--primary-blue);
      border-bottom-color: var(--primary-blue);
    }
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
    
    &.actions {
      text-align: center;
      width: 100px;
      
      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
      
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
        
        &.edit:hover {
          color: #0070F2;
        }
        
        &.delete:hover {
          color: #ef4444;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
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

const FormGroup = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 2px rgba(0, 112, 242, 0.1);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
`;

const KYCJourney = () => {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Jornada de Conheça seu Cliente (KYC)</h2>
      
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            A jornada de Conheça seu Cliente (KYC) é um processo essencial para verificar a identidade dos clientes e avaliar potenciais riscos de fraude ou lavagem de dinheiro. Este processo ajuda a garantir a conformidade com regulamentações financeiras e protege tanto a sua empresa quanto seus clientes.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <IdentificationCard size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>1. Coleta de Documentos</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Colete documentos de identificação como CNPJ, contrato social, documentos dos sócios e comprovante de endereço. Esta etapa é fundamental para estabelecer a identidade legal do cliente.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <Buildings size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>2. Verificação de Dados</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Verifique a autenticidade dos documentos e dados fornecidos, consultando bases de dados oficiais como Receita Federal, Serasa e bureaus de crédito. Confirme se a empresa está ativa e regular.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>3. Análise de Risco</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Avalie o perfil de risco do cliente com base em seu histórico financeiro, setor de atuação, localização geográfica e estrutura societária. Identifique possíveis sinais de alerta.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <CheckCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>4. Aprovação e Monitoramento</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Aprove o cliente com base na análise realizada e estabeleça um processo de monitoramento contínuo para detectar mudanças no perfil de risco ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Documentos Necessários</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          <div style={{ 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} />
              Documentos da Empresa
            </h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
              <li>Cartão CNPJ</li>
              <li>Contrato Social ou Estatuto</li>
              <li>Última alteração contratual</li>
              <li>Comprovante de endereço da empresa</li>
              <li>Balanço patrimonial dos últimos 2 anos</li>
              <li>Faturamento dos últimos 12 meses</li>
            </ul>
          </div>
          
          <div style={{ 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} />
              Documentos dos Sócios
            </h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
              <li>RG e CPF</li>
              <li>Comprovante de residência</li>
              <li>Declaração de Imposto de Renda</li>
              <li>Procuração (se aplicável)</li>
            </ul>
          </div>
          
          <div style={{ 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bank size={16} />
              Documentos Financeiros
            </h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
              <li>Extratos bancários dos últimos 3 meses</li>
              <li>Certidões negativas de débitos</li>
              <li>Relação de faturamento por cliente</li>
              <li>Fluxo de caixa projetado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const PowerAnalysis = () => {
  const [showKYCWorkflow, setShowKYCWorkflow] = useState(false);
  const [kycApprovals, setKycApprovals] = useState([
    {
      id: 1,
      cliente: 'Farmácia Saúde Total',
      cnpj: '12.345.678/0001-90',
      etapa: 'Análise Documental',
      status: 'em_andamento',
      responsavel: 'Ana Silva',
      dataInicio: '2024-06-10',
      prazoLimite: '2024-06-17',
      progresso: 60,
      documentos: ['Contrato Social', 'CNPJ', 'Comprovante Endereço'],
      observacoes: 'Aguardando validação dos documentos dos sócios'
    },
    {
      id: 2,
      cliente: 'Drogaria Bem Estar',
      cnpj: '23.456.789/0001-01',
      etapa: 'Verificação de Dados',
      status: 'pendente',
      responsavel: 'Carlos Santos',
      dataInicio: '2024-06-12',
      prazoLimite: '2024-06-19',
      progresso: 25,
      documentos: ['Balanço Patrimonial', 'Extratos Bancários'],
      observacoes: 'Pendente envio de documentos financeiros'
    },
    {
      id: 3,
      cliente: 'Farmácia Vida & Saúde',
      cnpj: '34.567.890/0001-12',
      etapa: 'Análise de Risco',
      status: 'aprovado',
      responsavel: 'Maria Oliveira',
      dataInicio: '2024-06-05',
      prazoLimite: '2024-06-12',
      progresso: 100,
      documentos: ['Todos os documentos validados'],
      observacoes: 'KYC aprovado - cliente liberado para operações'
    },
    {
      id: 4,
      cliente: 'Drogaria São Lucas',
      cnpj: '45.678.901/0001-23',
      etapa: 'Aprovação Final',
      status: 'rejeitado',
      responsavel: 'João Costa',
      dataInicio: '2024-06-08',
      prazoLimite: '2024-06-15',
      progresso: 90,
      documentos: ['Documentação incompleta'],
      observacoes: 'Rejeitado por inconsistências nos documentos societários'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'em_andamento':
        return '#3b82f6';
      case 'pendente':
        return '#f59e0b';
      case 'aprovado':
        return '#22c55e';
      case 'rejeitado':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'em_andamento':
        return 'Em Andamento';
      case 'pendente':
        return 'Pendente';
      case 'aprovado':
        return 'Aprovado';
      case 'rejeitado':
        return 'Rejeitado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Análise de Poderes</h2>
      
      {/* Botão para mostrar/ocultar workflow KYC */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setShowKYCWorkflow(!showKYCWorkflow)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#2563eb'}
          onMouseOut={(e) => e.target.style.background = 'var(--primary-blue)'}
        >
          <CheckCircle size={16} />
          {showKYCWorkflow ? 'Ocultar' : 'Mostrar'} Aprovações KYC em Andamento
        </button>
      </div>

      {/* Workflow de Aprovações KYC */}
      {showKYCWorkflow && (
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          marginBottom: '24px', 
          border: '1px solid var(--border-color)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px' 
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <User size={20} style={{ color: 'var(--primary-blue)' }} />
              Workflow de Aprovações KYC
            </h3>
            <span style={{ 
              fontSize: '14px', 
              color: 'var(--secondary-text)' 
            }}>
              {kycApprovals.length} processos
            </span>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gap: '16px' 
          }}>
            {kycApprovals.map(approval => (
              <div key={approval.id} style={{
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '20px',
                background: '#f8f9fa',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      margin: '0 0 4px 0',
                      color: 'var(--primary-text)'
                    }}>
                      {approval.cliente}
                    </h4>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'var(--secondary-text)', 
                      margin: '0 0 8px 0' 
                    }}>
                      CNPJ: {approval.cnpj}
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getStatusColor(approval.status)}20`,
                      color: getStatusColor(approval.status)
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(approval.status)
                      }}></span>
                      {getStatusText(approval.status)}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      color: 'var(--primary-text)',
                      marginBottom: '4px'
                    }}>
                      {approval.etapa}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'var(--secondary-text)' 
                    }}>
                      Responsável: {approval.responsavel}
                    </div>
                  </div>
                </div>
                
                {/* Barra de Progresso */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ 
                      fontSize: '13px', 
                      fontWeight: '500',
                      color: 'var(--secondary-text)'
                    }}>
                      Progresso
                    </span>
                    <span style={{ 
                      fontSize: '13px', 
                      fontWeight: '600',
                      color: 'var(--primary-text)'
                    }}>
                      {approval.progresso}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${approval.progresso}%`,
                      height: '100%',
                      background: getStatusColor(approval.status),
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
                
                {/* Informações Adicionais */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '13px', 
                      fontWeight: '500',
                      color: 'var(--secondary-text)',
                      marginBottom: '4px'
                    }}>
                      Data de Início
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: 'var(--primary-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Calendar size={14} />
                      {new Date(approval.dataInicio).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ 
                      fontSize: '13px', 
                      fontWeight: '500',
                      color: 'var(--secondary-text)',
                      marginBottom: '4px'
                    }}>
                      Prazo Limite
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: new Date(approval.prazoLimite) < new Date() ? '#ef4444' : 'var(--primary-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: new Date(approval.prazoLimite) < new Date() ? '600' : 'normal'
                    }}>
                      <Clock size={14} />
                      {new Date(approval.prazoLimite).toLocaleDateString('pt-BR')}
                      {new Date(approval.prazoLimite) < new Date() && (
                        <span style={{ fontSize: '12px', color: '#ef4444' }}>(Vencido)</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Documentos */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '8px'
                  }}>
                    Documentos em Análise
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px' 
                  }}>
                    {approval.documentos.map((doc, index) => (
                      <span key={index} style={{
                        padding: '4px 8px',
                        background: 'white',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: 'var(--primary-text)'
                      }}>
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Observações */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '500',
                    color: 'var(--secondary-text)',
                    marginBottom: '4px'
                  }}>
                    Observações
                  </div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--primary-text)',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {approval.observacoes}
                  </p>
                </div>
                
                {/* Ações */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '8px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  {approval.status === 'pendente' && (
                    <button style={{
                      padding: '6px 12px',
                      background: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>
                      Iniciar Análise
                    </button>
                  )}
                  
                  {approval.status === 'em_andamento' && (
                    <>
                      <button style={{
                        padding: '6px 12px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}>
                        Rejeitar
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        background: '#22c55e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}>
                        Aprovar Etapa
                      </button>
                    </>
                  )}
                  
                  <button style={{
                    padding: '6px 12px',
                    background: 'white',
                    color: 'var(--primary-blue)',
                    border: '1px solid var(--primary-blue)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumo do Workflow */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '8px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ChartBar size={16} />
              Resumo do Workflow KYC
            </h4>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '16px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#f59e0b',
                  marginBottom: '4px'
                }}>
                  {kycApprovals.filter(a => a.status === 'pendente').length}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                  Pendentes
                </div>
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#3b82f6',
                  marginBottom: '4px'
                }}>
                  {kycApprovals.filter(a => a.status === 'em_andamento').length}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                  Em Andamento
                </div>
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#22c55e',
                  marginBottom: '4px'
                }}>
                  {kycApprovals.filter(a => a.status === 'aprovado').length}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                  Aprovados
                </div>
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#ef4444',
                  marginBottom: '4px'
                }}>
                  {kycApprovals.filter(a => a.status === 'rejeitado').length}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                  Rejeitados
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            A análise de poderes é um processo crucial para verificar quem tem autoridade legal para representar uma empresa e tomar decisões em seu nome. Esta análise garante que os contratos e transações sejam realizados com as pessoas devidamente autorizadas.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>1. Análise do Contrato Social</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Examine o contrato social ou estatuto da empresa para identificar quem são os sócios, administradores e representantes legais, bem como os limites de seus poderes de representação.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>2. Verificação de Procurações</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Verifique se existem procurações outorgadas pela empresa a terceiros, analisando seu escopo, validade e limitações. Certifique-se de que as procurações estão atualizadas e não foram revogadas.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <Buildings size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>3. Consulta à Junta Comercial</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Consulte os registros da Junta Comercial para confirmar as informações do contrato social e verificar se houve alterações recentes na estrutura societária ou na administração da empresa.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '16px', 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            background: '#f8f9fa'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(0, 112, 242, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <CheckCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>4. Documentação e Validação</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary-text)' }}>
                Documente a análise realizada, registrando quem são os representantes autorizados e quais são seus poderes. Valide a identidade dos representantes comparando seus documentos pessoais com os registros oficiais.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Matriz de Poderes</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', background: '#f8f9fa', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>Cargo/Posição</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#f8f9fa', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>Assinar Contratos</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#f8f9fa', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>Movimentar Contas</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#f8f9fa', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>Emitir Procurações</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#f8f9fa', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>Limite de Alçada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>Diretor Presidente</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Ilimitado</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>Diretor Financeiro</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Não</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>R$ 500.000,00</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>Gerente Comercial</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim*</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Não</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Não</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>R$ 100.000,00</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>Procurador</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim**</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Sim**</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Não</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Conforme procuração</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--secondary-text)' }}>
          <p>* Apenas contratos comerciais dentro do limite de alçada</p>
          <p>** Conforme poderes específicos outorgados na procuração</p>
        </div>
      </div>
    </div>
  );
};

// Mock data para clientes
const mockClientes = [
  {
    id: 1,
    nome: 'Farmácia Saúde Total',
    cnpj: '12.345.678/0001-90',
    endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    telefone: '(11) 3456-7890',
    email: 'contato@farmaciasaudetotal.com.br',
    status: 'ativo'
  },
  {
    id: 2,
    nome: 'Drogaria Bem Estar',
    cnpj: '23.456.789/0001-01',
    endereco: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
    telefone: '(11) 2345-6789',
    email: 'contato@drogariabemestar.com.br',
    status: 'ativo'
  },
  {
    id: 3,
    nome: 'Farmácia Vida & Saúde',
    cnpj: '34.567.890/0001-12',
    endereco: 'Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi, São Paulo - SP',
    telefone: '(11) 3456-7891',
    email: 'contato@farmaciavida.com.br',
    status: 'ativo'
  },
  {
    id: 4,
    nome: 'Drogaria São Lucas',
    cnpj: '45.678.901/0001-23',
    endereco: 'Rua Oscar Freire, 300 - Jardins, São Paulo - SP',
    telefone: '(11) 3456-7892',
    email: 'contato@drogariasaolucas.com.br',
    status: 'inativo'
  },
  {
    id: 5,
    nome: 'Farmácia Popular Express',
    cnpj: '56.789.012/0001-34',
    endereco: 'Av. Rebouças, 1500 - Pinheiros, São Paulo - SP',
    telefone: '(11) 3456-7893',
    email: 'contato@farmaciapopular.com.br',
    status: 'ativo'
  }
];

const CadastroClientes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [clientes, setClientes] = useState(mockClientes);
  const [filteredClientes, setFilteredClientes] = useState(mockClientes);
  const [showModal, setShowModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [activeTab, setActiveTab] = useState('clientes');
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    status: 'ativo'
  });

  // Filtrar clientes com base nos filtros aplicados
  useEffect(() => {
    let filtered = clientes;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(cliente =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cnpj.includes(searchTerm) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(cliente => cliente.status === statusFilter);
    }

    setFilteredClientes(filtered);
  }, [clientes, searchTerm, statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('todos');
  };

  const handleAddCliente = () => {
    setCurrentCliente(null);
    setFormData({
      nome: '',
      cnpj: '',
      endereco: '',
      telefone: '',
      email: '',
      status: 'ativo'
    });
    setShowModal(true);
  };

  const handleEditCliente = (cliente) => {
    setCurrentCliente(cliente);
    setFormData({
      nome: cliente.nome,
      cnpj: cliente.cnpj,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
      email: cliente.email,
      status: cliente.status
    });
    setShowModal(true);
  };

  const handleDeleteCliente = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentCliente) {
      // Editar cliente existente
      setClientes(clientes.map(cliente => 
        cliente.id === currentCliente.id ? { ...cliente, ...formData } : cliente
      ));
    } else {
      // Adicionar novo cliente
      const newCliente = {
        id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
        ...formData
      };
      setClientes([...clientes, newCliente]);
    }
    
    setShowModal(false);
  };

  return (
    <Container>
      <PageHeader>
        <h1>Gestão de Clientes</h1>
        <p>Gerencie os clientes, realize análises e acompanhe a jornada KYC</p>
      </PageHeader>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'clientes' ? 'active' : ''}`}
          onClick={() => setActiveTab('clientes')}
        >
          Informações dos Clientes
        </button>
        <button 
          className={`tab ${activeTab === 'kyc' ? 'active' : ''}`}
          onClick={() => setActiveTab('kyc')}
        >
          Jornada de Conheça seu Cliente
        </button>
        <button 
          className={`tab ${activeTab === 'poderes' ? 'active' : ''}`}
          onClick={() => setActiveTab('poderes')}
        >
          Análise de Poderes
        </button>
      </div>

      {activeTab === 'kyc' && <KYCJourney />}
      {activeTab === 'poderes' && <PowerAnalysis />}
      {activeTab === 'clientes' && (
        <>
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
                  <option value="todos">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
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
            placeholder="Buscar por nome, CNPJ ou email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <ActionButtons>
          <button className="secondary" onClick={handleClearFilters}>
            <FunnelSimple size={16} />
            Limpar Filtros
          </button>
          <button className="primary" onClick={handleAddCliente}>
            <Plus size={16} />
            Novo Cliente
          </button>
        </ActionButtons>
      </SearchSection>

      {/* Tabela de Clientes */}
      <TableSection>
        <div className="table-header">
          <h3>Clientes</h3>
          <div className="table-info">
            {filteredClientes.length} clientes
          </div>
        </div>

        <div className="table-responsive">
          {filteredClientes.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Endereço</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cnpj}</td>
                    <td>{cliente.endereco}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.email}</td>
                    <td className="status">
                      <span className={`status-badge ${cliente.status}`}>
                        {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button 
                          className="edit"
                          onClick={() => handleEditCliente(cliente)}
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          className="delete"
                          onClick={() => handleDeleteCliente(cliente.id)}
                          title="Excluir"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState>
              <div className="icon">
                <User size={48} />
              </div>
              <h4>Nenhum cliente encontrado</h4>
              <p>Não foram encontrados clientes com os filtros selecionados.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>
        </>
      )}

      {/* Modal de Adicionar/Editar Cliente */}
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{currentCliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <button onClick={() => setShowModal(false)}>
                <Trash size={20} />
              </button>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormGroup>
                  <label>
                    <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Nome
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    <IdentificationCard size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    CNPJ
                  </label>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <label>
                      <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Telefone
                    </label>
                    <input
                      type="text"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>
                      <Envelope size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowModal(false)}
                  style={{ height: 'auto', padding: '8px 16px' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ height: 'auto', padding: '8px 16px' }}
                >
                  {currentCliente ? 'Atualizar' : 'Salvar'}
                </button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CadastroClientes;