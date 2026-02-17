import{i as vs,c as Ce,a as he}from"./drawer-BDW5OHfS.js";import{i as Se,c as be,a as we}from"./input-CJxodaL9.js";import{i as Ke,c as ye}from"./checkbox-DFfd8jyA.js";const ms=[{id:"pessoas-empresas",label:"Pessoas e Empresas"},{id:"grupo-empresas",label:"Grupo de empresas"},{id:"categoria",label:"Categoria"},{id:"setor",label:"Setor"},{id:"ramo",label:"Ramo"}];function _s(s={}){const o=!!s.isSaving,t=Array.isArray(s.grupoEmpresasRows)?s.grupoEmpresasRows:[],c=s.grupoEmpresasSearch||"",r=t.length>0;return`
    <header class="cadastro-pessoa-empresa__header">
      <h2 class="cadastro-pessoa-empresa__title">Cadastrar Grupo</h2>
      <div class="cadastro-pessoa-empresa__header-actions">
        <button type="button" class="btn btn--primary" data-cpe-create="grupo" ${o?"disabled":""}>
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
              value="${c}"
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
              ${r?t.map((p={})=>`
                <tr data-code="${p.codigo||""}" data-grupo-id="${p.id||p.codigo||""}">
                  <td>${p.codigo||"-"}</td>
                  <td>${p.nome||"-"}</td>
                  <td>${p.descricao||"-"}</td>
                  <td class="cadastros-actions">
                    <button type="button" class="cadastros-link" data-action="view" data-cpe-grupo-view="${p.id||p.codigo||""}">Ver
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
  `}function Cs(s={}){const o=s.activeSubTab||"pessoas-empresas";if(o==="pessoas-empresas")return hs(s);if(o==="grupo-empresas")return _s(s);const c={categoria:"Categoria",setor:"Setor",ramo:"Ramo"}[o]||"Cadastro";return`
    <section class="cadastro-pessoa-empresa__placeholder-card">
      <h3 class="cadastro-pessoa-empresa__placeholder-title">${c}</h3>
      <p class="cadastro-pessoa-empresa__placeholder-text">
        Conteúdo de ${c} em preparação.
      </p>
    </section>
  `}function hs(s={}){const t=(s.tipo||"pessoas")==="pessoas",c=!!s.isAtivo,r=!!s.isSaving,p=!!s.isComplementaresOpen,d=s.saveError||"",v=Array.isArray(s.ramoChips)?s.ramoChips:[],i=s.form||{};return`
    <header class="cadastro-pessoa-empresa__header">
      <h2 class="cadastro-pessoa-empresa__title">Cadastro de Pessoas e Empresas</h2>
      <div class="cadastro-pessoa-empresa__header-actions">
        <label class="toggle cadastro-pessoa-empresa__toggle">
          <input
            type="checkbox"
            class="toggle-input"
            id="cadastro-pessoa-empresa-ativo"
            ${c?"checked":""}
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
                class="cadastro-pessoa-empresa__tipo-btn ${t?"is-active":""}"
                data-cpe-tipo="pessoas"
                role="tab"
                aria-selected="${t}"
                ${r?"disabled":""}
              >
                Pessoas
              </button>
              <button
                type="button"
                class="cadastro-pessoa-empresa__tipo-btn ${t?"":"is-active"}"
                data-cpe-tipo="empresas"
                role="tab"
                aria-selected="${!t}"
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
              <option value="grupo-a" ${i.grupo==="grupo-a"?"selected":""}>Grupo A</option>
              <option value="grupo-b" ${i.grupo==="grupo-b"?"selected":""}>Grupo B</option>
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
              <option value="cat-1" ${i.categoria==="cat-1"?"selected":""}>Categoria 1</option>
              <option value="cat-2" ${i.categoria==="cat-2"?"selected":""}>Categoria 2</option>
            </select>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__section">
        <div class="cadastro-pessoa-empresa__company-header">
          <h3 class="cadastro-pessoa-empresa__section-title cadastro-pessoa-empresa__section-title--company">${t?"Informações da Pessoa Física":"Informações da Empresa"}</h3>
          <span class="cadastro-pessoa-empresa__company-id">#43434</span>
        </div>
        <div class="cadastro-pessoa-empresa__company-divider" aria-hidden="true"></div>
      </section>

      <section class="cadastro-pessoa-empresa__section cadastro-pessoa-empresa__empresa-card">

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">${t?"Dados da Pessoa Física":"Dados da Empresa"}</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cnpj">${t?"CPF":"CNPJ"}</label>
              <input id="cpe-cnpj" class="cadastro-pessoa-empresa__input" type="text" placeholder="${t?"000.000.000-00":"00.000.000/0000-00"}" data-cpe-field="cnpj" value="${i.cnpj||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-razao-social">${t?"Nome Completo":"Razão Social"}</label>
              <input id="cpe-razao-social" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="razaoSocial" value="${i.razaoSocial||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-nome-fantasia">${t?"Apelido":"Nome Fantasia"}</label>
              <input id="cpe-nome-fantasia" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="nomeFantasia" value="${i.nomeFantasia||""}" ${r?"disabled":""} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3 cadastro-pessoa-empresa__row--dados-secundaria">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-inscricao-estadual">Inscrição Estadual</label>
              <input id="cpe-inscricao-estadual" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="inscricaoEstadual" value="${i.inscricaoEstadual||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-inscricao-municipal">Inscrição Municipal</label>
              <input id="cpe-inscricao-municipal" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="inscricaoMunicipal" value="${i.inscricaoMunicipal||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--checkbox">
              <label class="checkbox checkbox--sm">
                <input type="checkbox" class="checkbox-input" data-cpe-field="produtorRural" ${i.produtorRural?"checked":""} ${r?"disabled":""} />
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
              <input id="cpe-cep" class="cadastro-pessoa-empresa__input" type="text" placeholder="00000-000" data-cpe-field="cep" value="${i.cep||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-logradouro">Logradouro</label>
              <input id="cpe-logradouro" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="logradouro" value="${i.logradouro||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--number">
              <label class="cadastro-pessoa-empresa__label" for="cpe-numero">Número</label>
              <input id="cpe-numero" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="numero" value="${i.numero||""}" ${r?"disabled":""} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--address-2">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-complemento">Complemento</label>
              <input id="cpe-complemento" class="cadastro-pessoa-empresa__input" type="text" placeholder="Sala, Andar" data-cpe-field="complemento" value="${i.complemento||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-bairro">Bairro</label>
              <input id="cpe-bairro" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="bairro" value="${i.bairro||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-cidade">Cidade</label>
              <input id="cpe-cidade" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="cidade" value="${i.cidade||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field cadastro-pessoa-empresa__field--uf">
              <label class="cadastro-pessoa-empresa__label" for="cpe-uf">UF</label>
              <input id="cpe-uf" class="cadastro-pessoa-empresa__input" type="text" placeholder="SP" maxlength="2" data-cpe-field="uf" value="${i.uf||""}" ${r?"disabled":""} />
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Contato</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--subsection" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--3">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-responsavel">Nome do Responsável</label>
              <input id="cpe-responsavel" class="cadastro-pessoa-empresa__input" type="text" data-cpe-field="nomeResponsavel" value="${i.nomeResponsavel||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-celular">Celular / WhatsApp</label>
              <input id="cpe-celular" class="cadastro-pessoa-empresa__input" type="text" placeholder="(00) 00000-0000" data-cpe-field="celular" value="${i.celular||""}" ${r?"disabled":""} />
            </div>
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-telefone-fixo">Telefone Fixo</label>
              <input id="cpe-telefone-fixo" class="cadastro-pessoa-empresa__input" type="text" placeholder="(00) 0000-0000" data-cpe-field="telefoneFixo" value="${i.telefoneFixo||""}" ${r?"disabled":""} />
            </div>
          </div>
          <div class="cadastro-pessoa-empresa__row cadastro-pessoa-empresa__row--email">
            <div class="cadastro-pessoa-empresa__field">
              <label class="cadastro-pessoa-empresa__label" for="cpe-email">E-mail</label>
              <input id="cpe-email" class="cadastro-pessoa-empresa__input" type="email" placeholder="contato@empresa.com" data-cpe-field="email" value="${i.email||""}" ${r?"disabled":""} />
            </div>
          </div>
        </div>

        <div class="cadastro-pessoa-empresa__subsection">
          <h4 class="cadastro-pessoa-empresa__subsection-title">Observações</h4>
          <div class="cadastro-pessoa-empresa__company-divider cadastro-pessoa-empresa__company-divider--observacoes" aria-hidden="true"></div>
          <div class="cadastro-pessoa-empresa__field">
            <label class="cadastro-pessoa-empresa__label" for="cpe-observacoes">Informações Adicionais</label>
            <textarea id="cpe-observacoes" class="cadastro-pessoa-empresa__textarea" rows="3" placeholder="Informações adicionais sobre o cadastro..." data-cpe-field="observacoes" ${r?"disabled":""}>${i.observacoes||""}</textarea>
          </div>
        </div>
      </section>

      <section class="cadastro-pessoa-empresa__accordion">
        <button type="button" class="cadastro-pessoa-empresa__accordion-trigger" data-cpe-accordion-trigger ${r?"disabled":""}>
          <span>Informações complementares</span>
          <span class="cadastro-pessoa-empresa__accordion-arrow ${p?"is-open":""}" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3.5 6L8 10L12.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
        <div class="cadastro-pessoa-empresa__accordion-content ${p?"is-open":""}">
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
                  <option value="setor-1" ${i.setor==="setor-1"?"selected":""}>Setor 1</option>
                  <option value="setor-2" ${i.setor==="setor-2"?"selected":""}>Setor 2</option>
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
                  ${v.map(m=>`
                    <button type="button" class="chip chip--input chip--sm" data-value="${m}">
                      <span class="chip-label">${m}</span>
                      <span class="chip-close" data-cpe-remove-ramo="${m}">
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

      ${d?`<p class="cadastro-pessoa-empresa__error">${d}</p>`:""}

      <footer class="cadastro-pessoa-empresa__footer">
        <button type="button" class="btn btn--outline-dark" data-cpe-cancel ${r?"disabled":""}>Cancelar</button>
        <button type="button" class="btn btn--primary ${r?"btn--loading":""}" data-cpe-save ${r?"disabled":""}>Salvar cadastro</button>
      </footer>
    </section>
  `}function Ss(s={}){const o=s.activeSubTab||"pessoas-empresas";return`
    <section class="cadastro-pessoa-empresa" data-cadastro-pessoa-empresa>
      <nav class="cadastro-pessoa-empresa__subtabs" aria-label="Navegação de cadastro">
        ${ms.map(t=>`
          <button
            type="button"
            class="cadastro-pessoa-empresa__subtab ${t.id===o?"is-active":""}"
            data-cpe-subtab="${t.id}"
          >
            ${t.label}
          </button>
        `).join("")}
      </nav>
      ${Cs(s)}
    </section>
  `}function Ue(s=[]){return(Array.isArray(s)?s:[]).map(t=>`
    <button type="button" class="chip chip--input chip--sm" data-value="${t}">
      <span class="chip-label">${t}</span>
    </button>
  `).join("")}function ws(s={}){const o=s.form||{},t=!!s.isSaving,c=!!s.isAtivo,r=(s.tipo||"produto")==="produto",p=s.isCadastroComplementaresOpen!==!1,d=s.isClasseComplementaresOpen!==!1,v=s.saveError||"",i=Array.isArray(s.marcaChips)?s.marcaChips:["Marca"],m=Array.isArray(s.fabricanteChips)?s.fabricanteChips:["Fabricante"];return`
    <section class="cadastro-produtos-servicos" data-cadastro-produtos-servicos>
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
              ${c?"checked":""}
              ${t?"disabled":""}
            />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">Ativo</span>
          </label>
          <button type="button" class="btn btn--outline-dark" data-cps-copy ${t?"disabled":""}>Copiar cadastro</button>
          <button type="button" class="btn btn--primary ${t?"btn--loading":""}" data-cps-save ${t?"disabled":""}>Salvar cadastro</button>
        </div>
      </header>

      <section class="cadastro-produtos-servicos__card">
        <section class="cadastro-produtos-servicos__section">
          <div class="cadastro-produtos-servicos__section-header">
            <h3 class="cadastro-produtos-servicos__section-title">Dados do produto</h3>
            <span class="cadastro-produtos-servicos__id">#43434</span>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label">Tipo</label>
              <div class="cadastro-produtos-servicos__segmented" role="tablist" aria-label="Tipo do cadastro">
                <button type="button" class="cadastro-produtos-servicos__segment ${r?"is-active":""}" data-cps-tipo="produto" ${t?"disabled":""}>Produto</button>
                <button type="button" class="cadastro-produtos-servicos__segment ${r?"":"is-active"}" data-cps-tipo="servico" ${t?"disabled":""}>Serviço</button>
              </div>
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-classe">Classe*</label>
              <div class="cadastro-produtos-servicos__inline-action">
                <input id="cps-classe" class="cadastro-produtos-servicos__input" type="text" placeholder="Selecione a classe" value="${o.classe||""}" readonly ${t?"disabled":""} />
                <button type="button" class="btn btn--outline-dark cadastro-produtos-servicos__inline-btn" data-cps-select-class ${t?"disabled":""}>Selecionar</button>
              </div>
            </div>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-descricao">Descrição*</label>
              <input id="cps-descricao" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a descrição" data-cps-field="descricao" value="${o.descricao||""}" ${t?"disabled":""} />
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="cps-unidade">Unidade*</label>
              <input id="cps-unidade" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a unidade" data-cps-field="unidade" value="${o.unidade||""}" ${t?"disabled":""} />
            </div>
          </div>
        </section>

        <section class="cadastro-produtos-servicos__accordion">
          <button type="button" class="cadastro-produtos-servicos__accordion-trigger" data-cps-accordion="cadastro" ${t?"disabled":""}>
            <span>Complementares de Cadastro</span>
            <span class="cadastro-produtos-servicos__accordion-arrow ${p?"is-open":""}" aria-hidden="true">⌄</span>
          </button>
          <div class="cadastro-produtos-servicos__accordion-content ${p?"is-open":""}">
            <div class="cadastro-produtos-servicos__accordion-inner">
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label">Marca</label>
                  <div class="chip-input-field cadastro-produtos-servicos__chip-field">${Ue(i)}</div>
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label">Fabricante</label>
                  <div class="chip-input-field cadastro-produtos-servicos__chip-field">${Ue(m)}</div>
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-fornecedores">Fornecedores</label>
                  <input id="cps-fornecedores" class="cadastro-produtos-servicos__input" type="text" data-cps-field="fornecedores" value="${o.fornecedores||""}" ${t?"disabled":""} />
                </div>
              </div>
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-grupo-equivalencia">Grupo de Equivalência</label>
                  <input id="cps-grupo-equivalencia" class="cadastro-produtos-servicos__input" type="text" data-cps-field="grupoEquivalencia" value="${o.grupoEquivalencia||""}" ${t?"disabled":""} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-ncm">NCM</label>
                  <input id="cps-ncm" class="cadastro-produtos-servicos__input" type="text" data-cps-field="ncm" value="${o.ncm||""}" ${t?"disabled":""} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="cadastro-produtos-servicos__accordion">
          <button type="button" class="cadastro-produtos-servicos__accordion-trigger" data-cps-accordion="classe" ${t?"disabled":""}>
            <span>Complementares de Classe</span>
            <span class="cadastro-produtos-servicos__accordion-arrow ${d?"is-open":""}" aria-hidden="true">⌄</span>
          </button>
          <div class="cadastro-produtos-servicos__accordion-content ${d?"is-open":""}">
            <div class="cadastro-produtos-servicos__accordion-inner">
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-principio-ativo">Princípio Ativo</label>
                  <input id="cps-principio-ativo" class="cadastro-produtos-servicos__input" type="text" data-cps-field="principioAtivo" value="${o.principioAtivo||""}" ${t?"disabled":""} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-grupo-quimico">Grupo Químico</label>
                  <input id="cps-grupo-quimico" class="cadastro-produtos-servicos__input" type="text" data-cps-field="grupoQuimico" value="${o.grupoQuimico||""}" ${t?"disabled":""} />
                </div>
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-modo-acao">Modo de Ação</label>
                  <input id="cps-modo-acao" class="cadastro-produtos-servicos__input" type="text" data-cps-field="modoAcao" value="${o.modoAcao||""}" ${t?"disabled":""} />
                </div>
              </div>
              <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--3">
                <div class="cadastro-produtos-servicos__field">
                  <label class="cadastro-produtos-servicos__label" for="cps-registro-mapa">Número de Registro MAPA</label>
                  <input id="cps-registro-mapa" class="cadastro-produtos-servicos__input" type="text" data-cps-field="registroMapa" value="${o.registroMapa||""}" ${t?"disabled":""} />
                </div>
              </div>
            </div>
          </div>
        </section>

        ${v?`<p class="cadastro-produtos-servicos__error">${v}</p>`:""}

        <footer class="cadastro-produtos-servicos__footer">
          <button type="button" class="btn btn--outline-dark" data-cps-cancel ${t?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${t?"btn--loading":""}" data-cps-save ${t?"disabled":""}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `}function ys(s={}){const o=s.form||{},t=!!s.isSaving,c=!!s.isAtivo,r=s.saveError||"",p=Array.isArray(s.unidadeEquivalenciaOptions)?s.unidadeEquivalenciaOptions:[];return`
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
              ${c?"checked":""}
              ${t?"disabled":""}
            />
            <span class="toggle-track"><span class="toggle-thumb"></span></span>
            <span class="toggle-label">Ativo</span>
          </label>
          <button type="button" class="btn btn--outline-dark" data-ce-copy ${t?"disabled":""}>Copiar cadastro</button>
          <button type="button" class="btn btn--primary ${t?"btn--loading":""}" data-ce-save ${t?"disabled":""}>Salvar cadastro</button>
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
              <select id="ce-unidade-equivalencia" class="cadastro-produtos-servicos__input" data-ce-field="unidadeEquivalencia" ${t?"disabled":""}>
                <option value="">Selecione</option>
                ${p.map((d={})=>{const v=String(d.value||""),i=String(d.label||""),m=v===String(o.unidadeEquivalencia||"")?"selected":"";return`<option value="${v}" ${m}>${i}</option>`}).join("")}
              </select>
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-valor-conversao">Valor de Conversão**</label>
              <input id="ce-valor-conversao" class="cadastro-produtos-servicos__input" type="text" placeholder="Digite o valor" data-ce-field="valorConversao" value="${o.valorConversao||""}" ${t?"disabled":""} />
            </div>
          </div>

          <div class="cadastro-produtos-servicos__row cadastro-produtos-servicos__row--2">
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-descricao">Descrição**</label>
              <input id="ce-descricao" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a descrição" data-ce-field="descricao" value="${o.descricao||""}" ${t?"disabled":""} />
            </div>
            <div class="cadastro-produtos-servicos__field">
              <label class="cadastro-produtos-servicos__label" for="ce-sigla">Sigla*</label>
              <input id="ce-sigla" class="cadastro-produtos-servicos__input" type="text" placeholder="Insira a unidade" data-ce-field="sigla" value="${o.sigla||""}" ${t?"disabled":""} />
            </div>
          </div>
        </section>

        ${r?`<p class="cadastro-produtos-servicos__error">${r}</p>`:""}

        <footer class="cadastro-produtos-servicos__footer">
          <button type="button" class="btn btn--outline-dark" data-ce-cancel ${t?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${t?"btn--loading":""}" data-ce-save ${t?"disabled":""}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `}function Is(s={}){return String(s.search||"").trim().toLowerCase()}function ve(s=[],o=""){return o?s.filter((t={})=>{const c=String(t.codigo||"").toLowerCase(),r=String(t.nome||"").toLowerCase();return c.includes(o)||r.includes(o)}):s}function $s(s={}){const o=s.grupoEditor||{},t=o.posicao||"",c=o.nome||"";return`
    <section class="classificacao-ps__grupo-editor" data-cpsc-grupo-editor>
      <header class="classificacao-ps__grupo-editor-header">
        <h4>Novo Grupo</h4>
        <button type="button" class="classificacao-ps__grupo-editor-close" data-cpsc-grupo-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__grupo-editor-field">
        <label for="cpsc-grupo-posicao">Posição</label>
        <input id="cpsc-grupo-posicao" type="text" placeholder="Digite a posição" data-cpsc-grupo-field="posicao" value="${t}" />
      </div>

      <div class="classificacao-ps__grupo-editor-field">
        <label for="cpsc-grupo-nome">Nome do Grupo</label>
        <input id="cpsc-grupo-nome" type="text" placeholder="Digite o nome do Grupo" data-cpsc-grupo-field="nome" value="${c}" />
      </div>

      <footer class="classificacao-ps__grupo-editor-footer">
        <button type="button" class="classificacao-ps__grupo-editor-cancel" data-cpsc-grupo-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-grupo-editor-save>Salvar</button>
      </footer>
    </section>
  `}function ks(s={}){const o=s.categoriaEditor||{},t=Array.isArray(s.grupos)?s.grupos:[],c=String(o.grupoId||""),r=o.posicao||"",p=o.nome||"";return`
    <section class="classificacao-ps__categoria-editor" data-cpsc-categoria-editor>
      <header class="classificacao-ps__categoria-editor-header">
        <h4>Nova Categoria</h4>
        <button type="button" class="classificacao-ps__categoria-editor-close" data-cpsc-categoria-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-grupo">Grupo</label>
        <select id="cpsc-categoria-grupo" data-cpsc-categoria-field="grupoId" ${t.length>0?"":"disabled"}>
          <option value="">Selecione</option>
          ${t.map((v={})=>{const i=String(v.id||"");return`<option value="${i}" ${i===c?"selected":""}>${v.codigo||""} ${v.nome||""}</option>`}).join("")}
        </select>
      </div>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-posicao">Posicao</label>
        <input id="cpsc-categoria-posicao" type="text" placeholder="Digite a posicao" data-cpsc-categoria-field="posicao" value="${r}" />
      </div>

      <div class="classificacao-ps__categoria-editor-field">
        <label for="cpsc-categoria-nome">Nome da Categoria</label>
        <input id="cpsc-categoria-nome" type="text" placeholder="Digite o nome da Categoria" data-cpsc-categoria-field="nome" value="${p}" />
      </div>

      <footer class="classificacao-ps__categoria-editor-footer">
        <button type="button" class="classificacao-ps__categoria-editor-cancel" data-cpsc-categoria-editor-cancel>Cancelar</button>
        <button type="button" class="btn btn--primary" data-cpsc-categoria-editor-save>Salvar</button>
      </footer>
    </section>
  `}function Es(s={}){const o=s.classeEditor||{},t=Array.isArray(s.categorias)?s.categorias:[],c=Array.isArray(s.grupos)?s.grupos:[],r=String(o.categoriaId||""),p=t.find((w={})=>String(w.id||"")===r),d=String(p?.grupoId||""),v=c.find((w={})=>String(w.id||"")===d),i=v?.nome?`Grupo ${v.nome}`:"",m=o.posicao||"",A=o.nome||"",T=o.produtos!==!1?"checked":"",M=o.servicos!==!1?"checked":"";return`
    <section class="classificacao-ps__classe-editor" data-cpsc-classe-editor>
      <header class="classificacao-ps__classe-editor-header">
        <h4>Nova Classe</h4>
        <button type="button" class="classificacao-ps__classe-editor-close" data-cpsc-classe-editor-close aria-label="Fechar">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </header>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-categoria">Categoria</label>
        <select id="cpsc-classe-categoria" data-cpsc-classe-field="categoriaId" ${t.length>0?"":"disabled"}>
          <option value="">Selecione</option>
          ${t.map((w={})=>{const C=String(w.id||"");return`<option value="${C}" ${C===r?"selected":""}>${w.codigo||""} ${w.nome||""}</option>`}).join("")}
        </select>
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-grupo">Grupo</label>
        <input id="cpsc-classe-grupo" type="text" value="${i}" readonly />
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-posicao">Posicao</label>
        <input id="cpsc-classe-posicao" type="text" placeholder="Digite a posicao" data-cpsc-classe-field="posicao" value="${m}" />
      </div>

      <div class="classificacao-ps__classe-editor-field">
        <label for="cpsc-classe-nome">Nome da Classe</label>
        <input id="cpsc-classe-nome" type="text" placeholder="Digite o nome da Categoria" data-cpsc-classe-field="nome" value="${A}" />
      </div>

      <div class="classificacao-ps__classe-editor-checks">
        <label class="classificacao-ps__classe-editor-check">
          <input type="checkbox" data-cpsc-classe-field="produtos" ${T} />
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
  `}function me(s=[],o="",t=""){return!Array.isArray(s)||s.length===0?'<p class="classificacao-ps__empty">Nenhum item encontrado.</p>':`
    <ul class="classificacao-ps__list" role="list">
      ${s.map((c={})=>{const r=String(c.id||"");return`
          <li>
            <button
              type="button"
              class="classificacao-ps__row ${r&&r===String(o||"")?"is-selected":""}"
              data-cpsc-select="${t}"
              data-cpsc-id="${r}"
            >
              <span class="classificacao-ps__row-left" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                ${t==="classe"?`<span class="classificacao-ps__row-file" data-cpsc-classe-produtos="${r}">${vs("file",{size:12})}</span>`:'<svg viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>'}
              </span>
              <span class="classificacao-ps__row-label">
                <span class="classificacao-ps__row-code">${c.codigo||"-"}</span>
                <span class="classificacao-ps__row-name">${c.nome||"-"}</span>
              </span>
              <span class="classificacao-ps__row-right" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.4" stroke="currentColor" stroke-width="1.2"/></svg>
                ${t==="grupo"?`<span class="classificacao-ps__row-kebab" data-cpsc-grupo-edit="${r}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`:t==="categoria"?`<span class="classificacao-ps__row-kebab" data-cpsc-categoria-edit="${r}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`:t==="classe"?`<span class="classificacao-ps__row-kebab" data-cpsc-classe-edit="${r}">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>
                  </span>`:'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.6" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="12.4" r="1.1" fill="currentColor"/></svg>'}
              </span>
            </button>
          </li>
        `}).join("")}
    </ul>
  `}function As(s={}){const o=!!s.isSaving,t=s.search||"",c=Is(s),r=ve(Array.isArray(s.grupos)?s.grupos:[],c),p=String(s.selectedGrupoId||""),v=(Array.isArray(s.categorias)?s.categorias:[]).filter((b={})=>String(b.grupoId||"")===p),i=ve(v,c),m=String(s.selectedCategoriaId||""),T=(Array.isArray(s.classes)?s.classes:[]).filter((b={})=>String(b.categoriaId||"")===m),M=ve(T,c),Z=(s.grupoView||"list")==="editor",w=(s.categoriaView||"list")==="editor",C=(s.classeView||"list")==="editor";return`
    <section class="classificacao-ps">
      <header class="classificacao-ps__header">
        <h2 class="classificacao-ps__title">Classificação de Produtos e Serviços</h2>
        <div class="classificacao-ps__actions">
          <button type="button" class="btn btn--outline-dark" data-cpsc-cancel ${o?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${o?"btn--loading":""}" data-cpsc-save ${o?"disabled":""}>Salvar cadastro</button>
        </div>
      </header>

      <section class="classificacao-ps__card">
        <div class="classificacao-ps__search-wrap">
          <label class="classificacao-ps__search">
            <input
              type="text"
              class="classificacao-ps__search-input"
              placeholder="Buscar na estrutura..."
              value="${t}"
              data-cpsc-search
              ${o?"disabled":""}
            />
            <span class="classificacao-ps__search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
                <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </span>
          </label>
          <button type="button" class="classificacao-ps__search-action" data-cpsc-search-menu aria-label="Ações da busca" ${o?"disabled":""}>
            <svg viewBox="0 0 16 16" fill="none"><path d="M3 3.5H13M3 8H13M3 12.5H13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </button>
        </div>

        <div class="classificacao-ps__columns">
          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Grupo</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="grupo" ${o?"disabled":""}>Novo +</button>
            </header>
            ${Z?$s(s):me(r,p,"grupo")}
          </section>

          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Categoria</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="categoria" ${o?"disabled":""}>Novo +</button>
            </header>
            ${w?ks(s):me(i,m,"categoria")}
          </section>

          <section class="classificacao-ps__column">
            <header class="classificacao-ps__column-header">
              <h3>Classe</h3>
              <button type="button" class="classificacao-ps__new" data-cpsc-new="classe" ${o?"disabled":""}>Novo +</button>
            </header>
            ${C?Es(s):me(M,s.selectedClasseId||"","classe")}
          </section>
        </div>

        <footer class="classificacao-ps__footer">
          <button type="button" class="btn btn--outline-dark" data-cpsc-cancel ${o?"disabled":""}>Cancelar</button>
          <button type="button" class="btn btn--primary ${o?"btn--loading":""}" data-cpsc-save ${o?"disabled":""}>Salvar cadastro</button>
        </footer>
      </section>
    </section>
  `}const K="grupo-empresa-drawer";function te(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _e(){const s=Date.now()%9e4;return String(s+1e4)}function xs(s=[]){return Array.isArray(s)?s.map((o={},t)=>({id:String(o.id??`cad-${t+1}`),nome:String(o.nome??""),documento:o.documento?String(o.documento):"",tipo:o.tipo==="PJ"?"PJ":"PF",href:o.href?String(o.href):""})):[]}function Qe(s=[],o=""){const t=String(o||"").trim().toLowerCase();return t?s.filter((c={})=>{const r=String(c.nome||"").toLowerCase(),p=String(c.documento||"").toLowerCase();return r.includes(t)||p.includes(t)}):s}function Ls(s){return s==="PJ"?"Pessoa Jurídica":"Pessoa Física"}function Ts(s={},o=!1,t=!1){const c=te(s.id||""),r=ye({id:`grupo-empresa-cadastro-${c}`,size:"sm",checked:!!o,disabled:!!t,className:"grupo-empresa-drawer__item-checkbox"}),p=s.tipo==="PJ"?'<svg viewBox="0 0 16 16" fill="none"><path d="M3 13.5V4.5H13V13.5M6 4.5V2.5H10V4.5M6 7H10M6 9.5H10M6 12H10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>':'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.2" stroke="currentColor" stroke-width="1.2"/><path d="M3.5 13.5C4 10.9 5.6 9.5 8 9.5C10.4 9.5 12 10.9 12.5 13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';return`
    <li class="grupo-empresa-drawer__item">
      <div class="grupo-empresa-drawer__item-left">
        ${r}
        <span class="grupo-empresa-drawer__item-avatar grupo-empresa-drawer__item-avatar--${s.tipo==="PJ"?"pj":"pf"}" aria-hidden="true">${p}</span>
        <div class="grupo-empresa-drawer__item-texts">
          <p class="grupo-empresa-drawer__item-name">${te(s.nome||"-")}</p>
          <p class="grupo-empresa-drawer__item-meta">
            ${te(s.documento||"-")} • ${te(Ls(s.tipo))}
          </p>
        </div>
      </div>
      <button
        type="button"
        class="grupo-empresa-drawer__item-link"
        data-ge-action="view-cadastro"
        data-ge-cadastro-id="${c}"
      >
        Ver cadastro
      </button>
    </li>
  `}function Ps(s={}){const t=(s.mode||"create")==="view",c=Qe(s.linkedCadastros,s.search),r=Array.isArray(s.linkedCadastros)?s.linkedCadastros.length:0,p=s.selectedIds instanceof Set?s.selectedIds.size:0,d=c.length>0&&c.every(M=>s.selectedIds instanceof Set&&s.selectedIds.has(M.id)),v=be({id:"grupo-empresa-codigo",label:"Código",required:!0,value:s.form?.codigo||"",disabled:!0,readonly:!0}),i=be({id:"grupo-empresa-nome",label:"Nome do Grupo",required:!0,placeholder:"Digite o nome do grupo",value:s.form?.nome||"",disabled:t||s.saving,readonly:t}),m=be({id:"grupo-empresa-descricao",label:"Descrição",optional:!0,placeholder:"Adicione uma descrição",value:s.form?.descricao||"",disabled:t||s.saving,readonly:t}),A=we({id:"grupo-empresa-search-cadastros",placeholder:"Buscar por nome ou documento...",value:s.search||"",disabled:s.loading||s.saving}),T=ye({id:"grupo-empresa-select-all",size:"sm",checked:d,disabled:t||s.loading||s.saving||c.length===0,label:`Selecionar todos (${p}/${r})`,className:"grupo-empresa-drawer__select-all"});return`
    <div class="grupo-empresa-drawer" data-ge-drawer-root>
      <div class="grupo-empresa-drawer__form">
        ${v}
        ${i}
        ${m}
      </div>

      <section class="grupo-empresa-drawer__section">
        <h3 class="grupo-empresa-drawer__section-title">Vincular Cadastros</h3>
        ${A}
        <div class="grupo-empresa-drawer__select-all-row">${T}</div>

        <ul class="grupo-empresa-drawer__list" data-ge-cadastros-list>
          ${c.length>0?c.map(M=>Ts(M,s.selectedIds instanceof Set&&s.selectedIds.has(M.id),t||s.loading||s.saving)).join(""):'<li class="grupo-empresa-drawer__empty">Nenhum cadastro encontrado.</li>'}
        </ul>
      </section>

      ${s.error?`<p class="grupo-empresa-drawer__error">${te(s.error)}</p>`:""}
    </div>
  `}function Bs(s={}){const o=s.mode||"create",c=o==="view"||s.saving||s.loading;return`
    <div class="grupo-empresa-drawer__footer">
      <div class="grupo-empresa-drawer__footer-left">
        ${o==="create"?'<button type="button" class="btn btn--primary" data-ge-action="create-new-group">Criar Novo Grupo</button>':""}
      </div>
      <div class="grupo-empresa-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-ge-action="cancel" ${s.saving?"disabled":""}>Cancelar</button>
        <button type="button" class="btn btn--primary ${s.saving?"btn--loading":""}" data-ge-action="save" ${c?"disabled":""}>Salvar</button>
      </div>
    </div>
  `}function Ms(s={}){const o={onClose:typeof s.onClose=="function"?s.onClose:null,onSaved:typeof s.onSaved=="function"?s.onSaved:null,onSearchCadastros:typeof s.onSearchCadastros=="function"?s.onSearchCadastros:null,onOpenCadastro:typeof s.onOpenCadastro=="function"?s.onOpenCadastro:null,onCreateNewGroup:typeof s.onCreateNewGroup=="function"?s.onCreateNewGroup:null};document.querySelector(`[data-drawer="${K}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${K}"]`)?.remove();const t=Ce({id:K,title:"Grupo de Empresa",width:470,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",t);const c=he({id:K,root:document,onClose:()=>{i.open=!1,i.search="",i.selectedIds=new Set,i.error="",o.onClose&&o.onClose()}}),r=document.querySelector(`[data-drawer="${K}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};const p=r.querySelector(".drawer__header"),d=p?.querySelector(".drawer__title");p&&d&&!p.querySelector(".grupo-empresa-drawer__subtitle")&&(p.classList.add("grupo-empresa-drawer__header"),d.insertAdjacentHTML("afterend",'<p class="grupo-empresa-drawer__subtitle">Preencha os dados e vincule pessoas ou empresas ao grupo</p>'));let v=()=>{},i={open:!1,mode:"create",grupoId:null,loading:!1,saving:!1,error:"",search:"",form:{codigo:_e(),nome:"",descricao:""},linkedCadastros:[],selectedIds:new Set};const m=()=>{const b=r.querySelector(".drawer__body"),_=r.querySelector(".drawer__footer");!b||!_||(b.innerHTML=Ps(i),_.innerHTML=Bs(i),v(),v=Se(r)||(()=>{}),Ke(r))},A=b=>{if(!(b.target instanceof Element))return;const _=b.target.closest("input, textarea");if(_ instanceof HTMLInputElement||_ instanceof HTMLTextAreaElement){if(_.id==="grupo-empresa-search-cadastros"){i.search=_.value||"",o.onSearchCadastros&&o.onSearchCadastros(i.search),m();return}if(_.id==="grupo-empresa-nome"){i.form={...i.form||{},nome:_.value||""},i.error="";return}if(_.id==="grupo-empresa-descricao"){i.form={...i.form||{},descricao:_.value||""};return}}},T=b=>{if(!(b.target instanceof Element))return;const _=b.target.closest('input[type="checkbox"]');if(!(_ instanceof HTMLInputElement))return;const k=Qe(i.linkedCadastros,i.search);if(_.id==="grupo-empresa-select-all"){const q=new Set(i.selectedIds||[]);_.checked?k.forEach(l=>q.add(l.id)):k.forEach(l=>q.delete(l.id)),i.selectedIds=q,m();return}if(!_.id.startsWith("grupo-empresa-cadastro-"))return;const P=_.id.replace("grupo-empresa-cadastro-",""),G=new Set(i.selectedIds||[]);_.checked?G.add(P):G.delete(P),i.selectedIds=G,m()},M=async b=>{if(!(b.target instanceof Element))return;const _=b.target.closest("[data-ge-action]");if(!_)return;const k=_.getAttribute("data-ge-action")||"";if(k==="cancel"){c.close();return}if(k==="create-new-group"){o.onCreateNewGroup&&o.onCreateNewGroup(),i.form={codigo:_e(),nome:"",descricao:""},i.selectedIds=new Set,i.error="",m();return}if(k==="view-cadastro"){const P=_.getAttribute("data-ge-cadastro-id")||"",G=(i.linkedCadastros||[]).find(l=>l?.id===P);if(o.onOpenCadastro){o.onOpenCadastro(G||null);return}const q=G?.href;q&&window.open(q,"_blank","noopener,noreferrer");return}if(!(k!=="save"||i.mode==="view"||i.saving)){if(!i.form?.nome?.trim()){i.error="Informe o nome do grupo.",m();return}i.saving=!0,i.error="",m();try{const P={id:i.grupoId||null,codigo:i.form?.codigo||"",nome:i.form?.nome||"",descricao:i.form?.descricao||"",linkedCadastros:Array.from(i.selectedIds||[]),mode:i.mode};o.onSaved&&await o.onSaved(P),i.saving=!1,c.close()}catch{i.saving=!1,i.error="Não foi possível salvar o grupo. Tente novamente.",m()}}};return r.addEventListener("input",A),r.addEventListener("change",T),r.addEventListener("click",M),m(),{open:(b={})=>{const _=b.mode==="view"||b.mode==="edit"?b.mode:"create",k=b.initialData||{},P=xs(b.linkedCadastros);i={...i,open:!0,mode:_,grupoId:b.grupoId??null,loading:!!b.loading,saving:!!b.saving,error:b.error?String(b.error):"",search:"",form:{codigo:k.codigo?String(k.codigo):_==="create"?_e():"",nome:k.nome?String(k.nome):"",descricao:k.descricao?String(k.descricao):""},linkedCadastros:P,selectedIds:new Set(Array.isArray(b.selectedCadastroIds)?b.selectedCadastroIds:[])},m(),c.open(b.triggerEl||null)},close:()=>c.close(),cleanup:()=>{v(),r.removeEventListener("input",A),r.removeEventListener("change",T),r.removeEventListener("click",M),c.cleanup(),document.querySelector(`[data-drawer="${K}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${K}"]`)?.remove()}}}const Q="classe-produtos-drawer";function z(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Os(s=[]){return Array.isArray(s)?s.map((o={},t)=>({id:String(o.id??`classe-produto-${t+1}`),codigo:String(o.codigo??""),tipo:String(o.tipo??""),descricao:String(o.descricao??""),unidade:String(o.unidade??"")})):[]}function Hs(s=[],o=""){const t=String(o||"").trim().toLowerCase();return t?s.filter((c={})=>{const r=String(c.codigo||"").toLowerCase(),p=String(c.tipo||"").toLowerCase(),d=String(c.descricao||"").toLowerCase(),v=String(c.unidade||"").toLowerCase();return r.includes(t)||p.includes(t)||d.includes(t)||v.includes(t)}):s}function Ds(s={},o=new Set,t=!1){const c=z(s.id||""),r=o instanceof Set&&o.has(s.id);return`
    <tr>
      <td class="classe-produtos-drawer__cell-check">${ye({id:`classe-produtos-item-${c}`,size:"sm",checked:!!r,disabled:!!t})}</td>
      <td>${z(s.codigo||"-")}</td>
      <td>${z(s.tipo||"-")}</td>
      <td>${z(s.descricao||"-")}</td>
      <td>${z(s.unidade||"-")}</td>
    </tr>
  `}function Gs(s={}){const o=Hs(s.items,s.search),t=!!(s.loading||s.saving),c=(s.items||[]).find((m={})=>s.selectedIds instanceof Set&&s.selectedIds.has(m.id)),r=s.selectedIds instanceof Set&&s.selectedIds.size>0,p=Array.isArray(s.classOptions)?s.classOptions:[],d=s.view==="change-class",v=t||d,i=we({id:"classe-produtos-search",placeholder:"Buscar Produto/Serviço",value:s.search||"",disabled:v});return`
    <div class="classe-produtos-drawer">
      <div class="classe-produtos-drawer__search ${v?"is-inactive":""}">${i}</div>

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
            ${o.length>0?o.map((m={})=>Ds(m,s.selectedIds,v)).join(""):'<tr><td colspan="5" class="classe-produtos-drawer__empty">Nenhum item encontrado.</td></tr>'}
          </tbody>
        </table>
      </div>

      ${d?`
      <section class="classe-produtos-drawer__change-class">
        <header class="classe-produtos-drawer__change-class-header">Alterar Classe</header>
        <div class="classe-produtos-drawer__change-class-field">
          <label for="classe-produtos-change-target">Selecionar</label>
          <select id="classe-produtos-change-target" data-cpd-field="changeClassTargetId" ${t?"disabled":""}>
            <option value="">Selecione</option>
            ${p.map((m={})=>{const A=String(m.id||""),T=A===String(s.changeClassTargetId||"")?"selected":"";return`<option value="${z(A)}" ${T}>${z(m.nome||"-")}</option>`}).join("")}
          </select>
        </div>
        <footer class="classe-produtos-drawer__change-class-actions">
          <button type="button" class="classe-produtos-drawer__change-class-cancel" data-cpd-action="cancel-change-class">Cancelar</button>
          <button type="button" class="btn btn--primary" data-cpd-action="save-change-class" ${t||!s.changeClassTargetId?"disabled":""}>Salvar</button>
        </footer>
      </section>
      `:`
      <div class="classe-produtos-drawer__selected">
        <div class="classe-produtos-drawer__selected-info">
          <span class="classe-produtos-drawer__selected-label">Selecionado:</span>
          <strong class="classe-produtos-drawer__selected-value">${z(c?.descricao||"-")}</strong>
        </div>
        <button type="button" class="btn btn--outline-dark" data-cpd-action="change-class" ${!r||t?"disabled":""}>Alterar classe</button>
      </div>
      `}

      ${s.error?`<p class="classe-produtos-drawer__error">${z(s.error)}</p>`:""}
    </div>
  `}function Ns(s={}){if(s.view==="change-class")return"";const o=!!(s.loading||s.saving);return`
    <div class="classe-produtos-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-cpd-action="access-cadastro" ${o?"disabled":""}>Acessar cadastro</button>
      <div class="classe-produtos-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-cpd-action="cancel" ${o?"disabled":""}>Cancelar</button>
        <button type="button" class="btn btn--primary ${s.saving?"btn--loading":""}" data-cpd-action="confirm" ${o?"disabled":""}>Selecionar</button>
      </div>
    </div>
  `}function qs(s={}){const o={onClose:typeof s.onClose=="function"?s.onClose:null,onConfirm:typeof s.onConfirm=="function"?s.onConfirm:null,onAccessCadastro:typeof s.onAccessCadastro=="function"?s.onAccessCadastro:null,onChangeClass:typeof s.onChangeClass=="function"?s.onChangeClass:null};document.querySelector(`[data-drawer="${Q}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${Q}"]`)?.remove();const t=Ce({id:Q,title:"Classe",width:430,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",t);const c=he({id:Q,root:document,onClose:()=>{d.open=!1,d.search="",d.selectedIds=new Set,o.onClose&&o.onClose()}}),r=document.querySelector(`[data-drawer="${Q}"]`);if(!r)return{open:()=>{},close:()=>{},cleanup:()=>{}};let p=()=>{},d={open:!1,classeId:null,classeNome:"",loading:!1,saving:!1,error:"",search:"",items:[],selectedIds:new Set,classOptions:[],view:"list",changeClassTargetId:""};const v=()=>{const C=r.querySelector(".drawer__title"),b=r.querySelector(".drawer__body"),_=r.querySelector(".drawer__footer");!C||!b||!_||(C.textContent=d.classeNome||"Classe",b.innerHTML=Gs(d),_.innerHTML=Ns(d),_.style.display=d.view==="change-class"?"none":"",p(),p=Se(r)||(()=>{}),Ke(r))},i=C=>{const b=new Set(d.selectedIds||[]);b.has(C)?b.delete(C):b.add(C),d.selectedIds=b},m=C=>{if(!(C.target instanceof Element))return;const b=C.target.closest("#classe-produtos-search");b instanceof HTMLInputElement&&(d.search=b.value||"",v())},A=C=>{if(!(C.target instanceof Element))return;const b=C.target.closest('[data-cpd-field="changeClassTargetId"]');if(b instanceof HTMLSelectElement){d.changeClassTargetId=b.value||"",v();return}const _=C.target.closest('input[type="checkbox"]');if(!(_ instanceof HTMLInputElement)||!_.id.startsWith("classe-produtos-item-"))return;const k=_.id.replace("classe-produtos-item-","");i(k),v()},T=C=>{if(!(C.target instanceof Element))return;const b=C.target.closest("[data-cpd-action]");if(!b)return;const _=b.getAttribute("data-cpd-action")||"";if(_==="cancel"){c.close();return}if(_==="access-cadastro"){const k=(d.items||[]).find((P={})=>d.selectedIds instanceof Set&&d.selectedIds.has(P.id))||null;o.onAccessCadastro&&o.onAccessCadastro(k);return}if(_==="change-class"){d.view="change-class",d.changeClassTargetId="",d.error="",v();return}if(_==="cancel-change-class"){d.view="list",d.changeClassTargetId="",d.error="",v();return}if(_==="save-change-class"){if(!d.changeClassTargetId)return;o.onChangeClass&&o.onChangeClass({classeId:d.classeId||null,selectedIds:Array.from(d.selectedIds||[]),targetClasseId:d.changeClassTargetId}),d.view="list",d.changeClassTargetId="",d.error="",v();return}_==="confirm"&&(o.onConfirm&&o.onConfirm(Array.from(d.selectedIds||[]),d.classeId||null),c.close())};return r.addEventListener("input",m),r.addEventListener("change",A),r.addEventListener("click",T),v(),{open:(C={})=>{d={...d,open:!0,classeId:C.classeId??null,classeNome:String(C.classeNome||""),loading:!!C.loading,saving:!!C.saving,error:C.error?String(C.error):"",search:"",items:Os(C.items),selectedIds:new Set(Array.isArray(C.initialSelectedIds)?C.initialSelectedIds:[]),classOptions:Array.isArray(C.classOptions)?C.classOptions:[],view:"list",changeClassTargetId:""},v(),c.open(C.triggerEl||null)},close:()=>c.close(),cleanup:()=>{p(),r.removeEventListener("input",m),r.removeEventListener("change",A),r.removeEventListener("click",T),c.cleanup(),document.querySelector(`[data-drawer="${Q}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${Q}"]`)?.remove()}}}const X="selecionar-classe-drawer";function N(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Vs(s=[]){return Array.isArray(s)?s.map((o={},t)=>({id:String(o.id??`grupo-${t+1}`),codigo:String(o.codigo??""),nome:String(o.nome??"")})):[]}function Fs(s=[]){return Array.isArray(s)?s.map((o={},t)=>({id:String(o.id??`categoria-${t+1}`),grupoId:String(o.grupoId??""),codigo:String(o.codigo??""),nome:String(o.nome??"")})):[]}function js(s=[]){return Array.isArray(s)?s.map((o={},t)=>({id:String(o.id??`classe-${t+1}`),categoriaId:String(o.categoriaId??""),codigo:String(o.codigo??""),nome:String(o.nome??"")})):[]}function Rs(s=[],o=[],t=[]){const c=Vs(s),r=Fs(o),p=js(t);return c.map(d=>{const v=r.filter(i=>i.grupoId===d.id).map(i=>({...i,classes:p.filter(m=>m.categoriaId===i.id)}));return{...d,categorias:v}})}function zs(s=[],o=""){const t=String(o||"").trim().toLowerCase();return t?s.map(c=>{const r=`${c.codigo} ${c.nome}`.toLowerCase().includes(t),p=(c.categorias||[]).map(d=>{const v=`${d.codigo} ${d.nome}`.toLowerCase().includes(t),i=(d.classes||[]).filter(m=>`${m.codigo} ${m.nome}`.toLowerCase().includes(t));return!v&&i.length===0?null:{...d,classes:i}}).filter(Boolean);return!r&&p.length===0?null:{...c,categorias:r?c.categorias||[]:p}}).filter(Boolean):s}function Zs(){return`
    <span class="selecionar-classe-drawer__row-actions" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.4" stroke="currentColor" stroke-width="1.2"/></svg>
      <svg viewBox="0 0 16 16" fill="none"><path d="M3 1.8H10L13.2 5V14.2H3V1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 1.8V5H13.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
    </span>
  `}function We(s=[],o=""){const t=String(o||"");if(!t)return null;for(let c=0;c<s.length;c+=1){const r=s[c]||{},p=Array.isArray(r.categorias)?r.categorias:[];for(let d=0;d<p.length;d+=1){const v=p[d]||{},i=Array.isArray(v.classes)?v.classes:[];for(let m=0;m<i.length;m+=1){const A=i[m]||{};if(String(A.id||"")===t)return{id:String(A.id||""),codigo:String(A.codigo||""),nome:String(A.nome||""),categoriaId:String(v.id||""),grupoId:String(r.id||"")}}}}return null}function Js(s={}){const o=zs(Array.isArray(s.tree)?s.tree:[],s.search);return!Array.isArray(o)||o.length===0?'<p class="selecionar-classe-drawer__empty">Nenhum item encontrado.</p>':`
    <ul class="selecionar-classe-drawer__tree" role="tree">
      ${o.map((t={})=>{const c=String(t.id||""),r=s.expandedGrupoIds instanceof Set?s.expandedGrupoIds.has(c):!1,p=Array.isArray(t.categorias)?t.categorias:[];return`
          <li class="selecionar-classe-drawer__node">
            <button
              type="button"
              class="selecionar-classe-drawer__row selecionar-classe-drawer__row--grupo"
              data-scd-toggle="grupo"
              data-scd-id="${N(c)}"
            >
              <span class="selecionar-classe-drawer__row-left" aria-hidden="true">
                <svg class="selecionar-classe-drawer__icon-edit" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="selecionar-classe-drawer__icon-chevron ${r?"is-expanded":""}" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="selecionar-classe-drawer__icon-folder" viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              </span>
              <span class="selecionar-classe-drawer__row-label">
                <span class="selecionar-classe-drawer__row-code">${N(t.codigo||"-")}</span>
                <span class="selecionar-classe-drawer__row-name">${N(t.nome||"-")}</span>
              </span>
            </button>

            ${r?`
            <ul class="selecionar-classe-drawer__children">
              ${p.map((d={})=>{const v=String(d.id||""),i=s.expandedCategoriaIds instanceof Set?s.expandedCategoriaIds.has(v):!1,m=Array.isArray(d.classes)?d.classes:[];return`
                  <li class="selecionar-classe-drawer__node">
                    <button
                      type="button"
                      class="selecionar-classe-drawer__row selecionar-classe-drawer__row--categoria"
                      data-scd-toggle="categoria"
                      data-scd-id="${N(v)}"
                    >
                      <span class="selecionar-classe-drawer__row-left" aria-hidden="true">
                        <svg class="selecionar-classe-drawer__icon-edit" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg class="selecionar-classe-drawer__icon-chevron ${i?"is-expanded":""}" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg class="selecionar-classe-drawer__icon-folder" viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                      </span>
                      <span class="selecionar-classe-drawer__row-label">
                        <span class="selecionar-classe-drawer__row-code">${N(d.codigo||"-")}</span>
                        <span class="selecionar-classe-drawer__row-name">${N(d.nome||"-")}</span>
                      </span>
                    </button>

                    ${i?`
                    <ul class="selecionar-classe-drawer__children">
                      ${m.map((A={})=>{const T=String(A.id||"");return`
                          <li class="selecionar-classe-drawer__node">
                            <button
                              type="button"
                              class="selecionar-classe-drawer__row selecionar-classe-drawer__row--classe ${String(s.selectedClassId||"")===T?"is-selected":""}"
                              data-scd-select="classe"
                              data-scd-id="${N(T)}"
                              data-scd-categoria-id="${N(v)}"
                              data-scd-grupo-id="${N(c)}"
                            >
                              <span class="selecionar-classe-drawer__row-label">
                                <span class="selecionar-classe-drawer__row-code">${N(A.codigo||"-")}</span>
                                <span class="selecionar-classe-drawer__row-name">${N(A.nome||"-")}</span>
                              </span>
                              ${s.mode==="cadastro"?`
                                <span class="selecionar-classe-drawer__row-file" aria-hidden="true">
                                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 1.8H10L13.2 5V14.2H3V1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 1.8V5H13.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                                </span>
                              `:Zs()}
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
  `}function Us(s={}){return`
    <div class="selecionar-classe-drawer">
      <div class="selecionar-classe-drawer__search">${we({id:"selecionar-classe-search",placeholder:"Buscar na estrutura...",value:s.search||"",disabled:!!s.loading})}</div>
      <div class="selecionar-classe-drawer__content">
        ${Js(s)}
      </div>
      ${s.mode==="cadastro"?`
        <section class="selecionar-classe-drawer__selected">
          <p class="selecionar-classe-drawer__selected-label">Selecionado:</p>
          <div class="selecionar-classe-drawer__selected-values">
            <span class="selecionar-classe-drawer__selected-code">${N(s.selectedItem?.codigo||"-")}</span>
            <strong class="selecionar-classe-drawer__selected-name">${N(s.selectedItem?.nome||"-")}</strong>
          </div>
        </section>
      `:""}
      ${s.error?`<p class="selecionar-classe-drawer__error">${N(s.error)}</p>`:""}
    </div>
  `}function Ws(s={}){if(s.mode==="cadastro"){const o=!!s.selectedItem?.id;return`
      <div class="selecionar-classe-drawer__footer selecionar-classe-drawer__footer--cadastro">
        <button type="button" class="btn btn--outline-dark" data-scd-action="access-cadastro" ${o?"":"disabled"}>Acessar cadastro</button>
        <div class="selecionar-classe-drawer__footer-right">
          <button type="button" class="btn btn--outline-dark" data-scd-action="cancel">Cancelar</button>
          <button type="button" class="btn btn--primary" data-scd-action="confirm" ${o?"":"disabled"}>Selecionar</button>
        </div>
      </div>
    `}return`
    <div class="selecionar-classe-drawer__footer">
      <button type="button" class="btn btn--primary" data-scd-action="back" ${s.loading?"disabled":""}>Voltar</button>
    </div>
  `}function Ks(s={}){const o={onClose:typeof s.onClose=="function"?s.onClose:null,onSelect:typeof s.onSelect=="function"?s.onSelect:null,onConfirm:typeof s.onConfirm=="function"?s.onConfirm:null,onAccessCadastro:typeof s.onAccessCadastro=="function"?s.onAccessCadastro:null};document.querySelector(`[data-drawer="${X}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${X}"]`)?.remove();const t=Ce({id:X,title:"Selecionar Classe do Produto/Serviço",width:430,content:"",footer:""});document.body.insertAdjacentHTML("beforeend",t);let c={open:!1,mode:"classificacao",loading:!1,error:"",search:"",subtitle:"",tree:[],selectedClassId:"",selectedItem:null,expandedGrupoIds:new Set,expandedCategoriaIds:new Set};const r=he({id:X,root:document,onClose:()=>{c.open=!1,c.search="",o.onClose&&o.onClose()}}),p=document.querySelector(`[data-drawer="${X}"]`);if(!p)return{open:()=>{},close:()=>{},cleanup:()=>{}};let d=()=>{};const v=()=>{if(!c.selectedClassId)return;const w=String(c.selectedClassId),C=Array.isArray(c.tree)?c.tree:[];for(let b=0;b<C.length;b+=1){const _=C[b]||{},k=Array.isArray(_.categorias)?_.categorias:[];for(let P=0;P<k.length;P+=1){const G=k[P]||{};if((Array.isArray(G.classes)?G.classes:[]).some((l={})=>String(l.id||"")===w)){c.expandedGrupoIds.add(String(_.id||"")),c.expandedCategoriaIds.add(String(G.id||""));return}}}},i=()=>{const w=p.querySelector(".drawer__header"),C=p.querySelector(".drawer__title"),b=p.querySelector(".drawer__body"),_=p.querySelector(".drawer__footer");if(!(!b||!_)){if(C&&(C.textContent="Selecionar Classe do Produto/Serviço"),w){const k=w.querySelector(".selecionar-classe-drawer__header-subtitle");c.subtitle?k?k.textContent=c.subtitle:C&&C.insertAdjacentHTML("afterend",`<p class="selecionar-classe-drawer__header-subtitle">${N(c.subtitle)}</p>`):k&&k.remove()}b.innerHTML=Us(c),_.innerHTML=Ws(c),d(),d=Se(p)||(()=>{})}},m=w=>{if(!(w.target instanceof Element))return;const C=w.target.closest("#selecionar-classe-search");C instanceof HTMLInputElement&&(c.search=C.value||"",i())},A=w=>{if(!(w.target instanceof Element))return;if(w.target.closest('[data-scd-action="back"]')){r.close();return}if(w.target.closest('[data-scd-action="cancel"]')){r.close();return}if(w.target.closest('[data-scd-action="access-cadastro"]')){if(!c.selectedItem?.id)return;o.onAccessCadastro&&o.onAccessCadastro(c.selectedItem);return}if(w.target.closest('[data-scd-action="confirm"]')){if(!c.selectedItem?.id)return;o.onConfirm&&o.onConfirm(c.selectedItem),r.close();return}const P=w.target.closest('[data-scd-toggle="grupo"][data-scd-id]');if(P){const l=String(P.getAttribute("data-scd-id")||"");if(!l)return;c.expandedGrupoIds.has(l)?c.expandedGrupoIds.delete(l):c.expandedGrupoIds.add(l),i();return}const G=w.target.closest('[data-scd-toggle="categoria"][data-scd-id]');if(G){const l=String(G.getAttribute("data-scd-id")||"");if(!l)return;c.expandedCategoriaIds.has(l)?c.expandedCategoriaIds.delete(l):c.expandedCategoriaIds.add(l),i();return}const q=w.target.closest('[data-scd-select="classe"][data-scd-id]');if(q){const l=String(q.getAttribute("data-scd-id")||"");if(!l)return;const F=String(q.getAttribute("data-scd-categoria-id")||""),e=String(q.getAttribute("data-scd-grupo-id")||"");c.selectedClassId=l,c.selectedItem=We(c.tree,l)||{id:l,codigo:"",nome:"",categoriaId:F,grupoId:e},c.mode!=="cadastro"&&o.onSelect&&o.onSelect({classeId:l,categoriaId:F,grupoId:e,codigo:c.selectedItem?.codigo||"",nome:c.selectedItem?.nome||""}),i()}};return p.addEventListener("input",m),p.addEventListener("click",A),i(),{open:(w={})=>{const C=Rs(w.groups,w.categorias,w.classes),b=new Set,_=new Set,k=String(w.initialSelectedId||"");!k&&C[0]?.id&&b.add(String(C[0].id));const P=We(C,k);c={...c,open:!0,mode:w.mode==="cadastro"?"cadastro":"classificacao",loading:!!w.loading,error:w.error?String(w.error):"",search:"",subtitle:w.subtitle?String(w.subtitle):"",tree:C,selectedClassId:k,selectedItem:P,expandedGrupoIds:b,expandedCategoriaIds:_},v(),i(),r.open(w.triggerEl||null)},close:()=>r.close(),cleanup:()=>{d(),p.removeEventListener("input",m),p.removeEventListener("click",A),r.cleanup(),document.querySelector(`[data-drawer="${X}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${X}"]`)?.remove()}}}function Qs(){const s=document.getElementById("app-header");s&&s.classList.add("header--kanban-compact-tabs");const o=document.querySelector(".cadastros-page"),t=document.getElementById("cadastros-list-header"),c=document.getElementById("cadastros-list-card"),r=document.getElementById("cadastro-pessoa-empresa-container"),p=document.querySelector(".cadastros-filters"),d=document.querySelector(".cadastros-table-card"),v=document.getElementById("cadastros-search-input"),i=document.querySelector(".cadastros-table"),m=i?.querySelector("thead"),A=i?.querySelector("tbody"),T=document.getElementById("cadastros-advanced-filters-btn"),M=document.getElementById("cadastros-badges"),Z=d?.querySelector(".cadastros-table-wrap"),w=v?.getAttribute("placeholder")||"",C=m?.innerHTML||"",b=A?.innerHTML||"",_=p?.parentElement||null,k=p?.nextElementSibling||null,P=(window.location.hash||"").replace("#",""),G=P.startsWith("/cadastros/produtos-servicos"),q=P.startsWith("/cadastros/produtos-servicos/classificacao");let l=G?"produtos-servicos":"pessoas-empresas",F=null,e={isOpen:!1,activeSubTab:"pessoas-empresas",tipo:"pessoas",isAtivo:!0,isComplementaresOpen:!0,isSaving:!1,saveError:"",ramoChips:["Badge"],activeProdutosSubTab:q?"classificacao":"produtos-servicos",isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!1,produtosCadastro:{isAtivo:!0,isSaving:!1,saveError:"",tipo:"produto",isCadastroComplementaresOpen:!0,isClasseComplementaresOpen:!0,marcaChips:["Marca"],fabricanteChips:["Fabricante"],form:{classe:"",descricao:"",unidade:"",fornecedores:"",grupoEquivalencia:"",ncm:"",principioAtivo:"",grupoQuimico:"",modoAcao:"",registroMapa:""}},embalagensCadastro:{isAtivo:!0,isSaving:!1,saveError:"",unidadeEquivalenciaOptions:[{value:"L",label:"Litro (L)"},{value:"KG",label:"Quilograma (Kg)"},{value:"UN",label:"Unidade (UN)"}],form:{unidadeEquivalencia:"",valorConversao:"",descricao:"",sigla:""}},produtosClassificacao:{isSaving:!1,search:"",grupoView:"list",grupoEditor:{id:null,posicao:"",nome:""},categoriaView:"list",categoriaEditor:{id:null,grupoId:"03",posicao:"",nome:""},classeView:"list",classeEditor:{id:null,categoriaId:"03.01",posicao:"",nome:"",produtos:!0,servicos:!0},selectedGrupoId:"03",selectedCategoriaId:"03.01",selectedClasseId:"03.01.01",grupos:[{id:"01",codigo:"01",nome:"Insumos Agricolas"},{id:"02",codigo:"02",nome:"Ferramentas"},{id:"03",codigo:"03",nome:"Equipamentos"},{id:"04",codigo:"04",nome:"Maquinario"}],categorias:[{id:"03.01",grupoId:"03",codigo:"03.01",nome:"Irrigacao"},{id:"03.02",grupoId:"03",codigo:"03.02",nome:"Pulverizacao"}],classes:[{id:"03.01.01",categoriaId:"03.01",codigo:"03.01.01",nome:"Aspersores"},{id:"03.01.02",categoriaId:"03.01",codigo:"03.01.02",nome:"Gotejadores"}],classeProdutosItems:[{id:"ps-1",codigo:"INS-001",tipo:"Servico",descricao:"Inseticida POWER KILL",unidade:"01.01.01 - Inseticida"},{id:"ps-2",codigo:"INS-002",tipo:"Servico",descricao:"Fungicida SAFE CROP",unidade:"01.01.02 - Fungicida"},{id:"ps-3",codigo:"INS-003",tipo:"Produto",descricao:"Herbicida FIELD MAX",unidade:"01.01.03 - Herbicida"},{id:"ps-4",codigo:"INS-004",tipo:"Produto",descricao:"Adjuvante PRO MIX",unidade:"01.01.04 - Adjuvante"}],classeProdutosSelectedByClasse:{}},isGrupoDrawerOpen:!1,isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:!1,grupoDrawerMode:"create",selectedGrupoId:null,grupoEmpresasSearch:"",grupoEmpresasCadastros:[{id:"cad-1",nome:"Maria Santos",documento:"987.654.321-00",tipo:"PF",href:"#/cadastros"},{id:"cad-2",nome:"Tech Solutions Ltda",documento:"12.345.678/0001-90",tipo:"PJ",href:"#/cadastros"},{id:"cad-3",nome:"Comércio ABC SA",documento:"12.345.678/0001-90",tipo:"PJ",href:"#/cadastros"},{id:"cad-4",nome:"Comércio ABC SA",documento:"12.345.678/0001-90",tipo:"PJ",href:"#/cadastros"}],grupoEmpresasRowsAll:[{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"},{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"}],grupoEmpresasRows:[{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"},{codigo:"434323",nome:"Nome do Grupo",descricao:"Descrição da empresa"}],form:{grupo:"",categoria:"",cnpj:"",razaoSocial:"",nomeFantasia:"",inscricaoEstadual:"",inscricaoMunicipal:"",produtorRural:!1,cep:"",logradouro:"",numero:"",complemento:"",bairro:"",cidade:"",uf:"",nomeResponsavel:"",celular:"",telefoneFixo:"",email:"",observacoes:"",setor:""}};function re(){F&&(window.clearTimeout(F),F=null)}const se=Ms({onClose:()=>{e={...e,isGrupoDrawerOpen:!1,selectedGrupoId:null}},onSaved:async(a={})=>{const u=a.id||a.codigo||`grupo-${Date.now()}`,g={codigo:a.codigo||"",nome:a.nome||"",descricao:a.descricao||""},S=Array.isArray(e.grupoEmpresasRowsAll)?e.grupoEmpresasRowsAll:[],y=S.findIndex(E=>String(E?.id||E?.codigo||"")===String(u)),$=[...S];y>=0?$[y]={...$[y]||{},...g}:$.unshift(g),e={...e,grupoEmpresasRowsAll:$,grupoEmpresasRows:$,selectedGrupoId:u,isGrupoDrawerOpen:!1},h()},onOpenCadastro:a=>{a?.href&&window.open(a.href,"_blank","noopener,noreferrer")}}),J=qs({onClose:()=>{e={...e,isClasseProdutosDrawerOpen:!1}},onConfirm:(a=[],u=null)=>{const g=e.produtosClassificacao||{},S={...g.classeProdutosSelectedByClasse||{}},y=String(u||e.produtosClassificacao?.selectedClasseId||"");y&&(S[y]=Array.isArray(a)?a:[]),e={...e,isClasseProdutosDrawerOpen:!1,produtosClassificacao:{...g,classeProdutosSelectedByClasse:S}}},onAccessCadastro:()=>{window.location.hash="/cadastros/produtos-servicos"},onChangeClass:({classeId:a=null,selectedIds:u=[],targetClasseId:g=""}={})=>{const S=e.produtosClassificacao||{},y={...S.classeProdutosSelectedByClasse||{}},$=String(a||""),E=String(g||"");if(!$||!E||$===E)return;const x=Array.isArray(y[$])?y[$]:[],H=Array.isArray(u)?u:[],j=x.filter(ce=>!H.includes(ce)),Y=Array.isArray(y[E])?y[E]:[],ee=Array.from(new Set([...Y,...H]));y[$]=j,y[E]=ee,e={...e,produtosClassificacao:{...S,classeProdutosSelectedByClasse:y}}}}),U=Ks({onClose:()=>{e={...e,isSelecionarClasseDrawerOpen:!1}},onSelect:({classeId:a="",categoriaId:u="",grupoId:g=""}={})=>{const S=e.produtosClassificacao||{};e={...e,produtosClassificacao:{...S,selectedGrupoId:g||S.selectedGrupoId||"",selectedCategoriaId:u||S.selectedCategoriaId||"",selectedClasseId:a||S.selectedClasseId||""}},h()},onConfirm:(a={})=>{const u=String(a.id||""),g=String(a.codigo||""),S=String(a.nome||""),y=[g,S].filter(Boolean).join(" - "),$=e.produtosClassificacao||{};e={...e,isSelecionarClasseDrawerOpen:!1,produtosCadastro:{...e.produtosCadastro||{},form:{...e.produtosCadastro&&e.produtosCadastro.form||{},classe:y||S||"",classeId:u,classeCodigo:g,classeNome:S},saveError:""},produtosClassificacao:{...$,selectedClasseId:u||$.selectedClasseId||""}},h()},onAccessCadastro:(a={})=>{a?.id&&(window.location.hash="/cadastros/produtos-servicos")}});function Xe(){const a=l==="pessoas-empresas"&&e.isOpen||l==="produtos-servicos"&&(e.isProdutosCadastroOpen||e.isEmbalagensCadastroOpen||e.activeProdutosSubTab==="classificacao");t&&(t.hidden=a),c&&(c.hidden=a),o&&o.classList.toggle("cadastros-page--cadastro-open",a);const u=document.getElementById("cadastros-content-header");u&&l==="produtos-servicos"&&(u.hidden=a)}function h(){if(!r)return;const a=l==="pessoas-empresas"&&e.isOpen,u=l==="produtos-servicos"&&e.isProdutosCadastroOpen,g=l==="produtos-servicos"&&e.activeProdutosSubTab==="embalagens"&&e.isEmbalagensCadastroOpen,S=l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao";a?(r.innerHTML=Ss(e),r.hidden=!1):S?(r.innerHTML=As(e.produtosClassificacao||{}),r.hidden=!1):g?(r.innerHTML=ys(e.embalagensCadastro||{}),r.hidden=!1):u?(r.innerHTML=ws(e.produtosCadastro||{}),r.hidden=!1):(r.innerHTML="",r.hidden=!0),Xe(),l==="produtos-servicos"&&Te()}function Ie({mode:a="create",grupoId:u=null,triggerEl:g=null}={}){const y=(Array.isArray(e.grupoEmpresasRowsAll)?e.grupoEmpresasRowsAll:[]).find($=>String($?.id||$?.codigo||"")===String(u||""));e={...e,isGrupoDrawerOpen:!0,grupoDrawerMode:a,selectedGrupoId:u},se.open({mode:a,grupoId:u,triggerEl:g,initialData:{codigo:y?.codigo||"",nome:y?.nome||"",descricao:y?.descricao||""},linkedCadastros:Array.isArray(e.grupoEmpresasCadastros)?e.grupoEmpresasCadastros:[]})}function Ye({classeId:a=null,triggerEl:u=null}={}){e.isSelecionarClasseDrawerOpen&&U.close();const g=e.produtosClassificacao||{},S=Array.isArray(g.classes)?g.classes:[],y=S.find((x={})=>String(x.id||"")===String(a||"")),$=g.classeProdutosSelectedByClasse||{},E=Array.isArray($[String(a||"")])?$[String(a||"")]:[];e={...e,isClasseProdutosDrawerOpen:!0,produtosClassificacao:{...g,selectedClasseId:String(a||g.selectedClasseId||"")}},J.open({classeId:a||null,classeNome:y?.nome||"Classe",triggerEl:u,items:Array.isArray(g.classeProdutosItems)?g.classeProdutosItems:[],initialSelectedIds:E,classOptions:S.map((x={})=>({id:String(x.id||""),nome:String(x.nome||"")}))})}function $e({triggerEl:a=null,mode:u="classificacao"}={}){e.isClasseProdutosDrawerOpen&&J.close();const g=e.produtosClassificacao||{},S=e.produtosCadastro?.form||{},y=u==="cadastro"?S.classeId||g.selectedClasseId||"":g.selectedClasseId||"";e={...e,isSelecionarClasseDrawerOpen:!0},U.open({mode:u,triggerEl:a,subtitle:u==="cadastro"?"Navegue pela estrutura ou use a busca para encontrar a classe do produto":"",initialSelectedId:y,groups:Array.isArray(g.grupos)?g.grupos:[],categorias:Array.isArray(g.categorias)?g.categorias:[],classes:Array.isArray(g.classes)?g.classes:[]})}function es(){e={...e,isOpen:!0,saveError:"",activeSubTab:e.activeSubTab||"pessoas-empresas"},h()}function ss(){e={...e,isProdutosCadastroOpen:!0,isEmbalagensCadastroOpen:!1,produtosCadastro:{...e.produtosCadastro||{},saveError:""}},h()}function ke(){re(),e.isGrupoDrawerOpen&&se.close(),e.isClasseProdutosDrawerOpen&&J.close(),e.isSelecionarClasseDrawerOpen&&U.close(),e={...e,isOpen:!1,isSaving:!1,saveError:"",isGrupoDrawerOpen:!1,isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:!1,isEmbalagensCadastroOpen:!1,selectedGrupoId:null},h()}function as(){e={...e,isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!0,embalagensCadastro:{...e.embalagensCadastro||{},saveError:""}},h()}function Ee(){re(),e.isClasseProdutosDrawerOpen&&J.close(),e.isSelecionarClasseDrawerOpen&&U.close(),e={...e,isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!1,isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:!1,produtosCadastro:{...e.produtosCadastro||{},isSaving:!1,saveError:""}},h()}function ie(){re(),e={...e,isEmbalagensCadastroOpen:!1,embalagensCadastro:{...e.embalagensCadastro||{},isSaving:!1,saveError:""}},h()}function Ae(){return{ativo:!!e.isAtivo,tipo:e.tipo||"pessoas",ramo:Array.isArray(e.ramoChips)?e.ramoChips:[],...e.form}}function os(){const a=e.form||{};return a.grupo?a.categoria?a.setor?!Array.isArray(e.ramoChips)||e.ramoChips.length===0?"Informe ao menos um Ramo.":"":"Selecione o Setor.":"Selecione a Categoria.":"Selecione o Grupo de Empresas."}async function ts(){if(e.isSaving)return;const a=os();if(a){e={...e,saveError:a},h();return}e={...e,isSaving:!0,saveError:""},h();try{if(await new Promise(u=>{F=window.setTimeout(()=>{F=null,u()},900)}),!e.isOpen)return;console.log("Salvar cadastro pessoa/empresa",Ae()),ke()}catch{e={...e,isSaving:!1,saveError:"Não foi possível salvar o cadastro. Tente novamente."},h();return}e={...e,isSaving:!1},h()}function xe(){const a=e.produtosCadastro||{};return{ativo:!!a.isAtivo,tipo:a.tipo||"produto",...a.form||{},marca:Array.isArray(a.marcaChips)?a.marcaChips:[],fabricante:Array.isArray(a.fabricanteChips)?a.fabricanteChips:[]}}function rs(){const a=e.produtosClassificacao||{};return{selectedGrupoId:a.selectedGrupoId||"",selectedCategoriaId:a.selectedCategoriaId||"",selectedClasseId:a.selectedClasseId||"",search:a.search||""}}function cs(){const a=e.produtosCadastro?.form||{};return a.classe?a.descricao?a.unidade?"":"Informe a unidade.":"Informe a descrição.":"Selecione a classe."}async function is(){const a=e.produtosCadastro||{};if(a.isSaving)return;const u=cs();if(u){e={...e,produtosCadastro:{...a,saveError:u}},h();return}e={...e,produtosCadastro:{...a,isSaving:!0,saveError:""}},h();try{if(await new Promise(g=>{F=window.setTimeout(()=>{F=null,g()},900)}),!e.isProdutosCadastroOpen)return;console.log("Salvar cadastro produto/serviço",xe()),Ee()}catch{e={...e,produtosCadastro:{...e.produtosCadastro||{},isSaving:!1,saveError:"Não foi possível salvar o cadastro. Tente novamente."}},h();return}e={...e,produtosCadastro:{...e.produtosCadastro||{},isSaving:!1}},h()}function Le(){const a=e.embalagensCadastro||{};return{ativo:!!a.isAtivo,...a.form||{}}}function ns(){const a=e.embalagensCadastro?.form||{};return a.unidadeEquivalencia?a.valorConversao?a.descricao?a.sigla?"":"Informe a sigla.":"Informe a descrição.":"Informe o valor de conversão.":"Selecione a unidade de equivalência."}async function ds(){const a=e.embalagensCadastro||{};if(a.isSaving)return;const u=ns();if(u){e={...e,embalagensCadastro:{...a,saveError:u}},h();return}e={...e,embalagensCadastro:{...a,isSaving:!0,saveError:""}},h();try{if(await new Promise(g=>{F=window.setTimeout(()=>{F=null,g()},900)}),!e.isEmbalagensCadastroOpen)return;console.log("Salvar cadastro embalagem",Le()),ie()}catch{e={...e,embalagensCadastro:{...e.embalagensCadastro||{},isSaving:!1,saveError:"Não foi possível salvar o cadastro. Tente novamente."}},h();return}e={...e,embalagensCadastro:{...e.embalagensCadastro||{},isSaving:!1}},h()}function ls(){if(document.getElementById("cadastros-subtabs"))return;const a=t&&o&&t.parentElement===o?t:r&&o&&r.parentElement===o?r:d;a&&a.insertAdjacentHTML("afterend",`
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
      `)}function ps(){!p||!d||!Z||p.parentElement!==d&&d.insertBefore(p,Z)}function us(){!p||!_||(k&&k.parentElement===_?_.insertBefore(p,k):_.appendChild(p))}function ne(){if(!m||!A)return;if((e.activeProdutosSubTab||"produtos-servicos")==="embalagens"){m.innerHTML=`
        <tr>
          <th>Código</th>
          <th>Descrição</th>
          <th>Sigla</th>
          <th>Valor de Conversão</th>
          <th>Unidade de Equivalência</th>
          <th>Ações</th>
        </tr>
      `,A.innerHTML=`
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
      `;return}m.innerHTML=`
      <tr>
        <th>Código</th>
        <th>Classe</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Unidade</th>
        <th>Acoes</th>
      </tr>
    `,A.innerHTML=`
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
    `}function Te(){const a=document.getElementById("cadastros-subtabs");if(!a)return;const u=e.activeProdutosSubTab||"produtos-servicos",g=!!(e.isProdutosCadastroOpen||e.isEmbalagensCadastroOpen);a.querySelectorAll(".cadastros-subtabs__item").forEach(S=>{const y=S.getAttribute("data-subtab")||"",E=y==="complementares"||g&&y!==u;S.toggleAttribute("disabled",E),S.classList.toggle("is-disabled",E),S.setAttribute("aria-disabled",E?"true":"false")})}function de(){const a=document.querySelector("#cadastros-content-header .cadastros-content-title");if(!a)return;const u=e.activeProdutosSubTab||"produtos-servicos";if(u==="embalagens"){a.textContent="Embalagens";return}if(u==="complementares"){a.textContent="Complementares";return}a.textContent="Produtos e Serviços"}function gs(){!m||!A||(m.innerHTML=C,A.innerHTML=b)}function Pe(a){if(!T)return;const u=T.querySelector(".cadastros-filters__dot"),g=T.querySelector("svg");u&&(u.style.display=a?"none":""),g&&(g.style.display=a?"none":"")}function Be(a){l=a==="produtos-servicos"?"produtos-servicos":"pessoas-empresas",l==="produtos-servicos"&&e.activeProdutosSubTab==="complementares"&&(e={...e,activeProdutosSubTab:"produtos-servicos"});const u=l==="produtos-servicos";if(u&&e.isGrupoDrawerOpen&&se.close(),!u&&e.isClasseProdutosDrawerOpen&&J.close(),!u&&e.isSelecionarClasseDrawerOpen&&U.close(),!u&&(e.isProdutosCadastroOpen||e.isEmbalagensCadastroOpen)&&(e={...e,isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:!1}),!o)return;if(u){o.classList.add("cadastros-page--produtos-servicos"),ls();const y=document.getElementById("cadastros-subtabs"),$=document.getElementById("cadastros-content-header");if(y&&(y.hidden=!1),$&&($.hidden=!1),y){const E=e.activeProdutosSubTab||"produtos-servicos";y.querySelectorAll(".cadastros-subtabs__item").forEach(x=>{x.classList.toggle("is-active",x.getAttribute("data-subtab")===E)})}Te(),v&&(v.placeholder="Buscar por: Razão Social, CNPJ, Cidade..."),ps(),de(),Pe(!0),ne(),h();return}o.classList.remove("cadastros-page--produtos-servicos");const g=document.getElementById("cadastros-subtabs"),S=document.getElementById("cadastros-content-header");g&&(g.hidden=!0),S&&(S.hidden=!0),v&&(v.placeholder=w),us(),Pe(!1),gs(),h()}const Me=a=>{const u=a?.detail?.mode;u!=="pessoas-empresas"&&u!=="produtos-servicos"||Be(u)},fs=()=>{if(l==="produtos-servicos"){if(e.activeProdutosSubTab==="produtos-servicos"){ss();return}e.activeProdutosSubTab==="embalagens"&&as();return}es()},Oe=()=>{console.log("Filtros avançados")},He=a=>{if(!(a.target instanceof Element))return;const u=a.target.closest(".cadastros-badge__remove");if(!u||!M)return;const g=u.closest(".cadastros-badge");g&&g.remove()},De=a=>{if(!(a instanceof HTMLInputElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement))return;const u=a.dataset.cpeField;if(!u)return;const S=a instanceof HTMLInputElement&&a.type==="checkbox"?a.checked:a.value;e={...e,form:{...e.form||{},[u]:S},saveError:""}},Ge=a=>{if(!(a instanceof HTMLInputElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement))return;const u=a.dataset.cpsField;u&&(e={...e,produtosCadastro:{...e.produtosCadastro||{},form:{...e.produtosCadastro&&e.produtosCadastro.form||{},[u]:a.value},saveError:""}})},bs=a=>{if(!(a instanceof HTMLInputElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement))return;const u=a.dataset.ceField;u&&(e={...e,embalagensCadastro:{...e.embalagensCadastro||{},form:{...e.embalagensCadastro&&e.embalagensCadastro.form||{},[u]:a.value},saveError:""}})},Ne=async a=>{if(!(a.target instanceof Element))return;if(a.target.closest("#cadastros-new-btn, #cadastros-content-new-btn")){fs();return}const g=a.target.closest(".cadastros-subtabs__item[data-subtab]");if(g&&l==="produtos-servicos"){if(g.disabled)return;const n=g.getAttribute("data-subtab")||"produtos-servicos";if(n==="complementares")return;n!=="classificacao"&&e.isClasseProdutosDrawerOpen&&J.close(),n!=="classificacao"&&e.isSelecionarClasseDrawerOpen&&U.close();const f=e.produtosClassificacao||{};e={...e,activeProdutosSubTab:n,isProdutosCadastroOpen:n==="produtos-servicos"?e.isProdutosCadastroOpen:!1,isEmbalagensCadastroOpen:n==="embalagens"?e.isEmbalagensCadastroOpen:!1,isClasseProdutosDrawerOpen:n==="classificacao"?e.isClasseProdutosDrawerOpen:!1,isSelecionarClasseDrawerOpen:n==="classificacao"?e.isSelecionarClasseDrawerOpen:!1,produtosClassificacao:{...f,grupoView:n==="classificacao"&&f.grupoView||"list",categoriaView:n==="classificacao"&&f.categoriaView||"list",classeView:n==="classificacao"&&f.classeView||"list"}};const I=document.getElementById("cadastros-subtabs");I&&I.querySelectorAll(".cadastros-subtabs__item").forEach(B=>{B.classList.toggle("is-active",B===g)}),de(),ne(),h();return}const S=a.target.closest("[data-cpe-subtab]");if(S&&l==="pessoas-empresas"){const n=S.getAttribute("data-cpe-subtab")||"pessoas-empresas";n!=="grupo-empresas"&&e.isGrupoDrawerOpen&&se.close(),e={...e,activeSubTab:n},h();return}const y=a.target.closest("[data-cpe-tipo]");if(y&&l==="pessoas-empresas"){const n=y.getAttribute("data-cpe-tipo")||"pessoas";e={...e,tipo:n},h();return}if(a.target.closest("[data-cpe-accordion-trigger]")&&l==="pessoas-empresas"){e={...e,isComplementaresOpen:!e.isComplementaresOpen},h();return}const E=a.target.closest("[data-cpe-remove-ramo]");if(E&&l==="pessoas-empresas"){const n=E.getAttribute("data-cpe-remove-ramo");if(!n)return;e={...e,ramoChips:(e.ramoChips||[]).filter(f=>f!==n),saveError:""},h();return}const x=a.target.closest("[data-cpe-create]");if(x&&l==="pessoas-empresas"){const n=x.getAttribute("data-cpe-create")||"registro";if(n==="grupo"&&e.activeSubTab==="grupo-empresas"&&e.isOpen){Ie({mode:"create",grupoId:null,triggerEl:x});return}console.log(`Ação de criação (${n}) ainda não integrada ao backend.`);return}const H=a.target.closest("[data-cpsc-grupo-edit]");if(H&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=H.getAttribute("data-cpsc-grupo-edit")||"",f=e.produtosClassificacao||{},B=(Array.isArray(f.grupos)?f.grupos:[]).find((L={})=>String(L.id||"")===n);e={...e,produtosClassificacao:{...f,grupoView:"editor",grupoEditor:{id:B?.id||null,posicao:B?.codigo||"",nome:B?.nome||""}}},h();return}if(a.target.closest("[data-cpsc-grupo-editor-close], [data-cpsc-grupo-editor-cancel]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){e={...e,produtosClassificacao:{...e.produtosClassificacao||{},grupoView:"list",grupoEditor:{id:null,posicao:"",nome:""}}},h();return}if(a.target.closest("[data-cpsc-grupo-editor-save]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=e.produtosClassificacao||{},f=n.grupoEditor||{},I=String(f.nome||"").trim(),B=String(f.posicao||"").trim();if(!I||!B)return;const L=String(f.id||`grupo-${Date.now()}`),V=[...Array.isArray(n.grupos)?n.grupos:[]],O=V.findIndex((W={})=>String(W.id||"")===L),R={id:L,codigo:B,nome:I};O>=0?V[O]={...V[O]||{},...R}:V.unshift(R),e={...e,produtosClassificacao:{...n,grupos:V,selectedGrupoId:L,grupoView:"list",grupoEditor:{id:null,posicao:"",nome:""}}},h();return}const ee=a.target.closest("[data-cpsc-categoria-edit]");if(ee&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=ee.getAttribute("data-cpsc-categoria-edit")||"",f=e.produtosClassificacao||{},I=Array.isArray(f.categorias)?f.categorias:[],B=Array.isArray(f.grupos)?f.grupos:[],L=I.find((V={})=>String(V.id||"")===n),D=String(f.selectedGrupoId||B[0]?.id||"");e={...e,produtosClassificacao:{...f,categoriaView:"editor",categoriaEditor:{id:L?.id||null,grupoId:String(L?.grupoId||D),posicao:L?.codigo||"",nome:L?.nome||""}}},h();return}if(a.target.closest("[data-cpsc-categoria-editor-close], [data-cpsc-categoria-editor-cancel]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=e.produtosClassificacao||{},f=Array.isArray(n.grupos)?n.grupos:[];e={...e,produtosClassificacao:{...n,categoriaView:"list",categoriaEditor:{id:null,grupoId:String(n.selectedGrupoId||f[0]?.id||""),posicao:"",nome:""}}},h();return}if(a.target.closest("[data-cpsc-categoria-editor-save]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=e.produtosClassificacao||{},f=n.categoriaEditor||{},I=String(f.grupoId||"").trim(),B=String(f.nome||"").trim(),L=String(f.posicao||"").trim();if(!I||!B||!L)return;const D=String(f.id||`${I}-${Date.now()}`),O=[...Array.isArray(n.categorias)?n.categorias:[]],R=O.findIndex((fe={})=>String(fe.id||"")===D),W={id:D,grupoId:I,codigo:L,nome:B};R>=0?O[R]={...O[R]||{},...W}:O.unshift(W);const ge=(Array.isArray(n.classes)?n.classes:[]).find((fe={})=>String(fe.categoriaId||"")===D),oe=Array.isArray(n.grupos)?n.grupos:[];e={...e,produtosClassificacao:{...n,categorias:O,selectedGrupoId:I,selectedCategoriaId:D,selectedClasseId:ge?.id||"",categoriaView:"list",categoriaEditor:{id:null,grupoId:String(I||oe[0]?.id||""),posicao:"",nome:""}}},h();return}const Fe=a.target.closest("[data-cpsc-classe-edit]");if(Fe&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=Fe.getAttribute("data-cpsc-classe-edit")||"",f=e.produtosClassificacao||{},I=Array.isArray(f.classes)?f.classes:[],B=Array.isArray(f.categorias)?f.categorias:[],L=I.find((V={})=>String(V.id||"")===n),D=String(f.selectedCategoriaId||B[0]?.id||"");e={...e,produtosClassificacao:{...f,classeView:"editor",classeEditor:{id:L?.id||null,categoriaId:String(L?.categoriaId||D),posicao:L?.codigo||"",nome:L?.nome||"",produtos:L?.produtos!==!1,servicos:L?.servicos!==!1}}},h();return}if(a.target.closest("[data-cpsc-classe-editor-close], [data-cpsc-classe-editor-cancel]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=e.produtosClassificacao||{},f=Array.isArray(n.categorias)?n.categorias:[];e={...e,produtosClassificacao:{...n,classeView:"list",classeEditor:{id:null,categoriaId:String(n.selectedCategoriaId||f[0]?.id||""),posicao:"",nome:"",produtos:!0,servicos:!0}}},h();return}if(a.target.closest("[data-cpsc-classe-editor-save]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=e.produtosClassificacao||{},f=n.classeEditor||{},I=String(f.categoriaId||"").trim(),B=String(f.nome||"").trim(),L=String(f.posicao||"").trim();if(!I||!B||!L)return;const D=String(f.id||`${I}-${Date.now()}`),O=[...Array.isArray(n.classes)?n.classes:[]],R=O.findIndex((oe={})=>String(oe.id||"")===D),W={id:D,categoriaId:I,codigo:L,nome:B,produtos:f.produtos!==!1,servicos:f.servicos!==!1};R>=0?O[R]={...O[R]||{},...W}:O.unshift(W);const ue=Array.isArray(n.categorias)?n.categorias:[],ge=ue.find((oe={})=>String(oe.id||"")===I);e={...e,produtosClassificacao:{...n,classes:O,selectedGrupoId:ge?.grupoId||n.selectedGrupoId||"",selectedCategoriaId:I,selectedClasseId:D,classeView:"list",classeEditor:{id:null,categoriaId:String(I||ue[0]?.id||""),posicao:"",nome:"",produtos:!0,servicos:!0}}},h();return}const le=a.target.closest("[data-cpsc-classe-produtos]");if(le&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){a.preventDefault();const n=le.getAttribute("data-cpsc-classe-produtos")||"";Ye({classeId:n,triggerEl:le});return}const je=a.target.closest("[data-cpsc-search-menu]");if(je&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){a.preventDefault(),$e({triggerEl:je});return}const pe=a.target.closest("[data-cpsc-select][data-cpsc-id]");if(pe&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=pe.getAttribute("data-cpsc-select")||"",f=pe.getAttribute("data-cpsc-id")||"",I=e.produtosClassificacao||{};if(n==="grupo"){const L=(Array.isArray(I.categorias)?I.categorias:[]).find((O={})=>String(O.grupoId||"")===f),V=(Array.isArray(I.classes)?I.classes:[]).find((O={})=>String(O.categoriaId||"")===String(L?.id||""));e={...e,produtosClassificacao:{...I,selectedGrupoId:f,selectedCategoriaId:L?.id||"",selectedClasseId:V?.id||""}},h();return}if(n==="categoria"){const L=(Array.isArray(I.classes)?I.classes:[]).find((D={})=>String(D.categoriaId||"")===f);e={...e,produtosClassificacao:{...I,selectedCategoriaId:f,selectedClasseId:L?.id||""}},h();return}n==="classe"&&(e={...e,produtosClassificacao:{...I,selectedClasseId:f}},h());return}const Re=a.target.closest("[data-cpsc-new]");if(Re&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const n=Re.getAttribute("data-cpsc-new")||"item";if(n==="grupo"){e={...e,produtosClassificacao:{...e.produtosClassificacao||{},grupoView:"editor",grupoEditor:{id:null,posicao:"",nome:""}}},h();return}if(n==="categoria"){const f=e.produtosClassificacao||{},I=Array.isArray(f.grupos)?f.grupos:[];e={...e,produtosClassificacao:{...f,categoriaView:"editor",categoriaEditor:{id:null,grupoId:String(f.selectedGrupoId||I[0]?.id||""),posicao:"",nome:""}}},h();return}if(n==="classe"){const f=e.produtosClassificacao||{},I=Array.isArray(f.categorias)?f.categorias:[];e={...e,produtosClassificacao:{...f,classeView:"editor",classeEditor:{id:null,categoriaId:String(f.selectedCategoriaId||I[0]?.id||""),posicao:"",nome:"",produtos:!0,servicos:!0}}},h();return}console.log(`Criar novo ${n} ainda nao integrado ao backend.`);return}if(a.target.closest("[data-cpsc-save]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){console.log("Salvar classificacao de produtos/servicos",rs());return}if(a.target.closest("[data-cpsc-cancel]")&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){e.isClasseProdutosDrawerOpen&&J.close(),e.isSelecionarClasseDrawerOpen&&U.close(),e={...e,activeProdutosSubTab:"produtos-servicos"};const n=document.getElementById("cadastros-subtabs");n&&n.querySelectorAll(".cadastros-subtabs__item").forEach(f=>{const I=f.getAttribute("data-subtab")||"";f.classList.toggle("is-active",I==="produtos-servicos")}),de(),ne(),h();return}const ze=a.target.closest("[data-cps-tipo]");if(ze&&l==="produtos-servicos"&&e.isProdutosCadastroOpen){const n=ze.getAttribute("data-cps-tipo")||"produto";e={...e,produtosCadastro:{...e.produtosCadastro||{},tipo:n}},h();return}const Ze=a.target.closest("[data-cps-accordion]");if(Ze&&l==="produtos-servicos"&&e.isProdutosCadastroOpen){const n=Ze.getAttribute("data-cps-accordion");if(!n)return;e={...e,produtosCadastro:{...e.produtosCadastro||{},isCadastroComplementaresOpen:n==="cadastro"?e.produtosCadastro?.isCadastroComplementaresOpen===!1:e.produtosCadastro?.isCadastroComplementaresOpen!==!1,isClasseComplementaresOpen:n==="classe"?e.produtosCadastro?.isClasseComplementaresOpen===!1:e.produtosCadastro?.isClasseComplementaresOpen!==!1}},h();return}if(a.target.closest("[data-cps-copy]")&&l==="produtos-servicos"&&e.isProdutosCadastroOpen){console.log("Copiar cadastro produto/serviço",xe());return}const Je=a.target.closest("[data-cps-select-class]");if(Je&&l==="produtos-servicos"&&e.isProdutosCadastroOpen){$e({triggerEl:Je,mode:"cadastro"});return}if(a.target.closest("[data-cps-save]")&&l==="produtos-servicos"&&e.isProdutosCadastroOpen){await is();return}if(a.target.closest("[data-cps-cancel]")&&l==="produtos-servicos"&&e.isProdutosCadastroOpen){Ee();return}if(a.target.closest("[data-ce-back]")&&l==="produtos-servicos"&&e.isEmbalagensCadastroOpen){ie();return}if(a.target.closest("[data-ce-copy]")&&l==="produtos-servicos"&&e.isEmbalagensCadastroOpen){console.log("Copiar cadastro embalagem",Le());return}if(a.target.closest("[data-ce-save]")&&l==="produtos-servicos"&&e.isEmbalagensCadastroOpen){await ds();return}if(a.target.closest("[data-ce-cancel]")&&l==="produtos-servicos"&&e.isEmbalagensCadastroOpen){ie();return}if(a.target.closest("[data-cpe-copy]")&&l==="pessoas-empresas"){console.log("Copiar cadastro pessoa/empresa",Ae());return}if(a.target.closest("[data-cpe-save]")&&l==="pessoas-empresas"){await ts();return}if(a.target.closest("[data-cpe-cancel]")&&l==="pessoas-empresas"){ke();return}const ae=a.target.closest("[data-action]");if(ae){const n=ae.dataset.action;if(!n)return;const f=ae.closest("tr"),I=ae.getAttribute("data-cpe-grupo-view")||f?.getAttribute("data-grupo-id")||"";if(l==="pessoas-empresas"&&e.isOpen&&e.activeSubTab==="grupo-empresas"&&n==="view"){Ie({mode:"edit",grupoId:I,triggerEl:ae});return}const L=f?.dataset.code||"";console.log(`Ação: ${n}${L?` (${L})`:""}`)}},qe=a=>{if(!(a.target instanceof Element))return;const u=a.target.closest("[data-cpsc-categoria-field]");if(u instanceof HTMLSelectElement&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const $=u.getAttribute("data-cpsc-categoria-field")||"";if(!$)return;const E=e.produtosClassificacao||{},x=E.categoriaEditor||{};e={...e,produtosClassificacao:{...E,categoriaEditor:{...x,[$]:u.value||""}}};return}const g=a.target.closest("[data-cpsc-classe-field]");if((g instanceof HTMLInputElement||g instanceof HTMLSelectElement)&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const $=g.getAttribute("data-cpsc-classe-field")||"";if(!$)return;const E=e.produtosClassificacao||{},x=E.classeEditor||{},H=g instanceof HTMLInputElement&&g.type==="checkbox"?!!g.checked:g.value||"";e={...e,produtosClassificacao:{...E,classeEditor:{...x,[$]:H}}};return}const S=a.target.closest("#cadastro-pessoa-empresa-ativo");if(S instanceof HTMLInputElement){e={...e,isAtivo:!!S.checked,saveError:""};return}const y=a.target.closest("#cadastro-produtos-servicos-ativo");if(y instanceof HTMLInputElement){e={...e,produtosCadastro:{...e.produtosCadastro||{},isAtivo:!!y.checked,saveError:""}};return}Ge(a.target),De(a.target)},Ve=a=>{if(!(a.target instanceof Element))return;const u=a.target.closest("[data-cpe-grupo-search]");if(u instanceof HTMLInputElement&&l==="pessoas-empresas"){const x=(u.value||"").trim().toLowerCase(),H=Array.isArray(e.grupoEmpresasRowsAll)?e.grupoEmpresasRowsAll:[];e={...e,grupoEmpresasSearch:x,grupoEmpresasRows:H.filter((j={})=>{const Y=String(j.codigo||"").toLowerCase(),ee=String(j.nome||"").toLowerCase(),ce=String(j.descricao||"").toLowerCase();return Y.includes(x)||ee.includes(x)||ce.includes(x)})},h();return}const g=a.target.closest("[data-cpsc-search]");if(g instanceof HTMLInputElement&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){e={...e,produtosClassificacao:{...e.produtosClassificacao||{},search:g.value||""}},h();return}const S=a.target.closest("[data-cpsc-grupo-field]");if(S instanceof HTMLInputElement&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const x=S.getAttribute("data-cpsc-grupo-field")||"";if(!x)return;const H=e.produtosClassificacao||{},j=H.grupoEditor||{};e={...e,produtosClassificacao:{...H,grupoEditor:{...j,[x]:S.value||""}}};return}const y=a.target.closest("#cadastro-embalagens-ativo");if(y instanceof HTMLInputElement){e={...e,embalagensCadastro:{...e.embalagensCadastro||{},isAtivo:!!y.checked,saveError:""}};return}const $=a.target.closest("[data-cpsc-categoria-field]");if(($ instanceof HTMLInputElement||$ instanceof HTMLSelectElement)&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const x=$.getAttribute("data-cpsc-categoria-field")||"";if(!x)return;const H=e.produtosClassificacao||{},j=H.categoriaEditor||{};e={...e,produtosClassificacao:{...H,categoriaEditor:{...j,[x]:$.value||""}}};return}const E=a.target.closest("[data-cpsc-classe-field]");if((E instanceof HTMLInputElement||E instanceof HTMLSelectElement)&&l==="produtos-servicos"&&e.activeProdutosSubTab==="classificacao"){const x=E.getAttribute("data-cpsc-classe-field")||"";if(!x)return;const H=e.produtosClassificacao||{},j=H.classeEditor||{},Y=E instanceof HTMLInputElement&&E.type==="checkbox"?!!E.checked:E.value||"";e={...e,produtosClassificacao:{...H,classeEditor:{...j,[x]:Y}}};return}bs(a.target),Ge(a.target),De(a.target)};return window.addEventListener("header:tabchange",Me),T&&T.addEventListener("click",Oe),M&&M.addEventListener("click",He),o&&o.addEventListener("click",Ne),o&&o.addEventListener("change",qe),o&&o.addEventListener("input",Ve),Be(l),()=>{re(),se.cleanup(),J.cleanup(),U.cleanup(),s&&s.classList.remove("header--kanban-compact-tabs"),window.removeEventListener("header:tabchange",Me),T&&T.removeEventListener("click",Oe),M&&M.removeEventListener("click",He),o&&o.removeEventListener("click",Ne),o&&o.removeEventListener("change",qe),o&&o.removeEventListener("input",Ve)}}const va={init:Qs};export{va as default,Qs as init};
