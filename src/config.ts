import path from 'path';
import fs from 'fs';

function getConfiguration() {
  const packageJsonDir = path.join(process.cwd(), 'package.json');
  if (packageJsonDir) {
    const packageJsonString = fs.readFileSync(packageJsonDir).toString();
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

    return {
      liferayUrl: 'http://moe.liferay.ch',
      portletFullName: `${name}@${version}`,
      portletName: name,
      entryPoint: entryPoint,
    };
  }
  throw new Error('Package.json not found.');
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
