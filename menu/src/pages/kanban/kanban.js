import * as KanbanColumn from '../../components/kanban-column/kanban-column.js';
import * as KanbanCard from '../../components/kanban-card/kanban-card.js';
import * as ColorPicker from '../../components/color-picker/color-picker.js';
import * as Drawer from '../../components/drawer/drawer.js';
import * as Tabs from '../../components/tabs/tabs.js';
import * as Input from '../../components/input/input.js';
import * as Checkbox from '../../components/checkbox/checkbox.js';
import * as Toggle from '../../components/toggle/toggle.js';
import * as Chip from '../../components/chip/chip.js';
import * as Button from '../../components/button/button.js';
import * as Badge from '../../components/badge/badge.js';
import * as Modal from '../../components/modal/modal.js';
import * as Toast from '../../components/toast/toast.js';
import * as FileUpload from '../../components/file-upload/file-upload.js';
import { openPlanningModal, closePlanningModal } from '../pedidos/modals/planejamento-modal.js';
import { icon } from '../../components/icons/icons.js';

const KANBAN_MODE = Object.freeze({
  PRODUCAO: 'producao',
  PEDIDOS: 'pedidos',
});

const KANBAN_VIEW_MODE = Object.freeze({
  KANBAN: 'kanban',
  LIST: 'list',
});

const NO_GRAFTING_ALLOWED_COLUMNS = new Set([
  'aguardando-aprovacao',
  'agendado',
  'semeio',
  'germinacao',
  'casa-vegetacao',
  'expedicao',
  'finalizado',
  'cancelado',
]);

/**
 * Dados mock do Kanban
 */
const KANBAN_DATA = {
  columns: [
    {
      id: 'aguardando-aprovacao',
      title: 'Aguardando Agendamento',
      color: 'green',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data planejada:', value: '14/01/2025' },
          ],
        },
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data planejada:', value: '14/01/2025' },
          ],
        },
      ],
    },
    {
      id: 'agendado',
      title: 'Agendado',
      color: 'blue',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data planejada:', value: '14/01/2025' },
          ],
        },
      ],
    },
    {
      id: 'semeio',
      title: 'Semeio',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'germinacao',
      title: 'Germinação',
      color: 'purple',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'aguardando-enxertia',
      title: 'Aguardando Enxertia',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'sala-corte',
      title: 'Sala de Corte',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'sala-fusao',
      title: 'Sala de Fusão',
      color: 'orange',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'adaptacao',
      title: 'Adaptação',
      color: 'yellow',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'casa-vegetacao',
      title: 'Casa de Vegetação',
      color: 'pink',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'expedicao',
      title: 'Expedição',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'finalizado',
      title: 'Finalizado',
      color: 'green',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'cancelado',
      title: 'Cancelado',
      color: 'gray',
      cards: [],
    },
  ],
};

function createPedidoCard(index) {
  const code = index % 2 === 0 ? 'A2W-2025-001' : 'A2W-2025-002';
  const subtitle = index % 2 === 0 ? 'TG-45678' : 'TG-45679';
  return {
    code,
    subtitle,
    badgeLabel: 'Faturado',
    badgeVariant: 'success',
    badgeStyle: 'soft',
    items: [
      { icon: 'user', label: 'João Silva' },
      { icon: null, label: 'Vendedor: Maria Santos' },
      { type: 'divider' },
      { icon: 'calendar', label: 'Pedido: 14/01/2025' },
      { icon: 'package', label: 'Muda de Eucalipto Clone AEC 144' },
      { icon: 'circle', label: 'Qtd: 5.000' },
      { icon: 'calendar', label: 'Entrega em: 19/02/2025' },
      { icon: 'circle', label: 'R$ 15.500,00', className: 'kanban-card__item--price' },
    ],
  };
}

const PEDIDOS_KANBAN_DATA = {
  columns: [
    { id: 'recebido', title: 'Recebido', color: 'green', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'aguardando-aprovacao', title: 'Aguardando Aprovação', color: 'gray', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'em-preparacao', title: 'Em Preparação', color: 'blue', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'em-producao', title: 'Em Produção', color: 'purple', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'em-expedicao', title: 'Em Expedição', color: 'cyan', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'em-transito', title: 'Em Trânsito', color: 'orange', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'finalizados', title: 'Finalizados', color: 'green', cards: [createPedidoCard(0), createPedidoCard(1)] },
    { id: 'cancelado', title: 'Cancelado', color: 'gray', cards: [] },
  ],
};

const PEDIDOS_DETAILS_MOCK = {
  'A2W-2025-001': {
    companyName: 'Agro Silva LTDA.',
    client: {
      codigo: '43242343',
      cpfCnpj: '123.456.789-00',
      razaoSocial: 'Nome da razao social',
      nomeFantasia: 'Nome fantasia',
      endereco: 'Rua das Flores, 123 - São Paulo, SP',
      telefone: '(11) 98765-4321',
      email: 'joao.silva@gmail.com',
      vendedor: 'Maria Santos',
    },
    items: [
      {
        id: 'item-1',
        product: 'Eucalipto MUD-001',
        quantity: '5.000',
        unitValue: 'R$ 2,50',
        totalValue: 'R$ 12.500,00',
        availableQuantity: '1000',
        planning: [
          { type: 'planned', amount: '3.000', date: '12/12/25', responsible: 'Fazenda Boa Vista', quantity: '3.000' },
          { type: 'canceled', amount: '1.000', date: '12/12/25', responsible: 'Fazenda Boa Vista', quantity: '1.000' },
        ],
      },
      {
        id: 'item-2',
        product: 'Eucalipto MUD-001',
        quantity: '5.000',
        unitValue: 'R$ 2,50',
        totalValue: 'R$ 12.500,00',
        availableQuantity: '1000',
        planning: [],
      },
    ],
    summary: {
      orderDate: '14/01/2025',
      expectedDelivery: '19/02/2025',
      totalValue: 'R$ 15.500,00',
      notes: 'Cliente solicitou entrega pela manhã',
    },
  },
  'A2W-2025-002': {
    companyName: 'Agro Campo LTDA.',
    client: {
      codigo: '992211',
      cpfCnpj: '987.654.321-00',
      razaoSocial: 'Agro Campo Razão Social',
      nomeFantasia: 'Agro Campo',
      endereco: 'Av. Central, 450 - Campinas, SP',
      telefone: '(19) 99888-1111',
      email: 'compras@agrocampo.com',
      vendedor: 'Maria Santos',
    },
    items: [
      {
        id: 'item-1',
        product: 'Eucalipto MUD-001',
        quantity: '5.000',
        unitValue: 'R$ 2,50',
        totalValue: 'R$ 12.500,00',
        availableQuantity: '1000',
        planning: [
          { type: 'planned', amount: '2.000', date: '10/01/26', responsible: 'Fazenda Primavera', quantity: '2.000' },
        ],
      },
      {
        id: 'item-2',
        product: 'Eucalipto MUD-002',
        quantity: '3.000',
        unitValue: 'R$ 3,00',
        totalValue: 'R$ 9.000,00',
        availableQuantity: '600',
        planning: [],
      },
    ],
    summary: {
      orderDate: '16/01/2025',
      expectedDelivery: '21/02/2025',
      totalValue: 'R$ 21.500,00',
      notes: 'Priorizar entrega no período da tarde',
    },
  },
};

const PEDIDOS_HISTORY_MOCK = {
  'A2W-2025-001': {
    'item-1': [
      {
        id: 'evt-1',
        title: 'Lote pronto para entrega - OP-2025-002',
        date: '08/11/2025 às 14:35',
        description: 'Lote de 5.000 mudas aprovado e liberado para expedição',
        badgeLabel: 'Sucesso',
        badgeType: 'sucesso',
        metaRole: 'Responsável',
        metaName: 'André Cesarni',
      },
      {
        id: 'evt-2',
        title: 'Vistoria de qualidade - OP-2025-002',
        date: '05/11/2025 às 10:15',
        description: 'Vistoria realizada com aprovação. Taxa de germinação: 98%. Data estimada para enxertia atualizada.',
        badgeLabel: 'Operação',
        badgeType: 'operacao',
        metaRole: 'Operador',
        metaName: 'Ana Silva',
      },
      {
        id: 'evt-3',
        title: 'Mudança de localização - OP-2025-002',
        date: '20/10/2025 às 15:45',
        description: 'Lote movido de Estufa 1 - Bancada A2 para Estufa 2 - Bancada C5',
        badgeLabel: 'Movimentação',
        badgeType: 'movimentacao',
        metaRole: 'Responsável',
        metaName: 'Pedro Almeida',
      },
      {
        id: 'evt-4',
        title: 'Semeio realizado - OP-2025-002',
        date: '15/10/2025 às 09:00',
        description: 'Semeio de 5.000 mudas de Eucalipto Clone AEC 144 iniciado na Estufa 1',
        badgeLabel: 'Produção',
        badgeType: 'producao',
        metaRole: 'Responsável',
        metaName: 'André Santos',
      },
      {
        id: 'evt-5',
        title: 'Planejamento realizado - OP-2025-002',
        date: '16/01/2025 às 11:20',
        description: 'Eucalipto Clone AEC 144. Quantidade: 3.000. Data de semeio: 15/10/2025. Previsão de entrega: 19/02/2025',
        badgeLabel: 'Planejamento',
        badgeType: 'planejamento',
        metaRole: 'Responsável',
        metaName: 'André Santos',
      },
      {
        id: 'evt-6',
        title: 'Item cancelado',
        date: '16/01/2025 às 11:20',
        description: 'Eucalipto Clone AEC 144. Quantidade: 3.000',
        badgeLabel: 'Cancelado',
        badgeType: 'cancelado',
        metaRole: 'Responsável',
        metaName: 'André Santos',
      },
      {
        id: 'evt-7',
        title: 'Pedido recebido',
        date: '14/01/2025 às 09:15',
        description: 'Pedido A2W-2025-001 recebido do cliente João Silva',
        badgeLabel: 'Início',
        badgeType: 'inicio',
        metaRole: 'Vendedor',
        metaName: 'Maria Santos',
      },
    ],
    'item-2': [
      {
        id: 'evt-8',
        title: 'Planejamento realizado - OP-2025-003',
        date: '17/01/2025 às 08:45',
        description: 'Quantidade: 2.000. Previsão de entrega: 22/02/2025',
        badgeLabel: 'Planejamento',
        badgeType: 'planejamento',
        metaRole: 'Responsável',
        metaName: 'André Santos',
      },
      {
        id: 'evt-9',
        title: 'Pedido recebido',
        date: '14/01/2025 às 09:15',
        description: 'Item incluído no pedido A2W-2025-001',
        badgeLabel: 'Início',
        badgeType: 'inicio',
        metaRole: 'Vendedor',
        metaName: 'Maria Santos',
      },
    ],
  },
  'A2W-2025-002': {
    'item-1': [
      {
        id: 'evt-10',
        title: 'Lote pronto para entrega - OP-2025-021',
        date: '09/11/2025 às 13:10',
        description: 'Lote de 5.000 mudas aprovado e liberado para expedição',
        badgeLabel: 'Sucesso',
        badgeType: 'sucesso',
        metaRole: 'Responsável',
        metaName: 'Renata Prado',
      },
      {
        id: 'evt-11',
        title: 'Pedido recebido',
        date: '16/01/2025 às 10:05',
        description: 'Pedido A2W-2025-002 recebido do cliente Agro Campo',
        badgeLabel: 'Início',
        badgeType: 'inicio',
        metaRole: 'Vendedor',
        metaName: 'Maria Santos',
      },
    ],
    'item-2': [
      {
        id: 'evt-12',
        title: 'Item cancelado',
        date: '18/01/2025 às 15:42',
        description: 'Cancelamento por indisponibilidade de lote',
        badgeLabel: 'Cancelado',
        badgeType: 'cancelado',
        metaRole: 'Responsável',
        metaName: 'Renata Prado',
      },
      {
        id: 'evt-13',
        title: 'Pedido recebido',
        date: '16/01/2025 às 10:05',
        description: 'Item incluído no pedido A2W-2025-002',
        badgeLabel: 'Início',
        badgeType: 'inicio',
        metaRole: 'Vendedor',
        metaName: 'Maria Santos',
      },
    ],
  },
};

const PEDIDOS_PLANNING_MOCK = {
  'A2W-2025-001': {
    products: [
      { id: 'prod-0001', code: '0001', name: 'Muda de Tomate', label: '0001 - Muda de Tomate' },
      { id: 'prod-0002', code: '0002', name: 'Muda de Eucalipto', label: '0002 - Muda de Eucalipto' },
    ],
    byProduct: {
      'prod-0001': {
        metrics: { total: 5000, planned: 5000, canceled: 5000, pending: 0 },
        plans: [
          { id: 'plan-1', op: 'OP-2025-002', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'ativo', planningDate: '12/01/2025', deliveryDate: '12/01/2025', sowingDate: '23/12/2023', daysAfterSowing: '32 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-2', op: 'OP-2025-002', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'cancelado', planningDate: '11/01/2025', deliveryDate: '11/01/2025', sowingDate: '22/12/2023', daysAfterSowing: '31 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-3', op: 'OP-2025-002', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'ativo', planningDate: '10/01/2025', deliveryDate: '10/01/2025', sowingDate: '21/12/2023', daysAfterSowing: '30 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-4', op: 'OP-2025-002', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'ativo', planningDate: '09/01/2025', deliveryDate: '09/01/2025', sowingDate: '20/12/2023', daysAfterSowing: '29 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-5', op: 'OP-2025-002', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'cancelado', planningDate: '08/01/2025', deliveryDate: '08/01/2025', sowingDate: '19/12/2023', daysAfterSowing: '28 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-6', op: 'OP-2025-002', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'ativo', planningDate: '07/01/2025', deliveryDate: '07/01/2025', sowingDate: '18/12/2023', daysAfterSowing: '27 dias', responsible: 'Viktor Dantas' },
        ],
      },
      'prod-0002': {
        metrics: { total: 3000, planned: 2000, canceled: 500, pending: 500 },
        plans: [
          { id: 'plan-7', op: 'OP-2025-003', stage: 'Semeio', product: 'Muda de Eucalipto Clone MUD-002', quantity: 1000, status: 'ativo', planningDate: '06/01/2025', deliveryDate: '15/02/2025', sowingDate: '17/12/2023', daysAfterSowing: '26 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-8', op: 'OP-2025-003', stage: 'Semeio', product: 'Muda de Eucalipto Clone MUD-002', quantity: 1000, status: 'cancelado', planningDate: '05/01/2025', deliveryDate: '14/02/2025', sowingDate: '16/12/2023', daysAfterSowing: '25 dias', responsible: 'Viktor Dantas' },
        ],
      },
    },
  },
  'A2W-2025-002': {
    products: [{ id: 'prod-0001', code: '0001', name: 'Muda de Tomate', label: '0001 - Muda de Tomate' }],
    byProduct: {
      'prod-0001': {
        metrics: { total: 5000, planned: 5000, canceled: 5000, pending: 0 },
        plans: [
          { id: 'plan-9', op: 'OP-2025-021', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'ativo', planningDate: '12/01/2025', deliveryDate: '18/02/2025', sowingDate: '23/12/2023', daysAfterSowing: '32 dias', responsible: 'Viktor Dantas' },
          { id: 'plan-10', op: 'OP-2025-021', stage: 'Semeio', product: 'Muda de Eucalipto Clone AEC 144', quantity: 500, status: 'ativo', planningDate: '11/01/2025', deliveryDate: '17/02/2025', sowingDate: '22/12/2023', daysAfterSowing: '31 dias', responsible: 'Viktor Dantas' },
        ],
      },
    },
  },
};

let currentKanbanMode = KANBAN_MODE.PRODUCAO;
let activeKanbanData = KANBAN_DATA;
let currentViewMode = KANBAN_VIEW_MODE.KANBAN;
let ordersListFilters = {
  showFinished: false,
  showCanceled: false,
};
let productionToolbarFilters = {
  noGrafting: false,
};
let productionPlanningSequence = 7;

function formatDateForProductionCard(value) {
  if (!value) {
    return new Date().toLocaleDateString('pt-BR');
  }
  const normalized = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const [year, month, day] = normalized.split('-');
    return `${day}/${month}/${year}`;
  }
  return normalized;
}

function createProductionScheduledCard({ details = null, item = null, planningData = {} } = {}) {
  const sequence = String(productionPlanningSequence++).padStart(3, '0');
  const serviceType = planningData?.serviceType || '';
  const rowData = planningData?.row || {};
  const isFuturePlanning = serviceType === 'remessa-futura';
  const orderCode = details?.orderCode || planningData?.orderItem?.orderCode || '-';
  const productName = planningData?.orderItem?.product || item?.product || '-';
  const quantityValue = rowData.quantity || '-';
  const plannedDate = rowData.plannedDate || rowData.seedDate || '-';
  const locationValue = rowData.location || '-';
  const responsibleValue = rowData.responsible || '-';
  const lotValue = rowData.op || '-';
  const displayQuantity = String(quantityValue).startsWith('Qtd:') ? String(quantityValue) : `Qtd: ${quantityValue}`;

  return {
    code: `OP-${new Date().getFullYear()}-${sequence}`,
    subtitle: orderCode,
    badgeLabel: 'Enxertia',
    preserveCustomData: true,
    items: [
      { icon: 'user', label: isFuturePlanning ? responsibleValue : `Lote ${lotValue}` },
      { icon: 'circle', label: productName, value: displayQuantity },
      { type: 'divider' },
      { icon: 'calendar', label: 'Data planejada:', value: formatDateForProductionCard(plannedDate) },
      ...(isFuturePlanning ? [{ icon: 'map-pin', label: 'Localização:', value: locationValue }] : []),
    ],
  };
}

function addPlanningCardToProductionKanban({ details = null, item = null, planningData = {} } = {}) {
  const agendadoColumn = KANBAN_DATA.columns.find((column) => column?.id === 'agendado');
  if (!agendadoColumn) return;
  const newCard = createProductionScheduledCard({ details, item, planningData });
  agendadoColumn.cards = [newCard, ...(agendadoColumn.cards || [])];
  if (currentKanbanMode === KANBAN_MODE.PRODUCAO) {
    renderKanban();
  }
}

function showCameraAccessWarning() {
  window.alert('Nao foi possivel acessar a camera do dispositivo.');
}

function getKanbanMode() {
  const currentPath = (window.location.hash || '').replace('#', '');
  return currentPath === '/estufas/pedidos' ? KANBAN_MODE.PEDIDOS : KANBAN_MODE.PRODUCAO;
}

function resolveKanbanViewMode(value) {
  return value === KANBAN_VIEW_MODE.LIST ? KANBAN_VIEW_MODE.LIST : KANBAN_VIEW_MODE.KANBAN;
}

function getKanbanViewStorageKey() {
  return `kanban:view-mode:${currentKanbanMode}`;
}

function loadKanbanViewMode() {
  try {
    const storedMode = sessionStorage.getItem(getKanbanViewStorageKey());
    return resolveKanbanViewMode(storedMode);
  } catch (error) {
    return KANBAN_VIEW_MODE.KANBAN;
  }
}

function saveKanbanViewMode(mode) {
  try {
    sessionStorage.setItem(getKanbanViewStorageKey(), resolveKanbanViewMode(mode));
  } catch (error) {
    // no-op em ambientes sem sessionStorage
  }
}

function getOrdersListFiltersStorageKey() {
  return 'kanban:orders:list-filters';
}

function loadOrdersListFilters() {
  try {
    const raw = sessionStorage.getItem(getOrdersListFiltersStorageKey());
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      showFinished: Boolean(parsed?.showFinished),
      showCanceled: Boolean(parsed?.showCanceled),
    };
  } catch (error) {
    return { showFinished: false, showCanceled: false };
  }
}

function saveOrdersListFilters() {
  try {
    sessionStorage.setItem(getOrdersListFiltersStorageKey(), JSON.stringify(ordersListFilters));
  } catch (error) {
    // no-op
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Inicializa a página do Kanban
 */
export function init() {
  const appHeader = document.getElementById('app-header');
  const pageRoot = document.querySelector('.kanban');
  currentKanbanMode = getKanbanMode();
  activeKanbanData = currentKanbanMode === KANBAN_MODE.PEDIDOS ? PEDIDOS_KANBAN_DATA : KANBAN_DATA;
  currentViewMode = loadKanbanViewMode();
  ordersListFilters = loadOrdersListFilters();
  if (appHeader) appHeader.classList.add('header--kanban-compact-tabs');
  if (pageRoot) pageRoot.classList.toggle('kanban--pedidos', currentKanbanMode === KANBAN_MODE.PEDIDOS);

  let cleanupPickers = () => {};
  const renderBoard = () => {
    cleanupPickers();
    renderKanban();
    cleanupPickers = currentViewMode === KANBAN_VIEW_MODE.KANBAN ? initColorPickers() : () => {};
  };

  const cleanupToolbar = initToolbar({
    getViewMode: () => currentViewMode,
    setViewMode: (nextViewMode) => {
      const resolvedMode = resolveKanbanViewMode(nextViewMode);
      const changed = resolvedMode !== currentViewMode;
      currentViewMode = resolvedMode;
      if (changed) saveKanbanViewMode(resolvedMode);
      renderBoard();
    },
  });

  renderBoard();
  const cleanupBoardDragScroll = initBoardDragScroll();
  const cleanupDrawer = initAdvancedFiltersDrawer();
  const cleanupPedidoDetailsDrawer = currentKanbanMode === KANBAN_MODE.PEDIDOS ? initPedidoDetailsDrawer() : () => {};
  const cleanupNewProductionDrawer = currentKanbanMode === KANBAN_MODE.PRODUCAO ? initNewProductionDrawer() : () => {};
  const cleanupSchedulingDrawer = currentKanbanMode === KANBAN_MODE.PRODUCAO ? initSchedulingDrawer() : () => {};
  const cleanupAgendadoDrawer = currentKanbanMode === KANBAN_MODE.PRODUCAO ? initAgendadoDrawer() : () => {};

  return () => {
    if (appHeader) appHeader.classList.remove('header--kanban-compact-tabs');
    if (pageRoot) pageRoot.classList.remove('kanban--pedidos');
    if (typeof cleanupToolbar === 'function') cleanupToolbar();
    if (typeof cleanupBoardDragScroll === 'function') cleanupBoardDragScroll();
    if (typeof cleanupPickers === 'function') cleanupPickers();
    if (typeof cleanupDrawer === 'function') cleanupDrawer();
    if (typeof cleanupPedidoDetailsDrawer === 'function') cleanupPedidoDetailsDrawer();
    if (typeof cleanupNewProductionDrawer === 'function') cleanupNewProductionDrawer();
    if (typeof cleanupSchedulingDrawer === 'function') cleanupSchedulingDrawer();
    if (typeof cleanupAgendadoDrawer === 'function') cleanupAgendadoDrawer();
  };
}

function initToolbar({ getViewMode = () => KANBAN_VIEW_MODE.KANBAN, setViewMode = () => {} } = {}) {
  const chipsContainer = document.getElementById('kanban-toolbar-chips');
  const titleElement = document.getElementById('kanban-title');
  const qrReadButton = document.getElementById('kanban-qr-read-btn');
  const newButton = document.getElementById('kanban-new-btn');
  const visibilityFiltersElement = document.getElementById('kanban-toolbar-visibility-filters');
  const kanbanViewButton = document.getElementById('kanban-view-kanban-btn');
  const listViewButton = document.getElementById('kanban-view-list-btn');
  const chips = ['Badge', 'Badge', 'Badge'];

  if (chipsContainer) {
    chipsContainer.innerHTML = chips.map((chip) => `
      <span class="kanban-chip">
        ${chip}
        <svg class="kanban-chip__close" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </span>
    `).join('');
  }
  if (titleElement) titleElement.textContent = currentKanbanMode === KANBAN_MODE.PEDIDOS ? 'Gestão de Pedidos' : 'Gestão da Produção';
  if (newButton) newButton.textContent = currentKanbanMode === KANBAN_MODE.PEDIDOS ? 'Novo Pedido' : 'Nova produção';
  if (qrReadButton) qrReadButton.hidden = currentKanbanMode === KANBAN_MODE.PEDIDOS;

  let handleShowFinishedChange = null;
  let handleShowCanceledChange = null;
  let showFinishedInput = null;
  let showCanceledInput = null;
  let handleNoGraftingChange = null;
  let noGraftingInput = null;
  if (visibilityFiltersElement) {
    if (currentKanbanMode === KANBAN_MODE.PEDIDOS) {
      visibilityFiltersElement.innerHTML = '';
      visibilityFiltersElement.hidden = true;
    } else {
      const noGraftingToggle = Toggle.createSimple({
        id: 'kanban-no-grafting-toggle',
        size: 'sm',
        checked: productionToolbarFilters.noGrafting,
      }).replace('class="toggle-input"', 'class="toggle-input" data-production-filter="no-grafting"');

      visibilityFiltersElement.innerHTML = `
        <label class="kanban-toolbar__visibility-item">
          <span>Sem Enxertia</span>
          ${noGraftingToggle}
        </label>
      `;

      noGraftingInput = visibilityFiltersElement.querySelector('input[data-production-filter="no-grafting"]');
      handleNoGraftingChange = (event) => {
        productionToolbarFilters.noGrafting = Boolean(event.target?.checked);
        setViewMode(getViewMode());
      };
      noGraftingInput?.addEventListener('change', handleNoGraftingChange);
      visibilityFiltersElement.hidden = false;
    }
  }

  const applyViewButtonsState = () => {
    const isListView = getViewMode() === KANBAN_VIEW_MODE.LIST;
    kanbanViewButton?.classList.toggle('is-active', !isListView);
    listViewButton?.classList.toggle('is-active', isListView);
    kanbanViewButton?.setAttribute('aria-pressed', String(!isListView));
    listViewButton?.setAttribute('aria-pressed', String(isListView));
  };
  applyViewButtonsState();

  const handleKanbanViewClick = () => {
    setViewMode(KANBAN_VIEW_MODE.KANBAN);
    applyViewButtonsState();
  };
  const handleListViewClick = () => {
    setViewMode(KANBAN_VIEW_MODE.LIST);
    applyViewButtonsState();
  };
  const handleQrReadClick = (event) => {
    const qrButton = event.target?.closest?.('button#kanban-qr-read-btn');
    if (!qrButton) return;
    event.preventDefault();
    event.stopPropagation();
    showCameraAccessWarning();
  };
  kanbanViewButton?.addEventListener('click', handleKanbanViewClick);
  listViewButton?.addEventListener('click', handleListViewClick);
  document.addEventListener('click', handleQrReadClick, true);

  const backButton = document.getElementById('kanban-back-btn');
  const handleBackClick = () => {
    window.location.hash = currentKanbanMode === KANBAN_MODE.PEDIDOS ? '#/estufas/agenda-eventos' : '#/producao';
  };
  if (backButton) {
    backButton.addEventListener('click', handleBackClick);
  }

  return () => {
    if (backButton) backButton.removeEventListener('click', handleBackClick);
    kanbanViewButton?.removeEventListener('click', handleKanbanViewClick);
    listViewButton?.removeEventListener('click', handleListViewClick);
    document.removeEventListener('click', handleQrReadClick, true);
    showFinishedInput?.removeEventListener('change', handleShowFinishedChange);
    showCanceledInput?.removeEventListener('change', handleShowCanceledChange);
    noGraftingInput?.removeEventListener('change', handleNoGraftingChange);
  };
}

function initBoardDragScroll() {
  const board = document.getElementById('kanban-board');
  if (!board) return () => {};

  let isPointerDown = false;
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let activePointerId = null;
  let suppressClickOnce = false;

  const DRAG_THRESHOLD_PX = 6;

  const isInteractiveTarget = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('button, a, input, select, textarea, label, [role="button"]'));
  };

  const stopDragging = () => {
    if (!isPointerDown && !isDragging) return;
    board.classList.remove('is-dragging');
    isPointerDown = false;
    isDragging = false;
    activePointerId = null;
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    if (board.classList.contains('kanban-board--list')) return;
    if (isInteractiveTarget(event.target)) return;

    isPointerDown = true;
    isDragging = false;
    startX = event.clientX;
    startScrollLeft = board.scrollLeft;
    activePointerId = event.pointerId;
  };

  const handlePointerMove = (event) => {
    if (!isPointerDown || activePointerId !== event.pointerId) return;
    const deltaX = event.clientX - startX;

    if (!isDragging && Math.abs(deltaX) >= DRAG_THRESHOLD_PX) {
      isDragging = true;
      board.classList.add('is-dragging');
    }
    if (!isDragging) return;

    board.scrollLeft = startScrollLeft - deltaX;
    event.preventDefault();
  };

  const handlePointerEnd = (event) => {
    if (!isPointerDown || activePointerId !== event.pointerId) return;
    if (isDragging) suppressClickOnce = true;
    stopDragging();
  };

  const handleBoardClickCapture = (event) => {
    if (!suppressClickOnce) return;
    suppressClickOnce = false;
    event.preventDefault();
    event.stopPropagation();
  };

  board.addEventListener('pointerdown', handlePointerDown);
  board.addEventListener('pointermove', handlePointerMove, { passive: false });
  board.addEventListener('pointerup', handlePointerEnd);
  board.addEventListener('pointercancel', handlePointerEnd);
  board.addEventListener('pointerleave', handlePointerEnd);
  board.addEventListener('click', handleBoardClickCapture, true);

  return () => {
    stopDragging();
    board.removeEventListener('pointerdown', handlePointerDown);
    board.removeEventListener('pointermove', handlePointerMove);
    board.removeEventListener('pointerup', handlePointerEnd);
    board.removeEventListener('pointercancel', handlePointerEnd);
    board.removeEventListener('pointerleave', handlePointerEnd);
    board.removeEventListener('click', handleBoardClickCapture, true);
  };
}

/**
 * Renderiza o board do Kanban
 */
function renderKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;
  board.innerHTML = '';
  board.classList.toggle('kanban-board--list', currentViewMode === KANBAN_VIEW_MODE.LIST);

  if (currentViewMode === KANBAN_VIEW_MODE.LIST) {
    renderKanbanListView(board);
    return;
  }

  renderKanbanColumns(board);
}

function renderKanbanColumns(board) {
  if (!board) return;
  const columnsToRender = currentKanbanMode === KANBAN_MODE.PRODUCAO && productionToolbarFilters.noGrafting
    ? activeKanbanData.columns.filter((columnData) => NO_GRAFTING_ALLOWED_COLUMNS.has(columnData?.id))
    : activeKanbanData.columns;

  // Renderiza cada coluna
  columnsToRender.forEach(columnData => {
    const columnHtml = KanbanColumn.create({
      id: columnData.id,
      title: columnData.title,
      color: columnData.color,
      count: columnData.cards.length,
    });

    board.insertAdjacentHTML('beforeend', columnHtml);

    // Adiciona cards ou empty state
    if (columnData.cards.length > 0) {
      columnData.cards.forEach((cardData, cardIndex) => {
        const normalizedCardData = normalizeCardData(cardData, columnData.id, cardIndex);
        const cardHtml = KanbanCard.create(normalizedCardData);
        KanbanColumn.addCard(columnData.id, cardHtml);
      });
    } else {
      KanbanColumn.showEmptyState(columnData.id);
    }

    // Adiciona color picker após cada coluna
    const column = document.querySelector(`[data-column-id="${columnData.id}"]`);
    if (column) {
      const header = column.querySelector('.kanban-column__header');
      const pickerHtml = ColorPicker.create({
        id: `picker-${columnData.id}`,
        selected: columnData.color,
      });
      header.style.position = 'relative';
      header.insertAdjacentHTML('beforeend', pickerHtml);
    }
  });
}

