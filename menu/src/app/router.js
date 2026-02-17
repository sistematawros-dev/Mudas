import { routes } from "./routes.js";
import { hideRouteLoader, showRouteLoader } from "./route-loader.js";

let currentCssEl = null;
let currentLayout = null;
let currentCleanup = null;
let currentLayoutCleanup = null;
const loadedComponentCss = new Set();
const htmlModuleCache = new Map();
const jsModuleCache = new Map();

function resetRouteVisualState(root = document) {
  // Defensive reset for route transitions: remove stale overlays/locks from previous page.
  const body = document.body;
  if (body) {
    body.classList.remove("is-blurred", "has-backdrop", "modal-open", "drawer-open", "no-scroll");
    body.style.overflow = "";
  }

  const host = root instanceof Element ? root : document;
  // Drawers e modais são inseridos diretamente em document.body pelas páginas.
  // Buscar em document (não só em host) para garantir limpeza completa.
  document.querySelectorAll(
    '[data-drawer], [data-drawer-backdrop], [data-modal], [data-modal-backdrop], .drawer-backdrop, .modal-backdrop, .color-picker.is-open'
  ).forEach((el) => {
    if (el && typeof el.remove === "function") el.remove();
  });

  const view = host.querySelector("#view");
  const appMain = host.querySelector(".app-main");
  [view, appMain].forEach((el) => {
    if (!el || !el.style) return;
    el.style.removeProperty("filter");
    el.style.removeProperty("backdrop-filter");
    el.style.removeProperty("-webkit-backdrop-filter");
  });
}

function setPageCss(href) {
  if (currentCssEl) currentCssEl.remove();
  currentCssEl = document.createElement("link");
  currentCssEl.rel = "stylesheet";
  currentCssEl.href = href;
  document.head.appendChild(currentCssEl);
}

function loadComponentCss(names) {
  if (!names) return;
  for (const name of names) {
    if (loadedComponentCss.has(name)) continue;
    loadedComponentCss.add(name);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/src/components/${name}/${name}.css`;
    link.dataset.component = name;
    document.head.appendChild(link);
  }
}

async function renderLayout(root, layout) {
  if (currentLayout === layout) return;

  if (currentLayoutCleanup) {
    try { currentLayoutCleanup(); } catch (e) { console.error("[router] layout cleanup error:", e); }
    currentLayoutCleanup = null;
  }

  currentLayout = layout;

  if (layout === "blank") {
    root.innerHTML = `<main id="view" class="view view--blank"></main>`;
    return;
  }

  root.innerHTML = `
    <div class="app-shell">
      <aside class="app-sidebar" id="sidebar"></aside>
      <div class="app-main">
        <header class="app-header" id="header"></header>
        <main id="view" class="view view--app"></main>
      </div>
    </div>
  `;

  // Renderizar componentes do layout
  const [sidebar, header] = await Promise.all([
    import("../components/sidebar/sidebar.js"),
    import("../components/header/header.js")
  ]);

  sidebar.render(root.querySelector("#sidebar"));
  const sidebarCleanup = sidebar.init();

  header.render(root.querySelector("#header"));
  const headerCleanup = header.init();

  currentLayoutCleanup = () => {
    if (typeof sidebarCleanup === 'function') sidebarCleanup();
    if (typeof headerCleanup === 'function') headerCleanup();
  };
}

async function renderRoute(root) {
  showRouteLoader();
  try {
    const path = (location.hash.replace("#", "") || "/login").trim();
    const route = routes[path] || routes["/login"];

    document.title = route.title;

    // Remove banners fixos que podem ficar presos no topo após trocar de rota
    // (mantém apenas na página de demonstração do componente).
    if (path !== "/components/broadcast-banner") {
      document.querySelectorAll(".broadcast-banner--fixed").forEach((el) => el.remove());
    }

    // Cleanup da rota anterior antes de renderizar a nova
    if (currentCleanup) {
      try { currentCleanup(); } catch (e) { console.error("[router] cleanup error:", e); }
      currentCleanup = null;
    }
    resetRouteVisualState(root);

    await renderLayout(root, route.layout);
    setPageCss(route.css);
    loadComponentCss(route.components);

    const view = root.querySelector("#view");
    if (!view) {
      console.error("[router] #view not found after renderLayout");
      return;
    }

    let htmlModule = htmlModuleCache.get(path);
    if (!htmlModule) {
      htmlModule = await route.html();
      htmlModuleCache.set(path, htmlModule);
    }
    view.innerHTML = htmlModule.default;
    if (typeof view.scrollTo === "function") {
      view.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      view.scrollTop = 0;
    }

    let pageJs = jsModuleCache.get(path);
    if (!pageJs) {
      pageJs = await route.js();
      jsModuleCache.set(path, pageJs);
    }

    if (pageJs?.init) {
      const maybeCleanup = pageJs.init({ root });
      if (typeof maybeCleanup === "function") {
        currentCleanup = maybeCleanup;
      }
    }

    // Disparar evento de mudança de rota
    window.dispatchEvent(new CustomEvent("route:change", {
      detail: { route, path }
    }));
  } catch (error) {
    console.error("[router] renderRoute error:", error);
  } finally {
    hideRouteLoader();
  }
}

export function initRouter(root) {
  window.addEventListener("hashchange", () => renderRoute(root));
  renderRoute(root);
}
