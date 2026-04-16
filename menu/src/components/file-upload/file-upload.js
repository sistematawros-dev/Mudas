import './file-upload.css';

/**
 * File Upload Component
 */

const icons = {
  upload: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none"><path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2V9H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 19C1.55 19.36 1.64 19.7 1.82 20C2 20.3 2.26 20.56 2.56 20.74C2.86 20.92 3.21 21.01 3.56 21H20.44C20.79 21.01 21.14 20.92 21.44 20.74C21.74 20.56 22 20.3 22.18 20C22.36 19.7 22.45 19.36 22.45 19C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.32 12.97 3.15C12.67 2.98 12.34 2.89 12 2.89C11.66 2.89 11.33 2.98 11.03 3.15C10.73 3.32 10.47 3.56 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none"><path d="M1 4V10H7M23 20V14H17M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27538C16.8482 4.26539 15.4745 3.55996 13.9917 3.22433C12.5089 2.8887 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56477 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4352 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1113 10.0083 20.7757C8.52547 20.44 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  components: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Formata tamanho de arquivo
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Gera ID único
 */
function generateId() {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Cria estrutura HTML do componente
 */
export function create(options = {}) {
  const {
    id = `file-upload-${Date.now()}`,
    title = 'Componentes / File Upload',
    titleIcon = true,
    acceptedFormats = ['image/png', 'image/jpeg', 'application/pdf', '.doc', '.docx'],
    maxSize = 5 * 1024 * 1024, // 5MB
    maxSizeLabel = '5MB',
    multiple = true,
    dark = false,
    compact = false,
    className = '',
  } = options;

  const classes = ['file-upload'];
  if (dark) classes.push('file-upload--dark');
  if (compact) classes.push('file-upload--compact');
  if (className) classes.push(className);

  const acceptAttr = acceptedFormats.join(',');
  const formatHint = acceptedFormats
    .map(f => f.replace('image/', '').replace('application/', '').toUpperCase())
    .slice(0, 4)
    .join(', ');

  return `
    <div class="${classes.join(' ')}" id="${id}" data-file-upload>
      ${title ? `
        <div class="file-upload-header">
          ${titleIcon ? `<span class="file-upload-header-icon">${icons.components}</span>` : ''}
          <span class="file-upload-title">${title}</span>
        </div>
      ` : ''}

      <div class="file-upload-error" data-upload-error style="display: none;">
        <div class="file-upload-error-content">
          <span class="file-upload-error-icon">${icons.warning}</span>
          <span class="file-upload-error-text" data-error-text></span>
        </div>
        <button class="file-upload-error-close" data-error-close>
          ${icons.close}
        </button>
      </div>

      <div class="file-upload-zone" data-upload-zone>
        <span class="file-upload-zone-icon">${icons.upload}</span>
        <span class="file-upload-zone-text">Clique para fazer upload</span>
        <span class="file-upload-zone-subtext">ou arraste e solte os arquivos aqui</span>
        <span class="file-upload-zone-hint">${formatHint} (max. ${maxSizeLabel})</span>
        <input
          type="file"
          class="file-upload-input"
          data-upload-input
          accept="${acceptAttr}"
          ${multiple ? 'multiple' : ''}
        />
      </div>

      <div class="file-upload-list" data-upload-list></div>
    </div>
  `;
}

/**
 * Cria item de arquivo
 */
export function createFileItem(file, options = {}) {
  const {
    id = file.id || generateId(),
    status = 'pending', // pending, uploading, success, error
    progress = 0,
    error = null,
  } = options;

  const classes = ['file-item'];
  if (status === 'error') classes.push('file-item--error');
  if (status === 'success') classes.push('file-item--success');
  if (status === 'uploading') classes.push('file-item--uploading');

  let statusHtml = '';
  if (status === 'success') {
    statusHtml = `
      <span class="file-item-status file-item-status--success">
        <span class="file-item-status-icon">${icons.check}</span>
        <span>Upload completo</span>
      </span>
    `;
  } else if (status === 'error') {
    statusHtml = `
      <span class="file-item-status file-item-status--error">
        <span class="file-item-status-icon">${icons.error}</span>
        <span>${error || 'Erro no upload'}</span>
      </span>
    `;
  } else if (status === 'uploading') {
    statusHtml = `<span>${progress}% de upload</span>`;
  }

  return `
    <div class="${classes.join(' ')}" data-file-item data-file-id="${id}">
      <div class="file-item-icon">
        ${icons.file}
      </div>
      <div class="file-item-content">
        <div class="file-item-name">${file.name}</div>
        <div class="file-item-meta">
          <span class="file-item-size">${formatFileSize(file.size)}</span>
          ${statusHtml}
        </div>
        ${status === 'uploading' ? `
          <div class="file-item-progress">
            <div class="file-item-progress-bar">
              <div class="file-item-progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        ` : ''}
      </div>
      <div class="file-item-actions">
        ${status === 'error' ? `
          <button class="file-item-action file-item-action--retry" data-file-retry title="Tentar novamente">
            ${icons.refresh}
          </button>
        ` : ''}
        <button class="file-item-action file-item-action--delete" data-file-delete title="Remover">
          ${icons.trash}
        </button>
      </div>
    </div>
  `;
}

/**
 * Inicializa o componente de upload
 */
export function init(container = document, callbacks = {}) {
  const {
    onUpload,
    onProgress,
    onSuccess,
    onError,
    onDelete,
    onValidate,
    maxSize = 5 * 1024 * 1024,
    acceptedFormats = [],
  } = callbacks;

  // Armazena arquivos
  const filesMap = new Map();

  // Drag and drop
  container.addEventListener('dragover', (e) => {
    const zone = e.target.closest('[data-upload-zone]');
    if (zone) {
      e.preventDefault();
      zone.classList.add('is-dragover');
    }
  });

  container.addEventListener('dragleave', (e) => {
    const zone = e.target.closest('[data-upload-zone]');
    if (zone && !zone.contains(e.relatedTarget)) {
      zone.classList.remove('is-dragover');
    }
  });

  container.addEventListener('drop', (e) => {
    const zone = e.target.closest('[data-upload-zone]');
    if (zone) {
      e.preventDefault();
      zone.classList.remove('is-dragover');

      const fileUpload = zone.closest('[data-file-upload]');
      const files = Array.from(e.dataTransfer.files);
      handleFiles(fileUpload, files);
    }
  });

  // File input change
  container.addEventListener('change', (e) => {
    const input = e.target.closest('[data-upload-input]');
    if (input) {
      const fileUpload = input.closest('[data-file-upload]');
      const files = Array.from(input.files);
      handleFiles(fileUpload, files);
      input.value = ''; // Reset input
    }
  });

  // Delete file
  container.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('[data-file-delete]');
    if (deleteBtn) {
      const fileItem = deleteBtn.closest('[data-file-item]');
      const fileId = fileItem.dataset.fileId;
      const file = filesMap.get(fileId);

      if (onDelete) onDelete(file);
      filesMap.delete(fileId);
      fileItem.remove();
    }

    // Retry file
    const retryBtn = e.target.closest('[data-file-retry]');
    if (retryBtn) {
      const fileItem = retryBtn.closest('[data-file-item]');
      const fileId = fileItem.dataset.fileId;
      const file = filesMap.get(fileId);

      if (file) {
        const fileUpload = fileItem.closest('[data-file-upload]');
        uploadFile(fileUpload, file, fileId);
      }
    }

    // Close error
    const errorClose = e.target.closest('[data-error-close]');
    if (errorClose) {
      const errorElement = errorClose.closest('[data-upload-error]');
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }
  });

  // Handle files
  function handleFiles(fileUpload, files) {
    const listElement = fileUpload.querySelector('[data-upload-list]');

    files.forEach(file => {
      // Validação
      const validation = validateFile(file);
      if (!validation.valid) {
        showError(fileUpload, validation.error);
        return;
      }

      // Custom validation
      if (onValidate) {
        const customValidation = onValidate(file);
        if (!customValidation.valid) {
          showError(fileUpload, customValidation.error);
          return;
        }
      }

      const fileId = generateId();
      file.id = fileId;
      filesMap.set(fileId, file);

      // Adiciona item à lista
      const itemHtml = createFileItem(file, { id: fileId, status: 'uploading', progress: 0 });
      listElement.insertAdjacentHTML('beforeend', itemHtml);

      // Inicia upload
      uploadFile(fileUpload, file, fileId);
    });
  }

  // Validate file
  function validateFile(file) {
    if (maxSize && file.size > maxSize) {
      return {
        valid: false,
        error: `O arquivo "${file.name}" excede o tamanho máximo permitido.`
      };
    }

    if (acceptedFormats.length > 0) {
      const isAccepted = acceptedFormats.some(format => {
        if (format.startsWith('.')) {
          return file.name.toLowerCase().endsWith(format.toLowerCase());
        }
        return file.type === format;
      });

      if (!isAccepted) {
        return {
          valid: false,
          error: 'O formato do arquivo não é suportado.'
        };
      }
    }

    return { valid: true };
  }

  // Upload file
  function uploadFile(fileUpload, file, fileId) {
    const fileItem = fileUpload.querySelector(`[data-file-id="${fileId}"]`);

    if (onUpload) {
      // Custom upload logic
      onUpload(file, {
        onProgress: (progress) => {
          updateProgress(fileItem, progress);
          if (onProgress) onProgress(file, progress);
        },
        onSuccess: () => {
          updateStatus(fileItem, 'success');
          if (onSuccess) onSuccess(file);
        },
        onError: (error) => {
          updateStatus(fileItem, 'error', error);
          if (onError) onError(file, error);
        },
      });
    } else {
      // Simula upload (para demo)
      simulateUpload(fileItem, file);
    }
  }

  // Simula upload
  function simulateUpload(fileItem, file) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          updateStatus(fileItem, 'success');
          if (onSuccess) onSuccess(file);
        }, 300);
      }
      updateProgress(fileItem, Math.floor(progress));
    }, 500);
  }

  // Update progress
  function updateProgress(fileItem, progress) {
    const progressFill = fileItem.querySelector('.file-item-progress-fill');
    const progressText = fileItem.querySelector('.file-item-meta span:last-child');

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    if (progressText) {
      progressText.textContent = `${progress}% de upload`;
    }
  }

  // Update status
  function updateStatus(fileItem, status, error = null) {
    const file = filesMap.get(fileItem.dataset.fileId);
    if (!file) return;

    const newItemHtml = createFileItem(file, {
      id: file.id,
      status,
      progress: 100,
      error
    });

    fileItem.outerHTML = newItemHtml;
  }

  // Show error
  function showError(fileUpload, message) {
    const errorElement = fileUpload.querySelector('[data-upload-error]');
    const errorText = errorElement.querySelector('[data-error-text]');

    errorText.textContent = message;
    errorElement.style.display = 'flex';

    // Auto-hide após 5 segundos
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }
}

/**
 * Obtém arquivos do upload
 */
export function getFiles(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  const fileItems = element.querySelectorAll('[data-file-item]');
  return Array.from(fileItems).map(item => ({
    id: item.dataset.fileId,
    element: item,
  }));
}

export default {
  create,
  createFileItem,
  init,
  getFiles,
  icons,
  formatFileSize,
};
