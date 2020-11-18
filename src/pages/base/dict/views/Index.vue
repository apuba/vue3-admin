<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-11-19 02:06:46
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="panel mb10">
    <a-form layout="inline" :model="searchForm" @submit="handleSubmit">
      <a-form-item :label="字典名称">
        <a-input v-model:value="searchForm.dictName" placeholder=""></a-input>
      </a-form-item>
      <a-form-item :label="字典类型">
        <a-input v-model:value="searchForm.dictType" placeholder="">
          <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="searchForm.dictName === '' || searchForm.dictType === ''">搜索</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div class="panel">表格</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'dict',
  setup() {
    const searchForm = reactive({
      dictName: '',
      dictType: '',
      status: ''
    });
    const handleSubmit = (): void => {

    };
    return { searchForm, handleSubmit };
  }
});
</script>

<style scoped>
</style>