function renderKanbanListView(board) {
  const sourceColumns = currentKanbanMode === KANBAN_MODE.PRODUCAO && productionToolbarFilters.noGrafting
    ? activeKanbanData.columns.filter((columnData) => NO_GRAFTING_ALLOWED_COLUMNS.has(columnData?.id))
    : activeKanbanData.columns;

  const listColumns = currentKanbanMode === KANBAN_MODE.PEDIDOS
    ? sourceColumns.filter((columnData) => {
      if (!ordersListFilters.showFinished && (columnData.id === 'finalizados' || columnData.id === 'finalizado')) return false;
      if (!ordersListFilters.showCanceled && columnData.id === 'cancelado') return false;
      return true;
    })
    : sourceColumns;

  const listRows = listColumns.flatMap((columnData) =>
    columnData.cards.map((cardData, cardIndex) => createKanbanListRowMarkup(columnData, cardData, cardIndex)),
  );

  board.innerHTML = `
    <section class="kanban-list-view ${currentKanbanMode === KANBAN_MODE.PEDIDOS ? 'kanban-list-view--orders' : 'kanban-list-view--production'}" data-kanban-list-view>
      <div class="kanban-list-view__rows">
        ${listRows.join('')}
      </div>
    </section>
  `;
}

function createKanbanListRowMarkup(columnData, cardData, cardIndex) {
  const normalizedCard = normalizeCardData(cardData, columnData.id, cardIndex);
  const listModel = toListRowDTO({ columnData, cardData: normalizedCard, mode: currentKanbanMode });
  return currentKanbanMode === KANBAN_MODE.PEDIDOS
    ? createOrdersListRowMarkup(columnData, listModel)
    : createProductionListRowMarkup(columnData, listModel);
}

function getStatusBadgeVariantByColumn(columnId) {
  const variantByColumn = {
    recebido: 'light',
    'aguardando-aprovacao': 'light',
    'em-preparacao': 'info',
    'em-producao': 'warning',
    'em-expedicao': 'primary',
    'em-transito': 'primary',
    finalizados: 'success',
    finalizado: 'success',
    cancelado: 'error',
  };
  return variantByColumn[columnId] || 'light';
}

function createOrdersListRowMarkup(columnData, listModel) {
  return `
    <article class="kanban-list-row kanban-card" data-column-id="${escapeHtml(columnData.id)}" style="--list-item-accent:${escapeHtml(listModel.accentColor || 'var(--color-primary)')}">
      <span class="kanban-list-row__column-title kanban-column__title" hidden>${escapeHtml(columnData.title || '')}</span>
      <div class="kanban-list-row__main">
        <div class="kanban-list-row__cell kanban-list-row__cell--title">
          <a href="#" class="kanban-card__code kanban-list-row__title" style="color:${escapeHtml(listModel.accentColor || 'var(--color-primary)')}">${escapeHtml(listModel.title || '-')}</a>
          <span class="kanban-card__subtitle">${escapeHtml(listModel.subtitle || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--type">
          ${listModel.type ? Badge.create({ text: listModel.type, variant: 'success', style: 'soft', size: 'sm' }) : ''}
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('user', { size: 14 })}
          <span>${escapeHtml(listModel.clientValue || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('calendar', { size: 14 })}
          <span>${escapeHtml(listModel.date1 || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('calendar', { size: 14 })}
          <span>${escapeHtml(listModel.date2 || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('package', { size: 14 })}
          <span>${escapeHtml(listModel.qty || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta kanban-list-row__meta--value">
          ${icon('circle', { size: 12 })}
          <strong>${escapeHtml(listModel.amount || '-')}</strong>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Badge.create({
    text: listModel.status || '-',
    variant: getStatusBadgeVariantByColumn(columnData.id),
    style: 'soft',
    size: 'sm',
  })}
        </div>
      </div>
    </article>
  `;
}

function createProductionListRowMarkup(columnData, listModel) {
  return `
    <article class="kanban-list-row kanban-card" data-column-id="${escapeHtml(columnData.id)}" style="--list-item-accent:${escapeHtml(listModel.accentColor || 'var(--color-primary)')}">
      <span class="kanban-list-row__column-title kanban-column__title" hidden>${escapeHtml(columnData.title || '')}</span>
      <div class="kanban-list-row__main">
        <div class="kanban-list-row__cell kanban-list-row__cell--title">
          <a href="#" class="kanban-card__code kanban-list-row__title" style="color:${escapeHtml(listModel.accentColor || 'var(--color-primary)')}">${escapeHtml(listModel.title || '-')}</a>
          <span class="kanban-card__subtitle">${escapeHtml(listModel.subtitle || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--type">
          ${listModel.type ? Badge.create({ text: listModel.type, variant: 'light', style: 'soft', size: 'sm' }) : ''}
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('user', { size: 14 })}
          <span>${escapeHtml(listModel.clientLabel ? `${listModel.clientLabel} ${listModel.clientValue}`.trim() : (listModel.clientValue || '-'))}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('calendar', { size: 14 })}
          <span>${escapeHtml(listModel.date1 || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('calendar', { size: 14 })}
          <span>${escapeHtml(listModel.date2 || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${icon('package', { size: 14 })}
          <span>${escapeHtml(listModel.qty || '-')}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Badge.create({
    text: listModel.status || '-',
    variant: getStatusBadgeVariantByColumn(columnData.id),
    style: 'soft',
    size: 'sm',
  })}
        </div>
      </div>
    </article>
  `;
}

function normalizeListQuantity(value) {
  const raw = String(value || '');
  const match = raw.match(/[\d.]+/);
  const quantity = match?.[0] || '-';
  return quantity === '-' ? '-' : `${quantity} un`;
}

function normalizeListAmount(value) {
  const raw = String(value || '').trim();
  return raw || '-';
}

function getColumnAccentColor(columnColor = '') {
  const colorKey = String(columnColor || '').trim().toLowerCase();
  if (!colorKey) return 'var(--color-primary)';

  if (
    colorKey.startsWith('var(')
    || colorKey.startsWith('#')
    || colorKey.startsWith('rgb(')
    || colorKey.startsWith('rgba(')
    || colorKey.startsWith('hsl(')
    || colorKey.startsWith('hsla(')
  ) {
    return columnColor;
  }

  const accentByColor = {
    cyan: 'rgb(6 182 212)',
    green: 'rgb(34 197 94)',
    blue: 'rgb(59 130 246)',
    indigo: 'rgb(99 102 241)',
    slate: 'rgb(100 116 139)',
    purple: 'rgb(168 85 247)',
    yellow: 'rgb(234 179 8)',
    pink: 'rgb(236 72 153)',
    red: 'rgb(239 68 68)',
    orange: 'rgb(249 115 22)',
    gray: 'rgb(100 116 139)',
  };
  return accentByColor[colorKey] || 'var(--color-primary)';
}

function toListRowDTO({ columnData, cardData, mode }) {
  return mode === KANBAN_MODE.PEDIDOS
    ? toOrderListRowDTO({ columnData, cardData })
    : toProductionListRowDTO({ columnData, cardData });
}

function toOrderListRowDTO({ columnData, cardData }) {
  const items = Array.isArray(cardData?.items) ? cardData.items : [];
  const dateEntries = items.filter((item) => item?.icon === 'calendar');
  const quantityEntry = items.find((item) => item?.icon === 'circle' && /^Qtd:/i.test(String(item?.label || '')));
  const amountEntry = items.find((item) => item?.className?.includes('price'));

  return {
    title: cardData?.code || '-',
    subtitle: cardData?.subtitle || '-',
    type: cardData?.badgeLabel || '',
    clientLabel: 'Cliente',
    clientValue: items[0]?.label || '-',
    date1: dateEntries[0]?.value || '-',
    date2: dateEntries[1]?.value || '-',
    qty: normalizeListQuantity(quantityEntry?.label || quantityEntry?.value || '-'),
    amount: normalizeListAmount(amountEntry?.label || amountEntry?.value || '-'),
    status: columnData?.title || '-',
    accentColor: getColumnAccentColor(columnData?.color),
  };
}

function toProductionListRowDTO({ columnData, cardData }) {
  const items = Array.isArray(cardData?.items) ? cardData.items : [];
  const dateEntries = items.filter((item) => item?.icon === 'calendar');
  const firstEntry = items[0] || {};
  const productEntry = items.find((item) => item?.icon === 'circle' && item?.label && !item?.value) || {};
  const quantitySource = items.find((item) => item?.icon === 'circle' && item?.value) || {};

  return {
    title: cardData?.code || '-',
    subtitle: cardData?.subtitle || productEntry?.label || '-',
    type: cardData?.badgeLabel || '',
    clientLabel: firstEntry?.value ? (firstEntry?.label || '').trim() : '',
    clientValue: firstEntry?.value || firstEntry?.label || '-',
    date1: dateEntries[0]?.value || '-',
    date2: dateEntries[1]?.value || '-',
    qty: normalizeListQuantity(quantitySource?.value || quantitySource?.label || '-'),
    amount: '',
    status: columnData?.title || '-',
    accentColor: getColumnAccentColor(columnData?.color),
  };
}

/**
 * Inicializa os color pickers
 */
function initColorPickers() {
  const pickerHandlers = [];

  activeKanbanData.columns.forEach(columnData => {
    const settingsBtn = document.querySelector(`[data-column-settings="${columnData.id}"]`);
    const picker = document.getElementById(`picker-${columnData.id}`);

    if (!settingsBtn || !picker) return;

    // Toggle do picker ao clicar no botão de settings
    const handleSettingsClick = (e) => {
      e.stopPropagation();

      // Fecha todos os outros pickers abertos
      document.querySelectorAll('[data-color-picker]').forEach(p => {
        if (p !== picker) {
          ColorPicker.close(p);
        }
      });

      ColorPicker.toggle(picker);
    };

    settingsBtn.addEventListener('click', handleSettingsClick);
    pickerHandlers.push({ settingsBtn, handleSettingsClick });

    // Inicializa o picker
    ColorPicker.init(picker, (color) => {
      KanbanColumn.changeColor(columnData.id, color);

      const modelColumn = activeKanbanData.columns.find((item) => item?.id === columnData.id);
      if (modelColumn) {
        modelColumn.color = color;
      }

      if (currentViewMode === KANBAN_VIEW_MODE.LIST) {
        renderKanban();
      }
    });
  });

  // Fecha todos os pickers ao clicar fora (evento único no document)
  const handleDocumentClick = (e) => {
    // Verifica se o clique foi fora de qualquer picker ou botão de settings
    const clickedInsidePicker = e.target.closest('[data-color-picker]');
    const clickedSettingsBtn = e.target.closest('[data-column-settings]');

    if (!clickedInsidePicker && !clickedSettingsBtn) {
      // Fecha todos os pickers abertos
      document.querySelectorAll('[data-color-picker]').forEach(picker => {
        ColorPicker.close(picker);
      });
    }
  };

  document.addEventListener('click', handleDocumentClick);

  return () => {
    pickerHandlers.forEach(({ settingsBtn, handleSettingsClick }) => {
      settingsBtn.removeEventListener('click', handleSettingsClick);
    });
    document.removeEventListener('click', handleDocumentClick);
  };
}

function normalizeCardData(cardData, columnId, cardIndex) {
  if (currentKanbanMode === KANBAN_MODE.PEDIDOS) {
    return {
      ...cardData,
      badgeVariant: cardData.badgeVariant || 'success',
      badgeStyle: cardData.badgeStyle || 'soft',
      subtitle: cardData.subtitle || '',
      items: cardData.items || [],
    };
  }

  if (columnId === 'aguardando-aprovacao' && cardIndex === 0) {
    return {
      ...cardData,
      badgeLabel: 'Normal',
      badgeVariant: 'soft-info',
      subtitle: '',
      items: [
        { icon: 'file', label: 'Cód. do Cliente:', value: '001' },
        { icon: 'user', label: 'Fazenda Sol Nascente' },
        { type: 'divider' },
        { icon: 'calendar', label: 'Data Abertura OP:', value: '14/01/2025' },
        { icon: 'circle', label: '001 - Produto 1' },
        { icon: 'circle', label: 'Qtd:', value: '5.000' },
        { icon: 'calendar', label: 'Data Entrada:', value: '19/02/2025' },
        { icon: 'calendar', label: 'Previsão Saída:', value: '19/02/2025' },
      ],
    };
  }

  if (cardData?.preserveCustomData) {
    return {
      ...cardData,
      badgeVariant: cardData.badgeVariant || 'light',
      subtitle: cardData.subtitle || '',
      items: Array.isArray(cardData.items) ? cardData.items : [],
    };
  }

  return {
    ...cardData,
    badgeVariant: cardData.badgeVariant || 'light',
    subtitle: cardData.subtitle || 'TG-45678',
    items: getEnxertiaItemsByColumn(columnId),
  };
}

