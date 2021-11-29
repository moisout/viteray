import { createServer } from 'vite';

export async function createViteServer() {
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
