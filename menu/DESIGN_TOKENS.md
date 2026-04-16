# 🎨 Design Tokens - TawrosNew Design System

> Sistema de tokens semânticos para consistência visual e manutenibilidade

## 📖 Índice

- [Visão Geral](#visão-geral)
- [Estrutura](#estrutura)
- [Tokens Disponíveis](#tokens-disponíveis)
  - [Cores](#cores)
  - [Escalas Semânticas](#escalas-semânticas)
  - [Hover States](#hover-states)
  - [Opacidades](#opacidades)
  - [Alphas](#alphas)
  - [Surface](#surface)
  - [Content](#content)
  - [Border](#border)
  - [Overlay](#overlay)
  - [Focus](#focus)
  - [Shadows](#shadows)
  - [States](#states)
  - [Spacing](#spacing)
  - [Radius](#radius)
  - [Typography](#typography)
- [Como Usar](#como-usar)
- [Dark Mode](#dark-mode)

---

## Visão Geral

O Design System TawrosNew utiliza **175 tokens CSS** organizados semanticamente para garantir:

- ✅ **Consistência visual** em todos os componentes
- ✅ **Manutenibilidade** facilitada (alterar cores globalmente)
- ✅ **Dark mode** completo e nativo
- ✅ **Acessibilidade** com escalas otimizadas (WCAG AA)
- ✅ **Escalabilidade** para novos componentes

---

## Estrutura

```
Primitivos (Base)
    ↓
Semânticos (Propósito)
    ↓
Componentes (Uso)
```

**Hierarquia:**
1. **Primitivos** - Valores brutos (#hex, rgba)
2. **Semânticos** - Tokens com significado (--color-success, --gray-500)
3. **Aliases** - Compatibilidade (--primary, --text)

---

## Tokens Disponíveis

### 🎨 Cores

#### **Grays Scale** (11 tokens)
```css
--gray-900: #111820;  /* Mais escuro */
--gray-800: #3a4554;
--gray-750: #2a3440;  /* Dark mode hover */
--gray-700: #4e5968;
--gray-600: #6b7a8c;
--gray-500: #8593a3;  /* Textos muted */
--gray-400: #a8b5c4;
--gray-300: #b0b8c1;  /* Borders hover */
--gray-200: #d4dce6;
--gray-100: #e9eaec;
--gray-50: #f2f3f3;   /* Mais claro */
```

#### **Blues Scale (Primary)** (10 tokens)
```css
--blue-900: #0a3a5c;
--blue-800: #0b5cab;  /* Primary base */
--blue-700: #1068b8;
--blue-600: #0068ab;
--blue-500: #00b4f0;  /* Info base */
--blue-400: #60a5fa;  /* Dark mode accent */
--blue-300: #7dd4f7;
--blue-200: #bfdbfe;
--blue-100: #baeafc;
--blue-50: #e4f4fb;
```

#### **Brand Colors** (7 tokens)
```css
--color-brand: #00b4f0;
--color-primary: #0b5cab;
--color-info: #00b4f0;
--color-success: #34c759;
--color-warning: #f4b740;
--color-error: #e04938;
--color-danger: #e04938;  /* Alias para error */
```

---

### 🔄 Escalas Semânticas

#### **Success Scale** (7 tokens)
```css
--success-800: #0a3817;  /* Texto dark */
--success-700: #0c451b;  /* Texto padrão */
--success-600: #25a847;
--success-400: #22c55e;  /* Base */
--success-300: #9ae6b4;  /* Dark mode badges */
--success-200: #c6f6d5;
--success-100: #e4f5eb;  /* Background subtle */
```

#### **Warning Scale** (7 tokens)
```css
--warning-800: #744210;
--warning-700: #866000;  /* Texto padrão */
--warning-600: #d69e2e;
--warning-400: #eab308;  /* Base */
--warning-300: #fde68a;  /* Dark mode badges */
--warning-200: #fef3c7;
--warning-100: #fdf6e4;  /* Background subtle */
```

#### **Danger/Error Scale** (8 tokens)
```css
--danger-800: #822727;
--danger-700: #a3292f;   /* Texto padrão */
--danger-600: #c53030;
--danger-400: #ef4444;   /* Base */
--danger-300: #fc8181;   /* Dark mode badges */
--danger-200: #fed7d7;
--danger-100: #fbe4e4;   /* Background subtle */
--danger-light: #f87171; /* Dark mode input/dropdown */
```

#### **Info Scale** (7 tokens)
```css
--info-800: #075985;
--info-700: #028aca;   /* Texto padrão */
--info-600: #0284c7;
--info-400: #00b4f0;   /* Base */
--info-300: #90cdf4;   /* Dark mode badges */
--info-200: #bee3f8;
--info-100: #e4f4fb;   /* Background subtle */
```

#### **Primary Scale** (4 tokens)
```css
--primary-700: #064974;
--primary-600: #0968b0;
--primary-500: #0b7ac7;  /* Dark mode accents */
--primary-100: #baeafc;
```

---

### ⚡ Hover States (7 tokens)

```css
--color-primary-hover: #0a3a5c;
--color-info-hover: #00a3d9;
--color-success-hover: #2db350;
--color-warning-hover: #e5a93a;
--color-error-hover: #c93c2d;
--color-danger-hover: #c93c2d;
--color-dark-hover: #2d2545;
```

**Uso:**
```css
.btn--success:hover {
  background: var(--color-success-hover);
}
```

---

### 👻 Opacidades

#### **White Opacities** (20 tokens)
```css
--opacity-white-95: rgba(255, 255, 255, 0.95);
--opacity-white-90: rgba(255, 255, 255, 0.9);
--opacity-white-85: rgba(255, 255, 255, 0.85);
/* ... até 0.05 */
```

#### **Black Opacities** (20 tokens)
```css
--opacity-black-95: rgba(0, 0, 0, 0.95);
--opacity-black-90: rgba(0, 0, 0, 0.9);
--opacity-black-70: rgba(0, 0, 0, 0.7);
/* ... até 0.05 */
```

---

### 🌈 Alphas (Transparências Coloridas)

```css
/* Primary */
--primary-alpha-xl: rgba(11, 92, 171, 0.25);
--primary-alpha-lg: rgba(11, 92, 171, 0.2);
--primary-alpha-md: rgba(11, 92, 171, 0.12);
--primary-alpha-sm: rgba(11, 92, 171, 0.1);
--primary-alpha-xs: rgba(11, 92, 171, 0.05);

/* Info */
--info-alpha-md: rgba(0, 180, 240, 0.2);
--info-alpha-sm: rgba(0, 180, 240, 0.15);
--info-alpha-xs: rgba(0, 180, 240, 0.1);

/* Success */
--success-alpha-md: rgba(52, 199, 89, 0.25);
--success-alpha-sm: rgba(52, 199, 89, 0.15);
--success-alpha-xs: rgba(52, 199, 89, 0.05);

/* Danger */
--danger-alpha-lg: rgba(224, 73, 56, 0.25);
--danger-alpha-md: rgba(224, 73, 56, 0.15);
--danger-alpha-sm: rgba(224, 73, 56, 0.1);
--danger-alpha-xs: rgba(224, 73, 56, 0.05);
--danger-alpha-light: rgba(248, 113, 113, 0.1);

/* Warning */
--warning-alpha-md: rgba(244, 183, 64, 0.2);
--warning-alpha-sm: rgba(244, 183, 64, 0.1);
--warning-alpha-xs: rgba(244, 183, 64, 0.05);
```

---

### 📦 Surface (25 tokens)

```css
/* Base */
--color-surface-base: var(--white);
--color-surface-primary: #ffffff;
--color-surface-secondary: #f2f3f3;
--color-surface-background: #f7f8f8;
--color-surface-disabled: #eaebec;

/* Interactive States */
--color-surface-hover: var(--gray-100);
--color-surface-press: var(--gray-200);
--color-surface-selected: var(--primary-alpha-sm);
--color-surface-selected-hover: var(--primary-alpha-md);

/* Components */
--color-surface-elevated: var(--white);
--color-surface-card: var(--white);
--color-surface-dropdown: var(--white);
--color-surface-modal: var(--white);
--color-surface-tooltip: var(--gray-900);
--color-surface-toast: var(--white);

/* Dark Mode */
--color-surface-dark-base: var(--gray-800);
--color-surface-dark-elevated: var(--gray-800);
--color-surface-dark-hover: var(--gray-700);
--color-surface-dark-press: var(--gray-600);
--color-surface-dark-selected: var(--info-alpha-sm);
--color-surface-dark-selected-hover: var(--info-alpha-md);

/* Backdrop */
--color-surface-backdrop: var(--opacity-black-50);
--color-surface-backdrop-light: var(--opacity-black-30);
--color-surface-backdrop-dark: var(--opacity-black-70);
```

---

### 📝 Content (16 tokens)

```css
/* Base */
--color-content-base: #18191a;
--color-content-primary: #18191a;
--color-content-secondary: #61676b;
--color-content-tertiary: #a8b5c4;
--color-content-disabled: rgba(0, 0, 0, 0.3);

/* Inverted */
--color-content-inverted: var(--white);
--color-content-inverted-subtle: var(--opacity-white-70);
--color-content-inverted-muted: var(--opacity-white-50);
--color-content-invert-disabled: rgba(255, 255, 255, 0.4);

/* On Colors */
--color-content-on-primary: var(--white);
--color-content-on-success: var(--white);
--color-content-on-danger: var(--white);
--color-content-on-error: #ffe9e6;
--color-content-on-warning: var(--gray-900);
--color-content-on-info: var(--white);
--color-content-on-brand: #eff9ff;
```

---

### 🔲 Border (17 tokens)

```css
/* Base */
--color-border-default: rgba(0, 0, 0, 0.15);
--color-border-primary: rgba(0, 0, 0, 0.15);
--color-border-secondary: rgba(0, 0, 0, 0.2);
--color-border-subtle: rgba(0, 0, 0, 0.1);
--color-border-strong: rgba(0, 0, 0, 0.2);
--color-border-disabled: rgba(0, 0, 0, 0.05);
--color-border-divider: rgba(0, 0, 0, 0.1);

/* Interactive States */
--color-border-hover: var(--gray-300);
--color-border-focus: var(--color-primary);

/* Dark Mode */
--color-border-dark-default: var(--gray-700);
--color-border-dark-subtle: var(--gray-800);
--color-border-dark-strong: var(--gray-600);
--color-border-dark-hover: var(--gray-600);
```

---

### 🎭 Overlay (7 tokens)

```css
/* Interactive States */
--color-overlay-hover: var(--overlay-white-sm);
--color-overlay-press: var(--overlay-white-md);
--color-overlay-focus: var(--overlay-white-xs);

/* Dark Mode */
--color-overlay-dark-hover: var(--overlay-black-sm);
--color-overlay-dark-press: var(--overlay-black-md);

/* Loading States */
--color-overlay-loading-light: var(--opacity-white-70);
--color-overlay-loading-dark: var(--opacity-black-70);
```

---

### 🎯 Focus (7 tokens)

```css
/* Focus Rings (3px outline offset) */
--color-focus-ring-primary: var(--info-alpha-xs);
--color-focus-ring-success: var(--success-alpha-xs);
--color-focus-ring-danger: var(--danger-alpha-sm);
--color-focus-ring-warning: var(--warning-alpha-xs);
--color-focus-ring-info: var(--info-alpha-xs);

/* Focus Outline & Border */
--color-focus-outline: var(--color-primary);
--color-focus-border: var(--color-primary);
```

**Uso:**
```css
.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--color-focus-ring-primary);
}
```

---

### 🌑 Shadows (9 tokens)

```css
/* Shadow Base Scale */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md: 0 10px 30px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.15);

/* Component Specific */
--shadow-card: var(--shadow-sm);
--shadow-button: var(--shadow-sm);
--shadow-dropdown: var(--shadow-lg);
--shadow-modal: var(--shadow-xl);
--shadow-tooltip: var(--shadow-md);
```

---

### ✅ States (24 tokens)

```css
/* Success */
--color-state-success-bg: var(--success-alpha-sm);
--color-state-success-bg-hover: var(--success-alpha-md);
--color-state-success-bg-subtle: var(--success-alpha-xs);
--color-state-success-border: var(--color-success);
--color-state-success-text: var(--success-700);
--color-state-success-subdued: rgba(26, 147, 56, 0.1);

/* Error/Danger */
--color-state-error-bg: var(--danger-alpha-md);
--color-state-error-bg-hover: var(--danger-alpha-lg);
--color-state-error-bg-subtle: var(--danger-alpha-sm);
--color-state-error-border: var(--color-error);
--color-state-error-text: var(--danger-700);
--color-state-error-subdued: rgba(220, 43, 35, 0.1);

/* Warning */
--color-state-warning-bg: var(--warning-alpha-sm);
--color-state-warning-bg-hover: var(--warning-alpha-md);
--color-state-warning-bg-subtle: var(--warning-alpha-xs);
--color-state-warning-border: var(--color-warning);
--color-state-warning-text: var(--warning-700);
--color-state-warning-subdued: rgba(231, 157, 19, 0.1);

/* Info */
--color-state-info-bg: var(--info-alpha-sm);
--color-state-info-bg-hover: var(--info-alpha-md);
--color-state-info-bg-subtle: var(--info-alpha-xs);
--color-state-info-border: var(--color-info);
--color-state-info-text: var(--info-700);
--color-state-info-subdued: rgba(3, 174, 253, 0.1);
```

---

### 📏 Spacing (15 tokens)

```css
--space-1: 4px;    /* 0.25rem */
--space-2: 8px;    /* 0.5rem */
--space-3: 12px;   /* 0.75rem */
--space-4: 16px;   /* 1rem */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem */
--space-8: 32px;   /* 2rem */
--space-10: 40px;  /* 2.5rem */
--space-12: 48px;  /* 3rem */
--space-14: 56px;  /* 3.5rem */
--space-16: 64px;  /* 4rem */
--space-20: 80px;  /* 5rem */
--space-24: 96px;  /* 6rem */
--space-28: 112px; /* 7rem */
--space-36: 144px; /* 9rem */
```

---

### 🔘 Radius (12 tokens)

```css
--radius-none: 0;
--radius-3xs: 2px;    /* Micro elements */
--radius-2xs: 4px;    /* Buttons, inputs */
--radius-xs: 8px;     /* Cards, panels */
--radius-sm: 8px;     /* Compatibility */
--radius-md: 16px;    /* Modals, large cards */
--radius-lg: 16px;    /* Compatibility */
--radius-xl: 24px;    /* Large containers */
--radius-2xl: 32px;   /* Extra large */
--radius-3xl: 48px;   /* Hero elements */
--radius-4xl: 64px;   /* Maximum */
--radius-full: 100px; /* Circular */
--radius-pill: 500px; /* Full rounded */
```

---

### 📰 Typography (20+ tokens)

```css
/* Font Families */
--font-family-body: 'Inter', sans-serif;
--font-family-heading: 'Inter', sans-serif;
--font-family-mono: 'IBM Plex Mono', monospace;

/* Font Sizes - Body */
--font-size-2xs: 11px;
--font-size-xs: 12px;
--font-size-s: 14px;
--font-size-m: 16px;
--font-size-l: 18px;
--font-size-xl: 24px;

/* Font Sizes - Heading */
--font-size-2xl: 28px;
--font-size-3xl: 38px;
--font-size-4xl: 46px;
--font-size-hero: 68px;

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

---

## Como Usar

### ✅ Correto

```css
/* Usar tokens semânticos */
.button {
  background: var(--color-primary);
  color: var(--color-content-on-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}

.button:hover {
  background: var(--color-primary-hover);
}

.button:focus {
  box-shadow: 0 0 0 3px var(--color-focus-ring-primary);
}
```

### ❌ Incorreto

```css
/* Não usar valores hardcoded */
.button {
  background: #0b5cab;
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 12px 16px;
}
```

---

## Dark Mode

O Design System suporta dark mode nativamente através de tokens específicos:

```css
/* Light Mode */
.component {
  background: var(--color-surface-base);
  color: var(--color-content-primary);
  border-color: var(--color-border-default);
}

/* Dark Mode */
.component--dark {
  background: var(--color-surface-dark-base);
  color: var(--gray-100);
  border-color: var(--color-border-dark-default);
}

/* Alphas funcionam em ambos os modos */
.component--selected {
  background: var(--info-alpha-sm); /* Funciona em light e dark */
}
```

---

## 📊 Estatísticas

- **175 tokens totais**
- **134 tokens únicos em uso**
- **0 valores hardcoded**
- **32 componentes** usando tokens
- **100% cobertura** de componentes

---

## 🔗 Links Úteis

- [Padrões de Uso](./USAGE_PATTERNS.md)
- [Guia de Contribuição](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

---

**Última atualização:** 2024
**Versão:** 1.0.0
