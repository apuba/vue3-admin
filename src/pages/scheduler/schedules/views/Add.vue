<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-29 22:58:16
 * @LastEditTime: 2020-12-08 06:35:01
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div>
    <CompPopup v-model:visible="addVisible" title="新增任务" :showFooter="true" :confirmLoading="submitLoading" @submit="addHandler">
      <div class="panel">
        <a-form :labelCol="{span: 6}">
          <a-form-item label="任务名称" v-bind="validateInfos.jobName">
            <a-input v-model:value="modelAddJobRef.jobName" maxlength="20" />
          </a-form-item>
          <a-form-item label="字典描述" v-bind="validateInfos.description">
            <a-textarea v-model:value="modelAddJobRef.description" placeholder="description" :auto-size="{ minRows: 2, maxRows: 5 }"/>
          </a-form-item>
          <a-form-item label="请求地址" v-bind="validateInfos.requestUrl">
            <a-input v-model:value="modelAddJobRef.requestUrl" maxlength="30" />
          </a-form-item>
          <a-form-item label="任务类型" v-bind="validateInfos.requestType">
            <CompDictionaries dictType="schedule_jobs_job_type" v-model:value="modelAddJobRef.requestType" />
          </a-form-item>
          <a-form-item label="来源系统" v-bind="validateInfos.system">
            <CompDictionaries dictType="schedule_schedules_system" v-model:value="modelAddJobRef.system" />
          </a-form-item>
          <a-form-item label="请求模块" v-bind="validateInfos.module">
            <CompDictionaries dictType="schedule_schedules_model" v-model:value="modelAddJobRef.module" />
          </a-form-item>
          <a-form-item label="单例模式" v-bind="validateInfos.singleInstance">
            <CompDictionaries type="radio" v-model:value="validateInfos.singleInstance" dictType="schedule_jobs_single_instance" />
          </a-form-item>
<!--          <a-form-item label="执行方式" v-bind="validateInfos.jobType">-->
<!--            <CompDictionaries dictType="schedule_schedules_schedule_type" v-model:value="modelAddJobRef.jobType" />-->
<!--          </a-form-item>-->
        </a-form>
      </div>
    </CompPopup>
  </div>
</template>

<script lang="ts">
import { useForm } from '@ant-design-vue/use';
import { defineComponent, inject, reactive, readonly, ref, unref } from 'vue';
import { IModelJob, mapperDictType } from '../server/model';
import { ServSaveJob } from '../server';
import { Icolumns, ItableProps } from '@/components/public/compTable';
import { ApiJob } from '../server/api';
export default defineComponent({
  name: ' DictAdd',
  components: {

  },
  setup(props, context) {
    const addVisible = ref(inject('addVisible'));
    const reloadTable: Function = inject('reloadTable') || Function; // 接受重载表格事件
    const submitLoading = ref(false);

    // 添加任务表单，
    const modelAddJobRef: IModelJob = reactive({
      jobId: '',
      jobName: '',
      description: '',
      requestUrl: '',
      requestType: '',
      outputFileType: '',
      system: '',
      module: '',
      jobType: '',
      creationDate: '',
      createName: ''
    });

    const rulesRef = reactive({
      jobName: [
        {
          required: true,
          message: '请输入字典名称'
        }
      ],
      requestUrl: [
        {
          required: true,
          message: '请输入请求地址'
        },
        {
          pattern: /^[a-zA-Z_]+$/,
          message: '只能输入英文与下划线'
        }
      ]
    });

    const { resetFields, validate, validateInfos } = useForm(modelAddJobRef, rulesRef);

    const addHandler = (e: MouseEvent) => {
      e && e.preventDefault();
      validate()
        .then(() => {
          submitLoading.value = true; // 按钮loading
          console.log('表单参数', modelAddJobRef);
          ServSaveJob(modelAddJobRef).then(res => {
            submitLoading.value = false;
            if (res.status) {
              reloadTable(); // 执行重截表格
              resetFields(); // 重置表单
              addVisible.value = false; // 隐藏弹窗
            }
            console.log(res);
          });
        })
        .catch(err => {
          console.log('error', err);
        });
    };
    return { addVisible, resetFields, validate, validateInfos, modelAddJobRef, rulesRef, addHandler, reloadTable, submitLoading };
  }
});
</script>

<style scoped>
</style>
