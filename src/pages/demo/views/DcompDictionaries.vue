<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-08 21:30:58
 * @LastEditTime: 2020-12-09 01:45:07
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div class="panel p10">
    <h2>数据表格控件</h2>
    <ul class="list">
      <li>
        select类型：
        <CompDictionaries dictType="sys_delete_flag" v-model:value="form.select" />
      </li>
      <li>
        checkbox类型：
        <CompDictionaries type="radio" v-model:value="form.checkbox" dictType="sys_user_type" />
      </li>
      <li>
        radio类型：
        <CompDictionaries type="checkbox" v-model:value="form.radio" dictType="schedule_schedules_status_code" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref } from 'vue';
export default defineComponent({
  setup() {
    const form = reactive({
      select: '1',
      radio: 'DEPLOYED',
      checkbox: ['OUT']
    });
    return { form };
  }
});
</script>

<style lang="scss" scoped>
.list {
  li {
    padding: 10px 0;
  }
}
</style>
