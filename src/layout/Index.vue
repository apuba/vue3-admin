<!--
 * @Author: 侯兴章
 * @Date: 2020-11-01 13:10:36
 * @LastEditTime: 2020-12-12 14:57:48
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <LayoutPage />
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { BASET_LAYOUT, RETENTION_STORE } from '@/config';

import getIndexLayout from './IndexLayout';
import store from '@/store';

export default defineComponent({
  components: {
    LayoutPage: getIndexLayout(BASET_LAYOUT)
  },
  setup() {
    if (RETENTION_STORE) {
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(store.state));
      });

      /*  const sessionStore: string = sessionStorage.store;
      if (sessionStore) {
        store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStore)));
      } */
    }
    return {};
  }
});
</script>

<style scoped>
</style>
