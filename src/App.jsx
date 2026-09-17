import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { initializeCompanyId, setVarPasswordOk, getVarPasswordOk } from './lib/globalState';

// Auth Components
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ChangePassword from './components/auth/ChangePassword';

// App Components
import Layout from './components/Layout/Layout';
import RiscoSacado from './components/RiscoSacado/RiscoSacado';
import Antecipacoes from './components/Antecipacoes/Antecipacoes';
import GestaoDuplicatas from './components/GestaoDuplicatas/GestaoDuplicatas';
import SolicitacoesAntecipacoes from './components/Antecipacoes/SolicitacoesAntecipacoes';
import Negociacoes from './components/Negociacoes/Negociacoes';

// Análise Financiador
import AnaliseFinanciador from './components/AnaliseFinanciador';
import CadastroClientes from './components/CadastroClientes';
import Duplicatas from './components/Duplicatas/Duplicatas';
import DuplicatasRecebidas from './components/DuplicatasRecebidas/DuplicatasRecebidas';
import Movimentacao from './components/Movimentacao/Movimentacao';
import Liquidacoes from './components/Liquidacoes/Liquidacoes';

// Certificado Digital
import CertificadoDigital from './components/CertificadoDigital';

// Configuration Components
import UserProfiles from './components/UserProfiles/UserProfiles';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import WorkflowRules from './components/WorkflowRules';
import CreditLimitPolicies from './components/CreditLimitPolicies';
import FundingRules from './components/FundingRules';
import TermsOfAssignment from './components/TermsOfAssignment';
import DebtManagement from './components/DebtManagement';
import ContasAPagar from './components/ContasAPagar';
import ViewPreferences from './components/ViewPreferences/ViewPreferences';

// New components
import CreditAnalysis from './pages/CreditAnalysis';
import Precificacao from './components/Precificacao';
import OperacoesRealizadas from './components/OperacoesRealizadas';
import DashboardAncora from './components/DashboardAncora/DashboardAncora';
import Convenios from './components/Convenios/Convenios';

// Portal do cedente
import Home from './components/Cedente/Home/Home';
import Recebiveis from './components/Cedente/Recebiveis/Recebiveis';
import Operacoes from './components/Cedente/Operacoes/Operacoes';
import Cadastro from './components/Cedente/Cadastro/Cadastro';
import Notificacoes from './components/Cedente/Notificacoes/Notificacoes';

// Estilos
import './App.css';
import AntecipacoesFinanciador from './components/Antecipacoes/AntecipacoesFinanciador';
import DashboardFinanciador from './components/Antecipacoes/DashboardFinanciador';
import NegociacoesAncora from './components/Antecipacoes/NegociacoesAncora';

