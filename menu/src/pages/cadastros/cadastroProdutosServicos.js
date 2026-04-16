function renderChipList(values = []) {
  const items = Array.isArray(values) ? values : [];
  return items.map((item) => `
    <button type="button" class="chip chip--input chip--sm" data-value="${item}">
      <span class="chip-label">${item}</span>
    </button>
  `).join('');
}

export function createCadastroProdutosServicosMarkup(state = {}) {
  const form = state.form || {};
  const isSaving = Boolean(state.isSaving);
  const isAtivo = Boolean(state.isAtivo);
  const isProduto = (state.tipo || 'produto') === 'produto';
  const cadastroOpen = state.isCadastroComplementaresOpen !== false;
  const classeOpen = state.isClasseComplementaresOpen !== false;
  const saveError = state.saveError || '';
  const marcaChips = Array.isArray(state.marcaChips) ? state.marcaChips : ['Marca'];
  const fabricanteChips = Array.isArray(state.fabricanteChips) ? state.fabricanteChips : ['Fabricante'];

  return `
    <section class="cadastro-produtos-servicos ${!isProduto ? 'is-servico' : ''}" data-cadastro-produtos-servicos>
      <header class="cadastro-produtos-servicos__header">
        <div>
          <h2 class="cadastro-produtos-servicos__title">Cadastro de Produtos e Serviços</h2>
          <p class="cadastro-produtos-servicos__subtitle">Preencha os dados abaixo para cadastrar um produto ou serviço</p>
        </div>
        <div class="cadastro-produtos-servicos__actions">
          <label class="toggle cadastro-produtos-servicos__toggle">
            <input
              type="checkbox"
              class="toggle-input"
              id="cadastro-produtos-servicos-ativo"
              ${isAtivo ? 'checked' : ''}
              ${isSaving ? 'disabled' : ''}
            />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">Ativo</span>
          </label>
          <button type="button" class="btn btn--outline-dark" data-cps-copy ${isSaving ? 'disabled' : ''}>Copiar cadastro</button>
          <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-cps-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
        </div>
      </header>

      <section class="cadastro-produtos-servicos__card">
        <section class="cadastro-produtos-servicos__section">
          <div class="cadastro-produtos-servicos__section-header">
            <h3 class="cadastro-produtos-servicos__section-title">${isProduto ? 'Dados do produto' : 'Dados do serviço'}</h3>
            <span class="cadastro-produtos-servicos__id">#43434</span>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label">Tipo</label>
              <div class="cadastro-produtos-servicos__segmented" role="tablist" aria-label="Tipo do cadastro">
                <button type="button" class="cadastro-produtos-servicos__segment ${isProduto ? 'is-active' : ''}" data-cps-tipo="produto" ${isSaving ? 'disabled' : ''}>Produto</button>
                <button type="button" class="cadastro-produtos-servicos__segment ${!isProduto ? 'is-active' : ''}" data-cps-tipo="servico" ${isSaving ? 'disabled' : ''}>Serviço</button>
              </div>
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-classe">Classe*</label>
              <div class="cadastro-produtos-servicos__inline-action">
                <input id="cps-classe" class="cadastro-produtos-servicos__input" type="text" placeholder="Selecione a classe" value="${form.classe || ''}" readonly ${isSaving ? 'disabled' : ''} />
                <button type="button" class="btn btn--outline-dark cadastro-produtos-servicos__inline-btn" data-cps-select-class ${isSaving ? 'disabled' : ''}>Selecionar</button>
              </div>
            </div>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-descricao">Descrição*</label>
              <input id="cps-descricao" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a descrição" data-cps-field="descricao" value="${form.descricao || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-unidade">Unidade*</label>
              <input id="cps-unidade" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a unidade" data-cps-field="unidade" value="${form.unidade || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
        </section>

        <section class="cadastro-produtos-servicos__accordion ${!isProduto ? 'is-hidden' : ''}">
          <button type="button" class="cadastro-produtos-servicos__accordion-trigger" data-cps-accordion="cadastro" ${isSaving ? 'disabled' : ''}>
            <span>Complementares de Cadastro</span>
            <span class="cadastro-produtos-servicos__accordion-arrow ${cadastroOpen ? 'is-open' : ''}" aria-hidden="true">⌄</span>
          </button>
          <div class="cadastro-produtos-servicos__accordion-content ${cadastroOpen ? 'is-open' : ''}">
            <div class="cadastro-produtos-servicos__accordion-inner">
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label">Marca</label>
                  <div class="chip-input-field cadastro-produtos-servicos__chip-field">${renderChipList(marcaChips)}</div>
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label">Fabricante</label>
                  <div class="chip-input-field cadastro-produtos-servicos__chip-field">${renderChipList(fabricanteChips)}</div>
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-fornecedores">Fornecedores</label>
                  <input id="cps-fornecedores" class="cadastro-produtos-servicos__input" type="text" data-cps-field="fornecedores" value="${form.fornecedores || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
              </div>
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-grupo-equivalencia">Grupo de Equivalência</label>
                  <input id="cps-grupo-equivalencia" class="cadastro-produtos-servicos__input" type="text" data-cps-field="grupoEquivalencia" value="${form.grupoEquivalencia || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-ncm">NCM</label>
                  <input id="cps-ncm" class="cadastro-produtos-servicos__input" type="text" data-cps-field="ncm" value="${form.ncm || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="cadastro-produtos-servicos__accordion ${!isProduto ? 'is-hidden' : ''}">
          <button type="button" class="cadastro-produtos-servicos__accordion-trigger" data-cps-accordion="classe" ${isSaving ? 'disabled' : ''}>
            <span>Complementares de Classe</span>
            <span class="cadastro-produtos-servicos__accordion-arrow ${classeOpen ? 'is-open' : ''}" aria-hidden="true">⌄</span>
          </button>
          <div class="cadastro-produtos-servicos__accordion-content ${classeOpen ? 'is-open' : ''}">
            <div class="cadastro-produtos-servicos__accordion-inner">
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-principio-ativo">Princípio Ativo</label>
                  <input id="cps-principio-ativo" class="cadastro-produtos-servicos__input" type="text" data-cps-field="principioAtivo" value="${form.principioAtivo || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-grupo-quimico">Grupo Químico</label>
                  <input id="cps-grupo-quimico" class="cadastro-produtos-servicos__input" type="text" data-cps-field="grupoQuimico" value="${form.grupoQuimico || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-modo-acao">Modo de Ação</label>
                  <input id="cps-modo-acao" class="cadastro-produtos-servicos__input" type="text" data-cps-field="modoAcao" value="${form.modoAcao || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
              </div>
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-registro-mapa">Número de Registro MAPA</label>
                  <input id="cps-registro-mapa" class="cadastro-produtos-servicos__input" type="text" data-cps-field="registroMapa" value="${form.registroMapa || ''}" ${isSaving ? 'disabled' : ''} />
                </div>
              </div>
            </div>
          </div>
        </section>

        ${saveError ? `<p class="cadastro-produtos-servicos__error">${saveError}</p>` : ''}

        <footer class="cadastro-produtos-servicos__footer">
          <button type="button" class="btn btn--outline-dark" data-cps-cancel ${isSaving ? 'disabled' : ''}>Cancelar</button>
          <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-cps-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `;
}

export default { createCadastroProdutosServicosMarkup };
