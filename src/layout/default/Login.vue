<!--
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:13:21
 * @LastEditTime: 2020-11-19 01:34:08
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="login" :style="loginStyle">
    <div class="body">
      <div class="container">
        <div class="tool">
          <a href="#">忘记密码</a>
          |
          <a href="#">免费注册</a>
        </div>
        <div class="app-name">
          <div class="logo">
            <img src="@/assets/logo.png" />
          </div>
          <div>
            <h2>欢迎使用大前端框架</h2>
            <h1>VUE3.0大型系统前端框架</h1>
          </div>
        </div>

        <a-form class="form" :wrapper-col="wrapperCol">
          <a-form-item v-bind="validateInfos.userName">
            <a-input v-model:value="formRef.userName" size="large" placeholder="您的登录名" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.password">
            <a-input-password v-model:value="formRef.password" size="large" placeholder="您的密码" />
          </a-form-item>
          <div>
            <a-button type="primary" @click="loginHandler" size="large" shape="round" block>登录</a-button>
          </div>
        </a-form>
      </div>
    </div>
    <div class="foot">
      <span class="copyright">Copyright © 2020 悟空云科技有限公司版权所有</span>
    </div>
  </div>
</template>

<script lang="ts">
import '@/effect/eff.scss';

import { defineComponent, onMounted, onUnmounted, reactive, toRaw } from 'vue';
import { DTOlogin } from '@/service/appModel';

import MakeEffect from '@/effect';
import { useForm } from '@ant-design-vue/use';
import { appStore } from '@/store/modules/appStore';

const eff = new MakeEffect(38, 100, 150); // 实例一个28-88个粒子的动画效果
export default defineComponent({
  name: 'defaultlogin',
  setup() {
    const appName = appStore.title;
    const formRef: DTOlogin = reactive({
      password: '123456',
      userName: 'admin'
    });
    const rulesRef = reactive({
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      userName: [
        {
          required: true,
          message: '请输入用户名'
        }
      ]
    });
    const loginStyle = {
      backgroundImage: 'url(' + require('../../../public/img/bg1.jpg') + ')'
    };
    const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);

    // 登录事件
    const loginHandler = (e: MouseEvent) => {
      e.preventDefault();
      validate()
        .then(() => {
          appStore.actionLogin(formRef);
        })
        .catch(err => {
          console.log('error', err);
        });
    };

    onMounted(() => {
      eff.init(); // 初始化粒子动画效果
    });
    onUnmounted(() => {
      eff.clear(); // 清除粒子动画
    });
    return { appName, loginStyle, formRef, rulesRef, loginHandler, resetFields, validate, validateInfos, wrapperCol: { span: 24 } };
  }
});
</script>

<style lang="scss" >
@import './var.scss';
@import '@scss/base.scss';
@import './style.scss';
.login {
  background-color: $primary-color;
  height: 100vh;
  display: flex;
  flex-flow: column;
  // background-image: url('/public/bg1.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.body {
  text-align: center;
  display: flex;
  flex: 1;

  .container {
    align-self: center;
    margin: 0 auto;
    .tool {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #999;
      a {
        padding: 0 5px;
        display: inline-block;
      }
    }
  }
  .form {
    width: 260px;
    padding-top: 30px;
    margin: 0 auto;
    input,
    .ant-input-affix-wrapper {
      font-size: 14px;
      border-radius: 30px;
      background-color: $transition-color-4;
      border: 1px solid $transition-color-3;
      color: $white;
      caret-color: $white;
      &:hover {
        background: $transition-color-1;

        &::-webkit-input-placeholder {
          color: #666;
        }
        input {
          border: none;
          border-color: $teal;
          background-color: $transition-color-4;
        }
      }
      input {
        border: none;
        background-color: $transition-color-4;
      }
    }

    .ant-input:placeholder-shown {
      color: #333;
    }
    .ant-input-password-icon {
      color: #999;
    }
  }
  .app-name {
    h1,
    h2 {
      color: #ccc;
    }
    h1 {
      font-weight: bold;
    }
    .logo {
      margin-bottom: 20px;
      img {
        max-width: 100px;
        max-height: 100px;
      }
    }
  }
}

.foot {
  height: 12%;
  background-color: #0a091f54;
  color: $transition-color-3;
  text-align: center;
  display: flex;
}
.copyright {
  align-self: center;
  margin: 0 auto;
}
</style>
