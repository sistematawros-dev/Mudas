import * as Drawer from '../drawer/drawer.js';
import * as Tabs from '../tabs/tabs.js';
import * as Input from '../input/input.js';
import * as Button from '../button/button.js';
import * as Chip from '../chip/chip.js';
import { icon } from '../icons/icons.js';
import './enviar-germinacao-drawer.css';

const DRAWER_ID = 'kanban-enviar-germinacao-drawer';

function createStatsCard(label, value, tag = '') {
  return `
    <article class="eg-stats-card">
      <span class="eg-stats-card__label">${label}</span>
      <strong class="eg-stats-card__value">${value}</strong>
      ${tag ? `<span class="eg-stats-card__tag">${tag}</span>` : ''}
    </article>
  `;
}

function createQrButton() {
  return `
    <button type="button" class="btn btn--outline-dark btn--sm eg-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `;
}

function createInsumosTable() {
  return `
    <article class="eg-table-card">
      <button type="button" class="eg-table-card__header" aria-expanded="true">
        <span class="eg-table-card__icon" aria-hidden="true">${icon('chevron-down', { size: 14 })}</span>
        <span>Bandeja 128 células</span>
      </button>
      <div class="eg-table-wrap">
        <table class="eg-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Produto</th>
              <th>Unidade</th>
              <th>Embalagem</th>
              <th>Quantidade</th>
              <th>Quantidade Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>002</td>
              <td>Bandeja 128</td>
              <td>128</td>
              <td>UN</td>
              <td>40</td>
              <td>6.144</td>
              <td>
                <div class="eg-table-actions">
                  <button type="button" class="eg-icon-btn" aria-label="Editar">${icon('edit', { size: 14 })}</button>
                  <button type="button" class="eg-icon-btn eg-icon-btn--danger" aria-label="Excluir">${icon('trash', { size: 14 })}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  `;
}

