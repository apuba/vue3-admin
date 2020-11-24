<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-11-24 23:23:57
 * @LastEditors: 侯兴章
 * @Description: 字典列表
-->
<template>
  <div class="panel mb10">
    <CompSearchForm :items="formItems"  @submit="searchFormClick" />
  </div>
  <div class="panel">
    <CompTable ref="refTable" :config="dataTableConfig" />
  </div>
</template>

<script lang="ts" src="./Index.ts">
</script>

<style scoped>
</style>
