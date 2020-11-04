<!--
 * @Author: 侯兴章
 * @Date: 2020-11-01 13:10:36
 * @LastEditTime: 2020-11-01 16:10:06
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <LayoutPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BASET_LAYOUT } from '@/config';

import getLayout from './layout';

export default defineComponent({
  components: {
    LayoutPage: getLayout(BASET_LAYOUT)
  },
  setup() {
    /* const LayoutPage: Component = DefaultLayout;

    return { LayoutPage }; */
  }
});
</script>

<style scoped>
</style>
