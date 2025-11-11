import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Название репозитория на GitHub (замени на своё!)
const repoName = '/roadmap-vue/'

// https://vite.dev/config/
export default defineConfig({
  base: repoName, // <- важно для GitHub Pages
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
