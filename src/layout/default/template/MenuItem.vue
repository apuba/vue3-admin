<!--
 * @Author: 侯兴章
 * @Date: 2020-11-09 00:54:26
 * @LastEditTime: 2020-12-13 14:54:40
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <a-sub-menu :key="menuInfo.id" v-bind="$attrs" class="base-border-bottom" @titleClick="handleClick(menuInfo)">
    <template #title>
      <span :class="menuInfo.icon" v-if="menuInfo.icon"></span>
      <span class="txt" v-show="!collapsed">{{ menuInfo.name }}</span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.id">
      <template v-if="!item.children">
        <a-menu-item :key="item.id" @click="handleClick(item)">
          <!-- <span :class="item.icon" v-if="item.icon"></span> -->
          <span class="txt">{{ item.name }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <menu-item :menu-info="item" :key="item.id" :collapsed="collapsed" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Menu } from '@/router/types.d';
import { appStore } from '@/store/modules/appStore';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuInfo: Object,
    collapsed: Boolean
  },
  setup() {
    function handleClick(item: Menu): void {
      if (item.path) {
        appStore.commitAddTab(item);
      }
    }

    return { handleClick };
  }
});
</script>

<style scoped>
</style>