// ErrorBoundary para capturar erros de renderização
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatório de erros
    console.error("Erro capturado pela ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          border: '1px solid #f56565', 
          borderRadius: '5px',
          backgroundColor: '#feb2b2',
          color: '#c53030'
        }}>
          <h2>Algo deu errado.</h2>
          <details style={{ whiteSpace: 'pre-wrap', margin: '10px 0' }}>
            <summary>Detalhes do erro</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#c53030',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Recarregar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // User Auth State
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState('home');
  // Parâmetros da navegação (ex.: abrir uma operação específica vindo da Home).
  const [pageParams, setPageParams] = useState(null);

  const navegar = (page, params = null) => {
    setPageParams(params);
    setCurrentPage(page);
  };

  // Navegação pelo menu sempre abre a página "limpa" — sem reabrir o último detalhe.
  const navegarPeloMenu = (page) => navegar(typeof page === 'function' ? page(currentPage) : page, null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showWorkflowRules, setShowWorkflowRules] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const location = useLocation();

  // Responsive behavior for sidebar
  useEffect(() => {
    const handleResize = () => {
      // Se a tela é maior que 768px, o sidebar deve estar aberto
      // Se a tela é menor ou igual a 768px, o sidebar deve estar fechado
      const shouldBeOpen = window.innerWidth > 768;
      setIsSidebarOpen(shouldBeOpen);
    };

    // Adiciona o event listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Remove o event listener ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check for active session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (data && data.session) {
          setSession(data.session);
          await initializeCompanyId(supabase);
          if (data.session.user?.user_metadata?.must_change_password) {
            setVarPasswordOk(false);
          } else {
            setVarPasswordOk(true);
          }
        } else {
          setVarPasswordOk(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setVarPasswordOk(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        initializeCompanyId(supabase);
        if (session.user?.user_metadata?.must_change_password) {
          setVarPasswordOk(false);
        } else {
          setVarPasswordOk(true);
        }
      } else {
        setVarPasswordOk(false);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [location.pathname]);

  // Controle do modal de troca de senha
  useEffect(() => {
    if (!!session && !getVarPasswordOk() && !showPasswordModal) {
      setShowPasswordModal(true);
    }
    if (getVarPasswordOk() && showPasswordModal) {
      setShowPasswordModal(false);
    }
  }, [session, showPasswordModal]);

  // Auth Wrapper for protected routes
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
    }
    
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };

  // Renderização
  return (
    <ErrorBoundary>
      <Toaster />
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!session ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/forgot-password" element={!session ? <ForgotPassword /> : <Navigate to="/" replace />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout
              currentPage={currentPage}
              setCurrentPage={navegarPeloMenu}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              isConfigOpen={isConfigOpen}
              setIsConfigOpen={setIsConfigOpen}
              setShowWorkflowRules={setShowWorkflowRules}
            >
              {currentPage === 'home' ? (
                <Home onNavegar={navegar} />
              ) : currentPage === 'recebiveis' ? (
                <Recebiveis onNavegar={navegar} />
              ) : currentPage === 'operacoes' ? (
                <Operacoes operacaoIdInicial={pageParams?.operacaoId} onNavegar={navegar} />
              ) : currentPage === 'cadastro' ? (
                <Cadastro />
              ) : currentPage === 'notificacoes' ? (
                <Notificacoes onNavegar={navegar} />
              ) : currentPage === 'risco-sacado' ? (
                <RiscoSacado />
              ) : currentPage === 'antecipacoes' ? (
                <Antecipacoes />
              ) : currentPage === 'negociacoes' ? (
                <Negociacoes />
              ) : currentPage === 'dashboard-ancora' ? (
                <DashboardAncora />
              ) : currentPage === 'solicitacoes-antecipacoes-sacado' ? (
                <SolicitacoesAntecipacoes />
              ) : currentPage === 'minhas-antecipacoes-sacado' ? (
                <NegociacoesAncora />
              ) : currentPage === 'solicitacoes-antecipacoes-financiador' ? (
                <SolicitacoesAntecipacoes />
              ) : currentPage === 'minhas-antecipacoes-financiador' ? (
                <AntecipacoesFinanciador />
              ) : currentPage === 'dashboard-financiador' ? (
                <DashboardFinanciador />
              ) : currentPage === 'precificacao' ? (
                <Precificacao />
              ) : currentPage === 'analise-fornecedor' ? (
                <AnaliseFinanciador />
              ) : currentPage === 'cadastro-clientes' ? (
                <CadastroClientes />
              ) : currentPage === 'gestao-duplicatas' ? (
                <GestaoDuplicatas />
              ) : currentPage === 'duplicatas-recebidas' ? (
                <DuplicatasRecebidas />
              ) : currentPage === 'duplicatas' ? (
                <Duplicatas />
              ) : currentPage === 'profiles' ? (
                <UserProfiles />
              ) : currentPage === 'company' ? (
                <CompanyProfile />
              ) : currentPage === 'workflow' && showWorkflowRules ? (
                <WorkflowRules />
              ) : currentPage === 'credit-limit-policies' ? (
                <CreditLimitPolicies />
              ) : currentPage === 'credit-analysis' ? (
                <CreditAnalysis />
              ) : currentPage === 'certificado-digital' ? (
                <CertificadoDigital />
              ) : currentPage === 'funding-rules' ? (
                <FundingRules />
              ) : currentPage === 'termos-cessao' ? (
                <TermsOfAssignment />
              ) : currentPage === 'movimentacao' ? (
                <Movimentacao />
              ) : currentPage === 'liquidacoes' ? (
                <Liquidacoes />
              ) : currentPage === 'termos-cessao-financiador' ? (
                <TermsOfAssignment />
              ) : currentPage === 'gestao-cobranca' ? (
                <DebtManagement />
              ) : currentPage === 'contas-a-pagar' ? (
                <ContasAPagar />
              ) : currentPage === 'convenios' ? (
                <Convenios />
              ) : currentPage === 'view-preferences' ? (
                <ViewPreferences />
              ) : (
                <Home onNavegar={navegar} />
              )}
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
