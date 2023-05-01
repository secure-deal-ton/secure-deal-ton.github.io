import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ssr } from 'vite-plugin-ssr/plugin';

export default defineConfig({
    root: 'web',
    plugins: [react(), ssr({ prerender: true })],
    build: { outDir: path.resolve(__dirname, 'dist'), emptyOutDir: true },
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
    },
});
