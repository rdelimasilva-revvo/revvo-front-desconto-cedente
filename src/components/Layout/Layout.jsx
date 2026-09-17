import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import Sidebar, { LARGURA_SIDEBAR, LARGURA_SIDEBAR_RECOLHIDA } from './Sidebar';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  margin-left: ${(props) => (props.$sidebarRecolhida ? LARGURA_SIDEBAR_RECOLHIDA : LARGURA_SIDEBAR)}px;
  transition: margin-left var(--duration-base) var(--ease-out);
  padding: 24px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 48px);

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 24px 16px;
    width: 100%;
    
    .filter-toggle {
      display: flex !important;
    }

    .filter-content {
      width: 100%;

      input {
        width: 100%;
      }

      > div > div {
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }
`;

const Layout = ({ 
  children, 
  currentPage,
  setCurrentPage,
  isSidebarOpen,
  setIsSidebarOpen,
  isConfigOpen,
  setIsConfigOpen,
  setShowWorkflowRules,
  setShowSalesOrder
}) => {
  const [isFolded, setIsFolded] = React.useState(false);

  React.useEffect(() => {
    const handleNavigateToProfile = () => {
      setCurrentPage('profile');
    };

    window.addEventListener('navigateToProfile', handleNavigateToProfile);
    return () => {
      window.removeEventListener('navigateToProfile', handleNavigateToProfile);
    };
  }, [setCurrentPage]);
  
  return (
    <Container>
      <TopBar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />
      <Content>
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isConfigOpen={isConfigOpen}
          setIsConfigOpen={setIsConfigOpen}
          setShowWorkflowRules={setShowWorkflowRules}
          setShowSalesOrder={setShowSalesOrder}
          isFolded={isFolded}
          setIsFolded={setIsFolded}
        />
        <Main $sidebarRecolhida={isFolded}>
          {children}
        </Main>
      </Content>
    </Container>
  );
};

export default Layout;