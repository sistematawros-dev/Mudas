import Tooltip from '../../components/tooltip/tooltip.js';

export function init() {
  // Plain tooltips - Light
  const plainLightContainer = document.getElementById('tooltip-plain-light');
  if (plainLightContainer) {
    plainLightContainer.innerHTML = Tooltip.create({
      content: 'Description lorem ipsum dolor.',
      variant: 'light',
    });
  }

  // Plain tooltips - Dark
  const plainDarkContainer = document.getElementById('tooltip-plain-dark');
  if (plainDarkContainer) {
    plainDarkContainer.innerHTML = Tooltip.create({
      content: 'Description lorem ipsum dolor.',
      variant: 'dark',
    });
  }

  // Rich tooltips - Light
  const richLightContainer = document.getElementById('tooltip-rich-light');
  if (richLightContainer) {
    richLightContainer.innerHTML = `
      <div class="demo-rich-wrapper">
        ${Tooltip.createRich({
          title: 'Title lorem ipsum',
          description: 'Description lorem ipsum dolor.',
          slot: { icon: '◆ Slot', label: 'Substitua por Componente' },
          action: { label: 'Action' },
          variant: 'light',
        })}
      </div>
    `;
  }

  // Rich tooltips - Dark
  const richDarkContainer = document.getElementById('tooltip-rich-dark');
  if (richDarkContainer) {
    richDarkContainer.innerHTML = `
      <div class="demo-rich-wrapper">
        ${Tooltip.createRich({
          title: 'Title lorem ipsum',
          description: 'Description lorem ipsum dolor.',
          slot: { icon: '◆ Slot', label: 'Substitua por Componente' },
          action: { label: 'Action' },
          variant: 'dark',
        })}
      </div>
    `;
  }

  // Positions - Light
  const positionsLightContainer = document.getElementById('positions-light');
  if (positionsLightContainer) {
    const positions = [
      { name: 'top left', arrow: '↖' },
      { name: 'right top', arrow: '↗' },
      { name: 'bottom right', arrow: '↘' },
      { name: 'left top', arrow: '↙' },
      { name: 'top center', arrow: '↑' },
      { name: 'right center', arrow: '→' },
      { name: 'bottom center', arrow: '↓' },
      { name: 'left center', arrow: '←' },
      { name: 'top right', arrow: '↗' },
      { name: 'right bottom', arrow: '↘' },
      { name: 'bottom left', arrow: '↙' },
      { name: 'left bottom', arrow: '↖' },
    ];

    positionsLightContainer.innerHTML = positions.map(pos => `
      <div class="demo-position-item">
        <span class="demo-position-arrow">${pos.arrow}</span>
        <span>${pos.name}</span>
      </div>
    `).join('');
  }

  // Positions - Dark
  const positionsDarkContainer = document.getElementById('positions-dark');
  if (positionsDarkContainer) {
    const positions = [
      { name: 'top left', arrow: '↖' },
      { name: 'right top', arrow: '↗' },
      { name: 'bottom right', arrow: '↘' },
      { name: 'left top', arrow: '↙' },
      { name: 'top center', arrow: '↑' },
      { name: 'right center', arrow: '→' },
      { name: 'bottom center', arrow: '↓' },
      { name: 'left center', arrow: '←' },
      { name: 'top right', arrow: '↗' },
      { name: 'right bottom', arrow: '↘' },
      { name: 'bottom left', arrow: '↙' },
      { name: 'left bottom', arrow: '↖' },
    ];

    positionsDarkContainer.innerHTML = positions.map(pos => `
      <div class="demo-position-item">
        <span class="demo-position-arrow">${pos.arrow}</span>
        <span>${pos.name}</span>
      </div>
    `).join('');
  }

  // Interactive demo
  const interactiveContainer = document.getElementById('interactive-demo');
  if (interactiveContainer) {
    const demos = [
      { position: 'top', label: 'Top' },
      { position: 'top-left', label: 'Top Left' },
      { position: 'top-right', label: 'Top Right' },
      { position: 'bottom', label: 'Bottom' },
      { position: 'bottom-left', label: 'Bottom Left' },
      { position: 'bottom-right', label: 'Bottom Right' },
      { position: 'left', label: 'Left' },
      { position: 'right', label: 'Right' },
    ];

    interactiveContainer.innerHTML = demos.map(demo => `
      ${Tooltip.createWithTrigger({
        trigger: `<button class="demo-trigger">${demo.label}</button>`,
        tooltip: {
          content: `Tooltip ${demo.label}`,
          position: demo.position,
          variant: 'dark',
        },
      })}
    `).join('');

    // Add rich tooltip examples
    interactiveContainer.innerHTML += `
      ${Tooltip.createWithTrigger({
        trigger: `<button class="demo-trigger">Rich Light</button>`,
        rich: true,
        tooltip: {
          title: 'Rich Tooltip',
          description: 'Este é um tooltip com conteúdo rico.',
          action: { label: 'Saiba mais' },
          position: 'bottom',
          variant: 'light',
        },
      })}
      ${Tooltip.createWithTrigger({
        trigger: `<button class="demo-trigger">Rich Dark</button>`,
        rich: true,
        tooltip: {
          title: 'Rich Tooltip',
          description: 'Este é um tooltip com conteúdo rico.',
          slot: { icon: '◆', label: 'Slot' },
          action: { label: 'Action' },
          position: 'bottom',
          variant: 'dark',
        },
      })}
      ${Tooltip.createWithTrigger({
        trigger: `<button class="demo-trigger">Simple Rich</button>`,
        rich: true,
        tooltip: {
          title: 'Título',
          description: 'Descrição do tooltip sem slot.',
          action: { label: 'Ver mais' },
          position: 'top',
          variant: 'dark',
        },
      })}
      ${Tooltip.createWithTrigger({
        trigger: `<button class="demo-trigger">Light Tooltip</button>`,
        tooltip: {
          content: 'Light variant tooltip',
          position: 'top',
          variant: 'light',
        },
      })}
    `;
  }

  // Initialize tooltip interactions
  Tooltip.init(document, {
    onShow: (data) => {
      console.log('Tooltip shown:', data);
    },
    onHide: (data) => {
      console.log('Tooltip hidden:', data);
    },
    onAction: (data) => {
      console.log('Tooltip action clicked:', data);
    },
    onClose: (data) => {
      console.log('Tooltip closed:', data);
    },
  });
}
