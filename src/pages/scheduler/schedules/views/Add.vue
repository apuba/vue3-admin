<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-09 23:57:45
 * @LastEditTime: 2020-12-11 01:18:14
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="panel">
    <div class="tr">
      <a-button type="primary" :confirmLoading="submitLoading" @click="addHandler">保存</a-button>
    </div>
    <a-form class="inline-form">
      <a-form-item label="实例任务" v-bind="validateInfos.jobId">
        <a-input v-model:value="modelAddJobRef.jobId" maxlength="20" @click="openModalHandler"/>
      </a-form-item>
      <a-form-item label="任务类型" v-bind="validateInfos.scheduleType">
        <CompDictionaries  dictType="schedule_schedules_schedule_type" v-model:value="modelAddJobRef.scheduleType" />
      </a-form-item>
      <a-form-item label="执行表达式" v-bind="validateInfos.cornexpress" v-show="modelAddJobRef.scheduleType && modelAddJobRef.scheduleType!=='IMMED'">
        <a-input v-model:value="modelAddJobRef.cornexpress" maxlength="20" />
      </a-form-item>
      <a-form-item label="时间" v-bind="validateInfos.scheduleExpectEndDate">
        <a-range-picker
          :show-time="{ format: 'HH:mm:ss' }"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['开始时间', '结束时间']"
          @change="onChange"
          @ok="onTimeRangeHandler"
        />
      </a-form-item>
    </a-form>

    <CompModalSelect :config="dataTableConfig" v-model:visible="showModal" title="选择弹窗" v-model:selectedRowKeys="modelAddJobRef.jobId" />

  </div>

</template>

<script lang="ts" src="./Add.ts" >

</script>

<style scoped>
</style>
