/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 01:37:20
 * @LastEditTime: 2020-10-24 15:02:07
 * @LastEditors: 侯兴章
 * @Description: 
 */
import type { App } from 'vue';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

import router from './index';
import storage from '@/common/storage';
import { ROUTER_WIHITELIST } from '@/config'

NProgress.configure({ showSpinner: false });
router.beforeEach(async(to, from, next) => {
    // 开始进度条
    NProgress.start();
    const token = storage().get('token') || storage('localstorage').get('token');

    // 判断是否登录
    if (token) {
        if (ROUTER_WIHITELIST.includes(to.path)) {
            next({ name: 'Layout' });
            NProgress.done();
        } else {
            next();
        }
    } else {
        if (ROUTER_WIHITELIST.includes(to.path)) {
            next();
        } else {
            next({ name: 'Login' });
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    // 完成进度条
    NProgress.done();
});

// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
 
  }

  
export default router;