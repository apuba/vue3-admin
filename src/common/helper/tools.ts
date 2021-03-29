/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-28 15:13:54
 * @LastEditTime: 2021-03-28 15:22:06
 * @LastEditors: 侯兴章
 * @Description: 
 */

export const resetObject = (obj: any, newObj: any) => {
    if (!obj) return;
    Object.keys(obj).forEach(key => {
        if (newObj) {
            obj[key] = newObj[key] || '';
        } else {
            obj[key] = ''
        }
    })
    return obj;
}