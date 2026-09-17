# Tela Risco Sacado

## Descrição
A tela **Risco Sacado** foi desenvolvida para acompanhar indicadores de risco e operações de antecipação de recebíveis, fornecendo uma visão completa e detalhada do portfolio de clientes.

## Funcionalidades

### 📊 Indicadores Macro
- **Total Disponível**: Mostra o valor total disponível para antecipação
- **Total em Aprovação**: Valores que estão em processo de aprovação
- **Total Antecipado**: Valores já antecipados no período
- Cada indicador mostra a variação percentual em relação ao mês anterior

### 📈 Dashboard
- **Gráfico de Valores por Mês**: Visualização de 13 meses com:
  - Valores a receber (barras azuis)
  - Valores antecipados (barras verdes)
- **Top 5 Fornecedores**: Lista dos maiores fornecedores por valor recebido, incluindo:
  - Nome do fornecedor
  - Percentual do total
  - Valor em reais

### 👥 Clientes com Operações de Antecipação
Apresenta cards dos clientes em formato de grid responsivo, cada card contém:

#### Informações do Cliente
- Nome do fornecedor
- Status (Ativo, Pendente, Inativo)
- Data da última operação

#### Indicadores Visuais
- **Barra de Utilização**: Mostra o percentual de utilização do limite
  - Verde/Azul: Utilização normal (< 70%)
  - Amarelo: Utilização alta (70-90%)
  - Vermelho: Utilização crítica (> 90%)

#### Valores
- **Valor Disponível**: Limite total para antecipação
- **Valor Antecipado**: Valor já utilizado

#### Ações
- **Ver Detalhes**: Abre detalhes completos do cliente
- **Nova Operação**: Inicia uma nova operação de antecipação

### 🔍 Filtros e Busca
- **Campo de Busca**: Permite buscar clientes por nome
- **Filtro por Status**: Filtra clientes por status (Todos, Ativo, Pendente, Inativo)

## Estrutura de Componentes

```
RiscoSacado/
├── RiscoSacado.jsx       # Componente principal
├── ClientCard.jsx        # Card individual do cliente
└── index.js             # Arquivo de exportação
```

## Tecnologias Utilizadas
- **React**: Framework principal
- **Styled Components**: Estilização dos componentes
- **Recharts**: Biblioteca para gráficos
- **Phosphor Icons**: Ícones utilizados na interface

## Dados Mock
A tela utiliza dados simulados para demonstração:
- 6 clientes de exemplo
- 13 meses de dados históricos
- 5 principais fornecedores
- Indicadores macro calculados

## Responsividade
A tela é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- **Desktop**: Grid de 3 colunas para indicadores, layout lado a lado para dashboard
- **Tablet**: Grid de 2 colunas, layout empilhado
- **Mobile**: Layout em coluna única

## Navegação
A tela pode ser acessada através do menu lateral, dentro da seção "Gestor de dívidas" > "Risco Sacado".

## Futuras Melhorias
- Integração com API real para dados dinâmicos
- Exportação de relatórios em PDF/Excel
- Configuração de alertas por utilização
- Histórico detalhado de operações
- Filtros avançados por período e valor
