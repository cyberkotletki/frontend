import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    host: true,
    port: 3000,
    strictPort: true, // Vite не будет выбирать другой порт при занятости 3000
  },
  define: {
    "process.env": {},
  },
});
