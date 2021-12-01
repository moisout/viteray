import serveStatic from 'serve-static';
import fs from 'fs/promises';
import finalhandler from 'finalhandler';
import { IncomingMessage, NextFunction } from 'connect';
import { ServerResponse } from 'http';
import { Configuration } from '../config';

export async function getStaticAssetsMiddleware(configuration: Configuration) {
  try {
    const assetsPath = `${process.cwd()}/assets`;
    await fs.access(assetsPath);
    const serve = serveStatic(assetsPath);
    return (req: IncomingMessage, res: ServerResponse) => {
      req.originalUrl = req.originalUrl.replace(
        configuration.webContextPath,
        ''
      );
      serve(req, res, finalhandler(req, res) as () => void);
    };
  } catch {
    throw new Error("Can't access src/assets folder, or it doesn't exist.");
  }
}
