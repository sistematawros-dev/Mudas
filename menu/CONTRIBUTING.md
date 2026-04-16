# Guia de Contribuição - Design System

Bem-vindo ao guia de contribuição! Este documento explica como contribuir para o design system mantendo consistência e qualidade.

## Índice

1. [Antes de Começar](#antes-de-começar)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Criando Novos Componentes](#criando-novos-componentes)
4. [Adicionando Novos Tokens](#adicionando-novos-tokens)
5. [Modificando Componentes Existentes](#modificando-componentes-existentes)
6. [Padrões de Código](#padrões-de-código)
7. [Testando Suas Alterações](#testando-suas-alterações)
8. [Processo de Review](#processo-de-review)

---

## Antes de Começar

### Leia a Documentação

Familiarize-se com:
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - Referência completa de todos os tokens
- [USAGE_PATTERNS.md](./USAGE_PATTERNS.md) - Padrões e melhores práticas

### Configure o Ambiente

```bash
# Clone o repositório
git clone <url-do-repo>
cd TawrosNew

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Regras de Ouro

1. **Nunca use valores hardcoded** - Sempre use design tokens
2. **Siga a hierarquia de tokens** - Prefira semânticos sobre primitivos
3. **Pense em dark mode** - Todos os componentes devem suportar tema escuro
4. **Garanta acessibilidade** - Contraste, foco, navegação por teclado
5. **Mantenha consistência** - Siga os padrões existentes

---

## Estrutura do Projeto

```
TawrosNew/
├── src/
│   ├── styles/
│   │   ├── tokens.css          # Design tokens (NÃO mexer sem revisão)
│   │   ├── reset.css           # CSS reset
│   │   └── base.css            # Estilos base
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.css      # Estilos do componente
│   │   │   ├── button.js       # Lógica do componente
│   │   │   └── index.html      # Exemplos/showcase
│   │   ├── badge/
│   │   ├── input/
│   │   └── ...                 # 32 componentes
│   └── main.js                 # Entry point
├── DESIGN_TOKENS.md            # Documentação de tokens
├── USAGE_PATTERNS.md           # Padrões de uso
└── CONTRIBUTING.md             # Este arquivo
```

### Convenções de Nomenclatura

**Arquivos:**
- Componentes: `component-name/component-name.css`
- Use kebab-case para nomes de arquivos
- Um componente por diretório

**Classes CSS:**
- Componente base: `.component-name`
- Modificador: `.component-name--modifier`
- Elemento: `.component-name-element`
- Estado: `.component-name.is-state`

```css
/* Exemplo */
.button { }                    /* Base */
.button--primary { }           /* Modificador */
.button--lg { }                /* Modificador de tamanho */
.button-icon { }               /* Elemento filho */
.button.is-loading { }         /* Estado */
```

---

## Criando Novos Componentes

### Passo 1: Planejamento

Antes de criar código, responda:

1. **O componente já existe?** Verifique se não há componente similar
2. **Quais variantes são necessárias?** (primary, secondary, sizes, states)
3. **Precisa de dark mode?** (Resposta: SIM, sempre!)
4. **Quais tokens vou precisar?** Liste os tokens que vai usar
5. **É acessível?** Pense em foco, contraste, ARIA

### Passo 2: Estrutura de Arquivos

Crie a estrutura do componente:

```bash
mkdir src/components/my-component
touch src/components/my-component/my-component.css
touch src/components/my-component/my-component.js
touch src/components/my-component/index.html
```

### Passo 3: Template Base

Use este template como ponto de partida:

**my-component.css:**
```css
/**
 * My Component
 * Breve descrição do que o componente faz
 */

/* ===== BASE ===== */

.my-component {
  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);

  /* Typography */
  font-size: var(--text-base);
  font-weight: 500;

  /* Visual */
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text);

  /* Interaction */
  cursor: pointer;
  transition: all 0.15s ease;
}

.my-component:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
}

.my-component:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--focus-ring);
}

.my-component:active {
  background: var(--gray-100);
}

.my-component:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ===== VARIANTS ===== */

.my-component--primary {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

.my-component--primary:hover {
  background: var(--primary-hover);
}

/* ===== SIZES ===== */

.my-component--sm {
  padding: var(--space-2);
  font-size: var(--text-sm);
}

.my-component--lg {
  padding: var(--space-4);
  font-size: var(--text-lg);
}

/* ===== ELEMENTS ===== */

.my-component-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-component-icon svg {
  width: 100%;
  height: 100%;
}

/* ===== DARK MODE ===== */

.my-component--dark {
  background: var(--gray-800);
  border-color: var(--gray-700);
  color: var(--white);
}

.my-component--dark:hover {
  background: var(--gray-700);
  border-color: var(--gray-600);
}

.my-component--dark:focus {
  box-shadow: var(--focus-ring);
}
```

**my-component.js:**
```javascript
/**
 * My Component
 * Lógica e interações do componente
 */

export class MyComponent {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      // Opções padrão
      variant: 'default',
      size: 'md',
      disabled: false,
      ...options
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    if (this.options.disabled) {
      event.preventDefault();
      return;
    }

    // Lógica do componente
  }

  destroy() {
    // Cleanup
    this.element.removeEventListener('click', this.handleClick);
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.my-component').forEach(el => {
    new MyComponent(el);
  });
});
```

**index.html:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Component - Showcase</title>
  <link rel="stylesheet" href="../../styles/tokens.css">
  <link rel="stylesheet" href="../../styles/reset.css">
  <link rel="stylesheet" href="./my-component.css">
</head>
<body style="padding: 2rem; background: var(--background);">

  <h1 style="margin-bottom: 2rem; color: var(--text);">My Component</h1>

  <!-- Default -->
  <section style="margin-bottom: 2rem;">
    <h2 style="color: var(--text); margin-bottom: 1rem;">Default</h2>
    <div class="my-component">
      My Component
    </div>
  </section>

  <!-- Variants -->
  <section style="margin-bottom: 2rem;">
    <h2 style="color: var(--text); margin-bottom: 1rem;">Variants</h2>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <div class="my-component">Default</div>
      <div class="my-component my-component--primary">Primary</div>
    </div>
  </section>

  <!-- Sizes -->
  <section style="margin-bottom: 2rem;">
    <h2 style="color: var(--text); margin-bottom: 1rem;">Sizes</h2>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="my-component my-component--sm">Small</div>
      <div class="my-component">Medium</div>
      <div class="my-component my-component--lg">Large</div>
    </div>
  </section>

  <!-- States -->
  <section style="margin-bottom: 2rem;">
    <h2 style="color: var(--text); margin-bottom: 1rem;">States</h2>
    <div style="display: flex; gap: 1rem;">
      <div class="my-component">Normal</div>
      <div class="my-component" disabled>Disabled</div>
    </div>
  </section>

  <!-- Dark Mode -->
  <section style="margin-bottom: 2rem;">
    <h2 style="color: var(--text); margin-bottom: 1rem;">Dark Mode</h2>
    <div style="background: #1a1a1a; padding: 2rem; border-radius: 8px;">
      <div class="my-component my-component--dark">Dark Mode</div>
    </div>
  </section>

  <script type="module" src="./my-component.js"></script>
</body>
</html>
```

