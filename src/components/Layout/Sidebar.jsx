import React from 'react';
import styled from 'styled-components';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import { SideNav } from '../../ds';
import logoRevvo from '../../ds/assets/logo-revvo-cor.svg';
import logoSimbolo from '../../ds/assets/logo-symbol.svg';
import { contarNaoLidas } from '../../services/notificacoesService';

// Navegação do portal do cedente: importar → conferir → selecionar → simular → contratar → acompanhar
const MENU_CEDENTE = [
  { id: 'home', label: 'Home', icon: 'house' },
  { id: 'recebiveis', label: 'Recebíveis', icon: 'receipt' },
  { id: 'operacoes', label: 'Operações', icon: 'clipboard-list' },
  { id: 'cadastro', label: 'Cadastro', icon: 'building-2' },
  { id: 'notificacoes', label: 'Notificações', icon: 'bell' }
];

const CONFIGURACOES = {
  id: 'configuracoes',
  label: 'Configurações',
  icon: 'settings',
  children: [
    { id: 'workflow', label: 'Workflow' },
    { id: 'credit-limit-policies', label: 'Políticas de limites' },
    { id: 'certificado-digital', label: 'Certificado Digital' }
  ]
};

export const LARGURA_SIDEBAR = 300;
export const LARGURA_SIDEBAR_RECOLHIDA = 64;

const Container = styled.div`
  position: fixed;
  top: 48px;
  left: 0;
  bottom: 0;
  width: ${(props) => (props.$recolhida ? LARGURA_SIDEBAR_RECOLHIDA : LARGURA_SIDEBAR)}px;
  display: flex;
  flex-direction: column;
  background: var(--surface-card);
  border-right: 1px solid var(--border-subtle);
  z-index: 998;
  transition: width var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);

  nav {
    border-right: none;
    flex: 1;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    width: ${LARGURA_SIDEBAR}px;
    box-shadow: var(--shadow-lg);
    transform: translateX(${(props) => (props.$aberta ? '0' : '-100%')});
  }
`;

const Marca = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  /* Mesmo espacamento do portal do financiador: 16px acima do logo, nada
     abaixo do titulo e sem separador — lá o bloco tem padding 0 e o respiro
     vem do container, que aqui não existe. */
  padding: ${(props) => (props.$recolhida ? '16px 8px' : '16px 16px 0')};

  /* 40px expandido: mesmo tamanho do logo no portal do financiador. */
  img {
    height: ${(props) => (props.$recolhida ? '26px' : '40px')};
    width: auto;
  }

  /* Mesma tipografia do titulo no portal do financiador. */
  .produto {
    font-size: var(--fs-body-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-strong);
    letter-spacing: -0.28px;
    line-height: 1.3;
  }
`;

const Scrim = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$aberta ? 'block' : 'none')};
    position: fixed;
    inset: 48px 0 0 0;
    background: var(--scrim);
    z-index: 997;
  }
`;

const BotaoRecolher = styled.button`
  position: absolute;
  top: 14px;
  right: -12px;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  background: var(--surface-card);
  color: var(--text-muted);
  box-shadow: var(--shadow-xs);
  z-index: 1;

  &:hover {
    color: var(--revvo-blue-500);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({
  currentPage,
  setCurrentPage,
  isSidebarOpen,
  setIsSidebarOpen,
  isConfigOpen,
  setIsConfigOpen,
  setShowWorkflowRules,
  isFolded,
  setIsFolded
}) => {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth <= 768);

  // Notificações não lidas exibidas como badge no item do menu
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = React.useState(contarNaoLidas());

  React.useEffect(() => {
    setNotificacoesNaoLidas(contarNaoLidas());
  }, [currentPage]);

  React.useEffect(() => {
    const aoRedimensionar = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', aoRedimensionar);
    return () => window.removeEventListener('resize', aoRedimensionar);
  }, []);

  const selecionar = (id) => {
    // O item pai "Configurações" só abre/fecha o submenu.
    if (id === 'configuracoes') {
      setIsConfigOpen(!isConfigOpen);
      return;
    }
    if (id === 'workflow') setShowWorkflowRules(true);

    setCurrentPage(id);
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
  };

  const itens = MENU_CEDENTE.map((item) =>
    item.id === 'notificacoes' && notificacoesNaoLidas > 0 ? { ...item, badge: notificacoesNaoLidas } : item
  );

  const recolhida = isFolded && !isMobile;

  return (
    <>
      <Scrim $aberta={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />

      <Container $recolhida={recolhida} $aberta={isSidebarOpen}>
        <BotaoRecolher
          type="button"
          onClick={() => setIsFolded(!isFolded)}
          aria-label={isFolded ? 'Expandir menu' : 'Recolher menu'}
        >
          {isFolded ? <CaretRight size={12} weight="bold" /> : <CaretLeft size={12} weight="bold" />}
        </BotaoRecolher>

        <Marca $recolhida={recolhida}>
          <img src={recolhida ? logoSimbolo : logoRevvo} alt="Revvo" />
          {!recolhida && <span className="produto">Revvo Trade - Portal do Cedente</span>}
        </Marca>

        <SideNav
          grupo={{ label: 'Visão do Cedente', icon: 'landmark' }}
          items={itens}
          footerItems={[CONFIGURACOES]}
          activeId={currentPage}
          onSelect={selecionar}
          collapsed={recolhida}
          style={{ width: '100%' }}
        />
      </Container>
    </>
  );
};

export default Sidebar;
