import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // base: '/tfawe/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});


// StMkaNYlDdO1Tovz - password
// paullevites84_db_user - username
// mongodb+srv://paullevites84_db_user:StMkaNYlDdO1Tovz@kenkeputa.pukkvqk.mongodb.net/