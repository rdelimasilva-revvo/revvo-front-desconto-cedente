import React, { useState } from 'react';

const CreditLimitAnalysis = ({ onClose }) => {
  const [calculatedLimit, setCalculatedLimit] = useState('');
  const [prepaidLimit, setPrepaidLimit] = useState('');
  const [comments, setComments] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Análise Solicitação de Limite</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">CUSTOMER TESTE JOÃO</h3>
                <p className="text-gray-600">EMPRESA JOÃO</p>
                <p className="text-gray-600">6200062922</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-500">CNPJ</p>
                <p>12.345.678/0001-90</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">ENDEREÇO</p>
                <p>Av. Paulista, 1000 - Bela Vista</p>
                <p>São Paulo - SP, 01310-100</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Maria Silva</p>
                  <p className="text-gray-600">(11) 98765-4321</p>
                  <p className="text-blue-600">maria.silva@bellavita.com.br</p>
                </div>
                <div>
                  <p className="font-medium">João Santos</p>
                  <p className="text-gray-600">(11) 98765-4322</p>
                  <p className="text-blue-600">joao.santos@bellavita.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders */}
            <div className="bg-white rounded-lg border p-4">
              <p className="text-gray-600 mb-2">Ordens de venda a crédito</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-semibold">73%</span>
                <span className="ml-2 text-green-500">+5%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Taxa de conversão Ordem de venda</p>
              
              <div className="h-40 mt-2">
                {/* Chart would go here - simplified representation */}
                <div className="flex items-end h-32 mt-4 space-x-2">
                  <div className="bg-blue-200 h-24 w-8"></div>
                  <div className="bg-blue-200 h-16 w-8"></div>
                  <div className="bg-blue-200 h-28 w-8"></div>
                  <div className="bg-blue-200 h-14 w-8"></div>
                  <div className="bg-blue-200 h-12 w-8"></div>
                  <div className="bg-blue-200 h-20 w-8"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>Mai</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Ago</span>
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-lg border p-4">
              <p className="text-gray-600 mb-2">Faturamento</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-semibold">187,65mi</span>
                <span className="ml-2 text-red-500">-5%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Faturamento</p>
              
              <div className="h-40 mt-2">
                {/* Chart with empty values */}
                <div className="flex flex-col justify-between h-32 mt-4">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-12">R$ 0k</span>
                    <div className="flex-1 border-t border-gray-200 border-dashed"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-12">R$ 0k</span>
                    <div className="flex-1 border-t border-gray-200 border-dashed"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-12">R$ 0k</span>
                    <div className="flex-1 border-t border-gray-200 border-dashed"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-12">R$ 0k</span>
                    <div className="flex-1 border-t border-gray-200 border-dashed"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 w-12">R$ 0k</span>
                    <div className="flex-1 border-t border-gray-200 border-dashed"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Risk Summary */}
            <div className="bg-white rounded-lg border p-4">
              <p className="text-gray-600 mb-2">Resumo Risco Cliente</p>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-3xl font-semibold">R$ 500.000,00</p>
                  <p className="text-sm text-gray-500">Concedido</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">65%</p>
                  <p className="text-sm text-gray-500">Utilizado</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">R$ 175.000,00</p>
                  <p className="text-sm text-gray-500">Disponível</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">45 dias</p>
                  <p className="text-sm text-gray-500">Prazo médio de pagamento</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <p className="font-medium">Em atraso</p>
                    <span className="text-red-500 text-sm ml-1">(15 dias)</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Máx. dias em atraso (12 meses)</p>
                  <p className="font-medium">32 dias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Visão Geral de Risco</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Credit Limit Request */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="font-medium">CUSTOMER TESTE JOÃO</div>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Novo</span>
                </div>
                <p className="text-sm text-gray-500">05/06/2025</p>
                <p className="text-right text-sm text-gray-500">Solicitação #58</p>

                <div className="my-4">
                  <p className="text-sm text-gray-500">Limite solicitado</p>
                  <p className="text-xl font-semibold">R$ 45.000,00</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Solicitado por:</p>
                  <p>nomedoconsultor@silimed.com.br</p>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-500">Limite calculado</p>
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">R$ 250.000,00</p>
                    <p className="text-sm text-gray-500">05/06/2025</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Limite atual</p>
                      <p className="font-medium">R$ 70.000,00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">% utilizado</p>
                      <p className="font-medium">45%</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-medium mb-2">Workflow de Aprovação</p>
                  
                  <div className="mb-2 bg-white rounded border p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Analista financeiro</p>
                      <p className="text-sm text-gray-500">Aprovado</p>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded border p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">GERENTE</p>
                      <p className="text-sm text-gray-500">Aprovado</p>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Summary */}
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-medium mb-4">Síntese Cadastral</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Documento</p>
                      <p>12345678000199</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p>EMPRESA DE EXEMPLO LTDA</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data Fundação</p>
                      <p>01/01/2000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Situação RFB</p>
                      <p>REGULAR</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Pendências Financeiras</h4>
                    <span className="bg-blue-500 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">2</span>
                  </div>
                  
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-sm text-gray-500">10/03/2024</p>
                    <p className="font-medium">R$ 15.000,00</p>
                    <p className="text-xs text-gray-500">PENDÊNCIA FINANCEIRA</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Protestos</h4>
                    <span className="bg-blue-500 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">1</span>
                  </div>
                  
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-gray-500">15/02/2024</p>
                    <p className="font-medium">R$ 5.000,00</p>
                    <p className="text-xs text-gray-500">São Paulo - SP</p>
                  </div>
                </div>
              </div>

              {/* Serasa Score and Other Info */}
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-medium mb-2">Score Serasa</h4>
                  
                  <div className="flex flex-col items-center justify-center py-4">
                    <span className="text-6xl font-bold text-blue-600">750</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full mt-2">BAIXO RISCO</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Ações Judiciais</h4>
                    <span className="bg-gray-300 text-gray-700 text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">0</span>
                  </div>
                  
                  <div className="bg-white rounded p-3 text-center text-gray-500">
                    NÃO CONSTAM OCORRÊNCIAS
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Participações em Falências</h4>
                    <span className="bg-gray-300 text-gray-700 text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">0</span>
                  </div>
                  
                  <div className="bg-white rounded p-3 text-center text-gray-500">
                    NÃO CONSTAM OCORRÊNCIAS
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Sócios e Administradores</h4>
                  
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="font-medium">JOÃO DA SILVA</p>
                    <p className="text-sm text-gray-600">CPF: 123.456.789-00 • Participação: 50%</p>
                  </div>
                  
                  <div className="bg-white rounded p-3">
                    <p className="font-medium">MARIA OLIVEIRA</p>
                    <p className="text-sm text-gray-600">CPF: 987.654.321-00 • Participação: 50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Workflow History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Histórico de Workflow do cliente</h3>
              
              <div className="space-y-4">
                <div className="relative pl-8">
                  <div className="absolute top-0 left-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div>
                    <p className="font-medium">Solicitação de Limite de Crédito</p>
                    <p className="text-sm text-gray-500">05/06/2025, 15:42:21</p>
                    
                    <div className="bg-gray-50 rounded p-4 mt-2">
                      <div className="flex justify-between">
                        <p>Status:</p>
                        <p className="text-green-500">Aprovado</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Valor Solicitado:</p>
                        <p>R$ 45.000,00</p>
                      </div>
                      <button className="text-green-500 mt-2">Ver detalhes (2 etapas)</button>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute top-0 left-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div>
                    <p className="font-medium">Solicitação de Limite de Crédito</p>
                    <p className="text-sm text-gray-500">05/06/2025, 13:31:39</p>
                    
                    <div className="bg-gray-50 rounded p-4 mt-2">
                      <div className="flex justify-between">
                        <p>Status:</p>
                        <p className="text-green-500">Aprovado</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Valor Solicitado:</p>
                        <p>R$ 90.700,00</p>
                      </div>
                      <button className="text-green-500 mt-2">Ver detalhes (3 etapas)</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Análise Financeira</h3>
              
              <div className="bg-white rounded-lg border p-4">
                <div className="mb-4">
                  <button className="flex items-center ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Carregar limite calculado
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Limite de Crédito a Conceder</label>
                    <input 
                      type="text" 
                      className="border rounded w-full p-2" 
                      value={calculatedLimit}
                      onChange={(e) => setCalculatedLimit(e.target.value)}
                      placeholder="R$ 0,00" 
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Limite Pré-Pago</label>
                    <input 
                      type="text" 
                      className="border rounded w-full p-2" 
                      value={prepaidLimit}
                      onChange={(e) => setPrepaidLimit(e.target.value)}
                      placeholder="R$ 0,00" 
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Comentários e Análise</label>
                    <textarea 
                      className="border rounded w-full p-2 h-36" 
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Digite aqui os comentários e análise financeira para esta solicitação..." 
                    ></textarea>
                  </div>
                  
                  <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Anexar arquivo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditLimitAnalysis;