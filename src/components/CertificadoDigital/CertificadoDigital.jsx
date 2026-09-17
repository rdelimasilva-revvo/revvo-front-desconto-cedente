import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Shield, 
  Info, 
  Plus 
} from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }
  
  p {
    font-size: 16px;
    color: var(--secondary-text);
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
`;

const CertificadosList = styled.div`
  margin-top: 24px;
`;

const CertificadoItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 16px;
  background: ${props => props.active ? 'rgba(0, 112, 242, 0.05)' : 'white'};
  
  &:hover {
    background: var(--background);
  }
`;

const CertificadoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${props => props.active ? 'rgba(0, 112, 242, 0.1)' : 'var(--background)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--secondary-text)'};
`;

const CertificadoInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 4px;
  }
  
  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 8px;
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: var(--secondary-text);
      
      .label {
        font-weight: 500;
      }
    }
  }
  
  .status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 500;
    
    &.active {
      color: #22c55e;
    }
    
    &.expired {
      color: #ef4444;
    }
    
    &.expiring {
      color: #f59e0b;
    }
  }
`;

const CertificadoActions = styled.div`
  display: flex;
  gap: 8px;
  
  button {
    background: none;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--secondary-text);
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--background);
      color: var(--primary-text);
    }
    
    &.primary {
      background: var(--primary-blue);
      color: white;
      
      &:hover {
        background: #2563eb;
      }
    }
    
    &.danger {
      color: #ef4444;
      
      &:hover {
        background: rgba(239, 68, 68, 0.1);
      }
    }
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

const InfoCard = styled.div`
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  .icon {
    color: var(--primary-blue);
    flex-shrink: 0;
  }
  
  .content {
    h4 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--primary-blue);
    }
    
    p {
      font-size: 14px;
      color: var(--secondary-text);
      margin: 0;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  
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

// Mock data para certificados
const mockCertificados = [
  {
    id: 1,
    nome: 'Certificado A1 - e-CNPJ',
    tipo: 'A1',
    emissor: 'Serasa Experian',
    dataEmissao: '2024-01-15',
    dataValidade: '2025-01-15',
    status: 'active',
    ativo: true
  },
  {
    id: 2,
    nome: 'Certificado A3 - e-CNPJ (Token)',
    tipo: 'A3',
    emissor: 'Certisign',
    dataEmissao: '2023-05-20',
    dataValidade: '2024-05-20',
    status: 'expiring',
    ativo: true
  },
  {
    id: 3,
    nome: 'Certificado A1 - e-CPF (João Silva)',
    tipo: 'A1',
    emissor: 'Serasa Experian',
    dataEmissao: '2022-11-10',
    dataValidade: '2023-11-10',
    status: 'expired',
    ativo: false
  }
];

const CertificadoDigital = () => {
  const [certificados, setCertificados] = useState(mockCertificados);
  const [showUploadArea, setShowUploadArea] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault();
    alert('Funcionalidade de upload de certificado será implementada aqui.');
  };

  const handleRemoveCertificado = (id) => {
    if (window.confirm('Tem certeza que deseja remover este certificado?')) {
      setCertificados(certificados.filter(cert => cert.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setCertificados(certificados.map(cert => 
      cert.id === id ? { ...cert, ativo: !cert.ativo } : cert
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getDaysRemaining = (dateString) => {
    const today = new Date();
    const validadeDate = new Date(dateString);
    const diffTime = validadeDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Válido';
      case 'expiring':
        return 'Expirando em breve';
      case 'expired':
        return 'Expirado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Container>
      <PageHeader>
        <h1>Certificado Digital</h1>
        <p>Gerencie seus certificados digitais para assinatura de documentos</p>
      </PageHeader>

      <InfoCard>
        <Info size={24} className="icon" />
        <div className="content">
          <h4>Sobre Certificados Digitais</h4>
          <p>
            Certificados digitais são documentos eletrônicos que contêm dados de identificação de uma pessoa ou empresa.
            Eles são utilizados para assinar documentos digitalmente, garantindo a autenticidade e integridade das informações.
          </p>
        </div>
      </InfoCard>

      <Card>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Certificados Cadastrados</h3>
        
        {showUploadArea ? (
          <UploadArea onClick={() => document.getElementById('file-upload').click()}>
            <Upload size={48} className="icon" />
            <h4>Arraste e solte seu certificado aqui</h4>
            <p>ou</p>
            <button onClick={handleFileUpload}>Selecionar Arquivo</button>
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload}
            />
          </UploadArea>
        ) : (
          <ActionButtons>
            <button className="primary" onClick={() => setShowUploadArea(true)}>
              <Plus size={16} />
              Adicionar Certificado
            </button>
          </ActionButtons>
        )}

        <CertificadosList>
          {certificados.length > 0 ? (
            certificados.map(certificado => (
              <CertificadoItem key={certificado.id} active={certificado.ativo}>
                <CertificadoIcon active={certificado.ativo}>
                  <Shield size={24} weight="bold" />
                </CertificadoIcon>
                
                <CertificadoInfo>
                  <div className="name">{certificado.nome}</div>
                  
                  <div className="details">
                    <div className="detail-item">
                      <FileText size={16} />
                      <span className="label">Tipo:</span>
                      <span>{certificado.tipo}</span>
                    </div>
                    
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span className="label">Validade:</span>
                      <span>{formatDate(certificado.dataValidade)}</span>
                    </div>
                    
                    <div className="detail-item">
                      <Info size={16} />
                      <span className="label">Emissor:</span>
                      <span>{certificado.emissor}</span>
                    </div>
                  </div>
                  
                  <div className={`status ${certificado.status}`}>
                    {certificado.status === 'active' ? (
                      <>
                        <CheckCircle size={16} weight="fill" />
                        {getStatusText(certificado.status)} (mais {getDaysRemaining(certificado.dataValidade)} dias)
                      </>
                    ) : certificado.status === 'expiring' ? (
                      <>
                        <Calendar size={16} weight="fill" />
                        {getStatusText(certificado.status)} (menos de 30 dias)
                      </>
                    ) : (
                      <>
                        <XCircle size={16} weight="fill" />
                        {getStatusText(certificado.status)}
                      </>
                    )}
                  </div>
                </CertificadoInfo>
                
                <CertificadoActions>
                  <button 
                    title={certificado.ativo ? "Desativar" : "Ativar"}
                    onClick={() => handleToggleActive(certificado.id)}
                    className={certificado.ativo ? "primary" : ""}
                  >
                    {certificado.ativo ? "Ativo" : "Ativar"}
                  </button>
                  <button 
                    title="Remover"
                    onClick={() => handleRemoveCertificado(certificado.id)}
                    className="danger"
                  >
                    <XCircle size={16} />
                  </button>
                </CertificadoActions>
              </CertificadoItem>
            ))
          ) : (
            <EmptyState>
              <div className="icon">
                <Shield size={48} />
              </div>
              <h4>Nenhum certificado encontrado</h4>
              <p>Adicione um certificado digital para começar.</p>
            </EmptyState>
          )}
        </CertificadosList>
      </Card>
    </Container>
  );
};

export default CertificadoDigital;