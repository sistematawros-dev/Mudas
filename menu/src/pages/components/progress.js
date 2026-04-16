import Progress from '../../components/progress/progress.js';

export function init() {
  // Progress bars with different values
  document.getElementById('progress-bar-0').innerHTML = Progress.createBar({ value: 0, showValue: true });
  document.getElementById('progress-bar-25').innerHTML = Progress.createBar({ value: 25, showValue: true });
  document.getElementById('progress-bar-50').innerHTML = Progress.createBar({ value: 50, showValue: true });
  document.getElementById('progress-bar-75').innerHTML = Progress.createBar({ value: 75, showValue: true });
  document.getElementById('progress-bar-100').innerHTML = Progress.createBar({ value: 100, showValue: true });

  // With labels
  document.getElementById('progress-label-1').innerHTML = Progress.createBar({
    value: 50,
    label: 'Progresso do Upload',
    showValue: true,
  });
  document.getElementById('progress-label-2').innerHTML = Progress.createBar({
    value: 90,
    label: 'Instalação',
    showValue: true,
  });

  // Progress circles
  document.getElementById('circle-0').innerHTML = Progress.createCircle({ value: 0 });
  document.getElementById('circle-10').innerHTML = Progress.createCircle({ value: 10 });
  document.getElementById('circle-20').innerHTML = Progress.createCircle({ value: 20 });
  document.getElementById('circle-30').innerHTML = Progress.createCircle({ value: 30 });
  document.getElementById('circle-40').innerHTML = Progress.createCircle({ value: 40 });
  document.getElementById('circle-50').innerHTML = Progress.createCircle({ value: 50 });
  document.getElementById('circle-60').innerHTML = Progress.createCircle({ value: 60 });
  document.getElementById('circle-70').innerHTML = Progress.createCircle({ value: 70 });
  document.getElementById('circle-80').innerHTML = Progress.createCircle({ value: 80 });
  document.getElementById('circle-90').innerHTML = Progress.createCircle({ value: 90 });
  document.getElementById('circle-100').innerHTML = Progress.createCircle({ value: 100 });

  // Circle sizes
  document.getElementById('circle-sm').innerHTML = Progress.createCircle({ value: 65, size: 'sm' });
  document.getElementById('circle-md').innerHTML = Progress.createCircle({ value: 65, size: 'md' });
  document.getElementById('circle-lg').innerHTML = Progress.createCircle({ value: 65, size: 'lg' });
  document.getElementById('circle-xl').innerHTML = Progress.createCircle({ value: 65, size: 'xl' });

  // Bar sizes
  document.getElementById('bar-sm').innerHTML = Progress.createBar({ value: 60, size: 'sm', label: 'Small' });
  document.getElementById('bar-md').innerHTML = Progress.createBar({ value: 60, size: 'md', label: 'Medium' });
  document.getElementById('bar-lg').innerHTML = Progress.createBar({ value: 60, size: 'lg', label: 'Large' });

  // Colors
  document.getElementById('bar-primary').innerHTML = Progress.createBar({ value: 60, color: 'primary', label: 'Primary' });
  document.getElementById('bar-success').innerHTML = Progress.createBar({ value: 60, color: 'success', label: 'Success' });
  document.getElementById('bar-warning').innerHTML = Progress.createBar({ value: 60, color: 'warning', label: 'Warning' });
  document.getElementById('bar-danger').innerHTML = Progress.createBar({ value: 60, color: 'danger', label: 'Danger' });
  document.getElementById('bar-info').innerHTML = Progress.createBar({ value: 60, color: 'info', label: 'Info' });

  // Circle colors
  document.getElementById('circle-primary').innerHTML = Progress.createCircle({ value: 65, color: 'primary' });
  document.getElementById('circle-success').innerHTML = Progress.createCircle({ value: 65, color: 'success' });
  document.getElementById('circle-warning').innerHTML = Progress.createCircle({ value: 65, color: 'warning' });
  document.getElementById('circle-danger').innerHTML = Progress.createCircle({ value: 65, color: 'danger' });
  document.getElementById('circle-info').innerHTML = Progress.createCircle({ value: 65, color: 'info' });

  // Striped & Animated
  document.getElementById('bar-striped').innerHTML = Progress.createBar({
    value: 70,
    striped: true,
    label: 'Striped',
  });
  document.getElementById('bar-animated').innerHTML = Progress.createBar({
    value: 70,
    striped: true,
    animated: true,
    label: 'Animated',
  });

  // Indeterminate
  document.getElementById('bar-indeterminate').innerHTML = Progress.createBar({
    indeterminate: true,
    label: 'Carregando...',
  });
  document.getElementById('circle-indeterminate').innerHTML = Progress.createCircle({
    indeterminate: true,
  });

  // Dark mode
  document.getElementById('bar-dark-1').innerHTML = Progress.createBar({
    value: 50,
    label: 'Upload',
    dark: true,
  });
  document.getElementById('bar-dark-2').innerHTML = Progress.createBar({
    value: 90,
    label: 'Download',
    dark: true,
  });
  document.getElementById('circle-dark-1').innerHTML = Progress.createCircle({
    value: 50,
    dark: true,
  });
  document.getElementById('circle-dark-2').innerHTML = Progress.createCircle({
    value: 90,
    dark: true,
  });
}
