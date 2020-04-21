const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    // delete /dist/js/*.map，开发环境下的代码调试好以后再配置该项
    productionSourceMap: false,
    // 开发环境下自动打开浏览器
    devServer: {
        open: true
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
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
