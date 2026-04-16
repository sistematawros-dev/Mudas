/**
 * Centralized Utility Helpers
 *
 * Funções utilitárias compartilhadas para eliminar duplicação de código.
 * Substitui padrões repetidos em 30+ componentes.
 *
 * Uso:
 *   import { generateId, cx, show, hide } from '../utils/helpers.js';
 */

/**
 * Gera um ID único para componentes
 *
 * Substitui o padrão repetido:
 *   `component-${Math.random().toString(36).substr(2, 9)}`
 *
 * Usa crypto.randomUUID se disponível (navegadores modernos),
 * caso contrário faz fallback para Math.random
 *
 * @param {string} prefix - Prefixo para o ID (ex: 'modal', 'dropdown', 'input')
 * @returns {string} ID único no formato 'prefix-xxxxx'
 *
 * @example
 * generateId('modal')  // 'modal-a3f9b2c1'
 * generateId('input')  // 'input-7k2m9p4q'
 */
export function generateId(prefix = 'id') {
  // Tenta usar crypto.randomUUID (mais seguro e rápido)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    // Pega apenas os primeiros 8 caracteres do UUID para manter compatibilidade
    return `${prefix}-${crypto.randomUUID().split('-')[0]}`;
  }

  // Fallback para Math.random (compatibilidade com ambientes antigos)
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Constrói string de classes CSS filtrando valores falsy
 *
 * Substitui o padrão repetido:
 *   const classes = ['base'];
 *   if (variant) classes.push(`base--${variant}`);
 *   if (size) classes.push(`base--${size}`);
 *   return classes.join(' ');
 *
 * @param {...(string|false|null|undefined)} classes - Classes CSS ou valores falsy
 * @returns {string} String de classes separadas por espaço
 *
 * @example
 * cx('btn')                           // 'btn'
 * cx('btn', 'btn--primary')           // 'btn btn--primary'
 * cx('btn', false, 'btn--large')      // 'btn btn--large'
 * cx('btn', variant && `btn--${variant}`)  // 'btn btn--primary' (se variant='primary')
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Alias para cx (className builder)
 * Alguns desenvolvedores preferem o nome buildClass
 */
export const buildClass = cx;

/**
 * Obtém elemento do DOM por seletor ou retorna o próprio elemento
 *
 * Helper interno para funções de visibilidade.
 * Aceita tanto string (seletor CSS) quanto elemento DOM.
 *
 * @param {string|HTMLElement} elementOrSelector - Seletor CSS ou elemento DOM
 * @returns {HTMLElement|null} Elemento encontrado ou null
 */
function getElement(elementOrSelector) {
  if (!elementOrSelector) return null;

  if (typeof elementOrSelector === 'string') {
    return document.querySelector(elementOrSelector);
  }

  return elementOrSelector instanceof HTMLElement ? elementOrSelector : null;
}

/**
 * Mostra um elemento adicionando classe 'is-visible'
 *
 * Substitui o padrão:
 *   element.classList.add('is-visible')
 *
 * @param {string|HTMLElement} elementOrSelector - Seletor CSS ou elemento DOM
 * @returns {boolean} true se elemento foi encontrado e mostrado
 *
 * @example
 * show('#modal')           // Mostra elemento com id="modal"
 * show(modalElement)       // Mostra elemento DOM diretamente
 */
export function show(elementOrSelector) {
  const element = getElement(elementOrSelector);
  if (!element) return false;

  element.classList.add('is-visible');
  return true;
}

/**
 * Esconde um elemento removendo classe 'is-visible'
 *
 * Substitui o padrão:
 *   element.classList.remove('is-visible')
 *
 * @param {string|HTMLElement} elementOrSelector - Seletor CSS ou elemento DOM
 * @returns {boolean} true se elemento foi encontrado e escondido
 *
 * @example
 * hide('#modal')           // Esconde elemento com id="modal"
 * hide(modalElement)       // Esconde elemento DOM diretamente
 */
export function hide(elementOrSelector) {
  const element = getElement(elementOrSelector);
  if (!element) return false;

  element.classList.remove('is-visible');
  return true;
}

