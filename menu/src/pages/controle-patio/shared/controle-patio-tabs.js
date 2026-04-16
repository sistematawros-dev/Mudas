import * as Tabs from '../../../components/tabs/tabs.js';
import { controlePatioInstructionTabs } from './controle-patio-tabs.data.js';

export function renderControlePatioTabs(container, activeId, className = 'patio-control-tabs') {
  if (!container) return;

  container.innerHTML = Tabs.createButton({
    id: 'controle-patio-tabs-control',
    tabs: controlePatioInstructionTabs.map((tab) => ({ label: tab.label })),
    activeTab: Math.max(0, controlePatioInstructionTabs.findIndex((tab) => tab.id === activeId)),
    size: 'sm',
    className,
  });

  container.querySelectorAll('.tabs-tab').forEach((tabElement, index) => {
    const tabConfig = controlePatioInstructionTabs[index];
    if (!tabConfig) return;
    tabElement.dataset.route = tabConfig.route;
    tabElement.dataset.tabId = tabConfig.id;
  });
}

export function initControlePatioTabs(container = document) {
  const handleClick = (event) => {
    const tabElement = event.target.closest('.tabs-tab[data-route]');
    if (!tabElement) return;

    const targetRoute = tabElement.dataset.route;
    if (!targetRoute || targetRoute === window.location.hash) return;

    window.location.hash = targetRoute;
  };

  container.addEventListener('click', handleClick);
  return () => container.removeEventListener('click', handleClick);
}