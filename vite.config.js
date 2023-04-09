import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '~', replacement: path.resolve(__dirname, 'public') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/layouts')
      },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@helpers', replacement: path.resolve(__dirname, 'src/helpers') },
      { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services')
      },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@slices', replacement: path.resolve(__dirname, 'src/slices') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') }
    ]
  },
  publicDir: './src/assets'
});