/**
 * Alterna visibilidade de um elemento (toggle classe 'is-visible')
 *
 * Substitui o padrão:
 *   element.classList.toggle('is-visible')
 *   element.classList.toggle('is-visible', forceState)
 *
 * @param {string|HTMLElement} elementOrSelector - Seletor CSS ou elemento DOM
 * @param {boolean} [force] - Força estado (true=mostrar, false=esconder)
 * @returns {boolean} true se elemento está visível após toggle
 *
 * @example
 * toggle('#modal')              // Alterna visibilidade
 * toggle('#modal', true)        // Força mostrar
 * toggle('#modal', false)       // Força esconder
 * toggle(modalElement)          // Alterna usando elemento DOM
 */
export function toggle(elementOrSelector, force) {
  const element = getElement(elementOrSelector);
  if (!element) return false;

  if (typeof force === 'boolean') {
    element.classList.toggle('is-visible', force);
    return force;
  }

  return element.classList.toggle('is-visible');
}

/**
 * Verifica se um elemento está visível (tem classe 'is-visible')
 *
 * @param {string|HTMLElement} elementOrSelector - Seletor CSS ou elemento DOM
 * @returns {boolean} true se elemento está visível
 *
 * @example
 * isVisible('#modal')      // true ou false
 */
export function isVisible(elementOrSelector) {
  const element = getElement(elementOrSelector);
  if (!element) return false;

  return element.classList.contains('is-visible');
}

/**
 * Query selector otimizado (alias para querySelector)
 *
 * @param {string|HTMLElement} scope - Escopo da busca (elemento ou seletor)
 * @param {string} [selector] - Seletor CSS (se scope for elemento)
 * @returns {HTMLElement|null}
 *
 * @example
 * qs('#modal')                    // Busca no document
 * qs(container, '.item')          // Busca dentro de container
 */
export function qs(scope, selector) {
  if (selector) {
    const element = getElement(scope);
    return element ? element.querySelector(selector) : null;
  }

  return document.querySelector(scope);
}

/**
 * Query selector ALL otimizado (alias para querySelectorAll)
 *
 * @param {string|HTMLElement} scope - Escopo da busca (elemento ou seletor)
 * @param {string} [selector] - Seletor CSS (se scope for elemento)
 * @returns {NodeList}
 *
 * @example
 * qsa('.item')                    // Busca todos no document
 * qsa(container, '.item')         // Busca todos dentro de container
 */
export function qsa(scope, selector) {
  if (selector) {
    const element = getElement(scope);
    return element ? element.querySelectorAll(selector) : [];
  }

  return document.querySelectorAll(scope);
}

/**
 * Adiciona event listener com cleanup automático
 *
 * Retorna função para remover o listener.
 * Útil para evitar memory leaks.
 *
 * @param {HTMLElement|string} elementOrSelector - Elemento ou seletor
 * @param {string} event - Nome do evento (ex: 'click', 'mouseover')
 * @param {Function} handler - Função handler
 * @param {Object|boolean} [options] - Opções do addEventListener
 * @returns {Function} Função para remover o listener
 *
 * @example
 * const remove = on(button, 'click', handleClick);
 * // Depois, para remover:
 * remove();
 */
export function on(elementOrSelector, event, handler, options) {
  const element = getElement(elementOrSelector);
  if (!element) return () => {};

  element.addEventListener(event, handler, options);

  // Retorna função de cleanup
  return () => element.removeEventListener(event, handler, options);
}

/**
 * Debounce - Limita frequência de execução de função
 *
 * Útil para eventos que disparam muito (scroll, resize, input)
 *
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Delay em milissegundos
 * @returns {Function} Função debounced
 *
 * @example
 * const handleSearch = debounce((query) => {
 *   fetch(`/api/search?q=${query}`)
 * }, 300);
 *
 * input.addEventListener('input', (e) => handleSearch(e.target.value));
 */
export function debounce(func, wait = 300) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle - Garante execução máxima de 1x a cada intervalo
 *
 * Diferente do debounce, executa periodicamente durante evento contínuo
 *
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Intervalo mínimo em milissegundos
 * @returns {Function} Função throttled
 *
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolling...');
 * }, 100);
 *
 * window.addEventListener('scroll', handleScroll);
 */
export function throttle(func, limit = 300) {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Export default para compatibilidade
export default {
  generateId,
  cx,
  buildClass,
  show,
  hide,
  toggle,
  isVisible,
  qs,
  qsa,
  on,
  debounce,
  throttle,
};
