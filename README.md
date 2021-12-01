<h1 align='center'>
<sub>
  <img src="assets/logo.svg" height="50" width="50" />
</sub>
viteray
</h1>
<p align='center'>
  <img alt="npm" src="https://img.shields.io/npm/v/@clavis/viteray?style=for-the-badge">
  <img alt="GitHub" src="https://img.shields.io/github/license/mauriceoegerli/viteray?style=for-the-badge">
</p>

Zero-config module to use vite for liferay portlet development.

Highlights:

- Creates a local proxy for your liferay instance
- No configuration for this module required
- Supports (almost) all vite plugins
- Supports portlet assets folder

## How-to

1. Install viteray

```shell
npm i -D @clavis/viteray

pnpm i -D @clavis/viteray

yarn add -D @clavis/viteray
```

2. Add a vite.config.js file

```javascript
// vite.config.js
export default {
  // config options
};
```

Note on plugin support:  
Pretty much all plugins are supported. However, if a plugin uses the "transformIndexHtml" API, the hot module reload
functionality may be limited.

React example:

```javascript
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
};
```

3. Add a script to your package.json.  
   Specify the url of your instance with the argument "-c".

```json
{
  "scripts": {
    "dev": "viteray -c http://example.com"
  }
}
```

4. Run!
```shell
npm run dev

pnpm run dev

yarn dev
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://wanner.work"><img src="https://avatars.githubusercontent.com/u/38656104?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Wanner</b></sub></a><br /><a href="#ideas-jwanner83" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
