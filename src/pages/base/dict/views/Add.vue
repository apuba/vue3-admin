<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-29 22:58:16
 * @LastEditTime: 2020-12-04 03:26:13
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <CompPopup v-model:visible="addVisible" title="字典弹窗">
    <div class="panel">
      <a-form>
        <a-form-item label="字典名称" v-bind="validateInfos.dictName">
          <a-input v-model:value="modelAddDictRef.dictName" maxlength="20" />
        </a-form-item>
        <a-form-item label="字典类型" v-bind="validateInfos.dictType">
          <a-input v-model:value="modelAddDictRef.dictType" maxlength="30" />
        </a-form-item>

        <a-form-item label="启用状态">
          <a-select v-model:value="modelAddDictRef.status">
            <a-select-option value="1">是</a-select-option>
            <a-select-option value="2">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="addHandler">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
  </CompPopup>
</template>

<script lang="ts">
import { useForm } from '@ant-design-vue/use';
import { defineComponent, inject, reactive, readonly, ref, unref } from 'vue';
import { IModelDictType } from '../server/model';
import { ServSaveDict } from '../server';
export default defineComponent({
  name: ' DictAdd',
  components: {

  },
  setup(props, context) {
    const addVisible = ref(inject('addVisible'));
    const reloadTable: Function = inject('reloadTable') || Function; // 接受重载表格事件

    // 添加字典表单，
    const modelAddDictRef: IModelDictType = reactive({
      dictName: '',
      dictType: '',
      status: '1'
    });

    const rulesRef = reactive({
      dictName: [
        {
          required: true,
          message: '请输入字典名称'
        }
      ],
      dictType: [
        {
          required: true,
          message: '请输入字典类型名'
        },
        {
          pattern: /^[a-zA-Z_]+$/,
          message: '只能输入英文与下划线'
        }
      ]
    });

    const { resetFields, validate, validateInfos } = useForm(modelAddDictRef, rulesRef);

    const addHandler = (e: MouseEvent) => {
      e.preventDefault();
      validate()
        .then(() => {
          console.log('表单参数', modelAddDictRef);
          ServSaveDict(modelAddDictRef).then(res => {
            if (res.status) {
              reloadTable(); // 执行重截表格
              resetFields(); // 重置表单
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

    return { addVisible, resetFields, validate, validateInfos, modelAddDictRef, rulesRef, addHandler, reloadTable };
  }
});
</script>

<style scoped>
</style>
