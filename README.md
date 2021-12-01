<h1 align='center'>
<sub>
  <img src="assets/logo.svg" height="50" width="50" />
</sub>
liferay-vite-dev
</h1>
<p align='center'>
  <img alt="npm" src="https://img.shields.io/npm/v/liferay-vite-dev?style=for-the-badge">
  <img alt="GitHub" src="https://img.shields.io/github/license/mauriceoegerli/liferay-vite-dev?style=for-the-badge">
</p>

Zero-config module to use vite for liferay portlet development.

Highlights:

- Creates a local proxy for your liferay instance
- No configuration for this module required
- Supports (almost) all vite plugins
- Supports portlet assets folder

## How-to

1. Install liferay-vite-dev

```shell
npm i -D liferay-vite-dev

pnpm i -D liferay-vite-dev

yarn add -D liferay-vite-dev
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
    "dev": "liferay-vite-dev -c http://example.com"
  }
}
```

4. Run!
```shell
npm run dev

pnpm run dev

yarn dev
```
