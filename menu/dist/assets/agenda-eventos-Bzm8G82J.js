const a=`<main class="agenda-eventos-page">
  <div class="agenda-eventos-inner">
    <div class="agenda-eventos-top">
      <div class="agenda-eventos-title-wrap">
        <button type="button" class="agenda-icon-btn" data-action="back" aria-label="Voltar">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <h1 class="agenda-eventos-title">Agenda de Eventos</h1>
      </div>

      <div class="agenda-eventos-controls">
        <div class="agenda-control-group">
          <button type="button" class="agenda-icon-btn" data-action="prev-month" aria-label="Mês anterior">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" class="agenda-btn agenda-btn--ghost" data-action="today">Hoje</button>
          <button type="button" class="agenda-icon-btn" data-action="next-month" aria-label="Próximo mês">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <strong id="agenda-month-label" class="agenda-month-label">janeiro 2026</strong>
        </div>

        <div class="agenda-view-toggle" role="tablist" aria-label="Visualização">
          <button type="button" class="agenda-view-toggle__btn is-active" data-action="set-view" data-view="month" role="tab" aria-selected="true">Mês</button>
          <button type="button" class="agenda-view-toggle__btn" data-action="set-view" data-view="week" role="tab" aria-selected="false">Semana</button>
          <button type="button" class="agenda-view-toggle__btn" data-action="set-view" data-view="day" role="tab" aria-selected="false">Dia</button>
        </div>

        <div class="agenda-actions">
          <button type="button" class="agenda-btn agenda-btn--primary" data-action="new-event">Novo Evento</button>
        </div>
      </div>
    </div>

    <section class="agenda-eventos-board">
      <aside class="agenda-capacity-sidebar">
        <div class="agenda-filter-card is-hidden" data-role="week-filters">
          <h2>Filtro</h2>
          <ul>
            <li class="agenda-filter-option agenda-filter-option--producao">
              <label>
                <input type="checkbox" value="producao" data-action="toggle-week-filter" checked />
                <span>Produção</span>
              </label>
            </li>
            <li class="agenda-filter-option agenda-filter-option--expedicao">
              <label>
                <input type="checkbox" value="expedicao" data-action="toggle-week-filter" checked />
                <span>Expedição</span>
              </label>
            </li>
            <li class="agenda-filter-option agenda-filter-option--operacoes">
              <label>
                <input type="checkbox" value="operacoes" data-action="toggle-week-filter" checked />
                <span>Operações</span>
              </label>
            </li>
            <li class="agenda-filter-option agenda-filter-option--pedidos">
              <label>
                <input type="checkbox" value="pedidos" data-action="toggle-week-filter" checked />
                <span>Pedidos</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="agenda-capacity-card">
          <h2>Capacidade</h2>
          <ul>
            <li><span class="agenda-dot agenda-dot--normal"></span> Normal (&lt;60%)</li>
            <li><span class="agenda-dot agenda-dot--warning"></span> Atenção (60-85%)</li>
            <li><span class="agenda-dot agenda-dot--critical"></span> Crítico (&gt;85%)</li>
          </ul>
        </div>
      </aside>

      <section class="agenda-calendar" aria-label="Calendário de eventos">
        <div class="agenda-calendar__weekdays" aria-hidden="true">
          <span>DOM</span><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span>
        </div>
        <div id="agenda-calendar-grid" class="agenda-calendar__grid"></div>
      </section>
    </section>
  </div>
</main>
`;export{a as default};
