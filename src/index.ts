import http from 'http';
import harmon, { Select } from 'harmon';
import connect from 'connect';
import vite from 'vite';
import { configuration } from './config';
import { createProxyServer } from './server/proxy';
import { createViteServer } from './server/vite';
import { portletInjectorSelect } from './selects/portletInjectorSelect';

async function bootstrap() {
  // Create servers
  const connectServer = connect();
  const proxyServer = createProxyServer();
  const viteServer = await createViteServer();

  const selects: Select[] = [portletInjectorSelect];

  // Register middlewares
  connectServer.use(viteServer.middlewares);
  connectServer.use(harmon([], selects));
  connectServer.use((req, res) => proxyServer.web(req, res));

  // Create endpoint
  http.createServer(connectServer).listen(9001);
}

bootstrap();
