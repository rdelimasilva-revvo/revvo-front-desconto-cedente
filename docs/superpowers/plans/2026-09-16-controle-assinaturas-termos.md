# Controle de Assinaturas de Termos de Cessão — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma central de pendências de assinatura de termos de cessão dentro de Operações, com alçada operador/aprovador, e expandir o mock de operações de 7 para 24 registros.

**Architecture:** Entidade nova `TermoCessao` em coleção própria (`termosService.js`), ligada à `Operacao` por `operacaoId`. A operação ganha o status `aguardando_assinatura` e uma sexta etapa, ficando retida até a assinatura. `Operacoes.jsx` vira casca com `SegmentedControl` sobre duas irmãs: a lista atual e a fila de termos. O texto do termo sai do JSX do `ContratacaoModal` para um módulo de domínio compartilhado.

**Tech Stack:** React 18, styled-components, design system interno em `src/ds`, camada de serviços simulada (`src/services/*` sobre `src/services/mockApi.js`), Vite 5.

**Spec:** `docs/superpowers/specs/2026-09-16-controle-assinaturas-termos-design.md`

## Global Constraints

- **Não existe suíte de testes.** `package.json` expõe apenas `dev`, `build`, `build:demo`, `lint`, `preview`, `preview:demo`. Não instale Vitest/Jest: não foi autorizado. Cada tarefa verifica com `npx eslint` e com um script de asserção rodado no console do navegador, fornecido na própria tarefa.
- **Linha de base do lint, medida por arquivo** (todos pré-existentes, de `react/prop-types`, `no-unused-vars` e `react-hooks/rules-of-hooks`). Uma tarefa passa se não *aumentar* a contagem do arquivo que tocou. Não "conserte" os pré-existentes: polui o diff e sai do escopo.

  | Caminho | Erros pré-existentes |
  |---|---|
  | `src/services/cadastroService.js` | 0 |
  | `src/services/operacoesService.js` | 0 |
  | `src/types/entities.js` | 0 |
  | `src/mocks/cedenteData.js` | 0 |
  | `src/components/Common/StatusBadge.jsx` | 6 |
  | `src/components/Cedente/Contratacao/ContratacaoModal.jsx` | 19 |
  | `src/components/Cedente/Operacoes/` (diretório) | 6 |
  | `src/` (total do projeto) | 877 |

  Arquivos novos (`src/services/termosService.js`, `src/domain/termoCessao.jsx`, `OperacoesLista.jsx`, `TermosCessao.jsx`, `AssinaturaModal.jsx`) começam em 0 e **devem terminar em 0**, exceto os `react/prop-types` que o padrão do projeto já aceita em componentes — esses são esperados e não contam como regressão.
- **Idioma do código:** identificadores, comentários e strings de UI em português, sem acento em nomes de identificador (`assinarTermos`, não `assinarTermös`). Strings de UI **com** acentuação correta.
- **Telas nunca importam de `src/mocks/`.** Só `src/services/*` lê mocks. Esta é a fronteira que permite trocar mock por HTTP sem tocar tela.
- **Todo serviço novo envolve o retorno em `request()`** de `src/services/mockApi.js`, para herdar latência simulada e o modo de falha (`localStorage.setItem('mockApiFailRate','1')`).
- **Servidor de dev:** `npx vite --port 5180 --strictPort`. As portas 5173 e 5174 são de outros projetos.
- **Código de segundo fator simulado:** `123456`, exportado como `CODIGO_2FA_SIMULADO` de `src/services/cadastroService.js`.
- **Toda cópia defensiva usa `clone()`** de `mockApi.js` ao devolver dados de uma `base` em memória.

---

### Task 1: Identidade do usuário atual e regra de alçada

Sem "quem sou eu" não há alçada. O portal do cedente não tem nenhuma noção de usuário logado hoje.

**Files:**
- Modify: `src/services/cadastroService.js` (acrescentar ao fim, antes de nada que exporte default)
- Modify: `src/types/entities.js:118-122` (typedef `UsuarioCedente` já existe; sem mudança de shape, só confirmar)

**Interfaces:**
- Consumes: `CEDENTE.usuarios` de `src/mocks/cedenteData.js:263-266` — três usuários: `usr-1` Mariana Andrade (`aprovador`), `usr-2` Carlos Nakamura (`operador`), `usr-3` Rita Bezerra (`operador`, `convidado`).
- Produces:
  - `obterUsuarioAtual(): Promise<UsuarioCedente>`
  - `definirUsuarioAtual(id: string): Promise<UsuarioCedente>`
  - `listarUsuariosParaTroca(): Promise<UsuarioCedente[]>` — só os `ativo`
  - `podeAssinar(usuario: UsuarioCedente|null): boolean` — síncrono, sem `request()`, porque a UI chama a cada render

- [ ] **Step 1: Acrescentar identidade e alçada ao cadastroService**

Em `src/services/cadastroService.js`, ao final do arquivo:

```js
/**
 * Usuário logado do portal.
 *
 * Front-only: não há sessão real no portal do cedente. Começa no aprovador
 * para a fila de assinatura ter ação disponível na primeira visita.
 */
let usuarioAtualId = 'usr-1';

export const obterUsuarioAtual = () =>
  request(() => {
    const usuario = base.usuarios.find((item) => item.id === usuarioAtualId);
    if (!usuario) throw new Error(`Usuário ${usuarioAtualId} não encontrado.`);
    return clone(usuario);
  }, { delay: 120 });

export const definirUsuarioAtual = (id) =>
  request(() => {
    const usuario = base.usuarios.find((item) => item.id === id);
    if (!usuario) throw new Error(`Usuário ${id} não encontrado.`);
    if (usuario.status !== 'ativo') {
      throw new Error(`${usuario.nome} não está ativo e não pode operar o portal.`);
    }
    usuarioAtualId = id;
    return clone(usuario);
  }, { delay: 120 });

export const listarUsuariosParaTroca = () =>
  request(() => clone(base.usuarios.filter((item) => item.status === 'ativo')), { delay: 120 });

/**
 * Alçada de assinatura: só o aprovador assina termo de cessão.
 *
 * Síncrona de propósito — a UI consulta a cada render para decidir se habilita
 * o botão, e um await aqui causaria piscada entre habilitado e bloqueado.
 */
export const podeAssinar = (usuario) => usuario?.papel === 'aprovador';

export const MOTIVO_SEM_ALCADA =
  'Só usuários com papel de aprovador podem assinar o termo de cessão.';
```

- [ ] **Step 2: Verificar que o lint não piorou**

```bash
cd /c/DEV/revvo/revvo-desconto-cedente
npx eslint src/services/cadastroService.js
```

Esperado: nenhum erro novo. `cadastroService.js` não está na lista de arquivos com erros pré-existentes, então espere **zero** erros.

- [ ] **Step 3: Verificar o comportamento no navegador**

Suba o servidor (`npx vite --port 5180 --strictPort`), abra `http://localhost:5180/` e rode no console:

```js
const s = await import('/src/services/cadastroService.js');
const inicial = await s.obterUsuarioAtual();
const operador = await s.definirUsuarioAtual('usr-2');
const ativos = await s.listarUsuariosParaTroca();
let erroConvidado = null;
try { await s.definirUsuarioAtual('usr-3'); } catch (e) { erroConvidado = e.message; }
await s.definirUsuarioAtual('usr-1');
console.table({
  inicialEhAprovador: inicial.papel === 'aprovador',
  aprovadorAssina: s.podeAssinar(inicial) === true,
  operadorNaoAssina: s.podeAssinar(operador) === false,
  nuloNaoAssina: s.podeAssinar(null) === false,
  convidadoRejeitado: erroConvidado !== null,
  ativosSaoDois: ativos.length === 2,
});
```

