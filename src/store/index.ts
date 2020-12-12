/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-12-12 15:00:39
 * @LastEditors: 侯兴章
 * @Description: 
 */
import type { App } from 'vue';
import { createStore } from 'vuex'
import { config } from 'vuex-module-decorators';

config.rawError = true;
const store = createStore({
  state: {
    name: 'VUE3.0'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // app: appStore
  }
})



export function setupStore(app: App<Element>) {
  const sessionStore: string = sessionStorage.store; // 还原刷新页面时的状态，
  if (sessionStore) {
    const storeObj = JSON.parse(sessionStore);
    storeObj.appStore.isLoadMenu = false; // 页面刷新后需要是否已加载菜单路由标记改为false；让路由重新加载
    store.replaceState(Object.assign({}, store.state, storeObj));
  }
  app.use(store);
}
export default store;
