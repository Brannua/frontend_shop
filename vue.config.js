const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    /* 开发环境下的代码调试好以后再配置该项 */
    productionSourceMap: false, // delete /dist/js/*.map
    /* 开发环境下自动打开浏览器 */
    devServer: {
        open: true
    },
    configureWebpack: () => {
        /* 判断是否为生产环境 */
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css$/,
                        threshold: 10240,
                        deleteOriginalAssets: true
                    })
                ]
            }
        }
    }
}