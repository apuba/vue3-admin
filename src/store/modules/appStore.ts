/*
 * @Author: 侯兴章
 * @Date: 2020-11-05 00:44:21
 * @LastEditTime: 2020-12-12 15:42:40
 * @LastEditors: 侯兴章
 * @Description: 
 */

import store from '@/store/index';
import router from '@/router';

import { hotUnregisterModule } from '../helper';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';

import type { TabItem } from './appTypes.d';
import type { Menu } from '@/router/types.d';
import { PageEnum } from '@/common/enums/PageEnum';
import _, { replace } from 'lodash';

import { mappingMenu } from '@/mapper'
import { NESTED_MENU, APP_NAME } from '@/config';
import { ServiceGetMenus, ServiceLogin } from '@/service/appService';
import storage from '@/common/storage';
import { DTOlogin, IModelUserInfo, IModelDict } from '@/service/appModel';
import { Router, RouteRecordRaw } from 'vue-router';

const NAME = 'appStore';
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
        name: '菜单管理',
        icon: '',
        path: '/menus'
      },
      {
        id: '12',
        name: '角色管理',
        icon: '',
        path: '/role'
      },
      {
        id: '13',
        name: '用户管理',
        icon: '',
        path: '/user'
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
  public title: string = APP_NAME;
  private layout: string = 'default';
  private menuData: Menu[] = []; // menuList; // 存储菜单路由数据
  private tabList: TabItem[] = []; // 页面tab功能数据
  private tabActiveKey: number | string = -1; // 当前激活tab页面
  private menuSelectedKeys: Array<string | number> = [''];  // 已选中的主导航菜单
  private keepList = []; // 需要缓存的页面name
  private userInfo = {};
  private dictList: Array<IModelDict> = []; // 缓存字典内容
  private router: any = null; // 缓存已加载的动态路由，避免刷新页面丢失

  private isLoadMenu: boolean = false; // 是否已加载菜单

  get getMenuSelectedKeys() {
    return this.menuSelectedKeys;
  }
  get getTabActiveKey() {
    return this.tabActiveKey;
  }
  get getTitleState() {
    return this.title
  }
  get getIsLoadMenu() {
    return this.isLoadMenu;
  }
  get getUserInfo() {
    return this.userInfo;
  }

  /* 获取tab */
  get getTabList() {
    return this.tabList;
  }

  get getMenuData() {
    return this.menuData;
  }

  get getRouter() {
    return this.router;
  }

  // 获取字典列表
  get getDictList() {
    return this.dictList;
  }



  @Mutation
  commitRouter(payload: Router) {
    this.router = payload;
  }

  @Mutation
  commitAddDictList(payload: Array<IModelDict>) {
    this.dictList = payload;
  }

  @Mutation
  commitLoadMenu(val: boolean = true): void {
    this.isLoadMenu = val;
  }

  @Mutation
  commitChangeTabActive(payload: any): void {
    const { index, menu } = payload;
    this.tabActiveKey = index;
    if (menu) {
      this.menuSelectedKeys = [menu.id];
      const { path, name, meta, id } = menu;
      if (!NESTED_MENU) {
        let routePath = path.replace(/^\//, '');
        // 把多级嵌套路由转为 下划线  
        routePath = '/' + routePath.replace(/\//g, '_')
        router.push(routePath);
      } else {
        router.push(path);
      }
    }
  }

  @Mutation
  commitTitleState(val: string): void {
    this.title = val;
  }

  @Mutation
  commitCreateMenu(data: Menu[]): void {
    this.menuData = data
  }

  @Mutation
  commitAddTab(route: TabItem | Menu): void {
    const { path, name, meta, id } = route;
    // 404  页面不需要添加tab
    if (path === PageEnum.ERROR_PAGE) {
      return;
    }

    this.menuSelectedKeys = [id]
    if (!NESTED_MENU) {
      let routePath = path.replace(/^\//, '');
      // 把多级嵌套路由转为 下划线  
      routePath = '/' + routePath.replace(/\//g, '_')
      router.push(routePath);
    } else {
      router.push(path);
    }
    // 已经存在的页面，不重复添加tab
    const hasTab = this.tabList.some((tab) => {
      return tab.path === path;
    });
    if (hasTab) {
      const tabIndex = _.findIndex(this.tabList, (obj) => obj.id === id);
      this.tabActiveKey = tabIndex // 当前tab的索引
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

  @Mutation
  commitSetUserIfo(user: IModelUserInfo) {
    this.userInfo = user;
  }
  /* 获取菜单与路由 */
  @Action
  async getMenuAction(): Promise<Menu[]> {
    let menuList: Menu[] = []
    const menuData = await ServiceGetMenus();
    menuList = mappingMenu(menuData); // 数据清洗映射
    this.commitCreateMenu(menuList);
    return menuList
  }


  // 账户登录
  @Action
  async actionLogin(payload: any) {
    const { params, callback } = payload;

    const userInfo: IModelUserInfo = await ServiceLogin(params);
    if (userInfo.name) {
      this.commitSetUserIfo(userInfo);
      sessionStorage.removeItem('store'); // 登录清除刷新后的store
      storage().set('token', userInfo.token);
      storage().set('userInfo', JSON.stringify(userInfo));
      router.push('/dashbord');
      typeof callback === 'function' && callback();

    } else {
      console.log('登录失败')
    }

  }

}

export { App };
export const appStore = getModule<App>(App);
