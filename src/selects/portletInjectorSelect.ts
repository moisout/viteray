import { configuration } from '../config';
import { Select } from 'harmon';

export const portletInjectorSelect: Select = {
  query: `.portlet-boundary_${configuration.portletName.replaceAll('-', '')}_>.portlet-body>div`,
  func: (node) => {
    const out = `<script type='text/javascript'>(function () {
      const oldFunction = Liferay.Loader.require;         
      Liferay.Loader.require = function (...args) {
        const moduleLogger = (...args) => {
          const variables = args[0];
          const entrypointPath = '${configuration.entryPoint}';
          const scriptElement = document.createElement('script');
          scriptElement.type = 'module';
          scriptElement.innerText = \`import main from '\${entrypointPath}'; main(\${JSON.stringify(variables)});\`;
          document.querySelector('#' + variables.portletElementId).appendChild(scriptElement);
        }
        if(args[0] === '${configuration.portletFullName}') {
          args[1](moduleLogger);
          Liferay.Loader.require = oldFunction;
        }
        return oldFunction(...args);
    }})();</script>`;

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
};