### Passo 4: Checklist de Qualidade

Antes de considerar o componente pronto, verifique:

- [ ] Usa apenas design tokens (zero valores hardcoded)
- [ ] Tem variantes necessárias (primary, secondary, etc)
- [ ] Tem tamanhos (sm, md, lg)
- [ ] Todos os estados interativos (hover, focus, active, disabled)
- [ ] Focus ring visível e acessível
- [ ] Dark mode implementado
- [ ] Contraste de cores adequado (WCAG AA)
- [ ] Navegação por teclado funciona
- [ ] Responsivo em diferentes tamanhos de tela
- [ ] Documentação no index.html com exemplos
- [ ] Código comentado onde necessário

---

## Adicionando Novos Tokens

### Quando Adicionar Novos Tokens?

Adicione novos tokens quando:

1. **Padrão se repete** - Você usa o mesmo valor em 3+ lugares
2. **Valor semântico** - O valor tem significado contextual (ex: "erro", "sucesso")
3. **Variação necessária** - Precisa de variação para dark mode
4. **Escala incompleta** - Falta um valor intermediário em uma escala existente

### NÃO Adicione Tokens Se:

- É usado em apenas 1-2 lugares específicos
- Já existe token equivalente
- É muito específico para um único componente

### Processo de Adição

**1. Identifique a categoria correta:**

