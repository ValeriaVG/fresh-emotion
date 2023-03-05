# Fresh Emotion CSS plugin

This plugin allows use of CSS-in-JS library [emotion](https://emotion.sh/)
within [fresh](https://fresh.deno.dev/) framework.

## How to use

Add plugin to `main.ts`:

```ts
import emotion from "https://raw.githubusercontent.com/en-di/fresh-emotion/main/plugin.ts";

await start(manifest, {
  plugins: [emotion()],
});
```

Add `emotion/css` to `import_map.json`:

```json
{
  "imports": {
    /** ... **/
    "@emotion/css": "https://esm.sh/@emotion/css@11.10.5"
  }
}
```

Use in your code:

```tsx
import { css } from "@emotion/css";
export default function () {
  return (
    <h1
      class={css`
        color: lime;
      `}
    >
      Hello, CSS-in-JS!
    </h1>
  );
}
```
