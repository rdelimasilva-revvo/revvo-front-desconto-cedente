import React from 'react';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  X, 
  CurrencyCircleDollar,
  Bank,
  Building,
  Calendar,
  Percent,
  Receipt,
  CheckCircle
} from '@phosphor-icons/react';

const Container = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: var(--background);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  
  .back-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: white;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    color: var(--primary-text);
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 40px;
    
    &:hover {
      background: var(--background);
      border-color: var(--primary-blue);
    }
  }
  
  .operation-info {
    flex: 1;
    
    h1 {
      font-size: 28px;
      font-weight: 600;
      color: var(--primary-text);
      margin-bottom: 8px;
    }
    
    p {
      color: var(--secondary-text);
      font-size: 16px;
    }
  }
`;

const StatusDisplaySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  text-align: center;
`;

const ValueDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  
  .icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }
  
  .value-container {
    .label {
      font-size: 14px;
      color: var(--secondary-text);
      margin-bottom: 4px;
    }
    
    .value {
      font-size: 48px;
      font-weight: 700;
      color: var(--primary-text);
      line-height: 1;
    }
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  
  &.pago {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }
  
  &.antecipado {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }
  
  &.pendente {
    background: rgba(251, 191, 36, 0.1);
    color: #fbbf24;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  .label {
    font-size: 14px;
    color: var(--secondary-text);
    font-weight: 500;
  }
  
  .value {
    font-size: 14px;
    color: var(--primary-text);
    font-weight: 600;
    text-align: right;
    
    &.currency {
      font-variant-numeric: tabular-nums;
    }
    
    &.percentage {
      font-variant-numeric: tabular-nums;
    }
  }
`;

const NotesSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const NoteCard = styled.div`
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border-color);
  
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
    .note-type {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text);
      text-transform: uppercase;
    }
    
    .note-number {
      font-size: 12px;
      color: var(--secondary-text);
    }
  }
  
  .note-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    font-size: 13px;
    
    .detail {
      display: flex;
      justify-content: space-between;
      
      .label {
        color: var(--secondary-text);
      }
      
      .value {
        color: var(--primary-text);
        font-weight: 500;
      }
    }
  }
