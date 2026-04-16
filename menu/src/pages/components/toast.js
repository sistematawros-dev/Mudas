import Toast from '../../components/toast/toast.js';

export function init() {
  const types = ['success', 'error', 'warning', 'info'];

  const messages = {
    success: { title: 'Title Text', message: 'Lorem ipsum dolor sit amet.' },
    error: { title: 'Erro encontrado', message: 'Há algumas ações que ficam impossíveis.' },
    warning: { title: 'Title Text', message: 'Lorem ipsum dolor sit amet.' },
    info: { title: 'Title Text', message: 'Lorem ipsum dolor sit amet.' },
  };

  // Filled toasts
  const filledContainer = document.getElementById('toast-filled');
  if (filledContainer) {
    let html = '';
    types.forEach(type => {
      // With message
      html += Toast.create({
        type,
        variant: 'filled',
        title: messages[type].title,
        message: messages[type].message,
        action: { label: 'Action' },
      });
      // Title only
      html += Toast.create({
        type,
        variant: 'filled',
        title: messages[type].title,
      });
    });
    filledContainer.innerHTML = html;
  }

  // Outlined toasts
  const outlinedContainer = document.getElementById('toast-outlined');
  if (outlinedContainer) {
    let html = '';
    types.forEach(type => {
      html += Toast.create({
        type,
        variant: 'outlined',
        title: messages[type].title,
        message: messages[type].message,
        action: { label: 'Action' },
      });
      html += Toast.create({
        type,
        variant: 'outlined',
        title: messages[type].title,
      });
    });
    outlinedContainer.innerHTML = html;
  }

  // Soft toasts
  const softContainer = document.getElementById('toast-soft');
  if (softContainer) {
    let html = '';
    types.forEach(type => {
      html += Toast.create({
        type,
        variant: 'soft',
        title: messages[type].title,
        message: messages[type].message,
        action: { label: 'Action' },
      });
      html += Toast.create({
        type,
        variant: 'soft',
        title: messages[type].title,
      });
    });
    softContainer.innerHTML = html;
  }

  // Neutral toasts (stacked demo)
  const neutralContainer = document.getElementById('toast-neutral');
  if (neutralContainer) {
    // Light mode stack
    let lightHtml = '<div class="demo-neutral-stack">';
    lightHtml += Toast.create({
      type: 'success',
      variant: 'filled',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      action: { label: 'Action' },
    });
    lightHtml += Toast.create({
      type: 'error',
      variant: 'soft',
      title: 'Erro encontrado',
      message: 'Há algumas ações que ficam impossíveis.',
      action: { label: 'Ir para' },
    });
    lightHtml += Toast.create({
      type: 'warning',
      variant: 'outlined',
      title: 'Atenção isso foi feito',
      message: 'Você está utilizando a função...',
    });
    lightHtml += Toast.create({
      type: 'neutral',
      variant: 'filled',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
    });
    lightHtml += Toast.create({
      type: 'info',
      variant: 'soft',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit uma.',
      action: { label: 'Saajan Ram' },
    });
    lightHtml += Toast.create({
      type: 'success',
      variant: 'outlined',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      action: { label: 'Action' },
    });
    lightHtml += Toast.create({
      type: 'neutral',
      variant: 'soft',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      action: { label: 'Action' },
    });
    lightHtml += '</div>';

    // Dark mode stack
    let darkHtml = '<div class="demo-neutral-stack demo-neutral-stack--dark">';
    darkHtml += Toast.create({
      type: 'success',
      variant: 'filled',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      action: { label: 'Action' },
      dark: true,
    });
    darkHtml += Toast.create({
      type: 'error',
      variant: 'soft',
      title: 'Erro encontrado',
      message: 'Há algumas ações que ficam impossíveis.',
      action: { label: 'Ir para' },
      dark: true,
    });
    darkHtml += Toast.create({
      type: 'warning',
      variant: 'outlined',
      title: 'Atenção isso foi feito',
      message: 'Você está utilizando a função...',
      dark: true,
    });
    darkHtml += Toast.create({
      type: 'neutral',
      variant: 'filled',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      dark: true,
    });
    darkHtml += Toast.create({
      type: 'info',
      variant: 'soft',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit uma.',
      action: { label: 'Saajan Ram' },
      dark: true,
    });
    darkHtml += Toast.create({
      type: 'success',
      variant: 'outlined',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      action: { label: 'Action' },
      dark: true,
    });
    darkHtml += Toast.create({
      type: 'neutral',
      variant: 'soft',
      title: 'Title Text',
      message: 'Lorem ipsum dolor sit amet.',
      action: { label: 'Action' },
      dark: true,
    });
    darkHtml += '</div>';

    neutralContainer.innerHTML = lightHtml + darkHtml;
  }

  // Interactive demo
  const lightButtons = document.querySelectorAll('#demo-light .demo-btn');
  const darkButtons = document.querySelectorAll('#demo-dark .demo-btn');
  const variantSelect = document.getElementById('variant-select');
  const positionSelect = document.getElementById('position-select');
  const durationSelect = document.getElementById('duration-select');
  const dismissAllBtn = document.getElementById('dismiss-all');

  function showDemoToast(type, dark = false) {
    const variant = variantSelect.value;
    const position = positionSelect.value;
    const duration = parseInt(durationSelect.value);

    const toastMessages = {
      success: { title: 'Sucesso!', message: 'A operação foi concluída com sucesso.' },
      error: { title: 'Erro!', message: 'Ocorreu um erro ao processar sua solicitação.' },
      warning: { title: 'Atenção!', message: 'Esta ação pode ter consequências.' },
      info: { title: 'Informação', message: 'Aqui está uma informação útil para você.' },
      neutral: { title: 'Notificação', message: 'Uma nova mensagem foi recebida.' },
    };

    Toast.show({
      type,
      variant,
      title: toastMessages[type].title,
      message: toastMessages[type].message,
      action: Math.random() > 0.5 ? { label: 'Action' } : null,
      position,
      duration,
      dark,
      onAction: () => {
        console.log('Action clicked!');
      },
    });
  }

  lightButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showDemoToast(btn.dataset.type, false);
    });
  });

  darkButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showDemoToast(btn.dataset.type, true);
    });
  });

  if (dismissAllBtn) {
    dismissAllBtn.addEventListener('click', () => {
      Toast.dismissAll();
    });
  }
}
