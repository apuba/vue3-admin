/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-14 18:18:52
 * @LastEditTime: 2020-11-15 01:13:18
 * @LastEditors: 侯兴章
 * @Description: 
 */

/**
 * @description:  数据模型映射
 * @param {Array} originData 需要做映射的源数据
 * @param {any} config 映射配置表
 * @param {Array} result
 * @param {Array} children
 * @return {*}　返回清洗后映射结果的数据
 */
export const mappingHelper = <T>(originData: Array<any>, config: any, result: Array<T> = [], children?: Array<T>): Array<T> => {
    originData.forEach(item => {
        let obj: any = {};
        Object.keys(config).map(key => {
            obj[key] = item[config[key]];       
        })
        if (children) {
            children?.push(<T>obj)
        } else {
            result.push(<T>obj)
        }
        if (item.children && item.children.length) {
            obj.children = [];
            mappingHelper<T>(item.children, config, result, obj.children)
        }
    })
    return result;
}