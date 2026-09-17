import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import { Alert, Button, Checkbox, Input, Modal, Stepper, Table } from '../../../ds';
import { contratarOperacao } from '../../../services/operacoesService';
import { CODIGO_2FA_SIMULADO, obterCedente, validarSegundoFator } from '../../../services/cadastroService';
import { formatCurrency, formatDate, formatPercent } from '../../../utils/format';

const Resumo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Bloco = styled.div`
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 14px;

  .rotulo {
    font-size: 12px;
    color: var(--text-muted);
  }

  .valor {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: ${(props) => props.$cor || 'var(--text-strong)'};
    margin-top: 2px;
  }

  .detalhe {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 4px;
  }
`;

const Termo = styled.div`
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  height: 300px;
  overflow-y: auto;
  padding: 16px;
  font-size: var(--fs-body-sm);
  line-height: 1.7;
  color: var(--text-body);
  background: var(--surface-sunken);

  h3 {
    font-size: var(--fs-body-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-strong);
    margin: 16px 0 6px;
  }

  p {
    margin: 0 0 8px;
  }
`;

const Aceite = styled.div`
  margin-top: 16px;
  font-size: var(--fs-body-sm);
  color: ${(props) => (props.$habilitado ? 'var(--text-body)' : 'var(--text-muted)')};
`;

const CampoCodigo = styled.div`
  margin-top: 16px;
  max-width: 220px;

  .dica {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 6px;
  }
`;

const Sucesso = styled.div`
  text-align: center;
  padding: 16px;

  h3 {
    font-size: 18px;
    font-weight: var(--fw-semibold);
    margin: 14px 0 4px;
  }

  .numero {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 700;
    color: var(--revvo-blue-500);
    margin: 10px 0;
  }

  p {
    font-size: var(--fs-body-sm);
    color: var(--text-muted);
    margin: 0 auto;
    max-width: 440px;
  }
`;

const RodapeModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;

  .aviso {
    font-size: 12px;
    color: var(--text-muted);
    max-width: 360px;
  }

  .acoes {
    display: flex;
    gap: 8px;
  }
