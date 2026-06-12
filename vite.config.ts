import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';

const manifestPath = path.resolve(__dirname, 'src/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

export default defineConfig({
  plugins: [react(), crx({ manifest })]
});
