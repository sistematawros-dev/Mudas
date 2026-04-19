export const patioQuickFilters = [
  { id: 'all', label: 'Todos', value: 'all' },
  { id: 'pluma', label: 'Pluma', value: 'Pluma' },
  { id: 'caroco', label: 'Caroço', value: 'Caroço' },
  { id: 'fibrilha', label: 'Fibrilha', value: 'Fibrilha' },
  { id: 'capulho', label: 'Capulho', value: 'Capulho' },
];

export const patioModalIds = {
  finishLoading: 'patio-finish-loading-modal',
  postpone: 'patio-postpone-modal',
};

export const patioDrawerIds = {
  vehicleEntry: 'patio-vehicle-entry-drawer',
  entryManual: 'patio-entry-manual-drawer',
};

export const patioVehicleGroupOptions = [
  { value: 'proprio', label: 'Próprio' },
  { value: 'terceiro', label: 'Terceiro' },
];

export const patioVehicleLinkLookups = {
  transportadoras: [],
  motoristas: [],
};

export function createPatioVehicleForm() {
  return {
    grupo: '',
    descricao: '',
    placa: '',
    marca: '',
    modelo: '',
    cargaMaxima: '',
    vinculoTipo: 'transportadoras',
    vinculoIds: [],
    documentoFiles: [],
  };
}

export function createPatioEntryForm() {
  return {
    instrucao: '',
    comprador: '',
    produtor: '',
    contrato: '',
    produto: '',
    transportadora: '',
    caminhao: '',
    motorista: '',
  };
}

export function createPatioVehicleRecord(data = {}) {
  return {
    id: String(data.id || ''),
    grupo: String(data.grupo || ''),
    descricao: String(data.descricao || ''),
    placa: String(data.placa || '').toUpperCase(),
    marca: String(data.marca || ''),
    modelo: String(data.modelo || ''),
    cargaMaxima: String(data.cargaMaxima || ''),
    vinculoTipo: data.vinculoTipo === 'motoristas' ? 'motoristas' : 'transportadoras',
    vinculoIds: Array.isArray(data.vinculoIds) ? data.vinculoIds.map((item) => String(item)) : [],
    documentoFiles: Array.isArray(data.documentoFiles)
      ? data.documentoFiles.map((item = {}, index) => ({
        id: String(item.id || `doc-${Date.now()}-${index + 1}`),
        name: String(item.name || 'Documento do caminhão'),
        size: Number(item.size || 0),
      }))
      : [],
  };
}

export function createPatioVehicleList() {
  return [];
}

export const patioColumns = [
  {
    id: 'future',
    title: 'Aguardando (Futuro)',
    tone: 'future',
    toggleControlled: true,
    items: [],
  },
  {
    id: 'waiting',
    title: 'Aguardando Chegada',
    items: [],
  },
  {
    id: 'queue',
    title: 'Fila de Pátio',
    items: [],
  },
  {
    id: 'loading',
    title: 'Carregando',
    items: [],
  },
  {
    id: 'finished',
    title: 'Finalizados',
    items: [],
  },
];

export function createPatioState() {
  return {
    activeProductFilter: 'all',
    showFutureAppointments: false,
    modal: {
      selectedCardId: null,
      data: null,
    },
    vehicleDrawer: {
      isOpen: false,
      form: createPatioVehicleForm(),
      groupOptions: patioVehicleGroupOptions,
      lookups: patioVehicleLinkLookups,
    },
    entryDrawer: {
      isOpen: false,
      form: createPatioEntryForm(),
      lookups: {
        instrucoes: [],
        compradores: [],
        produtores: [],
        contratos: [],
        produtos: [],
        transportadoras: [],
        caminhoes: [],
        motoristas: [],
      },
    },
    columns: patioColumns.map((column) => ({
      ...column,
      items: [],
    })),
  };
}
