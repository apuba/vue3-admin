/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-11-19 23:57:55
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router/intercept'
import { setupStore } from './store'
import Antd from 'ant-design-vue';
// import moment from 'moment';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.less';
import './layout/default/antd.less';
import '@fonts/iconfont.css';

const app = createApp(App);
app.use(Antd);
// router
setupRouter(app);
// store
setupStore(app);

router.isReady().then(() => {
    app.mount('#app');
});

window.__app__= app;

export default app;
