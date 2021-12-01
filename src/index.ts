#!/usr/bin/env node

import http from 'http';
import harmon, { Select } from 'harmon';
import connect from 'connect';
import serveStatic from 'serve-static';
import { createProxyServer } from './server/proxy';
import { createViteServer } from './server/vite';
import { portletInjectorSelect } from './selects/portletInjectorSelect';
import yargs from 'yargs';
import { getVitePluginTransformSelect } from './selects/vitePluginTransformSelect';
import { configuration } from './config';
import { getStaticAssetsMiddleware } from './middlewares/staticFileMiddleware';

const parser = yargs(process.argv.slice(2)).options({
  u: { type: 'string', alias: 'url', demandOption: true },
  p: { type: 'number', alias: 'port' },
});

(async () => {
  const argv = await parser.argv;
  // Create servers
  const connectServer = connect();
  const proxyServer = createProxyServer(argv.u);
  const viteServer = await createViteServer();

  const vitePluginInjectionSelect = getVitePluginTransformSelect(
    viteServer.config.plugins
  );

  // Register selects
  const selects: Select[] = [portletInjectorSelect, vitePluginInjectionSelect];

  const staticAssetsMiddleware = await getStaticAssetsMiddleware();

  // Register middlewares
  connectServer.use(viteServer.middlewares);
  connectServer.use(harmon([], selects, true));
  connectServer.use(configuration.webContextPath, staticAssetsMiddleware);
  connectServer.use((req, res) => proxyServer.web(req, res));

  let port = argv.p ? argv.p : 9001;

  // Create endpoint
  http.createServer(connectServer).listen(port);
  console.log(`Server running on http://localhost:${port}/`);
})();
