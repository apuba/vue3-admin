/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-10 23:05:49
 * @LastEditTime: 2020-12-11 01:44:42
 * @LastEditors: 侯兴章
 * @Description: 
 */


import { defineComponent, onActivated, ref, reactive, unref, toRefs } from 'vue';
import router from '@/router';
import { onBeforeRouteUpdate } from 'vue-router';
import { IFormItems } from '@/components/public/compSearchForm';
import { EselectionType, Icolumns, ItableProps } from '@/components/public/compTable/types';
import { ApiDict } from '../server/api';
export default defineComponent({
    setup() {
        let id = router.currentRoute.value.query.id; // 获取路由的传id
        let formParams = ref({}); // 查询表单对象，数据双向绑定

        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '字典名称',
                model: 'dictLabel',
                /*  rules: [{
                     required: true,
                     message: '请输字典名称'
                 }] */
            },
            {
                label: '字典值',
                model: 'dictValue',
            },
            {
                label: '字典类型',
                model: 'dictType',
            }
        ]

        let selectedRowKeys = ref(['']); // 当前表格选择的Kyes 数据双向绑定 

        // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
        const refTable = ref({ getData: Function });
        // 所有事件挂载
        const methods = reactive({
            delDictHandler: () => {
                console.log('删除字典')
            },
            editDictHandler: () => {
                console.log('修改字典')
            },
            searchFormClick: (params: any): void => {
                // 过滤表单的查询事件
                unref(refTable).getData(params); // 由于是ref对象，所以要使用refTable.value.getData进行调用        
            }
        })


        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'dictDataId',
        },
        {
            title: '字典类型',
            dataIndex: 'dictType',
        },
        {
            title: '字典名称',
            dataIndex: 'dictLabel',
            ellipsis: true,
        },
        {
            title: '字典值',
            dataIndex: 'dictValue',
            ellipsis: true,
        },
        {
            title: '字典状态',
            dataIndex: 'status',
        }, {
            title: '操作',
            dataIndex: 'dictId',
            slots: { customRender: 'operation' },
        }

        ]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
            api: ApiDict.getDictList,
            columns,
            rowKey: 'dictDataId',
            requestParams: { dictDataId: id },
            rowSelection: {
                type: EselectionType.radio
            },
            // mapper: mapperDictType // 清洗数据的映射配置
        }



        /*   watch(router.currentRoute, (nval, oval) => {
        id.value = nval.query.id; // 监听路由参数切换。数据不变化
      });
   */
        onBeforeRouteUpdate((to, from, next) => {
            console.log(to);
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            id = to.query.id;
            methods.searchFormClick({ dictDataId: id });
            next();
        });

        return { refTable, id, formItems, formParams, dataTableConfig, selectedRowKeys, ...toRefs(methods) };
    }
});