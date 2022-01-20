#!/usr/bin/env node

import http from 'http';
import harmon, { Select } from 'harmon';
import connect from 'connect';
import { createProxyServer } from './server/proxy';
import { createViteServer } from './server/vite';
import { getPortletInjectorSelect } from './selects/portletInjectorSelect';
import yargs from 'yargs';
import { getVitePluginTransformSelect } from './selects/vitePluginTransformSelect';
import { getConfiguration } from './config';
import { getStaticAssetsMiddleware } from './middlewares/staticFileMiddleware';
import { logWithModuleLogo } from './cli/logger';
import { handleAndLogErrors } from './cli/errorHandler';
import { injectPolyfills } from './cli/polyfill';

const parser = yargs(process.argv.slice(2)).options({
  u: { type: 'string', alias: 'url', demandOption: true },
  p: { type: 'number', alias: 'port' },
  e: { type: 'string', alias: 'entrypoint' },
});

handleAndLogErrors(async () => {
  injectPolyfills();
  const argv = await parser.argv;

  const configuration = getConfiguration(argv.e);

  // Create servers
  const connectServer = connect();
  const proxyServer = createProxyServer(argv.u);
  const viteServer = await createViteServer();

  const vitePluginInjectionSelect = getVitePluginTransformSelect(
    viteServer.config.plugins
  );

  const portletInjectorSelect = getPortletInjectorSelect(configuration);

  // Register selects
  const selects: Select[] = [portletInjectorSelect, vitePluginInjectionSelect];

  const staticAssetsMiddleware = await getStaticAssetsMiddleware(configuration);

  // Register middlewares
  connectServer.use(viteServer.middlewares);
  connectServer.use(harmon([], selects, true));
  connectServer.use(configuration.webContextPath, staticAssetsMiddleware);
  connectServer.use((req, res) => proxyServer.web(req, res));

  let port = argv.p ? argv.p : 9001;

  // Create endpoint
  http.createServer(connectServer).listen(port);
  logWithModuleLogo(`Server running on http://localhost:${port}/`);
});
