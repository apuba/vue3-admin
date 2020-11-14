/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:04:10
 * @LastEditTime: 2020-11-12 21:06:16
 * @LastEditors: 侯兴章
 * @Description: 
 */
 
import defaultLogin from './default/Login.vue';
import blueLogin from './blue/Login.vue';

const getLoginLayout = (layout: string,) => {

    switch (layout) {
        case 'blue':
            return blueLogin;
        default:
            return defaultLogin;
    }
}

export { defaultLogin, blueLogin }
export default getLoginLayout