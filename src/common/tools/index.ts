/*
 * @Author: 侯兴章
 * @Date: 2020-11-06 01:47:46
 * @LastEditTime: 2020-11-06 02:50:04
 * @LastEditors: 侯兴章
 * @Description: 
 */


/**
 *  创建代理选项
  */
export const createProxy = (config: any) => {

    return {
        // VUE_APP_ENABLE_PROXY
        // overlay: { // 让浏览器 overlay 同时显示警告和错误
        //   warnings: true,
        //   errors: true
        // },
        // host: 'localhost',
        // port: '8080', // 代理端口
        // https: false,
        hotOnly: true, // 热更新
        open: true, // 是否打开浏览器
        proxy: {
            '/api': {
                target:
                    'http://localhost:4000',
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }

}