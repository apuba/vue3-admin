<!--
 * @Author: 侯兴章
 * @Date: 2020-11-01 13:30:04
 * @LastEditTime: 2020-11-29 17:17:14
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-layout id="mes-default-layout" class="mes-default-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="sider">
      <SiderLayout :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <HeaderLayout @collapsed-hander="collapsedHander" />
      </a-layout-header>
      <a-layout-content class="content">
        <TabList />
        <div class="content-page mt15">
          <transition
            :enter-active-class="enabledRouterTranstion ? 'animate__animated animate__fadeInUp' : ''"
            :leave-active-class="enabledRouterTranstion ? 'animate__animated animate__fadeOutUp' : ''"
          >
            <keep-alive>
              <router-view class="routerStyle"></router-view>
            </keep-alive>
          </transition>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import 'animate.css';
import { defineComponent, ref } from 'vue';
import SiderLayout from '@/layout/default/template/SiderLayout.vue';
import HeaderLayout from '@/layout/default/template/HeaderLayout.vue';
import TabList from '@/layout/default/template/TabList.vue';
import { ENABLED_ROUTER_TRANSTION } from '@/config';

export default defineComponent({
  name: 'Index',
  components: {
    HeaderLayout,
    SiderLayout,
    TabList
  },
  setup() {
    const collapsed = ref(false);
    const enabledRouterTranstion = ENABLED_ROUTER_TRANSTION;
    function collapsedHander(payload: boolean): void {
      collapsed.value = payload;
    }
    return { collapsed, collapsedHander, enabledRouterTranstion };
  }
});
</script>

<style lang="scss" scoped>
// @import './antd.less';
@import './var.scss';
@import './antd.scss';

@import './style.scss';
</style>
