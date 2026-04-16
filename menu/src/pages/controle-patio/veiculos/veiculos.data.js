const vehicleGroupOptions = [
  { value: 'proprio', label: 'Proprio' },
  { value: 'terceiro', label: 'Terceiro' },
];

function cloneFiles(files = []) {
  return (Array.isArray(files) ? files : []).map((file = {}, index) => ({
    id: String(file.id || `doc-${index + 1}`),
    name: String(file.name || 'Documento do caminhao'),
    size: Number(file.size || 0),
  }));
}

function formatCargaMaxima(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return '';
  return number.toLocaleString('pt-BR', { maximumFractionDigits: 3 });
}

export function createVehiclesState() {
  return {
    editingVehicleId: null,
    vehicles: [],
    drawer: {
      form: createVehicleFormFromRecord(null),
      groupOptions: vehicleGroupOptions,
      lookups: {
        transportadoras: [],
        motoristas: [],
      },
    },
  };
}

export function createVehicleFormFromRecord(vehicle) {
  if (!vehicle) {
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

  return {
    grupo: vehicle.grupo || '',
    descricao: vehicle.descricao || '',
    placa: vehicle.placa || '',
    marca: vehicle.marca || '',
    modelo: vehicle.modelo || '',
    cargaMaxima: formatCargaMaxima(vehicle.cargaMaximaKg),
    vinculoTipo: vehicle.vinculoTipo === 'motoristas' ? 'motoristas' : 'transportadoras',
    vinculoIds: Array.isArray(vehicle.vinculoIds) ? [...vehicle.vinculoIds] : [],
    documentoFiles: cloneFiles(vehicle.documentoFiles),
  };
}

export function parseCargaMaximaKg(input) {
  const raw = String(input || '').trim();
  if (!raw) return 0;
  const normalized = raw.replace(/\./g, '').replace(',', '.');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

export function createVehicleRecordFromForm(form, vehicleId = null) {
  return {
    id: vehicleId || null,
    grupo: String(form.grupo || ''),
    descricao: String(form.descricao || '').trim(),
    placa: String(form.placa || '').trim().toUpperCase(),
    marca: String(form.marca || '').trim(),
    modelo: String(form.modelo || '').trim(),
    cargaMaximaKg: parseCargaMaximaKg(form.cargaMaxima),
    vinculoTipo: form.vinculoTipo === 'motoristas' ? 'motoristas' : 'transportadoras',
    vinculoIds: Array.isArray(form.vinculoIds) ? form.vinculoIds.map((item) => String(item)) : [],
    documentoFiles: cloneFiles(form.documentoFiles),
  };
}
