// pages/api/[...api].js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
  target: 'https://localhost:7183',
  changeOrigin: true,
  secure: false,
  logLevel: 'debug', // to see any issues in the console
});
