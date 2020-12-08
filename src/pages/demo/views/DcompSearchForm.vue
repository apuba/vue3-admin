<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-09 00:48:25
 * @LastEditTime: 2020-12-09 01:39:54
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div class="panel p15">
    <h2>查询表单DEMO</h2>
    <CompSearchForm :items="formItems" @submit="searchFormClick" v-model:params="formParams" />
  </div>
</template>

<script lang="ts">
import { EcomponentType, IFormItems } from '@/components/public/compSearchForm/types';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const formParams = ref({}); // 查询表单对象，数据双向绑定
    // 查询表单参数配置
    const formItems: IFormItems[] = [
      {
        label: '字典名称',
        model: 'dictName',
        rules: [{
          required: true,
          message: '请输名称'
        }]
      },
      {
        label: '字典类型',
        model: 'dictType',
        rules: [{
          required: true,
          message: '请输字典类型'
        }]
      },
      {
        label: '启用状态',
        model: 'status',
        type: EcomponentType.Checkbox,
        dictType: 'sys_user_type',
        defaultValue: 'OUT',
        rules: [{
          required: true,
          message: '请选择状态'
        }]
      }
    ];
    const searchFormClick = () => {

    };

    return { searchFormClick, formItems, formParams };
  }
});
</script>

<style scoped>
</style>
