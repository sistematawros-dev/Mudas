# Padrões de Uso - Design Tokens

Este guia documenta os padrões e melhores práticas para uso dos design tokens no sistema.

## Índice

1. [Princípios Fundamentais](#princípios-fundamentais)
2. [Hierarquia de Tokens](#hierarquia-de-tokens)
3. [Padrões por Categoria](#padrões-por-categoria)
4. [Estados Interativos](#estados-interativos)
5. [Dark Mode](#dark-mode)
6. [Acessibilidade](#acessibilidade)
7. [Exemplos Práticos](#exemplos-práticos)

---

## Princípios Fundamentais

### 1. Sempre use tokens semânticos
```css
/* ✅ Correto - Usa token semântico */
.alert {
  background: var(--bg-error);
  color: var(--color-error);
}

/* ❌ Evite - Usa token primitivo diretamente */
.alert {
  background: var(--danger-50);
  color: var(--danger-700);
}
```

### 2. Prefira tokens específicos sobre genéricos
```css
/* ✅ Correto - Token específico para o contexto */
.button--primary:hover {
  background: var(--primary-hover);
}

/* ❌ Evite - Token genérico */
.button--primary:hover {
  background: var(--blue-600);
}
```

### 3. Use tokens de espaçamento para consistência
```css
/* ✅ Correto - Usa escala de espaçamento */
.card {
  padding: var(--space-4);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

/* ❌ Evite - Valores arbitrários */
.card {
  padding: 18px;
  gap: 14px;
  margin-bottom: 28px;
}
```

---

## Hierarquia de Tokens

### Nível 1: Tokens Primitivos
Base do sistema. **Raramente usados diretamente** em componentes.

```css
/* Cores primitivas */
--blue-500: #0088cc;
--gray-200: #e5e7eb;
--success-600: #25a847;
```

**Quando usar:**
- Definir novos tokens semânticos
- Criar variações especiais muito específicas
- Debugging

### Nível 2: Tokens Semânticos
Significado contextual. **Use estes na maioria dos casos**.

```css
/* Tokens semânticos */
--primary: var(--blue-500);
--text: var(--gray-900);
--bg-success: var(--success-50);
```

**Quando usar:**
- Componentes gerais
- Estados padrão
- Fundos e bordas

### Nível 3: Tokens de Alias
Compatibilidade e conveniência. **Use para casos específicos**.

```css
/* Aliases */
--color-info: var(--primary);
--color-error: var(--danger);
```

**Quando usar:**
- Componentes de feedback (alerts, toasts)
- Estados de validação (erro, sucesso)
- Variantes específicas

---

## Padrões por Categoria

### Cores de Texto

```css
/* Hierarquia de leitura */
.heading {
  color: var(--text);              /* Texto principal */
}

.description {
  color: var(--text-secondary);    /* Texto secundário */
}

.caption {
  color: var(--text-tertiary);     /* Texto terciário */
}

/* Estados */
.link {
  color: var(--primary);           /* Links */
}

.link:hover {
  color: var(--primary-hover);     /* Link hover */
}

.error-message {
  color: var(--color-error);       /* Erro */
}

.success-message {
  color: var(--color-success);     /* Sucesso */
}
```

### Backgrounds

```css
/* Fundos principais */
.page {
  background: var(--background);   /* Fundo da página */
}

.card {
  background: var(--surface);      /* Superfície (cards, modais) */
}

.overlay {
  background: var(--overlay);      /* Overlay escuro */
}

/* Fundos de estado */
.info-box {
  background: var(--bg-info);      /* Fundo info */
}

.success-box {
  background: var(--bg-success);   /* Fundo sucesso */
}

.warning-box {
  background: var(--bg-warning);   /* Fundo warning */
}

.error-box {
  background: var(--bg-error);     /* Fundo erro */
}
```

### Bordas

```css
/* Bordas padrão */
.input {
  border: 1px solid var(--border); /* Borda padrão */
}

/* Bordas de estado */
.input:focus {
  border-color: var(--primary);    /* Foco */
}

.input--error {
  border-color: var(--color-error); /* Erro */
}

.input--success {
  border-color: var(--color-success); /* Sucesso */
}

/* Divisores */
.divider {
  border-top: 1px solid var(--border); /* Divisor */
}
```

### Sombras

```css
/* Elevação */
.card {
  box-shadow: var(--shadow-md);    /* Elevação média */
}

.modal {
  box-shadow: var(--shadow-xl);    /* Elevação alta */
}

.dropdown {
  box-shadow: var(--shadow-lg);    /* Elevação grande */
}

/* Focus ring */
.button:focus {
  box-shadow: var(--focus-ring);   /* Anel de foco */
}

.input:focus {
  box-shadow: var(--focus-ring-info); /* Anel azul */
}

.input--error:focus {
  box-shadow: var(--focus-ring-error); /* Anel vermelho */
}
```

---

## Estados Interativos

### Padrão de Estados

```css
/* Estado base */
.button {
  background: var(--primary);
  color: var(--white);
}

/* Hover */
.button:hover {
  background: var(--primary-hover);
}

/* Active/Pressed */
.button:active {
  background: var(--primary-active);
}

/* Focus */
.button:focus {
  box-shadow: var(--focus-ring);
}

/* Disabled */
.button:disabled {
  background: var(--gray-200);
  color: var(--gray-500);
  cursor: not-allowed;
}
```

### Estados com Alpha

Use tokens alpha para overlays e estados suaves:

```css
/* Hover suave em botões ghost */
.button--ghost:hover {
  background: var(--primary-alpha-sm); /* 5% de opacidade */
}

/* Seleção suave */
.list-item.is-selected {
  background: var(--primary-alpha-md); /* 10% de opacidade */
}

/* Background de erro suave */
.input--error {
  background: var(--danger-alpha-xs); /* 2.5% de opacidade */
}
```

---

## Dark Mode

### Padrão de Implementação

```css
/* Light mode (padrão) */
.component {
  background: var(--surface);      /* Branco */
  color: var(--text);              /* Cinza escuro */
  border: 1px solid var(--border); /* Cinza claro */
}

/* Dark mode */
.component--dark {
  background: var(--gray-800);     /* Cinza escuro */
  color: var(--white);             /* Branco */
  border: 1px solid var(--gray-700); /* Cinza médio */
}
```

### Tokens Específicos para Dark Mode

```css
/* Use tokens especiais quando necessário */
.badge--dark-mode {
  background: var(--gray-750);     /* Cinza intermediário */
  color: var(--gray-300);          /* Texto claro */
}

.alert--dark.alert--error {
  background: var(--danger-alpha-md);
  color: var(--danger-light);      /* Vermelho claro */
}
```

### Inverter Hierarquia

```css
/* Light mode */
.text-primary { color: var(--gray-900); }
.text-secondary { color: var(--gray-600); }
.text-tertiary { color: var(--gray-400); }

/* Dark mode - inverte a intensidade */
.dark .text-primary { color: var(--white); }
.dark .text-secondary { color: var(--gray-400); }
.dark .text-tertiary { color: var(--gray-600); }
```

---

## Acessibilidade

### Contraste de Cores

Garanta contraste mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande).

```css
/* ✅ Correto - Contraste suficiente */
.button--primary {
  background: var(--primary);      /* #0088cc */
  color: var(--white);             /* #ffffff - 4.52:1 */
}

/* ❌ Evite - Contraste insuficiente */
.button--soft {
  background: var(--blue-50);      /* Muito claro */
  color: var(--blue-200);          /* Contraste baixo */
}

/* ✅ Correção */
.button--soft {
  background: var(--bg-info);      /* #e1f4fd */
  color: var(--blue-700);          /* #004d73 - 7.8:1 */
}
```

### Focus Visível

Sempre forneça indicador de foco visível:

```css
/* ✅ Correto - Focus visível */
.button:focus {
  outline: none;
  box-shadow: var(--focus-ring); /* Anel de foco */
}

.input:focus {
  border-color: var(--primary);
  box-shadow: var(--focus-ring-info);
}

/* ❌ Evite - Remove foco sem alternativa */
.button:focus {
  outline: none; /* Sem indicador visual */
}
```

---

## Exemplos Práticos

### Componente de Card

```css
/* Card com todos os tokens corretos */
.card {
  /* Layout */
  padding: var(--space-4);
  border-radius: var(--radius-lg);

  /* Visual */
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);

  /* Estados */
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--gray-300);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text);
  margin-bottom: var(--space-2);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}
```

### Componente de Input com Estados

```css
/* Input com validação */
.input {
  /* Base */
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-base);
  border-radius: var(--radius-md);

  /* Visual */
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);

  /* Estados */
  transition: all 0.15s ease;
}

.input:hover {
  border-color: var(--gray-300);
}

.input:focus {
  border-color: var(--primary);
  box-shadow: var(--focus-ring-info);
  outline: none;
}

.input--error {
  border-color: var(--color-error);
  background: var(--danger-alpha-xs);
}

.input--error:focus {
  box-shadow: var(--focus-ring-error);
}

.input--success {
  border-color: var(--color-success);
}

.input--success:focus {
  box-shadow: var(--focus-ring-success);
}

.input:disabled {
  background: var(--gray-100);
  color: var(--text-tertiary);
  cursor: not-allowed;
}
```

### Badge com Variantes

```css
/* Badge base */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
}

/* Variantes filled */
.badge--primary {
  background: var(--primary);
  color: var(--white);
}

.badge--success {
  background: var(--color-success);
  color: var(--white);
}

.badge--error {
  background: var(--color-error);
  color: var(--white);
}

/* Variantes soft */
.badge--soft-primary {
  background: var(--primary-alpha-md);
  color: var(--primary);
}

.badge--soft-success {
  background: var(--bg-success);
  color: var(--success-700);
}

.badge--soft-error {
  background: var(--bg-error);
  color: var(--color-error-hover);
}

/* Variantes outline */
.badge--outline-primary {
  background: transparent;
  color: var(--primary);
  box-shadow: inset 0 0 0 1px var(--primary);
}
```

### Toast/Alert com Dark Mode

```css
/* Toast base */
.toast {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

/* Variantes light */
.toast--info {
  background: var(--bg-info);
  color: var(--blue-700);
  border-left: 4px solid var(--color-info);
}

.toast--success {
  background: var(--bg-success);
  color: var(--success-700);
  border-left: 4px solid var(--color-success);
}

.toast--warning {
  background: var(--bg-warning);
  color: var(--warning-700);
  border-left: 4px solid var(--color-warning);
}

.toast--error {
  background: var(--bg-error);
  color: var(--danger-700);
  border-left: 4px solid var(--color-error);
}

/* Dark mode */
.toast--dark.toast--info {
  background: var(--info-alpha-md);
  color: var(--blue-300);
  border-left-color: var(--blue-400);
}

.toast--dark.toast--success {
  background: var(--success-alpha-md);
  color: var(--success-300);
  border-left-color: var(--success-400);
}

.toast--dark.toast--error {
  background: var(--danger-alpha-md);
  color: var(--danger-300);
  border-left-color: var(--danger-400);
}
```

---

## Checklist de Boas Práticas

Ao criar ou modificar componentes, verifique:

- [ ] Usa tokens semânticos ao invés de primitivos
- [ ] Usa tokens de espaçamento (--space-*) ao invés de valores fixos
- [ ] Usa tokens de radius (--radius-*) para bordas arredondadas
- [ ] Usa tokens de sombra (--shadow-*) para elevação
- [ ] Todos os estados interativos têm tokens específicos (hover, active, focus)
- [ ] Focus ring está visível e usa token apropriado
- [ ] Dark mode está implementado com tokens corretos
- [ ] Contraste de cores está adequado (WCAG AA mínimo)
- [ ] Não há valores hardcoded de cores (#hex ou rgb())
- [ ] Usa alpha tokens para transparências

---

## Referências Rápidas

### Tokens Mais Comuns

```css
/* Cores */
--primary, --primary-hover, --primary-active
--text, --text-secondary, --text-tertiary
--background, --surface, --overlay
--border

/* Estados */
--color-info, --color-success, --color-warning, --color-error
--bg-info, --bg-success, --bg-warning, --bg-error

/* Espaçamento */
--space-1 (4px), --space-2 (8px), --space-3 (12px), --space-4 (16px)

/* Radius */
--radius-sm (4px), --radius-md (8px), --radius-lg (12px)

/* Sombras */
--shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
--focus-ring, --focus-ring-info, --focus-ring-error
```

---

**Última atualização:** Fevereiro 2025
**Total de tokens:** 175
**Componentes:** 32
