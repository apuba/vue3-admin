/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-10-31 22:33:21
 * @LastEditors: 侯兴章
 * @Description: 
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare interface Window {
  __app__: any
}