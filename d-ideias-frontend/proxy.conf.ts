declare const process: {
  env: Record<string, string | undefined>;
};

const rawProxyTarget: string =
  process.env.NG_PROXY_TARGET ??
  process.env.NG_APP_API_URL ??
  process.env.BACKEND_URL ??
  'http://localhost:3000';

const proxyTarget: string =
  rawProxyTarget.startsWith('http://') || rawProxyTarget.startsWith('https://')
    ? rawProxyTarget
    : rawProxyTarget.startsWith('/')
      ? 'http://localhost:3000'
      : `http://${rawProxyTarget}`;

export default {
  "/api": {
    "target": proxyTarget,
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