function createMainPanel() {
  const insumoClasses = [
    { label: 'SEM-2024-001 - Lote A (Disp: 50kg)', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' },
    { label: 'SEM-2024-002 - Lote A (Disp: 50kg)', value: 'SEM-2024-002 - Lote A (Disp: 50kg)' },
  ];

  return `
    <section class="enviar-germinacao-drawer__panel">
      <section class="eg-section eg-section--actions">
        ${createQrButton()}
      </section>

      <section class="eg-section">
        <article class="eg-quick-card">
          <div class="eg-quick-block">
            <div class="eg-quick-info">
              <span class="eg-quick-icon" aria-hidden="true">${icon('home', { size: 12 })}</span>
              <div class="eg-quick-card__cell">
                <span class="eg-caption">Sala de Semeio</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="eg-inline-link">${icon('grid', { size: 12 })}<span>Consultar localização</span></button>
          </div>
          <div class="eg-quick-block eg-quick-block--metrics">
            <div class="eg-quick-info">
              <span class="eg-quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
              <div class="eg-quick-card__cell">
                <span class="eg-caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="eg-quick-card__cell">
              <span class="eg-caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="eg-quick-block eg-quick-block--timeline">
            <div class="eg-quick-card__timeline">
              <div class="eg-quick-card__date">
                <span class="eg-caption">Data de Entrada</span>
                <div class="eg-quick-date-row">
                  <span class="eg-quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
                  <strong>15/01</strong>
                </div>
                <span class="eg-quick-date-sub">Quarta-feira</span>
              </div>
              <div class="eg-quick-card__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="eg-quick-card__date eg-quick-card__date--right">
                <span class="eg-caption">Previsão de Saída</span>
                <div class="eg-quick-date-row eg-quick-date-row--right">
                  <strong>18/01</strong>
                  <span class="eg-quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
                </div>
                <span class="eg-quick-date-sub">Segunda-feira</span>
              </div>
            </div>
            <div class="eg-progress">
              <div class="eg-progress__legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="eg-progress__line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="eg-section">
        <h3 class="eg-section__title">Informações do Produto</h3>
        <article class="eg-group-card eg-group-card--product">
          <header class="eg-group-card__head">
            <span class="eg-group-card__kind">Enxerto</span>
            <span class="eg-group-card__meta">Cód. Produto: <strong>0001</strong></span>
            <span class="eg-group-card__meta">Produto: <strong>Muda de Eucalipto Clone</strong></span>
            <span class="eg-group-card__meta">Qtd. Bandejas: <strong>20 un</strong></span>
          </header>
          <div class="eg-stats-grid">
            ${createStatsCard('Qtd. a Produzir', '5.556')}
            ${createStatsCard('Perda Estimada', '556', '+10%')}
            ${createStatsCard('Qtd. Esperada', '5.000')}
          </div>
        </article>
      </section>

      <section class="eg-section">
        <h3 class="eg-section__title">Informações para Semeio</h3>
        <article class="eg-group-card">
          <header class="eg-group-card__head">
            <span>Enxerto</span>
            <span>Cód. Produto: <strong>0001</strong></span>
            <span>Produto: <strong>Muda de Eucalipto Clone</strong></span>
            <span>Qtd. Bandejas: <strong>20 un</strong></span>
          </header>
          <div class="eg-stats-grid">
            ${createStatsCard('Qtd. a Semear', '5.556')}
            ${createStatsCard('Perda Estimada', '556', '+10%')}
            ${createStatsCard('Qtd. Esperada', '5.000')}
          </div>
        </article>
        <article class="eg-group-card">
          <header class="eg-group-card__head">
            <span>Porta-enxerto</span>
            <span>Cód. Produto: <strong>0001</strong></span>
            <span>Produto: <strong>Muda de Eucalipto Clone</strong></span>
            <span>Qtd. Bandejas: <strong>20 un</strong></span>
          </header>
          <div class="eg-stats-grid">
            ${createStatsCard('Qtd. a Semear', '5.556')}
            ${createStatsCard('Perda Estimada', '556', '+10%')}
            ${createStatsCard('Qtd. Esperada', '5.000')}
          </div>
        </article>
      </section>

      <section class="eg-section">
        <div class="eg-section__header">
          <h3 class="eg-section__title">Insumos</h3>
          ${Button.create({ text: '+ Adicionar Insumo', variant: 'outline-dark', size: 'sm' })}
        </div>
        <article class="eg-card">
          <div class="eg-grid eg-grid--two">
            ${Input.createSelect({ id: 'eg-classe', label: 'Classe', name: 'classe', value: insumoClasses[0].value, items: insumoClasses })}
            ${Input.create({ id: 'eg-codigo-produto', label: 'Código do Produto', name: 'codigoProduto', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'eg-produto', label: 'Produto', name: 'produto', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'eg-unidade', label: 'Unidade', name: 'unidade', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'eg-embalagem', label: 'Embalagem', name: 'embalagem', value: 'Clone AEC 144' })}
            ${Input.create({ id: 'eg-quantidade', label: 'Quantidade', name: 'quantidade', value: 'AgriSeeds' })}
          </div>
          <div class="eg-card__actions">
            ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' })}
            ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' })}
          </div>
        </article>
      </section>

      <section class="eg-section">
        ${createInsumosTable()}
      </section>

      <section class="eg-section eg-section--footer">
        <div class="eg-grid eg-grid--two">
          <div class="eg-location-field">
            <div class="eg-location-head">
              <span class="eg-label-inline">Localização<span class="eg-required">*</span></span>
              <button type="button" class="eg-inline-link eg-inline-link--small">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: 'eg-localizacao', name: 'localizacao', placeholder: 'Buscar', required: true })}
          </div>
          ${Input.create({ id: 'eg-data-encerramento', type: 'date', label: 'Data encerramento da etapa', name: 'dataEncerramento', required: true, className: 'eg-date-field', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: 'eg-responsavel', label: 'Responsável', name: 'responsavel', required: true, placeholder: 'Nome do responsável' })}
        </div>
        <div class="eg-bottom-actions">
          ${Button.create({ text: 'Voltar Etapa', variant: 'error', style: 'outline', size: 'sm' }).replace('<button', '<button data-eg-action="voltar-etapa"')}
          <div class="eg-bottom-actions__right">
            ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-eg-action="cancelar"')}
            ${Button.create({ text: 'Enviar para a Germinação', variant: 'primary', size: 'sm' }).replace('<button', '<button data-eg-action="enviar-germinacao"')}
          </div>
        </div>
      </section>
    </section>
  `;
}

function createPanelPlaceholder(text) {
  return `<div class="enviar-germinacao-drawer__placeholder">${text}</div>`;
}

function createSemeioDetailsField(label, value) {
  return `
    <div class="semeio-details-field">
      <span class="semeio-details-field__label">${label}</span>
      <strong class="semeio-details-field__value">${value}</strong>
    </div>
  `;
}

function createSemeioDetailsInformacoesGeraisPanel() {
  return `
    <section class="semeio-details-panel">
      <section class="semeio-details-section">
        <h3 class="semeio-details-section__title">Planejamento e Datas</h3>
        <div class="semeio-details-box">
          <div class="semeio-details-grid semeio-details-grid--three">
            ${createSemeioDetailsField('Data do Pedido', '15/01/2025')}
            ${createSemeioDetailsField('Data Agendada do Semeio', '15/01/2025')}
            ${createSemeioDetailsField('Responsável agendamento', 'João da Silva')}
          </div>
        </div>
        ${createQrButton()}
      </section>

      <section class="semeio-details-section">
        <h3 class="semeio-details-section__title">Informações Gerais</h3>
        <div class="semeio-details-box">
          <div class="semeio-details-grid semeio-details-grid--three">
            ${createSemeioDetailsField('Código do Pedido', '001')}
            ${createSemeioDetailsField('Código ERP', '43242343')}
            ${createSemeioDetailsField('CPF/CNPJ', '123.456.789-00')}
            ${createSemeioDetailsField('Cód. Cliente', '001')}
            ${createSemeioDetailsField('Cód. Pedido A2W', '001')}
            ${createSemeioDetailsField('Cód. Pedido TAWROS', '001')}
            ${createSemeioDetailsField('Razão Social/Nome', 'Nome da razao social')}
            ${createSemeioDetailsField('Nome Fantasia/Apelido', 'Nome fantasia')}
            ${createSemeioDetailsField('Nome do Cliente', '2.343')}
            ${createSemeioDetailsField('Nome do Vendedor', 'Nome vendedor')}
            ${createSemeioDetailsField('Classe', 'Muda de Eucalipto Clone AEC 144')}
            ${createSemeioDetailsField('Cód. do Produto', '43423432')}
            ${createSemeioDetailsField('Quantidade', '5.000')}
            ${createSemeioDetailsField('Produto', 'Muda de Eucalipto Clone')}
          </div>
        </div>
        ${Button.create({ text: 'Ver pedido', variant: 'outline-dark', size: 'sm' })}
      </section>
    </section>
  `;
}

function createSemeioDetailsProductionAccordion({
  title,
  content = '',
  collapsed = false,
  showCaption = false,
}) {
  return `
    <div class="semeio-details-accordion ${collapsed ? 'is-collapsed' : ''}" data-semeio-details-accordion>
      <button type="button" class="semeio-details-accordion__header" aria-expanded="${String(!collapsed)}" data-semeio-details-toggle>
        <span class="semeio-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
        <span>${title}</span>
      </button>
      ${showCaption ? `<div class="semeio-details-production__stage-caption">${icon('chevron-down', { size: 12 })}<span>Detalhes</span></div>` : ''}
      <div class="semeio-details-accordion__content semeio-details-production__content">
        ${content}
      </div>
    </div>
  `;
}

function createSemeioSeedLotItem(lot) {
  return `
    <article class="semeio-details-production__lot">
      <span class="semeio-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="semeio-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="semeio-details-production__grid semeio-details-production__grid--lot">
        ${createSemeioDetailsField('Data de retirada do estoque', lot.stockDate)}
        ${createSemeioDetailsField('Responsável da retirada', lot.responsible)}
        <div class="semeio-details-field">
          <span class="semeio-details-field__label">Foto</span>
          <span class="semeio-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="semeio-details-production__link">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `;
}

function createSemeioSupplyItem(supply) {
  return `
    <article class="semeio-details-production__supply">
      <div class="semeio-details-production__grid semeio-details-production__grid--supplies">
        ${createSemeioDetailsField('Bandeja', supply.tray)}
        ${createSemeioDetailsField('Quantidade', supply.quantity)}
        ${createSemeioDetailsField('Responsável da retirada', supply.responsible)}
      </div>
    </article>
  `;
}

function createSemeioDetailsProducaoPanel() {
  const seedLots = [
    { stockDate: '12/01/2025', responsible: 'Viktor Dantas' },
    { stockDate: '12/01/2025', responsible: 'Viktor Dantas' },
  ];
  const supplies = [
    { tray: 'Descrição Bandeja', quantity: '1000', responsible: 'Viktor Dantas' },
    { tray: 'Descrição Bandeja', quantity: '1000', responsible: 'Viktor Dantas' },
  ];
  const stages = ['Germinação', 'Casa de Vegetação', 'Sala de Corte', 'Sala de Fusão', 'Adaptação'];

  return `
    <section class="semeio-details-production">
      <h3 class="semeio-details-section__title">Informações da Produção</h3>

      ${createSemeioDetailsProductionAccordion({
    title: 'Semeio',
    content: `
          <div class="semeio-details-production__stage-caption semeio-details-production__stage-caption--inner">${icon('chevron-up', { size: 12 })}<span>Detalhes</span></div>
          <div class="semeio-details-production__grid semeio-details-production__grid--two">
            ${createSemeioDetailsField('Data agendada de semeio', '12/01/2025')}
            ${createSemeioDetailsField('Responsável do agendamento', 'Viktor Dantas')}
            ${createSemeioDetailsField('Data de semeio', '12/01/2025')}
            ${createSemeioDetailsField('Responsável do semeio', 'Viktor Dantas')}
          </div>
          <div class="semeio-details-production__line">
            ${createSemeioDetailsField('Localização', 'Sala de Semeio')}
          </div>
        `,
  })}

      ${createSemeioDetailsProductionAccordion({
    title: 'Produto Final',
    content: `
          <div class="semeio-details-production__grid semeio-details-production__grid--two">
            ${createSemeioDetailsField('Quantidade de Produto', '5.000')}
            ${createSemeioDetailsField('Estimativa (+5% Germinação)', '5.250')}
          </div>
        `,
  })}

      ${createSemeioDetailsProductionAccordion({
    title: 'Sementes',
    content: `
          <div class="semeio-details-production__grid semeio-details-production__grid--two">
            ${createSemeioDetailsField('Quantidade de Mudas Enxerto', '5.000')}
            ${createSemeioDetailsField('Estimativa (+5% Germinação)', '5.250')}
            ${createSemeioDetailsField('Quantidade de Mudas Porta-enxerto', '5.000')}
            ${createSemeioDetailsField('Estimativa (+5% Germinação)', '5.250')}
          </div>
        `,
  })}

      ${createSemeioDetailsProductionAccordion({
    title: 'Informações de Lote de Sementes',
    content: `
          <div class="semeio-details-production__lots">
            ${seedLots.map((lot) => createSemeioSeedLotItem(lot)).join('')}
          </div>
          <button type="button" class="semeio-termo-btn">
            ${icon('file', { size: 14 })}
            <span>Termo de Retirada</span>
          </button>
        `,
  })}

      ${createSemeioDetailsProductionAccordion({
    title: 'Informações de Insumos',
    content: `
          <div class="semeio-details-production__supplies">
            ${supplies.map((supply) => createSemeioSupplyItem(supply)).join('')}
          </div>
        `,
  })}

      ${stages.map((stage) => createSemeioDetailsProductionAccordion({
    title: stage,
    content: '<div class="enviar-germinacao-drawer__placeholder">Em construção</div>',
    collapsed: true,
    showCaption: true,
  })).join('')}
    </section>
  `;
}

function createSemeioDetailsPanel() {
  return Tabs.createWithPanels({
    id: 'semeio-detalhes-subtabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Informações Gerais', content: createSemeioDetailsInformacoesGeraisPanel() },
      { label: 'Produção', content: createSemeioDetailsProducaoPanel() },
      { label: 'Expedição', content: createPanelPlaceholder('Expedição em construção') },
      { label: 'Operações', content: createPanelPlaceholder('Operações em construção') },
      { label: 'Histórico', content: createPanelPlaceholder('Histórico em construção') },
    ],
  });
}

