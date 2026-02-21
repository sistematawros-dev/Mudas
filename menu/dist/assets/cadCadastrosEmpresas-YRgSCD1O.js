import{i as Xs}from"./icons-C9wddX8K.js";import{c as fe,i as ve}from"./drawer-DOh9nE41.js";import{i as be,c as Z,a as Ge,b as X}from"./input-BGfEK18X.js";import{i as ks,c as J}from"./checkbox-Czn0aMdg.js";import{c as je}from"./toggle-8KHLMbPj.js";import{i as Ys,c as ea}from"./segmented-CxRHTJbh.js";/* empty css                    */import{c as Is}from"./chip-Iox8iBys.js";/* empty css               *//* empty css              *//* empty css                 *//* empty css               *//* empty css                  *//* empty css             */const sa=[{id:"pessoas-empresas",label:"Pessoas e Empresas"},{id:"grupo-empresas",label:"Grupo de empresas"},{id:"categoria",label:"Categoria"},{id:"setor",label:"Setor"},{id:"ramo",label:"Ramo"}];function aa(e={}){const a=!!e.isSaving,c=Array.isArray(e.grupoEmpresasRows)?e.grupoEmpresasRows:[],t=e.grupoEmpresasSearch||"",r=c.length>0;return`
    <header class="cadastro-pessoa-empresa__header">
      <h2 class="cadastro-pessoa-empresa__title">Cadastrar Grupo</h2>
      <div class="cadastro-pessoa-empresa__header-actions">
        <button type="button" class="btn btn--primary" data-cpe-create="grupo" ${a?"disabled":""}>
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
              value="${t}"
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
              ${r?c.map((d={})=>`
                <tr data-code="${d.codigo||""}" data-grupo-id="${d.id||d.codigo||""}">
                  <td>${d.codigo||"-"}</td>
                  <td>${d.nome||"-"}</td>
                  <td>${d.descricao||"-"}</td>
                  <td class="cadastros-actions">
                    <button type="button" class="cadastros-link" data-action="view" data-cpe-grupo-view="${d.id||d.codigo||""}">Ver
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3" />
                        <circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              `).join(""):`
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
  `}function oa(e={}){const a=e.activeSubTab||"pessoas-empresas";if(a==="pessoas-empresas")return ta(e);if(a==="grupo-empresas")return aa(e);const t={categoria:"Categoria",setor:"Setor",ramo:"Ramo"}[a]||"Cadastro";return`
    <section class="cadastro-pessoa-empresa__placeholder-card">
      <h3 class="cadastro-pessoa-empresa__placeholder-title">${t}</h3>
      <p class="cadastro-pessoa-empresa__placeholder-text">
        Conteúdo de ${t} em preparação.
      </p>
    </section>
  `}function ta(e={}){const c=(e.tipo||"pessoas")==="pessoas",t=!!e.isAtivo,r=!!e.isSaving,d=!!e.isComplementaresOpen,i=e.saveError||"",v=Array.isArray(e.ramoChips)?e.ramoChips:[],l=e.form||{};return`
    <header class="cadastro-pessoa-empresa__header">
      <h2 class="cadastro-pessoa-empresa__title">Cadastro de Pessoas e Empresas</h2>
      <div class="cadastro-pessoa-empresa__header-actions">
        <label class="toggle cadastro-pessoa-empresa__toggle">
          <input
            type="checkbox"
            class="toggle-input"
            id="cadastro-pessoa-empresa-ativo"
            ${t?"checked":""}
            ${r?"disabled":""}
          />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span class="toggle-label">Ativo</span>
        </label>
        <button type="button" class="btn btn--outline-dark" data-cpe-copy ${r?"disabled":""}>
          Copiar cadastro
        </button>
        <button type="button" class="btn btn--primary ${r?"btn--loading":""}" data-cpe-save ${r?"disabled":""}>
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
                class="cadastro-pessoa-empresa__tipo-btn ${c?"is-active":""}"
                data-cpe-tipo="pessoas"
                role="tab"
                aria-selected="${c}"
                ${r?"disabled":""}
              >
                Pessoas
              </button>
              <button
                type="button"
                class="cadastro-pessoa-empresa__tipo-btn ${c?"":"is-active"}"
                data-cpe-tipo="empresas"
                role="tab"
                aria-selected="${!c}"
                ${r?"disabled":""}
              >
                Empresas
              </button>
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__field">
            <div class="cadastro-pessoa-empresa__label-row">
              <label class="cadastro-pessoa-empresa__label" for="cpe-grupo">Grupo de Empresas*</label>
              <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="grupo" ${r?"disabled":""}>
                Criar Grupo
              </button>
            </div>
            <select id="cpe-grupo" class="cadastro-pessoa-empresa__input" data-cpe-field="grupo" ${r?"disabled":""}>
              <option value="">Selecione o grupo</option>
              <option value="grupo-a" ${l.grupo==="grupo-a"?"selected":""}>Grupo A</option>
              <option value="grupo-b" ${l.grupo==="grupo-b"?"selected":""}>Grupo B</option>
            </select>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__section">
        <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--initial">
          <div class="cadastro-pessoa-empresa__field">
            <div class="cadastro-pessoa-empresa__label-row">
              <label class="cadastro-pessoa-empresa__label" for="cpe-categoria">Categoria*</label>
              <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="categoria" ${r?"disabled":""}>
                Criar Categoria
              </button>
            </div>
            <select id="cpe-categoria" class="cadastro-pessoa-empresa__input" data-cpe-field="categoria" ${r?"disabled":""}>
              <option value="">Selecione a categoria</option>
              <option value="cat-1" ${l.categoria==="cat-1"?"selected":""}>Categoria 1</option>
              <option value="cat-2" ${l.categoria==="cat-2"?"selected":""}>Categoria 2</option>
            </select>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__section">
        <div class="cadastro-pessoa-empresa__company-header">
          <h3 class="cadastro-pessoa-empresa__section-title cadastro-pessoa-empresa__section-title--company">${c?"Informações da Pessoa Física":"Informações da Empresa"}</h3>
          <span class="cadastro-pessoa-empresa__company-id">#43434</span>
        </div>
        <div class="cadastro-pessoa-empresa__company-divider" aria-hidden="true"></div>
      </section>

      <section class="cadastro-pessoa-empresa__section cadastro-pessoa-empresa__empresa-card">

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">${c?"Dados da Pessoa Física":"Dados da Empresa"}</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cnpj">${c?"CPF":"CNPJ"}</label>
              <input id="cpe-cnpj" class="cadastro-pessoa-empresa__input" type="text" placeholder="${c?"000.000.000-00":"00.000.000/0000-00"}" data-cpe-field="cnpj" value="${l.cnpj||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-razao-social">${c?"Nome Completo":"Razão Social"}</label>
              <input id="cpe-razao-social" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="razaoSocial" value="${l.razaoSocial||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-nome-fantasia">${c?"Apelido":"Nome Fantasia"}</label>
              <input id="cpe-nome-fantasia" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="nomeFantasia" value="${l.nomeFantasia||""}" ${r?"disabled":""} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3 cadastro-pessoa-empresa__row--dados-secundaria">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-inscricao-estadual">Inscrição Estadual</label>
              <input id="cpe-inscricao-estadual" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="inscricaoEstadual" value="${l.inscricaoEstadual||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-inscricao-municipal">Inscrição Municipal</label>
              <input id="cpe-inscricao-municipal" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="inscricaoMunicipal" value="${l.inscricaoMunicipal||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--checkbox">
              <label class="checkbox checkbox--sm">
                <input type="checkbox" class="checkbox-input" data-cpe-field="produtorRural" ${l.produtorRural?"checked":""} ${r?"disabled":""} />
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
              <input id="cpe-cep" class="cadastro-pessoa-empresa__input" type="text" placeholder="00000-000" data-cpe-field="cep" value="${l.cep||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-logradouro">Logradouro</label>
              <input id="cpe-logradouro" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="logradouro" value="${l.logradouro||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--number">
              <label class="cadastro-pessoa-empresa__label" for="cpe-numero">Número</label>
              <input id="cpe-numero" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="numero" value="${l.numero||""}" ${r?"disabled":""} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--address-2">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-complemento">Complemento</label>
              <input id="cpe-complemento" class="cadastro-pessoa-empresa__input" type="text" placeholder="Sala, Andar" data-cpe-field="complemento" value="${l.complemento||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-bairro">Bairro</label>
              <input id="cpe-bairro" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="bairro" value="${l.bairro||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cidade">Cidade</label>
              <input id="cpe-cidade" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="cidade" value="${l.cidade||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--uf">
              <label class="cadastro-pessoa-empresa__label" for="cpe-uf">UF</label>
              <input id="cpe-uf" class="cadastro-pessoa-empresa__input" type="text" placeholder="SP" maxlength="2" data-cpe-field="uf" value="${l.uf||""}" ${r?"disabled":""} />
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Contato</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-responsavel">Nome do Responsável</label>
              <input id="cpe-responsavel" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="nomeResponsavel" value="${l.nomeResponsavel||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-celular">Celular / WhatsApp</label>
              <input id="cpe-celular" class="cadastro-pessoa-empresa__input" type="text" placeholder="(00) 00000-0000" data-cpe-field="celular" value="${l.celular||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-telefone-fixo">Telefone Fixo</label>
              <input id="cpe-telefone-fixo" class="cadastro-pessoa-empresa__input" type="text" placeholder="(00) 0000-0000" data-cpe-field="telefoneFixo" value="${l.telefoneFixo||""}" ${r?"disabled":""} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--email">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-email">E-mail</label>
              <input id="cpe-email" class="cadastro-pessoa-empresa__input" type="email" placeholder="contato@empresa.com" data-cpe-field="email" value="${l.email||""}" ${r?"disabled":""} />
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Observações</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--observacoes" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__field">
            <label class="cadastro-pessoa-empresa__label" for="cpe-observacoes">Informações Adicionais</label>
            <textarea id="cpe-observacoes" class="cadastro-pessoa-empresa__textarea" rows="3" placeholder="Informações adicionais sobre o cadastro..." data-cpe-field="observacoes" ${r?"disabled":""}>${l.observacoes||""}</textarea>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__accordion">
        <button type="button" class="cadastro-pessoa-empresa__accordion-trigger" data-cpe-accordion-trigger ${r?"disabled":""}>
          <span>Informações complementares</span>
          <span class="cadastro-pessoa-empresa__accordion-arrow ${d?"is-open":""}" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3.5 6L8 10L12.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
        <div class="cadastro-pessoa-empresa__accordion-content ${d?"is-open":""}">
          <div class="cadastro-pessoa-empresa__accordion-inner">
            <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--2">
              <div class="cadastro-pessoa-empresa__field">
                <div class="cadastro-pessoa-empresa__label-row">
                  <label class="cadastro-pessoa-empresa__label" for="cpe-setor">Setor*</label>
                  <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="setor" ${r?"disabled":""}>
                    Criar Setor
                  </button>
                </div>
                <select id="cpe-setor" class="cadastro-pessoa-empresa__input" data-cpe-field="setor" ${r?"disabled":""}>
                  <option value="">Selecione o setor</option>
                  <option value="setor-1" ${l.setor==="setor-1"?"selected":""}>Setor 1</option>
                  <option value="setor-2" ${l.setor==="setor-2"?"selected":""}>Setor 2</option>
                </select>
              </div>
              <div class="cadastro-pessoa-empresa__field">
                <div class="cadastro-pessoa-empresa__label-row">
                  <label class="cadastro-pessoa-empresa__label" for="cpe-ramo">Ramo*</label>
                  <button type="button" class="btn btn--link cadastro-pessoa-empresa__create-link" data-cpe-create="ramo" ${r?"disabled":""}>
                    Criar Ramo
                  </button>
                </div>
                <div id="cpe-ramo" class="chip-input-field cadastro-pessoa-empresa__ramo-input">
                  ${v.map(C=>`
                    <button type="button" class="chip chip--input chip--sm" data-value="${C}">
                      <span class="chip-label">${C}</span>
                      <span class="chip-close" data-cpe-remove-ramo="${C}">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                      </span>
                    </button>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${i?`<p class="cadastro-pessoa-empresa__error">${i}</p>`:""}

      <footer class="cadastro-pessoa-empresa__footer">
        <button type="button" class="btn btn--outline-dark" data-cpe-cancel ${r?"disabled":""}>Cancelar</button>
        <button type="button" class="btn btn--primary ${r?"btn--loading":""}" data-cpe-save ${r?"disabled":""}>Salvar cadastro</button>
      </footer>
    </section>
  `}function ra(e={}){const a=e.activeSubTab||"pessoas-empresas";return`
    <section class="cadastro-pessoa-empresa" data-cadastro-pessoa-empresa>
      <nav class="cadastro-pessoa-empresa__subtabs" aria-label="Navegação de cadastro">
        ${sa.map(c=>`
          <button
            type="button"
            class="cadastro-pessoa-empresa__subtab ${c.id===a?"is-active":""}"
            data-cpe-subtab="${c.id}"
          >
            ${c.label}
          </button>
        `).join("")}
      </nav>
      ${oa(e)}
    </section>
  `}function hs(e=[]){return(Array.isArray(e)?e:[]).map(c=>`
    <button type="button" class="chip chip--input chip--sm" data-value="${c}">
      <span class="chip-label">${c}</span>
    </button>
  `).join("")}function ca(e={}){const a=e.form||{},c=!!e.isSaving,t=!!e.isAtivo,r=(e.tipo||"produto")==="produto",d=e.isCadastroComplementaresOpen!==!1,i=e.isClasseComplementaresOpen!==!1,v=e.saveError||"",l=Array.isArray(e.marcaChips)?e.marcaChips:["Marca"],C=Array.isArray(e.fabricanteChips)?e.fabricanteChips:["Fabricante"];return`
    <section class="cadastro-produtos-servicos ${r?"":"is-servico"}" data-cadastro-produtos-servicos>
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
              ${t?"checked":""}
              ${c?"disabled":""}
            />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">Ativo</span>
          </label>
          <button type="button" class="btn btn--outline-dark" data-cps-copy ${c?"disabled":""}>Copiar cadastro</button>
          <button type="button" class="btn btn--primary ${c?"btn--loading":""}" data-cps-save ${c?"disabled":""}>Salvar cadastro</button>
        </div>
      </header>

      <section class="cadastro-produtos-servicos__card">
        <section class="cadastro-produtos-servicos__section">
          <div class="cadastro-produtos-servicos__section-header">
            <h3 class="cadastro-produtos-servicos__section-title">${r?"Dados do produto":"Dados do serviço"}</h3>
            <span class="cadastro-produtos-servicos__id">#43434</span>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label">Tipo</label>
              <div class="cadastro-produtos-servicos__segmented" role="tablist" aria-label="Tipo do cadastro">
                <button type="button" class="cadastro-produtos-servicos__segment ${r?"is-active":""}" data-cps-tipo="produto" ${c?"disabled":""}>Produto</button>
                <button type="button" class="cadastro-produtos-servicos__segment ${r?"":"is-active"}" data-cps-tipo="servico" ${c?"disabled":""}>Serviço</button>
              </div>
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-classe">Classe*</label>
              <div class="cadastro-produtos-servicos__inline-action">
                <input id="cps-classe" class="cadastro-produtos-servicos__input" type="text" placeholder="Selecione a classe" value="${a.classe||""}" readonly ${c?"disabled":""} />
                <button type="button" class="btn btn--outline-dark cadastro-produtos-servicos__inline-btn" data-cps-select-class ${c?"disabled":""}>Selecionar</button>
              </div>
            </div>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-descricao">Descrição*</label>
              <input id="cps-descricao" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a descrição" data-cps-field="descricao" value="${a.descricao||""}" ${c?"disabled":""} />
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-unidade">Unidade*</label>
              <input id="cps-unidade" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a unidade" data-cps-field="unidade" value="${a.unidade||""}" ${c?"disabled":""} />
            </div>
          </div>
        </section>

        <section class="cadastro-produtos-servicos__accordion ${r?"":"is-hidden"}">
          <button type="button" class="cadastro-produtos-servicos__accordion-trigger" data-cps-accordion="cadastro" ${c?"disabled":""}>
            <span>Complementares de Cadastro</span>
            <span class="cadastro-produtos-servicos__accordion-arrow ${d?"is-open":""}" aria-hidden="true">⌄</span>
          </button>
          <div class="cadastro-produtos-servicos__accordion-content ${d?"is-open":""}">
            <div class="cadastro-produtos-servicos__accordion-inner">
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label">Marca</label>
                  <div class="chip-input-field cadastro-produtos-servicos__chip-field">${hs(l)}</div>
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label">Fabricante</label>
                  <div class="chip-input-field cadastro-produtos-servicos__chip-field">${hs(C)}</div>
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-fornecedores">Fornecedores</label>
                  <input id="cps-fornecedores" class="cadastro-produtos-servicos__input" type="text" data-cps-field="fornecedores" value="${a.fornecedores||""}" ${c?"disabled":""} />
                </div>
              </div>
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-grupo-equivalencia">Grupo de Equivalência</label>
                  <input id="cps-grupo-equivalencia" class="cadastro-produtos-servicos__input" type="text" data-cps-field="grupoEquivalencia" value="${a.grupoEquivalencia||""}" ${c?"disabled":""} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-ncm">NCM</label>
                  <input id="cps-ncm" class="cadastro-produtos-servicos__input" type="text" data-cps-field="ncm" value="${a.ncm||""}" ${c?"disabled":""} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="cadastro-produtos-servicos__accordion ${r?"":"is-hidden"}">
          <button type="button" class="cadastro-produtos-servicos__accordion-trigger" data-cps-accordion="classe" ${c?"disabled":""}>
            <span>Complementares de Classe</span>
            <span class="cadastro-produtos-servicos__accordion-arrow ${i?"is-open":""}" aria-hidden="true">⌄</span>
          </button>
          <div class="cadastro-produtos-servicos__accordion-content ${i?"is-open":""}">
            <div class="cadastro-produtos-servicos__accordion-inner">
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-principio-ativo">Princípio Ativo</label>
                  <input id="cps-principio-ativo" class="cadastro-produtos-servicos__input" type="text" data-cps-field="principioAtivo" value="${a.principioAtivo||""}" ${c?"disabled":""} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-grupo-quimico">Grupo Químico</label>
                  <input id="cps-grupo-quimico" class="cadastro-produtos-servicos__input" type="text" data-cps-field="grupoQuimico" value="${a.grupoQuimico||""}" ${c?"disabled":""} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-modo-acao">Modo de Ação</label>
                  <input id="cps-modo-acao" class="cadastro-produtos-servicos__input" type="text" data-cps-field="modoAcao" value="${a.modoAcao||""}" ${c?"disabled":""} />
                </div>
              </div>
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-registro-mapa">Número de Registro MAPA</label>
                  <input id="cps-registro-mapa" class="cadastro-produtos-servicos__input" type="text" data-cps-field="registroMapa" value="${a.registroMapa||""}" ${c?"disabled":""} />
                </div>
              </div>
            </div>
          </div>
        </section>

        ${v?`<p class="cadastro-produtos-servicos__error">${v}</p>`:""}

        <footer class="cadastro-produtos-servicos__footer">
          <button type="button" class="btn btn--outline-dark" data-cps-cancel ${c?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${c?"btn--loading":""}" data-cps-save ${c?"disabled":""}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `}function ia(e={}){const a=e.form||{},c=!!e.isSaving,t=!!e.isAtivo,r=e.saveError||"",d=Array.isArray(e.unidadeEquivalenciaOptions)?e.unidadeEquivalenciaOptions:[];return`
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
              ${t?"checked":""}
              ${c?"disabled":""}
            />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">Ativo</span>
          </label>
          <button type="button" class="btn btn--outline-dark" data-ce-copy ${c?"disabled":""}>Copiar cadastro</button>
          <button type="button" class="btn btn--primary ${c?"btn--loading":""}" data-ce-save ${c?"disabled":""}>Salvar cadastro</button>
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
              <select id="ce-unidade-equivalencia" class="cadastro-produtos-servicos__input" data-ce-field="unidadeEquivalencia" ${c?"disabled":""}>
                <option value="">Selecione</option>
                ${d.map((i={})=>{const v=String(i.value||""),l=String(i.label||""),C=v===String(a.unidadeEquivalencia||"")?"selected":"";return`<option value="${v}" ${C}>${l}</option>`}).join("")}
              </select>
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-valor-conversao">Valor de Conversão**</label>
              <input id="ce-valor-conversao" class="cadastro-produtos-servicos__input" type="text" placeholder="Digite o valor" data-ce-field="valorConversao" value="${a.valorConversao||""}" ${c?"disabled":""} />
            </div>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-descricao">Descrição**</label>
              <input id="ce-descricao" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a descrição" data-ce-field="descricao" value="${a.descricao||""}" ${c?"disabled":""} />
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-sigla">Sigla*</label>
              <input id="ce-sigla" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a unidade" data-ce-field="sigla" value="${a.sigla||""}" ${c?"disabled":""} />
            </div>
          </div>
        </section>

        ${r?`<p class="cadastro-produtos-servicos__error">${r}</p>`:""}

        <footer class="cadastro-produtos-servicos__footer">
          <button type="button" class="btn btn--outline-dark" data-ce-cancel ${c?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${c?"btn--loading":""}" data-ce-save ${c?"disabled":""}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `}function na(e={}){return String(e.search||"").trim().toLowerCase()}function Fe(e=[],a=""){return a?e.filter((c={})=>{const t=String(c.codigo||"").toLowerCase(),r=String(c.nome||"").toLowerCase();return t.includes(a)||r.includes(a)}):e}function da(e={}){const a=e.grupoEditor||{},c=a.posicao||"",t=a.nome||"";return`
    <section class="classificacao-ps__grupo-editor" data-cpsc-grupo-editor>
      <header class="classificacao-ps__grupo-editor-header">
        <h4>Novo Grupo</h4>
        <button type="button" class="classificacao-ps__grupo-editor-close" data-cpsc-grupo-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__grupo-editor-field">
        <label for="cpsc-grupo-posicao">Posição</label>
        <input id="cpsc-grupo-posicao" type="text" placeholder="Digite a posição" data-cpsc-grupo-field="posicao" value="${c}" />
      </div>

      <div class="classificacao-ps__grupo-editor-field">
        <label for="cpsc-grupo-nome">Nome do Grupo</label>
        <input id="cpsc-grupo-nome" type="text" placeholder="Digite o nome do Grupo" data-cpsc-grupo-field="nome" value="${t}" />
      </div>

      <footer class="classificacao-ps__grupo-editor-footer">
        <button type="button" class="classificacao-ps__grupo-editor-cancel" data-cpsc-grupo-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-grupo-editor-save>Salvar</button>
      </footer>
    </section>
  `}function la(e={}){const a=e.categoriaEditor||{},c=Array.isArray(e.grupos)?e.grupos:[],t=String(a.grupoId||""),r=a.posicao||"",d=a.nome||"";return`
    <section class="classificacao-ps__categoria-editor" data-cpsc-categoria-editor>
      <header class="classificacao-ps__categoria-editor-header">
        <h4>Nova Categoria</h4>
        <button type="button" class="classificacao-ps__categoria-editor-close" data-cpsc-categoria-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-grupo">Grupo</label>
        <select id="cpsc-categoria-grupo" data-cpsc-categoria-field="grupoId" ${c.length>0?"":"disabled"}>
          <option value="">Selecione</option>
          ${c.map((v={})=>{const l=String(v.id||"");return`<option value="${l}" ${l===t?"selected":""}>${v.codigo||""} ${v.nome||""}</option>`}).join("")}
        </select>
      </div>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-posicao">Posicao</label>
        <input id="cpsc-categoria-posicao" type="text" placeholder="Digite a posicao" data-cpsc-categoria-field="posicao" value="${r}" />
      </div>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-nome">Nome da Categoria</label>
        <input id="cpsc-categoria-nome" type="text" placeholder="Digite o nome da Categoria" data-cpsc-categoria-field="nome" value="${d}" />
      </div>

      <footer class="classificacao-ps__categoria-editor-footer">
        <button type="button" class="classificacao-ps__categoria-editor-cancel" data-cpsc-categoria-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-categoria-editor-save>Salvar</button>
      </footer>
    </section>
  `}function pa(e={}){const a=e.classeEditor||{},c=Array.isArray(e.categorias)?e.categorias:[],t=Array.isArray(e.grupos)?e.grupos:[],r=String(a.categoriaId||""),d=c.find((g={})=>String(g.id||"")===r),i=String(d?.grupoId||""),v=t.find((g={})=>String(g.id||"")===i),l=v?.nome?`Grupo ${v.nome}`:"",C=a.posicao||"",S=a.nome||"",A=a.produtos!==!1?"checked":"",M=a.servicos!==!1?"checked":"";return`
    <section class="classificacao-ps__classe-editor" data-cpsc-classe-editor>
      <header class="classificacao-ps__classe-editor-header">
        <h4>Nova Classe</h4>
        <button type="button" class="classificacao-ps__classe-editor-close" data-cpsc-classe-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-categoria">Categoria</label>
        <select id="cpsc-classe-categoria" data-cpsc-classe-field="categoriaId" ${c.length>0?"":"disabled"}>
          <option value="">Selecione</option>
          ${c.map((g={})=>{const f=String(g.id||"");return`<option value="${f}" ${f===r?"selected":""}>${g.codigo||""} ${g.nome||""}</option>`}).join("")}
        </select>
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-grupo">Grupo</label>
        <input id="cpsc-classe-grupo" type="text" value="${l}" readonly />
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-posicao">Posicao</label>
        <input id="cpsc-classe-posicao" type="text" placeholder="Digite a posicao" data-cpsc-classe-field="posicao" value="${C}" />
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-nome">Nome da Classe</label>
        <input id="cpsc-classe-nome" type="text" placeholder="Digite o nome da Categoria" data-cpsc-classe-field="nome" value="${S}" />
      </div>

      <div class="classificacao-ps__classe-editor-checks">
        <label class="classificacao-ps__classe-editor-check">
          <input type="checkbox" data-cpsc-classe-field="produtos" ${A} />
          <span>Produtos</span>
        </label>
        <label class="classificacao-ps__classe-editor-check">
          <input type="checkbox" data-cpsc-classe-field="servicos" ${M} />
          <span>Servicos</span>
        </label>
      </div>

      <footer class="classificacao-ps__classe-editor-footer">
        <button type="button" class="classificacao-ps__classe-editor-cancel" data-cpsc-classe-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-classe-editor-save>Salvar</button>
      </footer>
    </section>
  `}function Ne(e=[],a="",c=""){return!Array.isArray(e)||e.length===0?'<p class="classificacao-ps__empty">Nenhum item encontrado.</p>':`
    <ul class="classificacao-ps__list" role="list">
      ${e.map((t={})=>{const r=String(t.id||"");return`
          <li>
            <button
              type="button"
              class="classificacao-ps__row ${r&&r===String(a||"")?"is-selected":""}"
              data-cpsc-select="${c}"
              data-cpsc-id="${r}"
            >
              <span class="classificacao-ps__row-left" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                ${c==="classe"?`<span class="classificacao-ps__row-file" data-cpsc-classe-produtos="${r}">${Xs("file",{size:12})}</span>`:'<svg viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>'}
              </span>
              <span class="classificacao-ps__row-label">
                <span class="classificacao-ps__row-code">${t.codigo||"-"}</span>
                <span class="classificacao-ps__row-name">${t.nome||"-"}</span>
              </span>
              <span class="classificacao-ps__row-right" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.4" stroke="currentColor" stroke-width="1.2"/></svg>
                ${c==="grupo"?`<span class="classificacao-ps__row-kebab" data-cpsc-grupo-edit="${r}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`:c==="categoria"?`<span class="classificacao-ps__row-kebab" data-cpsc-categoria-edit="${r}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`:c==="classe"?`<span class="classificacao-ps__row-kebab" data-cpsc-classe-edit="${r}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`:'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>'}
              </span>
            </button>
          </li>
        `}).join("")}
    </ul>
  `}function ua(e={}){const a=!!e.isSaving,c=e.search||"",t=na(e),r=Fe(Array.isArray(e.grupos)?e.grupos:[],t),d=String(e.selectedGrupoId||""),v=(Array.isArray(e.categorias)?e.categorias:[]).filter((b={})=>String(b.grupoId||"")===d),l=Fe(v,t),C=String(e.selectedCategoriaId||""),A=(Array.isArray(e.classes)?e.classes:[]).filter((b={})=>String(b.categoriaId||"")===C),M=Fe(A,t),q=(e.grupoView||"list")==="editor",g=(e.categoriaView||"list")==="editor",f=(e.classeView||"list")==="editor";return`
    <section class="classificacao-ps">
      <header class="classificacao-ps__header">
        <h2 class="classificacao-ps__title">Classificação de Produtos e Serviços</h2>
        <div class="classificacao-ps__actions">
          <button type="button" class="btn btn--outline-dark" data-cpsc-cancel ${a?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${a?"btn--loading":""}" data-cpsc-save ${a?"disabled":""}>Salvar cadastro</button>
        </div>
      </header>

      <section class="classificacao-ps__card">
        <div class="classificacao-ps__search-wrap">
          <label class="classificacao-ps__search">
            <input
              type="text"
              class="classificacao-ps__search-input"
              placeholder="Buscar na estrutura..."
              value="${c}"
              data-cpsc-search
              ${a?"disabled":""}
            />
            <span class="classificacao-ps__search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
                <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </span>
          </label>
          <button type="button" class="classificacao-ps__search-action" data-cpsc-search-menu aria-label="Ações da busca" ${a?"disabled":""}>
            <svg viewBox="0 0 16 16" fill="none"><path d="M3 3.5H13M3 8H13M3 12.5H13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </button>
        </div>

        <div class="classificacao-ps__columns">
          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Grupo</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="grupo" ${a?"disabled":""}>Novo +</button>
            </header>
            ${q?da(e):Ne(r,d,"grupo")}
          </section>

          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Categoria</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="categoria" ${a?"disabled":""}>Novo +</button>
            </header>
            ${g?la(e):Ne(l,C,"categoria")}
          </section>

          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Classe</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="classe" ${a?"disabled":""}>Novo +</button>
            </header>
            ${f?pa(e):Ne(M,e.selectedClasseId||"","classe")}
          </section>
        </div>

        <footer class="classificacao-ps__footer">
          <button type="button" class="btn btn--outline-dark" data-cpsc-cancel ${a?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${a?"btn--loading":""}" data-cpsc-save ${a?"disabled":""}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `}const ie="grupo-empresa-drawer";function ye(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Re(){const e=Date.now()%9e4;return String(e+1e4)}function ga(e=[]){return Array.isArray(e)?e.map((a={},c)=>({id:String(a.id??`cad-${c+1}`),nome:String(a.nome??""),documento:a.documento?String(a.documento):"",tipo:a.tipo==="PJ"?"PJ":"PF",href:a.href?String(a.href):""})):[]}function Es(e=[],a=""){const c=String(a||"").trim().toLowerCase();return c?e.filter((t={})=>{const r=String(t.nome||"").toLowerCase(),d=String(t.documento||"").toLowerCase();return r.includes(c)||d.includes(c)}):e}function fa(e){return e==="PJ"?"Pessoa Jurídica":"Pessoa Física"}function ws(e,a=""){const c=String(e||"").trim();return!c||(Array.isArray(a)?a:[a]).filter(Boolean).some(d=>c.toLowerCase()===String(d).toLowerCase())?"":c}function va(e={},a=!1,c=!1){const t=ye(e.id||""),r=J({id:`grupo-empresa-cadastro-${t}`,size:"sm",checked:!!a,disabled:!!c,className:"grupo-empresa-drawer__item-checkbox"}),d=e.tipo==="PJ"?'<svg viewBox="0 0 16 16" fill="none"><path d="M3 13.5V4.5H13V13.5M6 4.5V2.5H10V4.5M6 7H10M6 9.5H10M6 12H10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>':'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.2" stroke="currentColor" stroke-width="1.2"/><path d="M3.5 13.5C4 10.9 5.6 9.5 8 9.5C10.4 9.5 12 10.9 12.5 13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';return`
    <li class="grupo-empresa-drawer__item">
      <div class="grupo-empresa-drawer__item-left">
        ${r}
        <span class="grupo-empresa-drawer__item-avatar grupo-empresa-drawer__item-avatar--${e.tipo==="PJ"?"pj":"pf"}" aria-hidden="true">${d}</span>
        <div class="grupo-empresa-drawer__item-texts">
          <p class="grupo-empresa-drawer__item-name">${ye(e.nome||"-")}</p>
          <p class="grupo-empresa-drawer__item-meta">
            ${ye(e.documento||"-")} • ${ye(fa(e.tipo))}
          </p>
        </div>
      </div>
      <button
        type="button"
        class="grupo-empresa-drawer__item-link"
        data-ge-action="view-cadastro"
        data-ge-cadastro-id="${t}"
      >
        Ver cadastro
      </button>
    </li>
  `}function ma(e={}){const c=(e.mode||"create")==="view",t=Es(e.linkedCadastros,e.search),r=Array.isArray(e.linkedCadastros)?e.linkedCadastros.length:0,d=e.selectedIds instanceof Set?e.selectedIds.size:0,i=t.length>0&&t.every(M=>e.selectedIds instanceof Set&&e.selectedIds.has(M.id)),v=Z({id:"grupo-empresa-codigo",label:"Código",required:!0,value:e.form?.codigo||"",disabled:!0,readonly:!0}),l=Z({id:"grupo-empresa-nome",label:"Nome do Grupo",required:!0,placeholder:"Digite o nome do grupo",value:e.form?.nome||"",disabled:c||e.saving,readonly:c}),C=Z({id:"grupo-empresa-descricao",label:"Descrição",optional:!0,placeholder:"Adicione uma descrição",value:e.form?.descricao||"",disabled:c||e.saving,readonly:c}),S=Ge({id:"grupo-empresa-search-cadastros",placeholder:"Buscar por nome ou documento...",value:e.search||"",disabled:e.loading||e.saving}),A=J({id:"grupo-empresa-select-all",size:"sm",checked:i,disabled:c||e.loading||e.saving||t.length===0,label:`Selecionar todos (${d}/${r})`,className:"grupo-empresa-drawer__select-all"});return`
    <div class="grupo-empresa-drawer" data-ge-drawer-root>
      <div class="grupo-empresa-drawer__form">
        ${v}
        ${l}
        ${C}
      </div>

      <section class="grupo-empresa-drawer__section">
        <h3 class="grupo-empresa-drawer__section-title">Vincular Cadastros</h3>
        ${S}
        <div class="grupo-empresa-drawer__select-all-row">${A}</div>

        <ul class="grupo-empresa-drawer__list" data-ge-cadastros-list>
          ${t.length>0?t.map(M=>va(M,e.selectedIds instanceof Set&&e.selectedIds.has(M.id),c||e.loading||e.saving)).join(""):'<li class="grupo-empresa-drawer__empty">Nenhum cadastro encontrado.</li>'}
        </ul>
      </section>

      ${e.error?`<p class="grupo-empresa-drawer__error">${ye(e.error)}</p>`:""}
    </div>
  `}function ba(e={}){const a=e.mode||"create",t=a==="view"||e.saving||e.loading;return`
    <div class="grupo-empresa-drawer__footer">
      <div class="grupo-empresa-drawer__footer-left">
        ${a==="create"?'<button type="button" class="btn btn--primary" data-ge-action="create-new-group">Criar Novo Grupo</button>':""}
      </div>
      <div class="grupo-empresa-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-ge-action="cancel" ${e.saving?"disabled":""}>Cancelar</button>
        <button type="button" class="btn btn--primary ${e.saving?"btn--loading":""}" data-ge-action="save" ${t?"disabled":""}>Salvar</button>
      </div>
    </div>
  `}function _a(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onSaved:typeof e.onSaved=="function"?e.onSaved:null,onSearchCadastros:typeof e.onSearchCadastros=="function"?e.onSearchCadastros:null,onOpenCadastro:typeof e.onOpenCadastro=="function"?e.onOpenCadastro:null,onCreateNewGroup:typeof e.onCreateNewGroup=="function"?e.onCreateNewGroup:null};document.querySelector(`[data-drawer="${ie}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ie}"]`)?.remove();const c=fe({id:ie,title:"Grupo de Empresa",width:540,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);const t=ve({id:ie,root:document,onClose:()=>{l.open=!1,l.search="",l.selectedIds=new Set,l.error="",a.onClose&&a.onClose()}}),r=document.querySelector(`[data-drawer="${ie}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};const d=r.querySelector(".drawer__header"),i=d?.querySelector(".drawer__title");d&&i&&!d.querySelector(".grupo-empresa-drawer__subtitle")&&(d.classList.add("grupo-empresa-drawer__header"),i.insertAdjacentHTML("afterend",'<p class="grupo-empresa-drawer__subtitle">Preencha os dados e vincule pessoas ou empresas ao grupo</p>'));let v=()=>{},l={open:!1,mode:"create",grupoId:null,loading:!1,saving:!1,error:"",search:"",form:{codigo:Re(),nome:"",descricao:""},linkedCadastros:[],selectedIds:new Set};const C=()=>{const b=r.querySelector(".drawer__body"),u=r.querySelector(".drawer__footer");!b||!u||(b.innerHTML=ma(l),u.innerHTML=ba(l),v(),v=be(r)||(()=>{}),ks(r))},S=b=>{if(!(b.target instanceof Element))return;const u=b.target.closest("input, textarea");if(u instanceof HTMLInputElement||u instanceof HTMLTextAreaElement){if(u.id==="grupo-empresa-search-cadastros"){l.search=u.value||"",a.onSearchCadastros&&a.onSearchCadastros(l.search),C();return}if(u.id==="grupo-empresa-nome"){l.form={...l.form||{},nome:u.value||""},l.error="";return}if(u.id==="grupo-empresa-descricao"){l.form={...l.form||{},descricao:u.value||""};return}}},A=b=>{if(!(b.target instanceof Element))return;const u=b.target.closest('input[type="checkbox"]');if(!(u instanceof HTMLInputElement))return;const _=Es(l.linkedCadastros,l.search);if(u.id==="grupo-empresa-select-all"){const H=new Set(l.selectedIds||[]);u.checked?_.forEach(P=>H.add(P.id)):_.forEach(P=>H.delete(P.id)),l.selectedIds=H,C();return}if(!u.id.startsWith("grupo-empresa-cadastro-"))return;const I=u.id.replace("grupo-empresa-cadastro-",""),E=new Set(l.selectedIds||[]);u.checked?E.add(I):E.delete(I),l.selectedIds=E,C()},M=async b=>{if(!(b.target instanceof Element))return;const u=b.target.closest("[data-ge-action]");if(!u)return;const _=u.getAttribute("data-ge-action")||"";if(_==="cancel"){t.close();return}if(_==="create-new-group"){a.onCreateNewGroup&&a.onCreateNewGroup(),l.form={codigo:Re(),nome:"",descricao:""},l.selectedIds=new Set,l.error="",C();return}if(_==="view-cadastro"){const I=u.getAttribute("data-ge-cadastro-id")||"",E=(l.linkedCadastros||[]).find(P=>P?.id===I);if(a.onOpenCadastro){a.onOpenCadastro(E||null);return}const H=E?.href;H&&window.open(H,"_blank","noopener,noreferrer");return}if(!(_!=="save"||l.mode==="view"||l.saving)){if(!l.form?.nome?.trim()){l.error="Informe o nome do grupo.",C();return}l.saving=!0,l.error="",C();try{const I={id:l.grupoId||null,codigo:l.form?.codigo||"",nome:l.form?.nome||"",descricao:l.form?.descricao||"",linkedCadastros:Array.from(l.selectedIds||[]),mode:l.mode};a.onSaved&&await a.onSaved(I),l.saving=!1,t.close()}catch{l.saving=!1,l.error="Não foi possível salvar o grupo. Tente novamente.",C()}}};return r.addEventListener("input",S),r.addEventListener("change",A),r.addEventListener("click",M),C(),{open:(b={})=>{const u=b.mode==="view"||b.mode==="edit"?b.mode:"create",_=b.initialData||{},I=ga(b.linkedCadastros);l={...l,open:!0,mode:u,grupoId:b.grupoId??null,loading:!!b.loading,saving:!!b.saving,error:b.error?String(b.error):"",search:"",form:{codigo:_.codigo?String(_.codigo):u==="create"?Re():"",nome:ws(_.nome,"Nome do Grupo"),descricao:ws(_.descricao,["Descri��o da empresa","Descrição da empresa","Adicione uma descri��o","Adicione uma descrição"])},linkedCadastros:I,selectedIds:new Set(Array.isArray(b.selectedCadastroIds)?b.selectedCadastroIds:[])},C(),t.open(b.triggerEl||null)},close:()=>t.close(),cleanup:()=>{v(),r.removeEventListener("input",S),r.removeEventListener("change",A),r.removeEventListener("click",M),t.cleanup(),document.querySelector(`[data-drawer="${ie}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ie}"]`)?.remove()}}}const ne="classe-produtos-drawer";function K(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ca(e=[]){return Array.isArray(e)?e.map((a={},c)=>({id:String(a.id??`classe-produto-${c+1}`),codigo:String(a.codigo??""),tipo:String(a.tipo??""),descricao:String(a.descricao??""),unidade:String(a.unidade??"")})):[]}function ha(e=[],a=""){const c=String(a||"").trim().toLowerCase();return c?e.filter((t={})=>{const r=String(t.codigo||"").toLowerCase(),d=String(t.tipo||"").toLowerCase(),i=String(t.descricao||"").toLowerCase(),v=String(t.unidade||"").toLowerCase();return r.includes(c)||d.includes(c)||i.includes(c)||v.includes(c)}):e}function wa(e={},a=new Set,c=!1){const t=K(e.id||""),r=a instanceof Set&&a.has(e.id);return`
    <tr>
      <td class="classe-produtos-drawer__cell-check">${J({id:`classe-produtos-item-${t}`,size:"sm",checked:!!r,disabled:!!c})}</td>
      <td>${K(e.codigo||"-")}</td>
      <td>${K(e.tipo||"-")}</td>
      <td>${K(e.descricao||"-")}</td>
      <td>${K(e.unidade||"-")}</td>
    </tr>
  `}function ya(e={}){const a=ha(e.items,e.search),c=!!(e.loading||e.saving),t=(e.items||[]).find((C={})=>e.selectedIds instanceof Set&&e.selectedIds.has(C.id)),r=e.selectedIds instanceof Set&&e.selectedIds.size>0,d=Array.isArray(e.classOptions)?e.classOptions:[],i=e.view==="change-class",v=c||i,l=Ge({id:"classe-produtos-search",placeholder:"Buscar Produto/Serviço",value:e.search||"",disabled:v});return`
    <div class="classe-produtos-drawer">
      <div class="classe-produtos-drawer__search ${v?"is-inactive":""}">${l}</div>

      <div class="classe-produtos-drawer__table-wrap ${v?"is-inactive":""}">
        <table class="classe-produtos-drawer__table">
          <thead>
            <tr>
              <th class="classe-produtos-drawer__cell-check"></th>
              <th>Código</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Unidade</th>
            </tr>
          </thead>
          <tbody>
            ${a.length>0?a.map((C={})=>wa(C,e.selectedIds,v)).join(""):'<tr><td colspan="5" class="classe-produtos-drawer__empty">Nenhum item encontrado.</td></tr>'}
          </tbody>
        </table>
      </div>

      ${i?`
      <section class="classe-produtos-drawer__change-class">
        <header class="classe-produtos-drawer__change-class-header">Alterar Classe</header>
        <div class="classe-produtos-drawer__change-class-field">
          <label for="classe-produtos-change-target">Selecionar</label>
          <select id="classe-produtos-change-target" data-cpd-field="changeClassTargetId" ${c?"disabled":""}>
            <option value="">Selecione</option>
            ${d.map((C={})=>{const S=String(C.id||""),A=S===String(e.changeClassTargetId||"")?"selected":"";return`<option value="${K(S)}" ${A}>${K(C.nome||"-")}</option>`}).join("")}
          </select>
        </div>
        <footer class="classe-produtos-drawer__change-class-actions">
          <button type="button" class="classe-produtos-drawer__change-class-cancel" data-cpd-action="cancel-change-class">Cancelar</button>
          <button type="button" class="btn btn--primary" data-cpd-action="save-change-class" ${c||!e.changeClassTargetId?"disabled":""}>Salvar</button>
        </footer>
      </section>
      `:`
      <div class="classe-produtos-drawer__selected">
        <div class="classe-produtos-drawer__selected-info">
          <span class="classe-produtos-drawer__selected-label">Selecionado:</span>
          <strong class="classe-produtos-drawer__selected-value">${K(t?.descricao||"-")}</strong>
        </div>
        <button type="button" class="btn btn--outline-dark" data-cpd-action="change-class" ${!r||c?"disabled":""}>Alterar classe</button>
      </div>
      `}

      ${e.error?`<p class="classe-produtos-drawer__error">${K(e.error)}</p>`:""}
    </div>
  `}function Sa(e={}){if(e.view==="change-class")return"";const a=!!(e.loading||e.saving);return`
    <div class="classe-produtos-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-cpd-action="access-cadastro" ${a?"disabled":""}>Acessar cadastro</button>
      <div class="classe-produtos-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-cpd-action="cancel" ${a?"disabled":""}>Cancelar</button>
        <button type="button" class="btn btn--primary ${e.saving?"btn--loading":""}" data-cpd-action="confirm" ${a?"disabled":""}>Selecionar</button>
      </div>
    </div>
  `}function $a(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onConfirm:typeof e.onConfirm=="function"?e.onConfirm:null,onAccessCadastro:typeof e.onAccessCadastro=="function"?e.onAccessCadastro:null,onChangeClass:typeof e.onChangeClass=="function"?e.onChangeClass:null};document.querySelector(`[data-drawer="${ne}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ne}"]`)?.remove();const c=fe({id:ne,title:"Classe",width:540,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);const t=ve({id:ne,root:document,onClose:()=>{i.open=!1,i.search="",i.selectedIds=new Set,a.onClose&&a.onClose()}}),r=document.querySelector(`[data-drawer="${ne}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};let d=()=>{},i={open:!1,classeId:null,classeNome:"",loading:!1,saving:!1,error:"",search:"",items:[],selectedIds:new Set,classOptions:[],view:"list",changeClassTargetId:""};const v=()=>{const f=r.querySelector(".drawer__title"),b=r.querySelector(".drawer__body"),u=r.querySelector(".drawer__footer");!f||!b||!u||(f.textContent=i.classeNome||"Classe",b.innerHTML=ya(i),u.innerHTML=Sa(i),u.style.display=i.view==="change-class"?"none":"",d(),d=be(r)||(()=>{}),ks(r))},l=f=>{const b=new Set(i.selectedIds||[]);b.has(f)?b.delete(f):b.add(f),i.selectedIds=b},C=f=>{if(!(f.target instanceof Element))return;const b=f.target.closest("#classe-produtos-search");b instanceof HTMLInputElement&&(i.search=b.value||"",v())},S=f=>{if(!(f.target instanceof Element))return;const b=f.target.closest('[data-cpd-field="changeClassTargetId"]');if(b instanceof HTMLSelectElement){i.changeClassTargetId=b.value||"",v();return}const u=f.target.closest('input[type="checkbox"]');if(!(u instanceof HTMLInputElement)||!u.id.startsWith("classe-produtos-item-"))return;const _=u.id.replace("classe-produtos-item-","");l(_),v()},A=f=>{if(!(f.target instanceof Element))return;const b=f.target.closest("[data-cpd-action]");if(!b)return;const u=b.getAttribute("data-cpd-action")||"";if(u==="cancel"){t.close();return}if(u==="access-cadastro"){const _=(i.items||[]).find((I={})=>i.selectedIds instanceof Set&&i.selectedIds.has(I.id))||null;a.onAccessCadastro&&a.onAccessCadastro(_);return}if(u==="change-class"){i.view="change-class",i.changeClassTargetId="",i.error="",v();return}if(u==="cancel-change-class"){i.view="list",i.changeClassTargetId="",i.error="",v();return}if(u==="save-change-class"){if(!i.changeClassTargetId)return;a.onChangeClass&&a.onChangeClass({classeId:i.classeId||null,selectedIds:Array.from(i.selectedIds||[]),targetClasseId:i.changeClassTargetId}),i.view="list",i.changeClassTargetId="",i.error="",v();return}u==="confirm"&&(a.onConfirm&&a.onConfirm(Array.from(i.selectedIds||[]),i.classeId||null),t.close())};return r.addEventListener("input",C),r.addEventListener("change",S),r.addEventListener("click",A),v(),{open:(f={})=>{i={...i,open:!0,classeId:f.classeId??null,classeNome:String(f.classeNome||""),loading:!!f.loading,saving:!!f.saving,error:f.error?String(f.error):"",search:"",items:Ca(f.items),selectedIds:new Set(Array.isArray(f.initialSelectedIds)?f.initialSelectedIds:[]),classOptions:Array.isArray(f.classOptions)?f.classOptions:[],view:"list",changeClassTargetId:""},v(),t.open(f.triggerEl||null)},close:()=>t.close(),cleanup:()=>{d(),r.removeEventListener("input",C),r.removeEventListener("change",S),r.removeEventListener("click",A),t.cleanup(),document.querySelector(`[data-drawer="${ne}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ne}"]`)?.remove()}}}const de="selecionar-classe-drawer";function G(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ka(e=[]){return Array.isArray(e)?e.map((a={},c)=>({id:String(a.id??`grupo-${c+1}`),codigo:String(a.codigo??""),nome:String(a.nome??"")})):[]}function Ia(e=[]){return Array.isArray(e)?e.map((a={},c)=>({id:String(a.id??`categoria-${c+1}`),grupoId:String(a.grupoId??""),codigo:String(a.codigo??""),nome:String(a.nome??"")})):[]}function Ea(e=[]){return Array.isArray(e)?e.map((a={},c)=>({id:String(a.id??`classe-${c+1}`),categoriaId:String(a.categoriaId??""),codigo:String(a.codigo??""),nome:String(a.nome??"")})):[]}function Aa(e=[],a=[],c=[]){const t=ka(e),r=Ia(a),d=Ea(c);return t.map(i=>{const v=r.filter(l=>l.grupoId===i.id).map(l=>({...l,classes:d.filter(C=>C.categoriaId===l.id)}));return{...i,categorias:v}})}function xa(e=[],a=""){const c=String(a||"").trim().toLowerCase();return c?e.map(t=>{const r=`${t.codigo} ${t.nome}`.toLowerCase().includes(c),d=(t.categorias||[]).map(i=>{const v=`${i.codigo} ${i.nome}`.toLowerCase().includes(c),l=(i.classes||[]).filter(C=>`${C.codigo} ${C.nome}`.toLowerCase().includes(c));return!v&&l.length===0?null:{...i,classes:l}}).filter(Boolean);return!r&&d.length===0?null:{...t,categorias:r?t.categorias||[]:d}}).filter(Boolean):e}function La(){return`
    <span class="selecionar-classe-drawer__row-actions" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.4" stroke="currentColor" stroke-width="1.2"/></svg>
      <svg viewBox="0 0 16 16" fill="none"><path d="M3 1.8H10L13.2 5V14.2H3V1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 1.8V5H13.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
    </span>
  `}function ys(e=[],a=""){const c=String(a||"");if(!c)return null;for(let t=0;t<e.length;t+=1){const r=e[t]||{},d=Array.isArray(r.categorias)?r.categorias:[];for(let i=0;i<d.length;i+=1){const v=d[i]||{},l=Array.isArray(v.classes)?v.classes:[];for(let C=0;C<l.length;C+=1){const S=l[C]||{};if(String(S.id||"")===c)return{id:String(S.id||""),codigo:String(S.codigo||""),nome:String(S.nome||""),categoriaId:String(v.id||""),grupoId:String(r.id||"")}}}}return null}function Ba(e={}){const a=xa(Array.isArray(e.tree)?e.tree:[],e.search);return!Array.isArray(a)||a.length===0?'<p class="selecionar-classe-drawer__empty">Nenhum item encontrado.</p>':`
    <ul class="selecionar-classe-drawer__tree" role="tree">
      ${a.map((c={})=>{const t=String(c.id||""),r=e.expandedGrupoIds instanceof Set?e.expandedGrupoIds.has(t):!1,d=Array.isArray(c.categorias)?c.categorias:[];return`
          <li class="selecionar-classe-drawer__node">
            <button
              type="button"
              class="selecionar-classe-drawer__row selecionar-classe-drawer__row--grupo"
              data-scd-toggle="grupo"
              data-scd-id="${G(t)}"
            >
              <span class="selecionar-classe-drawer__row-left" aria-hidden="true">
                <svg class="selecionar-classe-drawer__icon-chevron ${r?"is-expanded":""}" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="selecionar-classe-drawer__icon-folder" viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              </span>
              <span class="selecionar-classe-drawer__row-label">
                <span class="selecionar-classe-drawer__row-code">${G(c.codigo||"-")}</span>
                <span class="selecionar-classe-drawer__row-name">${G(c.nome||"-")}</span>
              </span>
            </button>

            ${r?`
            <ul class="selecionar-classe-drawer__children">
              ${d.map((i={})=>{const v=String(i.id||""),l=e.expandedCategoriaIds instanceof Set?e.expandedCategoriaIds.has(v):!1,C=Array.isArray(i.classes)?i.classes:[];return`
                  <li class="selecionar-classe-drawer__node">
                    <button
                      type="button"
                      class="selecionar-classe-drawer__row selecionar-classe-drawer__row--categoria"
                      data-scd-toggle="categoria"
                      data-scd-id="${G(v)}"
                    >
                      <span class="selecionar-classe-drawer__row-left" aria-hidden="true">
                        <svg class="selecionar-classe-drawer__icon-chevron ${l?"is-expanded":""}" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg class="selecionar-classe-drawer__icon-folder" viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                      </span>
                      <span class="selecionar-classe-drawer__row-label">
                        <span class="selecionar-classe-drawer__row-code">${G(i.codigo||"-")}</span>
                        <span class="selecionar-classe-drawer__row-name">${G(i.nome||"-")}</span>
                      </span>
                    </button>

                    ${l?`
                    <ul class="selecionar-classe-drawer__children">
                      ${C.map((S={})=>{const A=String(S.id||"");return`
                          <li class="selecionar-classe-drawer__node">
                            <button
                              type="button"
                              class="selecionar-classe-drawer__row selecionar-classe-drawer__row--classe ${String(e.selectedClassId||"")===A?"is-selected":""}"
                              data-scd-select="classe"
                              data-scd-id="${G(A)}"
                              data-scd-categoria-id="${G(v)}"
                              data-scd-grupo-id="${G(t)}"
                            >
                              ${e.mode==="cadastro"?`
                                <span class="selecionar-classe-drawer__row-file" aria-hidden="true">
                                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 1.8H10L13.2 5V14.2H3V1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 1.8V5H13.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                                </span>
                              `:La()}
                              <span class="selecionar-classe-drawer__row-label">
                                <span class="selecionar-classe-drawer__row-code">${G(S.codigo||"-")}</span>
                                <span class="selecionar-classe-drawer__row-name">${G(S.nome||"-")}</span>
                              </span>
                            </button>
                          </li>
                        `}).join("")}
                    </ul>
                    `:""}
                  </li>
                `}).join("")}
            </ul>
            `:""}
          </li>
        `}).join("")}
    </ul>
  `}function Ta(e={}){return`
    <div class="selecionar-classe-drawer">
      <div class="selecionar-classe-drawer__search">${Ge({id:"selecionar-classe-search",placeholder:"Buscar na estrutura...",value:e.search||"",disabled:!!e.loading})}</div>
      <div class="selecionar-classe-drawer__content">
        ${Ba(e)}
      </div>
      ${e.mode==="cadastro"?`
        <section class="selecionar-classe-drawer__selected">
          <p class="selecionar-classe-drawer__selected-label">Selecionado:</p>
          <div class="selecionar-classe-drawer__selected-values">
            <span class="selecionar-classe-drawer__selected-code">${G(e.selectedItem?.codigo||"-")}</span>
            <strong class="selecionar-classe-drawer__selected-name">${G(e.selectedItem?.nome||"-")}</strong>
          </div>
        </section>
      `:""}
      ${e.error?`<p class="selecionar-classe-drawer__error">${G(e.error)}</p>`:""}
    </div>
  `}function Ma(e={}){if(e.mode==="cadastro"){const a=!!e.selectedItem?.id;return`
      <div class="selecionar-classe-drawer__footer selecionar-classe-drawer__footer--cadastro">
        <button type="button" class="btn btn--outline-dark" data-scd-action="access-cadastro" ${a?"":"disabled"}>Acessar cadastro</button>
        <div class="selecionar-classe-drawer__footer-right">
          <button type="button" class="btn btn--outline-dark" data-scd-action="cancel">Cancelar</button>
          <button type="button" class="btn btn--primary" data-scd-action="confirm" ${a?"":"disabled"}>Selecionar</button>
        </div>
      </div>
    `}return`
    <div class="selecionar-classe-drawer__footer">
      <button type="button" class="btn btn--primary" data-scd-action="back" ${e.loading?"disabled":""}>Voltar</button>
    </div>
  `}function Pa(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onSelect:typeof e.onSelect=="function"?e.onSelect:null,onConfirm:typeof e.onConfirm=="function"?e.onConfirm:null,onAccessCadastro:typeof e.onAccessCadastro=="function"?e.onAccessCadastro:null};document.querySelector(`[data-drawer="${de}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${de}"]`)?.remove();const c=fe({id:de,title:"Selecionar Classe do Produto/Serviço",width:540,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);let t={open:!1,mode:"classificacao",loading:!1,error:"",search:"",subtitle:"",tree:[],selectedClassId:"",selectedItem:null,expandedGrupoIds:new Set,expandedCategoriaIds:new Set};const r=ve({id:de,root:document,onClose:()=>{t.open=!1,t.search="",a.onClose&&a.onClose()}}),d=document.querySelector(`[data-drawer="${de}"]`);if(!d)return{open:()=>{},close:()=>{},cleanup:()=>{}};let i=()=>{};const v=()=>{if(!t.selectedClassId)return;const g=String(t.selectedClassId),f=Array.isArray(t.tree)?t.tree:[];for(let b=0;b<f.length;b+=1){const u=f[b]||{},_=Array.isArray(u.categorias)?u.categorias:[];for(let I=0;I<_.length;I+=1){const E=_[I]||{};if((Array.isArray(E.classes)?E.classes:[]).some((P={})=>String(P.id||"")===g)){t.expandedGrupoIds.add(String(u.id||"")),t.expandedCategoriaIds.add(String(E.id||""));return}}}},l=()=>{const g=d.querySelector(".drawer__header"),f=d.querySelector(".drawer__title"),b=d.querySelector(".drawer__body"),u=d.querySelector(".drawer__footer");if(!(!b||!u)){if(f&&(f.textContent="Selecionar Classe do Produto/Serviço"),g){const _=g.querySelector(".selecionar-classe-drawer__header-subtitle");t.subtitle?_?_.textContent=t.subtitle:f&&f.insertAdjacentHTML("afterend",`<p class="selecionar-classe-drawer__header-subtitle">${G(t.subtitle)}</p>`):_&&_.remove()}b.innerHTML=Ta(t),u.innerHTML=Ma(t),i(),i=be(d)||(()=>{})}},C=g=>{if(!(g.target instanceof Element))return;const f=g.target.closest("#selecionar-classe-search");f instanceof HTMLInputElement&&(t.search=f.value||"",l())},S=g=>{if(!(g.target instanceof Element))return;if(g.target.closest('[data-scd-action="back"]')){r.close();return}if(g.target.closest('[data-scd-action="cancel"]')){r.close();return}if(g.target.closest('[data-scd-action="access-cadastro"]')){if(!t.selectedItem?.id)return;a.onAccessCadastro&&a.onAccessCadastro(t.selectedItem);return}if(g.target.closest('[data-scd-action="confirm"]')){if(!t.selectedItem?.id)return;a.onConfirm&&a.onConfirm(t.selectedItem),r.close();return}const I=g.target.closest('[data-scd-toggle="grupo"][data-scd-id]');if(I){const P=String(I.getAttribute("data-scd-id")||"");if(!P)return;t.expandedGrupoIds.has(P)?t.expandedGrupoIds.delete(P):t.expandedGrupoIds.add(P),l();return}const E=g.target.closest('[data-scd-toggle="categoria"][data-scd-id]');if(E){const P=String(E.getAttribute("data-scd-id")||"");if(!P)return;t.expandedCategoriaIds.has(P)?t.expandedCategoriaIds.delete(P):t.expandedCategoriaIds.add(P),l();return}const H=g.target.closest('[data-scd-select="classe"][data-scd-id]');if(H){const P=String(H.getAttribute("data-scd-id")||"");if(!P)return;const w=String(H.getAttribute("data-scd-categoria-id")||""),U=String(H.getAttribute("data-scd-grupo-id")||"");t.selectedClassId=P,t.selectedItem=ys(t.tree,P)||{id:P,codigo:"",nome:"",categoriaId:w,grupoId:U},t.mode!=="cadastro"&&a.onSelect&&a.onSelect({classeId:P,categoriaId:w,grupoId:U,codigo:t.selectedItem?.codigo||"",nome:t.selectedItem?.nome||""}),l()}};return d.addEventListener("input",C),d.addEventListener("click",S),l(),{open:(g={})=>{const f=Aa(g.groups,g.categorias,g.classes),b=new Set,u=new Set,_=String(g.initialSelectedId||"");!_&&f[0]?.id&&b.add(String(f[0].id));const I=ys(f,_);t={...t,open:!0,mode:g.mode==="cadastro"?"cadastro":"classificacao",loading:!!g.loading,error:g.error?String(g.error):"",search:"",subtitle:g.subtitle?String(g.subtitle):"",tree:f,selectedClassId:_,selectedItem:I,expandedGrupoIds:b,expandedCategoriaIds:u},v(),l(),r.open(g.triggerEl||null)},close:()=>r.close(),cleanup:()=>{i(),d.removeEventListener("input",C),d.removeEventListener("click",S),r.cleanup(),document.querySelector(`[data-drawer="${de}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${de}"]`)?.remove()}}}const Ha={plus:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',minus:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',close:'<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',check:'<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',edit:'<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',trash:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',search:'<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronUp:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronLeft:'<svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',menu:'<svg viewBox="0 0 16 16" fill="none"><path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',moreVertical:'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/></svg>',moreHorizontal:'<svg viewBox="0 0 16 16" fill="none"><circle cx="3" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="13" cy="8" r="1" fill="currentColor"/></svg>',settings:'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M2.93 13.07L4.34 11.66M11.66 4.34L13.07 2.93" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',user:'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',heart:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 14L2.5 8.5C1.11929 7.11929 1.11929 4.88071 2.5 3.5C3.88071 2.11929 6.11929 2.11929 7.5 3.5L8 4L8.5 3.5C9.88071 2.11929 12.1193 2.11929 13.5 3.5C14.8807 4.88071 14.8807 7.11929 13.5 8.5L8 14Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',star:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',copy:'<svg viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3C11 2.44772 10.5523 2 10 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H5" stroke="currentColor" stroke-width="1.5"/></svg>',download:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',upload:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function Ss(e){return Ha[e]||""}const le="ramo-drawer",me="__new__",Da='<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"></circle><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',Oa='<svg viewBox="0 0 16 16" fill="none"><path d="M10.9 2.6l2.5 2.5M2.5 13.5l2.6-.5 7.8-7.8a1.1 1.1 0 000-1.6l-1.3-1.3a1.1 1.1 0 00-1.6 0L2.2 10.1l-.5 3.4z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ve(e=[]){return Array.isArray(e)?e.map((a={},c)=>({id:String(a.id??`ramo-${c+1}`),nome:String(a.nome??"").trim(),ativo:!!(a.ativo??!0)})):[]}function qa(e=[],a="ativos",c=""){const t=Ve(e),r=a!=="inativos",d=String(c||"").trim().toLowerCase();return t.filter(i=>!!i.ativo!==r?!1:d?String(i.nome||"").toLowerCase().includes(d):!0)}function Fa(e={},a={}){const c=String(e.id||""),t=a.editingId===c,r=a.tab!=="inativos",d=je({id:`ramo-drawer-toggle-${ae(c)}`,checked:!!e.ativo,size:"sm",disabled:!!a.loading});return`
    <li class="ramo-drawer__item">
      ${t?`
      <div class="ramo-drawer__edit-row">
        <input
          type="text"
          class="ramo-drawer__inline-input"
          data-ramo-inline-input
          data-ramo-id="${ae(c)}"
          value="${ae(a.editingValue||"")}"
          placeholder="Digite o nome do ramo"
        />
        <div class="ramo-drawer__edit-actions">
          <button type="button" class="ramo-drawer__icon-btn ramo-drawer__icon-btn--danger" data-ramo-action="cancel-edit" data-ramo-id="${ae(c)}" aria-label="Cancelar edição">
            ${Ss("trash")}
          </button>
          <button type="button" class="ramo-drawer__icon-btn ramo-drawer__icon-btn--success" data-ramo-action="confirm-edit" data-ramo-id="${ae(c)}" aria-label="Confirmar edição">
            ${Ss("check")}
          </button>
        </div>
      </div>
    `:`
      <div class="ramo-drawer__item-main">
        ${r?`<button type="button" class="ramo-drawer__edit" data-ramo-action="edit" data-ramo-id="${ae(c)}" aria-label="Editar ramo">
              ${Oa}
            </button>`:""}
        <span class="ramo-drawer__item-name">${ae(e.nome||"-")}</span>
      </div>
      <div class="ramo-drawer__item-right">
        ${d}
      </div>
    `}
    </li>
  `}function Na(e={}){const a=qa(e.items,e.tab,e.search),t=[...e.editingId===me?[{id:me,nome:"",ativo:e.tab!=="inativos"}]:[],...a],r=Z({id:"ramo-drawer-search",type:"search",placeholder:"Buscar Ramo",value:e.search||"",iconRight:Da,clearable:!1,className:"ramo-drawer__search-field",disabled:!!e.loading}),d=ea({items:[{value:"ativos",label:"Ativos"},{value:"inativos",label:"Inativos"}],activeValue:e.tab==="inativos"?"inativos":"ativos",size:"sm"});return`
    <div class="ramo-drawer" data-ramo-drawer-root>
      ${r}

      <div class="ramo-drawer__tabs" data-ramo-tabs>
        ${d}
      </div>

      <section class="ramo-drawer__section">
        <div class="ramo-drawer__section-header">
          <p class="ramo-drawer__section-title">Cadastrados</p>
          <button type="button" class="btn btn--primary ramo-drawer__add" data-ramo-action="add">Adicionar +</button>
        </div>

        <ul class="ramo-drawer__list">
          ${t.length>0?t.map(i=>Fa(i,e)).join(""):'<li class="ramo-drawer__empty">Nenhum ramo encontrado.</li>'}
        </ul>
      </section>

      ${e.error?`<p class="ramo-drawer__error">${ae(e.error)}</p>`:""}
    </div>
  `}function Ra(){return`
    <div class="ramo-drawer__footer">
      <button type="button" class="btn btn--primary" data-ramo-action="return">Retornar</button>
    </div>
  `}function Va(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onToggleAtivo:typeof e.onToggleAtivo=="function"?e.onToggleAtivo:null,onRename:typeof e.onRename=="function"?e.onRename:null};document.querySelector(`[data-drawer="${le}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${le}"]`)?.remove();const c=fe({id:le,title:"Criar Novo Ramo",width:430,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);let t={open:!1,loading:!1,error:"",tab:e.initialTab==="inativos"?"inativos":"ativos",search:"",items:Ve(e.items??[]),editingId:null,editingValue:""};const r=ve({id:le,root:document,onClose:()=>{t.open=!1,t.search="",t.editingId=null,t.editingValue="",a.onClose&&a.onClose()}}),d=document.querySelector(`[data-drawer="${le}"]`);if(!d)return{open:()=>{},close:()=>{},cleanup:()=>{}};let i=()=>{};const v=()=>{const u=d.querySelector(".drawer__body"),_=d.querySelector(".drawer__footer");if(!u||!_)return;u.innerHTML=Na(t),_.innerHTML=Ra(),i(),i=be(d)||(()=>{});const I=d.querySelector("[data-ramo-tabs]");Ys(I,E=>{t.tab=E==="inativos"?"inativos":"ativos",t.editingId=null,t.editingValue="",v()})},l=u=>{if(!u)return;const _=String(t.editingValue||"").trim(),I=(t.items||[]).find(E=>String(E.id||"")===String(u));if(!_){u===me?(t.editingId=null,t.editingValue="",v()):(t.editingValue=I?.nome||"",t.editingId=null,v());return}if(u===me){const E={id:`ramo-${Date.now()}`,nome:_,ativo:t.tab!=="inativos"};t.items=[E,...Array.isArray(t.items)?t.items:[]],a.onRename&&a.onRename(E.id,_),t.editingId=null,t.editingValue="",v();return}t.items=(Array.isArray(t.items)?t.items:[]).map(E=>String(E.id||"")!==String(u)?E:{...E,nome:_}),a.onRename&&a.onRename(String(u),_),t.editingId=null,t.editingValue="",v()},C=u=>{if(!(u.target instanceof Element))return;const _=u.target.closest("input");if(_ instanceof HTMLInputElement){if(_.id==="ramo-drawer-search"){t.search=_.value||"",v();return}_.matches("[data-ramo-inline-input]")&&(t.editingValue=_.value||"")}},S=u=>{if(!(u.target instanceof Element))return;const _=u.target.closest(".toggle-input");if(!(_ instanceof HTMLInputElement))return;const I=String(_.id||"");if(!I.startsWith("ramo-drawer-toggle-"))return;const E=I.replace("ramo-drawer-toggle-","");t.items=(Array.isArray(t.items)?t.items:[]).map(H=>String(H.id||"")!==E?H:{...H,ativo:!!_.checked}),a.onToggleAtivo&&a.onToggleAtivo(E,!!_.checked),v()},A=u=>{if(!(u.target instanceof Element))return;const _=u.target.closest("[data-ramo-action]");if(!_)return;const I=_.getAttribute("data-ramo-action")||"";if(I==="return"){r.close();return}if(I==="add"){t.editingId=me,t.editingValue="",v();return}if(I==="edit"){const E=_.getAttribute("data-ramo-id")||"",H=(t.items||[]).find(P=>String(P.id||"")===String(E));if(!H)return;t.editingId=E,t.editingValue=H.nome||"",v();return}if(I==="confirm-edit"){const E=_.getAttribute("data-ramo-id")||"";l(E);return}if(I==="cancel-edit"){const E=_.getAttribute("data-ramo-id")||"";if(E===me){t.editingId=null,t.editingValue="",v();return}const H=(t.items||[]).find(P=>String(P.id||"")===String(E));t.editingId=null,t.editingValue=H?.nome||"",v()}},M=u=>{if(!(u.target instanceof HTMLInputElement)||!u.target.matches("[data-ramo-inline-input]"))return;const _=u.target.getAttribute("data-ramo-id")||"";l(_)},q=u=>{if(!(u.target instanceof HTMLInputElement)||!u.target.matches("[data-ramo-inline-input]"))return;const _=u.target.getAttribute("data-ramo-id")||"";if(u.key==="Enter"){u.preventDefault(),l(_);return}u.key==="Escape"&&(u.preventDefault(),u.stopPropagation(),t.editingId=null,t.editingValue="",v())};return d.addEventListener("input",C),d.addEventListener("change",S),d.addEventListener("click",A),d.addEventListener("focusout",M),d.addEventListener("keydown",q),v(),{open:(u={})=>{t={...t,open:!0,loading:!!u.loading,error:u.error?String(u.error):"",tab:u.initialTab==="inativos"||e.initialTab==="inativos"?"inativos":"ativos",search:"",items:Ve(u.items??t.items??[]),editingId:null,editingValue:""},v(),r.open(u.triggerEl||null)},close:()=>r.close(),cleanup:()=>{i(),d.removeEventListener("input",C),d.removeEventListener("change",S),d.removeEventListener("click",A),d.removeEventListener("focusout",M),d.removeEventListener("keydown",q),r.cleanup(),document.querySelector(`[data-drawer="${le}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${le}"]`)?.remove()}}}const pe="pessoas-empresas-filtros-drawer";function oe(e={}){const a=e.groupBy||{};return{showInactive:!!e.showInactive,except:!!e.except,codigo:String(e.codigo||""),nomeRazaoSocial:String(e.nomeRazaoSocial||""),tipo:String(e.tipo||""),grupo:String(e.grupo||""),cpfCnpj:String(e.cpfCnpj||""),categoria:String(e.categoria||""),setor:String(e.setor||""),cidade:String(e.cidade||""),contato:String(e.contato||""),inscricaoEstadualMunicipal:String(e.inscricaoEstadualMunicipal||""),chips:Array.isArray(e.chips)?e.chips.map(c=>String(c||"").trim()).filter(Boolean):["Mudas","Badge","Badge"],orderByDirection:e.orderByDirection==="desc"?"desc":"asc",orderByType:String(e.orderByType||""),groupBy:{grupo:a.grupo!==!1,categoria:a.categoria!==!1,setor:a.setor!==!1,cidade:a.cidade!==!1}}}function Ga(e={}){const a=Z({id:"pefd-codigo",label:"Código",required:!0,placeholder:"Código",value:e.codigo||""}),c=Z({id:"pefd-nome-razao-social",label:"Nome/Razão Social",required:!0,placeholder:"Nome/Razão Social",value:e.nomeRazaoSocial||""}),t=Z({id:"pefd-tipo",label:"Tipo",required:!0,placeholder:"Tipo",value:e.tipo||""}),r=Z({id:"pefd-grupo",label:"Grupo",required:!0,placeholder:"Selecione o grupo",value:e.grupo||""}),d=Z({id:"pefd-cpf-cnpj",label:"CPF/CNPJ",required:!0,placeholder:"Digite o CPF/CNPJ",value:e.cpfCnpj||""}),i=X({id:"pefd-categoria",label:"Categoria",required:!0,placeholder:"Selecione o grupo",value:e.categoria||"",items:[]}),v=X({id:"pefd-setor",label:"Setor",required:!0,placeholder:"Selecione o setor",value:e.setor||"",items:[]}),l=X({id:"pefd-cidade",label:"Cidade",required:!0,placeholder:"Selecione a cidade",value:e.cidade||"",items:[]}),C=X({id:"pefd-contato",label:"Contato",required:!0,placeholder:"Selecione o contato",value:e.contato||"",items:[]}),S=Z({id:"pefd-inscricao",label:"Inscrição Estadual ou Municipal",required:!0,placeholder:"Digite",value:e.inscricaoEstadualMunicipal||""});return`
    <div class="pessoas-empresas-filtros-drawer__grid">
      ${a}
      ${c}
      ${t}
      ${r}
      ${d}
      ${i}
      ${v}
      ${l}
      ${C}
      ${S}
    </div>
  `}function ja(e={}){const a=oe(e.form),c=(a.chips||[]).map((C,S)=>`<span data-pefd-chip-index="${S}">
      ${Is({label:C,value:String(S),size:"sm",className:"pessoas-empresas-filtros-drawer__chip"})}
    </span>`).join(""),t=je({id:"pefd-show-inactive",label:"Mostrar inativos",checked:a.showInactive,size:"sm",className:"pessoas-empresas-filtros-drawer__toggle"}),r=J({id:"pefd-except",label:"Exceto",size:"sm",checked:a.except}),d=J({id:"pefd-groupby-grupo",label:"Grupo",size:"sm",checked:a.groupBy?.grupo!==!1}),i=J({id:"pefd-groupby-categoria",label:"Categoria",size:"sm",checked:a.groupBy?.categoria!==!1}),v=J({id:"pefd-groupby-setor",label:"Setor",size:"sm",checked:a.groupBy?.setor!==!1}),l=J({id:"pefd-groupby-cidade",label:"Cidade",size:"sm",checked:a.groupBy?.cidade!==!1});return`
    <div class="pessoas-empresas-filtros-drawer">
      <div class="pessoas-empresas-filtros-drawer__top">
        ${t}
        ${r}
      </div>

      ${Ga(a)}

      <div class="pessoas-empresas-filtros-drawer__chips">
        ${c}
      </div>

      <div class="pessoas-empresas-filtros-drawer__order">
        <div class="pessoas-empresas-filtros-drawer__order-column">
          <p class="pessoas-empresas-filtros-drawer__section-label">Ordenar por</p>
          <div class="pessoas-empresas-filtros-drawer__order-buttons">
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${a.orderByDirection!=="desc"?"is-active":""}" data-pefd-order="asc">Crescente</button>
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${a.orderByDirection==="desc"?"is-active":""}" data-pefd-order="desc">Decrescente</button>
          </div>
        </div>
        <div class="pessoas-empresas-filtros-drawer__order-column">
          ${X({id:"pefd-order-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",value:a.orderByType||"",items:[]})}
        </div>
      </div>

      <div class="pessoas-empresas-filtros-drawer__groupby">
        <p class="pessoas-empresas-filtros-drawer__section-label">Agrupar por</p>
        <div class="pessoas-empresas-filtros-drawer__groupby-options">
          ${d}
          ${i}
          ${v}
          ${l}
        </div>
      </div>
    </div>
  `}function za(){return`
    <div class="pessoas-empresas-filtros-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-pefd-action="back">Voltar</button>
      <div class="pessoas-empresas-filtros-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-pefd-action="clear">Limpar Filtros</button>
        <button type="button" class="btn btn--primary" data-pefd-action="apply">Aplicar Filtros</button>
      </div>
    </div>
  `}function Wa(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onApply:typeof e.onApply=="function"?e.onApply:null,onClear:typeof e.onClear=="function"?e.onClear:null};document.querySelector(`[data-drawer="${pe}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${pe}"]`)?.remove();const c=fe({id:pe,title:"Filtro",width:540,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);const t=ve({id:pe,root:document,onClose:()=>{i.open=!1,a.onClose&&a.onClose()}}),r=document.querySelector(`[data-drawer="${pe}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};let d=()=>{},i={open:!1,form:oe(e.initialFilters||{})};const v=()=>{const g=r.querySelector(".drawer__body"),f=r.querySelector(".drawer__footer");!g||!f||(g.innerHTML=ja(i),f.innerHTML=za(),d(),d=be(r)||(()=>{}))},l=()=>{const g=oe(i.form),f=u=>{const _=r.querySelector(u);return(_ instanceof HTMLInputElement||_ instanceof HTMLSelectElement||_ instanceof HTMLTextAreaElement)&&_.value||""},b=u=>{const _=r.querySelector(u);return _ instanceof HTMLInputElement?!!_.checked:!1};return g.showInactive=b("#pefd-show-inactive"),g.except=b("#pefd-except"),g.codigo=f("#pefd-codigo"),g.nomeRazaoSocial=f("#pefd-nome-razao-social"),g.tipo=f("#pefd-tipo"),g.grupo=f("#pefd-grupo"),g.cpfCnpj=f("#pefd-cpf-cnpj"),g.categoria=f("#pefd-categoria"),g.setor=f("#pefd-setor"),g.cidade=f("#pefd-cidade"),g.contato=f("#pefd-contato"),g.inscricaoEstadualMunicipal=f("#pefd-inscricao"),g.orderByType=f("#pefd-order-type"),g.groupBy={grupo:b("#pefd-groupby-grupo"),categoria:b("#pefd-groupby-categoria"),setor:b("#pefd-groupby-setor"),cidade:b("#pefd-groupby-cidade")},g},C=()=>{i.form=l()},S=g=>{if(!(g.target instanceof Element))return;const f=g.target.closest('[data-action="remove"]');if(f){const I=f.closest("[data-pefd-chip-index]"),E=Number(I?.getAttribute("data-pefd-chip-index")||"-1");if(E>=0){const H=oe(i.form);H.chips=(H.chips||[]).filter((P,w)=>w!==E),i.form=H,v()}return}const b=g.target.closest("[data-pefd-order]");if(b){const I=b.getAttribute("data-pefd-order")==="desc"?"desc":"asc";i.form={...oe(i.form),orderByDirection:I},v();return}const u=g.target.closest("[data-pefd-action]");if(!u)return;const _=u.getAttribute("data-pefd-action")||"";if(_==="back"){t.close();return}if(_==="clear"){i.form=oe({chips:[]}),v(),a.onClear&&a.onClear();return}_==="apply"&&(i.form=l(),a.onApply&&a.onApply(oe(i.form)),t.close())};return r.addEventListener("input",C),r.addEventListener("change",C),r.addEventListener("click",S),v(),{open:(g={})=>{i={...i,open:!0,form:oe(g.initialFilters||i.form||{})},v(),t.open(g.triggerEl||null)},close:()=>t.close(),cleanup:()=>{d(),r.removeEventListener("input",C),r.removeEventListener("change",C),r.removeEventListener("click",S),t.cleanup(),document.querySelector(`[data-drawer="${pe}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${pe}"]`)?.remove()}}}const ue="produtos-filtros-drawer";function te(e={}){const a=e.groupBy||{};return{showInactive:!!e.showInactive,except:!!e.except,descricaoProduto:String(e.descricaoProduto||""),codigo:String(e.codigo||""),grupo:String(e.grupo||""),classe:String(e.classe||""),categoria:String(e.categoria||""),descricao:String(e.descricao||""),chips:Array.isArray(e.chips)?e.chips.map(c=>String(c||"").trim()).filter(Boolean):["Mudas","Badge","Badge"],orderByDirection:e.orderByDirection==="desc"?"desc":"asc",orderByType:String(e.orderByType||""),groupBy:{grupo:a.grupo!==!1,categoria:a.categoria!==!1,classe:a.classe!==!1,tipo:a.tipo!==!1}}}function Za(e={}){const a=Z({id:"pfd-descricao-produto",label:"Descrição do Produto",required:!0,placeholder:"Digite a descrição",value:e.descricaoProduto||""}),c=Z({id:"pfd-codigo",label:"Código",required:!0,placeholder:"Digite o código",value:e.codigo||""}),t=X({id:"pfd-grupo",label:"Grupo",required:!0,placeholder:"Selecione o grupo",value:e.grupo||"",items:[]}),r=X({id:"pfd-classe",label:"Classe",required:!0,placeholder:"Selecione a classe",value:e.classe||"",items:[]}),d=X({id:"pfd-categoria",label:"Categoria",required:!0,placeholder:"Selecione a categoria",value:e.categoria||"",items:[]}),i=Z({id:"pfd-descricao",label:"Descrição",required:!0,placeholder:"Digite",value:e.descricao||""});return`
    <div class="pessoas-empresas-filtros-drawer__grid">
      <div class="produtos-filtros-drawer__full">${a}</div>
      ${c}
      ${t}
      ${r}
      ${d}
      <div class="produtos-filtros-drawer__full">${i}</div>
    </div>
  `}function Ja(e={}){const a=te(e.form),c=(a.chips||[]).map((C,S)=>`<span data-pfd-chip-index="${S}">
      ${Is({label:C,value:String(S),size:"sm",className:"pessoas-empresas-filtros-drawer__chip"})}
    </span>`).join(""),t=je({id:"pfd-show-inactive",label:"Mostrar inativos",checked:a.showInactive,size:"sm",className:"pessoas-empresas-filtros-drawer__toggle"}),r=J({id:"pfd-except",label:"Exceto",size:"sm",checked:a.except}),d=J({id:"pfd-groupby-grupo",label:"Grupo",size:"sm",checked:a.groupBy?.grupo!==!1}),i=J({id:"pfd-groupby-categoria",label:"Categoria",size:"sm",checked:a.groupBy?.categoria!==!1}),v=J({id:"pfd-groupby-classe",label:"Classe",size:"sm",checked:a.groupBy?.classe!==!1}),l=J({id:"pfd-groupby-tipo",label:"Tipo",size:"sm",checked:a.groupBy?.tipo!==!1});return`
    <div class="pessoas-empresas-filtros-drawer">
      <div class="pessoas-empresas-filtros-drawer__top">
        ${t}
        ${r}
      </div>

      ${Za(a)}

      <div class="pessoas-empresas-filtros-drawer__chips">
        ${c}
      </div>

      <div class="pessoas-empresas-filtros-drawer__order">
        <div class="pessoas-empresas-filtros-drawer__order-column">
          <p class="pessoas-empresas-filtros-drawer__section-label">Ordenar por</p>
          <div class="pessoas-empresas-filtros-drawer__order-buttons">
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${a.orderByDirection!=="desc"?"is-active":""}" data-pfd-order="asc">Crescente</button>
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${a.orderByDirection==="desc"?"is-active":""}" data-pfd-order="desc">Decrescente</button>
          </div>
        </div>
        <div class="pessoas-empresas-filtros-drawer__order-column">
          ${X({id:"pfd-order-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",value:a.orderByType||"",items:[]})}
        </div>
      </div>

      <div class="pessoas-empresas-filtros-drawer__groupby">
        <p class="pessoas-empresas-filtros-drawer__section-label">Agrupar por</p>
        <div class="pessoas-empresas-filtros-drawer__groupby-options">
          ${d}
          ${i}
          ${v}
          ${l}
        </div>
      </div>
    </div>
  `}function Ua(){return`
    <div class="pessoas-empresas-filtros-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-pfd-action="back">Voltar</button>
      <div class="pessoas-empresas-filtros-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-pfd-action="clear">Limpar Filtros</button>
        <button type="button" class="btn btn--primary" data-pfd-action="apply">Aplicar Filtros</button>
      </div>
    </div>
  `}function Qa(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onApply:typeof e.onApply=="function"?e.onApply:null,onClear:typeof e.onClear=="function"?e.onClear:null};document.querySelector(`[data-drawer="${ue}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ue}"]`)?.remove();const c=fe({id:ue,title:"Filtros de Produtos",width:540,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);const t=ve({id:ue,root:document,onClose:()=>{i.open=!1,a.onClose&&a.onClose()}}),r=document.querySelector(`[data-drawer="${ue}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};let d=()=>{},i={open:!1,form:te(e.initialFilters||{})};const v=()=>{const g=r.querySelector(".drawer__body"),f=r.querySelector(".drawer__footer");!g||!f||(g.innerHTML=Ja(i),f.innerHTML=Ua(),d(),d=be(r)||(()=>{}))},l=()=>{const g=te(i.form),f=u=>{const _=r.querySelector(u);return(_ instanceof HTMLInputElement||_ instanceof HTMLSelectElement||_ instanceof HTMLTextAreaElement)&&_.value||""},b=u=>{const _=r.querySelector(u);return _ instanceof HTMLInputElement?!!_.checked:!1};return g.showInactive=b("#pfd-show-inactive"),g.except=b("#pfd-except"),g.descricaoProduto=f("#pfd-descricao-produto"),g.codigo=f("#pfd-codigo"),g.grupo=f("#pfd-grupo"),g.classe=f("#pfd-classe"),g.categoria=f("#pfd-categoria"),g.descricao=f("#pfd-descricao"),g.orderByType=f("#pfd-order-type"),g.groupBy={grupo:b("#pfd-groupby-grupo"),categoria:b("#pfd-groupby-categoria"),classe:b("#pfd-groupby-classe"),tipo:b("#pfd-groupby-tipo")},g},C=()=>{i.form=l()},S=g=>{if(!(g.target instanceof Element))return;const f=g.target.closest('[data-action="remove"]');if(f){const I=f.closest("[data-pfd-chip-index]"),E=Number(I?.getAttribute("data-pfd-chip-index")||"-1");if(E>=0){const H=te(i.form);H.chips=(H.chips||[]).filter((P,w)=>w!==E),i.form=H,v()}return}const b=g.target.closest("[data-pfd-order]");if(b){const I=b.getAttribute("data-pfd-order")==="desc"?"desc":"asc";i.form={...te(i.form),orderByDirection:I},v();return}const u=g.target.closest("[data-pfd-action]");if(!u)return;const _=u.getAttribute("data-pfd-action")||"";if(_==="back"){t.close();return}if(_==="clear"){i.form=te({chips:[]}),v(),a.onClear&&a.onClear();return}_==="apply"&&(i.form=l(),a.onApply&&a.onApply(te(i.form)),t.close())};return r.addEventListener("input",C),r.addEventListener("change",C),r.addEventListener("click",S),v(),{open:(g={})=>{i={...i,open:!0,form:te(g.initialFilters||i.form||{})},v(),t.open(g.triggerEl||null)},close:()=>t.close(),cleanup:()=>{d(),r.removeEventListener("input",C),r.removeEventListener("change",C),r.removeEventListener("click",S),t.cleanup(),document.querySelector(`[data-drawer="${ue}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ue}"]`)?.remove()}}}const ge="produto-servico-ver-drawer";function W(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function j(e){const a=String(e??"").trim();return a||"—"}function Ee(e={}){return{id:e.id?String(e.id):"",codigo:String(e.codigo||""),nome:String(e.nome||e.descricao||""),status:String(e.status||"Ativo"),tipo:String(e.tipo||"Produto"),classe:String(e.classe||""),unidade:String(e.unidade||""),descricao:String(e.descricao||""),marca:Array.isArray(e.marca)?e.marca.map(a=>String(a||"").trim()).filter(Boolean):[],fabricante:Array.isArray(e.fabricante)?e.fabricante.map(a=>String(a||"").trim()).filter(Boolean):[],fornecedores:String(e.fornecedores||""),grupoEquivalencia:String(e.grupoEquivalencia||""),ncm:String(e.ncm||""),principioAtivo:String(e.principioAtivo||""),grupoQuimico:String(e.grupoQuimico||""),modoAcao:String(e.modoAcao||""),registroMapa:String(e.registroMapa||"")}}function $s(e=[]){const a=Array.isArray(e)?e:[];return a.length?a.map(c=>`
    <span class="chip chip--input chip--sm">
      <span class="chip-label">${W(c)}</span>
    </span>
  `).join(""):'<span class="produto-servico-ver-drawer__value">—</span>'}function Ka(e={}){const a=Ee(e.item),c=e.sections||{dados:!0,cadastro:!0,classe:!0},t=!a.id||!e.canEdit;return`
    <div class="produto-servico-ver-drawer">
      <div class="produto-servico-ver-drawer__meta">
        <div class="produto-servico-ver-drawer__meta-item">
          <span class="produto-servico-ver-drawer__meta-label">Status</span>
          <span class="produto-servico-ver-drawer__badge produto-servico-ver-drawer__badge--status">${W(j(a.status))}</span>
        </div>
        <div class="produto-servico-ver-drawer__meta-item">
          <span class="produto-servico-ver-drawer__meta-label">Tipo</span>
          <span class="produto-servico-ver-drawer__badge">${W(j(a.tipo))}</span>
        </div>
      </div>

      <section class="produto-servico-ver-drawer__section">
        <button type="button" class="produto-servico-ver-drawer__section-toggle" data-psvd-section="dados">
          <span>Dados do produto</span>
          <span class="produto-servico-ver-drawer__chevron ${c.dados?"is-open":""}">⌃</span>
        </button>
        <div class="produto-servico-ver-drawer__section-content ${c.dados?"is-open":""}">
          <div class="produto-servico-ver-drawer__grid">
            <div>
              <p class="produto-servico-ver-drawer__label">Classe</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.classe))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Unidade</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.unidade))}</p>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Descrição</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.descricao))}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="produto-servico-ver-drawer__section">
        <button type="button" class="produto-servico-ver-drawer__section-toggle" data-psvd-section="cadastro">
          <span>Complementares de Cadastro</span>
          <span class="produto-servico-ver-drawer__chevron ${c.cadastro?"is-open":""}">⌃</span>
        </button>
        <div class="produto-servico-ver-drawer__section-content ${c.cadastro?"is-open":""}">
          <div class="produto-servico-ver-drawer__grid">
            <div>
              <p class="produto-servico-ver-drawer__label">Marca</p>
              <div class="produto-servico-ver-drawer__chips">${$s(a.marca)}</div>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Fabricante</p>
              <div class="produto-servico-ver-drawer__chips">${$s(a.fabricante)}</div>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Fornecedores</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.fornecedores))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Grupo de Equivalência</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.grupoEquivalencia))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">NCM</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.ncm))}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="produto-servico-ver-drawer__section">
        <button type="button" class="produto-servico-ver-drawer__section-toggle" data-psvd-section="classe">
          <span>Complementares de Classe</span>
          <span class="produto-servico-ver-drawer__chevron ${c.classe?"is-open":""}">⌃</span>
        </button>
        <div class="produto-servico-ver-drawer__section-content ${c.classe?"is-open":""}">
          <div class="produto-servico-ver-drawer__grid">
            <div>
              <p class="produto-servico-ver-drawer__label">Princípio Ativo</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.principioAtivo))}</p>
            </div>
            <div>
              <p class="produto-servico-ver-drawer__label">Grupo Químico</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.grupoQuimico))}</p>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Modo de Ação</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.modoAcao))}</p>
            </div>
            <div class="produto-servico-ver-drawer__full">
              <p class="produto-servico-ver-drawer__label">Número de Registro MAPA</p>
              <p class="produto-servico-ver-drawer__value">${W(j(a.registroMapa))}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="produto-servico-ver-drawer__footer">
        <button type="button" class="btn btn--outline-dark" data-psvd-action="back">Voltar</button>
        <button type="button" class="btn btn--outline-dark" data-psvd-action="edit" ${t?"disabled":""}>✎ Editar cadastro</button>
      </footer>
    </div>
  `}function Xa(e={}){const a={onClose:typeof e.onClose=="function"?e.onClose:null,onEdit:typeof e.onEdit=="function"?e.onEdit:null};document.querySelector(`[data-drawer="${ge}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ge}"]`)?.remove();const c=fe({id:ge,title:"",width:560,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",c);const t=ve({id:ge,root:document,onClose:()=>{d.open=!1,a.onClose&&a.onClose()}}),r=document.querySelector(`[data-drawer="${ge}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};let d={open:!1,item:{},canEdit:!!a.onEdit,sections:{dados:!0,cadastro:!0,classe:!0}};const i=()=>{const A=Ee(d.item),M=r.querySelector(".drawer__title"),q=r.querySelector(".drawer__body"),g=r.querySelector(".drawer__footer"),f=r.querySelector(".drawer__header");if(!M||!q||!g)return;M.textContent=j(A.nome),f&&!f.querySelector(".produto-servico-ver-drawer__subtitle-head")&&M.insertAdjacentHTML("afterend",'<p class="produto-servico-ver-drawer__subtitle-head">—</p>');const b=f?.querySelector(".produto-servico-ver-drawer__subtitle-head");b&&(b.textContent=j(A.codigo)),q.innerHTML=Ka(d),g.innerHTML=""},v=A=>{if(!(A.target instanceof Element))return;const M=A.target.closest("[data-psvd-section]");if(M){const f=M.getAttribute("data-psvd-section")||"";if(!f)return;d={...d,sections:{...d.sections,[f]:!d.sections?.[f]}},i();return}const q=A.target.closest("[data-psvd-action]");if(!q)return;const g=q.getAttribute("data-psvd-action")||"";if(g==="back"){t.close();return}if(g==="edit"){const f=Ee(d.item);if(!f.id||!a.onEdit)return;a.onEdit(f.id),t.close()}};return r.addEventListener("click",v),i(),{open:(A={})=>{d={...d,open:!0,canEdit:!!a.onEdit,item:Ee(A.item||{}),sections:{dados:!0,cadastro:!0,classe:!0}},i(),t.open(A.triggerEl||null)},close:()=>t.close(),cleanup:()=>{r.removeEventListener("click",v),t.cleanup(),document.querySelector(`[data-drawer="${ge}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${ge}"]`)?.remove()}}}function Ya(){const e=document.getElementById("app-header");e&&e.classList.add("header--kanban-compact-tabs");const a=document.querySelector(".cadastros-page"),c=document.getElementById("cadastros-list-header"),t=document.getElementById("cadastros-list-card"),r=document.getElementById("cadastro-pessoa-empresa-container"),d=document.querySelector(".cadastros-filters"),i=document.querySelector(".cadastros-table-card"),v=document.getElementById("cadastros-search-input"),l=document.querySelector(".cadastros-table"),C=l?.querySelector("thead"),S=l?.querySelector("tbody"),A=document.getElementById("cadastros-advanced-filters-btn"),M=document.getElementById("cadastros-badges"),q=i?.querySelector(".cadastros-table-wrap"),g=v?.getAttribute("placeholder")||"",f=C?.innerHTML||"";S?.innerHTML;const b=d?.parentElement||null,u=d?.nextElementSibling||null,_="TAWROS_DEMO_PESSOAS_EMPRESAS_V1",I=(window.location.hash||"").replace("#",""),E=I.startsWith("/cadastros/produtos-servicos"),H=I.startsWith("/cadastros/produtos-servicos/classificacao"),P=I.startsWith("/cadastros/pessoas-empresas/grupo-empresa");let w=E?"produtos-servicos":"pessoas-empresas",U=null,s={isOpen:P,activeSubTab:P?"grupo-empresas":"pessoas-empresas",tipo:"pessoas",isAtivo:!0,isComplementaresOpen:!0,isSaving:!1,saveError:"",ramoChips:["Badge"],activeProdutosSubTab:H?"classificacao":"produtos-servicos",isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!1,produtosCadastro:{isAtivo:!0,isSaving:!1,saveError:"",tipo:"produto",isCadastroComplementaresOpen:!0,isClasseComplementaresOpen:!0,marcaChips:["Marca"],fabricanteChips:["Fabricante"],form:{classe:"",descricao:"",unidade:"",fornecedores:"",grupoEquivalencia:"",ncm:"",principioAtivo:"",grupoQuimico:"",modoAcao:"",registroMapa:""}},embalagensCadastro:{isAtivo:!0,isSaving:!1,saveError:"",unidadeEquivalenciaOptions:[{value:"L",label:"Litro (L)"},{value:"KG",label:"Quilograma (Kg)"},{value:"UN",label:"Unidade (UN)"}],form:{unidadeEquivalencia:"",valorConversao:"",descricao:"",sigla:""}},produtosClassificacao:{isSaving:!1,search:"",grupoView:"list",grupoEditor:{id:null,posicao:"",nome:""},categoriaView:"list",categoriaEditor:{id:null,grupoId:"03",posicao:"",nome:""},classeView:"list",classeEditor:{id:null,categoriaId:"03.01",posicao:"",nome:"",produtos:!0,servicos:!0},selectedGrupoId:"03",selectedCategoriaId:"03.01",selectedClasseId:"03.01.01",grupos:[{id:"01",codigo:"01",nome:"Insumos Agricolas"},{id:"02",codigo:"02",nome:"Ferramentas"},{id:"03",codigo:"03",nome:"Equipamentos"},{id:"04",codigo:"04",nome:"Maquinario"}],categorias:[{id:"03.01",grupoId:"03",codigo:"03.01",nome:"Irrigacao"},{id:"03.02",grupoId:"03",codigo:"03.02",nome:"Pulverizacao"}],classes:[{id:"03.01.01",categoriaId:"03.01",codigo:"03.01.01",nome:"Aspersores"},{id:"03.01.02",categoriaId:"03.01",codigo:"03.01.02",nome:"Gotejadores"}],classeProdutosItems:[{id:"ps-1",codigo:"INS-001",tipo:"Servico",descricao:"Inseticida POWER KILL",unidade:"01.01.01 - Inseticida"},{id:"ps-2",codigo:"INS-002",tipo:"Servico",descricao:"Fungicida SAFE CROP",unidade:"01.01.02 - Fungicida"},{id:"ps-3",codigo:"INS-003",tipo:"Produto",descricao:"Herbicida FIELD MAX",unidade:"01.01.03 - Herbicida"},{id:"ps-4",codigo:"INS-004",tipo:"Produto",descricao:"Adjuvante PRO MIX",unidade:"01.01.04 - Adjuvante"}],classeProdutosSelectedByClasse:{}},isGrupoDrawerOpen:!1,isRamoDrawerOpen:!1,isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:!1,grupoDrawerMode:"create",selectedGrupoId:null,grupoEmpresasSearch:"",grupoEmpresasCadastros:[{id:"cad-1",nome:"Maria Santos",documento:"987.654.321-00",tipo:"PF",href:"#/cadastros"},{id:"cad-2",nome:"Tech Solutions Ltda",documento:"12.345.678/0001-90",tipo:"PJ",href:"#/cadastros"},{id:"cad-3",nome:"Comércio ABC SA",documento:"12.345.678/0001-90",tipo:"PJ",href:"#/cadastros"},{id:"cad-4",nome:"Comércio ABC SA",documento:"12.345.678/0001-90",tipo:"PJ",href:"#/cadastros"}],grupoEmpresasRowsAll:[{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"},{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"}],grupoEmpresasRows:[{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"},{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"}],form:{grupo:"",categoria:"",cnpj:"",razaoSocial:"",nomeFantasia:"",inscricaoEstadual:"",inscricaoMunicipal:"",produtorRural:!1,cep:"",logradouro:"",numero:"",complemento:"",bairro:"",cidade:"",uf:"",nomeResponsavel:"",celular:"",telefoneFixo:"",email:"",observacoes:"",setor:""},pessoasEmpresasFiltros:{},produtosFiltros:{},ramoDrawerTab:"ativos",ramoItems:[{id:"ramo-1",nome:"Autopeças",ativo:!0},{id:"ramo-2",nome:"Autopeças",ativo:!0},{id:"ramo-3",nome:"Autopeças",ativo:!0},{id:"ramo-4",nome:"Autopeças",ativo:!0}]};function re(o){return String(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(){return S?Array.from(S.querySelectorAll("tr")).map((n,p)=>{const y=n.querySelectorAll("td");return{id:`seed-${p+1}`,codigo:(y[0]?.textContent||"").trim(),grupo:(y[1]?.textContent||"").trim()||"-",tipo:(y[2]?.textContent||"").trim(),documento:(y[3]?.textContent||"").trim(),razaoSocial:(y[4]?.textContent||"").trim(),nomeFantasia:(y[5]?.textContent||"").trim()}}).filter(n=>n.codigo||n.razaoSocial||n.documento):[]}function As(){try{const o=window.sessionStorage.getItem(_);if(!o)return Ae();const n=JSON.parse(o);return Array.isArray(n)?n:Ae()}catch{return Ae()}}function xs(){try{window.sessionStorage.setItem(_,JSON.stringify(_e))}catch{}}function Ls(o,n){const p=document.getElementById(o);return p instanceof HTMLSelectElement?(Array.from(p.options||[]).find(k=>k.value===n)?.textContent||"").trim():""}let _e=As();function xe(){if(!S)return;const o=(v?.value||"").trim().toLowerCase(),n=o?_e.filter((p={})=>[p.codigo,p.grupo,p.tipo,p.documento,p.razaoSocial,p.nomeFantasia].some(k=>String(k||"").toLowerCase().includes(o))):_e;if(n.length===0){S.innerHTML=`
        <tr>
          <td colspan="7">Nenhum cadastro encontrado.</td>
        </tr>
      `;return}S.innerHTML=n.map(p=>`
      <tr data-code="${re(p.codigo||"")}">
        <td>${re(p.codigo||"")}</td>
        <td>${re(p.grupo||"-")}</td>
        <td>${re(p.tipo||"")}</td>
        <td>${re(p.documento||"")}</td>
        <td>${re(p.razaoSocial||"")}</td>
        <td>${re(p.nomeFantasia||"")}</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver</button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar</button>
          <button type="button" class="cadastros-link cadastros-link--danger" data-action="delete">Excluir</button>
        </td>
      </tr>
    `).join("")}function Se(){U&&(window.clearTimeout(U),U=null)}const Ce=_a({onClose:()=>{s={...s,isGrupoDrawerOpen:!1,selectedGrupoId:null}},onSaved:async(o={})=>{const n=o.id||o.codigo||`grupo-${Date.now()}`,p={codigo:o.codigo||"",nome:o.nome||"",descricao:o.descricao||""},y=Array.isArray(s.grupoEmpresasRowsAll)?s.grupoEmpresasRowsAll:[],k=y.findIndex(B=>String(B?.id||B?.codigo||"")===String(n)),L=[...y];k>=0?L[k]={...L[k]||{},...p}:L.unshift(p),s={...s,grupoEmpresasRowsAll:L,grupoEmpresasRows:L,selectedGrupoId:n,isGrupoDrawerOpen:!1},$()},onOpenCadastro:o=>{o?.href&&window.open(o.href,"_blank","noopener,noreferrer")}}),$e=Va({onClose:()=>{s={...s,isRamoDrawerOpen:!1}},onToggleAtivo:(o,n)=>{s={...s,ramoItems:(Array.isArray(s.ramoItems)?s.ramoItems:[]).map(p=>String(p?.id||"")!==String(o)?p:{...p||{},ativo:!!n})}},onRename:(o,n)=>{s={...s,ramoItems:(Array.isArray(s.ramoItems)?s.ramoItems:[]).map(p=>String(p?.id||"")!==String(o)?p:{...p||{},nome:String(n||p?.nome||"")})}}}),ze=Wa({onApply:(o={})=>{s={...s,pessoasEmpresasFiltros:o||{}}},onClear:()=>{s={...s,pessoasEmpresasFiltros:{}}}}),We=Qa({onApply:(o={})=>{s={...s,produtosFiltros:o||{}}},onClear:()=>{s={...s,produtosFiltros:{}}}}),Y=$a({onClose:()=>{s={...s,isClasseProdutosDrawerOpen:!1}},onConfirm:(o=[],n=null)=>{const p=s.produtosClassificacao||{},y={...p.classeProdutosSelectedByClasse||{}},k=String(n||s.produtosClassificacao?.selectedClasseId||"");k&&(y[k]=Array.isArray(o)?o:[]),s={...s,isClasseProdutosDrawerOpen:!1,produtosClassificacao:{...p,classeProdutosSelectedByClasse:y}}},onAccessCadastro:()=>{window.location.hash="/cadastros/produtos-servicos"},onChangeClass:({classeId:o=null,selectedIds:n=[],targetClasseId:p=""}={})=>{const y=s.produtosClassificacao||{},k={...y.classeProdutosSelectedByClasse||{}},L=String(o||""),B=String(p||"");if(!L||!B||L===B)return;const T=Array.isArray(k[L])?k[L]:[],N=Array.isArray(n)?n:[],V=T.filter(Ie=>!N.includes(Ie)),se=Array.isArray(k[B])?k[B]:[],ke=Array.from(new Set([...se,...N]));k[L]=V,k[B]=ke,s={...s,produtosClassificacao:{...y,classeProdutosSelectedByClasse:k}}}}),Ze=Xa({onClose:()=>{s={...s,isProdutoServicoVerDrawerOpen:!1}},onEdit:o=>{const n=Hs(o);n&&Qe(n)}}),ee=Pa({onClose:()=>{s={...s,isSelecionarClasseDrawerOpen:!1}},onSelect:({classeId:o="",categoriaId:n="",grupoId:p=""}={})=>{const y=s.produtosClassificacao||{};s={...s,produtosClassificacao:{...y,selectedGrupoId:p||y.selectedGrupoId||"",selectedCategoriaId:n||y.selectedCategoriaId||"",selectedClasseId:o||y.selectedClasseId||""}},$()},onConfirm:(o={})=>{const n=String(o.id||""),p=String(o.codigo||""),y=String(o.nome||""),k=[p,y].filter(Boolean).join(" - "),L=s.produtosClassificacao||{};s={...s,isSelecionarClasseDrawerOpen:!1,produtosCadastro:{...s.produtosCadastro||{},form:{...s.produtosCadastro&&s.produtosCadastro.form||{},classe:k||y||"",classeId:n,classeCodigo:p,classeNome:y},saveError:""},produtosClassificacao:{...L,selectedClasseId:n||L.selectedClasseId||""}},$()},onAccessCadastro:(o={})=>{o?.id&&(window.location.hash="/cadastros/produtos-servicos")}});function Bs(){const o=w==="pessoas-empresas"&&s.isOpen||w==="produtos-servicos"&&(s.isProdutosCadastroOpen||s.isEmbalagensCadastroOpen||s.activeProdutosSubTab==="classificacao");c&&(c.hidden=o),t&&(t.hidden=o),a&&a.classList.toggle("cadastros-page--cadastro-open",o);const n=document.getElementById("cadastros-content-header");n&&w==="produtos-servicos"&&(n.hidden=o)}function $(){if(!r)return;const o=w==="pessoas-empresas"&&s.isOpen,n=w==="produtos-servicos"&&s.isProdutosCadastroOpen,p=w==="produtos-servicos"&&s.activeProdutosSubTab==="embalagens"&&s.isEmbalagensCadastroOpen,y=w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao";o?(r.innerHTML=ra(s),r.hidden=!1):y?(r.innerHTML=ua(s.produtosClassificacao||{}),r.hidden=!1):p?(r.innerHTML=ia(s.embalagensCadastro||{}),r.hidden=!1):n?(r.innerHTML=ca(s.produtosCadastro||{}),r.hidden=!1):(r.innerHTML="",r.hidden=!0),Bs(),w==="produtos-servicos"&&as()}function Je({mode:o="create",grupoId:n=null,triggerEl:p=null}={}){const k=(Array.isArray(s.grupoEmpresasRowsAll)?s.grupoEmpresasRowsAll:[]).find(L=>String(L?.id||L?.codigo||"")===String(n||""));s={...s,isGrupoDrawerOpen:!0,grupoDrawerMode:o,selectedGrupoId:n},Ce.open({mode:o,grupoId:n,triggerEl:p,initialData:{codigo:k?.codigo||"",nome:k?.nome||"",descricao:k?.descricao||""},linkedCadastros:Array.isArray(s.grupoEmpresasCadastros)?s.grupoEmpresasCadastros:[]})}function Ts({triggerEl:o=null,initialTab:n="ativos"}={}){const p=n==="inativos"?"inativos":"ativos";s={...s,isRamoDrawerOpen:!0,ramoDrawerTab:p},$e.open({triggerEl:o,initialTab:p,items:Array.isArray(s.ramoItems)?s.ramoItems:[]})}function Ms({classeId:o=null,triggerEl:n=null}={}){s.isSelecionarClasseDrawerOpen&&ee.close();const p=s.produtosClassificacao||{},y=Array.isArray(p.classes)?p.classes:[],k=y.find((T={})=>String(T.id||"")===String(o||"")),L=p.classeProdutosSelectedByClasse||{},B=Array.isArray(L[String(o||"")])?L[String(o||"")]:[];s={...s,isClasseProdutosDrawerOpen:!0,produtosClassificacao:{...p,selectedClasseId:String(o||p.selectedClasseId||"")}},Y.open({classeId:o||null,classeNome:k?.nome||"Classe",triggerEl:n,items:Array.isArray(p.classeProdutosItems)?p.classeProdutosItems:[],initialSelectedIds:B,classOptions:y.map((T={})=>({id:String(T.id||""),nome:String(T.nome||"")}))})}function Ue({triggerEl:o=null,mode:n="classificacao"}={}){s.isClasseProdutosDrawerOpen&&Y.close();const p=s.produtosClassificacao||{},y=s.produtosCadastro?.form||{},k=n==="cadastro"?y.classeId||p.selectedClasseId||"":p.selectedClasseId||"";s={...s,isSelecionarClasseDrawerOpen:!0},ee.open({mode:n,triggerEl:o,subtitle:n==="cadastro"?"Navegue pela estrutura ou use a busca para encontrar a classe do produto":"",initialSelectedId:k,groups:Array.isArray(p.grupos)?p.grupos:[],categorias:Array.isArray(p.categorias)?p.categorias:[],classes:Array.isArray(p.classes)?p.classes:[]})}function Ps({triggerEl:o=null,item:n=null}={}){s={...s,isProdutoServicoVerDrawerOpen:!0},Ze.open({triggerEl:o,item:n||{}})}function Le(o){if(!(o instanceof HTMLTableRowElement))return null;const n=o.querySelectorAll("td");if(!n||n.length<5)return null;const p=String(n[0]?.textContent||"").trim(),y=String(n[1]?.textContent||"").trim(),k=String(n[2]?.textContent||"").trim(),L=String(n[3]?.textContent||"").trim(),B=String(n[4]?.textContent||"").trim();return{id:p||"",codigo:p||"",nome:L||"",tipo:k||"",classe:y||"",unidade:B||"",descricao:L||"",...{"INS-001":{status:"Ativo",marca:["Yara","Nutriplant"],fabricante:["Yara Brasil","Nutriplant Indústria"],fornecedores:"Agro Distribuidor SA, Fertilizantes Centro Oeste Ltda",grupoEquivalencia:"GE-FERT-001",ncm:"3105.30.00",principioAtivo:"NPK (Nitrogênio, Fósforo e Potássio)",grupoQuimico:"Fertilizante Mineral Misto",modoAcao:"Nutrição foliar balanceada - Absorção rápida",registroMapa:"SP-12345/67890"}}[p]||{}}}function Hs(o){if(!S||!o)return null;const n=S.querySelectorAll("tr");for(const p of n){const y=Le(p);if(String(y?.id||"")===String(o))return y}return null}function Qe(o){const n=o||{},p=String(n.tipo||"").toLowerCase().includes("serv")?"servico":"produto";s={...s,isProdutoServicoVerDrawerOpen:!1,isProdutosCadastroOpen:!0,isEmbalagensCadastroOpen:!1,produtosCadastro:{...s.produtosCadastro||{},tipo:p,saveError:"",form:{...s.produtosCadastro&&s.produtosCadastro.form||{},classe:n.classe||"",descricao:n.descricao||"",unidade:n.unidade||"",fornecedores:n.fornecedores||"",grupoEquivalencia:n.grupoEquivalencia||"",ncm:n.ncm||"",principioAtivo:n.principioAtivo||"",grupoQuimico:n.grupoQuimico||"",modoAcao:n.modoAcao||"",registroMapa:n.registroMapa||""},marcaChips:Array.isArray(n.marca)?n.marca:s.produtosCadastro?.marcaChips||[],fabricanteChips:Array.isArray(n.fabricante)?n.fabricante:s.produtosCadastro?.fabricanteChips||[]}},$()}function Ds(){s={...s,isOpen:!0,saveError:"",activeSubTab:s.activeSubTab||"pessoas-empresas"},$()}function Os(){s={...s,isProdutosCadastroOpen:!0,isEmbalagensCadastroOpen:!1,produtosCadastro:{...s.produtosCadastro||{},saveError:""}},$()}function Ke(){Se(),s.isGrupoDrawerOpen&&Ce.close(),s.isRamoDrawerOpen&&$e.close(),s.isClasseProdutosDrawerOpen&&Y.close(),s.isSelecionarClasseDrawerOpen&&ee.close(),s={...s,isOpen:!1,isSaving:!1,saveError:"",isGrupoDrawerOpen:!1,isRamoDrawerOpen:!1,isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:!1,isEmbalagensCadastroOpen:!1,selectedGrupoId:null},$()}function qs(){s={...s,isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!0,embalagensCadastro:{...s.embalagensCadastro||{},saveError:""}},$()}function Xe(){Se(),s.isClasseProdutosDrawerOpen&&Y.close(),s.isSelecionarClasseDrawerOpen&&ee.close(),s={...s,isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!1,isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:!1,produtosCadastro:{...s.produtosCadastro||{},isSaving:!1,saveError:""}},$()}function Be(){Se(),s={...s,isEmbalagensCadastroOpen:!1,embalagensCadastro:{...s.embalagensCadastro||{},isSaving:!1,saveError:""}},$()}function Ye(){return{ativo:!!s.isAtivo,tipo:s.tipo||"pessoas",ramo:Array.isArray(s.ramoChips)?s.ramoChips:[],...s.form}}function Fs(){const o=s.form||{};return o.grupo?o.categoria?o.setor?!Array.isArray(s.ramoChips)||s.ramoChips.length===0?"Informe ao menos um Ramo.":"":"Selecione o Setor.":"Selecione a Categoria.":"Selecione o Grupo de Empresas."}async function Ns(){if(s.isSaving)return;const o=Fs();if(o){s={...s,saveError:o},$();return}s={...s,isSaving:!0,saveError:""},$();try{if(await new Promise(k=>{U=window.setTimeout(()=>{U=null,k()},900)}),!s.isOpen)return;const n=Ye(),p="C-"+String(Date.now()).slice(-4);_e=[{id:"cad-"+Date.now(),codigo:p,grupo:Ls("cpe-grupo",n.grupo)||"-",tipo:n.tipo==="pessoas"?"PF":"PJ",documento:String(n.cnpj||"").trim(),razaoSocial:String(n.razaoSocial||"").trim(),nomeFantasia:String(n.nomeFantasia||"").trim()},..._e],xs(),v&&(v.value=""),xe(),Ke()}catch{s={...s,isSaving:!1,saveError:"Não foi possível salvar o cadastro. Tente novamente."},$();return}s={...s,isSaving:!1},$()}function es(){const o=s.produtosCadastro||{};return{ativo:!!o.isAtivo,tipo:o.tipo||"produto",...o.form||{},marca:Array.isArray(o.marcaChips)?o.marcaChips:[],fabricante:Array.isArray(o.fabricanteChips)?o.fabricanteChips:[]}}function Rs(){const o=s.produtosClassificacao||{};return{selectedGrupoId:o.selectedGrupoId||"",selectedCategoriaId:o.selectedCategoriaId||"",selectedClasseId:o.selectedClasseId||"",search:o.search||""}}function Vs(){const o=s.produtosCadastro?.form||{};return o.classe?o.descricao?o.unidade?"":"Informe a unidade.":"Informe a descrição.":"Selecione a classe."}async function Gs(){const o=s.produtosCadastro||{};if(o.isSaving)return;const n=Vs();if(n){s={...s,produtosCadastro:{...o,saveError:n}},$();return}s={...s,produtosCadastro:{...o,isSaving:!0,saveError:""}},$();try{if(await new Promise(p=>{U=window.setTimeout(()=>{U=null,p()},900)}),!s.isProdutosCadastroOpen)return;console.log("Salvar cadastro produto/serviço",es()),Xe()}catch{s={...s,produtosCadastro:{...s.produtosCadastro||{},isSaving:!1,saveError:"Não foi possível salvar o cadastro. Tente novamente."}},$();return}s={...s,produtosCadastro:{...s.produtosCadastro||{},isSaving:!1}},$()}function ss(){const o=s.embalagensCadastro||{};return{ativo:!!o.isAtivo,...o.form||{}}}function js(){const o=s.embalagensCadastro?.form||{};return o.unidadeEquivalencia?o.valorConversao?o.descricao?o.sigla?"":"Informe a sigla.":"Informe a descrição.":"Informe o valor de conversão.":"Selecione a unidade de equivalência."}async function zs(){const o=s.embalagensCadastro||{};if(o.isSaving)return;const n=js();if(n){s={...s,embalagensCadastro:{...o,saveError:n}},$();return}s={...s,embalagensCadastro:{...o,isSaving:!0,saveError:""}},$();try{if(await new Promise(p=>{U=window.setTimeout(()=>{U=null,p()},900)}),!s.isEmbalagensCadastroOpen)return;console.log("Salvar cadastro embalagem",ss()),Be()}catch{s={...s,embalagensCadastro:{...s.embalagensCadastro||{},isSaving:!1,saveError:"Não foi possível salvar o cadastro. Tente novamente."}},$();return}s={...s,embalagensCadastro:{...s.embalagensCadastro||{},isSaving:!1}},$()}function Ws(){if(document.getElementById("cadastros-subtabs"))return;const o=c&&a&&c.parentElement===a?c:r&&a&&r.parentElement===a?r:i;o&&o.insertAdjacentHTML("afterend",`
        <section class="cadastros-subtabs" id="cadastros-subtabs" aria-label="Navegação de Produtos e Serviços">
          <button type="button" class="cadastros-subtabs__item is-active" data-subtab="produtos-servicos">Produtos e Serviços</button>
          <button type="button" class="cadastros-subtabs__item" data-subtab="classificacao">Classificação</button>
          <button type="button" class="cadastros-subtabs__item" data-subtab="embalagens">Embalagens</button>
          <button type="button" class="cadastros-subtabs__item" data-subtab="complementares">Complementares</button>
        </section>
        <section class="cadastros-content-header" id="cadastros-content-header">
          <h3 class="cadastros-content-title">Produtos e Serviços</h3>
          <button type="button" class="btn btn--primary" id="cadastros-content-new-btn">Cadastrar</button>
        </section>
      `)}function Zs(){!d||!i||!q||d.parentElement!==i&&i.insertBefore(d,q)}function Js(){!d||!b||(u&&u.parentElement===b?b.insertBefore(d,u):b.appendChild(d))}function Te(){if(!C||!S)return;if((s.activeProdutosSubTab||"produtos-servicos")==="embalagens"){C.innerHTML=`
        <tr>
          <th>Código</th>
          <th>Descrição</th>
          <th>Sigla</th>
          <th>Valor de Conversão</th>
          <th>Unidade de Equivalência</th>
          <th>Ações</th>
        </tr>
      `,S.innerHTML=`
        <tr data-code="INS-001">
          <td>INS-001</td>
          <td>Nome da embalagem</td>
          <td>NE</td>
          <td>100</td>
          <td>L</td>
          <td class="cadastros-actions">
            <button type="button" class="cadastros-link" data-action="view">Ver
              <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
            </button>
            <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
              <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </td>
        </tr>
        <tr data-code="INS-001">
          <td>INS-001</td>
          <td>Nome da embalagem</td>
          <td>NE</td>
          <td>100</td>
          <td>L</td>
          <td class="cadastros-actions">
            <button type="button" class="cadastros-link" data-action="view">Ver
              <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
            </button>
            <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
              <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </td>
        </tr>
      `;return}C.innerHTML=`
      <tr>
        <th>Código</th>
        <th>Classe</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Unidade</th>
        <th>Acoes</th>
      </tr>
    `,S.innerHTML=`
      <tr data-code="INS-001">
        <td>INS-001</td>
        <td>01.01.01 - Inseticida</td>
        <td>Serviço</td>
        <td>Inseticida POWER KILL</td>
        <td>L</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver
            <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
            <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>
      <tr data-code="INS-001">
        <td>INS-001</td>
        <td>01.01.01 - Inseticida</td>
        <td>Produto</td>
        <td>Inseticida POWER KILL</td>
        <td>L</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver
            <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
            <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>
    `}function as(){const o=document.getElementById("cadastros-subtabs");if(!o)return;const n=s.activeProdutosSubTab||"produtos-servicos",p=!!(s.isProdutosCadastroOpen||s.isEmbalagensCadastroOpen);o.querySelectorAll(".cadastros-subtabs__item").forEach(y=>{const k=y.getAttribute("data-subtab")||"",B=k==="complementares"||p&&k!==n;y.toggleAttribute("disabled",B),y.classList.toggle("is-disabled",B),y.setAttribute("aria-disabled",B?"true":"false")})}function Me(){const o=document.querySelector("#cadastros-content-header .cadastros-content-title");if(!o)return;const n=s.activeProdutosSubTab||"produtos-servicos";if(n==="embalagens"){o.textContent="Embalagens";return}if(n==="complementares"){o.textContent="Complementares";return}o.textContent="Produtos e Serviços"}function Us(){!C||!S||(C.innerHTML=f,xe())}function os(o){if(!A)return;const n=A.querySelector(".cadastros-filters__dot"),p=A.querySelector("svg");n&&(n.style.display=o?"none":""),p&&(p.style.display=o?"none":"")}function ts(o){w=o==="produtos-servicos"?"produtos-servicos":"pessoas-empresas",w==="produtos-servicos"&&s.activeProdutosSubTab==="complementares"&&(s={...s,activeProdutosSubTab:"produtos-servicos"});const n=w==="produtos-servicos";if(n&&s.isGrupoDrawerOpen&&Ce.close(),n&&s.isRamoDrawerOpen&&$e.close(),!n&&s.isClasseProdutosDrawerOpen&&Y.close(),!n&&s.isSelecionarClasseDrawerOpen&&ee.close(),!n&&(s.isProdutosCadastroOpen||s.isEmbalagensCadastroOpen)&&(s={...s,isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!1}),!a)return;if(n){a.classList.add("cadastros-page--produtos-servicos"),Ws();const k=document.getElementById("cadastros-subtabs"),L=document.getElementById("cadastros-content-header");if(k&&(k.hidden=!1),L&&(L.hidden=!1),k){const B=s.activeProdutosSubTab||"produtos-servicos";k.querySelectorAll(".cadastros-subtabs__item").forEach(T=>{T.classList.toggle("is-active",T.getAttribute("data-subtab")===B)})}as(),v&&(v.placeholder="Buscar por: Razão Social, CNPJ, Cidade..."),Zs(),Me(),os(!0),Te(),$();return}a.classList.remove("cadastros-page--produtos-servicos");const p=document.getElementById("cadastros-subtabs"),y=document.getElementById("cadastros-content-header");p&&(p.hidden=!0),y&&(y.hidden=!0),v&&(v.placeholder=g),Js(),os(!1),Us(),$()}const rs=o=>{const n=o?.detail?.mode;n!=="pessoas-empresas"&&n!=="produtos-servicos"||ts(n)},Qs=()=>{if(w==="produtos-servicos"){if(s.activeProdutosSubTab==="produtos-servicos"){Os();return}s.activeProdutosSubTab==="embalagens"&&qs();return}Ds()},cs=()=>{if(w==="pessoas-empresas"){ze.open({triggerEl:A||null,initialFilters:s.pessoasEmpresasFiltros||{}});return}w==="produtos-servicos"&&(s.activeProdutosSubTab||"produtos-servicos")==="produtos-servicos"&&We.open({triggerEl:A||null,initialFilters:s.produtosFiltros||{}})},is=o=>{if(!(o.target instanceof Element))return;const n=o.target.closest(".cadastros-badge__remove");if(!n||!M)return;const p=n.closest(".cadastros-badge");p&&p.remove()},ns=o=>{if(!(o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement))return;const n=o.dataset.cpeField;if(!n)return;const y=o instanceof HTMLInputElement&&o.type==="checkbox"?o.checked:o.value;s={...s,form:{...s.form||{},[n]:y},saveError:""}},ds=o=>{if(!(o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement))return;const n=o.dataset.cpsField;n&&(s={...s,produtosCadastro:{...s.produtosCadastro||{},form:{...s.produtosCadastro&&s.produtosCadastro.form||{},[n]:o.value},saveError:""}})},Ks=o=>{if(!(o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement))return;const n=o.dataset.ceField;n&&(s={...s,embalagensCadastro:{...s.embalagensCadastro||{},form:{...s.embalagensCadastro&&s.embalagensCadastro.form||{},[n]:o.value},saveError:""}})},ls=async o=>{if(!(o.target instanceof Element))return;if(o.target.closest("#cadastros-new-btn, #cadastros-content-new-btn")){Qs();return}const p=o.target.closest(".cadastros-subtabs__item[data-subtab]");if(p&&w==="produtos-servicos"){if(p.disabled)return;const m=p.getAttribute("data-subtab")||"produtos-servicos";if(m==="complementares")return;m!=="classificacao"&&s.isClasseProdutosDrawerOpen&&Y.close(),m!=="classificacao"&&s.isSelecionarClasseDrawerOpen&&ee.close();const h=s.produtosClassificacao||{};s={...s,activeProdutosSubTab:m,isProdutosCadastroOpen:m==="produtos-servicos"?s.isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:m==="embalagens"?s.isEmbalagensCadastroOpen:!1,isClasseProdutosDrawerOpen:m==="classificacao"?s.isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:m==="classificacao"?s.isSelecionarClasseDrawerOpen:!1,produtosClassificacao:{...h,grupoView:m==="classificacao"&&h.grupoView||"list",categoriaView:m==="classificacao"&&h.categoriaView||"list",classeView:m==="classificacao"&&h.classeView||"list"}};const x=document.getElementById("cadastros-subtabs");x&&x.querySelectorAll(".cadastros-subtabs__item").forEach(O=>{O.classList.toggle("is-active",O===p)}),Me(),Te(),$();return}const y=o.target.closest("[data-cpe-subtab]");if(y&&w==="pessoas-empresas"){const m=y.getAttribute("data-cpe-subtab")||"pessoas-empresas";m!=="grupo-empresas"&&s.isGrupoDrawerOpen&&Ce.close(),s={...s,activeSubTab:m},$();return}const k=o.target.closest("[data-cpe-tipo]");if(k&&w==="pessoas-empresas"){const m=k.getAttribute("data-cpe-tipo")||"pessoas";s={...s,tipo:m},$();return}if(o.target.closest("[data-cpe-accordion-trigger]")&&w==="pessoas-empresas"){s={...s,isComplementaresOpen:!s.isComplementaresOpen},$();return}const B=o.target.closest("[data-cpe-remove-ramo]");if(B&&w==="pessoas-empresas"){const m=B.getAttribute("data-cpe-remove-ramo");if(!m)return;s={...s,ramoChips:(s.ramoChips||[]).filter(h=>h!==m),saveError:""},$();return}const T=o.target.closest("[data-cpe-create]");if(T&&w==="pessoas-empresas"){const m=T.getAttribute("data-cpe-create")||"registro";if(m==="grupo"&&s.isOpen){Je({mode:"create",grupoId:null,triggerEl:T});return}if(m==="ramo"&&s.isOpen){Ts({triggerEl:T,initialTab:s.ramoDrawerTab||"ativos"});return}console.log(`Ação de criação (${m}) ainda não integrada ao backend.`);return}const N=o.target.closest("[data-cpsc-grupo-edit]");if(N&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=N.getAttribute("data-cpsc-grupo-edit")||"",h=s.produtosClassificacao||{},O=(Array.isArray(h.grupos)?h.grupos:[]).find((D={})=>String(D.id||"")===m);s={...s,produtosClassificacao:{...h,grupoView:"editor",grupoEditor:{id:O?.id||null,posicao:O?.codigo||"",nome:O?.nome||""}}},$();return}const V=o.target.closest('.cadastros-link[data-action="view"]');if(V&&w==="produtos-servicos"&&(s.activeProdutosSubTab||"produtos-servicos")==="produtos-servicos"&&!s.isProdutosCadastroOpen){const m=V.closest("tr"),h=Le(m);Ps({triggerEl:V,item:h});return}const se=o.target.closest('.cadastros-link[data-action="edit"]');if(se&&w==="produtos-servicos"&&(s.activeProdutosSubTab||"produtos-servicos")==="produtos-servicos"&&!s.isProdutosCadastroOpen){const m=se.closest("tr"),h=Le(m);if(!h)return;Qe(h);return}if(o.target.closest("[data-cpsc-grupo-editor-close], [data-cpsc-grupo-editor-cancel]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){s={...s,produtosClassificacao:{...s.produtosClassificacao||{},grupoView:"list",grupoEditor:{id:null,posicao:"",nome:""}}},$();return}if(o.target.closest("[data-cpsc-grupo-editor-save]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=s.produtosClassificacao||{},h=m.grupoEditor||{},x=String(h.nome||"").trim(),O=String(h.posicao||"").trim();if(!x||!O)return;const D=String(h.id||`grupo-${Date.now()}`),z=[...Array.isArray(m.grupos)?m.grupos:[]],F=z.findIndex((ce={})=>String(ce.id||"")===D),Q={id:D,codigo:O,nome:x};F>=0?z[F]={...z[F]||{},...Q}:z.unshift(Q),s={...s,produtosClassificacao:{...m,grupos:z,selectedGrupoId:D,grupoView:"list",grupoEditor:{id:null,posicao:"",nome:""}}},$();return}const gs=o.target.closest("[data-cpsc-categoria-edit]");if(gs&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=gs.getAttribute("data-cpsc-categoria-edit")||"",h=s.produtosClassificacao||{},x=Array.isArray(h.categorias)?h.categorias:[],O=Array.isArray(h.grupos)?h.grupos:[],D=x.find((z={})=>String(z.id||"")===m),R=String(h.selectedGrupoId||O[0]?.id||"");s={...s,produtosClassificacao:{...h,categoriaView:"editor",categoriaEditor:{id:D?.id||null,grupoId:String(D?.grupoId||R),posicao:D?.codigo||"",nome:D?.nome||""}}},$();return}if(o.target.closest("[data-cpsc-categoria-editor-close], [data-cpsc-categoria-editor-cancel]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=s.produtosClassificacao||{},h=Array.isArray(m.grupos)?m.grupos:[];s={...s,produtosClassificacao:{...m,categoriaView:"list",categoriaEditor:{id:null,grupoId:String(m.selectedGrupoId||h[0]?.id||""),posicao:"",nome:""}}},$();return}if(o.target.closest("[data-cpsc-categoria-editor-save]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=s.produtosClassificacao||{},h=m.categoriaEditor||{},x=String(h.grupoId||"").trim(),O=String(h.nome||"").trim(),D=String(h.posicao||"").trim();if(!x||!O||!D)return;const R=String(h.id||`${x}-${Date.now()}`),F=[...Array.isArray(m.categorias)?m.categorias:[]],Q=F.findIndex((qe={})=>String(qe.id||"")===R),ce={id:R,grupoId:x,codigo:D,nome:O};Q>=0?F[Q]={...F[Q]||{},...ce}:F.unshift(ce);const Oe=(Array.isArray(m.classes)?m.classes:[]).find((qe={})=>String(qe.categoriaId||"")===R),we=Array.isArray(m.grupos)?m.grupos:[];s={...s,produtosClassificacao:{...m,categorias:F,selectedGrupoId:x,selectedCategoriaId:R,selectedClasseId:Oe?.id||"",categoriaView:"list",categoriaEditor:{id:null,grupoId:String(x||we[0]?.id||""),posicao:"",nome:""}}},$();return}const fs=o.target.closest("[data-cpsc-classe-edit]");if(fs&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=fs.getAttribute("data-cpsc-classe-edit")||"",h=s.produtosClassificacao||{},x=Array.isArray(h.classes)?h.classes:[],O=Array.isArray(h.categorias)?h.categorias:[],D=x.find((z={})=>String(z.id||"")===m),R=String(h.selectedCategoriaId||O[0]?.id||"");s={...s,produtosClassificacao:{...h,classeView:"editor",classeEditor:{id:D?.id||null,categoriaId:String(D?.categoriaId||R),posicao:D?.codigo||"",nome:D?.nome||"",produtos:D?.produtos!==!1,servicos:D?.servicos!==!1}}},$();return}if(o.target.closest("[data-cpsc-classe-editor-close], [data-cpsc-classe-editor-cancel]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=s.produtosClassificacao||{},h=Array.isArray(m.categorias)?m.categorias:[];s={...s,produtosClassificacao:{...m,classeView:"list",classeEditor:{id:null,categoriaId:String(m.selectedCategoriaId||h[0]?.id||""),posicao:"",nome:"",produtos:!0,servicos:!0}}},$();return}if(o.target.closest("[data-cpsc-classe-editor-save]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=s.produtosClassificacao||{},h=m.classeEditor||{},x=String(h.categoriaId||"").trim(),O=String(h.nome||"").trim(),D=String(h.posicao||"").trim();if(!x||!O||!D)return;const R=String(h.id||`${x}-${Date.now()}`),F=[...Array.isArray(m.classes)?m.classes:[]],Q=F.findIndex((we={})=>String(we.id||"")===R),ce={id:R,categoriaId:x,codigo:D,nome:O,produtos:h.produtos!==!1,servicos:h.servicos!==!1};Q>=0?F[Q]={...F[Q]||{},...ce}:F.unshift(ce);const De=Array.isArray(m.categorias)?m.categorias:[],Oe=De.find((we={})=>String(we.id||"")===x);s={...s,produtosClassificacao:{...m,classes:F,selectedGrupoId:Oe?.grupoId||m.selectedGrupoId||"",selectedCategoriaId:x,selectedClasseId:R,classeView:"list",classeEditor:{id:null,categoriaId:String(x||De[0]?.id||""),posicao:"",nome:"",produtos:!0,servicos:!0}}},$();return}const Pe=o.target.closest("[data-cpsc-classe-produtos]");if(Pe&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){o.preventDefault();const m=Pe.getAttribute("data-cpsc-classe-produtos")||"";Ms({classeId:m,triggerEl:Pe});return}const vs=o.target.closest("[data-cpsc-search-menu]");if(vs&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){o.preventDefault(),Ue({triggerEl:vs});return}const He=o.target.closest("[data-cpsc-select][data-cpsc-id]");if(He&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=He.getAttribute("data-cpsc-select")||"",h=He.getAttribute("data-cpsc-id")||"",x=s.produtosClassificacao||{};if(m==="grupo"){const D=(Array.isArray(x.categorias)?x.categorias:[]).find((F={})=>String(F.grupoId||"")===h),z=(Array.isArray(x.classes)?x.classes:[]).find((F={})=>String(F.categoriaId||"")===String(D?.id||""));s={...s,produtosClassificacao:{...x,selectedGrupoId:h,selectedCategoriaId:D?.id||"",selectedClasseId:z?.id||""}},$();return}if(m==="categoria"){const D=(Array.isArray(x.classes)?x.classes:[]).find((R={})=>String(R.categoriaId||"")===h);s={...s,produtosClassificacao:{...x,selectedCategoriaId:h,selectedClasseId:D?.id||""}},$();return}m==="classe"&&(s={...s,produtosClassificacao:{...x,selectedClasseId:h}},$());return}const ms=o.target.closest("[data-cpsc-new]");if(ms&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const m=ms.getAttribute("data-cpsc-new")||"item";if(m==="grupo"){s={...s,produtosClassificacao:{...s.produtosClassificacao||{},grupoView:"editor",grupoEditor:{id:null,posicao:"",nome:""}}},$();return}if(m==="categoria"){const h=s.produtosClassificacao||{},x=Array.isArray(h.grupos)?h.grupos:[];s={...s,produtosClassificacao:{...h,categoriaView:"editor",categoriaEditor:{id:null,grupoId:String(h.selectedGrupoId||x[0]?.id||""),posicao:"",nome:""}}},$();return}if(m==="classe"){const h=s.produtosClassificacao||{},x=Array.isArray(h.categorias)?h.categorias:[];s={...s,produtosClassificacao:{...h,classeView:"editor",classeEditor:{id:null,categoriaId:String(h.selectedCategoriaId||x[0]?.id||""),posicao:"",nome:"",produtos:!0,servicos:!0}}},$();return}console.log(`Criar novo ${m} ainda nao integrado ao backend.`);return}if(o.target.closest("[data-cpsc-save]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){console.log("Salvar classificacao de produtos/servicos",Rs());return}if(o.target.closest("[data-cpsc-cancel]")&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){s.isClasseProdutosDrawerOpen&&Y.close(),s.isSelecionarClasseDrawerOpen&&ee.close(),s={...s,activeProdutosSubTab:"produtos-servicos"};const m=document.getElementById("cadastros-subtabs");m&&m.querySelectorAll(".cadastros-subtabs__item").forEach(h=>{const x=h.getAttribute("data-subtab")||"";h.classList.toggle("is-active",x==="produtos-servicos")}),Me(),Te(),$();return}const bs=o.target.closest("[data-cps-tipo]");if(bs&&w==="produtos-servicos"&&s.isProdutosCadastroOpen){const m=bs.getAttribute("data-cps-tipo")||"produto";s={...s,produtosCadastro:{...s.produtosCadastro||{},tipo:m}},$();return}const _s=o.target.closest("[data-cps-accordion]");if(_s&&w==="produtos-servicos"&&s.isProdutosCadastroOpen){const m=_s.getAttribute("data-cps-accordion");if(!m)return;s={...s,produtosCadastro:{...s.produtosCadastro||{},isCadastroComplementaresOpen:m==="cadastro"?s.produtosCadastro?.isCadastroComplementaresOpen===!1:s.produtosCadastro?.isCadastroComplementaresOpen!==!1,isClasseComplementaresOpen:m==="classe"?s.produtosCadastro?.isClasseComplementaresOpen===!1:s.produtosCadastro?.isClasseComplementaresOpen!==!1}},$();return}if(o.target.closest("[data-cps-copy]")&&w==="produtos-servicos"&&s.isProdutosCadastroOpen){console.log("Copiar cadastro produto/serviço",es());return}const Cs=o.target.closest("[data-cps-select-class]");if(Cs&&w==="produtos-servicos"&&s.isProdutosCadastroOpen){Ue({triggerEl:Cs,mode:"cadastro"});return}if(o.target.closest("[data-cps-save]")&&w==="produtos-servicos"&&s.isProdutosCadastroOpen){await Gs();return}if(o.target.closest("[data-cps-cancel]")&&w==="produtos-servicos"&&s.isProdutosCadastroOpen){Xe();return}if(o.target.closest("[data-ce-back]")&&w==="produtos-servicos"&&s.isEmbalagensCadastroOpen){Be();return}if(o.target.closest("[data-ce-copy]")&&w==="produtos-servicos"&&s.isEmbalagensCadastroOpen){console.log("Copiar cadastro embalagem",ss());return}if(o.target.closest("[data-ce-save]")&&w==="produtos-servicos"&&s.isEmbalagensCadastroOpen){await zs();return}if(o.target.closest("[data-ce-cancel]")&&w==="produtos-servicos"&&s.isEmbalagensCadastroOpen){Be();return}if(o.target.closest("[data-cpe-copy]")&&w==="pessoas-empresas"){console.log("Copiar cadastro pessoa/empresa",Ye());return}if(o.target.closest("[data-cpe-save]")&&w==="pessoas-empresas"){await Ns();return}if(o.target.closest("[data-cpe-cancel]")&&w==="pessoas-empresas"){Ke();return}const he=o.target.closest("[data-action]");if(he){const m=he.dataset.action;if(!m)return;const h=he.closest("tr"),x=he.getAttribute("data-cpe-grupo-view")||h?.getAttribute("data-grupo-id")||"";if(w==="pessoas-empresas"&&s.isOpen&&s.activeSubTab==="grupo-empresas"&&m==="view"){Je({mode:"edit",grupoId:x,triggerEl:he});return}const D=h?.dataset.code||"";console.log(`Ação: ${m}${D?` (${D})`:""}`)}},ps=o=>{if(!(o.target instanceof Element))return;const n=o.target.closest("[data-cpsc-categoria-field]");if(n instanceof HTMLSelectElement&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const L=n.getAttribute("data-cpsc-categoria-field")||"";if(!L)return;const B=s.produtosClassificacao||{},T=B.categoriaEditor||{};s={...s,produtosClassificacao:{...B,categoriaEditor:{...T,[L]:n.value||""}}};return}const p=o.target.closest("[data-cpsc-classe-field]");if((p instanceof HTMLInputElement||p instanceof HTMLSelectElement)&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const L=p.getAttribute("data-cpsc-classe-field")||"";if(!L)return;const B=s.produtosClassificacao||{},T=B.classeEditor||{},N=p instanceof HTMLInputElement&&p.type==="checkbox"?!!p.checked:p.value||"";s={...s,produtosClassificacao:{...B,classeEditor:{...T,[L]:N}}};return}const y=o.target.closest("#cadastro-pessoa-empresa-ativo");if(y instanceof HTMLInputElement){s={...s,isAtivo:!!y.checked,saveError:""};return}const k=o.target.closest("#cadastro-produtos-servicos-ativo");if(k instanceof HTMLInputElement){s={...s,produtosCadastro:{...s.produtosCadastro||{},isAtivo:!!k.checked,saveError:""}};return}ds(o.target),ns(o.target)},us=o=>{if(!(o.target instanceof Element))return;if(o.target.id==="cadastros-search-input"&&w==="pessoas-empresas"){xe();return}const n=o.target.closest("[data-cpe-grupo-search]");if(n instanceof HTMLInputElement&&w==="pessoas-empresas"){const T=(n.value||"").trim().toLowerCase(),N=Array.isArray(s.grupoEmpresasRowsAll)?s.grupoEmpresasRowsAll:[];s={...s,grupoEmpresasSearch:T,grupoEmpresasRows:N.filter((V={})=>{const se=String(V.codigo||"").toLowerCase(),ke=String(V.nome||"").toLowerCase(),Ie=String(V.descricao||"").toLowerCase();return se.includes(T)||ke.includes(T)||Ie.includes(T)})},$();return}const p=o.target.closest("[data-cpsc-search]");if(p instanceof HTMLInputElement&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){s={...s,produtosClassificacao:{...s.produtosClassificacao||{},search:p.value||""}},$();return}const y=o.target.closest("[data-cpsc-grupo-field]");if(y instanceof HTMLInputElement&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const T=y.getAttribute("data-cpsc-grupo-field")||"";if(!T)return;const N=s.produtosClassificacao||{},V=N.grupoEditor||{};s={...s,produtosClassificacao:{...N,grupoEditor:{...V,[T]:y.value||""}}};return}const k=o.target.closest("#cadastro-embalagens-ativo");if(k instanceof HTMLInputElement){s={...s,embalagensCadastro:{...s.embalagensCadastro||{},isAtivo:!!k.checked,saveError:""}};return}const L=o.target.closest("[data-cpsc-categoria-field]");if((L instanceof HTMLInputElement||L instanceof HTMLSelectElement)&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const T=L.getAttribute("data-cpsc-categoria-field")||"";if(!T)return;const N=s.produtosClassificacao||{},V=N.categoriaEditor||{};s={...s,produtosClassificacao:{...N,categoriaEditor:{...V,[T]:L.value||""}}};return}const B=o.target.closest("[data-cpsc-classe-field]");if((B instanceof HTMLInputElement||B instanceof HTMLSelectElement)&&w==="produtos-servicos"&&s.activeProdutosSubTab==="classificacao"){const T=B.getAttribute("data-cpsc-classe-field")||"";if(!T)return;const N=s.produtosClassificacao||{},V=N.classeEditor||{},se=B instanceof HTMLInputElement&&B.type==="checkbox"?!!B.checked:B.value||"";s={...s,produtosClassificacao:{...N,classeEditor:{...V,[T]:se}}};return}Ks(o.target),ds(o.target),ns(o.target)};return window.addEventListener("header:tabchange",rs),A&&A.addEventListener("click",cs),M&&M.addEventListener("click",is),a&&a.addEventListener("click",ls),a&&a.addEventListener("change",ps),a&&a.addEventListener("input",us),ts(w),()=>{Se(),Ce.cleanup(),$e.cleanup(),ze.cleanup(),We.cleanup(),Ze.cleanup(),Y.cleanup(),ee.cleanup(),e&&e.classList.remove("header--kanban-compact-tabs"),window.removeEventListener("header:tabchange",rs),A&&A.removeEventListener("click",cs),M&&M.removeEventListener("click",is),a&&a.removeEventListener("click",ls),a&&a.removeEventListener("change",ps),a&&a.removeEventListener("input",us)}}const Bo={init:Ya};export{Bo as default,Ya as init};
