/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-12-08 04:21:50
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, provide, reactive, ref, toRefs, unref } from 'vue';
import { ApiDict } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
import { EselectionType } from '@/components/public/compTable/types';
import { mapperDictType } from '../server/model';

import CompAdd from './Add.vue'; // 导入ADD新增页面组件
export default defineComponent({
    name: 'dictIndex',
    components: {
        CompSearchForm,
        CompTable,
        CompAdd
    },
    setup() {
        let formParams = ref({}); // 查询表单对象，数据双向绑定
        const compAddVisible = ref(false);
        provide('addVisible', compAddVisible); // 向组件传递 参数
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

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'dictId',
            key: 'dictId'
        }, {
            title: '字典类型',
            dataIndex: 'dictType',
            key: 'dictType',

        }, {
            title: '字典类型名称',
            dataIndex: 'dictName',
            key: 'dictName',
            ellipsis: true,
        }, {
            title: '字典状态',
            dataIndex: 'dictLabelStatus',
            key: 'dictLabelStatus',

        }]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
            api: ApiDict.getDictTypeList,
            columns,
            rowKey: 'dictId',
            rowSelection: {
                type: EselectionType.radio
            },
            mapper: mapperDictType // 清洗数据的映射配置
        }

        // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
        const refTable = ref({ getData: Function });
        // 过滤表单的查询事件
        const searchFormClick = (params: any): void => {
            unref(refTable).getData(params); // 由于是ref对象，所以要使用refTable.value.getData进行调用        
        };


        // 添加字典弹框
        const addDictHandler = (): void => {
            compAddVisible.value = true;
            console.log('selectedRowKeys', unref(selectedRowKeys)); // 

            // console.log('formParams', unref(formParams));  // 拿到searchForm的数据  ， 使用unref 转化为对象
        }

        // 重载数据表格
        const reloadTable = (): void => {
            unref(refTable).getData();
        }

        let selectedRowKeys = ref(['']); // 当前表格选择的Kyes 数据双向绑定 
        provide('reloadTable', reloadTable); // 向子组件传递重载表格方法




        const showModal = ref(false); // 显示模型弹窗
        // 已选择弹窗返回的数据
        let modalRowKeys = ref([]);
        // 打开选择弹窗
        const openModalHandler = () => {
            showModal.value = true;
            console.log(unref(modalRowKeys)); // 打印获双向绑定后的已选择弹窗的参数
        }


        // 测试数据。可以删除
        const test = reactive({
            status: ['Y']
        })

        onMounted(() => {
            // 页面加载完成
        });
        return {
            refTable,
            formItems,
            dataTableConfig,
            columns,
            formParams,
            addDictHandler,
            reloadTable,
            searchFormClick,
            openModalHandler,
            selectedRowKeys,
            showModal,
            modalRowKeys,
            test

        };
    }
});
