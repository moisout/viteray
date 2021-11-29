import { configuration } from '../config';
import { Select } from 'harmon';

export const portletInjectorSelect: Select = {
  query: `.portlet-boundary_${configuration.portletName}_>.portlet-body>div`,
  func: (node) => {
    const out = `<script type='text/javascript'>
  (function () {
    const oldFunction = Liferay.Loader.require;         
    Liferay.Loader.require = function (...args) {
      
      const moduleLogger = (...args) => {
        const variables = args[0];
        console.log(variables);
        window['${configuration.portletName}'] = variables;
        const scriptElement = document.createElement('script');
        scriptElement.type = 'module';
        scriptElement.src = '${configuration.entryPoint}';
        document.querySelector('#' + variables.portletElementId).appendChild(scriptElement);
      }
      
      if(args[0] === '${configuration.portletName}@1.0.0') {
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
};
