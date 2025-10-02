import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/_wilayah': {
        target: 'https://emsifa.github.io/api-wilayah-indonesia/api',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/_wilayah/, '')
      }
    }
  }
});
