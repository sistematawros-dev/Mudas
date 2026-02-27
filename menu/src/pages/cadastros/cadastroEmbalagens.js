export function createCadastroEmbalagensMarkup(state = {}) {
  const form = state.form || {};
  const isSaving = Boolean(state.isSaving);
  const isAtivo = Boolean(state.isAtivo);
  const saveError = state.saveError || '';
  const unidadeEquivalenciaOptions = Array.isArray(state.unidadeEquivalenciaOptions)
    ? state.unidadeEquivalenciaOptions
    : [];

  return `
    <section class="cadastro-produtos-servicos" data-cadastro-embalagens>
      <header class="cadastro-produtos-servicos__header">
        <div class="cadastro-produtos-servicos__heading">
          <button type="button" class="cadastro-produtos-servicos__back" data-ce-back aria-label="Voltar">
            <svg viewBox="0 0 16 16" fill="none"><path d="M10.5 3L5.5 8L10.5 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div>
            <h2 class="cadastro-produtos-servicos__title">Cadastro de Embalagens</h2>
            <p class="cadastro-produtos-servicos__subtitle">Preencha os dados abaixo para cadastrar um produto ou serviço</p>
          </div>
        </div>
        <div class="cadastro-produtos-servicos__actions">
          <label class="toggle cadastro-produtos-servicos__toggle">
            <input
              type="checkbox"
              class="toggle-input"
              id="cadastro-embalagens-ativo"
              ${isAtivo ? 'checked' : ''}
              ${isSaving ? 'disabled' : ''}
            />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">Ativo</span>
          </label>
          <button type="button" class="btn btn--outline-dark" data-ce-copy ${isSaving ? 'disabled' : ''}>Copiar cadastro</button>
          <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-ce-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
        </div>
      </header>

      <section class="cadastro-produtos-servicos__card">
        <section class="cadastro-produtos-servicos__section">
          <div class="cadastro-produtos-servicos__section-header">
            <h3 class="cadastro-produtos-servicos__section-title">Dados da Embalagem</h3>
            <span class="cadastro-produtos-servicos__id">#43434</span>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-unidade-equivalencia">Unidade de Equivalência**</label>
              <select id="ce-unidade-equivalencia" class="cadastro-produtos-servicos__input" data-ce-field="unidadeEquivalencia" ${isSaving ? 'disabled' : ''}>
                <option value="">Selecione</option>
                ${unidadeEquivalenciaOptions.map((item = {}) => {
    const value = String(item.value || '');
    const label = String(item.label || '');
    const isSelected = value === String(form.unidadeEquivalencia || '') ? 'selected' : '';
    return `<option value="${value}" ${isSelected}>${label}</option>`;
  }).join('')}
              </select>
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-valor-conversao">Valor de Conversão**</label>
              <input id="ce-valor-conversao" class="cadastro-produtos-servicos__input" type="text" placeholder="Digite o valor" data-ce-field="valorConversao" value="${form.valorConversao || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-descricao">Descrição**</label>
              <input id="ce-descricao" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a descrição" data-ce-field="descricao" value="${form.descricao || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-sigla">Sigla*</label>
              <input id="ce-sigla" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a unidade" data-ce-field="sigla" value="${form.sigla || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
        </section>

        ${saveError ? `<p class="cadastro-produtos-servicos__error">${saveError}</p>` : ''}

        <footer class="cadastro-produtos-servicos__footer">
          <button type="button" class="btn btn--outline-dark" data-ce-cancel ${isSaving ? 'disabled' : ''}>Cancelar</button>
          <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-ce-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `;
}

export default { createCadastroEmbalagensMarkup };
