import { icon } from '../../components/icons/icons.js';

function getSearchValue(state = {}) {
  return String(state.search || '').trim().toLowerCase();
}

function filterBySearch(items = [], searchValue = '') {
  if (!searchValue) return items;
  return items.filter((item = {}) => {
    const code = String(item.codigo || '').toLowerCase();
    const name = String(item.nome || '').toLowerCase();
    return code.includes(searchValue) || name.includes(searchValue);
  });
}

function renderGrupoEditor(state = {}) {
  const editor = state.grupoEditor || {};
  const posicao = editor.posicao || '';
  const nome = editor.nome || '';

  return `
    <section class="classificacao-ps__grupo-editor" data-cpsc-grupo-editor>
      <header class="classificacao-ps__grupo-editor-header">
        <h4>Novo Grupo</h4>
        <button type="button" class="classificacao-ps__grupo-editor-close" data-cpsc-grupo-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__grupo-editor-field">
        <label for="cpsc-grupo-posicao">Posição</label>
        <input id="cpsc-grupo-posicao" type="text" placeholder="Digite a posição" data-cpsc-grupo-field="posicao" value="${posicao}" />
      </div>

      <div class="classificacao-ps__grupo-editor-field">
        <label for="cpsc-grupo-nome">Nome do Grupo</label>
        <input id="cpsc-grupo-nome" type="text" placeholder="Digite o nome do Grupo" data-cpsc-grupo-field="nome" value="${nome}" />
      </div>

      <footer class="classificacao-ps__grupo-editor-footer">
        <button type="button" class="classificacao-ps__grupo-editor-cancel" data-cpsc-grupo-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-grupo-editor-save>Salvar</button>
      </footer>
    </section>
  `;
}

function renderCategoriaEditor(state = {}) {
  const editor = state.categoriaEditor || {};
  const grupos = Array.isArray(state.grupos) ? state.grupos : [];
  const grupoId = String(editor.grupoId || '');
  const posicao = editor.posicao || '';
  const nome = editor.nome || '';
  const hasGrupoOptions = grupos.length > 0;

  return `
    <section class="classificacao-ps__categoria-editor" data-cpsc-categoria-editor>
      <header class="classificacao-ps__categoria-editor-header">
        <h4>Nova Categoria</h4>
        <button type="button" class="classificacao-ps__categoria-editor-close" data-cpsc-categoria-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-grupo">Grupo</label>
        <select id="cpsc-categoria-grupo" data-cpsc-categoria-field="grupoId" ${hasGrupoOptions ? '' : 'disabled'}>
          <option value="">Selecione</option>
          ${grupos.map((item = {}) => {
    const id = String(item.id || '');
    const selected = id === grupoId ? 'selected' : '';
    return `<option value="${id}" ${selected}>${item.codigo || ''} ${item.nome || ''}</option>`;
  }).join('')}
        </select>
      </div>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-posicao">Posicao</label>
        <input id="cpsc-categoria-posicao" type="text" placeholder="Digite a posicao" data-cpsc-categoria-field="posicao" value="${posicao}" />
      </div>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-nome">Nome da Categoria</label>
        <input id="cpsc-categoria-nome" type="text" placeholder="Digite o nome da Categoria" data-cpsc-categoria-field="nome" value="${nome}" />
      </div>

      <footer class="classificacao-ps__categoria-editor-footer">
        <button type="button" class="classificacao-ps__categoria-editor-cancel" data-cpsc-categoria-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-categoria-editor-save>Salvar</button>
      </footer>
    </section>
  `;
}

