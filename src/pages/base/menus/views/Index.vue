<!--
 * @Author
  components: { CompDictionaries },: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 21:33:17
 * @LastEditTime: 2021-03-28 16:06:24
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-row gutter="10" style="heigth: 100%">
    <a-col :span="6">
      <div class="panel content-page">
        <a-tree
          :show-line="true"
          :treeData="menuData"
          :showIcon="false"
          :default-expand-all="true"
          :replaceFields="replaceFields"
          @select="onSelect"
        >
          <template #title="node">
            <a-dropdown :trigger="['contextmenu']" size="small">
              <span>{{ node.menuName }}</span>
              <template #overlay>
                <a-menu @click="({ key: type }) => onRightClickHandler(node, type)">
                  <a-menu-item key="update">修改：{{ node.menuName }}</a-menu-item>
                  <a-menu-item key="del">删除：{{ node.menuName }}</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tree>
      </div>
    </a-col>
    <a-col :span="18">
      <div class="panel content-page">
        菜单信息：
        <a-form @submit="handleSubmit" class="inline-form">
          <a-form-item label="上级菜单" v-bind="validateInfos.menuParentId">
            <a-tree-select
              v-model:value="formMenu.menuParentId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="menuData"
              placeholder="请选择父级菜单"
              tree-default-expand-all
              :replaceFields="selectTreeReplace"
            ></a-tree-select>
          </a-form-item>
          <a-form-item label="菜单名称" v-bind="validateInfos.menuName" has-feedback>
            <a-input
              v-model:value="formMenu.menuName"
              placeholder="请输入菜单名称"
              @change="menuNameChange(formMenu.menuName)"
              maxlength="10"
            ></a-input>
          </a-form-item>
          <a-form-item label="菜单编码" v-bind="validateInfos.menuCode" has-feedback>
            <a-input v-model:value="formMenu.menuCode" placeholder="请输入菜单编码" maxlength="100"></a-input>
          </a-form-item>
          <a-form-item label="菜单图标" v-bind="validateInfos.icon" has-feedback>
            <a-input v-model:value="formMenu.icon" placeholder="请选择图标" maxlength="20"></a-input>
          </a-form-item>
          <a-form-item label="路由地址" v-bind="validateInfos.htmlUrl" has-feedback>
            <a-input
              v-model:value="formMenu.htmlUrl"
              placeholder="请输入路由地址"
              style="width: 510px"
              maxlength="100"
            ></a-input>
          </a-form-item>

          <a-form-item label="排序">
            <a-input v-model:value="formMenu.orderCode" placeholder="请输入数字" type="number"></a-input>
          </a-form-item>

          <a-form-item label="是否生效" v-bind="validateInfos.enabled">
            <CompDictionaries type="radio" dictType="sys_yes_no" v-model:value="formMenu.enabled" />
          </a-form-item>

          <div class="group but-container">
            <a-button type="primary" size="small" @click="showButtonModal = true" class="fl">
              <PlusOutlined />功能按钮
            </a-button>
            <div class="btn-list">
              <span v-for="(item, index) in formMenu.buttonArr" :key="index" class="btn-item">
                <CloseOutlined class="remove btn" :style="{fontSize: '12px'}" @click="delButtonHandler(item)" />
                <EditOutlined class="edit btn" :style="{fontSize: '12px'}" @click="editButtonHandler(item)" />
                <a-button size="small">
                  <span class></span>
                  {{item.resourceName}}
                </a-button>
              </span>
            </div>
          </div>

          <div class="p15" v-show="actionTypeName">
            <a-button type="primary" @click="handleSubmit" :loading="saveLoading">{{ actionTypeName }}</a-button>
          </div>
        </a-form>

        <a-modal
          title="添加功能按钮"
          v-model:visible="showButtonModal"
          :confirm-loading="confirmLoading"
          maskClosable="false"
          @ok="addButtonHandler"
        >
          <a-form
            @submit="addButtonHandler"
            :label-col="buttonFormConfig.labelCol"
            :wrapper-col="buttonFormConfig.wrapperCol"
          >
            <a-form-item label="按钮名称" v-bind="buttonValidateInfos.resourceName" has-feedback>
              <a-input
                size="small"
                maxlength="10"
                v-model:value="buttonProp.resourceName"
                @change="buttonNameChange(buttonProp.resourceName)"
              />
            </a-form-item>

            <a-form-item
              label="按钮编码"
              v-bind="buttonValidateInfos.resourceCode"
              maxlength="100"
              has-feedback
            >
              <a-input size="small" v-model:value="buttonProp.resourceCode" />
            </a-form-item>

            <a-form-item
              label="按钮类型"
              v-bind="buttonValidateInfos.resourceType"
              maxlength="100"
              has-feedback
            >
              <CompDictionaries
                type="radio"
                dictType="sys_resource_resource_type"
                v-model:value="buttonProp.resourceType"
              />
            </a-form-item>
            <a-form-item
              label="API服务地址"
              v-bind="buttonValidateInfos.buttonUrl"
              has-feedback
              v-if="buttonProp.resourceType === 'method' "
            >
              <a-input size="small" v-model:value="buttonProp.buttonUrl" />
            </a-form-item>

            <a-form-item label="按钮图标">
              <a-input size="small" v-model:value="buttonProp.resIcon" maxlength="20" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" src="./Index">

</script>

<style lang="scss" scoped  >
.btn-list {
  text-align: left;
}
.but-container {
  padding: 20px;
  min-height: 68px;
}
.btn {
  position: absolute;
  display: none;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: lightblue;
  border-radius: 14px;
  z-index: 10;
  vertical-align: middle;
  svg {
    vertical-align: middle;
  }
}
.btn-item {
  margin-left: 20px;
  position: relative;
  &:hover .btn {
    display: inline-block;
  }
  .remove {
    top: 10px;
    right: -10px;
  }
  .edit {
    bottom: 10px;
    right: -10px;
  }
}
.group {
  padding-top: 15px;
  border-top: 1px solid #3c3879;
}
</style>
