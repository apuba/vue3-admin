/*
 * @Author: 侯兴章
 * @Date: 2020-10-31 13:13:18
 * @LastEditTime: 2020-11-03 04:21:09
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { hotUnregisterModule } from '../helper';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store/index';

const NAME = 'app';
hotUnregisterModule(NAME);

// dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(App,store)
// namespaced: true, name: 'passenger' 命名空间
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class App extends VuexModule {
  private title: string = '工业4。0 智能智造';
  private layout: string = 'default';
  private menuData = []; // 存储菜单路由数据
  private tabList = []; // 页面tab功能数据
  private tabActiveKey: string = ''; // 当前激活tab页面
  private keepList = []; // 需要缓存的页面name

  get getTitleState () {
    return this.title
  }

  @Mutation
  commitTitleState(val: string): void {
    this.title = val;
  }
}

export { App };
export const appStore = getModule<App>(App);
