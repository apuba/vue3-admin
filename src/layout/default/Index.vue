<!--
 * @Author: 侯兴章
 * @Date: 2020-11-01 13:30:04
 * @LastEditTime: 2020-11-03 04:20:05
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-layout id="mes-default-layout" class="mes-default-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="sider">
      <SiderLayout />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <HeaderLayout @collapsed-hander="collapsedHander" />
      </a-layout-header>
      <a-layout-content class="content">
        <div class="tab">
          <span class="item active">工作台</span>
          <ul>
            <li class="item">工作台</li>
            <li class="item">工作台</li>
            <li class="item">工作台</li>
            <li class="item">工作台</li>
            <li class="item">工作台</li>
            <li class="item">工作台</li>
            <li class="item">工作台</li>
          </ul>
        </div>
        <div class="content-page pt20">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import SiderLayout from '@/layout/default/template/SiderLayout.vue';
import HeaderLayout from '@/layout/default/template/HeaderLayout.vue';
export default defineComponent({
  name: 'Index',
  components: {
    HeaderLayout,
    SiderLayout
  },
  setup() {
    const collapsed = ref(false);
    function collapsedHander(payload: boolean): void {
      collapsed.value = payload;
    }
    return { collapsed, collapsedHander };
  }
});
</script>

<style lang="scss">
@import './var.scss';
@import './antd.scss';
@import '@scss/base.scss';
@import './style.scss';
.mes-default-layout {
  height: 100vh;
  color: $base-text-color;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: $base-text-color;
  }
  .ant-layout {
    background-color: $bg-color;
  }

  .content {
    text-align: left;
    padding: 20px;
  }
  .tab {
    height: 36px;
    line-height: 36px;
    white-space: nowrap;
    .item {
      display: inline-block;
      background-color: $primary-color;
      border-radius: 30px;
      padding: 0 18px;
      margin-right: 10px;
      color: #669;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        @include base-linear-gradient;
        background-size: 300%;
        color: #ccc;
      }
      &.active {
        color: $text-color;
        @include base-linear-gradient;
        background-size: 250%;
        color: #ccc;
        &:hover {
          background-size: 200%;
          color: #ddd;
        }
      }
    }
    ul {
      display: inline-block;
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