Esperado: todas as seis colunas `true`. `usr-3` está `convidado`, então precisa ser rejeitado.

- [ ] **Step 4: Commit**

```bash
git add src/services/cadastroService.js
git commit -m "feat: usuario atual e regra de alcada de assinatura no cadastroService"
```

---

### Task 2: Status `aguardando_assinatura` e a sexta etapa da operação

Esta é a tarefa invasiva: mexe em uniões e mapas que vários módulos consomem. Fazer tudo junto evita um estado intermediário onde a operação tem status sem label e a badge renderiza vazia.

**Files:**
- Modify: `src/types/entities.js:58` (união `StatusOperacao`), `:155-170` (`STATUS_OPERACAO_LABEL`), `:171-177` (`ETAPAS_OPERACAO`)
- Modify: `src/components/Common/StatusBadge.jsx:28-35` (`TOM_STATUS_OPERACAO`)
- Modify: `src/services/operacoesService.js:47-49` (`obterResumo`, filtro `emAndamento`)

**Interfaces:**
- Produces: `'aguardando_assinatura'` como primeiro valor de `StatusOperacao`; `ETAPAS_OPERACAO` com 6 entradas, `'Assinatura do termo'` na posição 0.

- [ ] **Step 1: Estender a união e os mapas em entities.js**

Em `src/types/entities.js`, trocar a linha 58:

```js
/**
 * @typedef {'aguardando_assinatura'|'enviada'|'aceite_sacado'|'registro'|'credito'|'liquidada'|'recusada'} StatusOperacao
 */
```

Trocar `STATUS_OPERACAO_LABEL` por:

```js
export const STATUS_OPERACAO_LABEL = {
  aguardando_assinatura: 'Aguardando assinatura',
  enviada: 'Enviada',
  aceite_sacado: 'Aceite do sacado',
  registro: 'Registro na registradora',
  credito: 'Crédito em conta',
  liquidada: 'Liquidada',
  recusada: 'Recusada'
};
```

Trocar `ETAPAS_OPERACAO` por:

```js
export const ETAPAS_OPERACAO = [
  'Assinatura do termo',
  'Enviada',
  'Aceite do sacado',
  'Registro na registradora',
  'Crédito em conta',
  'Liquidada'
];
```

- [ ] **Step 2: Dar tom à nova badge**

Em `src/components/Common/StatusBadge.jsx`, dentro de `TOM_STATUS_OPERACAO`, acrescentar como primeira entrada:

```js
  aguardando_assinatura: 'amarelo',
```

Amarelo porque é pendência acionável, o mesmo tom que `registro: 'pendente'` usa em `TOM_STATUS_REGISTRO`.

- [ ] **Step 3: Incluir o novo status no resumo da Home**

Em `src/services/operacoesService.js`, no `obterResumo`, a linha:

```js
    const emAndamento = base.filter((operacao) => ['enviada', 'aceite_sacado', 'registro', 'credito'].includes(operacao.status));
```

passa a:

```js
    // 'aguardando_assinatura' conta como em andamento: o limite já está
    // comprometido e a operação já existe. Fora desta lista ela desaparece do
    // card da Home sem erro nenhum.
    const emAndamento = base.filter((operacao) =>
      ['aguardando_assinatura', 'enviada', 'aceite_sacado', 'registro', 'credito'].includes(operacao.status)
    );
```

- [ ] **Step 4: Verificar que nada consome a lista antiga de etapas por índice**

```bash
cd /c/DEV/revvo/revvo-desconto-cedente
grep -rn "ETAPAS_OPERACAO" src/
grep -rn "etapas\[0\]\|etapas\[1\]\|etapas\[2\]\|etapas\[3\]\|etapas\[4\]" src/
```

Esperado: `ETAPAS_OPERACAO` aparece em `src/types/entities.js` e `src/services/operacoesService.js:112`. O segundo grep deve vir **vazio** — se algo indexar etapas por número, corrija naquele ponto antes de seguir, porque os índices mudaram todos.

- [ ] **Step 5: Verificar no navegador que a Home não perdeu operação**

```js
const o = await import('/src/services/operacoesService.js');
const e = await import('/src/types/entities.js');
const resumo = await o.obterResumo();
const todas = await o.listarOperacoes();
const emAndamentoEsperado = todas.filter(x =>
  ['aguardando_assinatura','enviada','aceite_sacado','registro','credito'].includes(x.status)).length;
console.table({
  seisEtapas: e.ETAPAS_OPERACAO.length === 6,
  primeiraEtapaEhAssinatura: e.ETAPAS_OPERACAO[0] === 'Assinatura do termo',
  todoStatusTemLabel: todas.every(x => !!e.STATUS_OPERACAO_LABEL[x.status]),
  resumoBateComAContagem: resumo.operacoesEmAndamento === emAndamentoEsperado,
});
```

Esperado: as quatro `true`. Se `resumoBateComAContagem` vier `false`, confira o nome real do campo no retorno de `obterResumo` e ajuste a asserção — não o serviço.

- [ ] **Step 6: Commit**

```bash
git add src/types/entities.js src/components/Common/StatusBadge.jsx src/services/operacoesService.js
git commit -m "feat: status aguardando_assinatura e etapa de assinatura do termo"
```

---

### Task 3: Entidade `TermoCessao`, mock e `termosService`

O coração do trabalho. Inclui a assinatura em lote não-transacional.

> **Ordem de execução:** esta tarefa roda **depois da Task 4**. O `TERMOS_CESSAO`
> deriva de `OPERACOES` procurando status `aguardando_assinatura`, que só existe
> depois da Task 4 expandir o mock. Executada antes, a fila nasce vazia e a
> verificação do Step 4 quebra em `pendentes[0].id`.

**Files:**
- Modify: `src/types/entities.js` (typedefs novos, ao lado do typedef `Operacao`, e `STATUS_TERMO_LABEL`)
- Modify: `src/components/Common/StatusBadge.jsx` (`TOM_STATUS_TERMO`)
- Modify: `src/mocks/cedenteData.js` (helper `termo` e `export const TERMOS_CESSAO`, após `OPERACOES`)
- Create: `src/services/termosService.js`

**Interfaces:**
- Consumes: `obterUsuarioAtual`, `podeAssinar`, `CODIGO_2FA_SIMULADO` da Task 1; `clone`, `request` de `mockApi.js`.
- Produces:
  - `listarTermos(filtros?: {status?: string, busca?: string}): Promise<TermoCessao[]>`
  - `obterTermoPorOperacao(operacaoId: string): Promise<TermoCessao|null>`
  - `contarPendentes(): Promise<number>`
  - `criarTermo({operacao, criadoPor, assinarAgora}): Promise<TermoCessao>`
  - `assinarTermos(ids: string[], codigo: string): Promise<{assinados: TermoCessao[], falhas: {id: string, motivo: string}[]}>`
  - `definirAssinante(usuario: UsuarioCedente|null): void`
  - `STATUS_TERMO_LABEL` em `src/types/entities.js`, junto dos outros mapas de label
  - `TOM_STATUS_TERMO` em `src/components/Common/StatusBadge.jsx`, junto de `TOM_STATUS_REGISTRO` e `TOM_STATUS_OPERACAO` — é o padrão do projeto: tom de badge é apresentação, não domínio, e não pertence ao serviço

- [ ] **Step 1: Acrescentar os typedefs em entities.js**

Depois do typedef `Operacao` em `src/types/entities.js`:

