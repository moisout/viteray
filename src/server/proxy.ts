import httpProxy from 'http-proxy';
import { configuration } from '../config';

export function createProxyServer() {
  return httpProxy.createProxyServer({
    target: configuration.liferayUrl,
  });
}
