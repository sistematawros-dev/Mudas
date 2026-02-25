import { initRouter } from "./router.js";

export function bootstrap() {
  initRouter(document.querySelector("#app"));
}
