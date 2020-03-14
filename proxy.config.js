const proxy = [
    {
        context: '/api',
        secure: false,
        changeOrigin: true,
        target: 'https://reqbin.com/echo/post/json',
        pathRewrite: { '^/api': '' }
    }
];
module.exports = proxy;