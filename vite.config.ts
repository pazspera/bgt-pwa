import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { copyFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'vite.svg'],
      manifest: {
        name: 'BGT PWA',
        short_name: 'BGT',
        description: 'Board games tracker migrated to Vite PWA',
        theme_color: '#9A67BD',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      }
    }),
    {
      name: "copy-version",
      closeBundle() { 
        // Copia VERSION al dist/ para que Nginx lo sirva 
        copyFileSync("VERSION", "dist/VERSION"); 
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // permite probar en mobile
  },
  test: {
    globals: true,
    environment: "jsdom",
    alias: [
      {
        find: 'vuetify/styles',
        replacement: path.resolve(__dirname, '__mocks__/styleMock.js'),
      }
    ],
    setupFiles: ['./src/tests/setup.ts', './src/tests/utils/createRouterMock.ts'],
    poolOptions: {
      threads: {
        singleThread: true,
      }
    },
    server: {
      deps: {
        inline: ["vuetify"]
      }
    },
  }
})
