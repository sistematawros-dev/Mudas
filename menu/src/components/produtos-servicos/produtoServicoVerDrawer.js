import * as Drawer from '../drawer/drawer.js';

const DRAWER_ID = 'produto-servico-ver-drawer';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function withFallback(value) {
  const text = String(value ?? '').trim();
  return text ? text : '—';
}

function normalizeItem(item = {}) {
  return {
    id: item.id ? String(item.id) : '',
    codigo: String(item.codigo || ''),
    nome: String(item.nome || item.descricao || ''),
    status: String(item.status || 'Ativo'),
    tipo: String(item.tipo || 'Produto'),
    classe: String(item.classe || ''),
    unidade: String(item.unidade || ''),
    descricao: String(item.descricao || ''),
    marca: Array.isArray(item.marca) ? item.marca.map((v) => String(v || '').trim()).filter(Boolean) : [],
    fabricante: Array.isArray(item.fabricante) ? item.fabricante.map((v) => String(v || '').trim()).filter(Boolean) : [],
    fornecedores: String(item.fornecedores || ''),
    grupoEquivalencia: String(item.grupoEquivalencia || ''),
    ncm: String(item.ncm || ''),
    principioAtivo: String(item.principioAtivo || ''),
    grupoQuimico: String(item.grupoQuimico || ''),
    modoAcao: String(item.modoAcao || ''),
    registroMapa: String(item.registroMapa || ''),
  };
}

function renderChips(values = []) {
  const items = Array.isArray(values) ? values : [];
  if (!items.length) return '<span class="produto-servico-ver-drawer__value">—</span>';
  return items.map((value) => `
    <span class="chip chip--input chip--sm">
      <span class="chip-label">${escapeHtml(value)}</span>
    </span>
  `).join('');
}

function renderBody(state = {}) {
  const item = normalizeItem(state.item);
  const sections = state.sections || {
    dados: true,
    cadastro: true,
    classe: true,
  };
  const editDisabled = !item.id || !state.canEdit;

  return `
    <div class="produto-servico-ver-drawer">
      <div class="produto-servico-ver-drawer__meta">
        <div class="produto-servico-ver-drawer__meta-item">
          <span class="produto-servico-ver-drawer__meta-label">Status</span>
          <span class="produto-servico-ver-drawer__badge produto-servico-ver-drawer__badge--status">${escapeHtml(withFallback(item.status))}</span>
        </div>
        <div class="produto-servico-ver-drawer__meta-item">
          <span class="produto-servico-ver-drawer__meta-label">Tipo</span>
          <span class="produto-servico-ver-drawer__badge">${escapeHtml(withFallback(item.tipo))}</span>
        </div>
      </div>

      <section class="produto-servico-ver-drawer__section">
        <button type="button" class="produto-servico-ver-drawer__section-toggle" data-psvd-section="dados">
          <span>Dados do produto</span>
          <span class="produto-servico-ver-drawer__chevron ${sections.dados ? 'is-open' : ''}">⌃</span>
        </button>
        <div class="produto-servico-ver-drawer__section-content ${sections.dados ? 'is-open' : ''}">
          <div class="produto-servico-ver-drawer__grid">
            <div>
              <p class="produto-servico-ver-drawer__label">Classe</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.classe))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Unidade</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.unidade))}</p>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Descrição</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.descricao))}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="produto-servico-ver-drawer__section">
        <button type="button" class="produto-servico-ver-drawer__section-toggle" data-psvd-section="cadastro">
          <span>Complementares de Cadastro</span>
          <span class="produto-servico-ver-drawer__chevron ${sections.cadastro ? 'is-open' : ''}">⌃</span>
        </button>
        <div class="produto-servico-ver-drawer__section-content ${sections.cadastro ? 'is-open' : ''}">
          <div class="produto-servico-ver-drawer__grid">
            <div>
              <p class="produto-servico-ver-drawer__label">Marca</p>
              <div class="produto-servico-ver-drawer__chips">${renderChips(item.marca)}</div>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Fabricante</p>
              <div class="produto-servico-ver-drawer__chips">${renderChips(item.fabricante)}</div>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Fornecedores</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.fornecedores))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Grupo de Equivalência</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.grupoEquivalencia))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">NCM</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.ncm))}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="produto-servico-ver-drawer__section">
        <button type="button" class="produto-servico-ver-drawer__section-toggle" data-psvd-section="classe">
          <span>Complementares de Classe</span>
          <span class="produto-servico-ver-drawer__chevron ${sections.classe ? 'is-open' : ''}">⌃</span>
        </button>
        <div class="produto-servico-ver-drawer__section-content ${sections.classe ? 'is-open' : ''}">
          <div class="produto-servico-ver-drawer__grid">
            <div>
              <p class="produto-servico-ver-drawer__label">Princípio Ativo</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.principioAtivo))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Grupo Químico</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.grupoQuimico))}</p>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Modo de Ação</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.modoAcao))}</p>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Número de Registro MAPA</p>
              <p class="produto-servico-ver-drawer__value">${escapeHtml(withFallback(item.registroMapa))}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="produto-servico-ver-drawer__footer">
        <button type="button" class="btn btn--outline-dark" data-psvd-action="back">Voltar</button>
        <button type="button" class="btn btn--outline-dark" data-psvd-action="edit" ${editDisabled ? 'disabled' : ''}>✎ Editar cadastro</button>
      </footer>
    </div>
  `;
}

