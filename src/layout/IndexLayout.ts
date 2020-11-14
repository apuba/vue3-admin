/*
 * @Author: 侯兴章
 * @Date: 2020-11-01 15:59:00
 * @LastEditTime: 2020-11-01 16:07:12
 * @LastEditors: 侯兴章
 * @Description: 
 */
import defalutLayout from './default/Index.vue';
import blueLayout from './blue/Index.vue';

const getIndexLayout = (layout: string,) => {

    switch (layout) {
        case 'blue':
            return blueLayout;
        default:
            return defalutLayout;
    }
}

export { defalutLayout, blueLayout }
export default getIndexLayout