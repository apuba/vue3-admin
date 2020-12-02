<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-29 22:58:16
 * @LastEditTime: 2020-12-03 02:08:47
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <CompDrawer v-model:visible="addVisible" title="字典弹窗">
    <div class="panel">
      <a-form>
        <a-form-item label="字典名称" v-bind="validateInfos.dictName">
          <a-input v-model:value="modelAddDictRef.dictName" />
        </a-form-item>
        <a-form-item label="字典类型" v-bind="validateInfos.dictType">
          <a-input v-model:value="modelAddDictRef.dictType" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="addHandler">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
  </CompDrawer>
</template>

<script lang="ts">
import CompDrawer from '@/components/public/compDrawer';
import { useForm } from '@ant-design-vue/use';
import { defineComponent, inject, reactive, ref } from 'vue';
// import { inject } from "@vue/composition-api";
export default defineComponent({
  name: ' DictAdd',
  components: {
    CompDrawer
  },
  setup(props, context) {
    const addVisible = inject('addVisible');
    console.log(addVisible);
    // 添加字典表单
    const modelAddDictRef = reactive({
      dictName: '',
      dictType: ''
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
        }
      ]
    });

    // const addVisible = ref(false);
    const { resetFields, validate, validateInfos } = useForm(modelAddDictRef, rulesRef);

    const addHandler = (e: MouseEvent) => {
      e.preventDefault();
      validate()
        .then(() => {
          console.log('表单参数', modelAddDictRef);
        })
        .catch(err => {
          console.log('error', err);
        });
    };

    return { addVisible, resetFields, validate, validateInfos, modelAddDictRef, rulesRef, addHandler };
  }
});
</script>

<style scoped>
</style>