```js
/**
 * @typedef {'pendente'|'assinado'|'cancelado'} StatusTermo
 */

/**
 * @typedef {Object} AssinaturaTermo
 * @property {{id: string, nome: string, papel: string}} assinadoPor
 * @property {string} assinadoEm          ISO completo
 * @property {'aceite_eletronico_2fa'} metodo
 * @property {string} hash                SHA-256 simulado do texto do termo
 * @property {string} ip                  simulado
 */

/**
 * @typedef {Object} TermoCessao
 * @property {string} id                  TC-2026-0184
 * @property {string} operacaoId
 * @property {StatusTermo} status
 * @property {string} criadoEm            ISO completo
 * @property {{id: string, nome: string, papel: string}} criadoPor
 * @property {number} quantidadeTitulos   desnormalizado da operação
 * @property {number} valorBruto          desnormalizado da operação
 * @property {number} valorLiquido        desnormalizado da operação
 * @property {AssinaturaTermo|null} assinatura
 */
```

E os mapas de apresentação, junto dos outros:

```js
export const STATUS_TERMO_LABEL = {
  pendente: 'Aguardando assinatura',
  assinado: 'Assinado',
  cancelado: 'Cancelado'
};
```

E o tom da badge em `src/components/Common/StatusBadge.jsx`, ao lado dos dois que
já existem:

```js
export const TOM_STATUS_TERMO = {
  pendente: 'amarelo',
  assinado: 'verde',
  cancelado: 'neutro'
};
```

- [ ] **Step 2: Acrescentar o mock dos termos**

Em `src/mocks/cedenteData.js`, depois do `export const OPERACOES = [...]`:

```js
const USUARIO_APROVADOR = { id: 'usr-1', nome: 'Mariana Andrade', papel: 'aprovador' };
const USUARIO_OPERADOR = { id: 'usr-2', nome: 'Carlos Nakamura', papel: 'operador' };

/** Hash só para a tela ter o que exibir como evidência. */
const hashSimulado = (operacaoId) =>
  `sha256:${operacaoId.replace(/\D/g, '')}${'a3f9c1e7b2d84056'}`.slice(0, 32);

const termo = (operacaoId, status, horasAtras, criadoPor, assinadoPor) => {
  const operacao = OPERACOES.find((item) => item.id === operacaoId);
  if (!operacao) throw new Error(`Mock inconsistente: operação ${operacaoId} não existe.`);

  return {
    id: `TC-${operacaoId.replace('OP-', '')}`,
    operacaoId,
    status,
    criadoEm: addHours(-horasAtras),
    criadoPor,
    quantidadeTitulos: operacao.titulos.length,
    valorBruto: operacao.valorBruto,
    valorLiquido: operacao.valorLiquido,
    assinatura:
      status === 'assinado'
        ? {
            assinadoPor,
            assinadoEm: addHours(-horasAtras + 1),
            metodo: 'aceite_eletronico_2fa',
            hash: hashSimulado(operacaoId),
            ip: '177.32.14.80'
          }
        : null
  };
};

export const TERMOS_CESSAO = OPERACOES.map((operacao) => {
  if (operacao.status === 'aguardando_assinatura') {
    return termo(operacao.id, 'pendente', 4, USUARIO_OPERADOR, null);
  }
  if (operacao.status === 'recusada') {
    return termo(operacao.id, 'cancelado', 80, USUARIO_OPERADOR, null);
  }
  return termo(operacao.id, 'assinado', 30, USUARIO_OPERADOR, USUARIO_APROVADOR);
});
```

Derivar de `OPERACOES` em vez de listar à mão garante que nunca haja operação sem termo — a inconsistência mais provável neste mock.

- [ ] **Step 3: Criar o termosService**

Criar `src/services/termosService.js`:

```js
/**
 * Termos de cessão e suas assinaturas.
 *
 * Coleção própria, ligada à operação por operacaoId. O status do termo não vive
 * dentro da operação de propósito: duas fontes de verdade para o mesmo fato
 * divergem na primeira falha parcial de lote.
 */

import { TERMOS_CESSAO } from '../mocks/cedenteData';
import { clone, request } from './mockApi';
import { CODIGO_2FA_SIMULADO } from './cadastroService';

let base = clone(TERMOS_CESSAO);

/**
 * Quem assina, informado pela tela antes de chamar assinarTermos.
 * A alçada é verificada na tela (podeAssinar); aqui só registramos a evidência.
 */
let assinanteAtual = null;

export const definirAssinante = (usuario) => {
  assinanteAtual = usuario ? { id: usuario.id, nome: usuario.nome, papel: usuario.papel } : null;
};

const hashDoTermo = (operacaoId) =>
  `sha256:${operacaoId.replace(/\D/g, '')}${'a3f9c1e7b2d84056'}`.slice(0, 32);

export const listarTermos = (filtros = {}) =>
  request(() => {
    const { status, busca } = filtros;

    const itens = base
      .filter((item) => (status ? item.status === status : true))
      .filter((item) => {
        if (!busca) return true;
        const alvo = `${item.id} ${item.operacaoId}`.toLowerCase();
        return alvo.includes(busca.toLowerCase());
      })
      // Pendente primeiro: é uma fila de trabalho, não um arquivo.
      .sort((a, b) => {
        if (a.status === 'pendente' && b.status !== 'pendente') return -1;
        if (b.status === 'pendente' && a.status !== 'pendente') return 1;
        return b.criadoEm.localeCompare(a.criadoEm);
      });

    return clone(itens);
  });

export const obterTermoPorOperacao = (operacaoId) =>
  request(() => {
    const termo = base.find((item) => item.operacaoId === operacaoId);
    return termo ? clone(termo) : null;
  });

export const contarPendentes = () =>
  request(() => base.filter((item) => item.status === 'pendente').length, { delay: 120 });

export const criarTermo = ({ operacao, criadoPor, assinarAgora }) =>
  request(() => {
    const novo = {
      id: `TC-${operacao.id.replace('OP-', '')}`,
      operacaoId: operacao.id,
      status: assinarAgora ? 'assinado' : 'pendente',
      criadoEm: new Date().toISOString(),
      criadoPor: { id: criadoPor.id, nome: criadoPor.nome, papel: criadoPor.papel },
      quantidadeTitulos: operacao.titulos.length,
      valorBruto: operacao.valorBruto,
      valorLiquido: operacao.valorLiquido,
      assinatura: assinarAgora
        ? {
            assinadoPor: { id: criadoPor.id, nome: criadoPor.nome, papel: criadoPor.papel },
            assinadoEm: new Date().toISOString(),
            metodo: 'aceite_eletronico_2fa',
            hash: hashDoTermo(operacao.id),
            ip: '177.32.14.80'
          }
        : null
    };

    base = [novo, ...base];
    return clone(novo);
  });

/**
 * Assina um ou vários termos.
 *
 * Deliberadamente NÃO transacional: cada termo é assinado por conta própria e o
 * resultado reporta o que passou e o que falhou. Todo-ou-nada faria o cedente
 * perder assinaturas válidas por causa de um item problemático no lote.
 *
 * O segundo fator é validado uma vez para o lote: o aceite cobre o conjunto.
 */
export const assinarTermos = (ids, codigo) =>
  request(
    () => {
      if (String(codigo).trim() !== CODIGO_2FA_SIMULADO) {
        throw new Error('Código de verificação inválido. Confira o código enviado para o seu celular.');
      }
      if (!ids || ids.length === 0) {
        throw new Error('Selecione ao menos um termo para assinar.');
      }

      const assinados = [];
      const falhas = [];

      ids.forEach((id) => {
        const termo = base.find((item) => item.id === id);

        if (!termo) {
          falhas.push({ id, motivo: 'Termo não encontrado.' });
          return;
        }
        if (termo.status === 'assinado') {
          falhas.push({ id, motivo: 'Este termo já foi assinado.' });
          return;
        }
        if (termo.status === 'cancelado') {
          falhas.push({ id, motivo: 'Termo cancelado não pode ser assinado.' });
          return;
        }

        termo.status = 'assinado';
        termo.assinatura = {
          assinadoPor: assinanteAtual,
          assinadoEm: new Date().toISOString(),
          metodo: 'aceite_eletronico_2fa',
          hash: hashDoTermo(termo.operacaoId),
          ip: '177.32.14.80'
        };
        assinados.push(clone(termo));
      });

      return { assinados, falhas };
    },
    { delay: 900 }
  );

```

