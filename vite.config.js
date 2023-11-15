import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports:['vue','vue-router'],
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port:8889,
    proxy: {
      '/api': {
        target: 'http://118.190.199.233:8080', // 指定要代理的目标地址
        changeOrigin: true, // 是否改变请求的来源
        // rewrite: (path) => path.replace(/^\/api/, '/api') // 可选的路径重写规则
      }
    }
  }
});