function renderClasseEditor(state = {}) {
  const editor = state.classeEditor || {};
  const categorias = Array.isArray(state.categorias) ? state.categorias : [];
  const grupos = Array.isArray(state.grupos) ? state.grupos : [];
  const categoriaId = String(editor.categoriaId || '');
  const categoriaAtual = categorias.find((item = {}) => String(item.id || '') === categoriaId);
  const grupoId = String(categoriaAtual?.grupoId || '');
  const grupoAtual = grupos.find((item = {}) => String(item.id || '') === grupoId);
  const grupoNome = grupoAtual?.nome ? `Grupo ${grupoAtual.nome}` : '';
  const posicao = editor.posicao || '';
  const nome = editor.nome || '';
  const produtosChecked = editor.produtos !== false ? 'checked' : '';
  const servicosChecked = editor.servicos !== false ? 'checked' : '';
  const hasCategoriaOptions = categorias.length > 0;

  return `
    <section class="classificacao-ps__classe-editor" data-cpsc-classe-editor>
      <header class="classificacao-ps__classe-editor-header">
        <h4>Nova Classe</h4>
        <button type="button" class="classificacao-ps__classe-editor-close" data-cpsc-classe-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-categoria">Categoria</label>
        <select id="cpsc-classe-categoria" data-cpsc-classe-field="categoriaId" ${hasCategoriaOptions ? '' : 'disabled'}>
          <option value="">Selecione</option>
          ${categorias.map((item = {}) => {
    const id = String(item.id || '');
    const selected = id === categoriaId ? 'selected' : '';
    return `<option value="${id}" ${selected}>${item.codigo || ''} ${item.nome || ''}</option>`;
  }).join('')}
        </select>
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-grupo">Grupo</label>
        <input id="cpsc-classe-grupo" type="text" value="${grupoNome}" readonly />
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-posicao">Posicao</label>
        <input id="cpsc-classe-posicao" type="text" placeholder="Digite a posicao" data-cpsc-classe-field="posicao" value="${posicao}" />
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-nome">Nome da Classe</label>
        <input id="cpsc-classe-nome" type="text" placeholder="Digite o nome da Categoria" data-cpsc-classe-field="nome" value="${nome}" />
      </div>

      <div class="classificacao-ps__classe-editor-checks">
        <label class="classificacao-ps__classe-editor-check">
          <input type="checkbox" data-cpsc-classe-field="produtos" ${produtosChecked} />
          <span>Produtos</span>
        </label>
        <label class="classificacao-ps__classe-editor-check">
          <input type="checkbox" data-cpsc-classe-field="servicos" ${servicosChecked} />
          <span>Servicos</span>
        </label>
      </div>

      <footer class="classificacao-ps__classe-editor-footer">
        <button type="button" class="classificacao-ps__classe-editor-cancel" data-cpsc-classe-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-classe-editor-save>Salvar</button>
      </footer>
    </section>
  `;
}

function renderRows(items = [], selectedId = '', type = '') {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p class="classificacao-ps__empty">Nenhum item encontrado.</p>';
  }

  return `
    <ul class="classificacao-ps__list" role="list">
      ${items.map((item = {}) => {
    const id = String(item.id || '');
    const isSelected = id && id === String(selectedId || '');
    return `
          <li>
            <button
              type="button"
              class="classificacao-ps__row ${isSelected ? 'is-selected' : ''}"
              data-cpsc-select="${type}"
              data-cpsc-id="${id}"
            >
              <span class="classificacao-ps__row-left" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                ${type === 'classe'
      ? `<span class="classificacao-ps__row-file" data-cpsc-classe-produtos="${id}">${icon('file', { size: 12 })}</span>`
      : '<svg viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>'}
              </span>
              <span class="classificacao-ps__row-label">
                <span class="classificacao-ps__row-code">${item.codigo || '-'}</span>
                <span class="classificacao-ps__row-name">${item.nome || '-'}</span>
              </span>
              <span class="classificacao-ps__row-right" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.4" stroke="currentColor" stroke-width="1.2"/></svg>
                ${type === 'grupo'
      ? `<span class="classificacao-ps__row-kebab" data-cpsc-grupo-edit="${id}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`
      : type === 'categoria'
        ? `<span class="classificacao-ps__row-kebab" data-cpsc-categoria-edit="${id}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`
      : type === 'classe'
        ? `<span class="classificacao-ps__row-kebab" data-cpsc-classe-edit="${id}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`
      : '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>'}
              </span>
            </button>
          </li>
        `;
  }).join('')}
    </ul>
  `;
}

