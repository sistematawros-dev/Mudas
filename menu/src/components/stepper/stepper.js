import './stepper.css';

/**
 * Stepper Component
 */

const icons = {
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria stepper horizontal
 */
export function create(options = {}) {
  const {
    steps = [],
    currentStep = 0,
    size = 'md', // sm, md, lg
    showDescription = true,
    compact = false,
    dashed = false,
    clickable = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['stepper'];
  if (size !== 'md') classes.push(`stepper--${size}`);
  if (compact) classes.push('stepper--compact');
  if (dashed) classes.push('stepper--dashed');
  if (clickable) classes.push('stepper--clickable');
  if (dark) classes.push('stepper--dark');
  if (className) classes.push(className);

  const stepsHtml = steps.map((step, index) => {
    const state = getStepState(index, currentStep, step.error);
    return createStepItem(step, index, state, showDescription);
  }).join('');

  return `
    <div class="${classes.join(' ')}" data-stepper data-current="${currentStep}">
      ${stepsHtml}
    </div>
  `;
}

/**
 * Cria stepper vertical
 */
export function createVertical(options = {}) {
  const {
    steps = [],
    currentStep = 0,
    size = 'md',
    showDescription = true,
    dashed = false,
    clickable = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['stepper', 'stepper--vertical'];
  if (size !== 'md') classes.push(`stepper--${size}`);
  if (dashed) classes.push('stepper--dashed');
  if (clickable) classes.push('stepper--clickable');
  if (dark) classes.push('stepper--dark');
  if (className) classes.push(className);

  const stepsHtml = steps.map((step, index) => {
    const state = getStepState(index, currentStep, step.error);
    return createStepItem(step, index, state, showDescription);
  }).join('');

  return `
    <div class="${classes.join(' ')}" data-stepper data-current="${currentStep}">
      ${stepsHtml}
    </div>
  `;
}

/**
 * Determina estado do step
 */
function getStepState(index, currentStep, hasError) {
  if (hasError) return 'error';
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'active';
  return 'pending';
}

/**
 * Cria item do step
 */
function createStepItem(step, index, state, showDescription) {
  const itemClasses = ['stepper-item'];
  if (state === 'active') itemClasses.push('is-active');
  if (state === 'completed') itemClasses.push('is-completed');
  if (state === 'error') itemClasses.push('is-error');

  let indicatorContent = index + 1;
  if (state === 'completed') {
    indicatorContent = step.completedIcon || icons.check;
  } else if (state === 'error') {
    indicatorContent = step.errorIcon || icons.error;
  } else if (step.icon) {
    indicatorContent = step.icon;
  }

  const descriptionHtml = showDescription && step.description
    ? `<span class="stepper-description">${step.description}</span>`
    : '';

  return `
    <div class="${itemClasses.join(' ')}" data-step="${index}">
      <div class="stepper-indicator" data-step-indicator="${index}">
        ${indicatorContent}
      </div>
      <div class="stepper-content">
        <span class="stepper-title">${step.title || `Step ${index + 1}`}</span>
        ${descriptionHtml}
      </div>
    </div>
  `;
}

/**
 * Cria stepper simples (apenas indicadores)
 */
export function createSimple(options = {}) {
  return create({
    ...options,
    compact: true,
    showDescription: false,
  });
}

/**
 * Inicializa stepper
 */
export function init(container = document, onChange = null) {
  container.addEventListener('click', (e) => {
    const indicator = e.target.closest('[data-step-indicator]');
    if (!indicator) return;

    const stepper = indicator.closest('[data-stepper]');
    if (!stepper || !stepper.closest('.stepper--clickable')) return;

    const stepIndex = parseInt(indicator.dataset.stepIndicator);
    const currentStep = parseInt(stepper.dataset.current);

    if (onChange) {
      onChange({
        stepper,
        stepIndex,
        previousStep: currentStep,
      });
    }
  });
}

/**
 * Atualiza step atual
 */
export function setCurrentStep(stepperElement, stepIndex) {
  const steps = stepperElement.querySelectorAll('.stepper-item');
  const totalSteps = steps.length;

  stepIndex = Math.max(0, Math.min(stepIndex, totalSteps - 1));
  stepperElement.dataset.current = stepIndex;

  steps.forEach((step, index) => {
    step.classList.remove('is-active', 'is-completed');

    if (index < stepIndex) {
      step.classList.add('is-completed');
      const indicator = step.querySelector('.stepper-indicator');
      if (indicator && !indicator.querySelector('svg')) {
        indicator.innerHTML = icons.check;
      }
    } else if (index === stepIndex) {
      step.classList.add('is-active');
      const indicator = step.querySelector('.stepper-indicator');
      if (indicator) {
        indicator.innerHTML = index + 1;
      }
    } else {
      const indicator = step.querySelector('.stepper-indicator');
      if (indicator) {
        indicator.innerHTML = index + 1;
      }
    }
  });
}

/**
 * Avança para próximo step
 */
export function nextStep(stepperElement) {
  const currentStep = parseInt(stepperElement.dataset.current);
  setCurrentStep(stepperElement, currentStep + 1);
}

/**
 * Volta para step anterior
 */
export function prevStep(stepperElement) {
  const currentStep = parseInt(stepperElement.dataset.current);
  setCurrentStep(stepperElement, currentStep - 1);
}

/**
 * Marca step como erro
 */
export function setStepError(stepperElement, stepIndex, hasError = true) {
  const step = stepperElement.querySelector(`[data-step="${stepIndex}"]`);
  if (!step) return;

  if (hasError) {
    step.classList.add('is-error');
    step.classList.remove('is-active', 'is-completed');
    const indicator = step.querySelector('.stepper-indicator');
    if (indicator) {
      indicator.innerHTML = icons.error;
    }
  } else {
    step.classList.remove('is-error');
    setCurrentStep(stepperElement, parseInt(stepperElement.dataset.current));
  }
}

/**
 * Obtém step atual
 */
export function getCurrentStep(stepperElement) {
  return parseInt(stepperElement.dataset.current);
}

export default {
  create,
  createVertical,
  createSimple,
  init,
  setCurrentStep,
  nextStep,
  prevStep,
  setStepError,
  getCurrentStep,
  icons,
};
