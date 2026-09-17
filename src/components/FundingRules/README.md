# Gerenciamento de Regras de Funding

## Visão Geral

Esta funcionalidade permite gerenciar regras de funding baseadas em:
- **Fornecedor**: Nome do fornecedor para o qual a regra se aplica
- **Range de Valor**: Faixa de valores mínimos e máximos para aplicação da regra
- **Range de Vencimento**: Prazo de vencimento em dias (mínimo e máximo)

## Funcionalidades

### 1. Listagem de Regras
- Visualização de todas as regras cadastradas
- Informações exibidas: Fornecedor, Faixa de Valor, Prazo de Vencimento, Status e Data de Criação
- Indicadores visuais de status (Ativo/Inativo)

### 2. Criação de Nova Regra
- Modal com formulário completo
- Validações em tempo real
- Formatação automática de valores monetários
- Campos obrigatórios com validação

### 3. Edição de Regras
- Edição inline através de modal
- Preservação de dados existentes
- Validações mantidas

### 4. Exclusão de Regras
- Confirmação antes da exclusão
- Feedback visual após operação

## Estrutura do Banco de Dados

### Tabela: `funding_rules`

```sql
CREATE TABLE funding_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
  supplier_name VARCHAR(255) NOT NULL,
  value_range_min DECIMAL(15,2) NOT NULL DEFAULT 0,
  value_range_max DECIMAL(15,2) NOT NULL DEFAULT 0,
  due_date_range_min INTEGER NOT NULL DEFAULT 0, -- days
  due_date_range_max INTEGER NOT NULL DEFAULT 0, -- days
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);
```

## Componentes

### FundingRules.jsx
Componente principal que gerencia a listagem, criação, edição e exclusão de regras.

### FundingRuleModal.jsx
Modal responsável pelo formulário de criação/edição de regras.

## Validações

1. **Fornecedor**: Campo obrigatório, não pode estar vazio
2. **Faixa de Valores**: 
   - Valores mínimo e máximo obrigatórios
   - Valor mínimo deve ser menor que o valor máximo
3. **Prazo de Vencimento**:
   - Prazos mínimo e máximo obrigatórios
   - Prazo mínimo deve ser menor ou igual ao prazo máximo

## Formatação

- **Valores Monetários**: Formatação automática em Real (BRL)
- **Prazos**: Exibição em dias
- **Datas**: Formatação brasileira (dd/mm/aaaa)

## Navegação

A página está acessível através do menu lateral em:
**Configurações > Regras de Funding**

## Segurança

- Row Level Security (RLS) habilitado
- Políticas de acesso baseadas no `company_id`
- Apenas usuários da empresa podem visualizar/editar regras da própria empresa

## Próximos Passos

1. Executar a migração do banco de dados:
   ```bash
   npx supabase db push
   ```

2. Testar a funcionalidade criando algumas regras de exemplo

3. Integrar com outras funcionalidades do sistema (se necessário)

## Notas Técnicas

- Utiliza Tailwind CSS para estilização
- Integração com Supabase para persistência
- Toast notifications para feedback do usuário
- Responsivo para dispositivos móveis 