function createSemeioCycleStep(step) {
  return `
    <article class="semeio-cycle-step">
      <div class="semeio-cycle-step__main">
        <strong class="semeio-cycle-step__title">${step.title}</strong>
        <span class="semeio-cycle-step__period">${step.period}</span>
      </div>
      <strong class="semeio-cycle-step__days">${step.days}</strong>
    </article>
  `;
}

function createSemeioCycleDaysPanel() {
  const cycleSteps = [
    { title: 'Dias após o Semeio', period: '23/01/2025', days: '10 dias' },
    { title: 'Dias na Germinação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Casa de Vegetação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Sala de Corte', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Sala de Fusão', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Adaptação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Casa de Vegetação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias em Expedição', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
  ];

  return `
    <section class="semeio-cycle-days">
      <section class="semeio-cycle-section">
        <h3 class="semeio-cycle-section__title">Dias</h3>
        <article class="semeio-cycle-card" aria-label="Previsão de Término">
          <h4 class="semeio-cycle-card__title">
            <span class="semeio-cycle-card__icon" aria-hidden="true">${icon('clock', { size: 14 })}</span>
            Previsão de Término
          </h4>
          <div class="semeio-cycle-donut" role="img" aria-label="365 dias de ciclo previstos">
            <div class="semeio-cycle-donut__inner">
              <strong>365</strong>
              <span>Dias</span>
            </div>
          </div>
          <div class="semeio-cycle-card__dates">
            <div class="semeio-cycle-card__date">
              <span class="semeio-cycle-card__date-icon" aria-hidden="true">${icon('calendar', { size: 14 })}</span>
              <span>Data Abertura: <strong>12/12/2026</strong></span>
            </div>
            <div class="semeio-cycle-card__date">
              <span class="semeio-cycle-card__date-icon" aria-hidden="true">${icon('calendar', { size: 14 })}</span>
              <span>Previsão Término: <strong>12/12/2026</strong></span>
            </div>
          </div>
        </article>
      </section>

      <section class="semeio-cycle-section">
        <h3 class="semeio-cycle-section__title">Etapas do Ciclo</h3>
        <div class="semeio-cycle-steps" aria-label="Etapas do ciclo">
          ${cycleSteps.map((step) => createSemeioCycleStep(step)).join('')}
        </div>
      </section>
    </section>
  `;
}

function createSemeioCycleTimelineItem(item) {
  return `
    <article class="semeio-cycle-timeline-item">
      <div class="semeio-cycle-timeline-item__marker" aria-hidden="true">
        <span class="semeio-cycle-timeline-item__dot"></span>
      </div>
      <div class="semeio-cycle-timeline-item__content">
        <strong class="semeio-cycle-timeline-item__title">${item.title}</strong>
        <span class="semeio-cycle-timeline-item__subtitle">Responsável: <strong>${item.responsible}</strong></span>
      </div>
      <div class="semeio-cycle-timeline-item__meta">
        <span class="semeio-cycle-timeline-item__date">${item.date}</span>
        ${item.daysAfterSowing ? `<span class="semeio-cycle-timeline-item__days">Dias após o Semeio: <strong>${item.daysAfterSowing}</strong></span>` : ''}
      </div>
    </article>
  `;
}

function createSemeioCycleTimelinePanel() {
  const timelineItems = [
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesarini', date: '23/01/2025' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesarini', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesarini', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesarini', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesarini', date: '23/01/2025', daysAfterSowing: '0 Dias' },
  ];

  return `
    <section class="semeio-cycle-timeline">
      <h3 class="semeio-cycle-section__title">Linha do Tempo</h3>
      <div class="semeio-cycle-timeline-card" aria-label="Linha do tempo do ciclo">
        ${timelineItems.map((item) => createSemeioCycleTimelineItem(item)).join('')}
      </div>
    </section>
  `;
}

function createSemeioCyclePanel() {
  return `
    <section class="semeio-cycle" data-semeio-cycle>
      ${Tabs.createWithPanels({
    id: 'semeio-ciclo-subtabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Dias', content: createSemeioCycleDaysPanel() },
      { label: 'Linha do Tempo', content: createSemeioCycleTimelinePanel() },
    ],
  })}
    </section>
  `;
}

function createDrawerContent() {
  const tabs = Tabs.createWithPanels({
    id: 'enviar-germinacao-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Enviar para Germinação', content: createMainPanel() },
      { label: 'Detalhes', content: createSemeioDetailsPanel() },
      { label: 'Ciclo', content: createSemeioCyclePanel() },
    ],
  });

  return `
    <section class="enviar-germinacao-drawer">
      <div class="enviar-germinacao-drawer__summary">
        <div class="enviar-germinacao-drawer__summary-left">
          <span class="enviar-germinacao-drawer__meta">Cód. Pedido: <strong>001</strong></span>
          <span class="enviar-germinacao-drawer__meta">Cód. Cliente: <strong>22332</strong></span>
          <span class="enviar-germinacao-drawer__meta"><strong>Fazenda Sol Nascente</strong></span>
        </div>
      </div>
      <div class="enviar-germinacao-drawer__summary enviar-germinacao-drawer__summary--bottom">
        <div class="enviar-germinacao-drawer__summary-left">
          <span class="enviar-germinacao-drawer__meta">Cód. Produto: <strong>001</strong></span>
          <span class="enviar-germinacao-drawer__meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
          <span class="enviar-germinacao-drawer__meta">Qtd.: <strong>3.000</strong></span>
        </div>
        <div class="enviar-germinacao-drawer__summary-right">
          ${Chip.createSingle({ label: 'Enxertia', value: 'enxertia', size: 'sm' })}
        </div>
      </div>
      ${tabs}
    </section>
  `;
}

