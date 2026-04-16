export const overviewMetrics = [
  {
    id: 'trucks-in-yard',
    label: 'Caminhões no Pátio',
    value: '0',
    tone: 'info',
    icon: 'truck',
  },
  {
    id: 'pending-instructions',
    label: 'Instruções Pendentes',
    value: '0',
    tone: 'warning',
    icon: 'document',
  },
  {
    id: 'today-slots',
    label: 'Vagas Hoje',
    value: '0',
    tone: 'success',
    icon: 'calendar',
  },
  {
    id: 'avg-wait',
    label: 'Tempo Médio Espera',
    value: '0 min',
    tone: 'danger',
    icon: 'clock',
  },
];

export const upcomingAppointments = [];

export const instructionStatus = {
  total: 0,
  series: [0],
  labels: ['Sem dados'],
  colors: ['#CBD5E1'],
};
