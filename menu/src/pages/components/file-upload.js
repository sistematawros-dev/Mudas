import FileUpload from '../../components/file-upload/file-upload.js';

export function init() {
  // Light mode upload
  const lightContainer = document.getElementById('upload-light');
  if (lightContainer) {
    lightContainer.innerHTML = FileUpload.create({
      title: 'Componentes / File Upload',
      dark: false,
    });
  }

  // Dark mode upload
  const darkContainer = document.getElementById('upload-dark');
  if (darkContainer) {
    darkContainer.innerHTML = FileUpload.create({
      title: 'Componentes / File Upload',
      dark: true,
    });
  }

  // State: Uploading
  const uploadingContainer = document.getElementById('state-uploading');
  if (uploadingContainer) {
    const mockFile = {
      id: 'file-1',
      name: 'document.pdf',
      size: 2458624, // ~2.4MB
    };

    uploadingContainer.innerHTML = FileUpload.createFileItem(mockFile, {
      status: 'uploading',
      progress: 45,
    });
  }

  // State: Success
  const successContainer = document.getElementById('state-success');
  if (successContainer) {
    const mockFile = {
      id: 'file-2',
      name: 'image.png',
      size: 1548576, // ~1.5MB
    };

    successContainer.innerHTML = FileUpload.createFileItem(mockFile, {
      status: 'success',
    });
  }

  // State: Error
  const errorContainer = document.getElementById('state-error');
  if (errorContainer) {
    const mockFile = {
      id: 'file-3',
      name: 'large-file.zip',
      size: 8458624, // ~8.4MB
    };

    errorContainer.innerHTML = FileUpload.createFileItem(mockFile, {
      status: 'error',
      error: 'Arquivo muito grande',
    });
  }

  // Interactive upload
  const interactiveContainer = document.getElementById('interactive-upload');
  if (interactiveContainer) {
    interactiveContainer.innerHTML = FileUpload.create({
      title: 'Upload de Arquivos',
      acceptedFormats: ['image/png', 'image/jpeg', 'application/pdf'],
      maxSize: 5 * 1024 * 1024, // 5MB
      maxSizeLabel: '5MB',
      multiple: true,
    });
  }

  // Initialize all file uploads with callbacks
  FileUpload.init(document, {
    maxSize: 5 * 1024 * 1024,
    acceptedFormats: ['image/png', 'image/jpeg', 'application/pdf', '.doc', '.docx'],

    onValidate: (file) => {
      console.log('Validating file:', file.name);
      return { valid: true };
    },

    onUpload: (file, callbacks) => {
      console.log('Starting upload:', file.name);

      // Simula upload com progresso
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;

        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Simula sucesso ou erro aleatório
          const isSuccess = Math.random() > 0.2; // 80% de sucesso
          setTimeout(() => {
            if (isSuccess) {
              callbacks.onSuccess();
            } else {
              callbacks.onError('Erro simulado no upload');
            }
          }, 300);
        } else {
          callbacks.onProgress(Math.floor(progress));
        }
      }, 400);
    },

    onProgress: (file, progress) => {
      console.log(`Upload progress for ${file.name}: ${progress}%`);
    },

    onSuccess: (file) => {
      console.log('Upload successful:', file.name);
    },

    onError: (file, error) => {
      console.error('Upload error:', file.name, error);
    },

    onDelete: (file) => {
      console.log('File deleted:', file?.name);
    },
  });
}
