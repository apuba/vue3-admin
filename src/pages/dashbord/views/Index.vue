<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-11-15 02:26:30
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div>
    <h1>dashbord portal 控制台中心</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { getMenusServer } from '@/pages/menus/server';
import { mappingMenu } from '@/dataMapping';
import { Menu } from '@/router/types.d';

export default defineComponent({
  name: 'dashbord',
  setup() {
    async function getMenuData() {
      /*  let menuList: Menu[] = [];
      const menuData = await getMenusServer();
      menuList = mappingMenu(menuData); // 数据清洗映射 */
    }

    onMounted(() => {
      getMenuData();
    });

    return { getMenuData };
  }
});
</script>

<style scoped>
</style>
