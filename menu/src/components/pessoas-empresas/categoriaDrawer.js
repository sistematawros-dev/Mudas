import { initCadastroItemDrawer } from './cadastroItemDrawer.js';

export function initCategoriaDrawer(options = {}) {
  return initCadastroItemDrawer({
    ...options,
    drawerId: 'categoria-drawer',
    title: 'Criar Nova Categoria',
    searchInputId: 'categoria-drawer-search',
    searchPlaceholder: 'Buscar Categoria',
    inlinePlaceholder: 'Digite o nome da categoria',
    emptyMessage: 'Nenhuma categoria encontrada.',
    editAriaLabel: 'Editar categoria',
    itemIdPrefix: 'categoria',
    toggleIdPrefix: 'categoria-drawer-toggle-',
    actionAttr: 'data-categoria-action',
    itemIdAttr: 'data-categoria-id',
    inlineInputAttr: 'data-categoria-inline-input',
  });
}

export default { initCategoriaDrawer };
