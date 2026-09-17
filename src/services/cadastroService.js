/**
 * Cadastro do cedente: dados da empresa, conta de crédito, integrações e usuários.
 */

import { CEDENTE } from '../mocks/cedenteData';
import { clone, request } from './mockApi';

let base = clone(CEDENTE);

export const obterCedente = () => request(() => clone(base));

/**
 * Alteração da conta de crédito exige reautenticação (validada na tela) e entra
 * em aprovação — nunca passa a valer na hora.
 */
export const solicitarAlteracaoConta = (conta) =>
  request(
    () => {
      base = {
        ...base,
        contaBancaria: { ...base.contaBancaria, ...conta, situacao: 'em_aprovacao' }
      };
      return clone(base.contaBancaria);
    },
    { delay: 800 }
  );

export const alterarPapelUsuario = (usuarioId, papel) =>
  request(() => {
    base = {
      ...base,
      usuarios: base.usuarios.map((usuario) => (usuario.id === usuarioId ? { ...usuario, papel } : usuario))
    };
    return clone(base.usuarios);
  });

export const convidarUsuario = ({ nome, email, papel }) =>
  request(() => {
    const novo = {
      id: `usr-${Date.now()}`,
      nome,
      email,
      papel,
      status: 'convidado'
    };
    base = { ...base, usuarios: [...base.usuarios, novo] };
    return clone(base.usuarios);
  });

export const alternarIntegracao = (integracaoId) =>
  request(() => {
    base = {
      ...base,
      integracoes: base.integracoes.map((integracao) =>
        integracao.id === integracaoId
          ? {
              ...integracao,
              status: integracao.status === 'conectada' ? 'desconectada' : 'conectada',
              detalhe: integracao.status === 'conectada' ? 'Desconectada agora' : 'Conectada agora'
            }
          : integracao
      )
    };
    return clone(base.integracoes);
  });

/** Segundo fator simulado. O código válido é fixo enquanto não há backend. */
export const CODIGO_2FA_SIMULADO = '123456';

export const validarSegundoFator = (codigo) =>
  request(
    () => {
      if (String(codigo).trim() !== CODIGO_2FA_SIMULADO) {
        throw new Error('Código de verificação inválido. Confira o código enviado para o seu celular.');
      }
      return { validado: true };
    },
    { delay: 700 }
  );
