export interface EntityRelation {
  name: string;
  table: string;
  sourceKey: string;
  targetKey: string;
}

export interface EntityConfig {
  resource: string;
  schema: 'app' | 'auth' | 'audit';
  table: string;
  idField: string;
  defaultSort: string;
  searchableFields: string[];
  filterableFields: string[];
  updatableFields: string[];
  creatableFields: string[];
  relations?: EntityRelation[];
  hasSoftDelete?: boolean;
  hasExternal?: boolean;
  auditEnabled?: boolean;
}

export const ENTITY_CONFIGS: EntityConfig[] = [
  {
    resource: 'grupos-empresariais',
    schema: 'app',
    table: 'grupos_empresariais',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome', 'descricao'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'descricao', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'descricao', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'categorias-pessoa-empresa',
    schema: 'app',
    table: 'categorias_pessoa_empresa',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome', 'descricao'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'descricao', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'descricao', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'setores',
    schema: 'app',
    table: 'setores',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome', 'descricao'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'descricao', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'descricao', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'ramos-atividade',
    schema: 'app',
    table: 'ramos_atividade',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'pessoas-empresas',
    schema: 'app',
    table: 'pessoas_empresas',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'cpf_cnpj', 'razao_social', 'nome_fantasia', 'email', 'cidade'],
    filterableFields: [
      'id', 'codigo', 'tipo_cadastro', 'grupo_empresarial_id', 'categoria_id', 'setor_id', 'cpf_cnpj', 'razao_social', 'nome_fantasia',
      'inscricao_estadual', 'inscricao_municipal', 'produtor_rural', 'cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade',
      'uf', 'nome_responsavel', 'celular', 'telefone_fixo', 'email', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'
    ],
    creatableFields: [
      'codigo', 'tipo_cadastro', 'grupo_empresarial_id', 'categoria_id', 'setor_id', 'cpf_cnpj', 'razao_social', 'nome_fantasia',
      'inscricao_estadual', 'inscricao_municipal', 'produtor_rural', 'cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade',
      'uf', 'nome_responsavel', 'celular', 'telefone_fixo', 'email', 'observacoes', 'ativo', 'external_source', 'external_id'
    ],
    updatableFields: [
      'codigo', 'tipo_cadastro', 'grupo_empresarial_id', 'categoria_id', 'setor_id', 'cpf_cnpj', 'razao_social', 'nome_fantasia',
      'inscricao_estadual', 'inscricao_municipal', 'produtor_rural', 'cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade',
      'uf', 'nome_responsavel', 'celular', 'telefone_fixo', 'email', 'observacoes', 'ativo', 'external_source', 'external_id'
    ],
    relations: [{ name: 'ramos', table: 'pessoas_empresas_ramos', sourceKey: 'id', targetKey: 'pessoa_empresa_id' }],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'pessoas-empresas-ramos',
    schema: 'app',
    table: 'pessoas_empresas_ramos',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: [],
    filterableFields: ['id', 'pessoa_empresa_id', 'ramo_id', 'principal', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['pessoa_empresa_id', 'ramo_id', 'principal', 'external_source', 'external_id'],
    updatableFields: ['pessoa_empresa_id', 'ramo_id', 'principal', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'classificacao-grupos',
    schema: 'app',
    table: 'classificacao_grupos',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'classificacao-categorias',
    schema: 'app',
    table: 'classificacao_categorias',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'grupo_id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['grupo_id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['grupo_id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'classificacao-classes',
    schema: 'app',
    table: 'classificacao_classes',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'categoria_id', 'codigo', 'nome', 'permite_produtos', 'permite_servicos', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['categoria_id', 'codigo', 'nome', 'permite_produtos', 'permite_servicos', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['categoria_id', 'codigo', 'nome', 'permite_produtos', 'permite_servicos', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'unidades-medida',
    schema: 'app',
    table: 'unidades_medida',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'sigla', 'descricao'],
    filterableFields: ['id', 'codigo', 'sigla', 'descricao', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'sigla', 'descricao', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'sigla', 'descricao', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'embalagens',
    schema: 'app',
    table: 'embalagens',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'descricao', 'sigla'],
    filterableFields: ['id', 'codigo', 'unidade_equivalencia_id', 'valor_conversao', 'descricao', 'sigla', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'unidade_equivalencia_id', 'valor_conversao', 'descricao', 'sigla', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'unidade_equivalencia_id', 'valor_conversao', 'descricao', 'sigla', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'marcas',
    schema: 'app',
    table: 'marcas',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'fabricantes',
    schema: 'app',
    table: 'fabricantes',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'produtos-servicos',
    schema: 'app',
    table: 'produtos_servicos',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'descricao', 'fornecedores', 'grupo_equivalencia', 'ncm', 'principio_ativo', 'grupo_quimico', 'modo_acao', 'registro_mapa'],
    filterableFields: ['id', 'codigo', 'classe_id', 'tipo_item', 'descricao', 'unidade', 'fornecedores', 'grupo_equivalencia', 'ncm', 'principio_ativo', 'grupo_quimico', 'modo_acao', 'registro_mapa', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'classe_id', 'tipo_item', 'descricao', 'unidade', 'fornecedores', 'grupo_equivalencia', 'ncm', 'principio_ativo', 'grupo_quimico', 'modo_acao', 'registro_mapa', 'dados_complementares', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'classe_id', 'tipo_item', 'descricao', 'unidade', 'fornecedores', 'grupo_equivalencia', 'ncm', 'principio_ativo', 'grupo_quimico', 'modo_acao', 'registro_mapa', 'dados_complementares', 'ativo', 'external_source', 'external_id'],
    relations: [
      { name: 'marcas', table: 'produtos_servicos_marcas', sourceKey: 'id', targetKey: 'produto_servico_id' },
      { name: 'fabricantes', table: 'produtos_servicos_fabricantes', sourceKey: 'id', targetKey: 'produto_servico_id' }
    ],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'produtos-servicos-marcas',
    schema: 'app',
    table: 'produtos_servicos_marcas',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: [],
    filterableFields: ['id', 'produto_servico_id', 'marca_id', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['produto_servico_id', 'marca_id', 'external_source', 'external_id'],
    updatableFields: ['produto_servico_id', 'marca_id', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'produtos-servicos-fabricantes',
    schema: 'app',
    table: 'produtos_servicos_fabricantes',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: [],
    filterableFields: ['id', 'produto_servico_id', 'fabricante_id', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['produto_servico_id', 'fabricante_id', 'external_source', 'external_id'],
    updatableFields: ['produto_servico_id', 'fabricante_id', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'filiais',
    schema: 'app',
    table: 'filiais',
    idField: 'id',
    defaultSort: 'nome',
    searchableFields: ['codigo', 'nome'],
    filterableFields: ['id', 'codigo', 'nome', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    updatableFields: ['codigo', 'nome', 'ativo', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'instrucoes',
    schema: 'app',
    table: 'instrucoes',
    idField: 'id',
    defaultSort: 'created_at',
    searchableFields: ['numero_instrucao', 'numero_contrato', 'nome_vendedor_produtor', 'produtor_documento'],
    filterableFields: [
      'id', 'numero_instrucao', 'data_emissao', 'prazo_final_carregamento', 'comprador_id', 'numero_contrato',
      'produtor_documento', 'produtor_id', 'nome_vendedor_produtor', 'tipo_produto', 'filial_id', 'status',
      'data_agendamento', 'nome_motorista', 'placa_veiculo',
      'quantidade_total', 'ativo', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'
    ],
    creatableFields: [
      'numero_instrucao', 'data_emissao', 'prazo_final_carregamento', 'comprador_id', 'numero_contrato',
      'produtor_documento', 'produtor_id', 'nome_vendedor_produtor', 'tipo_produto', 'filial_id', 'status',
      'data_agendamento', 'nome_motorista', 'placa_veiculo',
      'quantidade_total', 'ativo', 'external_source', 'external_id'
    ],
    updatableFields: [
      'numero_instrucao', 'data_emissao', 'prazo_final_carregamento', 'comprador_id', 'numero_contrato',
      'produtor_documento', 'produtor_id', 'nome_vendedor_produtor', 'tipo_produto', 'filial_id', 'status',
      'data_agendamento', 'nome_motorista', 'placa_veiculo',
      'quantidade_total', 'ativo', 'external_source', 'external_id'
    ],
    relations: [
      { name: 'transportes', table: 'instrucoes_transportes', sourceKey: 'id', targetKey: 'instrucao_id' },
      { name: 'blocos', table: 'instrucoes_blocos', sourceKey: 'id', targetKey: 'instrucao_id' }
    ],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: true
  },
  {
    resource: 'instrucoes-transportes',
    schema: 'app',
    table: 'instrucoes_transportes',
    idField: 'id',
    defaultSort: 'ordem',
    searchableFields: ['nome_transportadora'],
    filterableFields: [
      'id', 'instrucao_id', 'nome_transportadora', 'unidade', 'quantidade', 'ordem',
      'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'
    ],
    creatableFields: ['instrucao_id', 'nome_transportadora', 'unidade', 'quantidade', 'ordem', 'external_source', 'external_id'],
    updatableFields: ['instrucao_id', 'nome_transportadora', 'unidade', 'quantidade', 'ordem', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'instrucoes-blocos',
    schema: 'app',
    table: 'instrucoes_blocos',
    idField: 'id',
    defaultSort: 'ordem',
    searchableFields: ['nome_transportadora', 'nome_bloco'],
    filterableFields: [
      'id', 'instrucao_id', 'nome_transportadora', 'nome_bloco', 'classificacao_bloco', 'modo_inclusao',
      'quantidade_fardos', 'ordem', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'
    ],
    creatableFields: [
      'instrucao_id', 'nome_transportadora', 'nome_bloco', 'classificacao_bloco', 'modo_inclusao',
      'quantidade_fardos', 'ordem', 'external_source', 'external_id'
    ],
    updatableFields: [
      'instrucao_id', 'nome_transportadora', 'nome_bloco', 'classificacao_bloco', 'modo_inclusao',
      'quantidade_fardos', 'ordem', 'external_source', 'external_id'
    ],
    relations: [{ name: 'fardos', table: 'instrucoes_fardos', sourceKey: 'id', targetKey: 'instrucao_bloco_id' }],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'instrucoes-fardos',
    schema: 'app',
    table: 'instrucoes_fardos',
    idField: 'id',
    defaultSort: 'ordem',
    searchableFields: ['codigo_fardo'],
    filterableFields: ['id', 'instrucao_bloco_id', 'codigo_fardo', 'ordem', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['instrucao_bloco_id', 'codigo_fardo', 'ordem', 'external_source', 'external_id'],
    updatableFields: ['instrucao_bloco_id', 'codigo_fardo', 'ordem', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'users',
    schema: 'auth',
    table: 'users',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['email', 'name', 'phone', 'cpf'],
    filterableFields: ['id', 'email', 'phone', 'cpf', 'name', 'is_active', 'last_login_at', 'external_source', 'external_id', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['email', 'phone', 'cpf', 'name', 'is_active', 'external_source', 'external_id'],
    updatableFields: ['email', 'phone', 'cpf', 'name', 'is_active', 'external_source', 'external_id'],
    hasSoftDelete: true,
    hasExternal: true,
    auditEnabled: false
  },
  {
    resource: 'roles',
    schema: 'auth',
    table: 'roles',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome', 'descricao'],
    filterableFields: ['id', 'codigo', 'nome', 'descricao', 'ativo', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'descricao', 'ativo'],
    updatableFields: ['codigo', 'nome', 'descricao', 'ativo'],
    hasSoftDelete: true,
    hasExternal: false,
    auditEnabled: false
  },
  {
    resource: 'permissions',
    schema: 'auth',
    table: 'permissions',
    idField: 'id',
    defaultSort: 'id',
    searchableFields: ['codigo', 'nome', 'descricao'],
    filterableFields: ['id', 'codigo', 'nome', 'descricao', 'created_at', 'updated_at', 'deleted_at'],
    creatableFields: ['codigo', 'nome', 'descricao'],
    updatableFields: ['codigo', 'nome', 'descricao'],
    hasSoftDelete: true,
    hasExternal: false,
    auditEnabled: false
  }
];

export function getEntityConfig(resource: string): EntityConfig | undefined {
  return ENTITY_CONFIGS.find((e) => e.resource === resource);
}
