export const contractFieldOptions = {
  buyers: [],
  sellers: [],
  productTypes: [
    { value: 'caroco', label: 'Caroço' },
    { value: 'fibrilha', label: 'Fibrilha' },
    { value: 'capulho', label: 'Capulho' },
    { value: 'pluma', label: 'Pluma' },
  ],
  branches: [],
  carriers: [],
  units: [
    { value: 'quilogramas', label: 'Quilogramas' },
    { value: 'toneladas', label: 'Toneladas' },
    { value: 'arrobas', label: 'Arrobas' },
    { value: 'sacas', label: 'Sacas' },
  ],
};

export const initialFormValues = {
  instructionNumber: '',
  issueDate: '',
  loadingDeadline: '',
  buyer: '',
  contractNumber: '',
  producerDocument: '',
  sellerName: '',
  productType: 'caroco',
  branch: '',
  carrierName: '',
  blockInput: '',
  unit: 'quilogramas',
  quantity: '0',
};

export const initialStandardLogisticsItems = [];

export const initialPlumaBlocks = [];

export const initialPlumaCarriers = [];


