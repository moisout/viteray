import { createServer } from 'vite';

export function createViteServer() {
  return createServer({
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });
}
