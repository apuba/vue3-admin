/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-24 01:57:18
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ServiceGetDictList } from '../server';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import { ModelDictList } from '../server/model';
import { Icolumns } from '@/components/public/compTable';

export default defineComponent({
    name: 'dict',
    components: {
        CompSearchForm
    },
    setup() {
        // 表单绑定的对象
        const formData = reactive({});
        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '字典名称',
                model: 'dictName',
                rules: [{
                    required: true,
                    message: '请输名称'
                }]
            },
            {
                label: '字典类型',
                model: 'dictType',
                rules: [{
                    required: true,
                    message: '请输字典类型'
                }]
            }
        ]

        // 表格的数据
        const tableData = reactive({ data: [] }); // reactive 请尽量是一个对象

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'dictId',
            key: 'dictId'
        }, {
            title: '字典类型名称',
            dataIndex: 'dictName',
            key: 'dictName'
        }, {
            title: '字典类型',
            dataIndex: 'dictType',
            key: 'dictType',
            ellipsis: true,
        }]

        const handleSubmit = (): void => {
            console.log('ServiceGetDictList');
        };
        onMounted(() => {
            ServiceGetDictList({ dictSort: '1' }).then(res => {
                tableData.data = res.data
                console.log(tableData)
            });
        });
        return { handleSubmit, formItems, formData, tableData, columns };
    }
});