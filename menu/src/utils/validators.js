/**
 * Centralizes validation and formatting for common fields:
 * email, phone (celular/fixo), CEP, CPF, CNPJ
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function normalizeDigits(value) {
  return String(value ?? '').replace(/\D/g, '');
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

export function formatEmail(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function formatPhone(value) {
  const d = normalizeDigits(value).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function formatCep(value) {
  const d = normalizeDigits(value).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

export function formatCpf(value) {
  const d = normalizeDigits(value).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function formatCnpj(value) {
  const d = normalizeDigits(value).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

/** Formata CPF ou CNPJ dependendo do número de dígitos */
export function formatCpfCnpj(value) {
  const d = normalizeDigits(value);
  return d.length <= 11 ? formatCpf(d) : formatCnpj(d);
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim());
}

export function isValidPhone(value) {
  const d = normalizeDigits(value);
  return d.length === 10 || d.length === 11;
}

export function isValidCep(value) {
  return normalizeDigits(value).length === 8;
}

export function isValidCpf(value) {
  const d = normalizeDigits(value);
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;

  const calcDigit = (base, len) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  return calcDigit(d, 9) === Number(d[9]) && calcDigit(d, 10) === Number(d[10]);
}

export function isValidCnpj(value) {
  const d = normalizeDigits(value);
  if (d.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(d)) return false;

  const calcDigit = (base, factors) => {
    const sum = base.split('').reduce((acc, n, i) => acc + Number(n) * factors[i], 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const d1 = calcDigit(d.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calcDigit(d.slice(0, 12) + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d.endsWith(`${d1}${d2}`);
}

/** Valida CPF ou CNPJ automaticamente pelo tamanho */
export function isValidCpfCnpj(value) {
  const d = normalizeDigits(value);
  if (d.length === 11) return isValidCpf(d);
  if (d.length === 14) return isValidCnpj(d);
  return false;
}

// ---------------------------------------------------------------------------
// Helpers para inputs: aplica máscara ao digitar
// ---------------------------------------------------------------------------

/**
 * Conecta um <input> a uma função de formatação, aplicando a máscara
 * a cada keystroke. Retorna cleanup function.
 */
export function bindMask(inputEl, formatFn) {
  if (!inputEl) return () => {};
  const handler = () => {
    const start = inputEl.selectionStart;
    const prevLen = inputEl.value.length;
    inputEl.value = formatFn(inputEl.value);
    const diff = inputEl.value.length - prevLen;
    inputEl.setSelectionRange(start + diff, start + diff);
  };
  inputEl.addEventListener('input', handler);
  return () => inputEl.removeEventListener('input', handler);
}
