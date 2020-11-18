/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-11-18 21:52:04
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
  app.use(store);
}
export default store;
