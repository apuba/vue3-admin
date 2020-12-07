/*
 * @Author: 侯兴章
 * @Date: 2020-11-05 00:44:21
 * @LastEditTime: 2020-11-30 01:25:15
 * @LastEditors: 侯兴章
 * @Description: 
 */

import store from '@/store/index';
import { hotUnregisterModule } from '@/store/helper';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { IModelDictType } from '../server/model';


const NAME = 'jobStore';
hotUnregisterModule(NAME);

// dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(App,store)
// namespaced: true, name: 'passenger' 命名空间
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class App extends VuexModule {

  private modelDictForm: IModelDictType = {
    jobName: '',
    jobType: '',
    description: ''
  }

  get getModelDictForm() {
    return this.modelDictForm;
  }

  @Mutation
  commitDictFormModel(val: IModelDictType): void {
    this.modelDictForm = val;
  }
 
/*   @Action
  async getMenuAction(): Promise<Menu[]> {
    let menuList: Menu[] = []
    const menuData = await ServiceGetMenus();
    menuList = mappingMenu(menuData); // 数据清洗映射
    this.commitCreateMenu(menuList);
    return menuList
  } */



}

export { App };
export const appStore = getModule<App>(App);