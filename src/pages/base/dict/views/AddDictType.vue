<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-29 22:58:16
 * @LastEditTime: 2020-12-16 16:43:46
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div>
    <CompPopup v-model:visible="addVisible" title="新增字典" :showFooter="true" :confirmLoading="submitLoading" @submit="addHandler">
      <div class="panel">
        <a-form :labelCol="{span: 6}">
          <a-form-item label="字典名称" v-bind="validateInfos.dictName">
            <a-input v-model:value="modelAddDictRef.dictName" maxlength="20" />
          </a-form-item>
          <a-form-item label="字典类型" v-bind="validateInfos.dictType">
            <a-input v-model:value="modelAddDictRef.dictType" maxlength="30" />
          </a-form-item>
          <a-form-item label="启用状态" v-bind="validateInfos.status">
            <CompDictionaries v-model:value="modelAddDictRef.status"  dictType="sys_enabled" width="175px" type="radio" />
          </a-form-item>
          <!-- <a-col :offset="6"><a-button type="primary" @click="addHandler" :loading="submitLoading">添加</a-button></a-col> -->
        </a-form>
      </div>
    </CompPopup>
  </div>
</template>

<script lang="ts">
import { useForm } from '@ant-design-vue/use';
import { defineComponent, inject, reactive, readonly, ref, unref, watch } from 'vue';
import { IModelDictType, mapperDictType } from '../server/model';
import { ServSaveDict } from '../server';
import { Icolumns, ItableProps } from '@/components/public/compTable';
import { ApiDict } from '../server/api';
export default defineComponent({
  name: ' DictTypeAdd',
  components: {

  },
  setup(props, context) {
    const addVisible = ref(inject('addVisible'));
    const dictTypeRow = inject('dictTypeRow') as IModelDictType; // 编辑字典类型的数据
    console.log('dictTypeRow', dictTypeRow);

    const reloadTable: Function = inject('reloadTable') || Function; // 接受重载表格事件
    const submitLoading = ref(false);

    // 添加字典表单，
    const modelAddDictRef = ref(dictTypeRow);

    /* // 添加字典表单，
    const modelAddDictRef: IModelDictType = reactive({
      dictName: '',
      dictType: '',
      status: '0'
      ...dictTypeRow
    }); */

    /*    watch(dictTypeRow, (nval, oval) => {
      console.log(nval);
    }); */

    const rulesRef = reactive({
      status: [
        {
          required: true,
          message: '请选择字典状态'
        }
      ],
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
      e && e.preventDefault();
      validate()
        .then(() => {
          submitLoading.value = true; // 按钮loading
          console.log('表单参数', modelAddDictRef.value);
          ServSaveDict(modelAddDictRef.value).then(res => {
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

    // 弹窗配置 ------------------------------

    const showModal = ref(true);

    // 表格列表的配置
    const columns: Array<Icolumns> = [{
      title: 'ID',
      dataIndex: 'dictId',
      key: 'dictId'
    }, {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType'

    }, {
      title: '字典类型名称',
      dataIndex: 'dictName',
      key: 'dictName',
      ellipsis: true
    }, {
      title: '字典状态',
      dataIndex: 'dictLabelStatus',
      key: 'dictLabelStatus'

    }];

    // 表格的配置项
    const dataTableConfig: ItableProps = {
      api: ApiDict.getDictTypeList,
      columns,
      rowKey: 'dictId',
      mapper: mapperDictType // 清洗数据的映射配置
    };

    return { showModal, dictTypeRow, dataTableConfig, addVisible, resetFields, validate, validateInfos, modelAddDictRef, rulesRef, addHandler, reloadTable, submitLoading };
  }
});
</script>

<style scoped>
</style>
