import input from '../../components/input/input.js';

// Icons
const icons = {
  user: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-2.5 2.5-4 6-4s6 1.5 6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  mail: `<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M1 4l7 5 7-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  calendar: `<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  link: `<svg viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5L9.5 6.5M7 11l-1.5 1.5a2.12 2.12 0 01-3-3L4 8M9 5l1.5-1.5a2.12 2.12 0 013 3L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

export function init() {
  // States
  document.getElementById('input-states').innerHTML = `
    ${input.create({ label: 'Label', placeholder: 'Placeholder' })}
    ${input.create({ label: 'Label', value: 'Filled value' })}
    ${input.create({ label: 'Label', placeholder: 'Disabled', disabled: true })}
    ${input.create({ label: 'Label', value: 'Readonly', readonly: true })}
  `;

  // Sizes
  document.getElementById('input-sizes').innerHTML = `
    ${input.create({ label: 'Small', placeholder: 'Placeholder', size: 'sm' })}
    ${input.create({ label: 'Medium', placeholder: 'Placeholder', size: 'md' })}
    ${input.create({ label: 'Large', placeholder: 'Placeholder', size: 'lg' })}
  `;

  // With Icons
  document.getElementById('input-icons').innerHTML = `
    ${input.create({ label: 'Left Icon', placeholder: 'Digite seu nome', iconLeft: icons.user })}
    ${input.create({ label: 'Right Icon', placeholder: 'Selecione uma data', iconRight: icons.calendar })}
    ${input.createSearch({ label: 'Search', placeholder: 'Pesquisar...' })}
  `;

  // With Prefix/Suffix
  document.getElementById('input-addons').innerHTML = `
    ${input.create({ label: 'Website', placeholder: 'seusite', prefix: 'https://' })}
    ${input.create({ label: 'Preço', placeholder: '0.00', prefix: 'R$', suffix: 'BRL' })}
  `;

  // Validation States
  document.getElementById('input-validation').innerHTML = `
    <div class="form-stack">
      ${input.create({ label: 'Campo inválido', value: 'valor inválido', error: 'Este campo é obrigatório' })}
      ${input.create({ label: 'Campo válido', value: 'valor@valido.com', success: 'Email válido!' })}
    </div>
    <div class="form-stack">
      ${input.create({ label: 'Com Helper', placeholder: 'Digite algo', helper: 'Texto de ajuda opcional' })}
      ${input.create({ label: 'Com Contador', placeholder: 'Mensagem curta', maxLength: 100, showCounter: true })}
    </div>
  `;

  // Textarea
  document.getElementById('input-textarea').innerHTML = `
    ${input.createTextarea({ label: 'Descrição', placeholder: 'Digite sua mensagem...', rows: 4 })}
    ${input.createTextarea({ label: 'Com contador', placeholder: 'Digite sua bio...', maxLength: 200, showCounter: true, rows: 4 })}
  `;

  // Select
  document.getElementById('input-select').innerHTML = `
    ${input.createSelect({
      label: 'Categoria',
      placeholder: 'Selecione...',
      items: [
        { label: 'Opção 1', value: '1' },
        { label: 'Opção 2', value: '2' },
        { label: 'Opção 3', value: '3' },
      ],
    })}
    ${input.createSelect({
      label: 'Status',
      value: '2',
      items: [
        { label: 'Ativo', value: '1' },
        { label: 'Inativo', value: '2' },
        { label: 'Pendente', value: '3' },
      ],
    })}
  `;

  // Special Inputs
  document.getElementById('input-special').innerHTML = `
    ${input.createPassword({ label: 'Senha', placeholder: 'Digite sua senha' })}
    ${input.create({ label: 'Email', type: 'email', placeholder: 'seu@email.com', iconLeft: icons.mail })}
    ${input.create({ label: 'URL', type: 'url', placeholder: 'https://exemplo.com', iconLeft: icons.link })}
  `;

  // Light Mode
  document.getElementById('input-light').innerHTML = `
    <div class="form-stack">
      ${input.create({ label: 'Nome', placeholder: 'Digite seu nome', required: true })}
      ${input.create({ label: 'Email', type: 'email', placeholder: 'seu@email.com' })}
      ${input.createSelect({
        label: 'Status',
        items: [
          { label: 'Ativo', value: 'active' },
          { label: 'Inativo', value: 'inactive' },
        ],
      })}
      ${input.createTextarea({ label: 'Mensagem', placeholder: 'Digite sua mensagem...', rows: 3 })}
    </div>
  `;

  // Dark Mode
  document.getElementById('input-dark').innerHTML = `
    <div class="form-stack">
      ${input.create({ label: 'Nome', placeholder: 'Digite seu nome', required: true, dark: true })}
      ${input.create({ label: 'Email', type: 'email', placeholder: 'seu@email.com', dark: true })}
      ${input.createSelect({
        label: 'Status',
        dark: true,
        items: [
          { label: 'Ativo', value: 'active' },
          { label: 'Inativo', value: 'inactive' },
        ],
      })}
      ${input.createTextarea({ label: 'Mensagem', placeholder: 'Digite sua mensagem...', rows: 3, dark: true })}
    </div>
  `;

  // Initialize interactions
  input.init(document);
}
