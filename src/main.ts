/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-12-12 14:56:33
 * @LastEditors: 侯兴章
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router/intercept'
import { setupStore } from './store'

// import CompPopup from '@/components/public/compPopup'; // 全局注册弹窗组件

import Antd from 'ant-design-vue';
// import moment from 'moment';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.less';
import './layout/default/antd.less';
import '@fonts/iconfont.css';

import { setupComp } from '@/components/public';

const app = createApp(App);
app.use(Antd);

// store
setupStore(app);

// router
setupRouter(app);

// 注册全局组件
setupComp(app);

router.isReady().then(() => {
    app.mount('#app');
});

window.__app__= app;

export default app;
