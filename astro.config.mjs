// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import node from '@astrojs/node'
import tailwindcss from '@tailwindcss/vite';
import { LUCIDE_ICONS } from './src/data/icons';

// https://astro.build/config
export default defineConfig({
  // Production URL — used for canonical links + absolute OG/Twitter image URLs.
  // Update to the real deployed domain before going live.
  site: 'https://opc.chaihuo.org',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    icon({
      include: {
        // 单一事实源在 src/data/icons.ts —— 新增图标改那里一处即可
        lucide: [...LUCIDE_ICONS]
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false
    }
  },
  server: {
    port: 3001,
    host: true
  }
});
