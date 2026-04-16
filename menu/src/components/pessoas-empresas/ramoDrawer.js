import { initCadastroItemDrawer } from './cadastroItemDrawer.js';

export function initRamoDrawer(options = {}) {
  return initCadastroItemDrawer({
    ...options,
    drawerId: 'ramo-drawer',
    title: 'Criar Novo Ramo',
    searchInputId: 'ramo-drawer-search',
    searchPlaceholder: 'Buscar Ramo',
    inlinePlaceholder: 'Digite o nome do ramo',
    emptyMessage: 'Nenhum ramo encontrado.',
    editAriaLabel: 'Editar ramo',
    itemIdPrefix: 'ramo',
    toggleIdPrefix: 'ramo-drawer-toggle-',
    actionAttr: 'data-ramo-action',
    itemIdAttr: 'data-ramo-id',
    inlineInputAttr: 'data-ramo-inline-input',
  });
}

export default { initRamoDrawer };
