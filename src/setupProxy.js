const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(proxy("/data", {
        target: "http://192.168.100.201", //配置你要请求的服务器地址
        pathRewrite: {'^/data': ''},
        changeOrigin: true,
    }))
    app.use(proxy("/map", {
        target: "http://192.168.100.201:5001",
        pathRewrite: {'^/map': ''},
        changeOrigin: true,
    }))
};