```css
/* tokens.css é organizado em seções: */

/* 1. Primitivos - cores base */
/* 2. Escalas de cinza */
/* 3. Escalas de cor (blue, green, yellow, red) */
/* 4. Semânticos - significado contextual */
/* 5. Aliases - compatibilidade */
/* 6. Opacidades e alphas */
/* 7. Surface, content, border */
/* 8. Estados (hover, active, focus) */
/* 9. Sombras */
/* 10. Espaçamento */
/* 11. Radius */
/* 12. Typography */
```

**2. Nomeie consistentemente:**

```css
/* Primitivos: --{color}-{weight} */
--blue-500: #0088cc;
--gray-300: #b0b8c1;

/* Semânticos: --{purpose} ou --{purpose}-{variant} */
--primary: var(--blue-500);
--text-secondary: var(--gray-600);

/* Estados: --{element}-{state} */
--primary-hover: #007ab8;
--primary-active: #006ba1;

/* Backgrounds: --bg-{purpose} */
--bg-success: var(--success-50);
--bg-error: var(--danger-50);

/* Alphas: --{color}-alpha-{size} */
--primary-alpha-sm: rgba(0, 136, 204, 0.05);
--danger-alpha-md: rgba(220, 38, 38, 0.1);
```

**3. Adicione na seção correta com comentário:**

```css
/* ===== COLOR SCALES ===== */

/* Blue Scale */
--blue-50: #e1f4fd;
--blue-100: #b3e5fb;
/* ... */
--blue-500: #0088cc;  /* Primary brand color */
/* ... */
--blue-900: #002842;
```

**4. Documente o uso:**

Adicione ao DESIGN_TOKENS.md na seção apropriada:

```markdown
### Novo Token

**`--my-new-token`**
- **Valor:** `#0088cc`
- **Uso:** Descrição de quando usar
- **Exemplo:** `.component { color: var(--my-new-token); }`
```

### Pull Request para Novos Tokens

Ao criar PR para adicionar tokens, inclua:

1. **Justificativa** - Por que o token é necessário
2. **Uso esperado** - Onde será usado (componentes)
3. **Alternativas consideradas** - Tokens existentes que não atendem
4. **Dark mode** - Variação para tema escuro se aplicável
5. **Exemplos** - Screenshots ou código mostrando uso

---

## Modificando Componentes Existentes

### Pequenas Mudanças

Para mudanças simples (correção de bugs, ajustes de estilo):

1. Identifique o arquivo do componente
2. Faça a alteração usando tokens existentes
3. Teste em light e dark mode
4. Verifique acessibilidade
5. Abra PR com descrição clara

### Mudanças Significativas

Para refatorações ou novas features:

1. **Abra uma issue primeiro** - Discuta a mudança
2. **Mantenha retrocompatibilidade** - Não quebre código existente
3. **Documente mudanças** - Atualize exemplos se necessário
4. **Considere migração** - Se quebrar API, forneça guia de migração

### Checklist de Modificação

- [ ] Mudança usa apenas design tokens
- [ ] Não quebra componentes existentes
- [ ] Dark mode continua funcionando
- [ ] Acessibilidade mantida ou melhorada
- [ ] Exemplos atualizados (index.html)
- [ ] Testado em diferentes browsers

---

## Padrões de Código

### CSS

**Ordem de Propriedades:**

```css
.component {
  /* 1. Posicionamento */
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;

  /* 2. Box Model */
  display: flex;
  width: 100%;
  height: 40px;
  padding: var(--space-3);
  margin: var(--space-2);

  /* 3. Typography */
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1.5;
  text-align: center;

  /* 4. Visual */
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text);
  box-shadow: var(--shadow-sm);

  /* 5. Interaction */
  cursor: pointer;
  transition: all 0.15s ease;
}
```

**Evite:**

```css
/* ❌ Valores hardcoded */
.component {
  padding: 12px;
  color: #333333;
  background: rgba(0, 136, 204, 0.1);
}

