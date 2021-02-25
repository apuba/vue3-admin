/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2021-02-25 22:45:10
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, provide, reactive, ref, toRefs, unref } from 'vue';
import { ApiDict } from '../server/api';
import { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import { Icolumns, ItableProps } from '@/components/public/compTable';
import { EselectionType } from '@/components/public/compTable/types';
import { IModelDictType, mapperDictType } from '../server/model';
import { appStore } from '@/store/modules/appStore';
import { TabItem } from '@/store/modules/appTypes';
import mapperHelper from '@/mapper'

import CompAdd from './AddDictType.vue'; // 导入ADD新增页面组件
import _ from 'lodash';
export default defineComponent({
    name: 'dictIndex',
    components: {
        CompAdd
    },
    setup() {
        let formParams = ref({}); // 查询表单对象，数据双向绑定
        const compAddVisible = ref(false);
        const dictTypeRow = ref({})
        provide('addVisible', compAddVisible); // 向组件传递 参数
        provide('dictTypeRow', dictTypeRow)
        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '字典名称',
                model: 'dictName'
            },
            {
                label: '字典类型',
                model: 'dictType'
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
            dataIndex: 'status',
            key: 'status',

        }, {
            title: '操作',
            dataIndex: 'dictId',
            slots: { customRender: 'operation' },
        }

        ]

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


        // 添加字典类型弹框
        const addDictTypeHandler = (): void => {
            compAddVisible.value = true;
            console.log('selectedRowKeys', unref(selectedRowKeys)); // 
            // console.log('formParams', unref(formParams));  // 拿到searchForm的数据  ， 使用unref 转化为对象
            dictTypeRow.value = {
                dictName: '',
                dictType: '',
                status: '0'
            }
        }

        // 新增字典事件
        const addDictHandler = (row: any) => {
            console.log(row);
            const menu: TabItem = {
                id: 'dictId' + row.record.dictId, //  (new Date()).getTime(),
                path: '/base/dict/DictList?dictType=' + row.record.dictType,
                name: row.record.dictName
            }
            appStore.commitAddTab(menu); // 打开tab
        }

        const editDictHandler = (row: any) => {
            console.log(row.record);
            compAddVisible.value = true;

            /*  const mapper = ['dictId', 'dictName', 'dictType', 'status']
             const data = mapperHelper<IModelDictType>(row.record, mapper)[0]; */
            //  debugger;
            // dictTypeRow.value = data;
            dictTypeRow.value = _.cloneDeep(row.record);
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
        const openModalHandler = (row: any) => {
            debugger
            // row 为当前表格行的数据 或 MouseEvent 所以要通过数据属性进行判断
            if(row.record) {
                dataTableConfig.requestParams = {
                    dictName:row.record.dictName
                }; // 传递查询参数
            }
            
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
            addDictTypeHandler,
            addDictHandler,
            reloadTable,
            searchFormClick,
            openModalHandler,
            editDictHandler,
            selectedRowKeys,
            showModal,
            modalRowKeys,
            test

        };
    }
});
