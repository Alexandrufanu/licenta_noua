const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    //"/weatherforecast",
    "/api/**" // matches any path that starts with "/api/"

];

module.exports = function (app) {

    // proxy for C# backend 
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7080',
        secure: false
    });

    app.use(appProxy);

};


module.exports = function (app) {

    // proxy for node backend 
    const nodeProxy = createProxyMiddleware(context, {
        target: 'http://localhost:3000',
        secure: false
    });

    app.use(nodeProxy);



};



