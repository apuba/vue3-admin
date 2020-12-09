<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-09 23:57:45
 * @LastEditTime: 2020-12-10 01:52:44
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div>字典列表</div>
  <div>当前路由的ID 为： {{ id }}</div>
</template>

<script lang="ts">
import { defineComponent, onActivated, ref, watch } from 'vue';
import router from '@/router';
export default defineComponent({
  setup() {
    const id = ref(router.currentRoute.value.query.id); // 获取路由的传id
    /* onActivated(() => {
      console.log('重新激活了');
    }); */

    watch(router.currentRoute, (nval, oval) => {
      id.value = nval.query.id; // 监听路由参数切换。数据不变化
    });
    return { id };
  }
});
</script>

<style scoped>
</style>
