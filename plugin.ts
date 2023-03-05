import { Plugin, PluginRenderScripts } from "$fresh/server.ts";
import createEmotionServer from "https://esm.sh/@emotion/server@11.10.0/create-instance";
import { cache } from "https://esm.sh/@emotion/css@11.10.5";

const { extractCritical } = createEmotionServer(cache);

const main = `data:application/javascript,import hydrate from "${
  new URL("./main.ts", import.meta.url).href
}";export default function(state) { hydrate(state); }`;

const emotion: () => Plugin = () => ({
  name: "emotion",
  entrypoints: { main: main },
  render: (ctx) => {
    const res = ctx.render();
    const { css, ids } = extractCritical(res.htmlText);
    const scripts: PluginRenderScripts[] = [];
    if (res.requiresHydration) {
      scripts.push({ entrypoint: "main", state: ids });
    }
    return {
      scripts,
      styles: [{ cssText: css, id: ids.join("_") }],
    };
  },
});

export default emotion;
