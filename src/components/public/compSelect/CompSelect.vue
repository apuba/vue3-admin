<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-06 00:10:48
 * @LastEditTime: 2020-12-07 22:54:25
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <a-select v-model:value="value3">
    <a-select-option value="lucy">Lucy</a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CompSelect',

  props: {

  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
</style>
