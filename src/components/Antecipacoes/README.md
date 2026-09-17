# Tela de Antecipações

## Descrição
A tela de Antecipações é responsável por gerenciar e visualizar todas as operações de antecipação de recebíveis da empresa. Esta tela oferece uma visão completa das operações realizadas, permitindo filtros avançados, busca e exportação de dados.

## Funcionalidades

### 📊 Indicadores Macro
- **Total de Operações**: Quantidade total de operações de antecipação realizadas
- **Valor Total**: Soma de todos os valores das operações
- **Total Pago**: Valor total das operações já liquidadas
- **Total Pendente**: Valor das operações ainda em aberto
- Cada indicador mostra a variação percentual em relação ao mês anterior

### 🔍 Filtros e Busca
- **Campo de Busca**: Permite buscar por CNPJ ou nome da âncora
- **Filtros Avançados**:
  - Status (Pago, Antecipado, Pendente)
  - Período (por mês/ano)
  - Âncora específica
  - Ordenação (data, valor, taxa)

### 📋 Tabela de Operações
A tabela principal apresenta todas as operações com as seguintes colunas:
- **Operação**: Status da operação com data
- **Âncora**: Nome e CNPJ da empresa âncora
- **Taxa Média**: Taxa percentual aplicada na operação
- **Valor Bruto**: Valor original da operação
- **Desconto**: Valor do desconto aplicado
- **IOF**: Valor do Imposto sobre Operações Financeiras
- **Valor Líquido**: Valor final após descontos e impostos
- **Ações**: Botão para ver detalhes da operação

### 🎨 Estados Visuais
- **Status com cores**:
  - Verde: Operações pagas
  - Azul: Operações antecipadas
  - Amarelo: Operações pendentes
- **Estado vazio**: Mensagem explicativa quando não há dados
- **Responsivo**: Layout adaptativo para diferentes tamanhos de tela

### 📤 Ações
- **Nova Antecipação**: Botão para criar uma nova operação
- **Exportar**: Funcionalidade para exportar dados (CSV/Excel)
- **Ver Detalhes**: Navegação para detalhes específicos de cada operação

## Estrutura de Componentes

```
Antecipacoes/
├── Antecipacoes.jsx         # Componente principal
└── index.js                 # Arquivo de exportação
```

## Tecnologias Utilizadas
- **React**: Framework principal
- **Styled Components**: Estilização dos componentes
- **Phosphor Icons**: Ícones utilizados na interface
- **JavaScript**: Formatação de valores e datas

## Dados Mock
A tela utiliza dados simulados para demonstração, incluindo:
- 7 operações de exemplo da ELDORADO BRASIL CELULOSE S/A
- Diferentes status (Pago/Antecipado)
- Valores variados para demonstrar funcionalidades
- Taxas realistas do mercado brasileiro

## Integração com Sistema
A tela está integrada ao sistema através de:
- **Roteamento**: Acessível via menu "Gestor de dívidas" > "Antecipações"
- **Layout**: Utiliza o layout padrão do sistema
- **Design System**: Segue as variáveis CSS e padrões visuais estabelecidos

## Navegação
1. Acesse **Gestor de dívidas** no menu lateral
2. Clique em **Antecipações**
3. A tela será exibida com todos os indicadores e operações
4. Use os filtros para refinar a visualização
5. Clique em "Ver detalhes" para acessar informações específicas

## Responsividade
- **Desktop**: Layout completo com 4 colunas de indicadores
- **Tablet**: Grid adaptativo com 2 colunas
- **Mobile**: Layout em coluna única com elementos empilhados

## Estados da Aplicação
- **Loading**: Indicadores visuais durante carregamento
- **Erro**: Tratamento de erros de comunicação
- **Vazio**: Mensagem quando não há operações
- **Filtrado**: Resultados baseados nos filtros aplicados

## Futuras Melhorias
- Integração com API real para dados dinâmicos
- Detalhamento individual de operações
- Gráficos de performance temporal
- Relatórios automatizados
- Notificações de vencimento
- Configuração de alertas personalizados
- Exportação em múltiplos formatos
- Filtros avançados por valor e prazo

## Dados de Exemplo
```javascript
{
  id: 1,
  operacao: 'Pago',
  ancoraNome: 'ELDORADO BRASIL CELULOSE S/A',
  ancoraDocumento: '07.401.436/0001-31',
  taxaMedia: 1.0324,
  valorBruto: 51935.65,
  desconto: 929.38,
  iof: 0.00,
  valorLiquido: 51006.27,
  dataOperacao: '2024-10-11',
  status: 'pago'
}
```

## Tratamento de Erros
- Validação de formulários
- Tratamento de APIs indisponíveis
- Fallback para dados offline
- Mensagens de erro amigáveis
- Logs para debugging