export function createClassificacaoProdutosServicosMarkup(state = {}) {
  const isSaving = Boolean(state.isSaving);
  const searchValue = state.search || '';
  const searchNormalized = getSearchValue(state);

  const grupos = filterBySearch(Array.isArray(state.grupos) ? state.grupos : [], searchNormalized);
  const selectedGrupoId = String(state.selectedGrupoId || '');
  const categoriasAll = Array.isArray(state.categorias) ? state.categorias : [];
  const categoriasByGrupo = categoriasAll.filter((item = {}) => String(item.grupoId || '') === selectedGrupoId);
  const categorias = filterBySearch(categoriasByGrupo, searchNormalized);
  const selectedCategoriaId = String(state.selectedCategoriaId || '');
  const classesAll = Array.isArray(state.classes) ? state.classes : [];
  const classesByCategoria = classesAll.filter((item = {}) => String(item.categoriaId || '') === selectedCategoriaId);
  const classes = filterBySearch(classesByCategoria, searchNormalized);
  const isGrupoEditorOpen = (state.grupoView || 'list') === 'editor';
  const isCategoriaEditorOpen = (state.categoriaView || 'list') === 'editor';
  const isClasseEditorOpen = (state.classeView || 'list') === 'editor';

  return `
    <section class="classificacao-ps">
      <header class="classificacao-ps__header">
        <h2 class="classificacao-ps__title">Classificação de Produtos e Serviços</h2>
        <div class="classificacao-ps__actions">
          <button type="button" class="btn btn--outline-dark" data-cpsc-cancel ${isSaving ? 'disabled' : ''}>Cancelar</button>
          <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-cpsc-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
        </div>
      </header>

      <section class="classificacao-ps__card">
        <div class="classificacao-ps__search-wrap">
          <label class="classificacao-ps__search">
            <input
              type="text"
              class="classificacao-ps__search-input"
              placeholder="Buscar na estrutura..."
              value="${searchValue}"
              data-cpsc-search
              ${isSaving ? 'disabled' : ''}
            />
            <span class="classificacao-ps__search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
                <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </span>
          </label>
          <button type="button" class="classificacao-ps__search-action" data-cpsc-search-menu aria-label="Ações da busca" ${isSaving ? 'disabled' : ''}>
            <svg viewBox="0 0 16 16" fill="none"><path d="M3 3.5H13M3 8H13M3 12.5H13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </button>
        </div>

        <div class="classificacao-ps__columns">
          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Grupo</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="grupo" ${isSaving ? 'disabled' : ''}>Novo +</button>
            </header>
            ${isGrupoEditorOpen ? renderGrupoEditor(state) : renderRows(grupos, selectedGrupoId, 'grupo')}
          </section>

          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Categoria</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="categoria" ${isSaving ? 'disabled' : ''}>Novo +</button>
            </header>
            ${isCategoriaEditorOpen ? renderCategoriaEditor(state) : renderRows(categorias, selectedCategoriaId, 'categoria')}
          </section>

          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Classe</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="classe" ${isSaving ? 'disabled' : ''}>Novo +</button>
            </header>
            ${isClasseEditorOpen ? renderClasseEditor(state) : renderRows(classes, state.selectedClasseId || '', 'classe')}
          </section>
        </div>

        <footer class="classificacao-ps__footer">
          <button type="button" class="btn btn--outline-dark" data-cpsc-cancel ${isSaving ? 'disabled' : ''}>Cancelar</button>
          <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-cpsc-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `;
}

export default { createClassificacaoProdutosServicosMarkup };
