import httpProxy from 'http-proxy';
import http from 'http';
import harmon from 'harmon';
import connect from 'connect';
import vite from 'vite';

async function bootstrap() {
  const app = connect();

  const config = {
    liferayUrl: 'http://moe.liferay.ch',
    portletName: 'wikipedia2',
    entryPoint: '/src/index.tsx',
  };

  const proxy = httpProxy.createProxyServer({
    target: config.liferayUrl,
  });

  const viteApp = await vite.createServer({
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });

  app.use(viteApp.middlewares);

  const selects = [
    {
      query: `.portlet-boundary_${config.portletName}_>.portlet-body>div`,
      func: (node) => {
        const out = `<script type='text/javascript'>
          (function () {
            const oldFunction = Liferay.Loader.require;         
            Liferay.Loader.require = function (...args) {
             
              const moduleLogger = (...args) => {
                const variables = args[0];
                console.log(variables);
                window['${config.portletName}'] = variables;
                const scriptElement = document.createElement('script');
                scriptElement.type = 'module';
                scriptElement.src = '${config.entryPoint}';
                document.querySelector('#' + variables.portletElementId).appendChild(scriptElement);
              }
              
              if(args[0] === '${config.portletName}@1.0.0') {
                args[1](moduleLogger);
                Liferay.Loader.require = oldFunction;
              }
              return oldFunction(...args);
            }
          })();
        </script>`;

        const readStream = node.createReadStream();
        const writeStream = node.createWriteStream({ outer: false });

        // Read the node and put it back into our write stream,
        // but don't end the write stream when the readStream is closed.
        readStream.pipe(writeStream, { end: false });

        // When the read stream has ended, attach our style to the end
        readStream.on('end', function () {
          writeStream.end(out);
        });
      },
    },
    {
      query: 'head',
      func: (node) => {
        const out = `<script type="module">
          import RefreshRuntime from "/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>`;

        const readStream = node.createReadStream();
        const writeStream = node.createWriteStream({ outer: false });

        readStream.pipe(writeStream, { end: false });

        readStream.on('end', function () {
          writeStream.end(out);
        });
      },
    },
  ];

  app.use(harmon([], selects));

  app.use((req, res) => {
    proxy.web(req, res);
  });

  http.createServer(app).listen(9001);
}

bootstrap();
