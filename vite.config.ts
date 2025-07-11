import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],

    server: {
      host: true,
      port: parseInt(env.VITE_PORT),
      strictPort: true,
    },
    define: {
      "process.env": {},
    },
  };
});
