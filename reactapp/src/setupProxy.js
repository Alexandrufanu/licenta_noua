const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    //"/weatherforecast",
    "/api/**" // matches any path that starts with "/api/"

];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7080',
        secure: false
    });

    app.use(appProxy);
};
