import Status from '../../components/status/status.js';

export function init() {
  // Status Badge - Default
  document.getElementById('badge-success').innerHTML = Status.createBadge({ label: 'Label', color: 'success' });
  document.getElementById('badge-warning').innerHTML = Status.createBadge({ label: 'Label', color: 'warning' });
  document.getElementById('badge-danger').innerHTML = Status.createBadge({ label: 'Label', color: 'danger' });
  document.getElementById('badge-neutral').innerHTML = Status.createBadge({ label: 'Label', color: 'neutral' });
  document.getElementById('badge-inverted').innerHTML = Status.createBadge({ label: 'Label', color: 'inverted' });
  document.getElementById('badge-info').innerHTML = Status.createBadge({ label: 'Label', color: 'info' });

  // Status Badge - Small
  document.getElementById('badge-success-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'success', size: 'sm' });
  document.getElementById('badge-warning-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'warning', size: 'sm' });
  document.getElementById('badge-danger-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'danger', size: 'sm' });
  document.getElementById('badge-neutral-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'neutral', size: 'sm' });
  document.getElementById('badge-inverted-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'inverted', size: 'sm' });
  document.getElementById('badge-info-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'info', size: 'sm' });

  // Status Badge - Outlined
  document.getElementById('badge-success-outlined').innerHTML = Status.createBadge({ label: 'Label', color: 'success', outlined: true });
  document.getElementById('badge-warning-outlined').innerHTML = Status.createBadge({ label: 'Label', color: 'warning', outlined: true });
  document.getElementById('badge-danger-outlined').innerHTML = Status.createBadge({ label: 'Label', color: 'danger', outlined: true });
  document.getElementById('badge-neutral-outlined').innerHTML = Status.createBadge({ label: 'Label', color: 'neutral', outlined: true });
  document.getElementById('badge-inverted-outlined').innerHTML = Status.createBadge({ label: 'Label', color: 'inverted', outlined: true });
  document.getElementById('badge-info-outlined').innerHTML = Status.createBadge({ label: 'Label', color: 'info', outlined: true });

  // Status Badge - Outlined Small
  document.getElementById('badge-success-outlined-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'success', outlined: true, size: 'sm' });
  document.getElementById('badge-warning-outlined-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'warning', outlined: true, size: 'sm' });
  document.getElementById('badge-danger-outlined-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'danger', outlined: true, size: 'sm' });
  document.getElementById('badge-neutral-outlined-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'neutral', outlined: true, size: 'sm' });
  document.getElementById('badge-inverted-outlined-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'inverted', outlined: true, size: 'sm' });
  document.getElementById('badge-info-outlined-sm').innerHTML = Status.createBadge({ label: 'Label', color: 'info', outlined: true, size: 'sm' });

  // Status Simple - Default
  document.getElementById('simple-success').innerHTML = Status.createSimple({ label: 'Label', color: 'success' });
  document.getElementById('simple-warning').innerHTML = Status.createSimple({ label: 'Label', color: 'warning' });
  document.getElementById('simple-danger').innerHTML = Status.createSimple({ label: 'Label', color: 'danger' });
  document.getElementById('simple-neutral').innerHTML = Status.createSimple({ label: 'Label', color: 'neutral' });
  document.getElementById('simple-inverted').innerHTML = Status.createSimple({ label: 'Label', color: 'info' });
  document.getElementById('simple-info').innerHTML = Status.createSimple({ label: 'Label', color: 'info' });

  // Status Simple - Small
  document.getElementById('simple-success-sm').innerHTML = Status.createSimple({ label: 'Label', color: 'success', size: 'sm' });
  document.getElementById('simple-warning-sm').innerHTML = Status.createSimple({ label: 'Label', color: 'warning', size: 'sm' });
  document.getElementById('simple-danger-sm').innerHTML = Status.createSimple({ label: 'Label', color: 'danger', size: 'sm' });
  document.getElementById('simple-neutral-sm').innerHTML = Status.createSimple({ label: 'Label', color: 'neutral', size: 'sm' });
  document.getElementById('simple-inverted-sm').innerHTML = Status.createSimple({ label: 'Label', color: 'info', size: 'sm' });
  document.getElementById('simple-info-sm').innerHTML = Status.createSimple({ label: 'Label', color: 'info', size: 'sm' });

  // Light Mode Example
  document.getElementById('example-light').innerHTML = `
    <div class="example-list">
      <div class="example-item">
        ${Status.createSimple({ label: 'Rascunho', color: 'neutral', muted: true })}
        ${Status.createBadge({ label: 'PRE', color: 'inverted' })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Cancelado', color: 'danger' })}
        ${Status.createBadge({ label: 'Recusado', color: 'danger' })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Ativo', color: 'success' })}
        ${Status.createSimple({ label: 'Suspenso', color: 'neutral', muted: true })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Label', color: 'neutral' })}
        ${Status.createBadge({ label: 'Label', color: 'danger' })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Online', color: 'success' })}
        ${Status.createBadge({ label: 'Waiting', color: 'warning' })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Label', color: 'inverted' })}
        ${Status.createSimple({ label: 'Online', color: 'success', pulse: true })}
      </div>
      <div class="example-item">
        ${Status.createSimple({ label: 'Offline', color: 'danger' })}
        ${Status.createSimple({ label: 'Waiting', color: 'warning' })}
      </div>
      <div class="example-item">
        ${Status.createSimple({ label: 'No response', color: 'neutral', muted: true })}
      </div>
    </div>
  `;

  // Dark Mode Example
  document.getElementById('example-dark').innerHTML = `
    <div class="example-list">
      <div class="example-item">
        ${Status.createSimple({ label: 'Rascunho', color: 'neutral', muted: true, dark: true })}
        ${Status.createBadge({ label: 'PRE', color: 'inverted', dark: true })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Cancelado', color: 'danger', dark: true })}
        ${Status.createBadge({ label: 'Recusado', color: 'danger', dark: true })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Ativo', color: 'success', dark: true })}
        ${Status.createSimple({ label: 'Suspenso', color: 'neutral', muted: true, dark: true })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Label', color: 'neutral', dark: true })}
        ${Status.createBadge({ label: 'Label', color: 'danger', dark: true })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Online', color: 'success', dark: true })}
        ${Status.createBadge({ label: 'Waiting', color: 'warning', dark: true })}
      </div>
      <div class="example-item">
        ${Status.createBadge({ label: 'Label', color: 'inverted', dark: true })}
        ${Status.createSimple({ label: 'Online', color: 'success', pulse: true, dark: true })}
      </div>
      <div class="example-item">
        ${Status.createSimple({ label: 'Offline', color: 'danger', dark: true })}
        ${Status.createSimple({ label: 'Waiting', color: 'warning', dark: true })}
      </div>
      <div class="example-item">
        ${Status.createSimple({ label: 'No response', color: 'neutral', muted: true, dark: true })}
      </div>
    </div>
  `;
}
