import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const srcPath = fs.existsSync(path.resolve(__dirname, "./src"))
  ? path.resolve(__dirname, "./src")
  : path.resolve(__dirname, "./Src");

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
});
