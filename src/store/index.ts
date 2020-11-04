/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-11-03 04:22:00
 * @LastEditors: 侯兴章
 * @Description: 
 */
import type { App } from 'vue';
import { createStore } from 'vuex'
import { config } from 'vuex-module-decorators';
config.rawError = true;
const store = createStore({
  state: {
    name: 'MES SYSTEM'
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
  app.use(store);
}
export default store;
