const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v3', // Prefix for your API requests
    createProxyMiddleware({
      target: 'https://api.sportmonks.com/football/v3',
      changeOrigin: true,
      pathRewrite: {
        '^/v3': '', // Remove the /v3 prefix when forwarding the request
      },
      headers: {
        'X-Auth-Token': '', // Replace with your football-data API key
      },
    })
  );
};
