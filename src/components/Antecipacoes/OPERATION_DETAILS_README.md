# Componente OperationDetails - Detalhes da Operação de Antecipação

## Descrição
O componente `OperationDetails` é responsável por exibir informações detalhadas de uma operação de antecipação específica. Ele segue o padrão de design da aplicação e apresenta as informações de forma organizada e visualmente atraente.

## Funcionalidades

### 💰 Valor Principal
- **Destaque do Valor**: Exibe o valor líquido recebido em destaque
- **Status Visual**: Badge colorido indicando o status da operação (Pago, Antecipado, Pendente)
- **Ícone Representativo**: Ícone de moeda para identificação rápida

### 📋 Informações Organizadas
As informações são divididas em cards organizados:

#### 🏢 Informações Gerais
- Status da operação
- Nome e CNPJ da âncora
- Datas (operação, emissão, vencimento, pagamento)
- Número de parcelas

#### 💸 Valores Financeiros
- Taxa média oferecida
- Taxa mensal aplicada
- Desconto da taxa
- Valor bruto
- Desconto aplicado
- IOF
- Valor líquido final

#### 🏦 Conta Bancária
- Banco destinatário
- Agência
- Número da conta

### 📄 Notas Fiscais
- **Tabela Detalhada**: Lista todas as notas fiscais relacionadas à operação
- **Informações por Nota**: Número, vencimento, taxa, valores bruto e líquido
- **Contador de Registros**: Mostra quantas notas estão envolvidas

## Estrutura Visual

### Layout Responsivo
- **Desktop**: Layout em grid de duas colunas para as informações
- **Mobile**: Layout em coluna única para melhor visualização

### Elementos de Design
- **Cards Brancos**: Informações organizadas em cards com bordas sutis
- **Hierarquia Visual**: Títulos, subtítulos e valores bem definidos
- **Cores Consistentes**: Segue o padrão de cores da aplicação
- **Espaçamento**: Espaçamentos consistentes entre elementos

## Navegação

### Botão Voltar
- **Posicionamento**: Canto superior esquerdo
- **Funcionalidade**: Retorna para a lista de antecipações
- **Visual**: Ícone de seta + texto "Voltar"

## Dados Utilizados

### Informações Principais
```javascript
{
  id: 1,
  valorLiquido: 44783.06,
  status: 'pago',
  operacao: 'Pago',
  ancoraNome: 'ELDORADO BRASIL CELULOSE S/A',
  ancoraDocumento: '07.405.439/0001-31',
  dataOperacao: '2024-10-11',
  // ... outros campos
}
```

### Dados Bancários
- Banco: 341 - ITAÚ UNIBANCO S.A
- Agência: 2900
- Conta: 75409-4

### Notas Fiscais
- Nota #94804
- Vencimento: 18/09/2024
- Valores detalhados

## Integração

### Como Usar
```jsx
import OperationDetails from './components/Antecipacoes/OperationDetails';

<OperationDetails 
  operation={selectedOperation} 
  onBack={handleBackToList}
/>
```

### Props
- `operation`: Objeto com dados da operação selecionada
- `onBack`: Função callback para voltar à lista

## Estados Visuais

### Status da Operação
- **Pago**: Verde - operação finalizada com sucesso
- **Antecipado**: Azul - valor antecipado ao cliente
- **Pendente**: Amarelo - aguardando processamento

### Formatação de Dados
- **Moeda**: Formato brasileiro (R$ 1.234,56)
- **Percentual**: 4 casas decimais (1.0328 %)
- **Datas**: Formato brasileiro (DD/MM/AAAA)

## Responsividade

### Breakpoints
- **Desktop**: Grid de 2 colunas para cards de informações
- **Tablet**: Layout adaptativo
- **Mobile**: Layout em coluna única

### Ajustes Visuais
- Redução de espaçamentos em telas menores
- Reorganização de elementos para melhor legibilidade
- Manutenção da hierarquia visual

## Acessibilidade

### Elementos Semânticos
- Uso correto de headings (h1, h2, h3)
- Estrutura de tabela acessível
- Labels descritivas

### Interatividade
- Botões com títulos descritivos
- Hover states para feedback visual
- Foco visível para navegação por teclado

## Futuras Melhorias

### Funcionalidades
- **Exportação**: PDF ou Excel dos detalhes da operação
- **Histórico**: Timeline de mudanças de status
- **Documentos**: Upload/download de documentos relacionados
- **Comunicação**: Log de comunicações sobre a operação

### Integrações
- **API Real**: Conexão com backend para dados dinâmicos
- **Notificações**: Alertas sobre mudanças de status
- **Auditoria**: Rastreamento de alterações
- **Relatórios**: Geração automática de relatórios

### UX/UI
- **Animações**: Transições suaves entre estados
- **Loading States**: Indicadores de carregamento
- **Error Handling**: Tratamento de erros amigável
- **Tooltips**: Informações adicionais em hover
