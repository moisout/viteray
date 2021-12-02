import chalk from 'chalk';
import { chars, errorStr, infoStr, logo, smallLogo } from './constants';

const consoleWidth = () => {
  const maxWidth = 100;
  if (process.stdout.columns < maxWidth - 2) {
    return process.stdout.columns - 2;
  }
  return maxWidth;
};

const stringLength = (str: string) =>
  str.replaceAll(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  ).length;

const bar = (left: string, right: string) =>
  `${left}${chars.horizontalWall.repeat(consoleWidth())}${right}`;

const topBarWithLogo = `${chars.topLeft}${chars.horizontalWall.repeat(
  consoleWidth() - stringLength(smallLogo) - 3
)} ${smallLogo} ${chars.horizontalWall.repeat(1)}${chars.topRight}`;

const topBar = bar(chars.topLeft, chars.topRight);
const separator = bar(chars.separatorLeft, chars.separatorRight);
const bottomBar = bar(chars.bottomLeft, chars.bottomRight);

function multilineWithWalls(msg: string) {
  let returnString = '';
  msg.split('\n').forEach((msgLine) => {
    const spaces = ' '.repeat(consoleWidth() - stringLength(msgLine) - 1);
    returnString += `${chars.verticalWall} ${msgLine}${spaces}${chars.verticalWall}\n`;
  });
  return returnString.slice(0, -1);
}

function titleWithSeparator(title?: string) {
  return title ? `\n${multilineWithWalls(title)}\n${separator}` : '';
}

export const logWithModuleLogo = (msg: string) =>
  logInfo(msg, chalk.blue(logo), true);

export const logInfo = (msg: string, title: string, noLogo?: boolean) =>
  log(`${infoStr} ${msg}`, title, noLogo);

export const logError = (
  error: Error,
  origin?: NodeJS.UncaughtExceptionOrigin
) =>
  log(
    `${chalk.red(error.message)}\n${error.stack}`,
    `${errorStr} ${error.name}${origin ? `: ${origin}` : ''}`
  );

export function log(msg: string, title?: string, noLogo = false): void {
  process.stdout.write(`\n${box(msg, title, noLogo)}`);
}

export function box(msg: string, title?: string, noLogo?: boolean): string {
  return `${noLogo ? topBar : topBarWithLogo}${titleWithSeparator(title)}
${multilineWithWalls(msg)}
${bottomBar}\n`;
}
