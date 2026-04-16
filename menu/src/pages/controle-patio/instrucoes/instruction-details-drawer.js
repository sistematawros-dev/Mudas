import * as Button from '../../../components/button/button.js';
import * as Drawer from '../../../components/drawer/drawer.js';

const DRAWER_ID = 'patio-instructions-detail-drawer';

const calendarIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="1.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M2.5 6.25H13.5M5 1.75V4.5M11 1.75V4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
`;

const locationIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 13.5C8 13.5 11.5 10.25 11.5 6.75C11.5 4.67893 9.82107 3 7.75 3C5.67893 3 4 4.67893 4 6.75C4 10.25 8 13.5 8 13.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="7.75" cy="6.75" r="1.5" stroke="currentColor" stroke-width="1.5"/>
  </svg>
`;

const carrierIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 4.5H8.75V10.75H2.5V4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M8.75 6.5H11L12.75 8.25V10.75H8.75V6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="4.5" cy="11.5" r="1" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="10.75" cy="11.5" r="1" stroke="currentColor" stroke-width="1.5"/>
  </svg>
`;

const fileIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 2.5H9L11.5 5V13C11.5 13.5523 11.0523 14 10.5 14H5.5C4.94772 14 4.5 13.5523 4.5 13V3.5C4.5 2.94772 4.94772 2.5 5.5 2.5H5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M9 2.75V5H11.25" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M6.25 7.25H9.75M6.25 9.25H9.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
`;

function createDrawerButton(buttonHtml, dataAction, extraClass = '') {
  let result = buttonHtml.replace('<button ', `<button data-instruction-detail-action="${dataAction}" `);
  if (extraClass) {
    result = result.replace('class="btn', `class="${extraClass} btn`);
  }
  return result;
}

function renderField(label, value, options = {}) {
  const icon = options.icon ? `<span class="patio-instructions-detail-drawer__field-icon">${options.icon}</span>` : '';
  const valueClass = options.strong ? ' patio-instructions-detail-drawer__field-value--strong' : '';

  return `
    <div class="patio-instructions-detail-drawer__field${options.compact ? ' patio-instructions-detail-drawer__field--compact' : ''}">
      <span class="patio-instructions-detail-drawer__field-label">${label}</span>
      <span class="patio-instructions-detail-drawer__field-value${valueClass}">${icon}<span>${value}</span></span>
    </div>
  `;
}

function renderDocuments(documents = []) {
  return documents.map((documentName) => `
    <div class="patio-instructions-detail-drawer__document-item">
      <span class="patio-instructions-detail-drawer__document-icon">${fileIcon}</span>
      <span class="patio-instructions-detail-drawer__document-name">${documentName}</span>
    </div>
  `).join('');
}

function renderBody(item) {
  return `
    <div class="patio-instructions-detail-drawer">
      <div class="patio-instructions-detail-drawer__meta">
        <span class="patio-instructions-detail-drawer__meta-icon">${calendarIcon}</span>
        <span>${item.createdAtDetailed}</span>
      </div>

      <section class="patio-instructions-detail-drawer__section">
        <h3 class="patio-instructions-detail-drawer__section-title">Dados Cadastrais</h3>
        <div class="patio-instructions-detail-drawer__card patio-instructions-detail-drawer__card--stacked">
          ${renderField('Vendedor / Produtor', item.producer, { strong: true })}
          ${renderField('', item.producerDocument, { compact: true })}
          <div class="patio-instructions-detail-drawer__divider"></div>
          ${renderField('Comprador', item.buyer, { strong: true })}
        </div>
      </section>

      <section class="patio-instructions-detail-drawer__section">
        <h3 class="patio-instructions-detail-drawer__section-title">Logística & Carga</h3>
        <div class="patio-instructions-detail-drawer__card patio-instructions-detail-drawer__card--logistics">
          <div class="patio-instructions-detail-drawer__grid patio-instructions-detail-drawer__grid--top">
            ${renderField('Unidade de Retirada', item.branch, { icon: locationIcon, strong: true })}
            ${renderField('Produto', item.productName, { strong: true })}
          </div>
          <div class="patio-instructions-detail-drawer__transport-card">
            <div class="patio-instructions-detail-drawer__transport-name">
              <span class="patio-instructions-detail-drawer__field-icon">${carrierIcon}</span>
              <span>${item.carrier}</span>
            </div>
            <div class="patio-instructions-detail-drawer__grid patio-instructions-detail-drawer__grid--bottom">
              ${renderField('Blocos', item.blocks, { strong: true, compact: true })}
              ${renderField('Quantidade', item.quantityLabel, { strong: true, compact: true })}
            </div>
          </div>
        </div>
      </section>

      <section class="patio-instructions-detail-drawer__section">
        <div class="patio-instructions-detail-drawer__section-head">
          <h3 class="patio-instructions-detail-drawer__section-title patio-instructions-detail-drawer__section-title--caps">Documentos Anexados</h3>
          ${createDrawerButton(Button.create({ text: 'Adicionar', variant: 'primary', style: 'outline', size: 'sm', iconLeft: 'plus' }), 'add-document', 'patio-instructions-detail-drawer__add-btn')}
        </div>
        <div class="patio-instructions-detail-drawer__documents">
          ${renderDocuments(item.documents)}
        </div>
      </section>
    </div>
  `;
}

function renderFooter() {
  return `
    <div class="patio-instructions-detail-drawer__footer-actions">
      ${createDrawerButton(Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline', size: 'sm' }), 'cancel')}
      ${createDrawerButton(Button.create({ text: 'Aprovar', variant: 'success', size: 'sm' }), 'approve')}
    </div>
  `;
}

export function initInstructionDetailsDrawer(options = {}) {
  const { onPrimaryAction = null } = options;

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  document.body.insertAdjacentHTML('beforeend', Drawer.create({
    id: DRAWER_ID,
    title: 'Detalhes',
    width: 408,
    content: '',
    footer: '',
  }));

  const controls = Drawer.init({
    id: DRAWER_ID,
    root: document,
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) {
    return { open: () => {}, close: () => {}, cleanup: () => {} };
  }

  let selectedItem = null;

  const render = () => {
    if (!selectedItem) return;
    const title = drawerElement.querySelector('.drawer__title');
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!title || !body || !footer) return;

    title.textContent = `Detalhes: ${selectedItem.code}`;
    body.innerHTML = renderBody(selectedItem);
    footer.innerHTML = renderFooter();
  };

  const handleClick = (event) => {
    const actionEl = event.target.closest('[data-instruction-detail-action]');
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-instruction-detail-action');
    if (action === 'cancel') {
      controls.close();
      return;
    }

    if (action === 'approve') {
      if (typeof onPrimaryAction === 'function' && selectedItem) onPrimaryAction(selectedItem);
      return;
    }

    if (action === 'add-document' && selectedItem) {
      console.log('[controle-patio/instrucoes] adicionar documento', selectedItem.id);
    }
  };

  drawerElement.addEventListener('click', handleClick);

  return {
    open(item, triggerEl = null) {
      selectedItem = item ? { ...item, documents: [...(item.documents || [])] } : null;
      render();
      controls.open(triggerEl);
    },
    close() {
      controls.close();
    },
    cleanup() {
      drawerElement.removeEventListener('click', handleClick);
      controls.cleanup();
      document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
      document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
    },
  };
}
