import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  MagnifyingGlass, 
  FunnelSimple, 
  Download, 
  CaretDown,
  Eye,
  Bank,
  Calendar, 
  CurrencyCircleDollar,
  CheckCircle,
  XCircle,
  Copy
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
        
        &.pago {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        &.pendente {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }
        
        &.vencido {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      }
    }
    
    &.highlight {
      font-weight: 600;
      
      .yes {
        color: #22c55e;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .no {
        color: #ef4444;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
    
    &.actions {
      text-align: center;
      width: 60px;
      
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

// Mock data
const mockContas = [
  {
    id: 1,
    fornecedor: 'Distribuidora Medicamentos Brasil',
    invoice_number: 'NF-78945',
    valor: 15750.25,
    dataVencimento: '2024-07-15',
    status: 'pendente'
  },
  {
    id: 2,
    fornecedor: 'Distribuidora Farmacêutica Nacional',
    invoice_number: 'NF-65432',
    valor: 8320.50,
    dataVencimento: '2024-07-20',
    status: 'pendente'
  },
  {
    id: 3,
    fornecedor: 'Distribuidora Saúde Total',
    invoice_number: 'NF-32198',
    valor: 22450.75,
    dataVencimento: '2024-06-30',
    status: 'vencido'
  },
  {
    id: 4,
    fornecedor: 'Distribuidora Médica Express',
    invoice_number: 'NF-45678',
    valor: 5680.30,
    dataVencimento: '2024-06-25',
    status: 'pago'
  },
  {
    id: 5,
    fornecedor: 'Distribuidora Pharma Plus',
    invoice_number: 'NF-98765',
    valor: 12340.60,
    dataVencimento: '2024-07-05',
    status: 'pendente'
  },
  {
    id: 6,
    fornecedor: 'Distribuidora Medicamentos Vida',
    invoice_number: 'NF-54321',
    valor: 9870.45,
    dataVencimento: '2024-06-20',
    status: 'pago'
  },
  {
    id: 7,
    fornecedor: 'Distribuidora Farmacêutica Central',
    invoice_number: 'NF-12345',
    valor: 18650.90,
    dataVencimento: '2024-07-10',
    status: 'pendente'
  }
];

const ContasAPagar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredContas, setFilteredContas] = useState(mockContas);
  const [selectedConta, setSelectedConta] = useState(null);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);

  // Filter contas based on search term and filters
  useEffect(() => {
    let filtered = mockContas;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(conta =>
        conta.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(conta => conta.status === statusFilter);
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(conta => {
        const vencimento = new Date(conta.dataVencimento);
        return vencimento.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
      });
    }

    setFilteredContas(filtered);
  }, [searchTerm, statusFilter, dateFilter]);

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
    setStatusFilter('todos');
    setDateFilter('');
  };

  const handleViewDetails = (conta) => {
    setSelectedConta(conta);
    setShowPaymentDetailsModal(true);
  };

  return (
    <Container>
      <PageHeader>
        <h1>Meu Contas a Pagar</h1>
        <p>Acompanhe suas contas a pagar e visualize os dados para pagamento</p>
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
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos os status</option>
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                  <option value="vencido">Vencido</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Data de Vencimento</label>
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label>Ordenar por</label>
                <select>
                  <option value="vencimento">Data de Vencimento</option>
                  <option value="valor">Valor</option>
                  <option value="fornecedor">Fornecedor</option>
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
            placeholder="Buscar por fornecedor"
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

      {/* Tabela */}
      <TableSection>
        <div className="table-header">
          <h3>Contas a Pagar</h3>
          <div className="table-info">
            {filteredContas.length} contas
          </div>
        </div>

        <div className="table-responsive">
          {filteredContas.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>Nº da NF</th>
                  <th>Valor</th>
                  <th>Data de Vencimento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredContas.map(conta => (
                  <tr key={conta.id}>
                    <td>{conta.fornecedor}</td>
                    <td>{conta.invoice_number || `NF-${Math.floor(Math.random() * 90000) + 10000}`}</td>
                    <td>{formatCurrency(conta.valor)}</td>
                    <td>{formatDate(conta.dataVencimento)}</td>
                    <td className="status">
                      <span className={`status-badge ${conta.status}`}>
                        {conta.status === 'pendente' ? 'Pendente' : 
                         conta.status === 'pago' ? 'Pago' : 'Vencido'}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        title="Ver detalhes"
                        onClick={() => handleViewDetails(conta)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState>
              <div className="icon">
                <Bank size={48} />
              </div>
              <h4>Nenhuma conta encontrada</h4>
              <p>Não foram encontradas contas com os filtros selecionados.</p>
            </EmptyState>
          )}
        </div>
      </TableSection>
      
      {/* Modal de Detalhes de Pagamento */}
      {showPaymentDetailsModal && selectedConta && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                Dados para Pagamento
              </h3>
              <button 
                onClick={() => setShowPaymentDetailsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: 'var(--secondary-text)'
                }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Fornecedor</div>
                  <div>{selectedConta.fornecedor}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Nº da NF</div>
                  <div>{selectedConta.invoice_number || `NF-${Math.floor(Math.random() * 90000) + 10000}`}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>CNPJ</div>
                  <div>{`${Math.floor(Math.random() * 90) + 10}.${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 900) + 100}/0001-${Math.floor(Math.random() * 90) + 10}`}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Valor</div>
                  <div style={{ fontWeight: 600 }}>{formatCurrency(selectedConta.valor)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Data de Vencimento</div>
                  <div>{formatDate(selectedConta.dataVencimento)}</div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Bank size={20} />
                Dados Bancários
              </h4>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Banco</div>
                <div>341 - ITAÚ UNIBANCO S.A</div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontWeight: 500, color: '#222', marginBottom: '8px' }}>Código de Barras:</div>
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: 'white', 
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  position: 'relative'
                }}>
                  23793.38128 60007.702636 95000.063305 9 93430026000
                  <button 
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-blue)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('23793.38128 60007.702636 95000.063305 9 93430026000');
                      alert('Código de barras copiado!');
                    }}
                  >
                    <Copy size={16} />
                    Copiar
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Agência</div>
                  <div>4567</div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: '#222', marginBottom: '4px' }}>Conta</div>
                  <div>12345-6</div>
                </div>
              </div>

              <div style={{ marginBottom: '16px', marginTop: '16px' }}>
                <div style={{ fontWeight: 500, color: '#222', marginBottom: '8px' }}>Chave PIX:</div>
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: 'white', 
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  position: 'relative'
                }}>
                  {selectedConta.fornecedor.toLowerCase().replace(/\s+/g, '')}@distribuidora.com.br
                  <button 
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-blue)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(`${selectedConta.fornecedor.toLowerCase().replace(/\s+/g, '')}@distribuidora.com.br`);
                      alert('Chave PIX copiada!');
                    }}
                  >
                    <Copy size={16} />
                    Copiar
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowPaymentDetailsModal(false)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ContasAPagar;