<!--
 * @Author: 侯兴章
 * @Date: 2020-11-08 23:38:56
 * @LastEditTime: 2020-11-09 00:34:54
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="tab">
    <ul>
      <li class="item" :class="{active: tabActiveKey === -1}" @click="tabClickHandler(-1)">
        <router-link to="/dashboard">工作台</router-link>
      </li>
      <li class="item" v-for="(li, index) in tabList" :key="index" :class="{active: tabActiveKey === index}" @click="tabClickHandler(index, li)">
        <router-link :to="li.path">{{ li.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { appStore } from '@/store/modules/appStore';
import { TabItem } from '@/store/modules/appTypes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const tabActiveKey = computed(() => appStore.getTabActiveKey);
    const tabList = computed(() => appStore.getTabList);

    function tabClickHandler(index = -1): void {
      appStore.commitChangeTabActive(index);
    }
    return { tabList, tabActiveKey, tabClickHandler };
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
  }
  ul {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
