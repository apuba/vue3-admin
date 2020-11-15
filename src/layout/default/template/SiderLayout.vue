<!--
 * @Author: 侯兴章
 * @Date: 2020-11-03 01:51:48
 * @LastEditTime: 2020-11-15 23:42:54
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="side-bar">
    <div class="side-bar-top">
      <div class="logo">AI MES</div>
      <div class="user-info base-border-bottom">
        <figure>
          <img src="@public/img/photo.jpg" />
        </figure>
        <span class="user-name">
          张小勇
          <span class="job">(经理)</span>
        </span>
      </div>
      <div class="tool base-border-bottom">
        <span class="item"><span class="iconfont icon-xinxi1"></span></span>
        <span class="item"><span class="iconfont icon-xinxi"></span></span>
        <span class="item"><span class="iconfont icon-shengchanxiaohao"></span></span>
      </div>
    </div>
    <div data-desc="导航菜单" class="side-bar-bottom" :class="{'big-icon-menu': !collapsed, 'small-icon-menu': collapsed}">
      <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" :inline-collapsed="collapsed" :theme="collapsed ? 'dark' : 'light'" mode="inline" inlineIndent="15">
        <template v-for="item in menuList" :key="item.id">
          <template v-if="!item.children">
            <a-menu-item :key="item.id" @click="handleClick(item)" class="ant-menu-submenu-title">
              <span :class="item.icon" v-if="item.icon"></span>
              <span class="txt" v-show="!collapsed">{{ item.name }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <MenuItem :menu-info="item" :key="item.id" :collapsed="collapsed" />
          </template>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { appStore } from '@/store/modules/appStore';
// import { Menu } from '@/router/types';
import MenuItem from './MenuItem.vue';
import { Menu } from '@/router/types.d';
interface ImenuItem {
  key: string;
  domEvent: MouseEvent;
}
export default defineComponent({
  props: {
    collapsed: Boolean
  },
  components: {
    MenuItem
  },
  setup() {
    const selectedKeys = computed(() => appStore.getMenuSelectedKeys);
    const openKeys = ref(['']);
    const menuList = computed(() => appStore.getMenuData);
    function handleClick(menu: Menu) {
      if (menu.path) {
        appStore.commitAddTab(menu);
      }
    }
    return { selectedKeys, openKeys, handleClick, menuList };
  }
});
</script>

<style lang="scss">
@import '../var.scss';
@import '../antd.scss';
@import '../style.scss';
.mes-default-layout {
  .logo {
    background-color: $transition-color-4;
    height: $base-bar-heigth;
    line-height: $base-bar-heigth;
    font-size: 24px;
    color: $transition-color-3;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
  .sider {
    background: $primary-color;
    box-shadow: 0px 13px 40px 0px rgba(0, 0, 0, 0.2);
    .user-info {
      @include base-padding-10;
      text-align: center;
      figure {
        transition: all 0.2s;
        margin: 0 auto;
        width: 78px;
        height: 78px;
        border-radius: 55px;
        overflow: hidden;
        border: 3px solid $transition-color-1;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.2s;
          &:hover {
            transform: scale(1.15, 1.15);
          }
        }
      }
      .user-name {
        display: block;
        margin-top: 5px;
      }
    }
    .tool {
      @include base-linear-gradient;
      background-size: 250%;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      display: flex;
      &:hover {
        background-size: 200%;
      }
      .item {
        flex: 1;
        cursor: pointer;
      }
    }
    .ant-menu {
      background-color: transparent;
    }
  }
  .ant-layout-sider-collapsed.sider {
    figure {
      width: 48px;
      height: 48px;
    }
  }
  .side-bar {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .side-bar-bottom {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    @include scrollBarStyle;
  }
  .big-icon-menu {
    .ant-menu-item {
      margin: 0 !important;
      color: #999;
      &:hover {
        color: $info-color;
      }
      &::after {
        // border: none;
      }
    }
    .ant-menu-sub .ant-menu-submenu-title .txt {
      position: relative;
      bottom: inherit;
    }
    .ant-menu-submenu-title {
      padding-top: 10px;
      padding-bottom: 10px;
      height: auto !important;
      line-height: initial !important;
      overflow: initial;
      color: #999;
      margin: 0;
      position: relative;
      * {
        transition: all 0.4s;
        display: block;
        // margin: 0 auto;
      }
      .iconfont {
        font-size: 36px;
        width: 100%;
        padding-bottom: 28px;
      }
      .txt {
        line-height: 24px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 12px;
        font-size: 14px;
      }

      &:hover {
        color: $info-color;
        &::before {
          transition: all 0.2s;
          content: '';
          display: block;
          background-color: transparentize($transition-color-2, 0.8);
          z-index: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: -10px;
          bottom: 0;
        }
        .iconfont {
          text-shadow: $info-color 0 0 15px;
        }
      }
    }
    .ant-menu-submenu-selected > .ant-menu-submenu-title {
      &::before {
        transition: all 0.2s;
        content: '';
        display: block;
        background-color: transparentize($transition-color-2, 0.8);
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: -10px;
        bottom: 0;
      }
    }
    .ant-menu-submenu-open {
      background-color: $transition-color-1;
      color: #ccc;
      .ant-menu-submenu-title {
        .iconfont {
          font-size: 24px;
          width: 30px;
          padding-bottom: 0;
        }
      }
    }
    .ant-menu-inline {
      border: none;
    }
    .ant-menu-inline .ant-menu-submenu-title {
      padding-right: 15px;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: $transition-color-4;
      color: $info-color;
    }
  }

  .small-icon-menu {
    .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
      padding: 0 5px !important;
      margin: 0;
    }
    .ant-menu-submenu-title {
      padding: 0 !important;
      margin: 0;
      &:hover {
        color: $info-color;
        &::before {
          transition: all 0.2s;
          content: '';
          display: block;
          background-color: transparentize($transition-color-2, 0.8);
          z-index: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: -10px;
          bottom: 0;
        }
        .iconfont {
          text-shadow: $info-color 0 0 15px;
        }
      }
      .iconfont {
        font-size: 24px;
        width: 100%;
      }
    }
  }
}
</style>
