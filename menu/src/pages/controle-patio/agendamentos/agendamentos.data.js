const driverFields = [
  { id: 'vehiclePlate', label: 'Placa do Veiculo', value: '', required: true, suggestions: [] },
  { id: 'driverName', label: 'Nome do Motorista', value: '', required: true, suggestions: [] },
  { id: 'productType', label: 'Tipo de Produto', value: '', required: true },
];

const appointmentDate = {
  id: 'appointmentDate',
  label: 'Data',
  value: '',
  required: true,
};

const pagination = {
  itemsPerPage: 10,
  currentPage: 1,
  totalPages: 1,
  entriesOptions: [10, 20, 30],
};

function createBalesFromCodes(codes = []) {
  return codes.map((code) => ({
    id: String(code),
    label: String(code),
    selected: false,
  }));
}

export function createCargoContract(contract, overrides = {}) {
  const quantificationType = overrides.quantificationType || contract.quantificationType || 'block';
  const blocks = Array.isArray(overrides.blocks) ? overrides.blocks : [];
  const selectedBales = quantificationType === 'kg'
    ? 0
    : blocks.reduce((total, block) => total + (Array.isArray(block.bales) ? block.bales.filter((item) => item.selected).length : 0), 0);

  return {
    id: contract.id,
    code: contract.code,
    subtitle: contract.subtitle,
    quantificationType,
    totals: {
      blocks: blocks.length,
      bales: selectedBales,
    },
    blocks,
    ...overrides,
  };
}

export function createPlumaBlockFromApi(row, fardos = []) {
  const quantidadeMax = Math.max(0, Number(row?.quantidade_fardos || fardos.length || 0));
  return {
    id: String(row?.id ?? ''),
    title: row?.nome_bloco || `Bloco ${row?.ordem ?? ''}`.trim(),
    availableLabel: `Quantidade Disponivel: ${quantidadeMax}`,
    maxLabel: `Qtd (Max ${quantidadeMax}):`,
    quantity: 0,
    max: quantidadeMax,
    selected: false,
    isExpanded: false,
    bales: createBalesFromCodes(fardos.map((item) => item?.codigo_fardo).filter(Boolean)),
  };
}

export function createKgBlockFromApi(row, index) {
  const quantidade = Math.max(0, Number(row?.quantidade || 0));
  const unidade = String(row?.unidade || 'quilogramas');
  return {
    id: String(row?.id ?? `kg-${index}`),
    title: row?.nome_transportadora || `Carga ${index + 1}`,
    availableKgLabel: `${quantidade.toLocaleString('pt-BR')} ${unidade}`,
    quantityLabel: 'Quantidade',
    quantityValue: '',
    quantificationType: 'kg',
    max: quantidade,
    unidade,
  };
}

export function createAgendamentosState() {
  return {
    driverFields: driverFields.map((field) => ({ ...field })),
    appointmentDate: { ...appointmentDate },
    allContracts: [],
    availableContracts: [],
    cargoContracts: [],
    contractDetails: {},
    scheduleRows: [],
    pagination: { ...pagination },
  };
}
