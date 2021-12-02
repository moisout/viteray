import chalk from 'chalk';

class Logger {
  public log(msg: string): void {
    process.stdout.write('\n');
    const msgString = `\n${this.box(chalk.bgBlue.white('i') + msg)}`;
    process.stdout.write(msgString);
  }

  private box(msg: string): string {
    let horizontal = multiplyString(this.chars.horizontalWall, 40);
    let spaces = multiplyString(' ', 40 - msg.length)

    return `${this.chars.topLeft}${horizontal}${this.chars.topRight}
${this.chars.verticalWall} ${msg}${spaces}${this.chars.verticalWall}
${this.chars.bottomLeft}${horizontal}${this.chars.bottomRight}`;
  }

  private chars = {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontalWall: '─',
    verticalWall: '|',
  };
}

function multiplyString(str: string, times: number): string {
  let returnString = '';
  for (let i = 0; i < times; i++) {
    returnString += str;
  }
  return returnString;
}

export const logger = new Logger();
