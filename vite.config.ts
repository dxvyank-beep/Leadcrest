import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const srcPath = fs.existsSync(path.resolve(__dirname, "./src"))
  ? path.resolve(__dirname, "./src")
  : path.resolve(__dirname, "./Src");

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  build: {
    // Target modern browsers to reduce polyfill bloat
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunks to split vendor code and reduce initial bundle
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger'],
          'router': ['react-router'],
        },
      },
    },
    // Esbuild is the default minifier, we can configure it to drop console
    minify: 'esbuild',
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
