<!--
 * @Author: 侯兴章
 * @Date: 2020-11-01 13:30:04
 * @LastEditTime: 2020-11-01 16:12:20
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
    <div class="blue-layout">
        <h4>blue 默认的模板标题</h4>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'index',
  setup () {
    return {};
  }
});
</script>

<style scoped>
  .blue-layout * {
    color: blue;
  }
</style>
