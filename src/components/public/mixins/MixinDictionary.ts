/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-06 00:52:09
 * @LastEditTime: 2020-12-07 23:50:41
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, onMounted } from 'vue';

export default defineComponent({

    setup() {

        const dataList = [1, 2, 3,];
        const getData = () => {
            console.log('mixins的 getData');
        }
        onMounted(() => {
            getData();
            console.log('mixins的 getData');
        })
        return { dataList, getData }
    }
})