const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';
const HEARTBEAT_MS = 10 * 60 * 1000; // 10 minutos
const SESSION_KEY = 'sessionKey';

let heartbeatTimer = null;
let popstateBlocker = null;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getSessionKey() { return sessionStorage.getItem(SESSION_KEY) || ''; }
function getToken() { return sessionStorage.getItem('authToken') || ''; }
function getRefresh() { return sessionStorage.getItem('refreshToken') || ''; }

export function generateSessionKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

// ─── Token refresh ───────────────────────────────────────────────────────────

async function tryRefreshToken() {
  const refreshToken = getRefresh();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const payload = await res.json().catch(() => ({}));
    const data = payload?.data || {};
    if (!data.accessToken) return false;
    sessionStorage.setItem('authToken', data.accessToken);
    if (data.refreshToken) sessionStorage.setItem('refreshToken', data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

// ─── Destroy session (logout) ────────────────────────────────────────────────

export function destroySession(reason = 'logout') {
  stopHeartbeat();

  // Encerra a sessão no backend via beacon (best-effort)
  const sessionKey = getSessionKey();
  if (sessionKey) {
    const url = `${API_BASE_URL}/auth/session/end`;
    const data = JSON.stringify({ sessionKey });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([data], { type: 'application/json' }));
      }
    } catch { /* ignore */ }
  }

  // Remove todos os dados de sessão
  sessionStorage.clear();

  // Substitui o histórico para que "Voltar" não funcione
  history.replaceState(null, '', '#/login');

  // Instala bloqueador de popstate para impedir navegação retroativa
  installPopstateBlocker();

  // Força o router a renderizar o login
  window.location.hash = '/login';
}

function installPopstateBlocker() {
  if (popstateBlocker) return;
  popstateBlocker = () => {
    if (!sessionStorage.getItem('authToken')) {
      history.pushState(null, '', '#/login');
    } else {
      // Usuário logou novamente — remove o bloqueador
      window.removeEventListener('popstate', popstateBlocker);
      popstateBlocker = null;
    }
  };
  window.addEventListener('popstate', popstateBlocker);
}

// ─── Session start (chamado após login) ─────────────────────────────────────

export async function startSession(token, force = false) {
  const sessionKey = generateSessionKey();
  sessionStorage.setItem(SESSION_KEY, sessionKey);

  try {
    const res = await fetch(`${API_BASE_URL}/auth/session/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionKey, force }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) return { status: 'ok' }; // não bloqueia o login em erro de rede
    return payload?.data || {};
  } catch {
    return { status: 'ok' }; // falha de rede não deve bloquear o login
  }
}

// ─── Heartbeat ───────────────────────────────────────────────────────────────

async function sendHeartbeat() {
  const sessionKey = getSessionKey();
  let token = getToken();
  if (!sessionKey || !token) return;

  const doRequest = async (t) =>
    fetch(`${API_BASE_URL}/auth/session/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
      body: JSON.stringify({ sessionKey }),
    });

  try {
    let res = await doRequest(token);

    if (res.status === 401) {
      const refreshed = await tryRefreshToken();
      if (!refreshed) { destroySession('token_expired'); return; }
      token = getToken();
      res = await doRequest(token);
    }

    if (res.status === 409) {
      // Sessão encerrada pelo administrador
      destroySession('force_logout');
    }
  } catch { /* erro de rede — ignora; próximo heartbeat tentará novamente */ }
}

// ─── Beacon ao fechar o browser/aba ─────────────────────────────────────────

function onBeforeUnload() {
  const sessionKey = getSessionKey();
  if (!sessionKey) return;
  const url = `${API_BASE_URL}/auth/session/end`;
  const data = JSON.stringify({ sessionKey });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([data], { type: 'application/json' }));
    } else {
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data, keepalive: true });
    }
  } catch { /* ignore */ }
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

function stopHeartbeat() {
  if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
}

export function initSessionManager() {
  if (!getToken() || !getSessionKey()) return;
  stopHeartbeat();
  window.removeEventListener('beforeunload', onBeforeUnload);
  heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_MS);
  window.addEventListener('beforeunload', onBeforeUnload);
}

export function stopSessionManager() {
  stopHeartbeat();
  window.removeEventListener('beforeunload', onBeforeUnload);
}
