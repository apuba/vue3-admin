/*
 * @Author: 侯兴章
 * @Date: 2020-11-05 00:44:21
 * @LastEditTime: 2020-11-10 02:09:15
 * @LastEditors: 侯兴章
 * @Description: 
 */


import { hotUnregisterModule } from '../helper';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store/index';
import router from '@/router';
import type { TabItem } from './appTypes.d';
import type { Menu, AppRouteRecordRaw } from '@/router/types.d';
import { PageEnum } from '@/common/enums/PageEnum';
import _ from 'lodash';


const NAME = 'app';
hotUnregisterModule(NAME);

 
const menuList: Menu[] = [
  {
    id: '1',
    name: '基础设施',
    icon: 'iconfont icon-shengchanjiagong',
    path: '',
    children: [
      {
        id: '11',
        name: '人员管理',
        icon: '',
        path: '/base'
      },
      {
        id: '12',
        name: '角色管理',
        icon: '',
        path: '/role'
      }
    ]
  },
  {
    id: '2',
    name: '安全生产',
    icon: 'iconfont icon-shengchan',
    path: '',
    children: [
      {
        id: '21',
        name: '关于我们',
        icon: '',
        path: '/about',
        children: [
          {
            id: '211',
            name: '第三级',
            icon: '',
            path: '/f3'
          }]
      },
      {
        id: '22',
        name: '无职可右一',
        icon: '',
        path: '/fdxd'
      },
      {
        id: '23',
        name: 'sdg agds ',
        icon: '',
        path: '/gddsde'
      }
    ]
  },
  {
    id: '3',
    name: '没有下级',
    icon: 'iconfont icon-shengchan',
    path: '/role'
  },
]

// dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(App,store)
// namespaced: true, name: 'passenger' 命名空间
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class App extends VuexModule {
  private title: string = '工业4。0 智能智造';
  private layout: string = 'default';
  private menuData: Menu[] = menuList; // 存储菜单路由数据
  private tabList: TabItem[] = []; // 页面tab功能数据
  private tabActiveKey: number | string = -1; // 当前激活tab页面
  private keepList = []; // 需要缓存的页面name

  get getTabActiveKey() {
    return this.tabActiveKey;
  }
  get getTitleState() {
    return this.title
  }

  /* 获取tab */
  get getTabList() {
    return this.tabList;
  }

  get getMenuData() {
    return this.menuData;
  }

  @Mutation
  commitChangeTabActive(index: string | number): void {
    this.tabActiveKey = index;
  }

  @Mutation
  commitTitleState(val: string): void {
    this.title = val;
  }

  @Mutation
  commitAddTab(route: TabItem ): void {
    
    router.push(route.path)

    const { path, name, meta, id } = route;
    // 404  页面不需要添加tab
    if (path === PageEnum.ERROR_PAGE) {
      return;
    }
 
    /* else if ([REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)) {
      return;
    } */

    // 已经存在的页面，不重复添加tab
    const hasTab = this.tabList.some((tab) => {
      return tab.path === path;
    });
    if (hasTab) {
      const tabIndex = _.findIndex(this.tabList, (obj:TabItem | Menu) => obj.id === id); 
      this.tabActiveKey =tabIndex // 当前tab的索引
      return
    };

    this.tabActiveKey = this.tabList.length // 添加tab的索引
    this.tabList.push(route);
 
    /* if (unref(getOpenKeepAliveRef) && name) {
      const noKeepAlive = meta && meta.ignoreKeepAlive;
      const hasName = this.keepAliveTabsState.includes(name);
      !noKeepAlive && !hasName && this.keepAliveTabsState.push(name);
    } */
  }

}

export { App };
export const appStore = getModule<App>(App);
