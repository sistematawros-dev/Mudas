const ROUTE_LOADER_ID = "route-loader";

export function ensureRouteLoader() {
  let loader = document.getElementById(ROUTE_LOADER_ID);
  if (loader) return loader;

  loader = document.createElement("div");
  loader.id = ROUTE_LOADER_ID;
  loader.className = "route-loader";
  loader.setAttribute("aria-hidden", "true");
  loader.innerHTML = `
    <div class="route-loader__spinner">
      <img src="/assets/logotransition.png" alt="" aria-hidden="true" />
    </div>
  `;

  document.body.appendChild(loader);
  return loader;
}

export function showRouteLoader() {
  const loader = ensureRouteLoader();
  loader.classList.add("is-visible");
}

export function hideRouteLoader() {
  const loader = document.getElementById(ROUTE_LOADER_ID);
  if (!loader) return;
  loader.classList.remove("is-visible");
}
