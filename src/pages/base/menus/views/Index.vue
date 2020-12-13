<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-12-13 22:44:22
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-row gutter="10" style="heigth: 100%">
    <a-col :span="6">
      <div class="panel">
        <a-tree :show-line="true" :treeData="menuData" :showIcon="false" :replaceFields="replaceFields" :default-expanded-keys="[]" @select="onSelect"></a-tree>
      </div>
    </a-col>
    <a-col :span="18">
      <div class="panel">
        <a-form layout="inline" @submit="handleSubmit">
          <a-form-item label="菜单名称" v-bind="validateInfos.menuName">
            <a-input v-model:value="formMenu.menuName" placeholder="菜单名称"></a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';

import { ServiceGetMenus } from '../server';
import { IMenuModel, IRequestMenuModel } from '../server/model';
import { useForm } from '@ant-design-vue/use';

export default defineComponent({
  name: 'Menus',
  setup() {
    const state = reactive({
      menuData: [] as Array<IMenuModel>,
      replaceFields: {
        children: 'children',
        key: 'menuId',
        title: 'menuName'
      },
      formMenu: {
        menuName: '',
        menuId: '',
        imageLink: '',
        color: '',
        htmlUrl: '',
        menuParentId: '',
        menuCode: ''
      } as IRequestMenuModel,
      formRules: {
        menuName: [
          {
            required: true
          }
        ],
        menuParentId: [

        ]
      }
    });

    const methods = {
      getData: () => {
        ServiceGetMenus().then(res => {
          state.menuData = res;
        });
      },
      onSelect: (selectedKeys: any, info: any) => {
        console.log('selected', selectedKeys, info);
      },
      handleSubmit: () => {

      }
    };

    const { resetFields, validate, validateInfos } = useForm(state.formMenu, state.formRules);
    onMounted(() => {
      methods.getData();
    });
    return { ...methods, ...toRefs(state), resetFields, validate, validateInfos };
  }
});
</script>

<style scoped>
</style>
