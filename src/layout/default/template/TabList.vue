<!--
 * @Author: 侯兴章
 * @Date: 2020-11-08 23:38:56
 * @LastEditTime: 2020-12-13 14:15:49
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="tab">
    <ul>
      <li class="item" :class="{active: tabActiveKey === -1}" @click="tabClickHandler(-1)">
        <router-link to="/dashbord">工作台</router-link>
      </li>
      <li class="item" v-for="(li, index) in tabList" :key="index" :class="{active: tabActiveKey === index}" @click="tabClickHandler(index, li)">
        <span>{{ li.name }}</span>
        <span class="close" @click.stop="delTabHandler(index, li)">x</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { appStore } from '@/store/modules/appStore';
import { TabItem } from '@/store/modules/appTypes';
import { computed, defineComponent } from 'vue';
import type { Menu } from '@/router/types.d';

export default defineComponent({
  setup() {
    const tabActiveKey = computed(() => appStore.getTabActiveKey);
    const tabList = computed(() => appStore.getTabList);

    const tabClickHandler = (index = -1, menu: Menu) => {
      appStore.commitChangeTabActive({ index, menu });
    };

    const delTabHandler = (index: number, menu: Menu) => {
      appStore.commitDelTab({ index, menu });

      if (tabActiveKey.value === index) { // 删除的是当前激活的tab页面时，进行路由切换
        const activeMenu = appStore.getTabList[index - 1];
        console.log('activeMenu', activeMenu);
        appStore.commitChangeTabActive({ index: index - 1, menu: activeMenu });
      }
    };

    return { tabList, tabActiveKey, tabClickHandler, delTabHandler };
  }
});
</script>

<style lang="scss">
@import '../var.scss';
@import '../antd.scss';
@import '../style.scss';
.tab {
  height: 36px;
  line-height: 36px;
  white-space: nowrap;
  .item {
    display: inline-block;
    position: relative;
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
      color: #fff;
    }
    &.active {
      color: $text-color;
      @include base-linear-gradient;
      background-size: 250%;
      color: #ccc;
      padding: 0 22px;
      &:hover {
        background-size: 200%;
        color: #ddd;
      }
    }

    .close {
      display: none;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 12px;
      background: $blue;
      position: absolute;
      right: 0;
      color: #ccc;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    &:hover {
      .close {
        display: inline-block;
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
</style>
