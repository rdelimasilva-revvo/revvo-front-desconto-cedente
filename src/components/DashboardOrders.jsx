import React, { useState } from 'react';
import DetailView from './DetailView';

const DashboardOrders = () => {
  const [loadingWorkflow, setLoadingWorkflow] = useState(false);
  const [workflowData, setWorkflowData] = useState(null);
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  return (
    <div>
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

      <DetailView>
        {/* Conteúdo do DetailView aqui */}
      </DetailView>
    </div>
  );
};

export default DashboardOrders; 