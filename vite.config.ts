// vite.config.js
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    rollupOptions: {
      input: {
        app: "./src/index.tsx",
      },
    },
  },
  base: "https://cdn.statically.io/gh/quanganh569/sdk/tree/main/build",
});
