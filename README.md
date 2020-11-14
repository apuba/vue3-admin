<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-05 00:35:47
 * @LastEditTime: 2020-11-14 18:08:43
 * @LastEditors: 侯兴章
 * @Description: 
-->

# Vue3快速管理框架

菜单添加规则：
新建功能页面时，请把页面都放在pages 目录里，添加对应的功能模块后把对应的页面都统一放在views文件里，在添加菜单时如
示例：/mine/info  实际在调用页面地址的路径为：/pages/mine/views/info.vue
Vue组件名必需要以大写开头

路径 path 长度最多允许两级路径如： /mine/info 或 /mineInfo

1、由于应用固定有些数据模型，需要用户再次做数据模型的映身配置，请参考 dataMapping 文件夹

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
