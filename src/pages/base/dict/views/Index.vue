<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-12-08 03:41:48
 * @LastEditors: 侯兴章
 * @Description: 字典列表
-->
<template>
  <div>
    <div class="panel mb10">
      <CompSearchForm :items="formItems" @submit="searchFormClick" v-model:params="formParams" />
    </div>
    <div class="panel">
      <CompTable ref="refTable" :config="dataTableConfig" v-model:selectedRowKeys="selectedRowKeys">
        <template v-slot:buttons>
          <a-button type="primary" size="small" @click="addDictHandler">添加</a-button>
          <a-button type="primary" size="small" @click="openModalHandler">打开模型弹窗</a-button>
        </template>
      </CompTable>
      <!-- 弹窗组件 -->
      <CompModalSelect :config="dataTableConfig" v-model:visible="showModal" title="选择弹窗" v-model:selectedRowKeys="modalRowKeys" />
    </div>

    <!-- 引入添加组件 -->
    <CompAdd />

    <!-- 字典控件 -->
    <CompDictionaries v-model="test.status" dictType="sys_user_status"  type="checkbox" />
  </div>
</template>

<script lang="ts" src="./Index.ts">
</script>

<style scoped>
</style>
