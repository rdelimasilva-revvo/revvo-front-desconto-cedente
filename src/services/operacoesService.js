/**
 * Operações de antecipação do cedente.
 */

import { ETAPAS_OPERACAO } from '../types/entities';
import { LIMITE, OPERACOES } from '../mocks/cedenteData';
import { clone, request } from './mockApi';
import { marcarComoCedidos } from './recebiveisService';

let base = clone(OPERACOES);
let sequencia = base.length;

const dentroDoPeriodo = (operacao, de, ate) => {
  const data = operacao.dataCriacao.slice(0, 10);
  if (de && data < de) return false;
  if (ate && data > ate) return false;
  return true;
};

export const listarOperacoes = (filtros = {}) =>
  request(() => {
    const { status, de, ate, busca } = filtros;

    const itens = base
      .filter((operacao) => (status ? operacao.status === status : true))
      .filter((operacao) => dentroDoPeriodo(operacao, de, ate))
      .filter((operacao) => {
        if (!busca) return true;
        const termo = busca.toLowerCase();
        const alvo = `${operacao.id} ${operacao.titulos.map((titulo) => titulo.sacado.nome).join(' ')}`.toLowerCase();
        return alvo.includes(termo);
      })
      .sort((a, b) => b.dataCriacao.localeCompare(a.dataCriacao));

    return clone(itens);
  });

export const obterOperacao = (id) =>
  request(() => {
    const operacao = base.find((item) => item.id === id);
    if (!operacao) throw new Error(`Operação ${id} não encontrada.`);
    return clone(operacao);
  });

/** Resumo consumido pela Home. */
export const obterResumo = () =>
  request(() => {
    const emAndamento = base.filter((operacao) => ['enviada', 'aceite_sacado', 'registro', 'credito'].includes(operacao.status));
    const liquidadas = base.filter((operacao) => operacao.status === 'liquidada');

    const proximasLiquidacoes = base
      .filter((operacao) => operacao.status !== 'recusada')
      .flatMap((operacao) => operacao.titulos.map((titulo) => ({ ...titulo, operacaoId: operacao.id })))
      .filter((titulo) => {
        const dias = Math.round((new Date(`${titulo.vencimento}T12:00:00Z`) - new Date()) / 86400000);
        return dias >= 0 && dias <= 7;
      })
      .sort((a, b) => a.vencimento.localeCompare(b.vencimento));

    // O limite consumido é o que está em operação: assim o card da Home acompanha
    // cada contratação nova em vez de mostrar um número congelado.
    const utilizado = emAndamento.reduce((total, operacao) => total + operacao.valorBruto, 0);

    return {
      limite: {
        total: LIMITE.total,
        utilizado,
        disponivel: Math.max(LIMITE.total - utilizado, 0)
      },
      emAndamento: {
        quantidade: emAndamento.length,
        valor: emAndamento.reduce((total, operacao) => total + operacao.valorBruto, 0)
      },
      liquidadas: {
        quantidade: liquidadas.length,
        valor: liquidadas.reduce((total, operacao) => total + operacao.valorLiquido, 0)
      },
      proximasLiquidacoes: clone(proximasLiquidacoes),
      ultimasOperacoes: clone(
        [...base].sort((a, b) => b.dataCriacao.localeCompare(a.dataCriacao)).slice(0, 5)
      )
    };
  });

/**
 * Contrata a operação a partir de uma simulação aceita.
 * O segundo fator já foi validado na tela de contratação.
 */
export const contratarOperacao = ({ simulacao }) =>
  request(
    () => {
      sequencia += 1;
      const numero = `OP-2026-${String(184 + sequencia).padStart(4, '0')}`;
      const agora = new Date().toISOString();

      const operacao = {
        id: numero,
        dataCriacao: agora,
        valorBruto: simulacao.valorBruto,
        valorLiquido: simulacao.valorLiquido,
        taxaMensal: simulacao.taxaMensal,
        status: 'enviada',
        titulos: simulacao.titulos.map((titulo) => ({
          recebivelId: titulo.recebivelId,
          numeroTitulo: titulo.numeroTitulo,
          sacado: titulo.sacado,
          valorBruto: titulo.valorBruto,
          valorLiquido: titulo.valorLiquido,
          vencimento: titulo.vencimento,
          status: 'Aguardando aceite'
        })),
        etapas: ETAPAS_OPERACAO.map((nome, indice) => ({
          nome,
          situacao: indice === 0 ? 'concluida' : indice === 1 ? 'em_andamento' : 'pendente',
          ...(indice === 0 ? { dataHora: agora, evidenciaUrl: '#', evidenciaLabel: 'Protocolo de envio' } : {})
        }))
      };

      base = [operacao, ...base];
      marcarComoCedidos(simulacao.titulos.map((titulo) => titulo.recebivelId));

      return clone(operacao);
    },
    { delay: 1200 }
  );

/** Exportação da lista em CSV — o navegador monta o arquivo, sem backend. */
export const montarCsvOperacoes = (operacoes) => {
  const cabecalho = ['Operacao', 'Data', 'Titulos', 'Valor bruto', 'Valor liquido', 'Status'];
  const linhas = operacoes.map((operacao) => [
    operacao.id,
    operacao.dataCriacao.slice(0, 10).split('-').reverse().join('/'),
    operacao.titulos.length,
    operacao.valorBruto.toFixed(2).replace('.', ','),
    operacao.valorLiquido.toFixed(2).replace('.', ','),
    operacao.status
  ]);

  return [cabecalho, ...linhas].map((linha) => linha.join(';')).join('\n');
};
