import { hydrate, cache } from "https://esm.sh/@emotion/css@11.10.5";
export default function (state: string[]) {
  let el = document.getElementById(cache.key);
  if (!el) {
    el = document.createElement("style");
    el.id = cache.key;
    document.head.appendChild(el);
  }

  hydrate(state);
  el.innerText = "";
  for (const key in cache.inserted) {
    const entry = cache.inserted[key];
    if (entry !== true) {
      el.innerText += entry;
    }
  }

  // Override inserts to handle dynamic styles
  const originalInsert = cache.insert;
  cache.insert = (...params) => {
    const result = originalInsert(...params);
    if (el) el.innerText += cache.inserted[params[1].name];
    return result;
  };
}
