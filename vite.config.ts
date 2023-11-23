import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  define: {
    "process.env.VITE_VERCEL_URL": JSON.stringify(process.env.VITE_VERCEL_URL),
  },
  plugins: [react()],
});
