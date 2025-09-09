import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode"; // 👈 import nombrado

export default defineConfig({
  plugins: [react(), qrcode()],
  server: {
    host: true, // 👈 permite acceso desde otros dispositivos en tu red
  },
});
