import Stepper from '../../components/stepper/stepper.js';

export function init() {
  const basicSteps = [
    { title: 'Step Title' },
    { title: 'Step Title' },
    { title: 'Step Title' },
    { title: 'Step Title' },
  ];

  const stepsWithDesc = [
    { title: 'Step Title', description: 'Step Description' },
    { title: 'Step Title', description: 'Step Description' },
    { title: 'Step Title', description: 'Step Description' },
    { title: 'Step Title', description: 'Step Description' },
  ];

  // Horizontal stepper
  document.getElementById('stepper-horizontal').innerHTML = Stepper.create({
    steps: basicSteps,
    currentStep: 1,
  });

  // With description
  document.getElementById('stepper-with-desc').innerHTML = Stepper.create({
    steps: stepsWithDesc,
    currentStep: 1,
    showDescription: true,
  });

  // Vertical stepper
  document.getElementById('stepper-vertical').innerHTML = Stepper.createVertical({
    steps: basicSteps,
    currentStep: 1,
  });

  // Vertical with description
  document.getElementById('stepper-vertical-desc').innerHTML = Stepper.createVertical({
    steps: stepsWithDesc,
    currentStep: 2,
    showDescription: true,
  });

  // Completed state
  document.getElementById('stepper-completed').innerHTML = Stepper.create({
    steps: basicSteps,
    currentStep: 3,
  });

  // Error state
  document.getElementById('stepper-error').innerHTML = Stepper.create({
    steps: [
      { title: 'Step Title' },
      { title: 'Step Title', error: true },
      { title: 'Step Title' },
      { title: 'Step Title' },
    ],
    currentStep: 1,
  });

  // Sizes
  document.getElementById('stepper-sm').innerHTML = Stepper.create({
    steps: basicSteps,
    currentStep: 1,
    size: 'sm',
  });

  document.getElementById('stepper-md').innerHTML = Stepper.create({
    steps: basicSteps,
    currentStep: 1,
    size: 'md',
  });

  document.getElementById('stepper-lg').innerHTML = Stepper.create({
    steps: basicSteps,
    currentStep: 1,
    size: 'lg',
  });

  // Interactive
  document.getElementById('stepper-interactive').innerHTML = Stepper.create({
    steps: [
      { title: 'Dados Pessoais', description: 'Preencha seus dados' },
      { title: 'Endereço', description: 'Informe seu endereço' },
      { title: 'Pagamento', description: 'Escolha a forma de pagamento' },
      { title: 'Confirmação', description: 'Revise e confirme' },
    ],
    currentStep: 0,
    clickable: true,
  });

  const interactiveStepper = document.querySelector('#stepper-interactive [data-stepper]');

  document.getElementById('btn-prev').addEventListener('click', () => {
    Stepper.prevStep(interactiveStepper);
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    Stepper.nextStep(interactiveStepper);
  });

  // Dark mode horizontal
  document.getElementById('stepper-dark-h').innerHTML = Stepper.create({
    steps: stepsWithDesc,
    currentStep: 2,
    dark: true,
  });

  // Dark mode vertical
  document.getElementById('stepper-dark-v').innerHTML = Stepper.createVertical({
    steps: stepsWithDesc,
    currentStep: 1,
    dark: true,
  });

  // Initialize click handlers
  Stepper.init(document, (data) => {
    console.log('Step clicked:', data);
    Stepper.setCurrentStep(data.stepper, data.stepIndex);
  });
}
