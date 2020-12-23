<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-09 23:57:45
 * @LastEditTime: 2020-12-16 16:51:53
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="panel mb10" v-if="!dictType">
    <CompSearchForm :items="formItems" @submit="searchFormClick" v-model:params="formParams" />
  </div>
  <div class="panel">
    <CompTable ref="refTable" :config="dataTableConfig" v-model:selectedRowKeys="selectedRowKeys">
      <template v-slot:buttons>
        <a-button type="primary" size="small" @click="addDictDataHandler">添加字典</a-button>
      </template>

      <template v-slot:operation="scope" data-desc="自定操作栏">
        <a-button-group>
          <a-button type="primary" size="small" @click="editDictHandler(scope)">修改</a-button>

          <a-popconfirm title="确认要删除?" @confirm="delDictHandler(scope)">
            <a-button type="warin" size="small">删除</a-button>
          </a-popconfirm>
        </a-button-group>
      </template>
    </CompTable>
    <!-- 弹窗组件 -->
    <!-- <CompModalSelect :config="dataTableConfig" v-model:visible="showModal" title="选择弹窗" v-model:selectedRowKeys="modalRowKeys" /> -->
  </div>

  <!-- 引入添加组件 -->
  <AddDictData />
</template>

<script lang="ts" src="./DictList.ts" >

</script>

<style scoped>
</style>
