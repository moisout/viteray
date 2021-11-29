import httpProxy from 'http-proxy';
import { configuration } from '../config';

export function createProxyServer(url: string) {
  return httpProxy.createProxyServer({
    target: url,
  });
}
