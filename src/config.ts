import path from 'path';
import fs from 'fs';

function getConfiguration() {
  const packageJsonDir = path.join(process.cwd(), 'package.json');
  const npmBundlerrcDir = path.join(process.cwd(), '.npmbundlerrc');

  let config = {
    portletFullName: '',
    portletName: '',
    entryPoint: '',
    webContext: '',
    webContextPath: '',
  };

  const npmBundlerrcString = fs.readFileSync(npmBundlerrcDir)?.toString();

  if (npmBundlerrcString) {
    const npmBundlerrc = JSON.parse(npmBundlerrcString);

    let webContext =
      npmBundlerrc?.['create-jar']?.['features']?.['web-context'];

    if (webContext) {
      if (webContext.startsWith('/')) {
        webContext = webContext.slice(1);
      }
      config.webContext = webContext;
      config.webContextPath = `/o/${webContext}`;
    } else {
      throw new Error(
        'Field "create-jar.features.web-context" in .npmbundlerrc missing.'
      );
    }
  }

  const packageJsonString = fs.readFileSync(packageJsonDir)?.toString();
  if (packageJsonString) {
    const packageJson = JSON.parse(packageJsonString);

    const version = getPackageJsonField(packageJson, 'version');
    let name = getPackageJsonField(
      packageJson,
      'portlet',
      'javax.portlet.name'
    );
    let entryPoint = getPackageJsonField(packageJson, 'main');

    if (!entryPoint.startsWith('/')) {
      entryPoint = `/${entryPoint}`;
    }

    if (!entryPoint.startsWith('/src')) {
      entryPoint = `/src${entryPoint}`;
    }

    config = {
      ...config,
      portletFullName: `${name}@${version}`,
      portletName: name,
      entryPoint: entryPoint,
    };
  } else {
    throw new Error('No package.json found.');
  }

  return config;
}

function getPackageJsonField(
  json: any,
  field: string,
  subfield?: string
): string {
  if (json?.[field]) {
    if (subfield) {
      const subfieldValue = json?.[field]?.[subfield];
      if (subfieldValue) {
        return subfieldValue;
      }
      throw new Error(`Field "${field}.${subfield}" in package.json missing.`);
    }
    return json?.[field];
  }
  throw new Error(`Field "${field}" in package.json missing.`);
}

export const configuration = getConfiguration();
