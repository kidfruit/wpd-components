const BaseUrl = process.env.VUE_APP_DIR;
const StaticBaseUrl = BaseUrl === '/' ? '' : BaseUrl;
const { resolve } = require('path');
const path = require('path');
module.exports = {
    // 修改 src 为 examples
    pages: {
        index: {
            entry: "examples/main.js",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    // publicPath: BaseUrl,
    // outputDir: path.join("dist", BaseUrl),
    // assetsDir: 'assets',
    // productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `$BASE_URL: "${StaticBaseUrl}";`
            }
        }
    },
    chainWebpack: config => {
        // config.plugin('html').tap(args => {
        //     args[0].title = '渲染组件库';
        //     return args;
        // });
        config.resolve.alias
            .set('@', resolve('examples'))
            .set('~', resolve('packages'))
        config.module
            .rule('eslint')
            .exclude.add(path.resolve('lib'))
            .end()
            .exclude.add(path.resolve('examples/docs'))
            .end()
        config.module
            .rule('js')
            .include
            .add('/packages/')
            .end()
            .include.add(/examples/)
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    devServer: {
        host:'localhost',
        port: 9090,
        disableHostCheck: true,

        // 代理
        // proxy: {
        //   "/api": {
        //     target: "http://10.7.8.43:8080", // 要访问的接口域名
        //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        //     pathRewrite: {
        //       "^/api": "wpd-application" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        //     }
        //   }
        // }
    },
    // transpileDependencies: ['vue-echarts', 'resize-detector'],

    // webpack配置
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@': resolve('src') //主目录
    //         }
    //     }
    // },

    transpileDependencies: [
      'vue-echarts',
      'resize-detector'
    ]
};