Não existe função de cancelar termo em runtime, de propósito: o portal do cedente
não tem nenhuma ação que recuse uma operação — a recusa vem do financiador, que
não existe neste front. As operações `recusada` já nascem com termo `cancelado`
pela derivação do mock. Criar um `cancelarTermoDaOperacao` sem chamador seria
código morto.

- [ ] **Step 4: Verificar o serviço, incluindo o lote parcial**

```bash
npx eslint src/services/termosService.js src/mocks/cedenteData.js src/types/entities.js
```

Depois, no console do navegador:

```js
const t = await import('/src/services/termosService.js');
const c = await import('/src/services/cadastroService.js');
t.definirAssinante(await c.obterUsuarioAtual());

const pendentes = await t.listarTermos({ status: 'pendente' });
const idPendente = pendentes[0].id;

// codigo errado derruba o lote inteiro, antes de assinar qualquer coisa
let erroCodigo = null;
try { await t.assinarTermos([idPendente], '000000'); } catch (e) { erroCodigo = e.message; }
const aindaPendente = (await t.obterTermoPorOperacao(pendentes[0].operacaoId)).status === 'pendente';

// lote misto: um pendente valido + um id inexistente -> parcial, nao tudo-ou-nada
const r = await t.assinarTermos([idPendente, 'TC-NAO-EXISTE'], '123456');
const assinado = await t.obterTermoPorOperacao(pendentes[0].operacaoId);

console.table({
  todosTermosTemOperacao: (await t.listarTermos()).every(x => !!x.operacaoId),
  pendentesVemPrimeiro: (await t.listarTermos())[0].status === 'pendente',
  codigoErradoRejeitado: erroCodigo !== null,
  nadaAssinadoComCodigoErrado: aindaPendente === true,
  loteParcialAssinouUm: r.assinados.length === 1,
  loteParcialReportouUmaFalha: r.falhas.length === 1,
  evidenciaGravada: assinado.status === 'assinado' && !!assinado.assinatura.hash,
  assinanteRegistrado: assinado.assinatura.assinadoPor.papel === 'aprovador',
  reassinarFalha: (await t.assinarTermos([idPendente], '123456')).falhas.length === 1,
});
```

Esperado: as nove colunas `true`. `nadaAssinadoComCodigoErrado` é a mais importante: prova que o 2FA barra antes de mutar.

- [ ] **Step 5: Commit**

```bash
git add src/types/entities.js src/mocks/cedenteData.js src/services/termosService.js
git commit -m "feat: entidade TermoCessao, mock e termosService com assinatura em lote"
```

---

### Task 4: Expandir o mock de 7 para 24 operações

> **Ordem de execução:** esta tarefa roda **antes da Task 3**, porque a Task 3
> deriva os termos das operações. Por isso a verificação abaixo **não** consulta
> o `termosService`, que ainda não existe — as asserções sobre termos vivem na
> Task 3.

**Files:**
- Modify: `src/mocks/cedenteData.js` (o array `OPERACOES`)

**Interfaces:**
- Consumes: helpers já existentes no arquivo — `addHours(horas)` (negativo = passado), `addDays(dias)`, `etapa(nome, situacao, horasAtras, evidenciaLabel, motivo)`, `tituloOperacao(recebivelId, numeroTitulo, sacadoIdx, valorBruto, valorLiquido, dias, status, motivo)`, `SACADOS` (índices 0 a 4).
- Produces: `OPERACOES` com 24 entradas. `TERMOS_CESSAO` da Task 3 deriva automaticamente, então não precisa de mudança.

- [ ] **Step 1: Acrescentar 17 operações**

Regras a respeitar, senão a tela fica inconsistente:

1. **As etapas agora têm 6 nomes**, na ordem de `ETAPAS_OPERACAO`. Toda operação lista as seis, com `situacao` coerente com o `status`.
2. **`dataCriacao` decrescente** não é obrigatória — `listarOperacoes` já ordena — mas use `addHours` negativo crescente para as mais antigas.
3. **Distribuição de status**, para filtros e a fila terem conteúdo: 3 `aguardando_assinatura`, 4 `enviada`, 4 `aceite_sacado`, 3 `registro`, 4 `credito`, 4 `liquidada`, 2 `recusada` — 24 no total, contando as 7 existentes.
4. **As 7 existentes precisam ganhar a etapa nova** na posição 0. Para as já contratadas, `etapa('Assinatura do termo', 'concluida', <horas+1>, 'Termo assinado')`.
5. **`recusada` exige `motivoRecusa`** na operação e `motivo` na etapa recusada. Já existe `MOTIVO_RECUSA_0182` como exemplo.
6. **IDs seguem `OP-2026-NNNN`**, decrescentes a partir de `OP-2026-0178`. Um aditivo com sufixo `-B` (ex.: `OP-2026-0176-B`), porque `OP-2026-0183-B` já prova que o formato aparece.

Exemplo de uma operação `aguardando_assinatura`, a forma nova que não existe no arquivo:

```js
  {
    id: 'OP-2026-0178',
    dataCriacao: addHours(-4),
    valorBruto: 64200.0,
    valorLiquido: 62480.55,
    taxaMensal: 1.32,
    status: 'aguardando_assinatura',
    titulos: [
      tituloOperacao('rec-011', 'DUP-5520/01', 4, 34200.0, 33290.1, 40, 'Aguardando assinatura'),
      tituloOperacao('rec-012', 'DUP-5520/02', 4, 30000.0, 29190.45, 70, 'Aguardando assinatura')
    ],
    etapas: [
      etapa('Assinatura do termo', 'em_andamento', null),
      etapa('Enviada', 'pendente', null),
      etapa('Aceite do sacado', 'pendente', null),
      etapa('Registro na registradora', 'pendente', null),
      etapa('Crédito em conta', 'pendente', null),
      etapa('Liquidada', 'pendente', null)
    ]
  },
```

E uma `liquidada` antiga, para o filtro de período ter alcance:

```js
  {
    id: 'OP-2026-0171',
    dataCriacao: addHours(-1680),
    valorBruto: 208000.0,
    valorLiquido: 202410.8,
    taxaMensal: 1.24,
    status: 'liquidada',
    titulos: [
      tituloOperacao('rec-020', 'DUP-4411/07', 3, 208000.0, 202410.8, -18, 'Liquidado')
    ],
    etapas: [
      etapa('Assinatura do termo', 'concluida', 1681, 'Termo assinado'),
      etapa('Enviada', 'concluida', 1680, 'Protocolo de envio'),
      etapa('Aceite do sacado', 'concluida', 1676, 'Aceite eletrônico'),
      etapa('Registro na registradora', 'concluida', 1670, 'Protocolo CERC 7710233-45'),
      etapa('Crédito em conta', 'concluida', 1668, 'Comprovante de crédito'),
      etapa('Liquidada', 'concluida', 432, 'Comprovante de liquidação')
    ]
  },
```

E uma `recusada`, o caso com mais exigências — `motivoRecusa` na operação, `motivo` na etapa que recusou, e as etapas seguintes ficam `pendente`, nunca `concluida`:

