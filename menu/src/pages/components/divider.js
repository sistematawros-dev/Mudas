import divider from '../../components/divider/divider.js';

export function init() {
  // Horizontal Dividers - 1px
  document.getElementById('divider-horizontal-1px').innerHTML = `
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: none</span>
      <div class="demo-divider-content">
        ${divider.horizontal()}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 8px</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ inset: '8' })}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 16px</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ inset: '16' })}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 24px</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ inset: '24' })}
      </div>
    </div>
  `;

  // Horizontal Dividers - 2px
  document.getElementById('divider-horizontal-2px').innerHTML = `
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: none</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ thickness: 'thick' })}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 8px</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ thickness: 'thick', inset: '8' })}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 16px</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ thickness: 'thick', inset: '16' })}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 24px</span>
      <div class="demo-divider-content">
        ${divider.horizontal({ thickness: 'thick', inset: '24' })}
      </div>
    </div>
  `;

  // Vertical Dividers - 1px
  document.getElementById('divider-vertical-1px').innerHTML = `
    <div class="demo-vertical-item">
      <span class="demo-divider-label">none</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical()}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">8px</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ inset: '8' })}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">16px</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ inset: '16' })}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">24px</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ inset: '24' })}
      </div>
    </div>
  `;

  // Vertical Dividers - 2px
  document.getElementById('divider-vertical-2px').innerHTML = `
    <div class="demo-vertical-item">
      <span class="demo-divider-label">none</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ thickness: 'thick' })}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">8px</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ thickness: 'thick', inset: '8' })}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">16px</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ thickness: 'thick', inset: '16' })}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">24px</span>
      <div class="demo-vertical-divider-wrap">
        ${divider.vertical({ thickness: 'thick', inset: '24' })}
      </div>
    </div>
  `;

  // Divider Styles
  document.getElementById('divider-styles').innerHTML = `
    <div class="demo-style-row">
      <div class="demo-style-item">
        <span class="demo-divider-label">Solid</span>
        <div class="demo-divider-content">
          ${divider.horizontal()}
        </div>
      </div>
      <div class="demo-style-item">
        <span class="demo-divider-label">Dashed</span>
        <div class="demo-divider-content">
          ${divider.horizontal({ style: 'dashed' })}
        </div>
      </div>
      <div class="demo-style-item">
        <span class="demo-divider-label">Dotted</span>
        <div class="demo-divider-content">
          ${divider.horizontal({ style: 'dotted' })}
        </div>
      </div>
    </div>
  `;

  // Divider with Text
  document.getElementById('divider-with-text').innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${divider.withText({ text: 'OU', position: 'center' })}
      ${divider.withText({ text: 'Seção', position: 'left' })}
      ${divider.withText({ text: 'Fim', position: 'right' })}
    </div>
  `;

  // Light Mode
  document.getElementById('divider-light').innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${divider.horizontal()}
      ${divider.horizontal({ thickness: 'thick' })}
      ${divider.withText({ text: 'Seção' })}
    </div>
  `;

  // Dark Mode
  document.getElementById('divider-dark').innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${divider.horizontal({ dark: true })}
      ${divider.horizontal({ dark: true, thickness: 'thick' })}
      ${divider.withText({ text: 'Seção', dark: true })}
    </div>
  `;
}
