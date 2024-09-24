import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',  // Убедитесь, что файлы идут в папку dist
    emptyOutDir: true,  // Это очищает dist перед сборкой
  },
});
