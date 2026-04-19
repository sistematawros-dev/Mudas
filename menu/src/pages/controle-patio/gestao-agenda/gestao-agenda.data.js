export const modeOptions = [
  { value: 'single-date', label: 'Data Única' },
  { value: 'period', label: 'Período' },
];

export const productOptions = [
  { value: '', label: 'Selecione' },
  { value: 'caroco', label: 'Caroço' },
  { value: 'pluma', label: 'Pluma' },
  { value: 'fibrilha', label: 'Fibrilha' },
  { value: 'capulho', label: 'Capulho' },
];

export const statusOptions = [
  { value: '', label: 'Status' },
  { value: 'open', label: 'Aberto' },
  { value: 'blocked', label: 'Bloqueado' },
];

export const filterProductOptions = [
  { value: '', label: 'Produto' },
  { value: 'caroco', label: 'Caroço' },
  { value: 'pluma', label: 'Pluma' },
  { value: 'fibrilha', label: 'Fibrilha' },
  { value: 'capulho', label: 'Capulho' },
];

export const gestaoAgendaModalIds = {
  block: 'gestao-agenda-block-modal',
  cancel: 'gestao-agenda-cancel-modal',
};

const calendarWeekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function createGestaoAgendaState() {
  return {
    filiais: [],
    selectedFilialId: null,
    mode: 'single-date',
    form: {
      loadingDate: {
        id: 'managementLoadingDate',
        label: 'Data de Carregamento',
        value: '',
        placeholder: '00/00/0000',
        required: true,
      },
      endDate: {
        id: 'managementEndDate',
        label: 'Data Final',
        value: '',
        placeholder: '00/00/0000',
        required: true,
      },
      productType: {
        id: 'managementProductType',
        label: 'Tipo de Produto',
        value: '',
        placeholder: 'Selecione',
        required: true,
      },
      totalSlots: {
        id: 'managementTotalSlots',
        label: 'Total Vagas',
        value: '',
        placeholder: 'Ex: 15',
        required: true,
      },
      carrierLimit: {
        id: 'managementCarrierLimit',
        label: 'Limite p/ Transportadora',
        value: '',
        placeholder: 'Opcional',
        required: false,
      },
    },
    filters: {
      view: 'grid',
      status: '',
      product: '',
      currentRangeLabel: '',
      currentMonthDate: new Date(),
    },
    modal: {
      selectedCardId: null,
      blockReason: '',
    },
    blockingCardId: null,
    blockingReason: '',
    cards: [],
    allCards: [],
    calendar: {
      weekdays: [...calendarWeekdays],
      weeks: [],
    },
  };
}
