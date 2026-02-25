import './divider.css';

/**
 * Divider Component
 * Linha fina para separar ou agrupar conteúdo
 */

/**
 * Cria um divider horizontal ou vertical
 */
export function create(options = {}) {
  const {
    orientation = 'horizontal', // horizontal, vertical
    thickness = 'normal', // normal, thick
    inset = 'none', // none, 8, 16, 24
    insetSide = 'both', // both, left
    spacing = 'none', // none, sm, md, lg
    style = 'solid', // solid, dashed, dotted
    color = 'default', // default, light, dark, primary
    dark = false,
    className = '',
  } = options;

  const classes = ['divider'];

  // Orientation
  if (orientation === 'vertical') {
    classes.push('divider--vertical');
  }

  // Thickness
  if (thickness === 'thick') {
    classes.push('divider--thick');
  }

  // Inset
  if (inset !== 'none') {
    if (insetSide === 'left' && orientation === 'horizontal') {
      classes.push(`divider--inset-left-${inset}`);
    } else {
      classes.push(`divider--inset-${inset}`);
    }
  }

  // Spacing
  if (spacing !== 'none') {
    classes.push(`divider--spacing-${spacing}`);
  }

  // Style
  if (style !== 'solid') {
    classes.push(`divider--${style}`);
  }

  // Color
  if (color !== 'default') {
    classes.push(`divider--${color}`);
  }

  // Dark theme
  if (dark) {
    classes.push('divider--theme-dark');
  }

  // Custom class
  if (className) {
    classes.push(className);
  }

  return `<hr class="${classes.join(' ')}" />`;
}

/**
 * Cria um divider horizontal
 */
export function horizontal(options = {}) {
  return create({ ...options, orientation: 'horizontal' });
}

/**
 * Cria um divider vertical
 */
export function vertical(options = {}) {
  return create({ ...options, orientation: 'vertical' });
}

/**
 * Cria um divider com texto
 */
export function withText(options = {}) {
  const {
    text = '',
    position = 'center', // left, center, right
    dark = false,
    thickness = 'normal',
    className = '',
  } = options;

  const classes = ['divider-with-text'];
  if (dark) classes.push('divider-with-text--dark');
  if (className) classes.push(className);

  const thickClass = thickness === 'thick' ? 'divider--thick' : '';
  const darkClass = dark ? 'divider--theme-dark' : '';
  const dividerClass = `divider ${thickClass} ${darkClass}`.trim();

  if (position === 'left') {
    return `
      <div class="${classes.join(' ')}">
        <span class="divider-text">${text}</span>
        <hr class="${dividerClass}" />
      </div>
    `;
  }

  if (position === 'right') {
    return `
      <div class="${classes.join(' ')}">
        <hr class="${dividerClass}" />
        <span class="divider-text">${text}</span>
      </div>
    `;
  }

  // Center (default)
  return `
    <div class="${classes.join(' ')}">
      <hr class="${dividerClass}" />
      <span class="divider-text">${text}</span>
      <hr class="${dividerClass}" />
    </div>
  `;
}

export default {
  create,
  horizontal,
  vertical,
  withText,
};
