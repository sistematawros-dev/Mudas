const subTabs = [
  { id: 'pessoas-empresas', label: 'Pessoas e Empresas' },
  { id: 'grupo-empresas', label: 'Grupo de empresas' },
  { id: 'categoria', label: 'Categoria' },
  { id: 'setor', label: 'Setor' },
  { id: 'ramo', label: 'Ramo' },
];

function getGrupoEmpresasContent(state = {}) {
  const isSaving = Boolean(state.isSaving);
  const rows = Array.isArray(state.grupoEmpresasRows) ? state.grupoEmpresasRows : [];
  const searchValue = state.grupoEmpresasSearch || '';
  const hasRows = rows.length > 0;

  return `
    <header class="cadastro-pessoa-empresa__header">
      <h2 class="cadastro-pessoa-empresa__title">Cadastrar Grupo</h2>
      <div class="cadastro-pessoa-empresa__header-actions">
        <button type="button" class="btn btn--primary" data-cpe-create="grupo" ${isSaving ? 'disabled' : ''}>
          Criar Novo Grupo
        </button>
      </div>
    </header>

    <section class="cadastro-pessoa-empresa__card">
      <section class="cadastros-table-card">
        <section class="cadastros-filters">
          <div class="cadastros-search">
            <input
              class="cadastros-search__input"
              type="text"
              placeholder="Buscar por: Razão Social, CNPJ, Cidade..."
              data-cpe-grupo-search
              value="${searchValue}"
            />
            <span class="cadastros-search__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
                <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </span>
          </div>
        </section>

        <div class="cadastros-table-wrap">
          <table class="cadastros-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome do Grupo</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${hasRows
      ? rows.map((row = {}) => `
                <tr data-code="${row.codigo || ''}" data-grupo-id="${row.id || row.codigo || ''}">
                  <td>${row.codigo || '-'}</td>
                  <td>${row.nome || '-'}</td>
                  <td>${row.descricao || '-'}</td>
                  <td class="cadastros-actions">
                    <button type="button" class="cadastros-link" data-action="view" data-cpe-grupo-view="${row.id || row.codigo || ''}">Ver
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3" />
                        <circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              `).join('')
      : `
                <tr>
                  <td colspan="4">Nenhum grupo encontrado.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>

        <footer class="cadastros-table-footer">
          <div class="cadastros-table-footer__left">
            <button type="button" class="cadastros-entries-btn">10 Entradas
              <svg viewBox="0 0 12 8" fill="none">
                <path d="M2 2L6 6L10 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
            <span class="cadastros-table-info">Mostrando 1 a 20 de 1230 entradas.</span>
          </div>

          <nav class="cadastros-pagination" aria-label="Paginação">
            <button type="button" class="cadastros-pagination__btn" aria-label="Página anterior">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button" class="cadastros-pagination__number">1</button>
            <button type="button" class="cadastros-pagination__number is-active">2</button>
            <button type="button" class="cadastros-pagination__number">3</button>
            <span class="cadastros-pagination__dots">...</span>
            <button type="button" class="cadastros-pagination__number">98</button>
            <button type="button" class="cadastros-pagination__number">99</button>
            <button type="button" class="cadastros-pagination__btn" aria-label="Próxima página">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </nav>
        </footer>
      </section>
    </section>
  `;
}

function getSubTabContent(state = {}) {
  const activeSubTab = state.activeSubTab || 'pessoas-empresas';
  if (activeSubTab === 'pessoas-empresas') return getPessoasEmpresasContent(state);
  if (activeSubTab === 'grupo-empresas') return getGrupoEmpresasContent(state);

  const labels = {
    categoria: 'Categoria',
    setor: 'Setor',
    ramo: 'Ramo',
  };

  const sectionLabel = labels[activeSubTab] || 'Cadastro';
  return `
    <section class="cadastro-pessoa-empresa__placeholder-card">
      <h3 class="cadastro-pessoa-empresa__placeholder-title">${sectionLabel}</h3>
      <p class="cadastro-pessoa-empresa__placeholder-text">
        Conteúdo de ${sectionLabel} em preparação.
      </p>
    </section>
  `;
}

function getPessoasEmpresasContent(state = {}) {
  const tipo = state.tipo || 'pessoas';
  const isTipoPessoa = tipo === 'pessoas';
  const isAtivo = Boolean(state.isAtivo);
  const isSaving = Boolean(state.isSaving);
  const isComplementaresOpen = Boolean(state.isComplementaresOpen);
  const saveError = state.saveError || '';
  const ramoChips = Array.isArray(state.ramoChips) ? state.ramoChips : [];
  const form = state.form || {};

  return `
    <header class="cadastro-pessoa-empresa__header">
      <h2 class="cadastro-pessoa-empresa__title">Cadastro de Pessoas e Empresas</h2>
      <div class="cadastro-pessoa-empresa__header-actions">
        <label class="toggle cadastro-pessoa-empresa__toggle">
          <input
            type="checkbox"
            class="toggle-input"
            id="cadastro-pessoa-empresa-ativo"
            ${isAtivo ? 'checked' : ''}
            ${isSaving ? 'disabled' : ''}
          />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span class="toggle-label">Ativo</span>
        </label>
        <button type="button" class="btn btn--outline-dark" data-cpe-copy ${isSaving ? 'disabled' : ''}>
          Copiar cadastro
        </button>
        <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-cpe-save ${isSaving ? 'disabled' : ''}>
          Salvar cadastro
        </button>
      </div>
    </header>

    <section class="cadastro-pessoa-empresa__card">

      <section class="cadastro-pessoa-empresa__section">
        <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--tipo-top">
          <div class="cadastro-pessoa-empresa__field">
            <div class="cadastro-pessoa-empresa__label-row cadastro-pessoa-empresa__label-row--tipo">
              <label class="cadastro-pessoa-empresa__label">Tipo</label>
              <span class="cadastro-pessoa-empresa__label-spacer" aria-hidden="true"></span>
            </div>
            <div class="cadastro-pessoa-empresa__tipo-control" role="tablist" aria-label="Tipo de cadastro">
              <button
                type="button"
                class="cadastro-pessoa-empresa__tipo-btn ${isTipoPessoa ? 'is-active' : ''}"
                data-cpe-tipo="pessoas"
                role="tab"
                aria-selected="${isTipoPessoa}"
                ${isSaving ? 'disabled' : ''}
              >
                Pessoas
              </button>
              <button
                type="button"
                class="cadastro-pessoa-empresa__tipo-btn ${!isTipoPessoa ? 'is-active' : ''}"
                data-cpe-tipo="empresas"
                role="tab"
                aria-selected="${!isTipoPessoa}"
                ${isSaving ? 'disabled' : ''}
              >
                Empresas
              </button>
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__field">
            <div class="cadastro-pessoa-empresa__label-row">
              <label class="cadastro-pessoa-empresa__label" for="cpe-grupo">Grupo de Empresas*</label>
              <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="grupo" ${isSaving ? 'disabled' : ''}>
                Criar Grupo
              </button>
            </div>
            <select id="cpe-grupo" class="cadastro-pessoa-empresa__input" data-cpe-field="grupo" ${isSaving ? 'disabled' : ''}>
              <option value="">Selecione o grupo</option>
              <option value="grupo-a" ${form.grupo === 'grupo-a' ? 'selected' : ''}>Grupo A</option>
              <option value="grupo-b" ${form.grupo === 'grupo-b' ? 'selected' : ''}>Grupo B</option>
            </select>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__section">
        <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--initial">
          <div class="cadastro-pessoa-empresa__field">
            <div class="cadastro-pessoa-empresa__label-row">
              <label class="cadastro-pessoa-empresa__label" for="cpe-categoria">Categoria*</label>
              <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="categoria" ${isSaving ? 'disabled' : ''}>
                Criar Categoria
              </button>
            </div>
            <select id="cpe-categoria" class="cadastro-pessoa-empresa__input" data-cpe-field="categoria" ${isSaving ? 'disabled' : ''}>
              <option value="">Selecione a categoria</option>
              <option value="cat-1" ${form.categoria === 'cat-1' ? 'selected' : ''}>Categoria 1</option>
              <option value="cat-2" ${form.categoria === 'cat-2' ? 'selected' : ''}>Categoria 2</option>
            </select>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__section">
        <div class="cadastro-pessoa-empresa__company-header">
          <h3 class="cadastro-pessoa-empresa__section-title cadastro-pessoa-empresa__section-title--company">${isTipoPessoa ? 'Informações da Pessoa Física' : 'Informações da Empresa'}</h3>
          <span class="cadastro-pessoa-empresa__company-id">#43434</span>
        </div>
        <div class="cadastro-pessoa-empresa__company-divider" aria-hidden="true"></div>
      </section>

      <section class="cadastro-pessoa-empresa__section cadastro-pessoa-empresa__empresa-card">

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">${isTipoPessoa ? 'Dados da Pessoa Física' : 'Dados da Empresa'}</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cnpj">${isTipoPessoa ? 'CPF' : 'CNPJ'}</label>
              <input id="cpe-cnpj" class="cadastro-pessoa-empresa__input" type="text" placeholder="${isTipoPessoa ? '000.000.000-00' : '00.000.000/0000-00'}" data-cpe-field="cnpj" value="${form.cnpj || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-razao-social">${isTipoPessoa ? 'Nome Completo' : 'Razão Social'}</label>
              <input id="cpe-razao-social" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="razaoSocial" value="${form.razaoSocial || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-nome-fantasia">${isTipoPessoa ? 'Apelido' : 'Nome Fantasia'}</label>
              <input id="cpe-nome-fantasia" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="nomeFantasia" value="${form.nomeFantasia || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3 cadastro-pessoa-empresa__row--dados-secundaria">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-inscricao-estadual">Inscrição Estadual</label>
              <input id="cpe-inscricao-estadual" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="inscricaoEstadual" value="${form.inscricaoEstadual || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-inscricao-municipal">Inscrição Municipal</label>
              <input id="cpe-inscricao-municipal" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="inscricaoMunicipal" value="${form.inscricaoMunicipal || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--checkbox">
              <label class="checkbox checkbox--sm">
                <input type="checkbox" class="checkbox-input" data-cpe-field="produtorRural" ${form.produtorRural ? 'checked' : ''} ${isSaving ? 'disabled' : ''} />
                <span class="checkbox-box" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="checkbox-label">Produtor Rural</span>
              </label>
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Endereço</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--address-1">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cep">CEP</label>
              <input id="cpe-cep" class="cadastro-pessoa-empresa__input" type="text" placeholder="00000-000" data-cpe-field="cep" value="${form.cep || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-logradouro">Logradouro</label>
              <input id="cpe-logradouro" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="logradouro" value="${form.logradouro || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--number">
              <label class="cadastro-pessoa-empresa__label" for="cpe-numero">Número</label>
              <input id="cpe-numero" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="numero" value="${form.numero || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--address-2">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-complemento">Complemento</label>
              <input id="cpe-complemento" class="cadastro-pessoa-empresa__input" type="text" placeholder="Sala, Andar" data-cpe-field="complemento" value="${form.complemento || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-bairro">Bairro</label>
              <input id="cpe-bairro" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="bairro" value="${form.bairro || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cidade">Cidade</label>
              <input id="cpe-cidade" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="cidade" value="${form.cidade || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--uf">
              <label class="cadastro-pessoa-empresa__label" for="cpe-uf">UF</label>
              <input id="cpe-uf" class="cadastro-pessoa-empresa__input" type="text" placeholder="SP" maxlength="2" data-cpe-field="uf" value="${form.uf || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Contato</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-responsavel">Nome do Responsável</label>
              <input id="cpe-responsavel" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="nomeResponsavel" value="${form.nomeResponsavel || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-celular">Celular / WhatsApp</label>
              <input id="cpe-celular" class="cadastro-pessoa-empresa__input" type="text" placeholder="(00) 00000-0000" data-cpe-field="celular" value="${form.celular || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-telefone-fixo">Telefone Fixo</label>
              <input id="cpe-telefone-fixo" class="cadastro-pessoa-empresa__input" type="text" placeholder="(00) 0000-0000" data-cpe-field="telefoneFixo" value="${form.telefoneFixo || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--email">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-email">E-mail</label>
              <input id="cpe-email" class="cadastro-pessoa-empresa__input" type="email" placeholder="contato@empresa.com" data-cpe-field="email" value="${form.email || ''}" ${isSaving ? 'disabled' : ''} />
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Observações</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--observacoes" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__field">
            <label class="cadastro-pessoa-empresa__label" for="cpe-observacoes">Informações Adicionais</label>
            <textarea id="cpe-observacoes" class="cadastro-pessoa-empresa__textarea" rows="3" placeholder="Informações adicionais sobre o cadastro..." data-cpe-field="observacoes" ${isSaving ? 'disabled' : ''}>${form.observacoes || ''}</textarea>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__accordion">
        <button type="button" class="cadastro-pessoa-empresa__accordion-trigger" data-cpe-accordion-trigger ${isSaving ? 'disabled' : ''}>
          <span>Informações complementares</span>
          <span class="cadastro-pessoa-empresa__accordion-arrow ${isComplementaresOpen ? 'is-open' : ''}" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3.5 6L8 10L12.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
        <div class="cadastro-pessoa-empresa__accordion-content ${isComplementaresOpen ? 'is-open' : ''}">
          <div class="cadastro-pessoa-empresa__accordion-inner">
            <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--2">
              <div class="cadastro-pessoa-empresa__field">
                <div class="cadastro-pessoa-empresa__label-row">
                  <label class="cadastro-pessoa-empresa__label" for="cpe-setor">Setor*</label>
                  <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="setor" ${isSaving ? 'disabled' : ''}>
                    Criar Setor
                  </button>
                </div>
                <select id="cpe-setor" class="cadastro-pessoa-empresa__input" data-cpe-field="setor" ${isSaving ? 'disabled' : ''}>
                  <option value="">Selecione o setor</option>
                  <option value="setor-1" ${form.setor === 'setor-1' ? 'selected' : ''}>Setor 1</option>
                  <option value="setor-2" ${form.setor === 'setor-2' ? 'selected' : ''}>Setor 2</option>
                </select>
              </div>
              <div class="cadastro-pessoa-empresa__field">
                <div class="cadastro-pessoa-empresa__label-row">
                  <label class="cadastro-pessoa-empresa__label" for="cpe-ramo">Ramo*</label>
                  <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="ramo" ${isSaving ? 'disabled' : ''}>
                    Criar Ramo
                  </button>
                </div>
                <div id="cpe-ramo" class="chip-input-field cadastro-pessoa-empresa__ramo-input">
                  ${ramoChips.map((chip) => `
                    <button type="button" class="chip chip--input chip--sm" data-value="${chip}">
                      <span class="chip-label">${chip}</span>
                      <span class="chip-close" data-cpe-remove-ramo="${chip}">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                      </span>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${saveError ? `<p class="cadastro-pessoa-empresa__error">${saveError}</p>` : ''}

      <footer class="cadastro-pessoa-empresa__footer">
        <button type="button" class="btn btn--outline-dark" data-cpe-cancel ${isSaving ? 'disabled' : ''}>Cancelar</button>
        <button type="button" class="btn btn--primary ${isSaving ? 'btn--loading' : ''}" data-cpe-save ${isSaving ? 'disabled' : ''}>Salvar cadastro</button>
      </footer>
    </section>
  `;
}

export function createCadastroPessoaEmpresaMarkup(state = {}) {
  const activeSubTab = state.activeSubTab || 'pessoas-empresas';

  return `
    <section class="cadastro-pessoa-empresa" data-cadastro-pessoa-empresa>
      <nav class="cadastro-pessoa-empresa__subtabs" aria-label="Navegação de cadastro">
        ${subTabs.map((tab) => `
          <button
            type="button"
            class="cadastro-pessoa-empresa__subtab ${tab.id === activeSubTab ? 'is-active' : ''}"
            data-cpe-subtab="${tab.id}"
          >
            ${tab.label}
          </button>
        `).join('')}
      </nav>
      ${getSubTabContent(state)}
    </section>
  `;
}

export default {
  createCadastroPessoaEmpresaMarkup,
};
