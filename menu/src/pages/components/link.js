import link from '../../components/link/link.js';

export function init() {
  // Brand Links (all sizes)
  document.getElementById('link-brand').innerHTML = `
    ${link.create({ label: 'Label', variant: 'brand', external: true, size: 'sm' })}
    ${link.create({ label: 'Label', variant: 'brand', external: true, size: 'md' })}
    ${link.create({ label: 'Label', variant: 'brand', external: true, size: 'lg' })}
  `;

  // Neutral Links
  document.getElementById('link-neutral').innerHTML = `
    ${link.create({ label: 'Label', variant: 'neutral', external: true, size: 'sm' })}
    ${link.create({ label: 'Label', variant: 'neutral', external: true, size: 'md' })}
    ${link.create({ label: 'Label', variant: 'neutral', external: true, size: 'lg' })}
  `;

  // Inverted Links
  document.getElementById('link-inverted').innerHTML = `
    <div class="demo-grid-states">
      ${link.create({ label: 'Label', variant: 'inverted', external: true, size: 'sm' })}
      ${link.create({ label: 'Label', variant: 'inverted', external: true, size: 'md' })}
      ${link.create({ label: 'Label', variant: 'inverted', external: true, size: 'lg' })}
    </div>
  `;

  // Sizes
  document.getElementById('link-sizes').innerHTML = `
    ${link.create({ label: 'Small', size: 'sm', external: true })}
    ${link.create({ label: 'Medium', size: 'md', external: true })}
    ${link.create({ label: 'Large', size: 'lg', external: true })}
  `;

  // External Links
  document.getElementById('link-external').innerHTML = `
    ${link.createExternal({ label: 'External Link', variant: 'brand' })}
    ${link.createExternal({ label: 'External Link', variant: 'neutral' })}
    ${link.create({ label: 'Internal Link', variant: 'brand' })}
  `;

  // Light Mode
  document.getElementById('link-light').innerHTML = `
    <div class="link-group">
      ${link.createNeutral({ label: 'Link Neutral', external: true })}
      ${link.createBrand({ label: 'LinkDefault', external: true })}
    </div>
  `;

  // Dark Mode
  document.getElementById('link-dark').innerHTML = `
    <div class="link-group">
      ${link.createNeutral({ label: 'Link Neutral', external: true, dark: true })}
      ${link.createBrand({ label: 'LinkDefault', external: true, dark: true })}
      ${link.createInverted({ label: 'Link Inverted', external: true })}
    </div>
  `;
}