function getEnxertiaItemsByColumn(columnId) {
  const items = [
    { icon: 'user', label: 'Fazenda Sol Nascente' },
    { type: 'divider' },
    { icon: 'calendar', label: 'Pedido:', value: '14/01/2025' },
    { icon: 'circle', label: 'Tomate Cereja - Lote 123' },
    { icon: 'circle', label: 'Qtd:', value: '5.000' },
    { icon: 'calendar', label: 'Início:', value: '19/02/2025' },
  ];

  if (columnId === 'semeio') {
    items[2] = { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' };
    items[5] = { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' };
  }

  if (columnId === 'germinacao') {
    items[2] = { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' };
    items[5] = { icon: 'calendar', label: 'Dias após semeio:', value: '14' };
    items.push({ icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' });
  }

  return items;
}

function initNewProductionDrawer() {
  const triggerButton = document.getElementById('kanban-new-btn');
  if (!triggerButton) return () => {};

  const drawerId = 'kanban-new-production-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'Nova produção',
    width: 540,
    content: createNewProductionDrawerContent(),
    footer: createNewProductionDrawerFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const cleanupInput = Input.init(drawerElement);
  const drawerHeader = drawerElement.querySelector('.drawer__header');
  const statusWrap = drawerElement.querySelector('.new-production-drawer__status-wrap');
  const closeButton = drawerHeader?.querySelector('[data-drawer-close]');
  if (drawerHeader && statusWrap && closeButton) {
    statusWrap.classList.add('is-in-header');
    drawerHeader.insertBefore(statusWrap, closeButton);
  }

  const firstField = drawerElement.querySelector('#new-production-origin');
  if (firstField) firstField.setAttribute('data-drawer-autofocus', '');
  const scheduleModalId = 'kanban-schedule-modal';
  const rescheduleModalId = 'kanban-reschedule-modal';
  const tagsModalId = 'kanban-tags-modal';
  let scheduleModalCleanup = () => {};
  let scheduleModalReturnFocus = null;
  let scheduleModalState = createScheduleModalState();
  let rescheduleModalCleanup = () => {};
  let rescheduleModalReturnFocus = null;
  let tagsModalCleanup = () => {};
  let tagsModalReturnFocus = null;

  const handleTriggerClick = () => {
    drawerControls.open(triggerButton);
  };

  const closeScheduleModal = ({ restoreFocus = true } = {}) => {
    closeRescheduleModal({ restoreFocus: false });
    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    scheduleModalCleanup();
    Modal.close(scheduleModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && scheduleModalReturnFocus && typeof scheduleModalReturnFocus.focus === 'function') {
      scheduleModalReturnFocus.focus();
    }
    scheduleModalReturnFocus = null;
  };

  const closeRescheduleModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${rescheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    rescheduleModalCleanup();
    Modal.close(rescheduleModalId);

    if (drawerElement.classList.contains('is-open') || document.querySelector(`[data-modal="${scheduleModalId}"]`)) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && rescheduleModalReturnFocus?.focus) {
      rescheduleModalReturnFocus.focus();
    }
    rescheduleModalReturnFocus = null;
  };

  const openRescheduleModal = ({ anchorEl = null, initialValues = {} } = {}) => {
    document.querySelector(`[data-modal="${rescheduleModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`)?.remove();

    const payload = {
      date: initialValues.date || toIsoDate(scheduleModalState.selectedDate),
      location: initialValues.location || '',
      responsible: initialValues.responsible || '',
    };

    rescheduleModalReturnFocus = anchorEl;
    document.body.insertAdjacentHTML('beforeend', createRescheduleModal({ modalId: rescheduleModalId, values: payload }));

    const modalElement = document.querySelector(`[data-modal="${rescheduleModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`);
    if (!modalElement || !backdropElement) return;

    const cleanupInput = Input.init(modalElement);
    const dateInput = modalElement.querySelector('#reschedule-date');
    const locationInput = modalElement.querySelector('#reschedule-location');
    const responsibleInput = modalElement.querySelector('#reschedule-responsible');
    const errorElement = modalElement.querySelector('[data-reschedule-error]');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const cancelButton = modalElement.querySelector('[data-reschedule-action="cancel"]');
    const confirmButton = modalElement.querySelector('[data-reschedule-action="confirm"]');

    const clearErrors = () => {
      if (errorElement) errorElement.hidden = true;
      [dateInput, locationInput, responsibleInput].forEach((input) => {
        input?.closest('.field')?.classList.remove('field--error');
      });
    };

    const validate = () => {
      clearErrors();
      const invalid = [];
      if (!dateInput?.value) invalid.push(dateInput);
      if (!locationInput?.value?.trim()) invalid.push(locationInput);
      if (!responsibleInput?.value?.trim()) invalid.push(responsibleInput);

      if (!invalid.length) return true;
      invalid.forEach((input) => input?.closest('.field')?.classList.add('field--error'));
      if (errorElement) errorElement.hidden = false;
      invalid[0]?.focus?.();
      return false;
    };

    const handleClose = () => closeRescheduleModal();
    const handleBackdrop = (event) => {
      if (event.target !== backdropElement) return;
      closeRescheduleModal();
    };
    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closeRescheduleModal();
    };
    const handleConfirm = () => {
      if (!validate()) return;
      console.log('Reagendar confirmado', {
        data: dateInput?.value || '',
        localizacao: locationInput?.value?.trim() || '',
        responsavel: responsibleInput?.value?.trim() || '',
      });
      closeRescheduleModal();
    };

    closeButton?.addEventListener('click', handleClose);
    cancelButton?.addEventListener('click', handleClose);
    confirmButton?.addEventListener('click', handleConfirm);
    backdropElement.addEventListener('click', handleBackdrop);
    document.addEventListener('keydown', handleKeydown, true);
    [dateInput, locationInput, responsibleInput].forEach((input) => {
      input?.addEventListener('input', clearErrors);
    });

    rescheduleModalCleanup = () => {
      closeButton?.removeEventListener('click', handleClose);
      cancelButton?.removeEventListener('click', handleClose);
      confirmButton?.removeEventListener('click', handleConfirm);
      backdropElement.removeEventListener('click', handleBackdrop);
      document.removeEventListener('keydown', handleKeydown, true);
      [dateInput, locationInput, responsibleInput].forEach((input) => {
        input?.removeEventListener('input', clearErrors);
      });
      if (typeof cleanupInput === 'function') cleanupInput();
      rescheduleModalCleanup = () => {};
    };

    Modal.open(rescheduleModalId);
    setTimeout(() => {
      if (dateInput?.focus) dateInput.focus();
    }, 120);
  };

  const applySelectedScheduleDate = () => {
    const dateInput = drawerElement.querySelector('#new-production-scheduling-date');
    if (!dateInput) return;
    dateInput.value = toIsoDate(scheduleModalState.selectedDate);
    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const openScheduleModal = (returnFocusButton) => {
    const existingModal = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const existingBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (existingModal) existingModal.remove();
    if (existingBackdrop) existingBackdrop.remove();

    scheduleModalState = createScheduleModalState();
    scheduleModalReturnFocus = returnFocusButton || null;

    document.body.insertAdjacentHTML('beforeend', createScheduleModal({
      modalId: scheduleModalId,
      state: scheduleModalState,
    }));

    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const locationSelect = modalElement.querySelector('#schedule-location-select');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const handleCloseClick = () => closeScheduleModal();

    const handleBackdropClick = (event) => {
      if (event.target !== modalBackdrop) return;
      closeScheduleModal();
    };

    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      if (document.querySelector(`[data-modal="${rescheduleModalId}"]`)) return;
      event.preventDefault();
      event.stopPropagation();
      closeScheduleModal();
    };

    const handleModalClick = (event) => {
      const actionButton = event.target.closest('[data-schedule-action]');
      if (actionButton) {
        const action = actionButton.dataset.scheduleAction;
        if (action === 'back') {
          closeScheduleModal();
          return;
        }
        if (action === 'select-date') {
          applySelectedScheduleDate();
          closeScheduleModal();
          return;
        }
      }

      const viewButton = event.target.closest('[data-schedule-view]');
      if (viewButton) {
        scheduleModalState.viewMode = viewButton.dataset.scheduleView === 'month' ? 'month' : 'week';
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const navButton = event.target.closest('[data-schedule-nav]');
      if (navButton) {
        const direction = navButton.dataset.scheduleNav === 'prev' ? -1 : 1;
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = addMonths(scheduleModalState.currentDate, direction);
        } else {
          scheduleModalState.selectedDate = addDays(scheduleModalState.selectedDate, direction * 7);
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const dayButton = event.target.closest('[data-schedule-date]');
      if (dayButton) {
        const selectedDate = parseIsoDate(dayButton.dataset.scheduleDate);
        if (!selectedDate) return;
        scheduleModalState.selectedDate = selectedDate;
        scheduleModalState.currentDate = cloneDate(selectedDate);
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const reagendarButton = event.target.closest('[data-schedule-reagendar]');
      if (reagendarButton) {
        openRescheduleModal({
          anchorEl: reagendarButton,
          initialValues: {
            date: toIsoDate(scheduleModalState.selectedDate),
            location: locationSelect?.value || '',
            responsible: '',
          },
        });
      }
    };

    modalBackdrop.addEventListener('click', handleBackdropClick);
    modalElement.addEventListener('click', handleModalClick);
    if (closeButton) closeButton.addEventListener('click', handleCloseClick);
    document.addEventListener('keydown', handleKeydown, true);

    scheduleModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleBackdropClick);
      modalElement.removeEventListener('click', handleModalClick);
      if (closeButton) closeButton.removeEventListener('click', handleCloseClick);
      document.removeEventListener('keydown', handleKeydown, true);
      scheduleModalCleanup = () => {};
    };

    Modal.open(scheduleModalId);
    updateScheduleModalUi(modalElement, scheduleModalState);
    if (locationSelect && typeof locationSelect.focus === 'function') {
      setTimeout(() => locationSelect.focus(), 140);
    }
  };

  const closeTagsModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${tagsModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${tagsModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    tagsModalCleanup();
    Modal.close(tagsModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && tagsModalReturnFocus?.focus) {
      tagsModalReturnFocus.focus();
    }
    tagsModalReturnFocus = null;
  };

  const openTagsModal = (returnFocusButton) => {
    document.querySelector(`[data-modal="${tagsModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${tagsModalId}"]`)?.remove();

    tagsModalReturnFocus = returnFocusButton || null;
    document.body.insertAdjacentHTML('beforeend', createNewProductionTagsModal({ modalId: tagsModalId }));

    const modalElement = document.querySelector(`[data-modal="${tagsModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${tagsModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const searchInput = modalElement.querySelector('[data-new-production-tags-search]');
    const closeButton = modalElement.querySelector('[data-modal-close]');

    const handleClose = () => closeTagsModal();
    const handleBackdrop = (event) => {
      if (event.target !== modalBackdrop) return;
      closeTagsModal();
    };
    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closeTagsModal();
    };
    const handleModalClick = (event) => {
      const actionButton = event.target.closest('[data-new-production-tags-action]');
      if (!actionButton) return;

      const action = actionButton.dataset.newProductionTagsAction;
      if (action === 'cancel' || action === 'save') {
        closeTagsModal();
        return;
      }
      if (action === 'remove') {
        actionButton.closest('.new-production-tags-modal__chip')?.remove();
      }
    };

    modalBackdrop.addEventListener('click', handleBackdrop);
    modalElement.addEventListener('click', handleModalClick);
    closeButton?.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleKeydown, true);

    tagsModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleBackdrop);
      modalElement.removeEventListener('click', handleModalClick);
      closeButton?.removeEventListener('click', handleClose);
      document.removeEventListener('keydown', handleKeydown, true);
      tagsModalCleanup = () => {};
    };

    Modal.open(tagsModalId);
    if (searchInput?.focus) {
      setTimeout(() => searchInput.focus(), 120);
    }
  };

  const handleDrawerClick = (event) => {
    const actionButton = event.target.closest('[data-new-production-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.newProductionAction;
    if (action === 'cancel') {
      closeTagsModal({ restoreFocus: false });
      drawerControls.close();
      return;
    }

    if (action === 'consult-agenda') {
      openScheduleModal(actionButton);
      return;
    }

    if (action === 'open-tags') {
      openTagsModal(actionButton);
      return;
    }

    const form = drawerElement.querySelector('[data-new-production-form]');
    if (!form) return;

    if (action === 'clear') {
      clearNewProductionForm(form);
      return;
    }

    if (action === 'save') {
      console.log('Salvar nova produção', serializeNewProductionForm(form));
      return;
    }

    if (action === 'create-op') {
      const valid = validateNewProductionForm(form);
      if (!valid) return;
      console.log('Criar OP', serializeNewProductionForm(form));
    }
  };

  triggerButton.addEventListener('click', handleTriggerClick);
  drawerElement.addEventListener('click', handleDrawerClick);

  return () => {
    closeScheduleModal({ restoreFocus: false });
    closeTagsModal({ restoreFocus: false });
    triggerButton.removeEventListener('click', handleTriggerClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (drawerControls.cleanup) drawerControls.cleanup();

    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createScheduleModalState() {
  const baseDate = new Date(2026, 0, 14);
  return {
    selectedDate: baseDate,
    currentDate: baseDate,
    viewMode: 'week',
  };
}

function cloneDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value) {
  if (!value || typeof value !== 'string') return null;
  const [year, month, day] = value.split('-').map(Number);
  if ([year, month, day].some(Number.isNaN)) return null;
  return new Date(year, month - 1, day);
}

function isSameDate(left, right) {
  if (!left || !right) return false;
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function startOfWeek(date) {
  const result = cloneDate(date);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function addDays(date, amount) {
  const result = cloneDate(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function addMonths(date, amount) {
  const result = cloneDate(date);
  result.setMonth(result.getMonth() + amount);
  return result;
}

function formatMonthYear(date) {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function formatWeekRange(date) {
  const start = startOfWeek(date);
  const end = addDays(start, 6);
  const monthName = formatMonthYear(end).replace(` ${end.getFullYear()}`, '');
  return `${String(start.getDate()).padStart(2, '0')} - ${String(end.getDate()).padStart(2, '0')} de ${monthName} ${end.getFullYear()}`;
}

function getScheduleDayVolume(date) {
  if (date.getFullYear() !== 2026 || date.getMonth() !== 0) return '';
  const days = new Set([12, 13, 14, 15, 16]);
  return days.has(date.getDate()) ? '15.000' : '';
}

function createScheduleDayCell({ date, selectedDate, currentMonth = null }) {
  const isoDate = toIsoDate(date);
  const isSelected = isSameDate(date, selectedDate);
  const isOutsideMonth = currentMonth !== null && date.getMonth() !== currentMonth;
  const volume = getScheduleDayVolume(date);

  return `
    <button type="button" class="schedule-modal__day${isSelected ? ' is-selected' : ''}${isOutsideMonth ? ' is-outside-month' : ''}" data-schedule-date="${isoDate}">
      <span class="schedule-modal__day-number">${date.getDate()}</span>
      <span class="schedule-modal__day-qty">${volume}</span>
    </button>
  `;
}

function renderWeekCalendar(state) {
  const weekStart = startOfWeek(state.selectedDate);
  const dayCells = Array.from({ length: 7 }, (_, index) => (
    createScheduleDayCell({
      date: addDays(weekStart, index),
      selectedDate: state.selectedDate,
    })
  )).join('');

  return `
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${dayCells}</div>
  `;
}

function renderMonthCalendar(state) {
  const monthStart = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
  const gridStart = addDays(monthStart, -monthStart.getDay());
  const dayCells = Array.from({ length: 42 }, (_, index) => (
    createScheduleDayCell({
      date: addDays(gridStart, index),
      selectedDate: state.selectedDate,
      currentMonth: monthStart.getMonth(),
    })
  )).join('');

  return `
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${dayCells}</div>
  `;
}

function renderScheduleCalendar(state) {
  const modeClass = state.viewMode === 'month' ? 'schedule-modal__calendar-grid--month' : 'schedule-modal__calendar-grid--week';
  const content = state.viewMode === 'month' ? renderMonthCalendar(state) : renderWeekCalendar(state);
  return `<div class="schedule-modal__calendar-grid ${modeClass}">${content}</div>`;
}

function updateScheduleModalUi(modalElement, state) {
  if (!modalElement || !state) return;

  const period = modalElement.querySelector('[data-schedule-period]');
  if (period) {
    period.textContent = state.viewMode === 'month'
      ? formatMonthYear(state.currentDate)
      : formatWeekRange(state.selectedDate);
  }

  const calendarContainer = modalElement.querySelector('[data-schedule-calendar]');
  if (calendarContainer) {
    calendarContainer.classList.toggle('schedule-modal__calendar--month', state.viewMode === 'month');
    calendarContainer.classList.toggle('schedule-modal__calendar--week', state.viewMode === 'week');
    calendarContainer.innerHTML = renderScheduleCalendar(state);
  }

  modalElement.querySelectorAll('[data-schedule-view]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.scheduleView === state.viewMode);
  });

  const title = modalElement.querySelector('[data-schedule-day-title]');
  if (title) title.textContent = `Agendamentos para o dia ${state.selectedDate.getDate()}`;
}

function createScheduleModal(options = {}) {
  const { modalId = 'kanban-schedule-modal', state = createScheduleModalState() } = options;

  return Modal.create({
    id: modalId,
    title: 'Agendamento',
    size: 'xl',
    className: 'schedule-modal',
    body: createScheduleModalBody(state),
    footer: createScheduleModalFooter(),
  });
}

function createScheduleModalBody(state) {
  return `
    <div class="schedule-modal__content">
      ${Input.createSelect({
        id: 'schedule-location-select',
        label: 'Selecionar localização',
        required: true,
        placeholder: 'Selecionar...',
        items: [
          { label: 'Estufa 1', value: 'estufa-1' },
          { label: 'Estufa 2', value: 'estufa-2' },
        ],
      })}

      <div class="schedule-modal__period-row">
        <span class="schedule-modal__period-text" data-schedule-period>${formatWeekRange(state.selectedDate)}</span>
        <div class="schedule-modal__period-nav">
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="prev" aria-label="Periodo anterior">${icon('chevron-left', { size: 14 })}</button>
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="next" aria-label="Proximo periodo">${icon('chevron-right', { size: 14 })}</button>
        </div>
      </div>

      <div class="schedule-modal__view-toggle">
        <button type="button" class="schedule-modal__view-btn ${state.viewMode === 'month' ? 'is-active' : ''}" data-schedule-view="month">Mês</button>
        <button type="button" class="schedule-modal__view-btn ${state.viewMode === 'week' ? 'is-active' : ''}" data-schedule-view="week">Semana</button>
      </div>

      <div class="schedule-modal__calendar schedule-modal__calendar--week" data-schedule-calendar>
        ${renderScheduleCalendar(state)}
      </div>

      <div class="schedule-modal__table-header">
        <h3 class="schedule-modal__table-title" data-schedule-day-title>Agendamentos para o dia ${state.selectedDate.getDate()}</h3>
        <span class="schedule-modal__table-total">Quantidade de mudas agendadas: <strong>15.000</strong></span>
      </div>

      <div class="schedule-modal__table-wrap">
        <table class="schedule-modal__table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Ordem de Produção</th>
              <th>Cultura</th>
              <th>Quantidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome do cliente</td>
              <td>Ordem de produção</td>
              <td>Cultura</td>
              <td>Quantidade</td>
              <td><button type="button" class="schedule-modal__reagendar" data-schedule-reagendar data-client="Nome do cliente" data-order="Ordem de produção" data-culture="Cultura" data-quantity="Quantidade">Reagendar</button></td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>Ordem de produção</td>
              <td>Cultura</td>
              <td>Quantidade</td>
              <td><button type="button" class="schedule-modal__reagendar" data-schedule-reagendar data-client="Nome do cliente" data-order="Ordem de produção" data-culture="Cultura" data-quantity="Quantidade">Reagendar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function createScheduleModalFooter() {
  return `
    <div class="schedule-modal__footer">
      ${Button.create({ text: 'Voltar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-schedule-action="back"')}
      ${Button.create({ text: 'Selecionar data', variant: 'primary', size: 'sm' }).replace('<button', '<button data-schedule-action="select-date"')}
    </div>
  `;
}

function createRescheduleModal(options = {}) {
  const {
    modalId = 'kanban-reschedule-modal',
    values = {},
  } = options;

  const dateField = Input.create({
    id: 'reschedule-date',
    type: 'date',
    label: 'Data',
    required: true,
    value: values.date || '',
    className: 'reschedule-modal__date-field',
  });

  const locationField = Input.create({
    id: 'reschedule-location',
    label: 'Localização',
    required: true,
    placeholder: 'Nome da localização',
    value: values.location || '',
  });

  const responsibleField = Input.create({
    id: 'reschedule-responsible',
    label: 'Responsável',
    required: true,
    placeholder: 'Nome do responsável',
    value: values.responsible || '',
  });

  const cancelButton = Button.create({
    text: 'Cancelar',
    variant: 'outline-dark',
    size: 'sm',
  }).replace('<button', '<button data-reschedule-action="cancel"');

  const confirmButton = Button.create({
    text: 'Confirmar',
    variant: 'primary',
    size: 'sm',
  }).replace('<button', '<button data-reschedule-action="confirm"');

  return Modal.create({
    id: modalId,
    title: 'Agendamento',
    size: 'sm',
    className: 'reschedule-modal',
    body: `
      <div class="reschedule-modal__content">
        ${dateField}
        ${locationField}
        ${responsibleField}
        <span class="reschedule-modal__error" data-reschedule-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,
    footer: `
      <div class="reschedule-modal__footer">
        ${cancelButton}
        ${confirmButton}
      </div>
    `,
  });
}

function createNewProductionDrawerContent() {
  return `
    <section class="new-production-drawer">
      <div class="new-production-drawer__status-wrap">
        <span class="new-production-drawer__status">Aguardando Aprovação</span>
      </div>

      <div class="new-production-drawer__scroll">
        <form class="new-production-form" data-new-production-form novalidate>
          <section class="new-production-section">
            <h3 class="new-production-section__title">${icon('file', { size: 14 })}Informações da Produção</h3>
            <div class="new-production-card">
              ${Input.createSelect({
                id: 'new-production-origin',
                label: 'Origem',
                required: true,
                value: 'producao-propria',
                items: [{ label: 'Produção própria', value: 'producao-propria' }],
              })}

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-erp',
                  label: 'Código ERP',
                  required: true,
                  placeholder: 'Código ERP',
                })}
                ${Input.create({
                  id: 'new-production-cpf-cnpj',
                  label: 'CPF/CNPJ',
                  required: true,
                  placeholder: 'Produção própria',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-business-name',
                  label: 'Razão Social/Nome',
                  required: true,
                  placeholder: 'Classe',
                })}
                ${Input.create({
                  id: 'new-production-fantasy-name',
                  label: 'Nome Fantasia/Apelido',
                  required: true,
                  placeholder: 'EX: MUD-1',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-responsible',
                  label: 'Responsável',
                  required: true,
                  placeholder: 'Digite nome da classe',
                })}
                ${Input.create({
                  id: 'new-production-class',
                  label: 'Classe',
                  required: true,
                  placeholder: 'EX: MUD-1',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-product-code',
                  label: 'Cód. do Produto',
                  required: true,
                  placeholder: 'EX: MUD-1',
                })}
                ${Input.create({
                  id: 'new-production-product',
                  label: 'Produto',
                  required: true,
                  placeholder: 'Nome do produto',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-quantity',
                  label: 'Quantidade',
                  required: true,
                  placeholder: 'Nome do responsável',
                })}
                ${Input.create({
                  id: 'new-production-location',
                  label: 'Localização',
                  required: true,
                  placeholder: 'Digite a localização',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-scheduling-date',
                  type: 'date',
                  label: 'Data de Agendamento Semeio',
                  required: true,
                  className: 'new-production-date-field',
                  iconRight: icon('calendar', { size: 16 }),
                })}
                <div class="new-production-agenda-btn-wrap">
                  ${Button.create({ text: '+ Consultar agenda', variant: 'outline-dark' }).replace('<button', '<button data-new-production-action="consult-agenda"')}
                </div>
              </div>

              <div class="new-production-type">
                <div class="new-production-chip-row">
                  ${Chip.createSingle({ label: 'Enxertia', value: 'enxertia', selected: true, size: 'sm' })}
                </div>
              </div>

              ${Input.create({
                id: 'new-production-notes',
                type: 'textarea',
                label: 'Observações',
                required: true,
                rows: 2,
              })}

              <div class="new-production-tags">
                <span class="new-production-field-label">Etiqueta</span>
                <div class="new-production-chip-row new-production-chip-row--tags">
                  ${Chip.createSingle({ label: 'Normal', value: 'normal', size: 'sm', className: 'new-production-chip--normal' })}
                  ${Chip.createSingle({ label: 'Prioritário', value: 'prioritario', size: 'sm', className: 'new-production-chip--prioritario' })}
                  ${Chip.createSingle({ label: 'Urgente', value: 'urgente', size: 'sm', className: 'new-production-chip--urgente' })}
                  ${Chip.createSingle({ label: '+ Adicionar etiqueta', value: 'add-tag', size: 'sm' }).replace('<button', '<button data-new-production-action="open-tags"')}
                </div>
              </div>

              <div class="new-production-actions">
                <button type="button" class="new-production-clear-link" data-new-production-action="clear">Limpar campos</button>
                ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-new-production-action="save"')}
              </div>
            </div>
          </section>

          <section class="new-production-section">
            <h3 class="new-production-section__title">${icon('settings', { size: 14 })}Informações para Semeio</h3>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Enxerto</h4>
              ${createNewProductionSeedTable()}
            </div>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Porta-enxerto</h4>
              ${createNewProductionSeedTable()}
            </div>
          </section>
        </form>
      </div>
    </section>
  `;
}

function createNewProductionTagsModal(options = {}) {
  const { modalId = 'kanban-tags-modal' } = options;
  const cancelButton = Button.create({ text: 'Cancelar', style: 'text', variant: 'primary', size: 'sm' })
    .replace('<button', '<button data-new-production-tags-action="cancel"');
  const saveButton = Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' })
    .replace('<button', '<button data-new-production-tags-action="save"');

  return Modal.create({
    id: modalId,
    title: 'Etiquetas',
    size: 'sm',
    className: 'new-production-tags-modal',
    body: `
      <div class="new-production-tags-modal__content">
        <div class="new-production-tags-modal__search">
          <input type="text" class="new-production-tags-modal__input" placeholder="Buscar etiquetas" data-new-production-tags-search />
          <span class="new-production-tags-modal__search-icon" aria-hidden="true">${icon('search', { size: 14 })}</span>
        </div>
        <div class="new-production-tags-modal__create">
          <input type="text" class="new-production-tags-modal__input" placeholder="Nova etiqueta" />
          <button type="button" class="new-production-tags-modal__add-btn">Adicionar ${icon('arrow-right', { size: 14 })}</button>
        </div>
        <div class="new-production-tags-modal__group">
          <div class="new-production-tags-modal__group-title">
            <span class="new-production-tags-modal__group-icon" aria-hidden="true">${icon('filter', { size: 14 })}</span>
            <span>Etiquetas</span>
          </div>
          <div class="new-production-tags-modal__chips">
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--blue" aria-hidden="true"></span>
              <span>Em trajeto</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${icon('close', { size: 12 })}</button>
            </div>
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--green" aria-hidden="true"></span>
              <span>Faturado</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${icon('close', { size: 12 })}</button>
            </div>
          </div>
        </div>
      </div>
    `,
    footer: `
      <div class="new-production-tags-modal__footer">
        ${cancelButton}
        ${saveButton}
      </div>
    `,
  });
}

function createNewProductionSeedTable() {
  return `
    <div class="new-production-table-wrap">
      <table class="new-production-table" aria-label="Informações para semeio">
        <thead>
          <tr>
            <th>Código do Produto</th>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function createNewProductionDrawerFooter() {
  return `
    <div class="new-production-footer">
      ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-new-production-action="cancel"')}
      ${Button.create({ text: 'Criar OP', variant: 'primary', size: 'sm' }).replace('<button', '<button data-new-production-action="create-op"')}
    </div>
  `;
}

function clearNewProductionForm(form) {
  if (!form) return;
  const fields = form.querySelectorAll('input, select, textarea');
  fields.forEach((field) => {
    const tagName = field.tagName.toLowerCase();
    if (tagName === 'select') {
      field.selectedIndex = 0;
      return;
    }
    if (field.type === 'date') {
      field.value = '';
      return;
    }
    field.value = '';
  });
}

function serializeNewProductionForm(form) {
  const data = {};
  if (!form) return data;
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

function validateNewProductionForm(form) {
  if (!form) return false;
  const requiredFields = form.querySelectorAll('[required]');
  let firstInvalid = null;

  requiredFields.forEach((field) => {
    const value = (field.value || '').trim();
    if (value) return;
    if (!firstInvalid) firstInvalid = field;
  });

  if (!firstInvalid) return true;
  if (typeof firstInvalid.focus === 'function') firstInvalid.focus();
  return false;
}

function initSchedulingDrawer() {
  const board = document.getElementById('kanban-board');
  if (!board) return () => {};

  const drawerId = 'kanban-scheduling-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createSchedulingDrawerContent(),
    footer: createSchedulingDrawerFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const cleanupInput = Input.init(drawerElement);

  const tabsRoot = drawerElement.querySelector('#scheduling-tabs')?.closest('[data-tabs]');
  const autofocusTarget = tabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (autofocusTarget) autofocusTarget.setAttribute('data-drawer-autofocus', '');
  const scheduleModalId = 'kanban-schedule-modal-scheduling';
  let scheduleModalState = createScheduleModalState();
  let scheduleModalCleanup = () => {};
  let scheduleModalReturnFocus = null;

  const closeScheduleModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    scheduleModalCleanup();
    Modal.close(scheduleModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && scheduleModalReturnFocus?.focus) {
      scheduleModalReturnFocus.focus();
    }
    scheduleModalReturnFocus = null;
  };

  const openScheduleModal = (returnFocusButton) => {
    document.querySelector(`[data-modal="${scheduleModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`)?.remove();

    scheduleModalState = createScheduleModalState();
    scheduleModalReturnFocus = returnFocusButton || null;

    document.body.insertAdjacentHTML('beforeend', createScheduleModal({
      modalId: scheduleModalId,
      state: scheduleModalState,
    }));

    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const locationSelect = modalElement.querySelector('#schedule-location-select');
    const closeButton = modalElement.querySelector('[data-modal-close]');

    const handleCloseClick = () => closeScheduleModal();
    const handleBackdropClick = (evt) => {
      if (evt.target !== modalBackdrop) return;
      closeScheduleModal();
    };
    const handleKeydown = (evt) => {
      if (evt.key !== 'Escape') return;
      evt.preventDefault();
      evt.stopPropagation();
      closeScheduleModal();
    };
    const handleModalClick = (evt) => {
      const actionButton = evt.target.closest('[data-schedule-action]');
      if (actionButton) {
        const modalAction = actionButton.dataset.scheduleAction;
        if (modalAction === 'back') {
          closeScheduleModal();
          return;
        }
        if (modalAction === 'select-date') {
          const dateInput = drawerElement.querySelector('#scheduling-date-input');
          if (dateInput) {
            dateInput.value = toIsoDate(scheduleModalState.selectedDate);
            dateInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          closeScheduleModal();
          return;
        }
      }

      const viewButton = evt.target.closest('[data-schedule-view]');
      if (viewButton) {
        scheduleModalState.viewMode = viewButton.dataset.scheduleView === 'month' ? 'month' : 'week';
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const navButton = evt.target.closest('[data-schedule-nav]');
      if (navButton) {
        const direction = navButton.dataset.scheduleNav === 'prev' ? -1 : 1;
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = addMonths(scheduleModalState.currentDate, direction);
        } else {
          scheduleModalState.selectedDate = addDays(scheduleModalState.selectedDate, direction * 7);
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const dayButton = evt.target.closest('[data-schedule-date]');
      if (dayButton) {
        const selectedDate = parseIsoDate(dayButton.dataset.scheduleDate);
        if (!selectedDate) return;
        scheduleModalState.selectedDate = selectedDate;
        scheduleModalState.currentDate = cloneDate(selectedDate);
        updateScheduleModalUi(modalElement, scheduleModalState);
      }
    };

    modalBackdrop.addEventListener('click', handleBackdropClick);
    modalElement.addEventListener('click', handleModalClick);
    closeButton?.addEventListener('click', handleCloseClick);
    document.addEventListener('keydown', handleKeydown, true);

    scheduleModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleBackdropClick);
      modalElement.removeEventListener('click', handleModalClick);
      closeButton?.removeEventListener('click', handleCloseClick);
      document.removeEventListener('keydown', handleKeydown, true);
      scheduleModalCleanup = () => {};
    };

    Modal.open(scheduleModalId);
    updateScheduleModalUi(modalElement, scheduleModalState);
    if (locationSelect?.focus) {
      setTimeout(() => locationSelect.focus(), 120);
    }
  };

  const handleBoardClick = (event) => {
    const card = event.target.closest('.kanban-card');
    if (card && board.contains(card)) {
      const column = card.closest('[data-column-id]');
      if (!column || column.dataset.columnId !== 'aguardando-aprovacao') return;

      const cardCode = event.target.closest('.kanban-card__code');
      if (cardCode) event.preventDefault();

      drawerControls.open(card);
      return;
    }

    const columnTitle = event.target.closest('.kanban-column__title');
    if (!columnTitle || !board.contains(columnTitle)) return;

    const column = columnTitle.closest('[data-column-id]');
    if (!column || column.dataset.columnId !== 'aguardando-aprovacao') return;

    const firstCard = Array.from(column.querySelectorAll('.kanban-card'))
      .find((columnCard) => columnCard.offsetParent !== null && !columnCard.hasAttribute('hidden'))
      || column.querySelector('.kanban-card');
    if (!firstCard) return;

    drawerControls.open(firstCard);
  };

  const handleTabsClick = (event) => {
    if (!tabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !tabsRoot.contains(clickedTab)) return;

    const tabIndex = Number(clickedTab.dataset.tab);
    if (Number.isNaN(tabIndex)) return;

    const tabs = tabsRoot.querySelectorAll('.tabs-tab');
    const panels = tabsRoot.parentElement?.querySelectorAll('.tabs-panel');

    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });

    if (!panels) return;
    panels.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
  };

  const handleDrawerClick = (event) => {
    const actionButton = event.target.closest('[data-scheduling-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.schedulingAction;
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }

    if (action === 'consult-agenda') {
      openScheduleModal(actionButton);
      return;
    }

    if (action !== 'schedule') return;

    const dateInput = drawerElement.querySelector('#scheduling-date-input');
    const responsibleInput = drawerElement.querySelector('#scheduling-responsible-input');

    console.log({
      dataAgendamentoSemeio: dateInput?.value || '',
      responsavelColetaSemente: responsibleInput?.value || '',
    });
  };

  board.addEventListener('click', handleBoardClick);
  if (tabsRoot) tabsRoot.addEventListener('click', handleTabsClick);
  drawerElement.addEventListener('click', handleDrawerClick);

  return () => {
    closeScheduleModal({ restoreFocus: false });
    board.removeEventListener('click', handleBoardClick);
    if (tabsRoot) tabsRoot.removeEventListener('click', handleTabsClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (drawerControls.cleanup) drawerControls.cleanup();

    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createSchedulingDrawerContent() {
  const tabs = Tabs.createWithPanels({
    id: 'scheduling-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Detalhes e Planejamento', content: createSchedulingDetailsPanel() },
      { label: 'Histórico', content: createSchedulingHistoryPanel() },
    ],
  });

  return `
    <section class="scheduling-drawer">
      <div class="scheduling-drawer__summary">
        <p class="scheduling-drawer__subtitle">Fazenda Sol Nascente <span aria-hidden="true">•</span> Muda de Eucalipto Clone AEC 144</p>
        <span class="scheduling-drawer__status">Aguardando Agendamento</span>
      </div>
      ${tabs}
    </section>
  `;
}

function createSchedulingDetailsPanel() {
  const calendarIcon = icon('calendar', { size: 16 });

  return `
    <div class="scheduling-panel">
      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${icon('file', { size: 14 })}Informações Gerais</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${createSchedulingInfoField('Código ERP', '43242343')}
            ${createSchedulingInfoField('CPF/CNPJ', '123.456.789-00')}
            ${createSchedulingInfoField('Razão Social/Nome', 'Nome da razao social')}
            ${createSchedulingInfoField('Nome Fantasia/Apelido', 'Nome fantasia')}
            ${createSchedulingInfoField('Classe', 'Muda de Eucalipto Clone AEC 144')}
            ${createSchedulingInfoField('Código do Produto', '43423432')}
            ${createSchedulingInfoField('Produto', 'Muda de Eucalipto Clone AEC 144')}
            ${createSchedulingInfoField('Quantidade', '5.000')}
          </div>
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${icon('settings', { size: 14 })}Informações para Semeio</h3>
        <p class="scheduling-section__subtitle">Pé Franco</p>
        <div class="scheduling-table-wrap">
          <table class="scheduling-table" aria-label="Informações para semeio">
            <thead>
              <tr>
                <th>Código do Produto</th>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4324342</td>
                <td>Muda de Eucalipto Clone</td>
                <td>323124324</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="scheduling-section__actions">
          ${Button.create({ text: 'Gerar QR Code', variant: 'outline-dark' })}
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${icon('calendar', { size: 14 })}Planejamento e Datas</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${createSchedulingInfoField('Data do Pedido', '15/01/2025')}
            ${createSchedulingInfoField('Data Planejada do Pedido', '15/01/2025')}
          </div>
          <div class="scheduling-grid scheduling-grid--two scheduling-grid--inputs">
            ${Input.create({
              id: 'scheduling-date-input',
              type: 'date',
              label: 'Data de agendamento de Semeio',
              value: '2026-04-15',
              iconRight: calendarIcon,
              className: 'scheduling-date-field',
            })}
            ${Input.create({
              id: 'scheduling-responsible-input',
              label: 'Responsável coleta da semente',
              value: 'João da Silva',
            })}
          </div>
          <button type="button" class="scheduling-link" data-scheduling-action="consult-agenda">Consultar agenda</button>
        </div>
      </section>
    </div>
  `;
}

function createSchedulingHistoryPanel() {
  return `
    <div class="scheduling-history">
      Sem histórico no momento
    </div>
  `;
}

function createSchedulingInfoField(label, value) {
  return `
    <div class="scheduling-field">
      <span class="scheduling-field__label">${label}</span>
      <span class="scheduling-field__value">${value}</span>
    </div>
  `;
}

function createSchedulingDrawerFooter() {
  return `
    <div class="scheduling-footer">
      ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-scheduling-action="cancel"')}
      ${Button.create({ text: 'Agendar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-scheduling-action="schedule"')}
    </div>
  `;
}

function activateTabsPanel(tabsRoot, tabIndex) {
  if (!tabsRoot || Number.isNaN(tabIndex)) return;
  const tabs = tabsRoot.querySelectorAll('.tabs-tab');
  const tabsContent = tabsRoot.parentElement?.querySelector('.tabs-content');
  const panels = tabsContent
    ? Array.from(tabsContent.children).filter((element) => element.classList.contains('tabs-panel'))
    : null;

  tabs.forEach((tab, index) => {
    tab.classList.toggle('is-active', index === tabIndex);
    tab.setAttribute('aria-selected', String(index === tabIndex));
  });
  panels?.forEach((panel, index) => {
    panel.classList.toggle('is-active', index === tabIndex);
  });
}

function createOpDrawerSummary() {
  return `
    <div class="agendado-drawer__summary">
      <div class="agendado-drawer__summary-top">
        <div class="agendado-drawer__summary-left">
          <span class="agendado-meta">Cód. Pedido: <strong>001</strong></span>
          <span class="agendado-meta">Cód. Cliente: <strong>22332</strong></span>
          <span class="agendado-meta"><strong>Fazenda Sol Nascente</strong></span>
        </div>
        <div class="agendado-drawer__summary-right">
          ${Chip.createSingle({ label: 'Normal', value: 'normal', size: 'sm', className: 'agendado-chip--normal' })}
          ${Chip.createSingle({ label: 'Agendado', value: 'agendado', size: 'sm' })}
        </div>
      </div>
      <div class="agendado-drawer__summary-bottom">
        <div class="agendado-drawer__summary-left">
          <span class="agendado-meta">Cód. Produto: <strong>001</strong></span>
          <span class="agendado-meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
          <span class="agendado-meta">Qtd.: <strong>3.000</strong></span>
        </div>
        <div class="agendado-drawer__summary-right">
          ${Chip.createSingle({ label: 'Enxertia', value: 'enxertia', size: 'sm' })}
        </div>
      </div>
    </div>
  `;
}

function createOpDrawerTabs({ id, firstTabLabel, firstTabContent }) {
  return Tabs.createWithPanels({
    id,
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: firstTabLabel, content: firstTabContent },
      { label: 'Detalhes', content: createAgendadoDetalhesPanel() },
      { label: 'Ciclo', content: createAgendadoCicloPanel() },
    ],
  });
}

function extractAgendadoCardInfo(cardElement) {
  if (!cardElement) {
    return {
      code: '-',
      line1: '-',
      product: '-',
      quantity: '-',
      plannedDate: '-',
    };
  }

  const code = cardElement.querySelector('.kanban-card__code')?.textContent?.trim() || '-';
  const rows = Array.from(cardElement.querySelectorAll('.kanban-card__item')).map((row) => {
    const spans = Array.from(row.querySelectorAll('span')).map((span) => span.textContent?.trim() || '');
    return { label: spans[0] || '', value: spans[1] || '' };
  });

  const line1 = rows[0]?.label || '-';
  const quantityRow = rows.find((row) => /^qtd:/i.test(row.value) || /^qtd:/i.test(row.label)) || rows[1] || { label: '-', value: '-' };
  const product = quantityRow.label || '-';
  const quantityRaw = quantityRow.value || quantityRow.label || '-';
  const quantity = String(quantityRaw).replace(/^qtd:\s*/i, '').trim() || '-';
  const plannedDate = rows.find((row) => /^data planejada:/i.test(row.label) || /^data semeio:/i.test(row.label))?.value || '-';

  return {
    code,
    line1,
    product,
    quantity,
    plannedDate,
  };
}

function setAgendadoDetailsValueByLabel(drawerElement, label, value) {
  const fields = drawerElement.querySelectorAll('.agendado-details-field');
  fields.forEach((field) => {
    const labelElement = field.querySelector('.agendado-details-field__label');
    const valueElement = field.querySelector('.agendado-details-field__value');
    if (!labelElement || !valueElement) return;
    if ((labelElement.textContent || '').trim() !== label) return;
    valueElement.textContent = value || '-';
  });
}

function applyAgendadoCardInfo(drawerElement, cardInfo) {
  if (!drawerElement || !cardInfo) return;

  const { code = '-', line1 = '-', product = '-', quantity = '-', plannedDate = '-' } = cardInfo;
  const titleElement = drawerElement.querySelector('[data-drawer-title]');
  if (titleElement) titleElement.textContent = code;

  const summaryTopStrong = drawerElement.querySelectorAll('.agendado-drawer__summary-top .agendado-drawer__summary-left strong');
  if (summaryTopStrong[0]) summaryTopStrong[0].textContent = code;
  if (summaryTopStrong[2]) summaryTopStrong[2].textContent = line1;

  const summaryBottomStrong = drawerElement.querySelectorAll('.agendado-drawer__summary-bottom .agendado-drawer__summary-left strong');
  if (summaryBottomStrong[1]) summaryBottomStrong[1].textContent = product;
  if (summaryBottomStrong[2]) summaryBottomStrong[2].textContent = quantity;

  setAgendadoDetailsValueByLabel(drawerElement, 'CÃ³d. do Pedido', code);
  setAgendadoDetailsValueByLabel(drawerElement, 'Data Agendada do Semeio', plannedDate);
  setAgendadoDetailsValueByLabel(drawerElement, 'ResponsÃ¡vel agendamento', line1);
  setAgendadoDetailsValueByLabel(drawerElement, 'Produto', product);
  setAgendadoDetailsValueByLabel(drawerElement, 'Quantidade', quantity);

  const classValue = drawerElement.querySelector('.agendado-details-field--full .agendado-details-field__value');
  if (classValue) classValue.textContent = product;
}

function initAgendadoDrawer() {
  const board = document.getElementById('kanban-board');
  if (!board) return () => {};

  const drawerId = 'kanban-agendado-drawer';
  const germinacaoStageDrawerId = 'kanban-germinacao-drawer';
  const casaVegetacaoStageDrawerId = 'kanban-casa-vegetacao-drawer';
  const aguardandoEnxertiaDrawerId = 'kanban-aguardando-enxertia-drawer';
  const salaCorteDrawerId = 'kanban-sala-corte-drawer';
  const adaptacaoDrawerId = 'kanban-adaptacao-drawer';
  const salaFusaoDrawerId = 'kanban-sala-fusao-drawer';
  document.querySelector(`[data-drawer="${drawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${drawerId}"]`)?.remove();
  document.querySelector(`[data-drawer="${germinacaoStageDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${germinacaoStageDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer="${casaVegetacaoStageDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${casaVegetacaoStageDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer="${aguardandoEnxertiaDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${aguardandoEnxertiaDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer="${salaCorteDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${salaCorteDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer="${adaptacaoDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${adaptacaoDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer="${salaFusaoDrawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${salaFusaoDrawerId}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createAgendadoDrawerContent(),
    footer: createAgendadoDrawerFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const germinacaoDrawerHtml = Drawer.create({
    id: germinacaoStageDrawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createGerminacaoDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', germinacaoDrawerHtml);

  const casaVegetacaoDrawerHtml = Drawer.create({
    id: casaVegetacaoStageDrawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createCasaVegetacaoDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', casaVegetacaoDrawerHtml);

  const aguardandoEnxertiaDrawerHtml = Drawer.create({
    id: aguardandoEnxertiaDrawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createAguardandoEnxertiaDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', aguardandoEnxertiaDrawerHtml);

  const salaCorteDrawerHtml = Drawer.create({
    id: salaCorteDrawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createSalaCorteDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', salaCorteDrawerHtml);

  const adaptacaoDrawerHtml = Drawer.create({
    id: adaptacaoDrawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createAdaptacaoDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', adaptacaoDrawerHtml);

  const salaFusaoDrawerHtml = Drawer.create({
    id: salaFusaoDrawerId,
    title: 'OP-2025-006',
    width: 540,
    content: createSalaFusaoDrawerContent(),
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', salaFusaoDrawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};

  const germinacaoStageDrawerControls = Drawer.init({ id: germinacaoStageDrawerId, root: document });
  const germinacaoStageDrawerElement = document.querySelector(`[data-drawer="${germinacaoStageDrawerId}"]`);
  if (!germinacaoStageDrawerElement || !germinacaoStageDrawerControls) return () => {};
  const casaVegetacaoStageDrawerControls = Drawer.init({ id: casaVegetacaoStageDrawerId, root: document });
  const casaVegetacaoStageDrawerElement = document.querySelector(`[data-drawer="${casaVegetacaoStageDrawerId}"]`);
  if (!casaVegetacaoStageDrawerElement || !casaVegetacaoStageDrawerControls) return () => {};
  const aguardandoEnxertiaDrawerControls = Drawer.init({ id: aguardandoEnxertiaDrawerId, root: document });
  const aguardandoEnxertiaDrawerElement = document.querySelector(`[data-drawer="${aguardandoEnxertiaDrawerId}"]`);
  if (!aguardandoEnxertiaDrawerElement || !aguardandoEnxertiaDrawerControls) return () => {};
  const salaCorteDrawerControls = Drawer.init({ id: salaCorteDrawerId, root: document });
  const salaCorteDrawerElement = document.querySelector(`[data-drawer="${salaCorteDrawerId}"]`);
  if (!salaCorteDrawerElement || !salaCorteDrawerControls) return () => {};
  const adaptacaoDrawerControls = Drawer.init({ id: adaptacaoDrawerId, root: document });
  const adaptacaoDrawerElement = document.querySelector(`[data-drawer="${adaptacaoDrawerId}"]`);
  if (!adaptacaoDrawerElement || !adaptacaoDrawerControls) return () => {};
  const salaFusaoDrawerControls = Drawer.init({ id: salaFusaoDrawerId, root: document });
  const salaFusaoDrawerElement = document.querySelector(`[data-drawer="${salaFusaoDrawerId}"]`);
  if (!salaFusaoDrawerElement || !salaFusaoDrawerControls) return () => {};

  const cleanupInput = Input.init(drawerElement);
  const cleanupGerminacaoInput = Input.init(germinacaoStageDrawerElement);
  const cleanupCasaVegetacaoInput = Input.init(casaVegetacaoStageDrawerElement);
  const cleanupAguardandoEnxertiaInput = Input.init(aguardandoEnxertiaDrawerElement);
  const cleanupSalaCorteInput = Input.init(salaCorteDrawerElement);
  const cleanupAdaptacaoInput = Input.init(adaptacaoDrawerElement);
  const cleanupSalaFusaoInput = Input.init(salaFusaoDrawerElement);
  let germinacaoDrawerModulePromise = null;
  let germinacaoDrawerInstance = null;
  let germinacaoPreloadTimerId = null;
  let germinacaoPreloadIdleId = null;
  let isAgendadoDrawerDisposed = false;
  FileUpload.init(drawerElement);
  const scheduleModalId = 'kanban-schedule-modal-agendado';
  const rescheduleModalId = 'kanban-reschedule-modal-agendado';
  let scheduleModalCleanup = () => {};
  let rescheduleModalCleanup = () => {};
  let scheduleModalReturnFocus = null;
  let rescheduleModalReturnFocus = null;
  let scheduleModalState = createScheduleModalState();

  const tabsRoot = drawerElement.querySelector('#agendado-tabs')?.closest('[data-tabs]');
  const germinacaoTabsRoot = germinacaoStageDrawerElement.querySelector('#germinacao-tabs')?.closest('[data-tabs]');
  const casaVegetacaoTabsRoot = casaVegetacaoStageDrawerElement.querySelector('#casa-vegetacao-tabs')?.closest('[data-tabs]');
  const aguardandoEnxertiaTabsRoot = aguardandoEnxertiaDrawerElement.querySelector('#aguardando-enxertia-tabs')?.closest('[data-tabs]');
  const salaCorteTabsRoot = salaCorteDrawerElement.querySelector('#sala-corte-tabs')?.closest('[data-tabs]');
  const adaptacaoTabsRoot = adaptacaoDrawerElement.querySelector('#adaptacao-tabs')?.closest('[data-tabs]');
  const salaFusaoTabsRoot = salaFusaoDrawerElement.querySelector('#sala-fusao-tabs')?.closest('[data-tabs]');
  const autofocusTarget = tabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (autofocusTarget) autofocusTarget.setAttribute('data-drawer-autofocus', '');
  const germinacaoAutofocusTarget = germinacaoTabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (germinacaoAutofocusTarget) germinacaoAutofocusTarget.setAttribute('data-drawer-autofocus', '');
  const casaVegetacaoAutofocusTarget = casaVegetacaoTabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (casaVegetacaoAutofocusTarget) casaVegetacaoAutofocusTarget.setAttribute('data-drawer-autofocus', '');
  const aguardandoEnxertiaAutofocusTarget = aguardandoEnxertiaTabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (aguardandoEnxertiaAutofocusTarget) aguardandoEnxertiaAutofocusTarget.setAttribute('data-drawer-autofocus', '');
  const salaCorteAutofocusTarget = salaCorteTabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (salaCorteAutofocusTarget) salaCorteAutofocusTarget.setAttribute('data-drawer-autofocus', '');
  const adaptacaoAutofocusTarget = adaptacaoTabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (adaptacaoAutofocusTarget) adaptacaoAutofocusTarget.setAttribute('data-drawer-autofocus', '');
  const salaFusaoAutofocusTarget = salaFusaoTabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (salaFusaoAutofocusTarget) salaFusaoAutofocusTarget.setAttribute('data-drawer-autofocus', '');

  const openDrawerFromColumnCard = ({ columnId = '', card = null } = {}) => {
    if (!card || !columnId) return;

    if (columnId === 'agendado') {
      const cardInfo = extractAgendadoCardInfo(card);
      applyAgendadoCardInfo(drawerElement, cardInfo);
      drawerControls.open(card);
      return;
    }

    if (columnId === 'germinacao') {
      germinacaoStageDrawerControls.open(card);
      return;
    }

    if (columnId === 'casa-vegetacao') {
      casaVegetacaoStageDrawerControls.open(card);
      return;
    }

    if (columnId === 'aguardando-enxertia') {
      aguardandoEnxertiaDrawerControls.open(card);
      return;
    }

    if (columnId === 'sala-corte') {
      salaCorteDrawerControls.open(card);
      return;
    }

    if (columnId === 'adaptacao') {
      adaptacaoDrawerControls.open(card);
      return;
    }

    if (columnId === 'sala-fusao') {
      salaFusaoDrawerControls.open(card);
      return;
    }

    if (columnId === 'semeio') {
      void openGerminacaoDrawer(card);
    }
  };

  const getFirstVisibleColumnCard = (columnElement) => {
    if (!columnElement) return null;
    const cards = Array.from(columnElement.querySelectorAll('.kanban-card'));
    if (!cards.length) return null;
    return cards.find((card) => card.offsetParent !== null && !card.hasAttribute('hidden')) || cards[0] || null;
  };

  const handleBoardClick = (event) => {
    const card = event.target.closest('.kanban-card');
    if (card && board.contains(card)) {
      const cardCode = event.target.closest('.kanban-card__code');
      if (cardCode) event.preventDefault();

      const column = card.closest('[data-column-id]');
      const columnId = column?.dataset.columnId;
      if (!columnId) return;
      openDrawerFromColumnCard({ columnId, card });
      return;
    }

    const columnTitle = event.target.closest('.kanban-column__title');
    if (!columnTitle || !board.contains(columnTitle)) return;
    const column = columnTitle.closest('[data-column-id]');
    const columnId = column?.dataset.columnId;
    if (!columnId) return;
    const firstCard = getFirstVisibleColumnCard(column);
    if (!firstCard) return;
    openDrawerFromColumnCard({ columnId, card: firstCard });
  };

  const handleAgendadoTabsClick = (event) => {
    if (!tabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !tabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(tabsRoot, tabIndex);
  };

  const handleGerminacaoTabsClick = (event) => {
    if (!germinacaoTabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !germinacaoTabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(germinacaoTabsRoot, tabIndex);
  };

  const handleCasaVegetacaoTabsClick = (event) => {
    if (!casaVegetacaoTabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !casaVegetacaoTabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(casaVegetacaoTabsRoot, tabIndex);
  };

  const handleAguardandoEnxertiaTabsClick = (event) => {
    if (!aguardandoEnxertiaTabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !aguardandoEnxertiaTabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(aguardandoEnxertiaTabsRoot, tabIndex);
  };

  const handleSalaCorteTabsClick = (event) => {
    if (!salaCorteTabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !salaCorteTabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(salaCorteTabsRoot, tabIndex);
  };

  const handleAdaptacaoTabsClick = (event) => {
    if (!adaptacaoTabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !adaptacaoTabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(adaptacaoTabsRoot, tabIndex);
  };

  const handleSalaFusaoTabsClick = (event) => {
    if (!salaFusaoTabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !salaFusaoTabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    activateTabsPanel(salaFusaoTabsRoot, tabIndex);
  };

  const handleCommonOpDrawerClick = (event, targetDrawerElement, { onOpenSemeioDrawer } = {}) => {
    const detailsTab = event.target.closest('[data-agendado-details-tab]');
    if (detailsTab) {
      const detailsRoot = targetDrawerElement.querySelector('[data-agendado-details]');
      const targetPanel = detailsTab.dataset.agendadoDetailsTab;
      if (!detailsRoot || !targetPanel) return true;

      detailsRoot.querySelectorAll('[data-agendado-details-tab]').forEach((tab) => {
        const isActive = tab === detailsTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      detailsRoot.querySelectorAll('[data-agendado-details-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.agendadoDetailsPanel === targetPanel);
      });
      return true;
    }

    const detailsToggle = event.target.closest('[data-agendado-details-toggle]');
    if (detailsToggle) {
      if (detailsToggle.dataset.agendadoOpenGerminacao === 'true') {
        onOpenSemeioDrawer?.(detailsToggle);
        return true;
      }
      const accordion = detailsToggle.closest('[data-agendado-details-accordion]');
      if (!accordion) return true;
      const isCollapsed = accordion.classList.toggle('is-collapsed');
      detailsToggle.setAttribute('aria-expanded', String(!isCollapsed));
      return true;
    }

    const cycleTab = event.target.closest('[data-agendado-cycle-tab]');
    if (cycleTab) {
      const cycleRoot = targetDrawerElement.querySelector('[data-agendado-cycle]');
      const targetPanel = cycleTab.dataset.agendadoCycleTab;
      if (!cycleRoot || !targetPanel) return true;

      cycleRoot.querySelectorAll('[data-agendado-cycle-tab]').forEach((tab) => {
        const isActive = tab === cycleTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      cycleRoot.querySelectorAll('[data-agendado-cycle-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.agendadoCyclePanel === targetPanel);
      });
      return true;
    }

    return false;
  };

  const openGerminacaoDrawer = async (triggerEl) => {
    try {
      if (!germinacaoDrawerModulePromise) {
        germinacaoDrawerModulePromise = import('../../components/enviar-germinacao-drawer/enviar-germinacao-drawer.js');
      }
      const module = await germinacaoDrawerModulePromise;
      if (!germinacaoDrawerInstance && typeof module.createEnviarGerminacaoDrawer === 'function') {
        germinacaoDrawerInstance = module.createEnviarGerminacaoDrawer();
      }
      if (!germinacaoDrawerInstance?.open) return;
      drawerControls.close({ restoreFocus: false });
      germinacaoStageDrawerControls.close({ restoreFocus: false });
      casaVegetacaoStageDrawerControls.close({ restoreFocus: false });
      aguardandoEnxertiaDrawerControls.close({ restoreFocus: false });
      salaCorteDrawerControls.close({ restoreFocus: false });
      adaptacaoDrawerControls.close({ restoreFocus: false });
      salaFusaoDrawerControls.close({ restoreFocus: false });
      germinacaoDrawerInstance.open(triggerEl || null);
    } catch (error) {
      console.error('[kanban] failed to open enviar-germinacao drawer', error);
    }
  };

  const preloadGerminacaoDrawer = async () => {
    if (isAgendadoDrawerDisposed || germinacaoDrawerInstance) return;
    try {
      if (!germinacaoDrawerModulePromise) {
        germinacaoDrawerModulePromise = import('../../components/enviar-germinacao-drawer/enviar-germinacao-drawer.js');
      }
      const module = await germinacaoDrawerModulePromise;
      if (isAgendadoDrawerDisposed || germinacaoDrawerInstance) return;
      if (typeof module.createEnviarGerminacaoDrawer === 'function') {
        germinacaoDrawerInstance = module.createEnviarGerminacaoDrawer();
      }
    } catch (error) {
      console.error('[kanban] failed to preload enviar-germinacao drawer', error);
    }
  };

  if (typeof window.requestIdleCallback === 'function') {
    germinacaoPreloadIdleId = window.requestIdleCallback(() => {
      void preloadGerminacaoDrawer();
    }, { timeout: 1200 });
  } else {
    germinacaoPreloadTimerId = window.setTimeout(() => {
      void preloadGerminacaoDrawer();
    }, 300);
  }

  const handleDrawerClick = (event) => {
    if (
      handleCommonOpDrawerClick(event, drawerElement, {
        onOpenSemeioDrawer: (triggerEl) => void openGerminacaoDrawer(triggerEl),
      })
    ) {
      return;
    }

    const actionButton = event.target.closest('[data-agendado-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.agendadoAction;
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }
    if (action === 'reagendar' || action === 'consult-agenda') {
      openScheduleModal(actionButton);
      return;
    }
    if (action === 'add-lote') {
      console.log(`Ação: ${action}`);
      return;
    }
    if (action === 'details-qr' || action === 'details-view-order' || action === 'details-view-image') {
      console.log(`Ação: ${action}`);
      return;
    }
    if (action === 'save-lote') {
      console.log('Salvar lote');
      return;
    }
    if (action === 'start-semeio') {
      const form = drawerElement.querySelector('[data-agendado-form]');
      const formData = form ? Object.fromEntries(new FormData(form).entries()) : {};
      console.log('Iniciar semeio', formData);
    }
  };

  const createStageDrawerClickHandler = ({ stageKey, stageDrawerElement, stageDrawerControls }) => (event) => {
    if (
      handleCommonOpDrawerClick(event, stageDrawerElement, {
        onOpenSemeioDrawer: (triggerEl) => void openGerminacaoDrawer(triggerEl),
      })
    ) {
      return;
    }

    const stageActionButton = event.target.closest('[data-op-step-action]');
    if (stageActionButton && stageDrawerElement.contains(stageActionButton)) {
      const action = stageActionButton.getAttribute('data-op-step-action');
      if (!action) return;
      if (action === 'cancel') {
        stageDrawerControls.close();
        return;
      }
      if (action === 'consult-agenda') {
        openScheduleModal(stageActionButton);
        return;
      }
      if (action === 'consult-location' || action === 'quality' || action === 'qr') {
        console.log(`Ação: ${action}`);
        return;
      }
      if (action === 'register-tray' || action === 'read-qr' || action === 'start-execution' || action === 'add-tray' || action === 'reagendar') {
        if (action === 'read-qr') {
          showCameraAccessWarning();
          return;
        }
        console.log(`Ação: ${action}`);
        return;
      }
      if (action === 'voltar-etapa' || action === 'submit-next') {
        const form = stageDrawerElement.querySelector(`[data-op-step-form="${stageKey}"]`);
        const formData = form ? Object.fromEntries(new FormData(form).entries()) : {};
        console.log(action, formData);
      }
      return;
    }

    const agendadoActionButton = event.target.closest('[data-agendado-action]');
    if (!agendadoActionButton || !stageDrawerElement.contains(agendadoActionButton)) return;
    const agendadoAction = agendadoActionButton.dataset.agendadoAction;
    if (agendadoAction === 'details-qr' || agendadoAction === 'details-view-order' || agendadoAction === 'details-view-image') {
      console.log(`Ação: ${agendadoAction}`);
    }
  };

  const handleGerminacaoDrawerClick = createStageDrawerClickHandler({
    stageKey: 'germinacao',
    stageDrawerElement: germinacaoStageDrawerElement,
    stageDrawerControls: germinacaoStageDrawerControls,
  });
  const handleCasaVegetacaoDrawerClick = createStageDrawerClickHandler({
    stageKey: 'casa-vegetacao',
    stageDrawerElement: casaVegetacaoStageDrawerElement,
    stageDrawerControls: casaVegetacaoStageDrawerControls,
  });
  const handleAguardandoEnxertiaDrawerClick = createStageDrawerClickHandler({
    stageKey: 'aguardando-enxertia',
    stageDrawerElement: aguardandoEnxertiaDrawerElement,
    stageDrawerControls: aguardandoEnxertiaDrawerControls,
  });
  const handleSalaCorteDrawerClick = createStageDrawerClickHandler({
    stageKey: 'sala-corte',
    stageDrawerElement: salaCorteDrawerElement,
    stageDrawerControls: salaCorteDrawerControls,
  });
  const handleAdaptacaoDrawerClick = createStageDrawerClickHandler({
    stageKey: 'adaptacao',
    stageDrawerElement: adaptacaoDrawerElement,
    stageDrawerControls: adaptacaoDrawerControls,
  });
  const handleSalaFusaoDrawerClick = createStageDrawerClickHandler({
    stageKey: 'sala-fusao',
    stageDrawerElement: salaFusaoDrawerElement,
    stageDrawerControls: salaFusaoDrawerControls,
  });

  board.addEventListener('click', handleBoardClick);
  if (tabsRoot) tabsRoot.addEventListener('click', handleAgendadoTabsClick);
  if (germinacaoTabsRoot) germinacaoTabsRoot.addEventListener('click', handleGerminacaoTabsClick);
  if (casaVegetacaoTabsRoot) casaVegetacaoTabsRoot.addEventListener('click', handleCasaVegetacaoTabsClick);
  if (aguardandoEnxertiaTabsRoot) aguardandoEnxertiaTabsRoot.addEventListener('click', handleAguardandoEnxertiaTabsClick);
  if (salaCorteTabsRoot) salaCorteTabsRoot.addEventListener('click', handleSalaCorteTabsClick);
  if (adaptacaoTabsRoot) adaptacaoTabsRoot.addEventListener('click', handleAdaptacaoTabsClick);
  if (salaFusaoTabsRoot) salaFusaoTabsRoot.addEventListener('click', handleSalaFusaoTabsClick);
  drawerElement.addEventListener('click', handleDrawerClick);
  germinacaoStageDrawerElement.addEventListener('click', handleGerminacaoDrawerClick);
  casaVegetacaoStageDrawerElement.addEventListener('click', handleCasaVegetacaoDrawerClick);
  aguardandoEnxertiaDrawerElement.addEventListener('click', handleAguardandoEnxertiaDrawerClick);
  salaCorteDrawerElement.addEventListener('click', handleSalaCorteDrawerClick);
  adaptacaoDrawerElement.addEventListener('click', handleAdaptacaoDrawerClick);
  salaFusaoDrawerElement.addEventListener('click', handleSalaFusaoDrawerClick);

  const closeScheduleModal = ({ restoreFocus = true } = {}) => {
    closeRescheduleModal({ restoreFocus: false });
    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    scheduleModalCleanup();
    Modal.close(scheduleModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && scheduleModalReturnFocus?.focus) {
      scheduleModalReturnFocus.focus();
    }
    scheduleModalReturnFocus = null;
  };

  const closeRescheduleModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${rescheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    rescheduleModalCleanup();
    Modal.close(rescheduleModalId);

    if (drawerElement.classList.contains('is-open') || document.querySelector(`[data-modal="${scheduleModalId}"]`)) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && rescheduleModalReturnFocus?.focus) {
      rescheduleModalReturnFocus.focus();
    }
    rescheduleModalReturnFocus = null;
  };

  const openRescheduleModal = ({ anchorEl = null, initialValues = {} } = {}) => {
    document.querySelector(`[data-modal="${rescheduleModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`)?.remove();

    const payload = {
      date: initialValues.date || toIsoDate(scheduleModalState.selectedDate),
      location: initialValues.location || '',
      responsible: initialValues.responsible || '',
    };

    rescheduleModalReturnFocus = anchorEl;
    document.body.insertAdjacentHTML('beforeend', createRescheduleModal({ modalId: rescheduleModalId, values: payload }));

    const modalElement = document.querySelector(`[data-modal="${rescheduleModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`);
    if (!modalElement || !backdropElement) return;

    const cleanupInput = Input.init(modalElement);
    const dateInput = modalElement.querySelector('#reschedule-date');
    const locationInput = modalElement.querySelector('#reschedule-location');
    const responsibleInput = modalElement.querySelector('#reschedule-responsible');
    const errorElement = modalElement.querySelector('[data-reschedule-error]');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const cancelButton = modalElement.querySelector('[data-reschedule-action="cancel"]');
    const confirmButton = modalElement.querySelector('[data-reschedule-action="confirm"]');

    const clearErrors = () => {
      if (errorElement) errorElement.hidden = true;
      [dateInput, locationInput, responsibleInput].forEach((input) => {
        input?.closest('.field')?.classList.remove('field--error');
      });
    };

    const validate = () => {
      clearErrors();
      const invalid = [];
      if (!dateInput?.value) invalid.push(dateInput);
      if (!locationInput?.value?.trim()) invalid.push(locationInput);
      if (!responsibleInput?.value?.trim()) invalid.push(responsibleInput);

      if (!invalid.length) return true;
      invalid.forEach((input) => input?.closest('.field')?.classList.add('field--error'));
      if (errorElement) errorElement.hidden = false;
      invalid[0]?.focus?.();
      return false;
    };

    const handleClose = () => closeRescheduleModal();
    const handleBackdrop = (event) => {
      if (event.target !== backdropElement) return;
      closeRescheduleModal();
    };
    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closeRescheduleModal();
    };
    const handleConfirm = () => {
      if (!validate()) return;
      console.log('Reagendar confirmado', {
        data: dateInput?.value || '',
        localizacao: locationInput?.value?.trim() || '',
        responsavel: responsibleInput?.value?.trim() || '',
      });
      closeRescheduleModal();
    };

    closeButton?.addEventListener('click', handleClose);
    cancelButton?.addEventListener('click', handleClose);
    confirmButton?.addEventListener('click', handleConfirm);
    backdropElement.addEventListener('click', handleBackdrop);
    document.addEventListener('keydown', handleKeydown, true);
    [dateInput, locationInput, responsibleInput].forEach((input) => {
      input?.addEventListener('input', clearErrors);
    });

    rescheduleModalCleanup = () => {
      closeButton?.removeEventListener('click', handleClose);
      cancelButton?.removeEventListener('click', handleClose);
      confirmButton?.removeEventListener('click', handleConfirm);
      backdropElement.removeEventListener('click', handleBackdrop);
      document.removeEventListener('keydown', handleKeydown, true);
      [dateInput, locationInput, responsibleInput].forEach((input) => {
        input?.removeEventListener('input', clearErrors);
      });
      if (typeof cleanupInput === 'function') cleanupInput();
      rescheduleModalCleanup = () => {};
    };

    Modal.open(rescheduleModalId);
    setTimeout(() => {
      if (dateInput?.focus) dateInput.focus();
    }, 120);
  };

  const openScheduleModal = (returnFocusButton) => {
    document.querySelector(`[data-modal="${scheduleModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`)?.remove();

    scheduleModalState = createScheduleModalState();
    scheduleModalReturnFocus = returnFocusButton || null;

    document.body.insertAdjacentHTML('beforeend', createScheduleModal({
      modalId: scheduleModalId,
      state: scheduleModalState,
    }));

    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const locationSelect = modalElement.querySelector('#schedule-location-select');
    const closeButton = modalElement.querySelector('[data-modal-close]');

    const handleCloseClick = () => closeScheduleModal();
    const handleBackdropClick = (evt) => {
      if (evt.target !== modalBackdrop) return;
      closeScheduleModal();
    };
    const handleKeydown = (evt) => {
      if (evt.key !== 'Escape') return;
      if (document.querySelector(`[data-modal="${rescheduleModalId}"]`)) return;
      evt.preventDefault();
      evt.stopPropagation();
      closeScheduleModal();
    };
    const handleModalClick = (evt) => {
      const actionButton = evt.target.closest('[data-schedule-action]');
      if (actionButton) {
        const modalAction = actionButton.dataset.scheduleAction;
        if (modalAction === 'back') {
          closeScheduleModal();
          return;
        }
        if (modalAction === 'select-date') {
          const dateInput = drawerElement.querySelector('#agendado-data-encerramento');
          if (dateInput) {
            dateInput.value = toIsoDate(scheduleModalState.selectedDate);
            dateInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          closeScheduleModal();
          return;
        }
      }

      const viewButton = evt.target.closest('[data-schedule-view]');
      if (viewButton) {
        scheduleModalState.viewMode = viewButton.dataset.scheduleView === 'month' ? 'month' : 'week';
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const navButton = evt.target.closest('[data-schedule-nav]');
      if (navButton) {
        const direction = navButton.dataset.scheduleNav === 'prev' ? -1 : 1;
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = addMonths(scheduleModalState.currentDate, direction);
        } else {
          scheduleModalState.selectedDate = addDays(scheduleModalState.selectedDate, direction * 7);
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const dayButton = evt.target.closest('[data-schedule-date]');
      if (dayButton) {
        const selectedDate = parseIsoDate(dayButton.dataset.scheduleDate);
        if (!selectedDate) return;
        scheduleModalState.selectedDate = selectedDate;
        scheduleModalState.currentDate = cloneDate(selectedDate);
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const reagendarTableButton = evt.target.closest('[data-schedule-reagendar]');
      if (reagendarTableButton) {
        openRescheduleModal({
          anchorEl: reagendarTableButton,
          initialValues: {
            date: toIsoDate(scheduleModalState.selectedDate),
            location: locationSelect?.value || '',
            responsible: '',
          },
        });
      }
    };

    modalBackdrop.addEventListener('click', handleBackdropClick);
    modalElement.addEventListener('click', handleModalClick);
    closeButton?.addEventListener('click', handleCloseClick);
    document.addEventListener('keydown', handleKeydown, true);

    scheduleModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleBackdropClick);
      modalElement.removeEventListener('click', handleModalClick);
      closeButton?.removeEventListener('click', handleCloseClick);
      document.removeEventListener('keydown', handleKeydown, true);
      scheduleModalCleanup = () => {};
    };

    Modal.open(scheduleModalId);
    updateScheduleModalUi(modalElement, scheduleModalState);
    if (locationSelect?.focus) {
      setTimeout(() => locationSelect.focus(), 120);
    }
  };

  return () => {
    isAgendadoDrawerDisposed = true;
    if (germinacaoPreloadTimerId !== null) window.clearTimeout(germinacaoPreloadTimerId);
    if (germinacaoPreloadIdleId !== null && typeof window.cancelIdleCallback === 'function') {
      window.cancelIdleCallback(germinacaoPreloadIdleId);
    }
    closeScheduleModal({ restoreFocus: false });
    closeRescheduleModal({ restoreFocus: false });
    germinacaoDrawerInstance?.cleanup?.();
    germinacaoDrawerInstance = null;
    germinacaoDrawerModulePromise = null;
    board.removeEventListener('click', handleBoardClick);
    if (tabsRoot) tabsRoot.removeEventListener('click', handleAgendadoTabsClick);
    if (germinacaoTabsRoot) germinacaoTabsRoot.removeEventListener('click', handleGerminacaoTabsClick);
    if (casaVegetacaoTabsRoot) casaVegetacaoTabsRoot.removeEventListener('click', handleCasaVegetacaoTabsClick);
    if (aguardandoEnxertiaTabsRoot) aguardandoEnxertiaTabsRoot.removeEventListener('click', handleAguardandoEnxertiaTabsClick);
    if (salaCorteTabsRoot) salaCorteTabsRoot.removeEventListener('click', handleSalaCorteTabsClick);
    if (adaptacaoTabsRoot) adaptacaoTabsRoot.removeEventListener('click', handleAdaptacaoTabsClick);
    if (salaFusaoTabsRoot) salaFusaoTabsRoot.removeEventListener('click', handleSalaFusaoTabsClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    germinacaoStageDrawerElement.removeEventListener('click', handleGerminacaoDrawerClick);
    casaVegetacaoStageDrawerElement.removeEventListener('click', handleCasaVegetacaoDrawerClick);
    aguardandoEnxertiaDrawerElement.removeEventListener('click', handleAguardandoEnxertiaDrawerClick);
    salaCorteDrawerElement.removeEventListener('click', handleSalaCorteDrawerClick);
    adaptacaoDrawerElement.removeEventListener('click', handleAdaptacaoDrawerClick);
    salaFusaoDrawerElement.removeEventListener('click', handleSalaFusaoDrawerClick);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (typeof cleanupGerminacaoInput === 'function') cleanupGerminacaoInput();
    if (typeof cleanupCasaVegetacaoInput === 'function') cleanupCasaVegetacaoInput();
    if (typeof cleanupAguardandoEnxertiaInput === 'function') cleanupAguardandoEnxertiaInput();
    if (typeof cleanupSalaCorteInput === 'function') cleanupSalaCorteInput();
    if (typeof cleanupAdaptacaoInput === 'function') cleanupAdaptacaoInput();
    if (typeof cleanupSalaFusaoInput === 'function') cleanupSalaFusaoInput();
    if (drawerControls.cleanup) drawerControls.cleanup();
    if (germinacaoStageDrawerControls.cleanup) germinacaoStageDrawerControls.cleanup();
    if (casaVegetacaoStageDrawerControls.cleanup) casaVegetacaoStageDrawerControls.cleanup();
    if (aguardandoEnxertiaDrawerControls.cleanup) aguardandoEnxertiaDrawerControls.cleanup();
    if (salaCorteDrawerControls.cleanup) salaCorteDrawerControls.cleanup();
    if (adaptacaoDrawerControls.cleanup) adaptacaoDrawerControls.cleanup();
    if (salaFusaoDrawerControls.cleanup) salaFusaoDrawerControls.cleanup();
    document.querySelector(`[data-drawer="${drawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${drawerId}"]`)?.remove();
    document.querySelector(`[data-drawer="${germinacaoStageDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${germinacaoStageDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer="${casaVegetacaoStageDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${casaVegetacaoStageDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer="${aguardandoEnxertiaDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${aguardandoEnxertiaDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer="${salaCorteDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${salaCorteDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer="${adaptacaoDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${adaptacaoDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer="${salaFusaoDrawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${salaFusaoDrawerId}"]`)?.remove();
  };
}

function createAgendadoDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'agendado-tabs',
    firstTabLabel: 'Iniciar Semeio',
    firstTabContent: createAgendadoIniciarSemeioPanel(),
  });

  return `
    <section class="agendado-drawer">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createGerminacaoDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'germinacao-tabs',
    firstTabLabel: 'Enviar para Casa Vegetação',
    firstTabContent: createGerminacaoStepPanel(),
  });

  return `
    <section class="agendado-drawer germinacao-stage-drawer">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createCasaVegetacaoDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'casa-vegetacao-tabs',
    firstTabLabel: 'Enviar para Expedição',
    firstTabContent: createCasaVegetacaoStepPanel(),
  });

  return `
    <section class="agendado-drawer casa-vegetacao-stage-drawer">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createAguardandoEnxertiaDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'aguardando-enxertia-tabs',
    firstTabLabel: 'Enviar para Sala de Corte',
    firstTabContent: createAguardandoEnxertiaStepPanel(),
  });

  return `
    <section class="agendado-drawer aguardando-enxertia-stage-drawer">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createSalaCorteDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'sala-corte-tabs',
    firstTabLabel: 'Enviar para Enxertia',
    firstTabContent: createSalaCorteStepPanel(),
  });

  return `
    <section class="agendado-drawer op-drawer--corte">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createSalaFusaoDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'sala-fusao-tabs',
    firstTabLabel: 'Enviar para Adaptação',
    firstTabContent: createSalaFusaoStepPanel(),
  });

  return `
    <section class="agendado-drawer op-drawer--fusao">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createAdaptacaoDrawerContent() {
  const tabs = createOpDrawerTabs({
    id: 'adaptacao-tabs',
    firstTabLabel: 'Enviar para Casa de Vegetação',
    firstTabContent: createAdaptacaoStepPanel(),
  });

  return `
    <section class="agendado-drawer op-drawer--adaptacao">
      ${createOpDrawerSummary()}
      ${tabs}
    </section>
  `;
}

function createGerminacaoStepPanel() {
  return createOpStepPanel({
    stepKey: 'germinacao',
    scopeClass: 'op-drawer__step--germinacao',
    stageTitle: 'Sala de Germinação',
    dateEndLabel: 'Data encerramento da Germinação*',
    submitLabel: 'Enviar para Estufa',
  });
}

function createCasaVegetacaoStepPanel() {
  return createOpStepPanel({
    stepKey: 'casa-vegetacao',
    scopeClass: 'op-drawer__step--casa-vegetacao',
    stageTitle: 'Sala de Germinação',
    dateEndLabel: 'Data encerramento da etapa*',
    submitLabel: 'Enviar para Expedição',
    showProductInfoSection: false,
    showConsultAgenda: false,
    qualityTitle: 'Controle de Qualidade',
    qualityStatus: '',
    qualityButtonLabel: 'Iniciar Seleção',
    qualityClassName: 'op-drawer--adaptacao__quality',
    quantityGroups: [
      {
        subtitle: 'Produto',
        meta: 'Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>',
        kpis: [
          { label: 'Entrada', value: '5.000' },
          { label: 'Perda', value: '250', badge: '+5%' },
          { label: 'Atual', value: '4.750', badge: '95%' },
        ],
      },
    ],
  });
}

function createAguardandoEnxertiaStepPanel() {
  return createOpStepPanel({
    stepKey: 'aguardando-enxertia',
    scopeClass: 'op-drawer__step--aguardando-enxertia',
    stageTitle: 'Sala de Germinação',
    dateEndLabel: 'Data de Início da Etapa*',
    submitLabel: 'Iniciar Enxertia',
    rightDateLabel: 'Data de Agendamento',
    rescheduleLabel: '+ Reagendar',
    showBackAction: false,
  });
}

function createSalaCorteStepPanel() {
  return `
    <form class="agendado-panel op-drawer__step--corte" data-op-step-form="sala-corte">
      <section class="agendado-section op-germinacao-step__actions">
        ${createAgendadoQrButton().replace('<button', '<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('home', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Agendamento</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field op-step-corte__reagendar">
              <button type="button" class="agendado-inline-link" data-op-step-action="reagendar">Reagendar</button>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>10</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">Previsão de Saída</span>
                <strong>20/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 60%</span>
                <span>Meta: 5 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 60%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Insumos</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">&nbsp;</span>
            <span class="agendado-info-box__meta">Qtd. Bandejas: <strong>20 un</strong> &nbsp; Capacidade: <strong>128</strong></span>
          </div>
          <div class="agendado-kpis">
            ${createAgendadoKpi('Enxerto', '248')}
            ${createAgendadoKpi('Porta-enxerto', '4.750')}
          </div>
        </div>
        <div class="op-step-corte__execution-toggle">
          ${Button.create({ text: 'Iniciar Execução', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="start-execution"')}
        </div>
      </section>

      <section class="agendado-section op-step-corte__exec">
        <h3 class="agendado-title">Execução do Corte</h3>
        <div class="op-step-corte__exec-actions">
          <button type="button" class="agendado-inline-link" data-op-step-action="register-tray">+ Registrar Bandeja Finalizada</button>
          <button type="button" class="agendado-inline-link" data-op-step-action="read-qr">Ler QR Code</button>
        </div>
        <article class="agendado-info-box op-step-corte__exec-form">
          ${Input.create({ id: 'sala-corte-data-execucao', type: 'date', label: 'Data de Execução*', required: true, name: 'dataExecucao', iconRight: icon('calendar', { size: 16 }) })}
          <div class="op-step-corte__grid op-step-corte__grid--three">
            ${Input.createSelect({
              id: 'sala-corte-operador',
              label: 'Operador',
              required: true,
              placeholder: 'Selecione',
              items: [{ label: 'Maria Silva', value: 'maria-silva' }, { label: 'João Souza', value: 'joao-souza' }],
            })}
            ${Input.create({ id: 'sala-corte-bandeja-id', label: 'Bandeja ID', name: 'bandejaId', value: '# ID' })}
            ${Input.create({ id: 'sala-corte-qtd-mudas', label: 'Quantidade de Mudas', name: 'quantidadeMudas', value: '0' })}
          </div>
          <div class="op-step-corte__add-action">
            ${Button.create({ text: 'Adicionar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-op-step-action="add-tray"')}
          </div>
        </article>
      </section>

      <section class="agendado-section op-step-corte__tables">
        <article class="agendado-info-box">
          <div class="op-step-corte__table-head">
            <h4 class="agendado-title">Bandejas Registradas Hoje</h4>
            <span class="agendado-info-box__meta">Total: <strong>248 mudas</strong></span>
          </div>
          <div class="op-step-corte__table-wrap">
            <table class="op-step-corte__table" aria-label="Bandejas registradas hoje">
              <thead>
                <tr><th>Bandeja</th><th>Operador</th><th>Data de Execução</th><th>Qtd</th><th></th></tr>
              </thead>
              <tbody>
                <tr><td>BDJ-001</td><td>Maria Silva</td><td>23/12/26</td><td>128</td><td>${icon('trash', { size: 14 })}</td></tr>
                <tr><td>BDJ-002</td><td>João Souza</td><td>23/12/26</td><td>120</td><td>${icon('trash', { size: 14 })}</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="agendado-info-box">
          <div class="op-step-corte__table-head">
            <h4 class="agendado-title">Produtividade por Operador</h4>
            <span class="agendado-info-box__meta">Total: <strong>248 mudas</strong></span>
          </div>
          <div class="op-step-corte__table-wrap">
            <table class="op-step-corte__table" aria-label="Produtividade por operador">
              <thead>
                <tr><th>Operador</th><th>Qtd. Bandejas</th><th>Qtd. Mudas</th><th>% Lote</th></tr>
              </thead>
              <tbody>
                <tr><td>Maria Silva</td><td>128</td><td>128</td><td>128</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Enxertadas</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Produto</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong></span>
          </div>
          <div class="agendado-kpis">
            ${createAgendadoKpi('Já Executado', '248')}
            ${createAgendadoKpi('A Executar (Restante)', '4.500')}
            ${createAgendadoKpi('Perdas', '2')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: 'sala-corte-localizacao', required: true, name: 'localizacao', placeholder: 'Buscar' })}
          </div>
          ${Input.create({ id: 'sala-corte-data-encerramento', type: 'date', label: 'Data encerramento da etapa*', required: true, name: 'dataEncerramento', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: 'sala-corte-responsavel', label: 'Responsável*', required: true, name: 'responsavel', placeholder: 'Nome do responsável' })}
          <div class="agendado-consultar-wrap">
            ${Button.create({ text: '+ Consultar agenda', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        <span aria-hidden="true"></span>
        <div class="op-germinacao-step__bottom-right">
          ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="cancel"')}
          ${Button.create({ text: 'Encerrar e Enviar para Fusão', variant: 'primary', size: 'sm' }).replace('<button', '<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `;
}

function createSalaFusaoStepPanel() {
  return `
    <form class="agendado-panel op-drawer__step--fusao" data-op-step-form="sala-fusao">
      <section class="agendado-section op-germinacao-step__actions">
        ${createAgendadoQrButton().replace('<button', '<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('home', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data de Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">Previsão de Saída</span>
                <strong>18/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section op-germinacao-step__quality">
        <div class="op-germinacao-step__quality-text">
          <strong>Controle de Qualidade:</strong>
          <span>Dentro do esperado</span>
        </div>
        ${Button.create({ text: 'Avaliação', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="quality"')}
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Produto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong></span>
            </div>
            <div class="agendado-kpis">
              ${createAgendadoKpi('Entrada', '5.000')}
              ${createAgendadoKpi('Perda', '250', '+5%')}
              ${createAgendadoKpi('Atual', '4.750', '95%')}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: 'sala-fusao-localizacao', required: true, name: 'localizacao', placeholder: 'Buscar' })}
          </div>
          ${Input.create({ id: 'sala-fusao-data-encerramento', type: 'date', label: 'Data encerramento da etapa*', required: true, name: 'dataEncerramento', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: 'sala-fusao-responsavel', label: 'Responsável*', required: true, name: 'responsavel', placeholder: 'Nome do responsável' })}
          <div class="agendado-consultar-wrap">
            ${Button.create({ text: '+ Consultar agenda', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${Button.create({ text: 'Voltar Etapa', variant: 'error', style: 'outline', size: 'sm' }).replace('<button', '<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="cancel"')}
          ${Button.create({ text: 'Enviar para Adaptação', variant: 'primary', size: 'sm' }).replace('<button', '<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `;
}

function createAdaptacaoStepPanel() {
  return `
    <form class="agendado-panel op-drawer__step--adaptacao" data-op-step-form="adaptacao">
      <section class="agendado-section op-germinacao-step__actions">
        ${createAgendadoQrButton().replace('<button', '<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('home', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data de Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">Previsão de Saída</span>
                <strong>18/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section op-germinacao-step__quality op-drawer--adaptacao__quality">
        <div class="op-germinacao-step__quality-text">
          <strong>Controle de Qualidade</strong>
        </div>
        ${Button.create({ text: 'Iniciar Seleção', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="quality"')}
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Produto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong></span>
            </div>
            <div class="agendado-kpis">
              ${createAgendadoKpi('Entrada', '5.000')}
              ${createAgendadoKpi('Perda', '250', '+5%')}
              ${createAgendadoKpi('Atual', '4.750', '95%')}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: 'adaptacao-localizacao', required: true, name: 'localizacao', placeholder: 'Buscar' })}
          </div>
          ${Input.create({ id: 'adaptacao-data-encerramento', type: 'date', label: 'Data encerramento da etapa*', required: true, name: 'dataEncerramento', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: 'adaptacao-responsavel', label: 'Responsável*', required: true, name: 'responsavel', placeholder: 'Nome do responsável' })}
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${Button.create({ text: 'Voltar Etapa', variant: 'error', style: 'outline', size: 'sm' }).replace('<button', '<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="cancel"')}
          ${Button.create({ text: 'Enviar para Casa de Vegetação', variant: 'primary', size: 'sm' }).replace('<button', '<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `;
}

function createOpStepPanel({
  stepKey,
  scopeClass,
  stageTitle,
  dateEndLabel,
  submitLabel,
  rightDateLabel = 'Previsão de Saída',
  rescheduleLabel = '+ Consultar agenda',
  showBackAction = true,
  showProductInfoSection = true,
  showConsultAgenda = true,
  qualityTitle = 'Controle de Qualidade:',
  qualityStatus = 'Dentro do esperado',
  qualityButtonLabel = 'Avaliação',
  qualityClassName = '',
  quantityGroups = [
    {
      subtitle: 'Enxerto',
      meta: 'Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>',
      kpis: [
        { label: 'Semeada', value: '5.000' },
        { label: 'Perda', value: '250', badge: '+5%' },
        { label: 'Germinada', value: '4.750', badge: '95%' },
      ],
    },
    {
      subtitle: 'Porta-enxerto',
      meta: 'Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>',
      kpis: [
        { label: 'Semeada', value: '5.000' },
        { label: 'Perda', value: '250', badge: '+5%' },
        { label: 'Germinada', value: '4.750', badge: '95%' },
      ],
    },
  ],
}) {
  const normalizedQuantityGroups = Array.isArray(quantityGroups) ? quantityGroups : [];
  const quantityGroupsHtml = normalizedQuantityGroups.map((group) => {
    const subtitle = group?.subtitle || 'Produto';
    const meta = group?.meta || 'Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong>';
    const kpis = Array.isArray(group?.kpis) ? group.kpis : [];
    const kpisHtml = kpis.map((kpi) => createAgendadoKpi(kpi?.label || '', kpi?.value || '', kpi?.badge || '')).join('');

    return `
      <div class="agendado-semeio-group">
        <div class="agendado-info-box__head">
          <span class="agendado-subtitle">${subtitle}</span>
          <span class="agendado-info-box__meta">${meta}</span>
        </div>
        <div class="agendado-kpis">
          ${kpisHtml}
        </div>
      </div>
    `;
  }).join('');

  const productInfoHtml = showProductInfoSection
    ? `
      <section class="agendado-section">
        <h3 class="agendado-title">Informações do Produto</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Produto</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
          </div>
          <div class="agendado-kpis">
            ${createAgendadoKpi('Qtd. a Produzir', '5.556')}
            ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
            ${createAgendadoKpi('Qtd. solicitada', '5.000')}
          </div>
        </div>
      </section>
    `
    : '';

  const consultAgendaHtml = showConsultAgenda
    ? `
          <div class="agendado-consultar-wrap">
            ${Button.create({ text: rescheduleLabel, variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="consult-agenda"')}
          </div>
      `
    : '';

  return `
    <form class="agendado-panel ${scopeClass}" data-op-step-form="${stepKey}">
      <section class="agendado-section op-germinacao-step__actions">
        ${createAgendadoQrButton().replace('<button', '<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('home', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">${stageTitle}</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${icon('calendar', { size: 12 })}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data de Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">${rightDateLabel}</span>
                <strong>18/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section op-germinacao-step__quality ${qualityClassName}">
        <div class="op-germinacao-step__quality-text">
          <strong>${qualityTitle}</strong>
          ${qualityStatus ? `<span>${qualityStatus}</span>` : ''}
        </div>
        ${Button.create({ text: qualityButtonLabel, variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="quality"')}
      </section>

      ${productInfoHtml}

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          ${quantityGroupsHtml}
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: `${stepKey}-localizacao`, required: true, name: 'localizacao', placeholder: 'Buscar' })}
          </div>
          ${Input.create({ id: `${stepKey}-data-encerramento`, type: 'date', label: dateEndLabel, required: true, name: 'dataEncerramento', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: `${stepKey}-responsavel`, label: 'Responsável*', required: true, name: 'responsavel', placeholder: 'Nome do responsável' })}
          ${consultAgendaHtml}
        </div>
      </section>
      <section class="agendado-section op-germinacao-step__bottom">
        ${showBackAction ? Button.create({ text: 'Voltar Etapa', variant: 'error', style: 'outline', size: 'sm' }).replace('<button', '<button data-op-step-action="voltar-etapa"') : '<span aria-hidden="true"></span>'}
        <div class="op-germinacao-step__bottom-right">
          ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-op-step-action="cancel"')}
          ${Button.create({ text: submitLabel, variant: 'primary', size: 'sm' }).replace('<button', '<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `;
}

function createAgendadoIniciarSemeioPanel() {
  const lotesUpload = FileUpload.create({
    title: '',
    compact: true,
    multiple: false,
    maxSizeLabel: '3MB',
    acceptedFormats: ['image/png', 'image/svg+xml', 'application/msword', 'application/pdf'],
    className: 'agendado-upload',
  });

  return `
    <form class="agendado-panel" data-agendado-form>
      <section class="agendado-section">
        <div class="agendado-semeio">
          <div class="agendado-semeio__field">
            <span class="agendado-semeio__label">
              <span class="agendado-semeio__icon">${icon('calendar', { size: 12 })}</span>
              Data de agendamento de Semeio
            </span>
            <strong>15/01/2025</strong>
          </div>
          <div class="agendado-semeio__field">
            <span>Responsável agendamento</span>
            <strong>João da Silva</strong>
          </div>
        </div>
        <div class="agendado-semeio__actions">
          ${createAgendadoReagendarButton()}
          ${createAgendadoQrButton()}
        </div>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Informações do Produto</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Quantidade de Mudas</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
          </div>
          <div class="agendado-kpis">
            ${createAgendadoKpi('Qtd. a Produzir', '5.556')}
            ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
            ${createAgendadoKpi('Qtd. solicitada', '5.000')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Informações para Semeio</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${createAgendadoKpi('Qtd. a Semear', '5.556')}
              ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
              ${createAgendadoKpi('Qtd. Esperada', '5.000')}
            </div>
          </div>
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Porta-enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${createAgendadoKpi('Qtd. a Semear', '5.556')}
              ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
              ${createAgendadoKpi('Qtd. Esperada', '5.000')}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-section__header">
          <h3 class="agendado-title">Lotes de Sementes Utilizados</h3>
          ${Button.create({ text: '+ Adicionar Lote', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="add-lote"')}
        </div>
        <div class="agendado-card">
          <div class="agendado-grid agendado-grid--two">
            <div class="agendado-grid-col--full">
              ${Input.createSelect({ id: 'agendado-tipo', label: 'Tipo', name: 'tipo', placeholder: 'Selecione', items: [{ label: 'Enxerto', value: 'enxerto' }] })}
            </div>
            ${Input.create({ id: 'agendado-classe', label: 'Classe', name: 'classe', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-cod-produto', label: 'Código do Produto', name: 'codigoProduto', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-produto', label: 'Produto', name: 'produto', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-unidade', label: 'Unidade', name: 'unidade', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-cod-lote', label: 'Código do Lote', name: 'codigoLote', value: '5kg' })}
            ${Input.create({ id: 'agendado-fornecedor', label: 'Fornecedor', name: 'fornecedor', value: '95%' })}
            ${Input.create({ id: 'agendado-embalagem', label: 'Embalagem', name: 'embalagem', value: 'Clone AEC 144' })}
            ${Input.create({ id: 'agendado-quantidade', label: 'Quantidade', name: 'quantidade', value: '10' })}
          </div>
          <div class="agendado-upload-wrap">
            <span class="agendado-field-label">Anexa imagem do lote</span>
            ${lotesUpload}
            ${createAgendadoUploadPreview()}
          </div>
          ${Input.create({ id: 'agendado-responsavel-coleta', label: 'Responsável coleta da semente', name: 'responsavelColeta', value: 'João da Silva' })}
          <div class="agendado-grid agendado-grid--two">
            ${Input.create({ id: 'agendado-responsavel-entrega', label: 'Responsável entrega da semente', name: 'responsavelEntrega', placeholder: 'Nome do responsável' })}
            ${Input.create({ id: 'agendado-data-hora-entrega', label: 'Data/Hora de entrega da semente', name: 'dataHoraEntrega', placeholder: 'Nome do responsável' })}
          </div>
          <div class="agendado-card__actions">
            ${createAgendadoTermoButton()}
            ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="cancel-lote"')}
            ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-agendado-action="save-lote"')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        ${createAgendadoLoteTable('Enxerto', '10.000', { collapsed: true, showTable: false })}
        ${createAgendadoLoteTable('Porta-enxerto', '15.000', { collapsed: false, showTable: true })}
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: 'agendado-localizacao', required: true, name: 'localizacao', placeholder: 'Buscar' })}
          </div>
          ${Input.create({ id: 'agendado-data-encerramento', type: 'date', label: 'Data encerramento da etapa', required: true, name: 'dataEncerramento', className: 'agendado-date-field', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: 'agendado-responsavel', label: 'Responsável', required: true, name: 'responsavel', placeholder: 'Nome do responsável' })}
          <div class="agendado-consultar-wrap">
            ${Button.create({ text: '+ Consultar agenda', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="consult-agenda"')}
          </div>
        </div>
        <div class="agendado-bottom-actions">
          ${createAgendadoReagendarButton()}
        </div>
      </section>
    </form>
  `;
}

function createAgendadoDetalhesPanel() {
  return `
    <section class="agendado-details" data-agendado-details>
      <div class="agendado-details-subtabs" role="tablist" aria-label="Detalhes da produção">
        <button type="button" class="agendado-details-subtabs__tab is-active" role="tab" aria-selected="true" data-agendado-details-tab="info-gerais">Informações Gerais</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="producao">Produção</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="expedicao">Expedição</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="operacoes">Operações</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="historico">Histórico</button>
      </div>

      <div class="agendado-details-panel is-active" data-agendado-details-panel="info-gerais">
        <section class="agendado-section">
          <h3 class="agendado-title">Planejamento e Datas</h3>
          <div class="agendado-details-card agendado-details-card--planning">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${createAgendadoDetailsField('Data do Pedido', '15/01/2025')}
              ${createAgendadoDetailsField('Data Agendada do Semeio', '15/01/2025')}
              ${createAgendadoDetailsField('Responsável agendamento', 'João da Silva')}
            </div>
          </div>
          <div class="agendado-details-actions">
            ${createAgendadoQrButton().replace('<button', '<button data-agendado-action="details-qr"')}
          </div>
        </section>

        <section class="agendado-section">
          <h3 class="agendado-title">Informações Gerais</h3>
          <div class="agendado-details-card">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${createAgendadoDetailsField('Cód. do Pedido', '001')}
              ${createAgendadoDetailsField('Referência', '43242343')}
              ${createAgendadoDetailsField('Cód. Tawros', '001')}

              ${createAgendadoDetailsField('Cód. do Cliente', '001')}
              ${createAgendadoDetailsField('CPF/CNPJ', '123.456.789-00')}
              ${createAgendadoDetailsField('Razão Social/Nome', 'Nome da razao social')}

              ${createAgendadoDetailsField('Nome Fantasia/Apelido', 'Nome fantasia')}
              ${createAgendadoDetailsField('Cidade/UF', 'São Paulo-SP')}
              ${createAgendadoDetailsField('Nome do Vendedor', 'Nome vendedor')}
            </div>

            <div class="agendado-details-field agendado-details-field--full">
              <span class="agendado-details-field__label">Classe</span>
              <strong class="agendado-details-field__value">Muda de Eucalipto Clone AEC 144</strong>
            </div>

            <div class="agendado-details-grid agendado-details-grid--three">
              ${createAgendadoDetailsField('Cód. do Produto', '432243432')}
              ${createAgendadoDetailsField('Produto', 'Muda de Eucalipto Clone')}
              ${createAgendadoDetailsField('Quantidade', '5.000')}
            </div>
          </div>

          <div class="agendado-details-accordion" data-agendado-details-accordion>
            <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
              <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
              <span>Observações</span>
            </button>
            <div class="agendado-details-accordion__content">
              Hoje, durante a caminhada no parque, notei que as flores estavam mais vibrantes do que nunca. O aroma doce das rosas misturava-se com o frescor do ar, criando uma atmosfera encantadora. Além disso, vi um grupo de crianças brincando e rindo, o que trouxe um sorriso ao meu rosto. Foi um momento perfeito para refletir e apreciar a beleza da natureza.
            </div>
          </div>

          <div class="agendado-details-actions">
            ${Button.create({ text: 'Ver pedido', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="details-view-order"')}
          </div>
        </section>
      </div>

      <div class="agendado-details-panel" data-agendado-details-panel="producao">${createAgendadoProducaoPanel()}</div>
      <div class="agendado-details-panel" data-agendado-details-panel="expedicao"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="operacoes"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="historico"><div class="agendado-placeholder">Em construção</div></div>
    </section>
  `;
}

function createAgendadoProducaoPanel() {
  const seedLots = [
    { stockDate: '12/01/2025', responsible: 'Viktor Dantas' },
    { stockDate: '12/01/2025', responsible: 'Viktor Dantas' },
  ];
  const supplies = [
    { tray: 'Descrição Bandeja', quantity: '1000', responsible: 'Viktor Dantas' },
    { tray: 'Descrição Bandeja', quantity: '1000', responsible: 'Viktor Dantas' },
  ];
  const stages = ['Germinação', 'Casa de Vegetação', 'Sala de Corte', 'Sala de Fusão', 'Adaptação'];

  return `
    <section class="agendado-details-production">
      <h3 class="agendado-title">Informações da Produção</h3>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle data-agendado-open-germinacao="true">
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Semeio</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${createAgendadoDetailsField('Data agendada de semeio', '12/01/2025')}
            ${createAgendadoDetailsField('Responsável do agendamento', 'Viktor Dantas')}
            ${createAgendadoDetailsField('Data de semeio', '12/01/2025')}
            ${createAgendadoDetailsField('Responsável do semeio', 'Viktor Dantas')}
          </div>
          <div class="agendado-details-production__line">
            ${createAgendadoDetailsField('Localização', 'Sala de Semeio')}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Produto Final</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${createAgendadoDetailsField('Quantidade de Produto', '5.000')}
            ${createAgendadoDetailsField('Estimativa (+5% Germinação)', '5.250')}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${createAgendadoDetailsField('Quantidade de Mudas Enxerto', '5.000')}
            ${createAgendadoDetailsField('Estimativa (+5% Germinação)', '5.250')}
            ${createAgendadoDetailsField('Quantidade de Mudas Porta-enxerto', '5.000')}
            ${createAgendadoDetailsField('Estimativa (+5% Germinação)', '5.250')}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Informações de Lote de Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__lots">
            ${seedLots.map((lot) => createAgendadoSeedLotItem(lot)).join('')}
          </div>
          <button type="button" class="agendado-termo-btn">
            ${icon('file', { size: 14 })}
            <span>Termo de Retirada</span>
          </button>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Informações de Insumos</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__supplies">
            ${supplies.map((supply) => createAgendadoSupplyItem(supply)).join('')}
          </div>
        </div>
      </div>

      ${stages.map((stage) => createAgendadoStageItem(stage)).join('')}
    </section>
  `;
}

function createAgendadoSeedLotItem(lot) {
  return `
    <article class="agendado-details-production__lot">
      <span class="agendado-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="agendado-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="agendado-details-production__grid agendado-details-production__grid--lot">
        ${createAgendadoDetailsField('Data de retirada do estoque', lot.stockDate)}
        ${createAgendadoDetailsField('Responsável retirada', lot.responsible)}
        <div class="agendado-details-field">
          <span class="agendado-details-field__label">Foto</span>
          <span class="agendado-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="agendado-details-production__link" data-agendado-action="details-view-image">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `;
}

function createAgendadoSupplyItem(supply) {
  return `
    <article class="agendado-details-production__supply">
      <div class="agendado-details-production__grid agendado-details-production__grid--supplies">
        ${createAgendadoDetailsField('Bandeja', supply.tray)}
        ${createAgendadoDetailsField('Quantidade', supply.quantity)}
        ${createAgendadoDetailsField('Responsável da retirada', supply.responsible)}
      </div>
    </article>
  `;
}

function createAgendadoStageItem(stage) {
  return `
    <div class="agendado-details-accordion is-collapsed" data-agendado-details-accordion>
      <button type="button" class="agendado-details-accordion__header" aria-expanded="false" data-agendado-details-toggle>
        <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
        <span>${stage}</span>
      </button>
      <div class="agendado-details-production__stage-caption">Detalhes</div>
      <div class="agendado-details-accordion__content agendado-details-production__content">
        <div class="agendado-placeholder">Em construção</div>
      </div>
    </div>
  `;
}

function createAgendadoCicloPanel() {
  const cycleSteps = [
    { title: 'Dias após o Semeio', period: '23/01/2025', days: '10 dias' },
    { title: 'Dias na Germinação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Casa de Vegetação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Sala de Corte', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Sala de Fusão', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Adaptação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Casa de Vegetação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias em Expedição', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
  ];
  const cycleTimeline = [
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025', daysAfterSowing: '0 Dias' },
  ];

  return `
    <section class="agendado-cycle" data-agendado-cycle>
      <div class="agendado-cycle-subtabs" role="tablist" aria-label="Ciclo da produção">
        <button type="button" class="agendado-cycle-subtabs__tab is-active" role="tab" aria-selected="true" data-agendado-cycle-tab="dias">Dias</button>
        <button type="button" class="agendado-cycle-subtabs__tab" role="tab" aria-selected="false" data-agendado-cycle-tab="linha-do-tempo">Linha do Tempo</button>
      </div>

      <div class="agendado-cycle-panel is-active" data-agendado-cycle-panel="dias">
        <div class="agendado-cycle-content">
          <section class="agendado-section">
            <h3 class="agendado-title">Dias</h3>
            <article class="agendado-cycle-forecast" aria-label="Previsão de Término">
              <h4 class="agendado-cycle-forecast__title">
                <span class="agendado-cycle-forecast__icon" aria-hidden="true">${icon('clock', { size: 14 })}</span>
                Previsão de Término
              </h4>

              <div class="agendado-cycle-donut" role="img" aria-label="365 dias de ciclo previstos">
                <div class="agendado-cycle-donut__inner">
                  <strong>365</strong>
                  <span>Dias</span>
                </div>
              </div>

              <div class="agendado-cycle-forecast__dates">
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${icon('calendar', { size: 14 })}</span>
                  <span>Data Abertura: <strong>12/12/2026</strong></span>
                </div>
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${icon('calendar', { size: 14 })}</span>
                  <span>Previsão Término: <strong>12/12/2026</strong></span>
                </div>
              </div>
            </article>
          </section>

          <section class="agendado-section">
            <h3 class="agendado-title">Etapas do Ciclo</h3>
            <div class="agendado-cycle-steps" aria-label="Etapas do ciclo">
              ${cycleSteps.map((step) => createAgendadoCycleStep(step)).join('')}
            </div>
          </section>
        </div>
      </div>

      <div class="agendado-cycle-panel" data-agendado-cycle-panel="linha-do-tempo">
        <div class="agendado-cycle-content">
          <section class="agendado-section agendado-cycle-timeline">
            <h3 class="agendado-title">Linha do Tempo</h3>
            <div class="timeline-card" aria-label="Linha do tempo do ciclo">
              ${cycleTimeline.map((item) => createAgendadoCycleTimelineItem(item)).join('')}
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}

function createAgendadoCycleStep(step) {
  return `
    <article class="agendado-cycle-step">
      <div class="agendado-cycle-step__main">
        <strong class="agendado-cycle-step__title">${step.title}</strong>
        <span class="agendado-cycle-step__period">${step.period}</span>
      </div>
      <strong class="agendado-cycle-step__days">${step.days}</strong>
    </article>
  `;
}

function createAgendadoCycleTimelineItem(item) {
  return `
    <article class="timeline-item">
      <div class="timeline-marker" aria-hidden="true">
        <span class="timeline-dot"></span>
        <span class="timeline-line"></span>
      </div>
      <div class="timeline-content">
        <strong class="timeline-title">${item.title}</strong>
        <span class="timeline-subtitle">Responsável: <strong>${item.responsible}</strong></span>
      </div>
      <div class="timeline-meta">
        <span class="timeline-date">${item.date}</span>
        ${item.daysAfterSowing ? `<span class="timeline-days-label">Dias após o Semeio: <strong>${item.daysAfterSowing}</strong></span>` : ''}
      </div>
    </article>
  `;
}

function createAgendadoDetailsField(label, value) {
  return `
    <div class="agendado-details-field">
      <span class="agendado-details-field__label">${label}</span>
      <strong class="agendado-details-field__value">${value}</strong>
    </div>
  `;
}

function createAgendadoReagendarButton() {
  return `
    <button type="button" class="agendado-reagendar-btn" data-agendado-action="reagendar">
      ${icon('calendar', { size: 18 })}
      <span>Reagendar</span>
    </button>
  `;
}

function createAgendadoQrButton() {
  return `
    <button type="button" class="agendado-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `;
}

function createAgendadoTermoButton() {
  return `
    <button type="button" class="agendado-termo-btn">
      ${icon('file', { size: 14 })}
      <span>Termo de Retirada</span>
    </button>
  `;
}

function createAgendadoUploadPreview() {
  return `
    <div class="agendado-upload-preview" aria-label="Arquivo anexado">
      <img src="/assets/arquivo.png" alt="" aria-hidden="true" class="agendado-upload-preview__thumb" />
      <div class="agendado-upload-preview__content">
        <strong class="agendado-upload-preview__name">File name.ext</strong>
        <span class="agendado-upload-preview__status">Upload complete.</span>
      </div>
      <div class="agendado-upload-preview__actions agendado-icon-actions">
        <button type="button" aria-label="Visualizar">${icon('eye', { size: 16 })}</button>
        <button type="button" aria-label="Excluir">${icon('trash', { size: 16 })}</button>
      </div>
    </div>
  `;
}

function createAgendadoKpi(label, value, tag = '') {
  return `
    <div class="agendado-kpi">
      <span class="agendado-kpi__label">${label}${tag ? ` <em>${tag}</em>` : ''}</span>
      <strong class="agendado-kpi__value">${value}</strong>
    </div>
  `;
}

function createAgendadoLoteTable(title, total, options = {}) {
  const { collapsed = false, showTable = true } = options;
  const caretClass = collapsed ? 'is-collapsed' : 'is-expanded';
  const selectId = `agendado-cultura-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return `
    <div class="agendado-table-group">
      <span class="agendado-subtitle">${title}</span>
      <div class="agendado-table-block ${collapsed ? 'agendado-table-block--collapsed' : ''}">
        <div class="agendado-table-block__subheader">
          <span class="agendado-table-block__caret ${caretClass}" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <label class="sr-only" for="${selectId}">Selecionar cultura</label>
          <select id="${selectId}" class="agendado-table-block__culture-select">
            <option value="x-y">Cultura: X - Cultivar: Y</option>
            <option value="x-z">Cultura: X - Cultivar: Z</option>
            <option value="y-a">Cultura: Y - Cultivar: A</option>
          </select>
          <span class="agendado-table-block__total">Total: ${total}</span>
        </div>
        ${showTable ? `
        <div class="agendado-table-wrap">
          <table class="agendado-table" aria-label="${title}">
            <thead>
              <tr>
                <th>Lote</th>
                <th>Fornecedor</th>
                <th>Germinação</th>
                <th>Quantidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${createAgendadoTableActions()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${createAgendadoTableActions()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${createAgendadoTableActions()}</td></tr>
            </tbody>
          </table>
        </div>` : ''}
      </div>
    </div>
  `;
}

function createAgendadoTableActions() {
  return `
    <div class="agendado-table-actions agendado-icon-actions">
      <button type="button" aria-label="Editar">${icon('edit', { size: 14 })}</button>
      <button type="button" aria-label="Excluir">${icon('trash', { size: 14 })}</button>
      <button type="button" aria-label="Visualizar">${icon('eye', { size: 14 })}</button>
    </div>
  `;
}

function createAgendadoDrawerFooter() {
  return `
    <div class="agendado-footer">
      ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="cancel"')}
      ${Button.create({ text: 'Iniciar Semeio', variant: 'primary', size: 'sm' }).replace('<button', '<button data-agendado-action="start-semeio"')}
    </div>
  `;
}

function initPedidoDetailsDrawer() {
  const boardElement = document.getElementById('kanban-board');
  if (!boardElement) return () => {};

  const drawerId = 'kanban-pedido-details-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  document.body.insertAdjacentHTML('beforeend', Drawer.create({
    id: drawerId,
    title: 'Detalhes do Pedido',
    width: 600,
    content: '<section class="orders-details-drawer"></section>',
    footer: createPedidoDetailsDrawerFooter(),
  }));

  const replanModalId = 'kanban-replan-item-modal';
  let replanModalCleanup = () => {};
  let replanModalReturnFocus = null;
  const cancelOrderItemsModalId = 'kanban-cancel-order-items-modal';
  let cancelOrderItemsModalCleanup = () => {};
  let cancelOrderItemsModalReturnFocus = null;

  function closeReplanModal({ restoreFocus = true } = {}) {
    const modalElement = document.querySelector(`[data-modal="${replanModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${replanModalId}"]`);
    if (!modalElement || !backdropElement) return;

    replanModalCleanup();
    Modal.close(replanModalId);

    if (document.querySelector(`[data-drawer="${drawerId}"]`)?.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    backdropElement.remove();

    if (restoreFocus && replanModalReturnFocus?.focus) {
      replanModalReturnFocus.focus();
    }
    replanModalReturnFocus = null;
  }

  function openReplanModal({ anchorEl = null, orderItemId = '' } = {}) {
    closeReplanModal({ restoreFocus: false });

    replanModalReturnFocus = anchorEl;
    document.body.insertAdjacentHTML('beforeend', createReplanItemModal({ modalId: replanModalId, orderItemId }));

    const modalElement = document.querySelector(`[data-modal="${replanModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${replanModalId}"]`);
    if (!modalElement || !backdropElement) return;

    const cleanupInput = Input.init(modalElement);
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const cancelButton = modalElement.querySelector('[data-replan-action="cancel"]');
    const confirmButton = modalElement.querySelector('[data-replan-action="confirm"]');
    const reasonSelect = modalElement.querySelector('#replan-reason');
    const opSelect = modalElement.querySelector('#replan-op');

    const setFieldError = (fieldKey, message = 'Campo obrigatório.') => {
      const errorElement = modalElement.querySelector(`[data-replan-error="${fieldKey}"]`);
      const fieldElement = modalElement.querySelector(`[data-replan-field="${fieldKey}"] .field`);
      if (fieldElement) fieldElement.classList.add('field--error');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.hidden = false;
      }
    };

    const clearFieldError = (fieldKey) => {
      const errorElement = modalElement.querySelector(`[data-replan-error="${fieldKey}"]`);
      const fieldElement = modalElement.querySelector(`[data-replan-field="${fieldKey}"] .field`);
      if (fieldElement) fieldElement.classList.remove('field--error');
      if (errorElement) errorElement.hidden = true;
    };

    const validate = () => {
      clearFieldError('reason');
      clearFieldError('op');

      let valid = true;
      if (!reasonSelect?.value) {
        setFieldError('reason');
        valid = false;
      }
      if (!opSelect?.value) {
        setFieldError('op');
        valid = false;
      }

      if (!valid) {
        (reasonSelect?.value ? opSelect : reasonSelect)?.focus?.();
      }

      return valid;
    };

    const handleClose = () => closeReplanModal();
    const handleBackdrop = (event) => {
      if (event.target !== backdropElement) return;
      closeReplanModal();
    };
    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closeReplanModal();
    };
    const handleReasonChange = () => clearFieldError('reason');
    const handleOpChange = () => clearFieldError('op');
    const handleConfirm = () => {
      if (!validate()) return;

      Toast.success('Replanejamento confirmado', {
        message: 'O item foi marcado para replanejamento.',
      });
      closeReplanModal();
    };

    closeButton?.addEventListener('click', handleClose);
    cancelButton?.addEventListener('click', handleClose);
    confirmButton?.addEventListener('click', handleConfirm);
    backdropElement.addEventListener('click', handleBackdrop);
    document.addEventListener('keydown', handleKeydown, true);
    reasonSelect?.addEventListener('change', handleReasonChange);
    opSelect?.addEventListener('change', handleOpChange);

    replanModalCleanup = () => {
      closeButton?.removeEventListener('click', handleClose);
      cancelButton?.removeEventListener('click', handleClose);
      confirmButton?.removeEventListener('click', handleConfirm);
      backdropElement.removeEventListener('click', handleBackdrop);
      document.removeEventListener('keydown', handleKeydown, true);
      reasonSelect?.removeEventListener('change', handleReasonChange);
      opSelect?.removeEventListener('change', handleOpChange);
      if (typeof cleanupInput === 'function') cleanupInput();
      replanModalCleanup = () => {};
    };

    Modal.open(replanModalId);
    setTimeout(() => {
      reasonSelect?.focus?.();
    }, 120);
  }

  function closeCancelOrderItemsModal({ restoreFocus = true } = {}) {
    const modalElement = document.querySelector(`[data-modal="${cancelOrderItemsModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${cancelOrderItemsModalId}"]`);
    if (!modalElement || !backdropElement) return;

    cancelOrderItemsModalCleanup();
    Modal.close(cancelOrderItemsModalId);

    if (document.querySelector(`[data-drawer="${drawerId}"]`)?.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    backdropElement.remove();

    if (restoreFocus && cancelOrderItemsModalReturnFocus?.focus) {
      cancelOrderItemsModalReturnFocus.focus();
    }
    cancelOrderItemsModalReturnFocus = null;
  }

  function openCancelOrderItemsModal({ anchorEl = null, details = null } = {}) {
    closeCancelOrderItemsModal({ restoreFocus: false });

    cancelOrderItemsModalReturnFocus = anchorEl;
    document.body.insertAdjacentHTML('beforeend', createCancelOrderItemsModal({
      modalId: cancelOrderItemsModalId,
      items: details?.items || [],
    }));

    const modalElement = document.querySelector(`[data-modal="${cancelOrderItemsModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${cancelOrderItemsModalId}"]`);
    if (!modalElement || !backdropElement) return;

    const closeButton = modalElement.querySelector('[data-modal-close]');
    const cancelButton = modalElement.querySelector('[data-cancel-order-items-action="cancel"]');
    const confirmButton = modalElement.querySelector('[data-cancel-order-items-action="confirm"]');
    const checkboxes = Array.from(modalElement.querySelectorAll('[data-cancel-order-item-checkbox]'));

    const getSelectedItemIds = () => checkboxes
      .filter((checkbox) => checkbox instanceof HTMLInputElement && checkbox.checked)
      .map((checkbox) => checkbox.value);

    const syncConfirmButtonState = () => {
      if (!confirmButton) return;
      confirmButton.disabled = getSelectedItemIds().length === 0;
    };

    const handleClose = () => closeCancelOrderItemsModal();
    const handleBackdrop = (event) => {
      if (event.target !== backdropElement) return;
      closeCancelOrderItemsModal();
    };
    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closeCancelOrderItemsModal();
    };
    const handleConfirm = () => {
      const selectedIds = getSelectedItemIds();
      if (!selectedIds.length) return;

      const selectedItems = Array.isArray(details?.items)
        ? details.items.filter((item) => selectedIds.includes(String(item?.id)))
        : [];

      console.log('Cancelar itens do pedido', {
        orderCode: details?.orderCode || '',
        items: selectedItems.map((item) => ({
          id: item?.id || '',
          product: item?.product || '',
          quantity: item?.quantity || '',
        })),
      });
      closeCancelOrderItemsModal();
    };

    closeButton?.addEventListener('click', handleClose);
    cancelButton?.addEventListener('click', handleClose);
    confirmButton?.addEventListener('click', handleConfirm);
    backdropElement.addEventListener('click', handleBackdrop);
    document.addEventListener('keydown', handleKeydown, true);
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', syncConfirmButtonState);
    });

    cancelOrderItemsModalCleanup = () => {
      closeButton?.removeEventListener('click', handleClose);
      cancelButton?.removeEventListener('click', handleClose);
      confirmButton?.removeEventListener('click', handleConfirm);
      backdropElement.removeEventListener('click', handleBackdrop);
      document.removeEventListener('keydown', handleKeydown, true);
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('change', syncConfirmButtonState);
      });
      cancelOrderItemsModalCleanup = () => {};
    };

    Modal.open(cancelOrderItemsModalId);
    syncConfirmButtonState();
    setTimeout(() => {
      checkboxes[0]?.focus?.();
    }, 120);
  }

  const drawerControls = Drawer.init({
    id: drawerId,
    root: document,
    onClose: () => {
      closeReplanModal({ restoreFocus: false });
      closePlanningModal({ restoreFocus: false });
      closeCancelOrderItemsModal({ restoreFocus: false });
    },
  });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};

  const headerElement = drawerElement.querySelector('.drawer__header');
  const titleElement = drawerElement.querySelector('[data-drawer-title]');
  const closeButton = drawerElement.querySelector('[data-drawer-close]');
  const bodyElement = drawerElement.querySelector('.drawer__body');
  const footerElement = drawerElement.querySelector('.drawer__footer');
  if (!bodyElement || !footerElement) return () => {};

  const state = {
    activeTab: 0,
    currentDetails: null,
    drawerRules: null,
    selectedHistoryProduct: '',
    selectedPlanningProduct: '',
    showCanceledPlanning: false,
    expandedPlanningByProduct: {},
  };

  const setHeaderBadge = (details) => {
    if (!headerElement || !closeButton) return;
    let badgeHost = headerElement.querySelector('[data-orders-header-badge]');
    if (!badgeHost) {
      badgeHost = document.createElement('span');
      badgeHost.className = 'orders-details-drawer__header-status';
      badgeHost.setAttribute('data-orders-header-badge', '');
      headerElement.insertBefore(badgeHost, closeButton);
    }
    badgeHost.innerHTML = Badge.create({
      text: details.billingStatus,
      variant: 'success',
      style: 'soft',
      size: 'sm',
    });
  };

  const renderDrawer = (details) => {
    if (!details) return;
    const drawerRules = getPedidoDrawerRules(details);
    state.currentDetails = details;
    state.drawerRules = drawerRules;
    state.activeTab = 0;
    state.selectedHistoryProduct = details.items?.[0]?.id || '';
    state.selectedPlanningProduct = getPedidoPlanningInitialProduct(details);
    state.showCanceledPlanning = false;
    state.expandedPlanningByProduct = {};
    ensurePedidoPlanningDefaultExpanded(state, details);

    if (titleElement) titleElement.textContent = details.companyName;
    setHeaderBadge(details);
    bodyElement.innerHTML = createPedidoDetailsDrawerContent(details, state);
    footerElement.innerHTML = createPedidoDetailsDrawerFooter(details, drawerRules);
  };

  const applyTabsState = (tabIndex) => {
    const tabsRoot = drawerElement.querySelector('#orders-details-tabs')?.closest('[data-tabs]');
    const panelsRoot = tabsRoot?.parentElement;
    const tabs = tabsRoot?.querySelectorAll('.tabs-tab');
    const panels = panelsRoot?.querySelectorAll('.tabs-panel');
    if (!tabs || !panels) return;

    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });

    panels.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
  };

  const handleBoardClick = (event) => {
    const cardElement = event.target.closest('.kanban-card');
    if (cardElement && boardElement.contains(cardElement)) {
      const codeLink = event.target.closest('.kanban-card__code');
      if (codeLink) event.preventDefault();

      const details = createPedidoDetailsFromCard(cardElement);
      renderDrawer(details);
      drawerControls.open(cardElement);
      return;
    }

    const columnTitle = event.target.closest('.kanban-column__title');
    if (!columnTitle || !boardElement.contains(columnTitle)) return;

    const column = columnTitle.closest('[data-column-id]');
    if (!column) return;

    const firstCard = Array.from(column.querySelectorAll('.kanban-card'))
      .find((columnCard) => columnCard.offsetParent !== null && !columnCard.hasAttribute('hidden'))
      || column.querySelector('.kanban-card');
    if (!firstCard) return;

    const details = createPedidoDetailsFromCard(firstCard);
    renderDrawer(details);
    drawerControls.open(firstCard);
  };

  const handleDrawerClick = (event) => {
    const footerActionButton = event.target.closest('[data-pedido-drawer-action]');
    if (footerActionButton) {
      const action = footerActionButton.dataset.pedidoDrawerAction;
      if (action === 'back') {
        drawerControls.close();
        return;
      }
      if (action === 'cancel-total') {
        console.log('Cancelar pedido total', state.currentDetails?.orderCode || '');
        return;
      }
      if (action === 'approve') {
        Toast.success('Pedido aprovado', {
          message: `Pedido ${state.currentDetails?.orderCode || ''} aprovado com sucesso.`,
        });
        return;
      }
      if (action === 'send-approval') {
        Toast.success('Pedido enviado para aprovação', {
          message: `Pedido ${state.currentDetails?.orderCode || ''} encaminhado para aprovação.`,
        });
        return;
      }
      if (action === 'close-planning') {
        console.log('Encerrar Planejamento', state.currentDetails?.orderCode || '');
        return;
      }
      if (action === 'cancel-order-items') {
        openCancelOrderItemsModal({
          anchorEl: footerActionButton,
          details: state.currentDetails,
        });
        return;
      }
    }

    const itemActionButton = event.target.closest('[data-order-item-action]');
    if (itemActionButton) {
      const action = itemActionButton.dataset.orderItemAction;
      const orderItem = itemActionButton.closest('[data-order-item]');
      const itemId = orderItem ? orderItem.dataset.orderItem : '';
      if (action === 'plan') {
        const currentItem = state.currentDetails?.items?.find((item) => String(item.id) === String(itemId));
        openPlanningModal({
          anchorEl: itemActionButton,
          memoryKey: `${state.currentDetails?.orderCode || 'pedido'}:${itemId || 'item'}`,
          orderItem: {
            id: currentItem?.id || '',
            product: currentItem?.product || 'Muda de Eucalipto Clone - MUD-001',
            totalPedido: currentItem?.quantity || '5000',
            available: currentItem?.availableQuantity || '5000',
            orderCode: state.currentDetails?.orderCode || '',
          },
          onAddRow: (planningData) => {
            addPlanningCardToProductionKanban({
              details: state.currentDetails,
              item: currentItem,
              planningData,
            });
          },
        });
        return;
      }
      if (action === 'replan') {
        openReplanModal({
          anchorEl: itemActionButton,
          orderItemId: itemId,
        });
        return;
      }
      console.log(`Ação ${action} no item`, itemId);
      return;
    }

    const toggleButton = event.target.closest('[data-order-item-toggle]');
    if (toggleButton) {
      const orderItem = toggleButton.closest('[data-order-item]');
      if (!orderItem) return;
      orderItem.classList.toggle('is-expanded');
      return;
    }

    const planningToggleButton = event.target.closest('[data-order-planning-toggle]');
    if (planningToggleButton) {
      const planningId = planningToggleButton.dataset.orderPlanningToggle || '';
      if (!planningId || !state.currentDetails) return;

      const selectedProduct = state.selectedPlanningProduct || getPedidoPlanningInitialProduct(state.currentDetails);
      if (!selectedProduct) return;

      const currentSet = new Set(state.expandedPlanningByProduct[selectedProduct] || []);
      if (currentSet.has(planningId)) currentSet.delete(planningId);
      else currentSet.add(planningId);
      state.expandedPlanningByProduct[selectedProduct] = Array.from(currentSet);
      renderPedidoPlanningList(drawerElement, state.currentDetails, state);
      return;
    }

    const planningActionButton = event.target.closest('[data-order-planning-action]');
    if (planningActionButton) {
      const action = planningActionButton.dataset.orderPlanningAction;
      const planningId = planningActionButton.dataset.planningId || '';
      if (action === 'open-op') {
        console.log('Acessar OP do planejamento', planningId);
      }
      return;
    }

    const clickedTab = event.target.closest('#orders-details-tabs .tabs-tab');
    if (clickedTab) {
      const tabIndex = Number(clickedTab.dataset.tab);
      if (Number.isNaN(tabIndex)) return;
      state.activeTab = tabIndex;
      applyTabsState(tabIndex);
    }
  };

  const handleDrawerChange = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement) && !(target instanceof HTMLInputElement)) return;

    if (target instanceof HTMLInputElement && target.dataset.ordersPlanningShowCanceled === 'true') {
      state.showCanceledPlanning = target.checked;
      ensurePedidoPlanningDefaultExpanded(state, state.currentDetails);
      renderPedidoPlanningList(drawerElement, state.currentDetails, state);
      return;
    }

    if (!(target instanceof HTMLSelectElement)) return;

    if (target.dataset.ordersPlanningProduct === 'true') {
      state.selectedPlanningProduct = target.value || '';
      ensurePedidoPlanningDefaultExpanded(state, state.currentDetails);
      renderPedidoPlanningTab(drawerElement, state.currentDetails, state);
      return;
    }
    if (target.dataset.ordersHistoryProduct !== 'true') return;
    state.selectedHistoryProduct = target.value || '';
    renderPedidoHistoryTimeline(drawerElement, state.currentDetails, state.selectedHistoryProduct);
  };

  boardElement.addEventListener('click', handleBoardClick);
  drawerElement.addEventListener('click', handleDrawerClick);
  drawerElement.addEventListener('change', handleDrawerChange);

  return () => {
    closeReplanModal({ restoreFocus: false });
    closePlanningModal({ restoreFocus: false });
    closeCancelOrderItemsModal({ restoreFocus: false });
    boardElement.removeEventListener('click', handleBoardClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    drawerElement.removeEventListener('change', handleDrawerChange);
    if (drawerControls.cleanup) drawerControls.cleanup();
    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createPedidoDetailsFromCard(cardElement) {
  const code = cardElement.querySelector('.kanban-card__code')?.textContent?.trim() || '';
  const subCode = cardElement.querySelector('.kanban-card__subtitle')?.textContent?.trim() || '';
  const columnElement = cardElement.closest('[data-column-id]');
  const columnId = String(columnElement?.dataset?.columnId || '').trim().toLowerCase();
  const stageStatus = columnElement?.querySelector('.kanban-column__title')?.textContent?.trim() || 'Recebido';
  const baseDetails = PEDIDOS_DETAILS_MOCK[code] || PEDIDOS_DETAILS_MOCK['A2W-2025-001'];
  const cloned = JSON.parse(JSON.stringify(baseDetails));
  const statusKey = getPedidoStatusKey({ columnId, stageStatus });
  const hasPlanningAvailableQty = cloned?.planningAvailableQty !== undefined && cloned?.planningAvailableQty !== null;
  const planningAvailableQty = hasPlanningAvailableQty
    ? parsePedidoNumericValue(cloned?.planningAvailableQty)
    : computePedidoPlanningAvailableQty(cloned?.items);
  return {
    ...cloned,
    orderCode: code || 'A2W-2025-001',
    subCode: subCode || 'TG-45678',
    columnId,
    stageStatus,
    statusKey,
    planningAvailableQty,
    billingStatus: 'Faturado',
  };
}

function normalizePedidoStatusToken(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function getPedidoStatusKey({ columnId = '', stageStatus = '' } = {}) {
  const normalizedColumnId = normalizePedidoStatusToken(columnId);
  const normalizedStatus = normalizePedidoStatusToken(stageStatus);

  const mapByColumnId = {
    recebido: 'received',
    'aguardando-aprovacao': 'awaiting-approval',
    'em-preparacao': 'in-preparation',
    'em-producao': 'in-production',
    'em-expedicao': 'in-shipping',
    'em-transito': 'in-transit',
    finalizado: 'finalized',
    finalizados: 'finalized',
  };
  if (mapByColumnId[normalizedColumnId]) return mapByColumnId[normalizedColumnId];

  const mapByLabel = {
    recebido: 'received',
    'aguardando aprovacao': 'awaiting-approval',
    'em preparacao': 'in-preparation',
    'em producao': 'in-production',
    'em expedicao': 'in-shipping',
    'em transito': 'in-transit',
    finalizado: 'finalized',
    finalizados: 'finalized',
  };
  if (mapByLabel[normalizedStatus]) return mapByLabel[normalizedStatus];

  return 'default';
}

function parsePedidoNumericValue(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value !== 'string') return 0;
  const cleaned = value.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function computePedidoPlanningAvailableQty(items = []) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((totalRemaining, item) => {
    const available = parsePedidoNumericValue(item?.availableQuantity);
    const plannedUsed = Array.isArray(item?.planning)
      ? item.planning.reduce((sum, plan) => {
        const amount = parsePedidoNumericValue(plan?.amount);
        return (plan?.type === 'planned' || plan?.type === 'canceled') ? sum + amount : sum;
      }, 0)
      : 0;
    const remaining = Math.max(0, available - plannedUsed);
    return totalRemaining + remaining;
  }, 0);
}

function getPedidoDrawerRules(details = {}) {
  const statusKey = details?.statusKey || getPedidoStatusKey({
    columnId: details?.columnId,
    stageStatus: details?.stageStatus,
  });
  const planningAvailableQty = parsePedidoNumericValue(details?.planningAvailableQty);

  const defaultRules = {
    statusKey,
    hidePlanCancelButtons: false,
    hideFooterCancelTotal: false,
    replaceFooterCancelTotal: false,
    footerPrimaryAction: null,
  };

  const rulesByStatus = {
    received: {
      ...defaultRules,
      hidePlanCancelButtons: true,
      footerPrimaryAction: {
        key: 'send-approval',
        label: 'Enviar para Aprovação',
        disabled: false,
      },
    },
    'awaiting-approval': {
      ...defaultRules,
      hidePlanCancelButtons: true,
      footerPrimaryAction: {
        key: 'approve',
        label: 'Aprovar',
        disabled: false,
      },
    },
    'in-preparation': {
      ...defaultRules,
      footerPrimaryAction: {
        key: 'close-planning',
        label: 'Encerrar Planejamento',
        disabled: planningAvailableQty > 0,
      },
    },
    'in-production': {
      ...defaultRules,
      hidePlanCancelButtons: true,
      replaceFooterCancelTotal: true,
      footerPrimaryAction: {
        key: 'cancel-order-items',
        label: 'Cancelar Itens do Pedido',
        disabled: false,
      },
    },
    'in-shipping': {
      ...defaultRules,
      hidePlanCancelButtons: true,
      hideFooterCancelTotal: true,
    },
    'in-transit': {
      ...defaultRules,
      hidePlanCancelButtons: true,
      hideFooterCancelTotal: true,
    },
    finalized: {
      ...defaultRules,
      hidePlanCancelButtons: true,
      hideFooterCancelTotal: true,
    },
  };

  return rulesByStatus[statusKey] || defaultRules;
}

function createPedidoDetailsDrawerContent(details, drawerState) {
  const activeTab = drawerState?.activeTab || 0;
  const selectedHistoryProduct = drawerState?.selectedHistoryProduct || '';
  const rules = drawerState?.drawerRules || getPedidoDrawerRules(details);
  const tabsHtml = Tabs.createWithPanels({
    id: 'orders-details-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab,
    tabs: [
      { label: 'Informações gerais', content: createPedidoDetailsInfoTab(details, rules) },
      { label: 'Histórico', content: createPedidoDetailsHistoryTab(details, selectedHistoryProduct) },
      { label: 'Planejamento', content: createPedidoDetailsPlanningTab(details, drawerState) },
    ],
  });

  return `
    <section class="orders-details-drawer">
      <div class="orders-details-drawer__meta">
        <a href="#" class="orders-details-drawer__order-code">${details.orderCode}</a>
        <span class="orders-details-drawer__dot" aria-hidden="true">•</span>
        <span class="orders-details-drawer__subcode">${details.subCode}</span>
        <span class="orders-details-drawer__stage">${Badge.create({ text: details.stageStatus, variant: 'light', style: 'soft', size: 'sm' })}</span>
      </div>
      ${tabsHtml}
    </section>
  `;
}

function createPedidoDetailsHistoryTab(details, selectedProductId = '') {
  const products = (details?.items || []).map((item) => ({
    value: item.id,
    label: item.product,
  }));
  const selectedValue = selectedProductId || products[0]?.value || '';

  return `
    <section class="orders-history" data-orders-history>
      <div class="orders-history__filter">
        ${Input.createSelect({
          id: `orders-history-product-${details?.orderCode || 'default'}`,
          placeholder: 'Selecione um produto',
          items: products,
          value: selectedValue,
          className: 'orders-history__product-select',
        }).replace('<select ', '<select data-orders-history-product="true" ')}
      </div>
      ${createPedidoHistorySummary(details, selectedValue)}
      <section class="orders-history__timeline-wrap">
        <h3 class="orders-history__title">Histórico do Pedido</h3>
        <div class="orders-history__timeline" data-orders-history-events>
          ${createPedidoHistoryEventsMarkup(details, selectedValue)}
        </div>
      </section>
    </section>
  `;
}

function createPedidoHistorySummary(details, selectedProductId = '') {
  const selectedItem = (details?.items || []).find((item) => item.id === selectedProductId) || details?.items?.[0];

  return `
    <article class="orders-history__summary">
      <div class="orders-history__summary-item">
        <span class="orders-history__summary-label">Produto</span>
        <strong class="orders-history__summary-value">${selectedItem?.product || '-'}</strong>
      </div>
      <div class="orders-history__summary-item">
        <span class="orders-history__summary-label">Total Pedido:</span>
        <strong class="orders-history__summary-value">${selectedItem?.quantity || '-'}</strong>
      </div>
    </article>
  `;
}

function getPedidoHistoryEvents(details, selectedProductId = '') {
  const orderCode = details?.orderCode || '';
  const orderHistory = PEDIDOS_HISTORY_MOCK[orderCode];
  if (!orderHistory) return [];

  const fallbackProductId = details?.items?.[0]?.id || '';
  const productId = selectedProductId || fallbackProductId;
  const events = orderHistory[productId];
  return Array.isArray(events) ? events : [];
}

function createPedidoHistoryEventsMarkup(details, selectedProductId = '') {
  const events = getPedidoHistoryEvents(details, selectedProductId);
  if (!events.length) {
    return `
      <div class="orders-history__empty">
        Sem eventos para este produto.
      </div>
    `;
  }

  return events.map((eventItem) => createPedidoHistoryEventItem(eventItem)).join('');
}

function createPedidoHistoryEventItem(eventItem) {
  return `
    <article class="orders-history-item">
      <div class="orders-history-item__marker" aria-hidden="true">
        <span class="orders-history-item__dot orders-history-item__dot--${eventItem.badgeType}"></span>
        <span class="orders-history-item__line"></span>
      </div>
      <div class="orders-history-item__content">
        <div class="orders-history-item__head">
          <strong class="orders-history-item__title">${eventItem.title}</strong>
          <span class="orders-history-item__badge orders-history-item__badge--${eventItem.badgeType}">
            ${Badge.create({ text: eventItem.badgeLabel, variant: 'light', style: 'soft', size: 'sm' })}
          </span>
        </div>
        <span class="orders-history-item__date">${eventItem.date}</span>
        <p class="orders-history-item__description">${eventItem.description}</p>
        <span class="orders-history-item__meta">
          ${icon('user', { size: 12 })}
          <span>${eventItem.metaRole}: ${eventItem.metaName}</span>
        </span>
      </div>
    </article>
  `;
}

function renderPedidoHistoryTimeline(drawerElement, details, selectedProductId = '') {
  if (!drawerElement || !details) return;
  const historyRoot = drawerElement.querySelector('[data-orders-history]');
  const summaryElement = historyRoot?.querySelector('.orders-history__summary');
  const eventsElement = historyRoot?.querySelector('[data-orders-history-events]');
  if (!summaryElement || !eventsElement) return;

  summaryElement.outerHTML = createPedidoHistorySummary(details, selectedProductId);
  eventsElement.innerHTML = createPedidoHistoryEventsMarkup(details, selectedProductId);
}

function formatPlanningNumber(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return '0';
  return numericValue.toLocaleString('pt-BR');
}

function getPedidoPlanningOrderData(details) {
  const orderCode = details?.orderCode || '';
  return PEDIDOS_PLANNING_MOCK[orderCode] || PEDIDOS_PLANNING_MOCK['A2W-2025-001'];
}

function getPedidoPlanningInitialProduct(details) {
  return getPedidoPlanningOrderData(details)?.products?.[0]?.id || '';
}

function getPedidoPlanningCurrentProduct(details, selectedProductId = '') {
  const planningData = getPedidoPlanningOrderData(details);
  return planningData?.products?.find((product) => product.id === selectedProductId) || planningData?.products?.[0] || null;
}

function getPedidoPlanningDataset(details, selectedProductId = '') {
  const planningData = getPedidoPlanningOrderData(details);
  const selectedProduct = getPedidoPlanningCurrentProduct(details, selectedProductId);
  const dataset = selectedProduct ? planningData?.byProduct?.[selectedProduct.id] : null;

  return {
    selectedProduct,
    metrics: dataset?.metrics || { total: 0, planned: 0, canceled: 0, pending: 0 },
    plans: Array.isArray(dataset?.plans) ? dataset.plans : [],
  };
}

function getPedidoPlanningVisiblePlans(details, selectedProductId = '', showCanceled = false) {
  const { plans } = getPedidoPlanningDataset(details, selectedProductId);
  if (showCanceled) return plans;
  return plans.filter((plan) => plan.status !== 'cancelado');
}

function ensurePedidoPlanningDefaultExpanded(state, details) {
  if (!state || !details) return;
  const selectedProductId = state.selectedPlanningProduct || getPedidoPlanningInitialProduct(details);
  if (!selectedProductId) return;

  state.selectedPlanningProduct = selectedProductId;
  const visiblePlans = getPedidoPlanningVisiblePlans(details, selectedProductId, state.showCanceledPlanning);
  const visibleIds = new Set(visiblePlans.map((plan) => plan.id));
  const currentIds = (state.expandedPlanningByProduct[selectedProductId] || []).filter((id) => visibleIds.has(id));

  if (!currentIds.length && visiblePlans[0]) {
    state.expandedPlanningByProduct[selectedProductId] = [visiblePlans[0].id];
    return;
  }

  state.expandedPlanningByProduct[selectedProductId] = currentIds;
}

function createPedidoDetailsPlanningTab(details, state = {}) {
  const planningData = getPedidoPlanningOrderData(details);
  const selectedProductId = state?.selectedPlanningProduct || planningData?.products?.[0]?.id || '';
  const showCanceled = Boolean(state?.showCanceledPlanning);
  const productOptions = (planningData?.products || []).map((product) => ({
    value: product.id,
    label: product.label,
  }));

  const productSelect = Input.createSelect({
    id: `orders-planning-product-${details?.orderCode || 'default'}`,
    placeholder: 'Selecione um produto',
    items: productOptions,
    value: selectedProductId,
  }).replace('<select ', '<select data-orders-planning-product="true" ');

  const showCanceledToggle = Toggle.createSimple({
    id: `orders-planning-show-canceled-${details?.orderCode || 'default'}`,
    checked: showCanceled,
    size: 'sm',
  }).replace('class="toggle-input"', 'class="toggle-input" data-orders-planning-show-canceled="true"');

  return `
    <section class="orders-planning" data-orders-planning>
      <div class="orders-planning__filters">
        <div class="orders-planning__filters-main">
          ${productSelect}
        </div>
        <label class="orders-planning__toggle-wrap">
          <span class="orders-planning__toggle-label">Ver Cancelados</span>
          ${showCanceledToggle}
        </label>
      </div>
      <div class="orders-planning__selected-product" data-orders-planning-product-caption>
        ${createPedidoPlanningProductCaption(details, selectedProductId)}
      </div>
      <section class="orders-planning__log">
        <h3 class="orders-planning__title">Log de Planejamento</h3>
        <p class="orders-planning__subtitle">Histórico de todas as ações de planejamento realizadas para este pedido</p>
      </section>
      <div class="orders-planning__metrics" data-orders-planning-metrics>
        ${createPedidoPlanningMetrics(details, selectedProductId)}
      </div>
      <section class="orders-planning__list-wrap" data-orders-planning-list-wrap>
        ${createPedidoPlanningListSection(details, state)}
      </section>
    </section>
  `;
}

function createPedidoPlanningProductCaption(details, selectedProductId = '') {
  const selectedProduct = getPedidoPlanningCurrentProduct(details, selectedProductId);
  return `
    <span class="orders-planning__caption-label">Produto</span>
    <strong class="orders-planning__caption-value">${selectedProduct?.label || '-'}</strong>
  `;
}

function createPedidoPlanningMetrics(details, selectedProductId = '') {
  const { metrics } = getPedidoPlanningDataset(details, selectedProductId);
  const metricItems = [
    { label: 'Qtd. Total do Pedido', value: formatPlanningNumber(metrics.total), tone: 'default' },
    { label: 'Qtd. Planejada', value: formatPlanningNumber(metrics.planned), tone: 'primary' },
    { label: 'Qtd. Cancelada', value: formatPlanningNumber(metrics.canceled), tone: 'primary' },
    { label: 'Qtd. Pendente', value: formatPlanningNumber(metrics.pending), tone: 'warning' },
  ];

  return metricItems.map((item) => `
    <div class="orders-planning-metric">
      <span class="orders-planning-metric__label">${item.label}</span>
      <strong class="orders-planning-metric__value orders-planning-metric__value--${item.tone}">${item.value}</strong>
    </div>
  `).join('');
}

function createPedidoPlanningListSection(details, state = {}) {
  const selectedProductId = state?.selectedPlanningProduct || getPedidoPlanningInitialProduct(details);
  const showCanceled = Boolean(state?.showCanceledPlanning);
  const visiblePlans = getPedidoPlanningVisiblePlans(details, selectedProductId, showCanceled);
  const expandedIds = new Set(state?.expandedPlanningByProduct?.[selectedProductId] || []);

  return `
    <h3 class="orders-planning__list-title">Planejamentos Realizados (${visiblePlans.length})</h3>
    <div class="orders-planning__list" data-orders-planning-list>
      ${visiblePlans.length
    ? visiblePlans.map((plan) => createPedidoPlanningItem(plan, expandedIds.has(plan.id))).join('')
    : '<div class="orders-planning__empty">Nenhum planejamento encontrado para este filtro.</div>'}
    </div>
  `;
}

function createPedidoPlanningItem(plan, isExpanded = false) {
  return `
    <article class="orders-planning-item ${plan.status === 'cancelado' ? 'is-canceled' : ''}">
      <div class="orders-planning-item__header">
        <div class="orders-planning-item__title-wrap">
          <strong class="orders-planning-item__op">${plan.op}</strong>
          ${Badge.create({ text: plan.stage, variant: 'light', style: 'soft', size: 'sm' })}
        </div>
        <strong class="orders-planning-item__quantity">${formatPlanningNumber(plan.quantity)} un.</strong>
      </div>
      <p class="orders-planning-item__product">${plan.product}</p>
      <button type="button" class="orders-planning-item__toggle" data-order-planning-toggle="${plan.id}" aria-expanded="${isExpanded ? 'true' : 'false'}">
        <span>Ver detalhes</span>
        ${icon('chevron-down', { size: 14 })}
      </button>
      <div class="orders-planning-item__details ${isExpanded ? 'is-open' : ''}">
        <div class="orders-planning-item__details-grid">
          <div><span class="orders-planning-item__label">Data do Planejamento</span><strong>${plan.planningDate}</strong></div>
          <div><span class="orders-planning-item__label">Previsão de Entrega</span><strong>${plan.deliveryDate}</strong></div>
          <div><span class="orders-planning-item__label">Data de Semeio</span><strong>${plan.sowingDate}</strong></div>
          <div><span class="orders-planning-item__label">Dias após Semeio</span><strong>${plan.daysAfterSowing}</strong></div>
          <div><span class="orders-planning-item__label">Responsável</span><strong>${plan.responsible}</strong></div>
          <div class="orders-planning-item__actions">
            ${Button.create({ text: 'Acessar OP', variant: 'ghost', size: 'sm', iconRight: 'external-link' }).replace('<button', `<button data-order-planning-action="open-op" data-planning-id="${plan.id}"`)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderPedidoPlanningTab(drawerElement, details, state = {}) {
  if (!drawerElement || !details) return;
  const planningRoot = drawerElement.querySelector('[data-orders-planning]');
  const productCaption = planningRoot?.querySelector('[data-orders-planning-product-caption]');
  const metricsElement = planningRoot?.querySelector('[data-orders-planning-metrics]');
  const listWrap = planningRoot?.querySelector('[data-orders-planning-list-wrap]');
  if (!productCaption || !metricsElement || !listWrap) return;

  const selectedProductId = state.selectedPlanningProduct || getPedidoPlanningInitialProduct(details);
  productCaption.innerHTML = createPedidoPlanningProductCaption(details, selectedProductId);
  metricsElement.innerHTML = createPedidoPlanningMetrics(details, selectedProductId);
  listWrap.innerHTML = createPedidoPlanningListSection(details, state);
}

function renderPedidoPlanningList(drawerElement, details, state = {}) {
  if (!drawerElement || !details) return;
  const planningRoot = drawerElement.querySelector('[data-orders-planning]');
  const listWrap = planningRoot?.querySelector('[data-orders-planning-list-wrap]');
  if (!listWrap) return;
  listWrap.innerHTML = createPedidoPlanningListSection(details, state);
}

function createPedidoDetailsInfoTab(details, rules = {}) {
  return `
    <div class="orders-details-info">
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${icon('user', { size: 14 })}
          Informações do Cliente
        </h3>
        ${createPedidoClientCard(details.client)}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${icon('package', { size: 14 })}
          Itens do Pedido & Planejamento
        </h3>
        ${createPedidoItemsCard(details.items, { hidePlanCancelButtons: rules?.hidePlanCancelButtons })}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">Resumo do Pedido</h3>
        ${createPedidoSummaryCard(details.summary)}
      </section>
      <div class="orders-details-info__term-wrap">
        ${Button.create({ text: 'Gerar Termo de Aceite', variant: 'info', style: 'soft', size: 'sm', iconLeft: 'download' })}
      </div>
    </div>
  `;
}

function createPedidoDetailsPlaceholderPanel() {
  return `
    <div class="orders-details-placeholder">
      Em breve
    </div>
  `;
}

function createCancelOrderItemsModal({ modalId = 'kanban-cancel-order-items-modal', items = [] } = {}) {
  const normalizedItems = Array.isArray(items) ? items : [];
  const itemRows = normalizedItems.map((item, index) => {
    const itemId = String(item?.id || `item-${index + 1}`);
    const itemInputId = `cancel-order-item-${itemId}`;
    const productLabel = String(item?.product || 'Item sem descrição');
    const quantityLabel = item?.quantity ? `Qtd.: ${item.quantity}` : '';

    return `
      <label class="cancel-order-items-modal__item" for="${itemInputId}">
        <input
          id="${itemInputId}"
          type="checkbox"
          class="cancel-order-items-modal__checkbox"
          data-cancel-order-item-checkbox
          value="${itemId}"
        />
        <span class="cancel-order-items-modal__item-content">
          <strong class="cancel-order-items-modal__item-title">${productLabel}</strong>
          ${quantityLabel ? `<span class="cancel-order-items-modal__item-meta">${quantityLabel}</span>` : ''}
        </span>
      </label>
    `;
  }).join('');

  return Modal.create({
    id: modalId,
    title: 'Cancelar Itens do Pedido',
    size: 'md',
    className: 'cancel-order-items-modal',
    body: `
      <div class="cancel-order-items-modal__content">
        <p class="cancel-order-items-modal__description">Selecione os itens que deseja cancelar.</p>
        <div class="cancel-order-items-modal__list">
          ${itemRows || '<p class="cancel-order-items-modal__empty">Nenhum item disponível para cancelamento.</p>'}
        </div>
      </div>
    `,
    footer: `
      <div class="cancel-order-items-modal__footer">
        ${Button.create({ text: 'Cancelar', style: 'outline', variant: 'dark', size: 'sm' }).replace('<button ', '<button data-cancel-order-items-action="cancel" ')}
        ${Button.create({ text: 'Confirmar cancelamento', variant: 'primary', size: 'sm', disabled: true }).replace('<button ', '<button data-cancel-order-items-action="confirm" ')}
      </div>
    `,
  });
}

function createReplanItemModal({ modalId = 'kanban-replan-item-modal', orderItemId = '' } = {}) {
  const reasonOptions = [
    { value: 'falta-insumo', label: 'Falta de insumo' },
    { value: 'erro-planejamento', label: 'Erro no planejamento' },
    { value: 'capacidade', label: 'Capacidade' },
    { value: 'cliente-alterou', label: 'Cliente alterou pedido' },
  ];

  const opOptions = [
    { value: 'estoque-venda-direta', label: 'Estoque (Venda Direta)' },
    { value: 'remessa-futura', label: 'Remessa Futura' },
    { value: 'vincular-ordem-producao', label: 'Vincular Ordem de Produção' },
  ];

  return Modal.create({
    id: modalId,
    title: 'Replanejar Item',
    size: 'md',
    className: 'replan-modal',
    body: `
      <div class="replan-modal__content" data-replan-item="${orderItemId}">
        <div class="replan-modal__info">
          <span class="replan-modal__info-icon" aria-hidden="true">${icon('info', { size: 14 })}</span>
          <p class="replan-modal__info-text">
            Este item foi cancelado da produção anterior. Informe o motivo e vincule a uma nova Ordem de Produção se necessário.
          </p>
        </div>

        <div class="replan-modal__field-wrap" data-replan-field="reason">
          ${Input.createSelect({
            id: 'replan-reason',
            label: 'Motivo do Replanejamento',
            required: true,
            placeholder: 'Selecionar...',
            items: reasonOptions,
          })}
          <span class="replan-modal__error" data-replan-error="reason" hidden>Campo obrigatório.</span>
        </div>

        <div class="replan-modal__field-wrap">
          ${Input.createTextarea({
            id: 'replan-notes',
            label: 'Observações',
            rows: 3,
          })}
        </div>

        <div class="replan-modal__field-wrap" data-replan-field="op">
          ${Input.createSelect({
            id: 'replan-op',
            label: 'Vincular OP (Produção Própria)',
            required: true,
            placeholder: 'Selecionar...',
            items: opOptions,
          })}
          <p class="replan-modal__hint">Apenas OPs de produção própria ativas são exibidas.</p>
          <span class="replan-modal__error" data-replan-error="op" hidden>Campo obrigatório.</span>
        </div>
      </div>
    `,
    footer: `
      <div class="replan-modal__footer">
        ${Button.create({ text: 'Cancelar', style: 'outline', variant: 'dark', size: 'sm' }).replace('<button ', '<button data-replan-action="cancel" ')}
        ${Button.create({ text: 'Confirmar Replanejamento', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-replan-action="confirm" ')}
      </div>
    `,
  });
}

function createPedidoClientCard(client) {
  const fields = [
    { label: 'Código', value: client.codigo },
    { label: 'CPF/CNPJ', value: client.cpfCnpj },
    { label: 'Razão Social/Nome', value: client.razaoSocial },
    { label: 'Nome Fantasia/Apelido', value: client.nomeFantasia },
    { label: 'Endereço', value: client.endereco, full: true },
    { label: 'Telefone', value: client.telefone },
    { label: 'E-mail', value: client.email },
    { label: 'Vendedor', value: client.vendedor, full: true },
  ];

  return `
    <div class="orders-details-card">
      <div class="orders-details-card__grid">
        ${fields.map((field) => `
          <div class="orders-details-field ${field.full ? 'orders-details-field--full' : ''}">
            <span class="orders-details-field__label">${field.label}</span>
            <strong class="orders-details-field__value">${field.value}</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function createPedidoItemsCard(items = [], options = {}) {
  const hidePlanCancelButtons = Boolean(options?.hidePlanCancelButtons);
  const header = `
    <div class="orders-item-table__header">
      <span class="orders-item-table__toggle-col" aria-hidden="true"></span>
      <span>Produto</span>
      <span>Qtd. Pedido</span>
      <span>Valor Unitário</span>
      <span>Valor Total</span>
      <span>Qtd. Disponível</span>
      ${hidePlanCancelButtons ? '' : '<span class="orders-item-table__actions-label" aria-hidden="true"></span>'}
    </div>
  `;

  const rows = items.map((item, index) => {
    const hasPlanning = Array.isArray(item.planning) && item.planning.length > 0;
    const productMatch = String(item.product || '').match(/^(.*)\s([A-Z]{3}-\d{3})$/);
    const productName = productMatch ? productMatch[1] : String(item.product || '');
    const productCode = productMatch ? productMatch[2] : '';
    const planRows = hasPlanning ? item.planning.map((plan) => `
      <div class="orders-item-plan-row orders-item-plan-row--${plan.type}">
        <span class="orders-item-plan-row__indicator" aria-hidden="true">${icon('chevron-up', { size: 14 })}</span>
        <div class="orders-item-plan-row__status">
          ${plan.type === 'planned' ? `Planejado: ${plan.amount}` : `Cancelado: ${plan.amount}`}
        </div>
        <div class="orders-item-plan-row__meta">Data: ${plan.date}</div>
        <div class="orders-item-plan-row__meta">Responsável: ${plan.responsible}</div>
        <div class="orders-item-plan-row__meta">Quantidade: ${plan.quantity}</div>
        <div class="orders-item-plan-row__action">
          ${plan.type === 'canceled'
      ? Button.create({ text: 'Replanejar', style: 'text', variant: 'dark', size: 'sm', iconLeft: 'edit' }).replace('<button ', '<button data-order-item-action="replan" ')
      : ''}
        </div>
      </div>
    `).join('') : '';

    return `
      <article class="orders-item ${hasPlanning && index === 0 ? 'is-expanded' : ''}" data-order-item="${item.id}">
        <div class="orders-item__main">
          <button type="button" class="orders-item__toggle" data-order-item-toggle aria-label="Expandir item">
            ${icon('chevron-down', { size: 14 })}
          </button>
          <span class="orders-item__product">
            <strong class="orders-item__product-name">${productName}</strong>
            ${productCode ? `<small class="orders-item__product-code">${productCode}</small>` : ''}
          </span>
          <span class="orders-item__value">${item.quantity}</span>
          <span class="orders-item__value">${item.unitValue}</span>
          <span class="orders-item__value">${item.totalValue}</span>
          <span class="orders-item__value">${item.availableQuantity}</span>
          ${hidePlanCancelButtons
      ? ''
      : `
          <div class="orders-item__actions">
            ${Button.create({ text: 'Planejar', style: 'outline', variant: 'info', size: 'sm' }).replace('<button ', '<button data-order-item-action="plan" ')}
            ${Button.create({ text: 'Cancelar', style: 'outline', variant: 'danger', size: 'sm' }).replace('<button ', '<button data-order-item-action="cancel" ')}
          </div>
          `}
        </div>
        ${hasPlanning ? `
          <div class="orders-item__planning">
            ${planRows}
          </div>
        ` : ''}
      </article>
    `;
  }).join('');

  return `
    <div class="orders-details-card orders-item-table ${hidePlanCancelButtons ? 'orders-item-table--no-actions' : ''}">
      ${header}
      ${rows}
    </div>
  `;
}

function createPedidoSummaryCard(summary) {
  return `
    <div class="orders-details-card orders-summary-card">
      <div class="orders-summary-card__item">
        ${icon('calendar', { size: 14 })}
        <div>
          <span class="orders-details-field__label">Data do Pedido</span>
          <strong class="orders-details-field__value">${summary.orderDate}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${icon('calendar', { size: 14 })}
        <div>
          <span class="orders-details-field__label">Entrega Prevista</span>
          <strong class="orders-details-field__value">${summary.expectedDelivery}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${icon('circle', { size: 14 })}
        <div>
          <span class="orders-details-field__label">Valor Total do Pedido</span>
          <strong class="orders-summary-card__value">${summary.totalValue}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${icon('file', { size: 14 })}
        <div>
          <span class="orders-details-field__label">Observação do Pedido</span>
          <strong class="orders-details-field__value">${summary.notes}</strong>
        </div>
      </div>
    </div>
  `;
}

function createPedidoDetailsDrawerFooter(details = null, rules = null) {
  const resolvedRules = rules || getPedidoDrawerRules(details);
  const footerPrimaryAction = resolvedRules?.footerPrimaryAction || null;
  const hideFooterCancelTotal = Boolean(resolvedRules?.hideFooterCancelTotal);
  const replaceFooterCancelTotal = Boolean(resolvedRules?.replaceFooterCancelTotal);
  return `
    <div class="orders-details-footer">
      <div class="orders-details-footer__left">
        ${Button.create({ text: 'Voltar', style: 'outline', variant: 'dark', size: 'sm' }).replace('<button ', '<button data-pedido-drawer-action="back" ')}
      </div>
      <div class="orders-details-footer__right">
        ${(hideFooterCancelTotal || replaceFooterCancelTotal)
      ? ''
      : Button.create({ text: 'Cancelar Pedido Total', style: 'outline', variant: 'danger', size: 'sm' }).replace('<button ', '<button data-pedido-drawer-action="cancel-total" ')}
        ${footerPrimaryAction
      ? Button.create({
        text: footerPrimaryAction.label,
        variant: 'primary',
        size: 'sm',
        disabled: Boolean(footerPrimaryAction.disabled),
      }).replace('<button ', `<button data-pedido-drawer-action="${footerPrimaryAction.key}" `)
      : ''}
      </div>
    </div>
  `;
}

function initAdvancedFiltersDrawer() {
  const triggerButton = document.getElementById('kanban-advanced-filters-btn');
  if (!triggerButton) return () => {};
  const savedFiltersState = createSavedFiltersState(currentKanbanMode);
  const isPedidosMode = currentKanbanMode === KANBAN_MODE.PEDIDOS;
  const ordersFiltersState = isPedidosMode ? createOrdersFiltersState() : null;

  const drawerId = 'kanban-advanced-filters-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'Filtros Avançados',
    width: 540,
    content: createAdvancedFiltersContent(savedFiltersState, { mode: currentKanbanMode, ordersFiltersState }),
    footer: createAdvancedFiltersFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const footerElement = drawerElement.querySelector('.advanced-filters-footer');
  const saveFiltersModalId = 'kanban-save-filters-modal';
  let saveFiltersReturnFocus = null;
  let saveFiltersModalCleanup = () => {};
  let activeTabIndex = 0;

  const tabsContainer = drawerElement.querySelector('#advanced-filters-tabs');
  const tabsRoot = tabsContainer ? tabsContainer.closest('[data-tabs]') : null;
  const updateFooterByTab = (tabIndex) => {
    if (!footerElement) return;
    const footerTab = isPedidosMode && tabIndex === 1 ? 'saved' : 'filter';
    footerElement.dataset.activeTab = footerTab;
  };

  const selectSavedFilter = (itemId, options = {}) => {
    if (!isPedidosMode || !savedFiltersState || !itemId) return;
    const { readOnly = false } = options;
    const item = savedFiltersState.items.find((savedItem) => savedItem.id === itemId);
    if (!item) return;
    savedFiltersState.selectedId = itemId;
    savedFiltersState.draftName = item.name;
    savedFiltersState.draftSharing = [...item.sharing];
    savedFiltersState.readOnly = readOnly;
    renderSavedFiltersPanel(drawerElement, savedFiltersState);
  };

  const cancelSavedFiltersEdit = () => {
    if (!isPedidosMode || !savedFiltersState.selectedId) return;
    selectSavedFilter(savedFiltersState.selectedId, { readOnly: false });
  };

  const saveSavedFiltersEdit = () => {
    if (!isPedidosMode || !savedFiltersState.selectedId) return;
    const nameInput = drawerElement.querySelector('[data-saved-edit-name]');
    const nameField = nameInput ? nameInput.closest('.field') : null;
    const nextName = nameInput ? nameInput.value.trim() : '';
    if (!nextName) {
      if (nameField) nameField.classList.add('field--error');
      if (nameInput && typeof nameInput.focus === 'function') nameInput.focus();
      return;
    }

    if (nameField) nameField.classList.remove('field--error');
    savedFiltersState.items = savedFiltersState.items.map((item) => (
      item.id === savedFiltersState.selectedId
        ? { ...item, name: nextName, sharing: [...(savedFiltersState.draftSharing || [])] }
        : item
    ));
    savedFiltersState.draftName = nextName;
    savedFiltersState.readOnly = false;
    renderSavedFiltersPanel(drawerElement, savedFiltersState);
  };

  const handleTabsClick = (event) => {
    if (!tabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !tabsRoot.contains(clickedTab)) return;

    const tabIndex = Number(clickedTab.dataset.tab);
    if (Number.isNaN(tabIndex)) return;

    const tabs = tabsRoot.querySelectorAll('.tabs-tab');
    const panels = tabsRoot.parentElement?.querySelectorAll('.tabs-panel');

    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });

    if (!panels) return;
    panels.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
    activeTabIndex = tabIndex;
    updateFooterByTab(tabIndex);
  };

  const handleDrawerContentClick = (event) => {
    const savedFooterAction = event.target.closest('[data-saved-footer-action]');
    if (savedFooterAction && isPedidosMode) {
      const action = savedFooterAction.dataset.savedFooterAction;
      if (action === 'cancel') {
        cancelSavedFiltersEdit();
      }
      if (action === 'save') {
        saveSavedFiltersEdit();
      }
      return;
    }

    const savedActionButton = event.target.closest('[data-saved-action]');
    if (savedActionButton) {
      const action = savedActionButton.dataset.savedAction;
      const itemElement = savedActionButton.closest('[data-saved-filter-item]');
      const itemId = itemElement ? itemElement.dataset.savedFilterItem : '';

      if (!itemId) return;

      if (isPedidosMode) {
        if (action === 'edit') {
          selectSavedFilter(itemId, { readOnly: false });
          return;
        }

        if (action === 'delete') {
          savedFiltersState.items = savedFiltersState.items.filter((item) => item.id !== itemId);
          if (!savedFiltersState.items.length) {
            savedFiltersState.selectedId = '';
            savedFiltersState.draftName = '';
            savedFiltersState.draftSharing = [];
            savedFiltersState.readOnly = false;
          } else if (savedFiltersState.selectedId === itemId) {
            const nextItem = savedFiltersState.items[0];
            selectSavedFilter(nextItem.id, { readOnly: false });
            return;
          }
          renderSavedFiltersPanel(drawerElement, savedFiltersState);
          return;
        }

        if (action === 'view') {
          selectSavedFilter(itemId, { readOnly: true });
          return;
        }

        if (action === 'cancel-edit') {
          cancelSavedFiltersEdit();
          return;
        }

        if (action === 'save-edit') {
          saveSavedFiltersEdit();
          return;
        }
      }

      if (action === 'edit') {
        savedFiltersState.editingId = itemId;
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'delete') {
        savedFiltersState.items = savedFiltersState.items.filter((item) => item.id !== itemId);
        if (savedFiltersState.editingId === itemId) savedFiltersState.editingId = '';
        if (savedFiltersState.selectedId === itemId) savedFiltersState.selectedId = '';
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'view') {
        savedFiltersState.selectedId = itemId;
        console.log('Visualizar filtro salvo', itemId);
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'cancel-edit') {
        savedFiltersState.editingId = '';
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'save-edit') {
        const editNameInput = itemElement.querySelector('[data-saved-edit-name]');
        const editField = editNameInput ? editNameInput.closest('.field') : null;
        const nextName = editNameInput ? editNameInput.value.trim() : '';

        if (!nextName) {
          if (editField) editField.classList.add('field--error');
          if (editNameInput) editNameInput.focus();
          return;
        }

        if (editField) editField.classList.remove('field--error');
        savedFiltersState.items = savedFiltersState.items.map((item) => (
          item.id === itemId ? { ...item, name: nextName } : item
        ));
        savedFiltersState.editingId = '';
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }
    }

    if (isPedidosMode) {
      const savedItemRow = event.target.closest('[data-saved-filter-select]');
      if (savedItemRow) {
        const itemElement = savedItemRow.closest('[data-saved-filter-item]');
        const itemId = itemElement ? itemElement.dataset.savedFilterItem : '';
        if (!itemId) return;
        selectSavedFilter(itemId, { readOnly: false });
        return;
      }

      const savedShareRemove = event.target.closest('[data-saved-share-remove]');
      if (savedShareRemove) {
        const shareLabel = savedShareRemove.dataset.savedShareRemove;
        if (!shareLabel) return;
        savedFiltersState.draftSharing = (savedFiltersState.draftSharing || []).filter((item) => item !== shareLabel);
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }
    }

    const target = event.target.closest('[data-filters-action]');
    if (target) {
      const action = target.dataset.filtersAction;
      if (isPedidosMode && ordersFiltersState) {
        if (action === 'apply') {
          const payload = collectOrdersFiltersPayload(drawerElement, ordersFiltersState);
          window.dispatchEvent(new CustomEvent('orders:filters:apply', { detail: payload }));
          drawerControls.close();
          return;
        }
        if (action === 'clear') {
          resetOrdersFilters(drawerElement, ordersFiltersState);
          return;
        }
      } else {
        if (action === 'apply') console.log('Aplicar filtros');
        if (action === 'clear') console.log('Limpar filtros');
      }
      if (action === 'save') openSaveFiltersModal(target);
      return;
    }

    const removeButton = event.target.closest('[data-action="remove"]');
    if (removeButton) {
      const chip = removeButton.closest('.chip');
      if (!chip || !drawerElement.contains(chip)) return;

      if (isPedidosMode && ordersFiltersState) {
        const activeChipId = chip.dataset.ordersActiveChip;
        if (activeChipId) {
          ordersFiltersState.activeFilters = ordersFiltersState.activeFilters.filter((item) => item.id !== activeChipId);
          renderOrdersActiveFilters(drawerElement, ordersFiltersState);
          return;
        }
      }

      chip.remove();
      return;
    }

    const sortOption = event.target.closest('[data-order-option]');
    if (sortOption) {
      const sortContainer = sortOption.closest('[data-order-options]');
      if (!sortContainer) return;

      sortContainer.querySelectorAll('[data-order-option]').forEach((button) => {
        button.classList.toggle('is-active', button === sortOption);
      });
      return;
    }

    const activeFiltersToggle = event.target.closest('[data-active-filters-toggle]');
    if (!activeFiltersToggle) return;

    const activeFiltersSection = drawerElement.querySelector('.advanced-filters-active');
    if (!activeFiltersSection) return;

    const isCollapsed = activeFiltersSection.classList.toggle('is-collapsed');
    activeFiltersToggle.setAttribute('aria-expanded', String(!isCollapsed));
  };

  const handleDrawerContentInput = (event) => {
    if (!isPedidosMode) return;
    if (!event.target) return;
    const inputElement = event.target.closest('[data-saved-edit-name]');
    if (!inputElement) return;
    savedFiltersState.draftName = inputElement.value;
    const field = inputElement.closest('.field');
    if (field) field.classList.remove('field--error');
  };

  const handleTriggerClick = () => {
    drawerControls.open(triggerButton);
  };

  const closeSaveFiltersModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${saveFiltersModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${saveFiltersModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    saveFiltersModalCleanup();
    Modal.close(saveFiltersModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && saveFiltersReturnFocus && typeof saveFiltersReturnFocus.focus === 'function') {
      saveFiltersReturnFocus.focus();
    }
    saveFiltersReturnFocus = null;
  };

  const openSaveFiltersModal = (returnFocusButton) => {
    const existingModal = document.querySelector(`[data-modal="${saveFiltersModalId}"]`);
    const existingBackdrop = document.querySelector(`[data-modal-backdrop="${saveFiltersModalId}"]`);
    if (existingModal) existingModal.remove();
    if (existingBackdrop) existingBackdrop.remove();

    saveFiltersReturnFocus = returnFocusButton || null;
    document.body.insertAdjacentHTML('beforeend', createSaveFiltersModal({ modalId: saveFiltersModalId }));

    const modalElement = document.querySelector(`[data-modal="${saveFiltersModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${saveFiltersModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const nameInput = modalElement.querySelector('#save-filters-name-input');
    const nameField = modalElement.querySelector('.field');
    const errorMessage = modalElement.querySelector('[data-save-filters-error]');
    const cancelButton = modalElement.querySelector('[data-save-modal-cancel]');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const saveButton = modalElement.querySelector('[data-save-modal-submit]');

    const setValidation = (hasError) => {
      if (errorMessage) {
        errorMessage.hidden = !hasError;
      }
      if (nameField) {
        nameField.classList.toggle('field--error', hasError);
      }
    };

    const handleModalClick = (event) => {
      if (event.target === modalBackdrop) {
        closeSaveFiltersModal();
      }
    };

    const handleCancelClick = () => closeSaveFiltersModal();
    const handleCloseClick = () => closeSaveFiltersModal();
    const handleSaveClick = () => {
      if (!nameInput) return;
      const nomeFiltro = nameInput.value.trim();
      if (!nomeFiltro) {
        setValidation(true);
        nameInput.focus();
        return;
      }
      setValidation(false);
      console.log({ nomeFiltro });
      closeSaveFiltersModal();
    };

    const handleInput = () => setValidation(false);
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSaveFiltersModal();
      }
    };

    modalBackdrop.addEventListener('click', handleModalClick);
    if (cancelButton) cancelButton.addEventListener('click', handleCancelClick);
    if (closeButton) closeButton.addEventListener('click', handleCloseClick);
    if (saveButton) saveButton.addEventListener('click', handleSaveClick);
    if (nameInput) nameInput.addEventListener('input', handleInput);
    document.addEventListener('keydown', handleKeydown);

    saveFiltersModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleModalClick);
      if (cancelButton) cancelButton.removeEventListener('click', handleCancelClick);
      if (closeButton) closeButton.removeEventListener('click', handleCloseClick);
      if (saveButton) saveButton.removeEventListener('click', handleSaveClick);
      if (nameInput) nameInput.removeEventListener('input', handleInput);
      document.removeEventListener('keydown', handleKeydown);
      saveFiltersModalCleanup = () => {};
    };

    Modal.open(saveFiltersModalId);
    if (nameInput && typeof nameInput.focus === 'function') {
      requestAnimationFrame(() => nameInput.focus());
    }
  };

  if (tabsRoot) tabsRoot.addEventListener('click', handleTabsClick);
  updateFooterByTab(activeTabIndex);
  drawerElement.addEventListener('click', handleDrawerContentClick);
  drawerElement.addEventListener('input', handleDrawerContentInput);
  triggerButton.addEventListener('click', handleTriggerClick);

  return () => {
    closeSaveFiltersModal({ restoreFocus: false });
    triggerButton.removeEventListener('click', handleTriggerClick);
    if (tabsRoot) tabsRoot.removeEventListener('click', handleTabsClick);
    drawerElement.removeEventListener('click', handleDrawerContentClick);
    drawerElement.removeEventListener('input', handleDrawerContentInput);
    if (drawerControls.cleanup) drawerControls.cleanup();
    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createAdvancedFiltersContent(savedFiltersState, options = {}) {
  const { mode = KANBAN_MODE.PRODUCAO, ordersFiltersState = null } = options;
  const tabs = Tabs.createWithPanels({
    id: 'advanced-filters-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Filtro', content: mode === KANBAN_MODE.PEDIDOS ? createOrdersFiltersPanel(ordersFiltersState) : createFiltersPanel() },
      { label: 'Filtros Salvos', content: createSavedFiltersPanel(savedFiltersState, { mode }) },
    ],
  });

  return `<section class="advanced-filters">${tabs}</section>`;
}

function createOrdersFiltersState() {
  const defaults = [
    { id: 'status', label: 'Status: 6 selecionados', kind: 'alert' },
    { id: 'date-between', label: 'Data entre: 22/12/25 + 01/01/26', kind: 'neutral' },
    { id: 'code', label: 'Código: 2233', kind: 'neutral' },
    { id: 'client-1', label: 'Cliente: A2W', kind: 'muted' },
    { id: 'client-2', label: 'Cliente: A2W', kind: 'muted' },
    { id: 'client-3', label: 'Cliente: A2W', kind: 'muted' },
    { id: 'client-4', label: 'Cliente: A2W', kind: 'muted' },
  ];

  return {
    defaultActiveFilters: defaults.map((item) => ({ ...item })),
    activeFilters: defaults.map((item) => ({ ...item })),
  };
}

function createOrdersFiltersPanel(ordersFiltersState) {
  const state = ordersFiltersState || createOrdersFiltersState();
  const calendarIcon = `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

  const selectedFilter = Input.createSelect({
    id: 'advanced-filter-selected',
    label: 'Filtro selecionado',
    required: true,
    placeholder: '',
    value: 'relatorio-mensal',
    items: [{ label: 'Relatório Mensal', value: 'relatorio-mensal' }],
  });

  const showInactiveToggle = Toggle.create({
    id: 'advanced-filter-show-inactive',
    label: 'Mostrar inativos',
    size: 'sm',
  });

  const exceptCheckbox = Checkbox.create({
    id: 'advanced-filter-except',
    label: 'Exceto',
    checked: false,
  });

  const dataType = Input.createSelect({
    id: 'advanced-filter-data-type',
    label: 'Tipo de Data',
    placeholder: 'Selecione o tipo de data',
    items: [
      { label: 'Data de pedido', value: 'pedido' },
      { label: 'Data de entrega', value: 'entrega' },
      { label: 'Data de faturamento', value: 'faturamento' },
    ],
  });

  const initialDate = Input.create({
    id: 'advanced-filter-start-date',
    type: 'date',
    label: 'Data inicial',
    placeholder: '00/00/0000',
    iconRight: calendarIcon,
  });

  const finalDate = Input.create({
    id: 'advanced-filter-end-date',
    type: 'date',
    label: 'Data final',
    placeholder: '00/00/0000',
    iconRight: calendarIcon,
  });

  const orderCodeA2W = Input.create({
    id: 'advanced-filter-order-code-a2w',
    label: 'Código Pedido A2W',
    placeholder: 'Digite o código do pedido',
  });

  const orderCodeTawros = Input.create({
    id: 'advanced-filter-order-code-tawros',
    label: 'Código Pedido TAWROS',
    placeholder: 'Digite o código',
  });

  const clientCode = Input.create({
    id: 'advanced-filter-client-code',
    label: 'Código do Cliente',
    placeholder: 'Digite o código do pedido',
  });

  const cpfCnpj = Input.create({
    id: 'advanced-filter-cpf-cnpj',
    label: 'CPF/CNPJ',
    placeholder: 'Digite o nome do cliente',
  });

  const businessName = Input.create({
    id: 'advanced-filter-business-name',
    label: 'Razão Social/Nome',
    placeholder: 'Digite o nome da Razão Social',
  });

  const fantasyName = Input.create({
    id: 'advanced-filter-fantasy-name',
    label: 'Nome Fantasia/Apelido',
    placeholder: 'Digite o Nome Fantasia',
  });

  const productCode = Input.create({
    id: 'advanced-filter-product-code',
    label: 'Código Produto',
    placeholder: 'Digite o código do produto',
  });

  const productSelect = Input.createSelect({
    id: 'advanced-filter-product',
    label: 'Produto',
    placeholder: '( Nome do produto )',
    items: [
      { label: 'Muda de Eucalipto Clone AEC 144', value: 'muda-eucalipto-aec-144' },
      { label: 'Muda de Eucalipto Clone AEC 224', value: 'muda-eucalipto-aec-224' },
    ],
  });

  const classSelect = Input.createSelect({
    id: 'advanced-filter-class',
    label: 'Classe',
    placeholder: 'Selecione a classe',
    items: [
      { label: 'Classe A', value: 'classe-a' },
      { label: 'Classe B', value: 'classe-b' },
    ],
  });

  const minQuantity = Input.create({
    id: 'advanced-filter-min-quantity',
    label: 'Quantidade Mínima',
    placeholder: 'Quantidade',
  });

  const maxQuantity = Input.create({
    id: 'advanced-filter-max-quantity',
    label: 'Quantidade Máxima',
    placeholder: 'Quantidade',
  });

  const minValue = Input.create({
    id: 'advanced-filter-min-value',
    label: 'Valor Mínimo',
    placeholder: 'R$ 00,00',
  });

  const maxValue = Input.create({
    id: 'advanced-filter-max-value',
    label: 'Valor Máximo',
    placeholder: 'R$ 00,00',
  });

  const statusField = createAdvancedFiltersChipField({
    id: 'advanced-filter-status',
    label: 'Status',
    chips: [
      Chip.createInput({ label: 'Bloqueado', value: 'bloqueado', size: 'sm' }),
      Chip.createInput({ label: 'Em Produção', value: 'em-producao', size: 'sm' }),
      Chip.createInput({ label: 'Expedição', value: 'expedicao', size: 'sm' }),
    ],
  });

  const sortByField = createAdvancedFiltersSortField();

  const sortingType = Input.createSelect({
    id: 'advanced-filter-sorting-type',
    label: 'Tipo de ordenação',
    required: true,
    placeholder: 'Selecione',
    items: [
      { label: 'Crescente', value: 'asc' },
      { label: 'Decrescente', value: 'desc' },
    ],
  });

  const groupByField = createAdvancedFiltersGroupByField();

  return `
    <form class="advanced-filters-panel" data-orders-filters-form>
      <div data-drawer-autofocus>
        ${selectedFilter}
      </div>
      <div class="advanced-filters-active">
        <div class="advanced-filters-active__header">
          <span class="advanced-filters-active__label">Filtros ativos</span>
          <button type="button" class="advanced-filters-active__toggle" data-active-filters-toggle aria-expanded="true" aria-label="Recolher filtros ativos">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="advanced-filters-active__chips" data-active-filters>
          ${createOrdersActiveFilterChips(state)}
        </div>
      </div>
      <div class="advanced-filters-inline">
        ${showInactiveToggle}
        ${exceptCheckbox}
      </div>
      <div class="advanced-filters-grid">
        ${dataType}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${initialDate}
        ${finalDate}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${orderCodeA2W}
        ${orderCodeTawros}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${clientCode}
        ${cpfCnpj}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${businessName}
        ${fantasyName}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${productCode}
        ${productSelect}
      </div>
      <div class="advanced-filters-grid">
        ${classSelect}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${minQuantity}
        ${maxQuantity}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${minValue}
        ${maxValue}
      </div>
      <div class="advanced-filters-grid">
        ${statusField}
      </div>
      <div class="advanced-filters-grid">
        ${sortByField}
      </div>
      <div class="advanced-filters-grid">
        ${sortingType}
      </div>
      <div class="advanced-filters-grid">
        ${groupByField}
      </div>
    </form>
  `;
}

function createOrdersActiveFilterChips(state) {
  const chips = (state?.activeFilters || []).map((item) => {
    const className = item.kind === 'alert'
      ? 'advanced-filters-chip--alert'
      : item.kind === 'muted'
        ? 'advanced-filters-chip--muted'
        : '';
    return Chip.createInput({ label: item.label, value: item.id, size: 'sm', className })
      .replace('<button ', `<button data-orders-active-chip="${item.id}" `);
  });
  return chips.join('');
}

function renderOrdersActiveFilters(drawerElement, state) {
  if (!drawerElement) return;
  const container = drawerElement.querySelector('[data-active-filters]');
  if (!container) return;
  container.innerHTML = createOrdersActiveFilterChips(state);
}

function resetOrdersFilters(drawerElement, state) {
  if (!drawerElement || !state) return;

  const formElement = drawerElement.querySelector('[data-orders-filters-form]');
  if (formElement && typeof formElement.reset === 'function') formElement.reset();

  const selectedFilter = drawerElement.querySelector('#advanced-filter-selected');
  if (selectedFilter) selectedFilter.value = 'relatorio-mensal';

  const sortingType = drawerElement.querySelector('#advanced-filter-sorting-type');
  if (sortingType) sortingType.value = '';

  const orderOptions = drawerElement.querySelectorAll('[data-order-option]');
  orderOptions.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.orderOption === 'recentes');
  });

  state.activeFilters = state.defaultActiveFilters.map((item) => ({ ...item }));
  renderOrdersActiveFilters(drawerElement, state);
}

function collectOrdersFiltersPayload(drawerElement, state) {
  if (!drawerElement) return {};
  const formElement = drawerElement.querySelector('[data-orders-filters-form]');
  const formData = formElement ? new FormData(formElement) : new FormData();

  const getValue = (name) => (formData.get(name) || '').toString().trim();
  const activeSortButton = drawerElement.querySelector('[data-order-option].is-active');
  const statusLabels = Array.from(drawerElement.querySelectorAll('#advanced-filter-status .chip-label'))
    .map((label) => label.textContent?.trim())
    .filter(Boolean);
  const groupBy = {
    cliente: Boolean(drawerElement.querySelector('#advanced-filter-group-client:checked')),
    classe: Boolean(drawerElement.querySelector('#advanced-filter-group-class:checked')),
    produto: Boolean(drawerElement.querySelector('#advanced-filter-group-product:checked')),
    pedidos: Boolean(drawerElement.querySelector('#advanced-filter-group-order:checked')),
  };

  return {
    selectedFilter: getValue('advanced-filter-selected'),
    activeFilters: (state?.activeFilters || []).map((item) => item.label),
    showInactive: Boolean(drawerElement.querySelector('#advanced-filter-show-inactive:checked')),
    except: Boolean(drawerElement.querySelector('#advanced-filter-except:checked')),
    dateType: getValue('advanced-filter-data-type'),
    startDate: getValue('advanced-filter-start-date'),
    endDate: getValue('advanced-filter-end-date'),
    orderCodeA2W: getValue('advanced-filter-order-code-a2w'),
    orderCodeTawros: getValue('advanced-filter-order-code-tawros'),
    clientCode: getValue('advanced-filter-client-code'),
    cpfCnpj: getValue('advanced-filter-cpf-cnpj'),
    businessName: getValue('advanced-filter-business-name'),
    fantasyName: getValue('advanced-filter-fantasy-name'),
    productCode: getValue('advanced-filter-product-code'),
    product: getValue('advanced-filter-product'),
    className: getValue('advanced-filter-class'),
    quantityMin: getValue('advanced-filter-min-quantity'),
    quantityMax: getValue('advanced-filter-max-quantity'),
    valueMin: getValue('advanced-filter-min-value'),
    valueMax: getValue('advanced-filter-max-value'),
    status: statusLabels,
    sortBy: activeSortButton?.dataset.orderOption || 'recentes',
    sortingType: getValue('advanced-filter-sorting-type'),
    groupBy,
  };
}

function createSavedFiltersState(mode = KANBAN_MODE.PRODUCAO) {
  const items = [
    { id: 'saved-filter-1', name: 'Relatório Mensal', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
    { id: 'saved-filter-2', name: 'Filtro Relatório Mensal 2', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
    { id: 'saved-filter-3', name: 'Relatório Mensal 33', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
    { id: 'saved-filter-4', name: 'Relatório Anual', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
  ];

  if (mode === KANBAN_MODE.PEDIDOS) {
    return {
      mode,
      items,
      selectedId: items[0]?.id || '',
      draftName: items[0]?.name || '',
      draftSharing: [...(items[0]?.sharing || [])],
      readOnly: false,
    };
  }

  return {
    mode,
    items,
    editingId: 'saved-filter-1',
    selectedId: '',
  };
}

function createSavedFiltersPanel(savedFiltersState, options = {}) {
  const { mode = KANBAN_MODE.PRODUCAO } = options;
  if (mode === KANBAN_MODE.PEDIDOS) {
    return createOrdersSavedFiltersPanel(savedFiltersState);
  }

  return `
    <div class="saved-filters-panel" data-saved-filters-panel>
      ${createSavedFiltersList(savedFiltersState)}
    </div>
  `;
}

function renderSavedFiltersPanel(drawerElement, savedFiltersState) {
  if (!drawerElement) return;
  const panel = drawerElement.querySelector('[data-saved-filters-panel]');
  if (!panel) return;
  if (savedFiltersState?.mode === KANBAN_MODE.PEDIDOS) {
    panel.innerHTML = createOrdersSavedFiltersPanelContent(savedFiltersState);
    return;
  }
  panel.innerHTML = createSavedFiltersList(savedFiltersState);
}

function createOrdersSavedFiltersPanel(savedFiltersState) {
  return `
    <div class="saved-filters-panel saved-filters-panel--orders" data-saved-filters-panel>
      ${createOrdersSavedFiltersPanelContent(savedFiltersState)}
    </div>
  `;
}

function createOrdersSavedFiltersPanelContent(savedFiltersState) {
  const selectedItem = savedFiltersState?.items?.find((item) => item.id === savedFiltersState.selectedId) || null;
  const selectedName = savedFiltersState?.draftName ?? selectedItem?.name ?? '';
  const selectedSharing = savedFiltersState?.draftSharing ?? selectedItem?.sharing ?? [];
  const sharingChips = selectedSharing.map((label, index) => {
    if (savedFiltersState?.readOnly) {
      return Chip.createSingle({ label, value: `saved-sharing-${index}`, size: 'sm', className: 'saved-filter-edit__chip saved-filter-edit__chip--readonly' });
    }
    return Chip.createInput({ label, value: `saved-sharing-${index}`, size: 'sm', className: 'saved-filter-edit__chip' })
      .replace('<button ', `<button data-saved-share-remove="${label}" `);
  }).join('');
  const empty = !savedFiltersState?.items?.length;

  return `
    ${empty ? '<div class="advanced-filters-empty">Nenhum filtro salvo.</div>' : `
      <section class="saved-filter-edit" data-saved-filter-item="${selectedItem?.id || ''}">
        <div class="saved-filter-edit__row">
          <button type="button" class="saved-filter-item__left saved-filter-item__left--button" data-saved-filter-select>
            <span class="saved-filter-item__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="saved-filter-item__name">${selectedItem?.name || ''}</span>
          </button>
          <div class="saved-filter-item__actions">
            <button type="button" class="saved-filter-item__action" data-saved-action="edit" aria-label="Editar filtro">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button type="button" class="saved-filter-item__action saved-filter-item__action--danger" data-saved-action="delete" aria-label="Excluir filtro">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 4H13M6 4V3C6 2.45 6.45 2 7 2H9C9.55 2 10 2.45 10 3V4M12 4V13C12 13.55 11.55 14 11 14H5C4.45 14 4 13.55 4 13V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button type="button" class="saved-filter-item__action" data-saved-action="view" aria-label="Visualizar filtro">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.4"/>
                <circle cx="8" cy="8" r="1.7" stroke="currentColor" stroke-width="1.4"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="saved-filter-edit__body">
          ${Input.create({
            id: 'orders-saved-filter-name',
            label: 'Nome do filtro',
            value: selectedName,
            readonly: Boolean(savedFiltersState?.readOnly),
          }).replace('class="input"', 'class="input" data-saved-edit-name')}
          <div class="saved-filter-item__share">
            <span class="saved-filter-item__share-label">Compartilhamento</span>
            <div class="saved-filter-item__share-control">
              <div class="saved-filter-item__share-chips">${sharingChips}</div>
              <span class="saved-filter-item__share-caret" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="saved-filter-item__edit-actions">
            <button type="button" class="btn btn--outline-dark btn--sm" data-saved-action="cancel-edit">Cancelar</button>
            <button type="button" class="btn btn--primary btn--sm" data-saved-action="save-edit">Salvar</button>
          </div>
        </div>
      </section>
      <div class="saved-filters-list">
        ${savedFiltersState.items.map((item) => createOrdersSavedFiltersItem(item, savedFiltersState)).join('')}
      </div>
    `}
  `;
}

function createOrdersSavedFiltersItem(item, savedFiltersState) {
  const isSelected = savedFiltersState.selectedId === item.id;
  return `
    <div class="saved-filter-item saved-filter-item--list ${isSelected ? 'is-selected' : ''}" data-saved-filter-item="${item.id}">
      <div class="saved-filter-item__row">
        <button type="button" class="saved-filter-item__left saved-filter-item__left--button" data-saved-filter-select>
          <span class="saved-filter-item__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="saved-filter-item__name">${item.name}</span>
        </button>
        <div class="saved-filter-item__actions">
          <button type="button" class="saved-filter-item__action" data-saved-action="edit" aria-label="Editar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action saved-filter-item__action--danger" data-saved-action="delete" aria-label="Excluir filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 4H13M6 4V3C6 2.45 6.45 2 7 2H9C9.55 2 10 2.45 10 3V4M12 4V13C12 13.55 11.55 14 11 14H5C4.45 14 4 13.55 4 13V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action" data-saved-action="view" aria-label="Visualizar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="8" cy="8" r="1.7" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function createSavedFiltersList(savedFiltersState) {
  if (!savedFiltersState.items.length) {
    return '<div class="advanced-filters-empty">Nenhum filtro salvo.</div>';
  }

  return savedFiltersState.items.map((item) => createSavedFiltersItem(item, savedFiltersState)).join('');
}

function createSavedFiltersItem(item, savedFiltersState) {
  const isEditing = savedFiltersState.editingId === item.id;
  const isSelected = savedFiltersState.selectedId === item.id;
  const sharingChips = item.sharing.map((label, index) => (
    Chip.createInput({ label, value: `${item.id}-share-${index}`, size: 'sm' })
  )).join('');

  return `
    <div class="saved-filter-item ${isSelected ? 'is-selected' : ''}" data-saved-filter-item="${item.id}">
      <div class="saved-filter-item__row">
        <div class="saved-filter-item__left">
          <span class="saved-filter-item__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="saved-filter-item__name">${item.name}</span>
        </div>
        <div class="saved-filter-item__actions">
          <button type="button" class="saved-filter-item__action" data-saved-action="edit" aria-label="Editar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action saved-filter-item__action--danger" data-saved-action="delete" aria-label="Excluir filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 4H13M6 4V3C6 2.45 6.45 2 7 2H9C9.55 2 10 2.45 10 3V4M12 4V13C12 13.55 11.55 14 11 14H5C4.45 14 4 13.55 4 13V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action" data-saved-action="view" aria-label="Visualizar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="8" cy="8" r="1.7" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </button>
        </div>
      </div>
      ${isEditing ? `
        <div class="saved-filter-item__edit">
          ${Input.create({
            id: `saved-filter-name-${item.id}`,
            label: 'Nome do filtro',
            value: item.name,
            className: 'saved-filter-item__edit-name',
          }).replace('class="input"', 'class="input" data-saved-edit-name')}
          <div class="saved-filter-item__share">
            <span class="saved-filter-item__share-label">Compartilhamento</span>
            <div class="saved-filter-item__share-control">
              <div class="saved-filter-item__share-chips">${sharingChips}</div>
              <span class="saved-filter-item__share-caret" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="saved-filter-item__edit-actions">
            <button type="button" class="btn btn--outline-dark btn--sm" data-saved-action="cancel-edit">Cancelar</button>
            <button type="button" class="btn btn--primary btn--sm" data-saved-action="save-edit">Salvar</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function createFiltersPanel() {
  const calendarIcon = `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

  const selectedFilter = Input.createSelect({
    id: 'advanced-filter-selected',
    label: 'Filtro selecionado',
    required: true,
    placeholder: '',
    value: 'relatorio-mensal',
    items: [{ label: 'Relatório Mensal', value: 'relatorio-mensal' }],
  });

  const chips = [
    Chip.createInput({ label: 'Status: 6 selecionados', value: 'status-6', size: 'sm', className: 'advanced-filters-chip--alert' }),
    Chip.createInput({ label: 'Data entre: 22/12/25 + 01/01/26', value: 'data-entre', size: 'sm' }),
    Chip.createInput({ label: 'Código: 2233', value: 'codigo', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-1', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-2', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-3', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-4', size: 'sm' }),
  ].join('');

  const showInactiveToggle = Toggle.create({
    id: 'advanced-filter-show-inactive',
    label: 'Mostrar inativos',
    size: 'sm',
  });

  const exceptCheckbox = Checkbox.create({
    id: 'advanced-filter-except',
    label: 'Exceto',
    checked: false,
  });

  const dataType = Input.createSelect({
    id: 'advanced-filter-data-type',
    label: 'Tipo de Data',
    placeholder: 'Selecione o tipo de data',
    items: [
      { label: 'Data de pedido', value: 'pedido' },
      { label: 'Data de início', value: 'inicio' },
    ],
  });

  const initialDate = Input.create({
    id: 'advanced-filter-start-date',
    type: 'date',
    label: 'Data inicial',
    placeholder: '00/00/0000',
    iconRight: calendarIcon,
  });

  const finalDate = Input.create({
    id: 'advanced-filter-end-date',
    type: 'date',
    label: 'Data final',
    placeholder: '00/00/0000',
    iconRight: calendarIcon,
  });

  const orderCode = Input.create({
    id: 'advanced-filter-order-code',
    label: 'Código Pedido',
    placeholder: 'Digite o código do pedido',
  });

  const tawrosCode = Input.create({
    id: 'advanced-filter-tawros-code',
    label: 'Código TAWROS',
    placeholder: 'Digite o código',
  });

  const clientCode = Input.create({
    id: 'advanced-filter-client-code',
    label: 'Código do Cliente',
    placeholder: 'Digite o código do cliente',
  });

  const cpfCnpj = Input.create({
    id: 'advanced-filter-cpf-cnpj',
    label: 'CPF/CNPJ',
    placeholder: 'Digite o nome do cliente',
  });

  const businessName = Input.create({
    id: 'advanced-filter-business-name',
    label: 'Razão Social/Nome',
    placeholder: 'Digite o nome da Razão Social',
  });

  const fantasyName = Input.create({
    id: 'advanced-filter-fantasy-name',
    label: 'Nome Fantasia/Apelido',
    placeholder: 'Digite o Nome Fantasia',
  });

  const classSelect = Input.createSelect({
    id: 'advanced-filter-class',
    label: 'Classe',
    placeholder: 'Selecione a classe',
    items: [
      { label: 'Classe A', value: 'a' },
      { label: 'Classe B', value: 'b' },
    ],
  });

  const productCode = Input.create({
    id: 'advanced-filter-product-code',
    label: 'Código Produto',
    placeholder: 'Digite o código do produto',
  });

  const productSelect = Input.createSelect({
    id: 'advanced-filter-product',
    label: 'Produto',
    placeholder: 'Nome do produto',
    items: [
      { label: 'Tomate Cereja', value: 'tomate-cereja' },
      { label: 'Tomate Italiano', value: 'tomate-italiano' },
    ],
  });

  const minQuantity = Input.create({
    id: 'advanced-filter-min-quantity',
    label: 'Quantidade Mínima',
    placeholder: 'Quantidade',
  });

  const maxQuantity = Input.create({
    id: 'advanced-filter-max-quantity',
    label: 'Quantidade Máxima',
    placeholder: 'Quantidade',
  });

  const typeField = createAdvancedFiltersChipField({
    label: 'Tipo',
    chips: [
      Chip.createInput({ label: 'Enxerto', value: 'enxerto', size: 'sm' }),
      Chip.createInput({ label: 'Porta Enxerto', value: 'porta-enxerto', size: 'sm' }),
    ],
  });

  const statusField = createAdvancedFiltersChipField({
    label: 'Status',
    chips: [
      Chip.createInput({ label: 'Bloqueado', value: 'bloqueado', size: 'sm' }),
      Chip.createInput({ label: 'Em Produção', value: 'em-producao', size: 'sm' }),
      Chip.createInput({ label: 'Expedição', value: 'expedicao', size: 'sm' }),
    ],
  });

  const sortByField = createAdvancedFiltersSortField();

  const sortingType = Input.createSelect({
    id: 'advanced-filter-sorting-type',
    label: 'Tipo de ordenação',
    required: true,
    placeholder: 'Selecione',
    items: [
      { label: 'Crescente', value: 'asc' },
      { label: 'Decrescente', value: 'desc' },
    ],
  });

  const labelField = createAdvancedFiltersChipField({
    label: 'Etiqueta',
    chips: [
      Chip.createInput({ label: 'Normal', value: 'normal', size: 'sm' }),
      Chip.createInput({ label: 'Urgente', value: 'urgente', size: 'sm' }),
    ],
  });

  const groupByField = createAdvancedFiltersGroupByField();

  return `
    <div class="advanced-filters-panel">
      <div data-drawer-autofocus>
        ${selectedFilter}
      </div>
      <div class="advanced-filters-active">
        <div class="advanced-filters-active__header">
          <span class="advanced-filters-active__label">Filtros ativos</span>
          <button type="button" class="advanced-filters-active__toggle" data-active-filters-toggle aria-expanded="true" aria-label="Recolher filtros ativos">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="advanced-filters-active__chips" data-active-filters>
          ${chips}
        </div>
      </div>
      <div class="advanced-filters-inline">
        ${showInactiveToggle}
        ${exceptCheckbox}
      </div>
      <div class="advanced-filters-grid">
        ${dataType}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${initialDate}
        ${finalDate}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${orderCode}
        ${tawrosCode}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${clientCode}
        ${cpfCnpj}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${businessName}
        ${fantasyName}
      </div>
      <div class="advanced-filters-grid">
        ${classSelect}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${productCode}
        ${productSelect}
      </div>
      <div class="advanced-filters-grid">
        ${typeField}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${minQuantity}
        ${maxQuantity}
      </div>
      <div class="advanced-filters-grid">
        ${statusField}
      </div>
      <div class="advanced-filters-grid">
        ${sortByField}
      </div>
      <div class="advanced-filters-grid">
        ${sortingType}
      </div>
      <div class="advanced-filters-grid">
        ${labelField}
      </div>
      <div class="advanced-filters-grid">
        ${groupByField}
      </div>
    </div>
  `;
}

function createAdvancedFiltersChipField({ id = '', label, chips }) {
  const chipsHtml = chips.join('');
  return `
    <div class="advanced-filters-chip-field" ${id ? `id="${id}"` : ''}>
      <span class="advanced-filters-chip-field__label">${label}</span>
      <div class="advanced-filters-chip-field__control">
        <div class="advanced-filters-chip-field__chips">${chipsHtml}</div>
        <span class="advanced-filters-chip-field__caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  `;
}

function createAdvancedFiltersSortField() {
  return `
    <div class="advanced-filters-sort">
      <span class="advanced-filters-sort__label">Ordenar por</span>
      <div class="advanced-filters-sort__options" data-order-options>
        <button type="button" class="advanced-filters-sort__option is-active" data-order-option="recentes">Mais recentes</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="antigos">Mais antigos</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="maior-valor">Maior valor</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="menor-valor">Menor valor</button>
      </div>
    </div>
  `;
}

function createAdvancedFiltersGroupByField() {
  const groupItems = [
    { id: 'advanced-filter-group-client', label: 'Cliente', checked: true },
    { id: 'advanced-filter-group-class', label: 'Classe', checked: false },
    { id: 'advanced-filter-group-product', label: 'Produto', checked: false },
    { id: 'advanced-filter-group-order', label: 'Pedidos', checked: false },
  ];

  const groupOptions = groupItems.map((item) => `
    <div class="advanced-filters-group__item">
      ${Checkbox.create({ id: item.id, label: item.label, checked: item.checked, size: 'sm' })}
      <span class="advanced-filters-group__drag" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3H6.01M10 3H10.01M6 8H6.01M10 8H10.01M6 13H6.01M10 13H10.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  `).join('');

  return `
    <div class="advanced-filters-group">
      <div class="advanced-filters-group__header">
        <span class="advanced-filters-group__title">Agrupar por</span>
        <span class="advanced-filters-group__hint">
          <span class="advanced-filters-group__hint-dot" aria-hidden="true"></span>
          Selecione e clique e arraste para ordenar
        </span>
      </div>
      <div class="advanced-filters-group__options">${groupOptions}</div>
    </div>
  `;
}

function createAdvancedFiltersFooter() {
  const saveButton = Button.create({
    text: 'Salvar Filtros',
    style: 'outline',
    variant: 'dark',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-filters-action="save" ');

  const clearButton = Button.create({
    text: 'Limpar Filtros',
    style: 'outline',
    variant: 'dark',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-filters-action="clear" ');

  const applyButton = Button.create({
    text: 'Aplicar Filtros',
    variant: 'primary',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-filters-action="apply" ');

  const savedCancelButton = Button.create({
    text: 'Cancelar',
    style: 'outline',
    variant: 'dark',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-saved-footer-action="cancel" ');

  const savedSaveButton = Button.create({
    text: 'Salvar',
    variant: 'primary',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-saved-footer-action="save" ');

  return `
    <div class="advanced-filters-footer" data-active-tab="filter">
      <div class="advanced-filters-footer__filter-actions advanced-filters-footer__left">
        ${saveButton}
        ${clearButton}
        ${applyButton}
      </div>
      <div class="advanced-filters-footer__saved-actions advanced-filters-footer__right">
        ${savedCancelButton}
        ${savedSaveButton}
      </div>
    </div>
  `;
}

function createSaveFiltersModal({ modalId }) {
  const nameField = Input.create({
    id: 'save-filters-name-input',
    label: 'Nome do filtro',
    required: true,
    placeholder: 'Insira um nome para filtro',
  });

  const cancelButton = Button.create({
    text: 'Cancelar',
    style: 'outline',
    variant: 'dark',
    type: 'button',
  }).replace('<button ', '<button data-save-modal-cancel ');

  const saveButton = Button.create({
    text: 'Salvar',
    variant: 'primary',
    type: 'button',
  }).replace('<button ', '<button data-save-modal-submit ');

  return Modal.create({
    id: modalId,
    type: 'center',
    size: 'sm',
    title: 'Salvar Filtros',
    body: `
      <div class="advanced-save-modal__body">
        ${nameField}
        <span class="advanced-save-modal__error" data-save-filters-error hidden>Nome do filtro é obrigatório.</span>
      </div>
    `,
    footer: `
      <div class="advanced-save-modal__footer">
        ${cancelButton}
        ${saveButton}
      </div>
    `,
    closable: true,
  });
}

