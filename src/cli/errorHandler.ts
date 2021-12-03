import { logError } from './logger';

export function handleAndLogErrors(fn: () => void) {
  process.on('uncaughtException', (error, origin) => {
    logError(error, origin);

    process.exit(1);
  });
  fn();
}