`;

const PASSOS = [
  { label: 'Resumo' },
  { label: 'Termo de cessão' },
  { label: 'Confirmação' }
];

const COLUNAS_TITULOS = [
  { key: 'numeroTitulo', label: 'Título' },
  { key: 'sacado', label: 'Sacado', render: (linha) => linha.sacado.nome },
  { key: 'vencimento', label: 'Vencimento', render: (linha) => formatDate(linha.vencimento) },
  { key: 'prazo', label: 'Prazo', render: (linha) => `${linha.prazoDias}d` },
  { key: 'bruto', label: 'Bruto', numeric: true, render: (linha) => formatCurrency(linha.valorBruto) },
  { key: 'liquido', label: 'Líquido', numeric: true, render: (linha) => formatCurrency(linha.valorLiquido) }
];

/**
 * Contratação em 3 passos.
 * O aceite só libera depois da leitura completa do termo; o envio só acontece
 * depois do segundo fator validado.
 */
const ContratacaoModal = ({ simulacao, onFechar, onContratado }) => {
  const [passo, setPasso] = useState(1);
  const [leuTermo, setLeuTermo] = useState(false);
  const [aceitou, setAceitou] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [operacao, setOperacao] = useState(null);
  const [conta, setConta] = useState(null);
  const termoRef = useRef(null);

  useEffect(() => {
    obterCedente()
      .then((cedente) => setConta(cedente.contaBancaria))
      .catch(() => setConta(null));
  }, []);

  /** Libera o aceite só quando o termo chega ao fim (tolerância de 24px). */
  const aoRolarTermo = (evento) => {
    const { scrollTop, scrollHeight, clientHeight } = evento.target;
    if (scrollTop + clientHeight >= scrollHeight - 24) setLeuTermo(true);
  };

  // Em telas altas o termo pode caber inteiro e nunca gerar rolagem — sem isto o
  // aceite ficaria travado esperando um evento de scroll que jamais acontece.
  useEffect(() => {
    if (passo !== 2 || leuTermo) return;

    const verificar = () => {
      const elemento = termoRef.current;
      if (elemento && elemento.scrollHeight <= elemento.clientHeight + 24) setLeuTermo(true);
    };

    verificar();
    window.addEventListener('resize', verificar);
    return () => window.removeEventListener('resize', verificar);
  }, [passo, leuTermo]);

  const contratar = async () => {
    setEnviando(true);
    try {
      await validarSegundoFator(codigo);
      const criada = await contratarOperacao({ simulacao });
      setOperacao(criada);
      setPasso(3);
    } catch (falha) {
      toast.error(falha.message || 'Não foi possível concluir a contratação.');
    } finally {
      setEnviando(false);
    }
  };

  const podeContratar = leuTermo && aceitou && codigo.trim().length === 6;

  const rodape = (
    <RodapeModal>
      <span className="aviso">
        {passo === 1 && 'Confira os títulos antes de seguir para o termo de cessão.'}
        {passo === 2 && 'O aceite eletrônico com segundo fator tem valor de assinatura.'}
        {passo === 3 && 'Você será levado ao detalhe da operação.'}
      </span>

      <div className="acoes">
        {passo === 1 && (
          <>
            <Button variant="secondary" onClick={onFechar}>
              Cancelar
            </Button>
            <Button
              onClick={() => setPasso(2)}
              rightIcon={<i data-lucide="arrow-right" style={{ width: 15, height: 15 }} />}
            >
              Continuar
            </Button>
          </>
        )}

        {passo === 2 && (
          <>
            <Button variant="secondary" onClick={() => setPasso(1)}>
              Voltar
            </Button>
            <Button onClick={contratar} disabled={!podeContratar || enviando}>
              {enviando ? 'Contratando…' : 'Aceitar e contratar'}
            </Button>
          </>
        )}

        {passo === 3 && (
          <Button
            onClick={() => onContratado(operacao)}
            rightIcon={<i data-lucide="arrow-right" style={{ width: 15, height: 15 }} />}
          >
            Ver operação
          </Button>
        )}
      </div>
    </RodapeModal>
  );

  return (
    <Modal
      open
      onClose={passo === 3 ? undefined : onFechar}
      closeOnScrim={passo !== 3}
      title="Contratar antecipação"
      footer={rodape}
      size="lg"
      style={{ maxWidth: 800 }}
    >
      <Stepper steps={PASSOS} activeStep={passo - 1} style={{ marginBottom: 20 }} />

      {passo === 1 && (
        <>
          <Resumo>
            <Bloco>
              <div className="rotulo">Títulos selecionados</div>
              <div className="valor">{simulacao.quantidade}</div>
              <div className="detalhe">Prazo médio de {simulacao.prazoMedio} dias</div>
            </Bloco>
            <Bloco>
              <div className="rotulo">Valor bruto</div>
              <div className="valor">{formatCurrency(simulacao.valorBruto)}</div>
              <div className="detalhe">Taxa de {formatPercent(simulacao.taxaMensal)} a.m.</div>
            </Bloco>
            <Bloco $cor="var(--revvo-green-700)">
              <div className="rotulo">Valor líquido</div>
              <div className="valor">{formatCurrency(simulacao.valorLiquido)}</div>
              <div className="detalhe">Crédito previsto em {formatDate(simulacao.dataCredito)}</div>
            </Bloco>
          </Resumo>

          {conta && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 12px' }}>
              O crédito será feito na conta {conta.banco} · ag. {conta.agencia} · c/c {conta.conta}.
            </p>
          )}

          <div style={{ maxHeight: 260, overflow: 'auto' }}>
            <Table columns={COLUNAS_TITULOS} rows={simulacao.titulos} rowKey="recebivelId" dense />
          </div>
        </>
      )}

      {passo === 2 && (
        <>
          <Termo ref={termoRef} onScroll={aoRolarTermo} tabIndex={0} aria-label="Termo de cessão de crédito">
            <h3>TERMO DE CESSÃO DE CRÉDITOS</h3>
            <p>
              Pelo presente instrumento particular, a CEDENTE, qualificada em seus dados cadastrais, cede e transfere
              ao CESSIONÁRIO, em caráter definitivo e sem coobrigação salvo nas hipóteses previstas na cláusula
              quinta, os direitos creditórios relacionados no anexo desta operação, totalizando{' '}
              {formatCurrency(simulacao.valorBruto)} em valor de face.
            </p>

            <h3>Cláusula primeira — Do objeto</h3>
            <p>
              A cessão abrange {simulacao.quantidade} título(s) de crédito, com prazo médio de {simulacao.prazoMedio}{' '}
              dias, devidamente identificados por número, sacado e data de vencimento no anexo que integra este termo.
            </p>

            <h3>Cláusula segunda — Do preço</h3>
            <p>
              O preço da cessão corresponde a {formatCurrency(simulacao.valorLiquido)}, já deduzidos o desconto
              calculado à taxa de {formatPercent(simulacao.taxaMensal)} ao mês, o IOF de {formatCurrency(simulacao.iof)}{' '}
              e as tarifas de {formatCurrency(simulacao.tarifas)}, a ser creditado na conta de titularidade da CEDENTE
              em {formatDate(simulacao.dataCredito)}.
            </p>

            <h3>Cláusula terceira — Do registro</h3>
            <p>
              A CEDENTE autoriza o registro da presente cessão perante entidade registradora autorizada pelo Banco
              Central do Brasil, nos termos da Resolução CMN nº 4.734/2019, para constituição e oponibilidade da
              titularidade dos direitos creditórios cedidos.
            </p>

            <h3>Cláusula quarta — Das declarações da cedente</h3>
            <p>
              A CEDENTE declara que os créditos cedidos são legítimos, existentes, líquidos e certos, livres de
              quaisquer ônus, gravames ou cessões anteriores, e que decorrem de operações mercantis efetivamente
              realizadas com os sacados indicados.
            </p>

            <h3>Cláusula quinta — Da responsabilidade</h3>
            <p>
              A CEDENTE responde pela existência e legitimidade dos créditos, bem como por vícios de origem,
              divergências de valor, devoluções de mercadoria ou qualquer fato que impeça o adimplemento do título
              pelo sacado, hipóteses em que fica obrigada à recompra do crédito correspondente.
            </p>

            <h3>Cláusula sexta — Do aceite eletrônico</h3>
            <p>
              As partes reconhecem a validade do aceite eletrônico com autenticação de segundo fator como forma de
              manifestação de vontade, nos termos do art. 10, §2º, da MP nº 2.200-2/2001, produzindo todos os efeitos
              jurídicos de assinatura.
            </p>

            <h3>Cláusula sétima — Do foro</h3>
            <p>
              Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias oriundas deste termo,
              com renúncia a qualquer outro, por mais privilegiado que seja.
            </p>

            <p style={{ marginTop: 24, fontWeight: 600 }}>Fim do termo.</p>
          </Termo>

          {!leuTermo && (
            <Alert kind="info" style={{ marginTop: 12 }}>
              Role o termo até o fim para habilitar o aceite.
            </Alert>
          )}

          <Aceite $habilitado={leuTermo}>
            <Checkbox
              id="aceite-termo"
              checked={aceitou}
              disabled={!leuTermo}
              onChange={(valor) => setAceitou(valor)}
              label="Li integralmente o termo de cessão e aceito as suas condições em nome da empresa cedente."
            />
          </Aceite>

          <CampoCodigo>
            <Input
              id="codigo-2fa"
              label="Código de verificação enviado para o seu celular"
              inputMode="numeric"
              maxLength={6}
              value={codigo}
              onChange={(evento) => setCodigo(evento.target.value.replace(/\D/g, ''))}
              disabled={!aceitou}
              placeholder="000000"
              leftIcon={<i data-lucide="lock" style={{ width: 15, height: 15 }} />}
            />
            <div className="dica">Ambiente de demonstração: use o código {CODIGO_2FA_SIMULADO}.</div>
          </CampoCodigo>
        </>
      )}

      {passo === 3 && operacao && (
        <Sucesso>
          <i data-lucide="circle-check-big" style={{ width: 44, height: 44, color: 'var(--revvo-green-600)' }} />
          <h3>Operação contratada</h3>
          <div className="numero">{operacao.id}</div>
          <p>
            {operacao.titulos.length} título(s) no valor líquido de {formatCurrency(operacao.valorLiquido)}. A operação
            foi enviada e agora aguarda o aceite do sacado. Acompanhe cada etapa no detalhe da operação.
          </p>
        </Sucesso>
      )}
    </Modal>
  );
};

export default ContratacaoModal;
