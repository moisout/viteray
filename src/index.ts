#!/usr/bin/env node

import http from 'http';
import harmon, { Select } from 'harmon';
import connect from 'connect';
import { createProxyServer } from './server/proxy';
import { createViteServer } from './server/vite';
import { portletInjectorSelect } from './selects/portletInjectorSelect';
import { reactRefreshSelect } from './selects/reactRefreshSelect';
import yargs from 'yargs';

yargs(process.argv.slice(2))
  .scriptName('liferay-vite-dev')
  .usage('$0 <cmd> [args]')
  .command(
    '[url]',
    'Runs the development server',
    (yargs) => {
      yargs.positional('url', {
        type: 'string',
        describe: 'The url of your liferay instance',
      });
    },
    async (argv) => {
      // Create servers
      const connectServer = connect();
      const proxyServer = createProxyServer(argv.url as string);
      const viteServer = await createViteServer();

      // Register selects
      const selects: Select[] = [portletInjectorSelect, reactRefreshSelect];

      // Register middlewares
      connectServer.use(viteServer.middlewares);
      connectServer.use(harmon([], selects));
      connectServer.use((req, res) => proxyServer.web(req, res));

      // Create endpoint
      http.createServer(connectServer).listen(9001);
      console.log('Server running on http://localhost:9001/');
    }
  )
  .help()
  .parse();
