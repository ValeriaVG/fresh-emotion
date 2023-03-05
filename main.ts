import { hydrate, cache } from "https://esm.sh/@emotion/css@11.10.5";
export default function (state: string[]) {
  let el = document.getElementById(cache.key);
  if (!el) {
    el = document.createElement("style");
    el.id = cache.key;
    document.head.appendChild(el);
  }
  el.innerText = "";
  hydrate(state);
  for (const key in cache.inserted) {
    const entry = cache.inserted[key];
    if (entry !== true) {
      el.innerText += entry;
    }
  }
}
