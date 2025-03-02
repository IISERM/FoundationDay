import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  base: "/web/foundationday/",
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
