/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 01:19:23
 * @LastEditTime: 2021-03-25 12:40:58
 * @LastEditors: 侯兴章
 * @Description: 配置
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_MOCK = process.env.PROXY ? process.env.PROXY.trim() === 'mock' : false;

let proxyTarget = 'http://106.75.217.29/api'; // 最新服务地址
// let proxyTarget = 'http://106.75.217.29:9091/api';
// let proxyTarget = 'http://192.168.1.195:9091/api';

if (IS_MOCK) proxyTarget = 'http://localhost:4000'; // 使用mockSer

// 代理配置
const createProxy = () => {
  const enablePro = process.env.ENABLE_PROXY;
  if (enablePro === 'yes') {
    return {
      '/api': {
        target: proxyTarget,
        secure: false,
        changeOrigin: false, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': ''
        }
      }
    };
  } else {
    return {};
  }
};

module.exports = {
  // publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  publicPath: './',
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'public', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      // .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@common', resolve('src/common'))
      .set('@assets', resolve('src/assets'))
      .set('@fonts', resolve('src/fonts'))
      .set('@components', resolve('src/components'))
      .set('@plugins', resolve('src/plugins'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@layouts', resolve('src/layouts'))
      .set('@static', resolve('src/static'))
      .set('@scss', resolve('src/scss'))
      .set('@public', resolve('public'))
      .set('@layout', resolve('src/layout'));
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import '@scss/var.scss';
        @import '@scss/mixin.scss';
        $src: '${process.env.VUE_APP_PUBLIC_PATH}';
        `
      },
      less: {
        lessOptions: {
          modifyVars: {
            // 'primary-color': '#ff9900'
            // 'link-color': '#1DA57A',
            // 'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {

    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    // host: 'localhost',
    port: '8088', // 代理端口
    https: false,
    hotOnly: true, // 热更新
    open: true, // 是否打开浏览器
    proxy: createProxy()
  }
};
