import { bootstrap } from './app/bootstrap.js';
import './styles/tokens.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/utilities.css';
import './styles/route-loader.css';

function normalizeApiBase(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

const apiFixa = normalizeApiBase('http://192.168.15.10:3000/api/v1');
window.localStorage.setItem('TAWROS_API_URL', apiFixa);
window.TAWROS_API_URL = apiFixa;

// Interceptor global: injeta X-Filial-Id em todas as requisições à API
(function interceptFetch() {
  const _fetch = window.fetch.bind(window);
  window.fetch = function (input, init = {}) {
    try {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      const filialId = sessionStorage.getItem('filialId');
      if (filialId && url.includes(apiFixa)) {
        const headers = new Headers(init.headers || (input instanceof Request ? input.headers : {}));
        if (!headers.has('X-Filial-Id')) headers.set('X-Filial-Id', filialId);
        init = { ...init, headers };
      }
    } catch {
      // não bloqueia a requisição em caso de erro inesperado
    }
    return _fetch(input, init);
  };
})();

bootstrap();
