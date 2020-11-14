<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:02:40
 * @LastEditTime: 2020-11-12 21:07:53
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <Login />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BASET_LAYOUT } from '@/config';

import getIndexLayout from './LoginLayout';
export default defineComponent({
  components: {
    Login: getIndexLayout(BASET_LAYOUT)
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
</style>
