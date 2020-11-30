<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-29 22:58:16
 * @LastEditTime: 2020-11-30 01:28:37
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div>
    <a-drawer title="Basic Drawer" :placement="placement" :closable="false" :visible="state.visible" @close="onClose">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { } from '@/config';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      visible: true
    });

    const onClose = (): void => {
      console.log('onClose');
    };
    return { ...toRefs(state), onClose };
  }
});
</script>

<style scoped>
</style>