/* ❌ !important */
.component {
  color: var(--text) !important;
}

/* ❌ IDs para estilo */
#component {
  color: var(--text);
}

/* ❌ Seletores muito específicos */
.page .container .component .element .icon {
  color: var(--text);
}
```

**Prefira:**

```css
/* ✅ Design tokens */
.component {
  padding: var(--space-3);
  color: var(--text);
  background: var(--primary-alpha-md);
}

/* ✅ Classes simples */
.component { }
.component-element { }
.component--variant { }
```

### JavaScript

**Convenções:**

```javascript
// Use ES6+ features
const myComponent = document.querySelector('.my-component');

// Destructuring
const { variant, size } = options;

// Arrow functions
const handleClick = (event) => {
  // ...
};

// Template literals
const html = `
  <div class="component ${variant}">
    ${content}
  </div>
`;
```

**Evite:**

```javascript
// ❌ var
var component = document.querySelector('.component');

// ❌ Manipulação direta do DOM sem controle
element.innerHTML = userInput; // XSS vulnerability

// ❌ Poluir escopo global
window.myFunction = function() { };
```

### Comentários

**Bons comentários:**

```css
/* ===== SECTION HEADER ===== */

/* Specific explanation why this is needed */
.component {
  /* z-index: 100 needed to overlap modal backdrop */
  z-index: 100;
}
```

**Evite:**

```css
/* ❌ Comentários óbvios */
.component {
  /* Set color to text color */
  color: var(--text);
}
```

---

## Testando Suas Alterações

### Testes Manuais

**1. Visual:**
- [ ] Componente renderiza corretamente
- [ ] Todas as variantes funcionam
- [ ] Todos os tamanhos funcionam
- [ ] Estados interativos (hover, focus, active) funcionam
- [ ] Dark mode funciona

**2. Funcionalidade:**
- [ ] JavaScript funciona sem erros
- [ ] Event listeners funcionam
- [ ] Animações/transições suaves
- [ ] Sem vazamento de memória (destroy/cleanup)

**3. Responsividade:**
```bash
# Teste em diferentes viewports
- Mobile (320px, 375px, 425px)
- Tablet (768px, 1024px)
- Desktop (1440px, 1920px)
```

**4. Navegação por Teclado:**
- [ ] Tab navega entre elementos
- [ ] Enter/Space ativa ações
- [ ] Esc fecha modais/dropdowns
- [ ] Focus visível em todos os estados

**5. Acessibilidade:**
```bash
# Use ferramentas:
- Chrome DevTools Lighthouse
- axe DevTools
- WAVE
```

Verifique:
- [ ] Contraste de cores (WCAG AA mínimo 4.5:1)
- [ ] Atributos ARIA corretos
- [ ] Labels e descrições presentes
- [ ] Ordem de tabulação lógica

### Testes de Tokens

**Validar que não há valores hardcoded:**

```bash
# Buscar por hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/components/my-component/

# Buscar por rgb/rgba
grep -r "rgb\|rgba" src/components/my-component/

# Buscar por valores de pixel arbitrários (exceto 0, 1px borders)
grep -r "[0-9]\{2,\}px" src/components/my-component/
```

Se encontrar resultados, substitua por tokens apropriados.

### Browsers Suportados

Teste em:
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (última versão)
- [ ] Edge (última versão)

---

## Processo de Review

### Antes de Abrir PR

1. **Auto-review:**
   - Revise seu próprio código linha por linha
   - Remova console.logs, código comentado desnecessário
   - Verifique formatação e indentação
   - Confirme que segue todos os padrões

2. **Teste completo:**
   - Execute todos os testes manuais acima
   - Verifique que não há regressões em outros componentes
   - Teste em diferentes browsers

3. **Documentação:**
   - Atualize DESIGN_TOKENS.md se adicionou tokens
   - Atualize exemplos (index.html) se mudou API
   - Adicione comentários onde necessário

### Abrindo o PR

**Template de PR:**

```markdown
## Descrição

