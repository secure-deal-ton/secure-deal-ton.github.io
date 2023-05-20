import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ssr } from 'vite-plugin-ssr/plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    root: 'web',
    envDir: '../',
    plugins: [
        react(),
        ssr({ prerender: true }),
        nodePolyfills({
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    build: { outDir: path.resolve(__dirname, 'dist'), emptyOutDir: true },
    ssr: { noExternal: ['@tonconnect/ui', '@tonconnect/ui-react', '@reduxjs/toolkit', 'redux-persist'] },
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
    },
});
