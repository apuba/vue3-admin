<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-11-24 01:50:42
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="panel mb10">
    <CompSearchForm :items="formItems" v-model="formData" />
  </div>
  <div class="panel">
    <a-table :columns="columns" :data-source="tableData.data" row-key="dictId" size="small"></a-table>
  </div>
</template>

<script lang="ts" src="./Index.ts">
</script>

<style scoped>
</style>
