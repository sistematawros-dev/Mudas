import * as Badge from '../../../components/badge/badge.js';
import * as Button from '../../../components/button/button.js';

const truckIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7H13V16H3V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 10H17L20 13V16H13V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
    <circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

function getGroupLabel(groupOptions = [], value = '') {
  return groupOptions.find((option) => option.value === value)?.label || '-';
}

function getLinkedLabels(vehicle, lookups = {}) {
  const source = vehicle.vinculoTipo === 'motoristas' ? lookups.motoristas : lookups.transportadoras;
  const byId = new Map((Array.isArray(source) ? source : []).map((item) => [String(item.id), item.label]));
  return (Array.isArray(vehicle.vinculoIds) ? vehicle.vinculoIds : [])
    .map((id) => byId.get(String(id)))
    .filter(Boolean);
}

function renderEmptyState() {
  return `
    <div class="patio-vehicles-empty-state">
      <div class="patio-vehicles-empty-state__icon">${truckIcon}</div>
      <strong class="patio-vehicles-empty-state__title">Nenhum veículo cadastrado</strong>
      <p class="patio-vehicles-empty-state__text">Use o botão Novo Veículo para iniciar o cadastro no módulo de Pátio.</p>
    </div>
  `;
}

function renderVehicleCard(vehicle, state) {
  const linkedLabels = getLinkedLabels(vehicle, state.drawer.lookups);
  const groupLabel = getGroupLabel(state.drawer.groupOptions, vehicle.grupo);
  const groupBadge = Badge.create({
    text: groupLabel,
    variant: vehicle.grupo === 'proprio' ? 'primary' : 'dark',
    style: 'soft',
    size: 'sm',
  });

  const linkBadge = Badge.create({
    text: vehicle.vinculoTipo === 'motoristas' ? 'Motoristas' : 'Transportadoras',
    variant: 'dark',
    style: 'outline',
    size: 'sm',
  });

  return `
    <article class="patio-vehicles-card" aria-label="Veículo ${vehicle.placa}">
      <header class="patio-vehicles-card__header">
        <div class="patio-vehicles-card__title-wrap">
          <h2 class="patio-vehicles-card__title">${vehicle.placa}</h2>
          <p class="patio-vehicles-card__subtitle">${vehicle.descricao}</p>
        </div>
        <div class="patio-vehicles-card__badges">
          ${groupBadge}
          ${linkBadge}
        </div>
      </header>

      <dl class="patio-vehicles-card__grid">
        <div class="patio-vehicles-card__field">
          <dt>Marca</dt>
          <dd>${vehicle.marca}</dd>
        </div>
        <div class="patio-vehicles-card__field">
          <dt>Modelo</dt>
          <dd>${vehicle.modelo}</dd>
        </div>
        <div class="patio-vehicles-card__field">
          <dt>Carga Máx</dt>
          <dd>${vehicle.cargaMaxima} Kg</dd>
        </div>
        <div class="patio-vehicles-card__field">
          <dt>Documento</dt>
          <dd>${vehicle.documentoFiles?.[0]?.name || 'Não informado'}</dd>
        </div>
        <div class="patio-vehicles-card__field patio-vehicles-card__field--full">
          <dt>Vínculos</dt>
          <dd>${linkedLabels.length > 0 ? linkedLabels.join(', ') : 'Nenhum vínculo selecionado'}</dd>
        </div>
      </dl>

      <footer class="patio-vehicles-card__footer">
        <button type="button" class="patio-vehicles-card__edit" data-action="edit-vehicle" data-vehicle-id="${vehicle.id}">Editar veículo</button>
      </footer>
    </article>
  `;
}

export function renderVehiclesPage(state) {
  const actionButton = Button.create({
    text: 'Novo Veículo',
    variant: 'primary',
    size: 'sm',
  }).replace('<button ', '<button type="button" data-action="new-vehicle" ');

  const listContent = state.vehicles.length > 0
    ? `<div class="patio-vehicles__list">${state.vehicles.map((vehicle) => renderVehicleCard(vehicle, state)).join('')}</div>`
    : renderEmptyState();

  return {
    actionButton,
    listContent,
  };
}