function ensureDrawerMarkup() {
  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'OP-2025-006',
    width: 540,
    content: createDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', drawerHtml);
}

function setupDrawerHeader(drawerElement) {
  const header = drawerElement?.querySelector('.drawer__header');
  if (!header) return;
  header.classList.add('enviar-germinacao-drawer__header');

  const closeButton = header.querySelector('[data-drawer-close]');
  if (!closeButton || header.querySelector('[data-eg-header-status]')) return;

  const status = document.createElement('div');
  status.className = 'enviar-germinacao-drawer__header-status';
  status.setAttribute('data-eg-header-status', 'true');
  status.innerHTML = `
    ${Chip.createSingle({ label: 'Normal', value: 'normal', size: 'sm', className: 'enviar-germinacao-drawer__chip--normal' })}
    ${Chip.createSingle({ label: 'Agendado', value: 'agendado', size: 'sm' })}
  `;
  header.insertBefore(status, closeButton);
}

export function createEnviarGerminacaoDrawer() {
  ensureDrawerMarkup();

  const drawerControls = Drawer.init({ id: DRAWER_ID, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement || !drawerControls) {
    return { open: () => {}, close: () => {}, cleanup: () => {} };
  }

  setupDrawerHeader(drawerElement);

  const tabsRoot = drawerElement.querySelector('#enviar-germinacao-tabs')?.closest('[data-tabs]');
  const autofocusTarget = tabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (autofocusTarget) autofocusTarget.setAttribute('data-drawer-autofocus', '');

  const cleanupInput = Input.init(drawerElement) || (() => {});

  const activateTabsPanel = (tabsContainer, tabIndex) => {
    const tabs = tabsContainer.querySelectorAll('.tabs-tab');
    const tabsContent = tabsContainer.nextElementSibling?.classList.contains('tabs-content')
      ? tabsContainer.nextElementSibling
      : null;
    const panels = tabsContent
      ? Array.from(tabsContent.children).filter((element) => element.classList.contains('tabs-panel'))
      : null;

    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });

    panels?.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
  };

  const handleClick = (event) => {
    const clickedTab = event.target.closest('.tabs-tab');
    const clickedTabsRoot = clickedTab?.closest('[data-tabs]');
    if (clickedTab && clickedTabsRoot && drawerElement.contains(clickedTabsRoot)) {
      const tabIndex = Number(clickedTab.dataset.tab);
      if (!Number.isNaN(tabIndex)) {
        activateTabsPanel(clickedTabsRoot, tabIndex);

        const isMainTabs = clickedTabsRoot.id === 'enviar-germinacao-tabs';
        const isDetalhesTab = tabIndex === 1;
        if (isMainTabs && isDetalhesTab) {
          const detailsSubtabs = drawerElement.querySelector('#semeio-detalhes-subtabs');
          if (detailsSubtabs) {
            activateTabsPanel(detailsSubtabs, 0);
          }
        }

        const isCicloTab = tabIndex === 2;
        if (isMainTabs && isCicloTab) {
          const cycleSubtabs = drawerElement.querySelector('#semeio-ciclo-subtabs');
          if (cycleSubtabs) {
            activateTabsPanel(cycleSubtabs, 0);
          }
        }
      }
      return;
    }

    const accordionToggle = event.target.closest('[data-semeio-details-toggle]');
    if (accordionToggle && drawerElement.contains(accordionToggle)) {
      const accordion = accordionToggle.closest('[data-semeio-details-accordion]');
      if (!accordion) return;
      const isCollapsed = accordion.classList.toggle('is-collapsed');
      accordionToggle.setAttribute('aria-expanded', String(!isCollapsed));
      return;
    }

    const actionButton = event.target.closest('[data-eg-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.egAction;
    if (action === 'cancelar' || action === 'voltar-etapa') {
      drawerControls.close();
      return;
    }
    if (action === 'enviar-germinacao') {
      const form = drawerElement.querySelector('form');
      const formData = form ? Object.fromEntries(new FormData(form).entries()) : {};
      console.log('Enviar para Germinação', formData);
      drawerControls.close();
    }
  };

  drawerElement.addEventListener('click', handleClick);

  const open = (triggerEl = null) => {
    drawerControls.open(triggerEl);
  };

  const close = () => {
    drawerControls.close();
  };

  const cleanup = () => {
    drawerElement.removeEventListener('click', handleClick);
    cleanupInput();
    drawerControls.cleanup?.();
    document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
  };

  return { open, close, cleanup };
}

export default { createEnviarGerminacaoDrawer };
