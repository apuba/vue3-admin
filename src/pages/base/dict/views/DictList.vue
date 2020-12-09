<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-09 23:57:45
 * @LastEditTime: 2020-12-10 02:08:05
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
import { onBeforeRouteUpdate } from 'vue-router';
export default defineComponent({
  setup() {
    const id = ref(router.currentRoute.value.query.id); // 获取路由的传id

    const getData = () => {
      // 获取数据
    };

    /*   watch(router.currentRoute, (nval, oval) => {
        id.value = nval.query.id; // 监听路由参数切换。数据不变化
      });
   */
    onBeforeRouteUpdate((to, from, next) => {
      console.log(to);
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      id.value = to.query.id;
      next();
    });

    return { id };
  }
});
</script>

<style scoped>
</style>
