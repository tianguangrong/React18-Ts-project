// const { createProxyMiddleware } = require('http-proxy-middleware');
import { createProxyMiddleware } from 'http-proxy-middleware';
//https://www.demo.com
module.exports = function(app) {
  // 代理API请求到后端服务器
  app.use(
    '/api',  // 匹配以/api开头的请求
    createProxyMiddleware({
      target: 'https://www.demo.com',  // 后端API地址
      changeOrigin: true,  // 解决跨域问题
      pathRewrite: {
        '^/api': ''  // 可选：去掉请求路径中的/api前缀
      }
    })
  );
};