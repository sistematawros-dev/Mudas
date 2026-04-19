import { initRouter } from "./router.js";
import { initSessionManager } from "./session.js";

function disableAutocomplete(root) {
  root.querySelectorAll('input:not([autocomplete]), select:not([autocomplete]), textarea:not([autocomplete])').forEach((el) => {
    el.setAttribute('autocomplete', 'off');
  });
}

function observeAutocomplete() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches?.('input, select, textarea')) {
          if (!node.hasAttribute('autocomplete')) node.setAttribute('autocomplete', 'off');
        }
        disableAutocomplete(node);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function bootstrap() {
  observeAutocomplete();
  initSessionManager(); // Retoma o heartbeat caso o usuário já esteja logado (reload de página)
  initRouter(document.querySelector("#app"));
}
