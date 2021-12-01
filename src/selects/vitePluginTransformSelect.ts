import { Select } from 'harmon';
import { HtmlTagDescriptor, Plugin } from 'vite';

export const getVitePluginTransformSelect = (
  vitePlugins: readonly Plugin[]
): Select => ({
  query: 'head',
  func: (node) => {
    const out = getViteIndexHtmlTransformString(vitePlugins);

    const readStream = node.createReadStream();
    const writeStream = node.createWriteStream({ outer: false });

    readStream.pipe(writeStream, { end: false });

    readStream.on('end', function () {
      writeStream.end(out);
    });
  },
});

function getViteIndexHtmlTransformString(
  vitePlugins: readonly Plugin[]
): string {
  let viteIndexHtmlTransformString = '';
  const viteIndexHtmlTransforms = getViteIndexHtmlTransforms(vitePlugins);
  viteIndexHtmlTransforms.forEach((transform) => {
    viteIndexHtmlTransformString += transform;
  });
  return viteIndexHtmlTransformString;
}

function getViteIndexHtmlTransforms(
  vitePlugins: readonly Plugin[]
): Array<string> {
  const indexHtmlTransformerPlugins = vitePlugins.filter(
    (plugin) => plugin.transformIndexHtml
  );
  return indexHtmlTransformerPlugins.map((plugin) => {
    const transformIndexHtmlFn = plugin.transformIndexHtml as Function;

    if (transformIndexHtmlFn.length > 0) {
      vitePluginWarn(
        "viteray doesn't support dynamic html transforms yet.",
        plugin.name
      );
    } else {
      try {
        const transformArray = transformIndexHtmlFn();

        if (Array.isArray(transformArray)) {
          let htmlInjectionString = '';

          transformArray.forEach((transform) => {
            htmlInjectionString += constructHtmlInjection(transform);
          });

          return htmlInjectionString;
        } else {
          vitePluginWarn(
            'viteray only supports transformIndexHtml functions returning an array.',
            plugin.name
          );
        }
      } catch {
        vitePluginWarn(
          'Could not extract transformIndexHtml function.',
          plugin.name
        );
      }
    }
  });
}

function constructHtmlInjection(tag: HtmlTagDescriptor): string {
  let child = '';

  if (typeof tag.children === 'string') {
    child = tag.children;
  } else {
    tag.children.forEach((tagChild) => {
      child += constructHtmlInjection(tagChild);
    });
  }

  let attributeString = '';

  for (const key in tag.attrs) {
    attributeString += `${key}="${tag.attrs[key]}" `;
  }

  return `<${tag.tag} ${attributeString}>${child}</${tag.tag}>`;
}

function vitePluginWarn(msg: string, name: string) {
  console.warn(
    `${msg} Plugin ${name} might not work as expected. See https://vitejs.dev/guide/api-plugin.html#transformindexhtml.`
  );
}