export function initProdutoServicoVerDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onEdit: typeof options.onEdit === 'function' ? options.onEdit : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: '',
    width: 560,
    content: '',
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({
    id: DRAWER_ID,
    root: document,
    onClose: () => {
      state.open = false;
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) return { open: () => {}, close: () => {}, cleanup: () => {} };

  let state = {
    open: false,
    item: {},
    canEdit: Boolean(callbacks.onEdit),
    sections: {
      dados: true,
      cadastro: true,
      classe: true,
    },
  };

  const render = () => {
    const item = normalizeItem(state.item);
    const title = drawerElement.querySelector('.drawer__title');
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    const header = drawerElement.querySelector('.drawer__header');
    if (!title || !body || !footer) return;
    title.textContent = withFallback(item.nome);
    if (header && !header.querySelector('.produto-servico-ver-drawer__subtitle-head')) {
      title.insertAdjacentHTML(
        'afterend',
        '<p class="produto-servico-ver-drawer__subtitle-head">—</p>'
      );
    }
    const subtitleEl = header?.querySelector('.produto-servico-ver-drawer__subtitle-head');
    if (subtitleEl) subtitleEl.textContent = withFallback(item.codigo);
    body.innerHTML = renderBody(state);
    footer.innerHTML = '';
  };

  const handleClick = (event) => {
    if (!(event.target instanceof Element)) return;

    const sectionToggle = event.target.closest('[data-psvd-section]');
    if (sectionToggle) {
      const section = sectionToggle.getAttribute('data-psvd-section') || '';
      if (!section) return;
      state = {
        ...state,
        sections: {
          ...state.sections,
          [section]: !state.sections?.[section],
        },
      };
      render();
      return;
    }

    const actionEl = event.target.closest('[data-psvd-action]');
    if (!actionEl) return;
    const action = actionEl.getAttribute('data-psvd-action') || '';

    if (action === 'back') {
      drawerControls.close();
      return;
    }

    if (action === 'edit') {
      const item = normalizeItem(state.item);
      if (!item.id || !callbacks.onEdit) return;
      callbacks.onEdit(item.id);
      drawerControls.close();
    }
  };

  drawerElement.addEventListener('click', handleClick);
  render();

  const open = (params = {}) => {
    state = {
      ...state,
      open: true,
      canEdit: Boolean(callbacks.onEdit),
      item: normalizeItem(params.item || {}),
      sections: {
        dados: true,
        cadastro: true,
        classe: true,
      },
    };
    render();
    drawerControls.open(params.triggerEl || null);
  };

  const close = () => drawerControls.close();

  const cleanup = () => {
    drawerElement.removeEventListener('click', handleClick);
    drawerControls.cleanup();
    document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
  };

  return { open, close, cleanup };
}

export default { initProdutoServicoVerDrawer };
