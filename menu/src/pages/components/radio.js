import Radio from '../../components/radio/radio.js';

export function init() {
  // Basic radios (same group)
  document.getElementById('radio-basic-1').innerHTML = Radio.create({
    name: 'basic',
    value: '1',
    checked: true,
  });
  document.getElementById('radio-basic-2').innerHTML = Radio.create({
    name: 'basic',
    value: '2',
  });
  document.getElementById('radio-basic-3').innerHTML = Radio.create({
    name: 'basic',
    value: '3',
  });

  // States
  document.getElementById('radio-default').innerHTML = Radio.create({
    name: 'states',
    value: 'default',
    label: 'Default',
  });
  document.getElementById('radio-checked').innerHTML = Radio.create({
    name: 'states',
    value: 'checked',
    label: 'Checked',
    checked: true,
  });
  document.getElementById('radio-disabled').innerHTML = Radio.create({
    name: 'states-disabled',
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  });
  document.getElementById('radio-disabled-checked').innerHTML = Radio.create({
    name: 'states-disabled-checked',
    value: 'disabled-checked',
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
  });
  document.getElementById('radio-error').innerHTML = Radio.create({
    name: 'states-error',
    value: 'error',
    label: 'Error',
    error: true,
  });

  // With labels
  document.getElementById('radio-label-1').innerHTML = Radio.create({
    name: 'labels',
    value: '1',
    label: 'Radio One Text',
    checked: true,
  });
  document.getElementById('radio-label-2').innerHTML = Radio.create({
    name: 'labels',
    value: '2',
    label: 'Radio Two Text',
  });
  document.getElementById('radio-label-3').innerHTML = Radio.create({
    name: 'labels',
    value: '3',
    label: 'Radio Three Text',
  });
  document.getElementById('radio-label-4').innerHTML = Radio.create({
    name: 'labels',
    value: '4',
    label: 'Radio Four Text',
  });

  // With description
  document.getElementById('radio-desc-1').innerHTML = Radio.create({
    name: 'description',
    value: '1',
    label: 'Radio One Text',
    description: 'Radio btn text',
    checked: true,
  });
  document.getElementById('radio-desc-2').innerHTML = Radio.create({
    name: 'description',
    value: '2',
    label: 'Radio Two Text',
    description: 'Radio btn text',
  });
  document.getElementById('radio-desc-3').innerHTML = Radio.create({
    name: 'description',
    value: '3',
    label: 'Radio Three Text',
    description: 'Radio btn text',
  });

  // Sizes
  document.getElementById('radio-sm').innerHTML = Radio.create({
    name: 'sizes',
    value: 'sm',
    label: 'Small',
    size: 'sm',
    checked: true,
  });
  document.getElementById('radio-md').innerHTML = Radio.create({
    name: 'sizes',
    value: 'md',
    label: 'Medium',
    size: 'md',
  });
  document.getElementById('radio-lg').innerHTML = Radio.create({
    name: 'sizes',
    value: 'lg',
    label: 'Large',
    size: 'lg',
  });

  // Group vertical
  document.getElementById('radio-group-vertical').innerHTML = Radio.createGroup({
    name: 'group-vertical',
    label: 'Selecione uma opção',
    value: 'option2',
    options: [
      { value: 'option1', label: 'Opção 1' },
      { value: 'option2', label: 'Opção 2' },
      { value: 'option3', label: 'Opção 3' },
      { value: 'option4', label: 'Opção 4', disabled: true },
    ],
  });

  // Group horizontal
  document.getElementById('radio-group-horizontal').innerHTML = Radio.createGroup({
    name: 'group-horizontal',
    label: 'Selecione o tamanho',
    value: 'md',
    horizontal: true,
    options: [
      { value: 'sm', label: 'Pequeno' },
      { value: 'md', label: 'Médio' },
      { value: 'lg', label: 'Grande' },
    ],
  });

  // Group with error
  document.getElementById('radio-group-error').innerHTML = Radio.createGroup({
    name: 'group-error',
    label: 'Selecione uma opção',
    error: 'Este campo é obrigatório',
    options: [
      { value: 'option1', label: 'Opção 1' },
      { value: 'option2', label: 'Opção 2' },
      { value: 'option3', label: 'Opção 3' },
    ],
  });

  // Dark mode
  document.getElementById('radio-dark-1').innerHTML = Radio.create({
    name: 'dark',
    value: '1',
    label: 'Radio One Text',
    dark: true,
  });
  document.getElementById('radio-dark-2').innerHTML = Radio.create({
    name: 'dark',
    value: '2',
    label: 'Radio Two Text',
    dark: true,
    checked: true,
  });
  document.getElementById('radio-dark-3').innerHTML = Radio.create({
    name: 'dark',
    value: '3',
    label: 'Radio Three Text',
    dark: true,
  });
  document.getElementById('radio-dark-4').innerHTML = Radio.create({
    name: 'dark',
    value: '4',
    label: 'Radio Disabled',
    dark: true,
    disabled: true,
  });
  document.getElementById('radio-dark-5').innerHTML = Radio.create({
    name: 'dark-error',
    value: '5',
    label: 'Radio Error',
    dark: true,
    error: true,
  });

  // Initialize interactions
  Radio.init(document, (data) => {
    console.log('Radio changed:', data);
  });
}
