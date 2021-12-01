import httpProxy from 'http-proxy';

export function createProxyServer(url: string) {
  return httpProxy.createProxyServer({
    target: url,
  });
}
