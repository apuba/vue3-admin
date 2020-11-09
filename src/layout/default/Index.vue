<!--
 * @Author: 侯兴章
 * @Date: 2020-11-01 13:30:04
 * @LastEditTime: 2020-11-08 23:43:25
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
        <TabList />
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
import TabList from '@/layout/default/template/TabList.vue';

export default defineComponent({
  name: 'Index',
  components: {
    HeaderLayout,
    SiderLayout,
    TabList
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

}
</style>