```js
  {
    id: 'OP-2026-0174',
    dataCriacao: addHours(-620),
    valorBruto: 88400.0,
    valorLiquido: 85990.2,
    taxaMensal: 1.36,
    status: 'recusada',
    motivoRecusa:
      'Sacado não reconheceu a duplicata DUP-3391/04: nota fiscal cancelada na SEFAZ após a emissão do título.',
    titulos: [
      tituloOperacao('rec-018', 'DUP-3391/04', 2, 88400.0, 85990.2, 22, 'Recusado', 'Nota fiscal cancelada')
    ],
    etapas: [
      etapa('Assinatura do termo', 'concluida', 621, 'Termo assinado'),
      etapa('Enviada', 'concluida', 620, 'Protocolo de envio'),
      etapa(
        'Aceite do sacado',
        'recusada',
        612,
        null,
        'Sacado não reconheceu a duplicata: nota fiscal cancelada na SEFAZ.'
      ),
      etapa('Registro na registradora', 'pendente', null),
      etapa('Crédito em conta', 'pendente', null),
      etapa('Liquidada', 'pendente', null)
    ]
  },
```

Siga esses três moldes para as demais, variando sacado (índices 0 a 4), valores e prazos. Para `enviada`, `aceite_sacado`, `registro` e `credito`, marque `concluida` até a etapa correspondente ao status e `em_andamento` na seguinte, deixando o resto `pendente`.

- [ ] **Step 2: Verificar a consistência do mock**

```js
const o = await import('/src/services/operacoesService.js');
const e = await import('/src/types/entities.js');
const todas = await o.listarOperacoes();
const porStatus = todas.reduce((a, x) => ({ ...a, [x.status]: (a[x.status] || 0) + 1 }), {});
console.log(porStatus);
console.table({
  vinteEQuatro: todas.length === 24,
  seteStatusDistintos: Object.keys(porStatus).length === 7,
  tresAguardandoAssinatura: porStatus.aguardando_assinatura === 3,
  todasComSeisEtapas: todas.every(x => x.etapas.length === 6),
  etapasNaOrdemCanonica: todas.every(x => x.etapas.every((et, i) => et.nome === e.ETAPAS_OPERACAO[i])),
  recusadasTemMotivo: todas.filter(x => x.status === 'recusada').every(x => !!x.motivoRecusa),
  idsUnicos: new Set(todas.map(x => x.id)).size === todas.length,
});
```

Esperado: as sete `true`. `etapasNaOrdemCanonica` pega o erro mais fácil de cometer aqui — esquecer a etapa nova em uma das 7 antigas. `tresAguardandoAssinatura` garante que a Task 3 terá fila com conteúdo.

- [ ] **Step 3: Commit**

```bash
git add src/mocks/cedenteData.js
git commit -m "feat: mock de operacoes de 7 para 24 cobrindo todos os status"
```

---

### Task 5: Extrair o texto do termo para um módulo de domínio

**Files:**
- Create: `src/domain/termoCessao.jsx`
- Modify: `src/components/Cedente/Contratacao/ContratacaoModal.jsx` (remover o JSX do termo, importar)

**Interfaces:**
- Produces: `TextoTermoCessao({ valorBruto, quantidadeTitulos })` — componente que renderiza o corpo do termo; `TITULO_TERMO = 'TERMO DE CESSÃO DE CRÉDITOS'`

- [ ] **Step 1: Criar o módulo de domínio**

Criar `src/domain/termoCessao.jsx`. Mover para cá, **sem reescrever o texto**, o conteúdo hoje dentro do `<Termo>` em `ContratacaoModal.jsx` (aproximadamente as linhas 300-354: o `<h3>TERMO DE CESSÃO DE CRÉDITOS</h3>`, os parágrafos das cláusulas primeira a sétima e o `<p>Fim do termo.</p>`).

```jsx
import React from 'react';

import { formatCurrency } from '../utils/format';

export const TITULO_TERMO = 'TERMO DE CESSÃO DE CRÉDITOS';

/**
 * Corpo do termo de cessão.
 *
 * Compartilhado entre a contratação e a central de assinaturas: é o documento
 * com valor jurídico no fluxo, e duas cópias divergiriam na primeira edição.
 */
export const TextoTermoCessao = ({ valorBruto, quantidadeTitulos }) => (
  <>
    <h3>{TITULO_TERMO}</h3>
    <p>
      Pelo presente instrumento particular, a CEDENTE, qualificada em seus dados cadastrais, cede e transfere ao
      CESSIONÁRIO, em caráter definitivo e sem coobrigação salvo nas hipóteses previstas na cláusula quinta, os
      direitos creditórios relacionados no anexo desta operação, totalizando {formatCurrency(valorBruto)} em face.
    </p>
    {/* ... demais cláusulas, movidas sem alteração de texto ... */}
    <p style={{ marginTop: 24, fontWeight: 600 }}>Fim do termo.</p>
  </>
);
```

Onde o texto original mencionar a quantidade de títulos, use `{quantidadeTitulos}`; onde mencionar o valor, `{formatCurrency(valorBruto)}`. O `ContratacaoModal` hoje interpola `simulacao.valorBruto` e `simulacao.titulos.length` — as duas props cobrem isso.

- [ ] **Step 2: Consumir no ContratacaoModal**

Em `ContratacaoModal.jsx`, importar e substituir o conteúdo do `<Termo>`:

```jsx
import { TextoTermoCessao } from '../../../domain/termoCessao';
```

```jsx
<Termo ref={termoRef} onScroll={aoRolarTermo}>
  <TextoTermoCessao valorBruto={simulacao.valorBruto} quantidadeTitulos={simulacao.titulos.length} />
</Termo>
```

Mantenha o `styled` `Termo` onde está: o estilo da caixa é da tela, o texto é do domínio.

- [ ] **Step 3: Verificar que o termo não mudou nem quebrou a rolagem**

```bash
npx eslint src/domain/termoCessao.jsx src/components/Cedente/Contratacao/ContratacaoModal.jsx
```

No navegador, como aprovador: Recebíveis → selecionar um título → Contratar → Continuar. Rode no console:

```js
const dlg = document.querySelector('[role=dialog]');
const caixa = [...dlg.querySelectorAll('div')].find(el =>
  /TERMO DE CESS.O DE CR.DITOS/.test(el.textContent) && el.scrollHeight > el.clientHeight + 20 && el.clientHeight < 400);
caixa.scrollTop = caixa.scrollHeight;
caixa.dispatchEvent(new Event('scroll', { bubbles: true }));
await new Promise(r => setTimeout(r, 500));
console.table({
  termoRenderizou: /TERMO DE CESS.O DE CR.DITOS/.test(dlg.innerText),
  temFimDoTermo: /Fim do termo/.test(dlg.innerText),
  temSeteClausulas: (dlg.innerText.match(/Cláusula/g) || []).length === 7,
  rolagemLiberouAceite: !document.getElementById('aceite-termo').disabled,
});
```

Esperado: as quatro `true`. `temSeteClausulas` confirma que nenhuma cláusula ficou para trás na mudança.

- [ ] **Step 4: Commit**

```bash
git add src/domain/termoCessao.jsx src/components/Cedente/Contratacao/ContratacaoModal.jsx
git commit -m "refactor: extrai texto do termo de cessao para modulo de dominio"
```

---

### Task 6: Contratação respeita a alçada

**Files:**
- Modify: `src/services/operacoesService.js:89-125` (`contratarOperacao`)
- Modify: `src/components/Cedente/Contratacao/ContratacaoModal.jsx` (passo 2 condicional ao papel)

**Interfaces:**
- Consumes: `criarTermo`, `definirAssinante` da Task 3; `obterUsuarioAtual`, `podeAssinar` da Task 1; `TextoTermoCessao` da Task 5.
- Produces: `contratarOperacao({ simulacao, usuario, assinarAgora })` — assinatura estendida, `usuario` e `assinarAgora` obrigatórios.

- [ ] **Step 1: Fazer contratarOperacao criar o termo e respeitar o status**

