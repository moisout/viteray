#!/usr/bin/env node

import http from 'http';
import harmon, { Select } from 'harmon';
import connect from 'connect';
import { createProxyServer } from './server/proxy';
import { createViteServer } from './server/vite';
import { portletInjectorSelect } from './selects/portletInjectorSelect';
import { reactRefreshSelect } from './selects/reactRefreshSelect';

(async () => {
  // Create servers
  const connectServer = connect();
  const proxyServer = createProxyServer();
  const viteServer = await createViteServer();

  // Register selects
  const selects: Select[] = [portletInjectorSelect, reactRefreshSelect];

  // Register middlewares
  connectServer.use(viteServer.middlewares);
  connectServer.use(harmon([], selects));
  connectServer.use((req, res) => proxyServer.web(req, res));

  // Create endpoint
  http.createServer(connectServer).listen(9001);
  console.log('Server running aon http://localhost:9001/');
})();
