# Controle de assinaturas de termos de cessão

Data: 2026-09-16
Status: aprovado para planejamento

## Problema

O portal do cedente lista apenas 7 operações no mock, o que faz a tela de
Operações parecer vazia e deixa filtros e ordenação sem o que exercitar.

Mais grave: não existe nenhum controle sobre os termos de cessão. O
`ContratacaoModal` monta o texto do termo, coleta o aceite com segundo fator e
descarta tudo — não há entidade, serviço nem tela. O termo é o documento que
sustenta juridicamente a cessão do crédito, e hoje o cedente não tem como
saber o que foi assinado, por quem, quando, nem o que ainda falta assinar.

Também não existe a noção de alçada: qualquer pessoa que opera a tela contrata
e assina no mesmo ato, embora o cadastro já distinga os papéis `operador` e
`aprovador`.

## Objetivo

Uma central de pendências de assinatura dentro de Operações: o cedente vê os
termos aguardando assinatura, assina um ou vários de uma vez com segundo fator,
e consulta a evidência dos já assinados. A assinatura passa a respeitar alçada —
quem opera não assina.

Fora de escopo nesta fase: aditivos e retificações de termos já assinados,
assinatura pelo sacado ou pelo financiador, certificado digital ICP-Brasil,
geração de PDF do termo assinado.

## Decisões que moldam o desenho

Registradas com o porquê, porque cada uma foi uma bifurcação real.

**A central é uma fila de trabalho, não um arquivo.** O propósito primário é
agir — ver o que falta assinar e assinar. A consulta ao histórico assinado é
secundária e mora na mesma tela, atrás de filtro por status.

**A pendência nasce de alçada.** Um operador contrata e a operação nasce com
termo pendente; só o aprovador assina. Foi a origem escolhida entre as
alternativas (financiador enviando termo, contratação em lote, assinatura
sempre separada) e é a que aproveita os papéis que o cadastro já tem.

**A central vive dentro de Operações, em aba.** Não vira item de sidebar. O
pedido foi explicitamente "em operações", e termo e operação são 1:1 nesta
fase, então uma tela própria duplicaria filtros sem ganho.

**O operador vê a fila com o botão bloqueado.** Esconder a aba de quem não pode
assinar tornaria a regra de alçada invisível exatamente para quem ela
restringe. O bloqueio precisa explicar o motivo.

**Um aprovador que contrata continua assinando no ato.** Mandar o termo para a
própria fila seria burocracia sem propósito.

## Modelo de dados

### Entidade nova: `TermoCessao`

Coleção própria, com `termosService.js` como dono da sua `base` — mesmo padrão
de `recebiveisService` e `operacoesService`. A `Operacao` guarda apenas
`termoId`; a coluna de status em Operações faz o join. Guardar o status do
termo dentro da operação criaria duas fontes de verdade para o mesmo fato.

```js
/**
 * @typedef {'pendente'|'assinado'|'cancelado'} StatusTermo
 *
 * @typedef {Object} TermoCessao
 * @property {string} id                    TC-2026-0184
 * @property {string} operacaoId
 * @property {StatusTermo} status
 * @property {string} criadoEm              ISO completo
 * @property {{id: string, nome: string, papel: string}} criadoPor
 * @property {number} quantidadeTitulos     desnormalizado
 * @property {number} valorBruto            desnormalizado
 * @property {number} valorLiquido          desnormalizado
 * @property {AssinaturaTermo|null} assinatura
 *
 * @typedef {Object} AssinaturaTermo
 * @property {{id: string, nome: string, papel: string}} assinadoPor
 * @property {string} assinadoEm            ISO completo
 * @property {'aceite_eletronico_2fa'} metodo
 * @property {string} hash                  SHA-256 simulado do texto do termo
 * @property {string} ip                    simulado
 */
```

Os três campos desnormalizados existem para a fila renderizar sem carregar
cada operação. O preço é sincronia: são escritos uma vez, na criação do termo,
e as operações não alteram valor depois de contratadas.

### Estado novo na operação

Para a operação ficar retida até a assinatura, entra `aguardando_assinatura`
como primeiro `StatusOperacao`, e uma sexta etapa `Assinatura do termo` antes
de `Enviada`.

Isto altera interfaces que outros módulos consomem, e cada ponto precisa ser
atualizado junto:

| Arquivo | O que muda |
|---|---|
| `src/types/entities.js` | união `StatusOperacao`, `STATUS_OPERACAO_LABEL`, `ETAPAS_OPERACAO` (5 → 6) |
| `src/components/Common/StatusBadge.jsx` | `TOM_STATUS_OPERACAO` ganha o tom do novo status |
| `src/services/operacoesService.js` | `obterResumo` filtra status por lista literal; sem incluir o novo, a Home deixa de contar essas operações em "em andamento" |

Esse último é o risco silencioso do desenho: some da Home sem erro nenhum.

### Identidade do usuário

