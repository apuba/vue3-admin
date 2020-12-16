<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2020-12-14 22:12:35
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-row gutter="10" style="heigth: 100%"  >
    <a-col :span="6">
      <div class="panel content-page ">
        <a-tree :show-line="true" :treeData="menuData" :showIcon="false"
        :defaultExpandAll="true" :replaceFields="replaceFields"

         @select="onSelect"></a-tree>
      </div>
    </a-col>
    <a-col :span="18">
      <div class="panel content-page ">
        菜单信息：
        <a-form @submit="handleSubmit" class="inline-form">
          <a-form-item label="上级菜单" v-bind="validateInfos.menuParentName">
            <a-input v-model:value="formMenu.menuName" placeholder="请选择上级菜单"></a-input>
          </a-form-item>
          <a-form-item label="菜单名称" v-bind="validateInfos.menuName">
            <a-input v-model:value="formMenu.menuName" placeholder="请输入菜单名称"></a-input>
          </a-form-item>
          <a-form-item label="菜单编码" v-bind="validateInfos.menuCode">
            <a-input v-model:value="formMenu.menuCode" placeholder="请输入菜单编码"></a-input>
          </a-form-item>
          <a-form-item label="菜单图标" v-bind="validateInfos.imageLink">
            <a-input v-model:value="formMenu.imageLink" placeholder="请选择图标"></a-input>
          </a-form-item>
          <a-form-item label="路由地址" v-bind="validateInfos.htmlUrl">
            <a-input v-model:value="formMenu.htmlUrl" placeholder="请输入路由地址" style="width: 510px"></a-input>
          </a-form-item>
          <a-form-item label="是否生效" v-bind="validateInfos.htmlUrl">
            <a-input v-model:value="formMenu.htmlUrl" placeholder="请输入路由地址"></a-input>
          </a-form-item>

          <a-form-item label="是否显示" v-bind="validateInfos.htmlUrl">
            <a-input v-model:value="formMenu.htmlUrl" placeholder="请输入路由地址"></a-input>
          </a-form-item>

          <a-form-item :wrapper-col="{span: 14, offset: 4}">
            <a-button type="primary" @click="handleSubmit">确定</a-button>
          </a-form-item>
        </a-form>

        <div class="group">
          菜单功能：
          <a-button type="primary">添加功能</a-button>
          <div>菜单列表</div>
        </div>
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
        menuCode: [

        ],
        menuParentName: [
          {
            required: true
          }
        ],
        htmlUrl: [
          {
            required: true
          }
        ]
      }
    });

    const { resetFields, validate, validateInfos } = useForm(state.formMenu, state.formRules);
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
        validate()
          .then(() => {
            console.log(state.formMenu);
          })
          .catch(err => {
            console.log('error', err);
          });
      }
    };

    onMounted(() => {
      methods.getData();
    });
    return { ...methods, ...toRefs(state), resetFields, validate, validateInfos };
  }
});
</script>

<style lang="scss" scoped  >
.group {
  padding-top: 15px;
  border-top: 1px solid #3c3879;
}
</style>
