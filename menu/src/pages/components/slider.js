import Slider from '../../components/slider/slider.js';

export function init() {
  // Simple slider
  document.getElementById('slider-simple').innerHTML = Slider.create({
    value: 50,
    min: 0,
    max: 100,
    showLabels: true,
    showTooltip: true,
  });

  // Slider with input
  document.getElementById('slider-input').innerHTML = Slider.create({
    value: 123,
    min: 0,
    max: 456,
    showLabels: true,
    showTooltip: true,
    showInput: true,
  });

  // Range slider
  document.getElementById('slider-range').innerHTML = Slider.createRange({
    minValue: 25,
    maxValue: 75,
    min: 0,
    max: 100,
    showLabels: true,
    showTooltip: true,
    showInputs: false,
  });

  // Range with inputs
  document.getElementById('slider-range-inputs').innerHTML = Slider.createRange({
    minValue: 10,
    maxValue: 70,
    min: 0,
    max: 100,
    showLabels: true,
    showTooltip: true,
    showInputs: true,
    minLabel: 'min.*',
    maxLabel: 'max.*',
  });

  // Sizes
  document.getElementById('slider-sm').innerHTML = Slider.create({
    value: 40,
    min: 0,
    max: 100,
    size: 'sm',
    showLabels: false,
  });

  document.getElementById('slider-md').innerHTML = Slider.create({
    value: 50,
    min: 0,
    max: 100,
    size: 'md',
    showLabels: false,
  });

  document.getElementById('slider-lg').innerHTML = Slider.create({
    value: 60,
    min: 0,
    max: 100,
    size: 'lg',
    showLabels: false,
  });

  // Colors
  document.getElementById('slider-primary').innerHTML = Slider.create({
    value: 50,
    color: 'primary',
    showLabels: false,
  });

  document.getElementById('slider-success').innerHTML = Slider.create({
    value: 50,
    color: 'success',
    showLabels: false,
  });

  document.getElementById('slider-warning').innerHTML = Slider.create({
    value: 50,
    color: 'warning',
    showLabels: false,
  });

  document.getElementById('slider-danger').innerHTML = Slider.create({
    value: 50,
    color: 'danger',
    showLabels: false,
  });

  // Light mode with total
  document.getElementById('slider-total-light').innerHTML = Slider.createWithTotal({
    minValue: 10,
    maxValue: 70,
    min: 0,
    max: 100,
    minLabel: 'min.*',
    maxLabel: 'max.*',
    totalLabel: 'Total*',
    totalValue: 'R$ 820',
    showValueDisplay: true,
    valueDisplayText: 'R$ 820',
    formatValue: (v) => `${v} m2`,
    formatLabel: (v) => v === 0 ? '0' : `R$ ${v}.000`,
  });

  // Dark mode with total
  document.getElementById('slider-total-dark').innerHTML = Slider.createWithTotal({
    minValue: 10,
    maxValue: 70,
    min: 0,
    max: 100,
    minLabel: 'Description',
    maxLabel: 'Description',
    totalLabel: 'Total*',
    totalValue: 'R$ 820',
    showValueDisplay: true,
    valueDisplayText: 'R$ 820',
    dark: true,
    formatValue: (v) => `${v} m2`,
    formatLabel: (v) => v === 0 ? '0' : `R$ ${v}.000`,
  });

  // Disabled
  document.getElementById('slider-disabled').innerHTML = Slider.create({
    value: 30,
    min: 0,
    max: 100,
    disabled: true,
    showLabels: true,
  });

  // Initialize all sliders
  Slider.init(document, (data) => {
    console.log('Slider changed:', data);
  });
}
