<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:32:37
 * @LastEditTime: 2020-11-29 17:02:34
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div  >
    <div class="panel mb10">
      <CompSearchForm :items="formItems"  @submit="searchFormClick" />
    </div>
    <div class="panel">
      <CompTable ref="refTable" :config="dataTableConfig" />
    </div>
  </div>
</template>

<script lang="ts" src="./Index.ts">
</script>

<style scoped>
</style>
