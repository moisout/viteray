import chalk from 'chalk';

class Logger {
  public log(msg: string): void {
    process.stdout.write('\n');
    const msgString = `\n${this.box(chalk.bgBlue.white('i') + msg)}`;
    process.stdout.write(msgString);
  }

  private box(msg: string): string {
    let horizontal = '';

    for (let i = 0; i++; i < 20) {
      horizontal += this.chars.horizontalWall;
    }

    return `${this.chars.topLeft}${horizontal}${this.chars.topRight}
${this.chars.verticalWall} ${msg} ${this.chars.verticalWall}
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

export const logger = new Logger();
