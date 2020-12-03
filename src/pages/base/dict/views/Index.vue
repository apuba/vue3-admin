<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-12-04 03:41:26
 * @LastEditors: 侯兴章
 * @Description: 字典列表
-->
<template>
  <div>
    <div class="panel mb10">
      <CompSearchForm :items="formItems" @submit="searchFormClick" v-model:params="formParams" />
    </div>
    <div class="panel">
      <CompTable ref="refTable" :config="dataTableConfig">
        <template v-slot:buttons>
          <a-button type="primary" size="small" @click="addDictHandler">添加</a-button>
        </template>
      </CompTable>
    </div>

    <!-- 引入添加组件 -->
    <CompAdd />
  </div>
</template>

<script lang="ts" src="./Index.ts">
</script>

<style scoped>
</style>
