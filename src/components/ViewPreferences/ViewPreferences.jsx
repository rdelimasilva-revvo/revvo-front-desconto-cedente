import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Eye, EyeSlash, Info } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

const Container = styled.div`
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    color: var(--secondary-text);
    margin: 0;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  margin-bottom: 24px;

  svg {
    flex-shrink: 0;
    color: #3b82f6;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #1e40af;
    line-height: 1.5;
  }
`;

const ToggleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--background);
    border-color: #d1d5db;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ToggleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$enabled ? '#dff3ff' : '#f3f4f6'};
    color: ${props => props.$enabled ? '#0070F2' : '#6b7280'};
    transition: all 0.2s ease;
  }

  .content {
    h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
    }

    p {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text);
    }
  }
`;

const Toggle = styled.button`
  position: relative;
  width: 52px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background: ${props => props.$enabled ? '#0070F2' : '#d1d5db'};
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$enabled ? '26px' : '2px'};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &.primary {
    background: #0070F2;
    color: white;

    &:hover {
      background: #0061d5;
    }

    &:disabled {
      background: #d1d5db;
      cursor: not-allowed;
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
`;

const ViewPreferences = () => {
  const [preferences, setPreferences] = useState({
    showSupplierView: true,
    showAnchorView: true,
    showFinancierView: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Carregar preferências do localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('viewPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Erro ao carregar preferências:', error);
      }
    }
  }, []);

  const handleToggle = (key) => {
    // Verificar se pelo menos uma visão permanecerá ativa
    const newPreferences = { ...preferences, [key]: !preferences[key] };
    const activeViews = Object.values(newPreferences).filter(Boolean).length;

    if (activeViews === 0) {
      toast.error('Você deve manter pelo menos uma visão ativa', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    setPreferences(newPreferences);
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem('viewPreferences', JSON.stringify(preferences));
    setHasChanges(false);

    toast.success('Preferências salvas com sucesso!', {
      duration: 3000,
      position: 'top-right',
    });

    // Disparar evento customizado para o Sidebar reagir
    window.dispatchEvent(new CustomEvent('viewPreferencesChanged', { detail: preferences }));
  };

  const handleReset = () => {
    const defaultPreferences = {
      showSupplierView: true,
      showAnchorView: true,
      showFinancierView: true,
    };
    setPreferences(defaultPreferences);
    setHasChanges(true);
  };

  const views = [
    {
      key: 'showSupplierView',
      title: 'Visão do Fornecedor',
      description: 'Dashboard, negociações e movimentação do fornecedor',
      icon: Eye,
    },
    {
      key: 'showAnchorView',
      title: 'Visão do Âncora',
      description: 'Dashboard, negociações e contas a pagar do âncora',
      icon: Eye,
    },
    {
      key: 'showFinancierView',
      title: 'Visão do Financiador',
      description: 'Carteira, solicitações, formalização e cobrança',
      icon: Eye,
    },
  ];

  return (
    <Container>
      <Header>
        <h1>Preferências de Visualização</h1>
        <p>Controle quais visões serão exibidas no menu lateral</p>
      </Header>

      <InfoBox>
        <Info size={20} weight="fill" />
        <p>
          Você pode ocultar as visões que não utiliza para manter o menu mais organizado.
          É necessário manter pelo menos uma visão ativa.
        </p>
      </InfoBox>

      <Card>
        {views.map((view) => {
          const Icon = view.icon;
          const isEnabled = preferences[view.key];

          return (
            <ToggleItem key={view.key}>
              <ToggleInfo $enabled={isEnabled}>
                <div className="icon">
                  {isEnabled ? <Eye size={24} weight="regular" /> : <EyeSlash size={24} weight="regular" />}
                </div>
                <div className="content">
                  <h3>{view.title}</h3>
                  <p>{view.description}</p>
                </div>
              </ToggleInfo>
              <Toggle
                $enabled={isEnabled}
                onClick={() => handleToggle(view.key)}
                aria-label={`${isEnabled ? 'Ocultar' : 'Exibir'} ${view.title}`}
              />
            </ToggleItem>
          );
        })}
      </Card>

      <ButtonGroup>
        <Button className="secondary" onClick={handleReset}>
          Restaurar Padrão
        </Button>
        <Button
          className="primary"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Salvar Alterações
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ViewPreferences;
