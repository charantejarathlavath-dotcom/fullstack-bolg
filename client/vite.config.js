import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxies /api requests to the Express server during local development,
// so the browser sees everything as same-origin (cookies just work).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