Em `src/services/operacoesService.js`, no `contratarOperacao`, o status e as etapas passam a depender de `assinarAgora`:

```js
export const contratarOperacao = ({ simulacao, usuario, assinarAgora }) =>
  request(async () => {
    sequencia += 1;
    const numero = `OP-2026-${String(184 + sequencia).padStart(4, '0')}`;
    const agora = new Date().toISOString();

    const operacao = {
      id: numero,
      dataCriacao: agora,
      valorBruto: simulacao.valorBruto,
      valorLiquido: simulacao.valorLiquido,
      taxaMensal: simulacao.taxaMensal,
      status: assinarAgora ? 'enviada' : 'aguardando_assinatura',
      titulos: simulacao.titulos.map((titulo) => ({
        recebivelId: titulo.recebivelId,
        numeroTitulo: titulo.numeroTitulo,
        sacado: titulo.sacado,
        valorBruto: titulo.valorBruto,
        valorLiquido: titulo.valorLiquido,
        vencimento: titulo.vencimento,
        status: assinarAgora ? 'Aguardando aceite' : 'Aguardando assinatura'
      })),
      etapas: ETAPAS_OPERACAO.map((nome, indice) => {
        if (indice === 0) {
          return assinarAgora
            ? { nome, situacao: 'concluida', dataHora: agora, evidenciaUrl: '#', evidenciaLabel: 'Termo assinado' }
            : { nome, situacao: 'em_andamento' };
        }
        if (indice === 1) {
          return assinarAgora
            ? { nome, situacao: 'em_andamento', dataHora: agora, evidenciaUrl: '#', evidenciaLabel: 'Protocolo de envio' }
            : { nome, situacao: 'pendente' };
        }
        return { nome, situacao: 'pendente' };
      })
    };

    base = [operacao, ...base];
    await criarTermo({ operacao, criadoPor: usuario, assinarAgora });
    marcarComoCedidos(simulacao.titulos.map((titulo) => titulo.recebivelId));
    return clone(operacao);
  });
```

Importe no topo do arquivo:

```js
import { criarTermo } from './termosService';
```

Atenção: `request` aceita resolver assíncrono porque faz `return resolver()` — o `await criarTermo` funciona.

- [ ] **Step 2: Condicionar o passo 2 do modal ao papel**

Em `ContratacaoModal.jsx`, carregar o usuário e derivar a alçada:

```jsx
import { obterCedente, obterUsuarioAtual, podeAssinar, CODIGO_2FA_SIMULADO, validarSegundoFator } from '../../../services/cadastroService';
```

```jsx
const [usuario, setUsuario] = useState(null);

useEffect(() => {
  obterUsuarioAtual().then(setUsuario).catch(() => setUsuario(null));
}, []);

const assinaAgora = podeAssinar(usuario);
```

O checkbox de aceite e o campo de segundo fator ficam dentro de `{assinaAgora && (...)}`. Quando `!assinaAgora`, exibir no lugar:

```jsx
<Alert kind="info" style={{ marginTop: 16 }}>
  Você não tem alçada para assinar. Ao enviar, o termo fica aguardando a assinatura de um aprovador e a operação
  só segue depois disso.
</Alert>
```

O gate de conclusão passa a:

```jsx
const podeContratar = assinaAgora
  ? leuTermo && aceitou && codigo.trim().length === 6
  : leuTermo;
```

E o `contratar`:

```jsx
const contratar = async () => {
  setEnviando(true);
  try {
    if (assinaAgora) await validarSegundoFator(codigo);
    const criada = await contratarOperacao({ simulacao, usuario, assinarAgora: assinaAgora });
    setOperacao(criada);
    setPasso(3);
  } catch (falha) {
    toast.error(falha.message || 'Não foi possível concluir a contratação.');
  } finally {
    setEnviando(false);
  }
};
```

O rótulo do botão no passo 2 passa a `assinaAgora ? 'Aceitar e contratar' : 'Enviar para assinatura'`, e o aviso do rodapé para `!assinaAgora` vira `'O termo seguirá para assinatura de um aprovador.'`.

No passo 3, quando `!assinaAgora`, o texto de sucesso troca "A operação foi enviada e agora aguarda o aceite do sacado" por "A operação aguarda a assinatura do termo por um aprovador".

- [ ] **Step 3: Verificar os dois papéis**

```bash
npx eslint src/services/operacoesService.js src/components/Cedente/Contratacao/ContratacaoModal.jsx
```

No navegador, **como operador**:

```js
const c = await import('/src/services/cadastroService.js');
await c.definirUsuarioAtual('usr-2');
```

Recarregue, vá a Recebíveis, selecione um título, Contratar → Continuar, role o termo. Confirme visualmente: sem checkbox de aceite, sem campo de código, aviso de alçada visível, botão diz "Enviar para assinatura". Conclua e rode:

```js
const o = await import('/src/services/operacoesService.js');
const t = await import('/src/services/termosService.js');
const nova = (await o.listarOperacoes())[0];
const termo = await t.obterTermoPorOperacao(nova.id);
console.table({
  operacaoRetida: nova.status === 'aguardando_assinatura',
  etapaAssinaturaEmAndamento: nova.etapas[0].situacao === 'em_andamento',
  etapaEnviadaPendente: nova.etapas[1].situacao === 'pendente',
  termoPendente: termo.status === 'pendente',
  termoSemAssinatura: termo.assinatura === null,
  criadoPeloOperador: termo.criadoPor.papel === 'operador',
});
```

Esperado: as seis `true`. Depois volte para `usr-1`, contrate de novo e confirme `status === 'enviada'`, `etapas[0].situacao === 'concluida'` e `termo.status === 'assinado'`.

- [ ] **Step 4: Commit**

```bash
git add src/services/operacoesService.js src/components/Cedente/Contratacao/ContratacaoModal.jsx
git commit -m "feat: contratacao respeita alcada e cria termo pendente para operador"
```

---

### Task 7: Casca de Operações com abas e coluna de termo

**Files:**
- Create: `src/components/Cedente/Operacoes/OperacoesLista.jsx`
- Modify: `src/components/Cedente/Operacoes/Operacoes.jsx` (vira casca)

**Interfaces:**
- Consumes: `obterTermoPorOperacao`/`listarTermos` da Task 3, `contarPendentes` da Task 3.
- Produces: `Operacoes({ operacaoIdInicial, onNavegar })` — **mantenha exatamente esta assinatura**, é o que `src/App.jsx:259` passa hoje; `OperacoesLista({ onAbrirOperacao, onAbrirTermo })`.

- [ ] **Step 1: Mover a lista atual para OperacoesLista.jsx**

Criar `src/components/Cedente/Operacoes/OperacoesLista.jsx` com **todo** o conteúdo atual de `Operacoes.jsx` — filtros, colunas, CSV, estados — exceto o `Container`/`PageHeader`, que ficam na casca. Acrescentar a coluna de termo, depois de `status`:

```jsx
{
  key: 'termo',
  label: 'Termo',
  render: (linha) => {
    const termo = termosPorOperacao[linha.id];
    if (!termo) return <span style={{ color: 'var(--text-muted)' }}>—</span>;
    return (
      <button
        type="button"
        onClick={() => onAbrirTermo(termo.id)}
        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
        title="Ver na central de assinaturas"
      >
        <StatusBadge tom={TOM_STATUS_TERMO[termo.status]}>{STATUS_TERMO_LABEL[termo.status]}</StatusBadge>
      </button>
    );
  }
}
```

Carregue o índice uma vez, não um pedido por linha:

```jsx
const termos = useRequisicao(() => listarTermos(), []);
const termosPorOperacao = useMemo(
  () => Object.fromEntries((termos.dados || []).map((termo) => [termo.operacaoId, termo])),
  [termos.dados]
);
```