Não existe `usuarioAtual` em nenhum serviço, e a TopBar não mostra identidade.
Entra em `cadastroService`:

- `obterUsuarioAtual()` — inicia como `usr-1` (Mariana Andrade, `aprovador`)
- `definirUsuarioAtual(id)` — troca o papel ativo
- `podeAssinar(usuario)` — `usuario.papel === 'aprovador'`

Mais um seletor de papel na TopBar. Num portal de demonstração isso não é
enfeite: é o que permite exibir as duas metades da alçada.

## Fluxos

### Contratação por operador

O passo 2 do `ContratacaoModal` continua exibindo o termo e exigindo a rolagem
completa, mas sem checkbox de aceite e sem campo de segundo fator. O botão vira
`Enviar para assinatura`. Resultado: operação `aguardando_assinatura`, termo
`pendente`, etapa de assinatura `em_andamento`.

### Contratação por aprovador

Sem mudança visível: aceite, segundo fator, e a operação nasce `enviada` com
termo já `assinado` e a etapa `Assinatura do termo` já `concluida`, com a
evidência da assinatura feita no ato.

### Assinatura na central

1. Operações → aba `Termos de cessão`, com contador de pendentes
2. Seleção múltipla dos pendentes (mesmo padrão de seleção de Recebíveis)
3. `Assinar selecionados` abre o modal de assinatura: texto do termo com
   rolagem obrigatória, checkbox de aceite, segundo fator
4. Para seleção múltipla, o modal exibe **uma vez** o texto do termo — que é o
   mesmo instrumento para todos — seguido da lista das operações abrangidas com
   seus valores e do total do lote. Uma rolagem e um aceite cobrem o conjunto;
   repetir o texto por termo tornaria o lote inutilizável. A evidência, porém,
   é gravada individualmente em cada termo, com o seu próprio hash
5. Ao confirmar: cada termo vira `assinado` com evidência; cada operação passa
   a `enviada` com a etapa de assinatura concluída

### Assinatura em lote parcial

Os termos são assinados um a um, não em transação única. Se o terceiro falhar,
os dois primeiros permanecem assinados e o resultado reporta o que passou e o
que falhou. Um lote todo-ou-nada faria o cedente perder assinaturas válidas por
causa de um item problemático.

## Superfície

`Operacoes.jsx` (202 linhas) passa a ser uma casca com o `SegmentedControl` do
DS e duas irmãs:

- `OperacoesLista.jsx` — a tabela atual, mais uma coluna `Termo` com o status.
  Clicar troca para a aba da central já filtrada naquele termo, em vez de
  largar o usuário numa fila longa para procurar a linha de onde ele veio
- `TermosCessao.jsx` — a fila: filtro por status, seleção múltipla, ação de
  assinar, e para os assinados o detalhe da evidência
- `AssinaturaModal.jsx` — o aceite com segundo fator, individual ou em lote

### Texto do termo compartilhado

O texto está embutido no JSX do `ContratacaoModal`. Extrair para
`src/domain/termoCessao.jsx`, consumido pela contratação e pela central. Sem
isso, o termo assinado na central seria uma cópia que divergiria do assinado na
contratação — e é o documento que tem valor jurídico no fluxo.

## Estados de erro

| Situação | Comportamento |
|---|---|
| Fila sem pendências | `EmptyState`, apontando que não há nada a assinar |
| Segundo fator inválido | toast de erro; modal permanece aberto (igual hoje) |
| Operador tenta assinar | botão desabilitado, com o motivo visível |
| Termo já assinado em outra sessão | serviço rejeita e a fila recarrega |
| Operação recusada | termo vira `cancelado` e sai da fila |
| Falha de rede simulada | `ErrorState` com retry, padrão `useRequisicao` |

## Mock

De 7 para cerca de 24 operações, cobrindo os seis status mais
`aguardando_assinatura`, incluindo casos que só aparecem em volume: recusada
com motivo, liquidada antiga e aditivo com sufixo `-B`. Termos
correspondentes — alguns pendentes para a fila ter conteúdo, a maioria assinada
com evidência completa.

## Verificação

O projeto não tem suíte de testes (`package.json` expõe apenas `lint`), então:

- `npx eslint` nos arquivos tocados, comparando contra a linha de base de 45
  erros pré-existentes de `react/prop-types` e `no-unused-vars`
- percurso no browser nos dois papéis: como operador, contratar e confirmar que
  a operação fica retida e o botão de assinar aparece bloqueado; como
  aprovador, assinar individual e em lote e confirmar a transição de status, a
  evidência e o contador da aba
- conferir que a Home continua contando as operações `aguardando_assinatura` em
  "em andamento"

## Dívida conhecida que este trabalho não resolve

`src/lib/supabase.js:12` lê `VITE_SUPABASE_SERVICE_ROLE` no código do cliente.
No modo demo os valores são vazios e nada vaza, mas um build conectado
publicaria no bundle uma chave que ignora RLS. Não é escopo deste design;
registrado para não se perder.