`;

const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  
  .table-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--border-color);
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0;
    }
    
    .subtitle {
      font-size: 14px;
      color: var(--secondary-text);
      margin-top: 4px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    padding: 8px 12px;
    background: #f8f9fa;
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    
    &:first-child {
      text-align: left;
    }
    
    &:last-child {
      text-align: right;
    }
  }
  
  td {
    padding: 8px 12px;
    font-size: 14px;
    color: var(--primary-text);
    border-bottom: 1px solid var(--border-color);
    
    &:first-child {
      font-weight: 500;
    }
    
    &:last-child {
      text-align: right;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
  }
  
  tbody tr:hover {
    background: var(--background);
  }
`;

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatPercentage = (value) => {
  return `${value.toFixed(4)} %`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const OperationDetails = ({ operation, onBack, showBackButton = true }) => {
  // Mock data baseado na imagem
  const mockOperationDetails = {
    id: operation?.id || 1,
    valorLiquido: operation?.valorLiquido || 44783.06,
    status: operation?.status || 'pago',
    operacao: operation?.operacao || 'Pago',
    ancoraNome: operation?.ancoraNome || 'ELDORADO BRASIL CELULOSE S/A',
    ancoraDocumento: operation?.ancoraDocumento || '07.405.439/0001-31',
    dataOperacao: operation?.dataOperacao || '2024-10-11',
    valorBruto: operation?.valorBruto || 45432.32,
    desconto: operation?.desconto || 649.26,
    iof: operation?.iof || 0.00,
    taxaMedia: operation?.taxaMedia || 1.0718,
    
    // Informações da conta bancária
    banco: '341 - ITAÚ UNIBANCO S.A',
    agencia: '2900',
    conta: '75409-4',
    
    // Informações adicionais
    dataEmissao: '30/09/2024',
    dataVencimento: '18/09/2024',
    dataPagamento: '02/12/2024',
    parcelas: '1/1',
    taxaMes: '1.0328 %',
    descontoTaxa: 'R$ 929,38',
    
    // Notas fiscais da operação
    notasFiscais: [
      {
        id: 1,
        numero: '94804',
        vencimento: '18/09/2024',
        valor: 44783.06,
        taxaMedia: 1.0718,
        valorBruto: 45432.32,
        desconto: 649.26
      }
    ]
  };

  return (
    <Container>
      <Header>
        {showBackButton && (
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            Voltar
          </button>
        )}
        <div className="operation-info">
          <h1>Operação #{mockOperationDetails.id}</h1>
          <p>Detalhes completos da operação de antecipação</p>
        </div>
      </Header>

      {/* Histórico - Financiador e Valor */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--secondary-text)', fontSize: 14 }}>Financiador:</span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{mockOperationDetails.banco}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--secondary-text)', fontSize: 14 }}>Valor:</span>
          <span style={{ fontWeight: 700, fontSize: 18 }}>
            {formatCurrency(mockOperationDetails.valorLiquido)}
          </span>
        </div>
      </div>

      {/* Status e Valor Principal */}
      <StatusDisplaySection>
        <ValueDisplay>
          <div className="icon">
            <CurrencyCircleDollar size={32} weight="bold" />
          </div>
          <div className="value-container">
            <div className="label">Valor líquido recebido</div>
            <div className="value">{formatCurrency(mockOperationDetails.valorLiquido)}</div>
          </div>
        </ValueDisplay>
        
        <StatusBadge className={mockOperationDetails.status}>
          <CheckCircle size={16} weight="bold" />
          {mockOperationDetails.operacao}
        </StatusBadge>
      </StatusDisplaySection>

      {/* Informações Gerais e Valores */}
      <DetailsGrid>
        {/* Informações Gerais */}
        <InfoCard>
          <h3>
            <Building size={20} />
            Informações
          </h3>
          <InfoGrid>
            <InfoItem>
              <span className="label">Status</span>
              <span className="value">{mockOperationDetails.operacao}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Âncora</span>
              <span className="value">{mockOperationDetails.ancoraNome}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">CNPJ</span>
              <span className="value">{mockOperationDetails.ancoraDocumento}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Data de Operação</span>
              <span className="value">{formatDate(mockOperationDetails.dataOperacao)}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Data de Emissão</span>
              <span className="value">{mockOperationDetails.dataEmissao}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Data de Vencimento</span>
              <span className="value">{mockOperationDetails.dataVencimento}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Data de Pagamento</span>
              <span className="value">{mockOperationDetails.dataPagamento}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Parcelas</span>
              <span className="value">{mockOperationDetails.parcelas}</span>
            </InfoItem>
          </InfoGrid>
        </InfoCard>

        {/* Valores */}
        <InfoCard>
          <h3>
            <CurrencyCircleDollar size={20} />
            Valores
          </h3>
          <InfoGrid>
            <InfoItem>
              <span className="label">Taxa Média Oferecida</span>
              <span className="value percentage">{formatPercentage(mockOperationDetails.taxaMedia)}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Taxa Mês Aplicada</span>
              <span className="value percentage">{mockOperationDetails.taxaMes}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Desconto da Taxa</span>
              <span className="value">{mockOperationDetails.descontoTaxa}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Valor Bruto</span>
              <span className="value currency">{formatCurrency(mockOperationDetails.valorBruto)}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Desconto</span>
              <span className="value currency">{formatCurrency(mockOperationDetails.desconto)}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">IOF</span>
              <span className="value currency">{formatCurrency(mockOperationDetails.iof)}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Valor Líquido</span>
              <span className="value currency">{formatCurrency(mockOperationDetails.valorLiquido)}</span>
            </InfoItem>
          </InfoGrid>
        </InfoCard>
      </DetailsGrid>
      {/* Grid de Informações */}
      <DetailsGrid>
        {/* Conta Bancária */}
        <InfoCard>
          <h3>
            <Bank size={20} />
            Conta Bancária
          </h3>
          <InfoGrid>
            <InfoItem>
              <span className="label">Banco</span>
              <span className="value">{mockOperationDetails.banco}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Agência</span>
              <span className="value">{mockOperationDetails.agencia}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Conta</span>
              <span className="value">{mockOperationDetails.conta}</span>
            </InfoItem>
          </InfoGrid>
        </InfoCard>

        {/* Notas Fiscais */}
        <NotesSection style={{ marginBottom: 0 }}>
          <h3>
            <Receipt size={20} />
            Notas Fiscais
          </h3>
          <div className="subtitle">Visualize todas as notas fiscais que contemplam esta operação</div>
          <TableSection style={{ marginTop: '20px' }}>
            <div className="table-header">
              <h3>Status</h3>
              <div className="subtitle">{mockOperationDetails.notasFiscais.length} registros</div>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Nº da NF</th>
                  <th>Vencimento</th>
                  <th>Taxa Média</th>
                  <th>Valor Bruto (R$)</th>
                  <th>Desconto (R$)</th>
                  <th>Valor Líquido (R$)</th>
                </tr>
              </thead>
              <tbody>
                {mockOperationDetails.notasFiscais.map(nota => (
                  <tr key={nota.id}>
                    <td>{nota.numero}</td>
                    <td>{nota.vencimento}</td>
                    <td>{formatPercentage(nota.taxaMedia)}</td>
                    <td>{formatCurrency(nota.valorBruto)}</td>
                    <td>{formatCurrency(nota.desconto)}</td>
                    <td>{formatCurrency(nota.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableSection>
        </NotesSection>
      </DetailsGrid>
    </Container>
  );
};

export default OperationDetails;
