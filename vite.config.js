import { fileURLToPath, URL } from 'node:url'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/')
      },
      // '/profiles/oauth/token': {
      //   target: 'https://gymkhana.iitb.ac.in',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/profiles\/oauth\/token/, '/profiles/oauth/token')
      // },
    },
  },
  plugins: [vue(), svgLoader({
    svgoConfig: {
      multipass: true
    }
  }), mkcert()],
  resolve: { 
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
