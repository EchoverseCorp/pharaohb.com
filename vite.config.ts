import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  ssgOptions: {
    dirStyle: "nested",
    includedRoutes: () => [
      "/",
      "/start-here",
      "/ideas",
      "/books",
      "/tools",
      "/principles",
      "/explorations",
      "/audio",
      "/pharaoh-b",
      "/creative",
      "/study-guides",
      "/music",
      "/art",
      "/shop",
      "/about",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
