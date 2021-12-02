import chalk from 'chalk';

export const logo =
  '       _____ _____\n__   _____(_)__  /______ ______________ ______  __\n_ | / /__  / _  __/_  _ \\__  ___/_  __ `/__  / / /\n_ |/ / _  /  / /_  /  __/_  /    / /_/ / _  /_/ /\n____/  /_/   \\__/  \\___/ /_/     \\__╷_/  _\\__╷ /\n                                         /____/';

export const smallLogo = chalk.italic.blue('viteray');

export const chars = {
  topLeft: '╭',
  topRight: '╮',
  bottomLeft: '╰',
  bottomRight: '╯',
  horizontalWall: '─',
  verticalWall: '│',
  separatorLeft: '├',
  separatorRight: '┤',
};

export const infoStr = chalk.black.bgBlue(' INFO ');
export const warnStr = chalk.black.bgYellow(' WARN ');
export const errorStr = chalk.black.bgRed(' ERROR ');