Breve descrição do que foi alterado e por quê.

## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Componentes Afetados

- `component-name`
- `other-component` (se aplicável)

## Tokens Adicionados/Modificados

- `--new-token`: Descrição e justificativa
- `--modified-token`: O que mudou e por quê

## Checklist

- [ ] Usa apenas design tokens (zero hardcoded values)
- [ ] Dark mode funciona corretamente
- [ ] Acessibilidade verificada (contraste, foco, teclado)
- [ ] Testado em Chrome, Firefox, Safari, Edge
- [ ] Responsivo em mobile, tablet, desktop
- [ ] Exemplos atualizados (index.html)
- [ ] Documentação atualizada se necessário

## Screenshots

### Light Mode
![image](url)

### Dark Mode
![image](url)

## Observações Adicionais

Qualquer contexto adicional ou decisões importantes.
```

### Durante o Review

**Respondendo a feedback:**

1. Seja receptivo a sugestões
2. Explique decisões quando necessário
3. Faça mudanças solicitadas prontamente
4. Marque conversas como resolvidas após corrigir

**Aprovação:**

PRs precisam de aprovação de pelo menos um maintainer antes de merge.

---

## Dicas e Truques

### Atalhos de Desenvolvimento

```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

### Debug de Tokens

```javascript
// Ver todos os tokens computados
const styles = getComputedStyle(document.documentElement);
const primary = styles.getPropertyValue('--primary');
console.log('Primary color:', primary);

// Ver todas as variáveis CSS
Array.from(document.styleSheets)
  .flatMap(sheet => Array.from(sheet.cssRules))
  .flatMap(rule => Array.from(rule.style))
  .filter(prop => prop.startsWith('--'));
```

### Ferramentas Úteis

- **VS Code Extensions:**
  - CSS Var Complete - Autocomplete para CSS variables
  - Color Highlight - Destaca cores
  - axe Accessibility Linter

- **Browser DevTools:**
  - Chrome: Lighthouse para acessibilidade
  - Firefox: Accessibility Inspector
  - Safari: Responsive Design Mode

### Recursos

- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Tricks](https://css-tricks.com/)
- [A11y Project](https://www.a11yproject.com/)

---

## Perguntas Frequentes

### Posso usar preprocessor CSS (Sass, Less)?

Não. O projeto usa CSS vanilla com custom properties. Isso mantém:
- Zero build steps para desenvolvimento
- Melhor performance
- Compatibilidade máxima
- Facilidade de debug

### Posso adicionar dependências JavaScript?

Evite quando possível. O projeto é vanilla JS por design. Dependências devem ser:
- Absolutamente necessárias
- Pequenas (<10kb)
- Bem mantidas
- Aprovadas por maintainers

### Como lidar com browser support?

Use features modernas (CSS Grid, Flexbox, Custom Properties). Browsers suportados:
- Chrome/Edge: últimas 2 versões
- Firefox: últimas 2 versões
- Safari: últimas 2 versões

### Preciso testar em IE11?

Não. IE11 não é suportado.

### Como reportar bugs?

Abra uma issue com:
1. Descrição do bug
2. Passos para reproduzir
3. Comportamento esperado vs atual
4. Screenshots se aplicável
5. Browser e versão

---

## Agradecimentos

Obrigado por contribuir para o design system! Suas contribuições ajudam a criar uma melhor experiência para todos os usuários.

Se tiver dúvidas, abra uma issue ou discussão no repositório.

**Happy coding! 🚀**

---

**Última atualização:** Fevereiro 2025
**Versão do guia:** 1.0
