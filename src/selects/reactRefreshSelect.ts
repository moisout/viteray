import { Select } from 'harmon';

export const reactRefreshSelect: Select = {
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
};