- [ ] **Step 2: Transformar Operacoes.jsx em casca**

```jsx
const Operacoes = ({ operacaoIdInicial, onNavegar }) => {
  const [aba, setAba] = useState('operacoes');
  const [operacaoAberta, setOperacaoAberta] = useState(operacaoIdInicial || null);
  const [termoDestacado, setTermoDestacado] = useState(null);
  const pendentes = useRequisicao(() => contarPendentes(), [aba]);

  if (operacaoAberta) {
    return <OperacaoDetalhe operacaoId={operacaoAberta} onVoltar={() => setOperacaoAberta(null)} />;
  }

  const abrirTermo = (termoId) => {
    setTermoDestacado(termoId);
    setAba('termos');
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Operações</h1>
          <p>Acompanhe cada antecipação contratada, do envio à liquidação.</p>
        </div>
      </PageHeader>

      <SegmentedControl
        value={aba}
        onChange={setAba}
        style={{ marginBottom: 16 }}
        options={[
          { value: 'operacoes', label: 'Operações' },
          {
            value: 'termos',
            label: pendentes.dados > 0 ? `Termos de cessão (${pendentes.dados})` : 'Termos de cessão'
          }
        ]}
      />

      {aba === 'operacoes' ? (
        <OperacoesLista onAbrirOperacao={setOperacaoAberta} onAbrirTermo={abrirTermo} />
      ) : (
        <TermosCessao
          termoDestacado={termoDestacado}
          onLimparDestaque={() => setTermoDestacado(null)}
          onAbrirOperacao={setOperacaoAberta}
        />
      )}
    </Container>
  );
};
```

O contador no rótulo da aba depende de `[aba]` de propósito: ao voltar da fila para a lista, ele recarrega e reflete o que acabou de ser assinado.

- [ ] **Step 3: Verificar que nada da lista regrediu**

```bash
npx eslint src/components/Cedente/Operacoes/
```

No navegador, em Operações:

```js
const linhas = document.querySelectorAll('table tbody tr').length;
const abas = [...document.querySelectorAll('[role=tab]')].map(b => b.innerText.trim());
console.table({
  duasAbas: abas.length === 2,
  abaTermosTemContador: /Termos de cessão \(\d+\)/.test(abas[1]),
  listaRenderizou: linhas > 0,
  temColunaTermo: /Termo/.test(document.querySelector('table thead').innerText),
  csvAindaExiste: [...document.querySelectorAll('button')].some(b => /Exportar CSV/.test(b.innerText)),
});
```

Esperado: as cinco `true`. Teste também os filtros de status e período e o CSV, que não devem ter mudado de comportamento.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cedente/Operacoes/
git commit -m "feat: Operacoes vira casca com abas e coluna de status do termo"
```

---

### Task 8: A fila de termos

**Files:**
- Create: `src/components/Cedente/Operacoes/TermosCessao.jsx`

**Interfaces:**
- Consumes: `listarTermos` de `../../../services/termosService`; `STATUS_TERMO_LABEL` de `../../../types/entities`; `TOM_STATUS_TERMO` e o default `StatusBadge` de `../../Common/StatusBadge`; `obterUsuarioAtual`, `podeAssinar`, `MOTIVO_SEM_ALCADA` de `../../../services/cadastroService`; `AssinaturaModal` da Task 9.
- Produces: `TermosCessao({ termoDestacado, onLimparDestaque, onAbrirOperacao })`

- [ ] **Step 1: Criar a fila**

Siga o padrão de `Recebiveis.jsx` para seleção múltipla: `useState(new Set())`, `alternarSelecao`, `alternarTodos`, faixa de seleção, e `Checkbox` do DS na coluna.

Requisitos que a tela tem de cumprir:

- Filtro por status (`Select` com `STATUS_TERMO_LABEL`), padrão `pendente` — é uma fila
- Colunas: seleção (só habilitada para `pendente`), `Termo` (id), `Operação` (link para `onAbrirOperacao`), `Títulos`, `Valor bruto`, `Valor líquido`, `Criado por`, `Status`, e para assinados o `Assinado por / em`
- `EmptyState` com `icone="file-check"`, título "Nenhum termo aguardando assinatura" quando o filtro é `pendente` e não há resultado
- `LoadingState` e `ErrorState` com retry, iguais às outras telas
- Botão `Assinar selecionados (N)`, desabilitado quando nada está selecionado
- Quando `!podeAssinar(usuario)`, o botão fica desabilitado e um `Alert kind="info"` exibe `MOTIVO_SEM_ALCADA`. A fila continua visível: esconder tornaria a regra invisível para quem ela restringe
- `termoDestacado` pré-seleciona aquela linha e a destaca com `var(--accent-soft-bg)`; chamar `onLimparDestaque()` na primeira interação do usuário

- [ ] **Step 2: Verificar como aprovador e como operador**

```bash
npx eslint src/components/Cedente/Operacoes/TermosCessao.jsx
```

Como aprovador, na aba Termos de cessão:

```js
const cbs = [...document.querySelectorAll('input[type=checkbox]')];
const botao = [...document.querySelectorAll('button')].find(b => /Assinar selecionados/.test(b.innerText));
console.table({
  filaTemPendentes: document.querySelectorAll('table tbody tr').length > 0,
  botaoExiste: !!botao,
  botaoDesabilitadoSemSelecao: botao.disabled === true,
  semAvisoDeAlcada: !/aprovador podem assinar/.test(document.body.innerText),
});
```

Marque um checkbox e confirme que `botao.disabled === false` e que o rótulo passa a `Assinar selecionados (1)`.

Depois, como operador (`await (await import('/src/services/cadastroService.js')).definirUsuarioAtual('usr-2')` e recarregue):

```js
const botao = [...document.querySelectorAll('button')].find(b => /Assinar selecionados/.test(b.innerText));
console.table({
  filaVisivelParaOperador: document.querySelectorAll('table tbody tr').length > 0,
  botaoBloqueado: botao.disabled === true,
  motivoVisivel: /aprovador podem assinar/.test(document.body.innerText),
});
```

Esperado: todas `true`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Cedente/Operacoes/TermosCessao.jsx
git commit -m "feat: fila de termos de cessao com selecao multipla e alcada"
```

---

### Task 9: Modal de assinatura, individual e em lote

**Files:**
- Create: `src/components/Cedente/Operacoes/AssinaturaModal.jsx`

**Interfaces:**
- Consumes: `TextoTermoCessao` da Task 5; `assinarTermos`, `definirAssinante` da Task 3; `CODIGO_2FA_SIMULADO` da Task 1.
- Produces: `AssinaturaModal({ termos, usuario, onFechar, onAssinado })`. `onAssinado({ assinados, falhas })` dispara o recarregamento da fila.

- [ ] **Step 1: Criar o modal**

Reaproveite a mecânica já validada do passo 2 do `ContratacaoModal`: caixa de termo com altura fixa, `onScroll` liberando o aceite com tolerância de 24px, e o `useEffect` que libera quando o conteúdo não gera rolagem. Sem esse segundo mecanismo o aceite trava esperando um evento que nunca vem.

Estrutura:

- Texto do termo **uma vez**, via `TextoTermoCessao`, com `valorBruto` e `quantidadeTitulos` somados do lote
- Abaixo, a lista das operações abrangidas (id, títulos, valor líquido) e o total — para lote de 1, a lista tem uma linha
- `Checkbox` de aceite, liberado após a rolagem
- `Input` de segundo fator, `maxLength={6}`, habilitado após o aceite, com a dica do código de demonstração
- Botão `Assinar` que chama `definirAssinante(usuario)` e depois `assinarTermos(ids, codigo)`

O tratamento do resultado é o ponto sensível:

```jsx
const assinar = async () => {
  setEnviando(true);
  try {
    definirAssinante(usuario);
    const { assinados, falhas } = await assinarTermos(termos.map((t) => t.id), codigo);

    if (assinados.length > 0 && falhas.length === 0) {
      toast.success(`${assinados.length} termo(s) assinado(s).`);
    } else if (assinados.length > 0) {
      // Lote parcial: o que passou está assinado e não se perde.
      toast.success(`${assinados.length} assinado(s), ${falhas.length} com problema.`);
    } else {
      toast.error(falhas[0]?.motivo || 'Nenhum termo pôde ser assinado.');
    }

    onAssinado({ assinados, falhas });
  } catch (falha) {
    toast.error(falha.message || 'Não foi possível assinar.');
  } finally {
    setEnviando(false);
  }
};
```

`onAssinado` é chamado mesmo em lote parcial, porque a fila precisa refletir os que foram assinados.

- [ ] **Step 2: Verificar individual, lote e código errado**

```bash
npx eslint src/components/Cedente/Operacoes/AssinaturaModal.jsx
```

Como aprovador, na fila, selecione **dois** pendentes e abra o modal:

```js
const dlg = document.querySelector('[role=dialog]');
const caixa = [...dlg.querySelectorAll('div')].find(el =>
  /TERMO DE CESS.O/.test(el.textContent) && el.scrollHeight > el.clientHeight + 20 && el.clientHeight < 400);
console.table({
  termoAparaceUmaVez: (dlg.innerText.match(/TERMO DE CESSÃO DE CRÉDITOS/g) || []).length === 1,
  listaDuasOperacoes: (dlg.innerText.match(/OP-2026-/g) || []).length === 2,
  aceiteBloqueadoAntesDeRolar: document.querySelector('[role=dialog] input[type=checkbox]').disabled === true,
});
caixa.scrollTop = caixa.scrollHeight;
caixa.dispatchEvent(new Event('scroll', { bubbles: true }));
await new Promise(r => setTimeout(r, 500));
console.log('aceite liberou:', !document.querySelector('[role=dialog] input[type=checkbox]').disabled);
```

Esperado: as três `true` e o aceite liberando após a rolagem.

Marque o aceite, digite `000000` e tente assinar: espere toast de erro e os termos **ainda pendentes** na fila. Depois com `123456`: os dois saem da fila, o contador da aba cai em 2, e a operação correspondente passa a `enviada`.

```js
const o = await import('/src/services/operacoesService.js');
const t = await import('/src/services/termosService.js');
const assinados = await t.listarTermos({ status: 'assinado' });
const ultimo = assinados[0];
const op = (await o.listarOperacoes()).find(x => x.id === ultimo.operacaoId);
console.table({
  evidenciaCompleta: !!ultimo.assinatura.hash && !!ultimo.assinatura.assinadoEm,
  assinadoPeloAprovador: ultimo.assinatura.assinadoPor.papel === 'aprovador',
  operacaoLiberada: op.status === 'enviada',
  etapaAssinaturaConcluida: op.etapas[0].situacao === 'concluida',
});
```

Esperado: as quatro `true`.

- [ ] **Step 3: Fazer a assinatura liberar a operação**

Se `operacaoLiberada` ou `etapaAssinaturaConcluida` vier `false`, falta o efeito no lado da operação. Acrescente em `src/services/operacoesService.js`:

```js
/** Chamado após a assinatura do termo: libera a operação para seguir o fluxo. */
export const liberarOperacaoAssinada = (operacaoId) =>
  request(() => {
    const operacao = base.find((item) => item.id === operacaoId);
    if (!operacao || operacao.status !== 'aguardando_assinatura') return;

    const agora = new Date().toISOString();
    operacao.status = 'enviada';
    operacao.etapas[0] = {
      nome: operacao.etapas[0].nome,
      situacao: 'concluida',
      dataHora: agora,
      evidenciaUrl: '#',
      evidenciaLabel: 'Termo assinado'
    };
    operacao.etapas[1] = {
      nome: operacao.etapas[1].nome,
      situacao: 'em_andamento',
      dataHora: agora,
      evidenciaUrl: '#',
      evidenciaLabel: 'Protocolo de envio'
    };
    operacao.titulos = operacao.titulos.map((titulo) => ({ ...titulo, status: 'Aguardando aceite' }));
  });
```

E chame para cada assinado, dentro do `assinar` do modal, antes de `onAssinado`:

```jsx
await Promise.all(assinados.map((termo) => liberarOperacaoAssinada(termo.operacaoId)));
```

Repita a verificação do Step 2.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cedente/Operacoes/AssinaturaModal.jsx src/services/operacoesService.js
git commit -m "feat: modal de assinatura de termo individual e em lote"
```

---

### Task 10: Seletor de papel para demonstração

A spec previa isto na TopBar. **Mudou:** a TopBar (`src/components/Layout/TopBar.jsx`) é legado acoplado ao Supabase (`supabase.auth.getSession()`, tabela `user_profile`) e é compartilhada por todos os outros portais — risco sacado, financiador, âncora. Mexer lá tem raio de impacto muito maior que o necessário. O seletor vai no header de Operações.

**Files:**
- Modify: `src/components/Cedente/Operacoes/Operacoes.jsx` (header da casca)

**Interfaces:**
- Consumes: `obterUsuarioAtual`, `definirUsuarioAtual`, `listarUsuariosParaTroca` da Task 1.

- [ ] **Step 1: Acrescentar o seletor ao header da casca**

No `PageHeader` de `Operacoes.jsx`, à direita:

```jsx
<div style={{ minWidth: 240 }}>
  <Select
    label="Atuando como (demonstração)"
    value={usuario?.id || ''}
    onChange={async (id) => {
      const novo = await definirUsuarioAtual(id);
      setUsuario(novo);
    }}
    options={(usuarios.dados || []).map((item) => ({
      value: item.id,
      label: `${item.nome} · ${item.papel}`
    }))}
  />
</div>
```

O rótulo diz "demonstração" explicitamente: é um controle de mock, não um recurso do produto, e sem essa marca alguém vai tomá-lo por troca de usuário de verdade.

- [ ] **Step 2: Verificar que a troca muda a alçada sem recarregar**

```bash
npx eslint src/components/Cedente/Operacoes/Operacoes.jsx
```

Em Operações, aba Termos de cessão, troque o seletor para Carlos Nakamura (operador):

```js
await new Promise(r => setTimeout(r, 600));
const botao = [...document.querySelectorAll('button')].find(b => /Assinar selecionados/.test(b.innerText));
console.table({
  bloqueouAoVirarOperador: botao.disabled === true,
  motivoAparaceu: /aprovador podem assinar/.test(document.body.innerText),
});
```

Volte para Mariana Andrade e confirme que o botão volta a habilitar com uma linha selecionada.

- [ ] **Step 3: Commit**

```bash
git add src/components/Cedente/Operacoes/Operacoes.jsx
git commit -m "feat: seletor de papel para demonstrar alcada em Operacoes"
```

---

## Verificação final

Depois da última tarefa:

- [ ] `npx eslint src/ 2>&1 | grep -cE "^\s+[0-9]+:[0-9]+"` e confirmar que o total do projeto não subiu acima de **877** mais os `react/prop-types` esperados dos componentes novos
- [ ] `npm run build:demo` conclui sem erro
- [ ] Percurso completo como operador: contratar → operação retida em `aguardando_assinatura` → aparece na fila como pendente
- [ ] Percurso completo como aprovador: assinar em lote → operações liberadas para `enviada` → contador da aba zera
- [ ] Home continua contando as `aguardando_assinatura` no card "em andamento"
- [ ] `localStorage.setItem('mockApiFailRate','1')` e conferir que a fila mostra `ErrorState` com retry; depois `localStorage.removeItem('mockApiFailRate')`
