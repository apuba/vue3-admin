import { defineComponent, onActivated, ref, reactive, unref, toRefs } from 'vue';
import router from '@/router';
import { ApiJob } from '../server/api';

import { useForm } from '@ant-design-vue/use';
import { IModelJob } from '../server/model';
import {ServSaveJob} from "@/pages/scheduler/job/server";
import {Icolumns, ItableProps} from "@/components/public/compTable";
import { EselectionType } from '@/components/public/compTable/types';
import {ApiDict} from "@/pages/base/dict/server/api";
import {mapperDictType} from "@/pages/base/dict/server/model";


export default defineComponent({
  setup() {
    let id = router.currentRoute.value.query.id; // 获取路由的传id
    let formParams = ref({}); // 查询表单对象，数据双向绑定

    const submitLoading = ref(false);

    let selectedRowKeys = ref(['']); // 当前表格选择的Kyes 数据双向绑定

    // 添加任务表单，
    const modelAddJobRef: IModelJob = reactive({
      quartzJobName: '',
      scheduleType: '',
      cornexpress: '',
      scheduleExpectStartDate: '',
      scheduleExpectEndDate: '',
    });
    const rulesRef = reactive({
      jobName: [
        {
          required: true,
          message: '请输入字典名称'
        }
      ],
      system: [
        {
          required: true,
          message: '来源系统'
        }
      ],
      module: [
        {
          required: true,
          message: '模块'
        }
      ],
      requestType: [
        {
          required: true,
          message: '请求地址'
        }
      ],
      requestUrl: [
        {
          required: true,
          message: '请输入请求地址'
        },
        {
          pattern: /^[a-zA-Z_]+$/,
          message: '只能输入英文与下划线'
        }
      ]
    });

    const { resetFields, validate, validateInfos } = useForm(modelAddJobRef, rulesRef);


    const onTimeRangeHandler =(value: any) => {
      console.log(value[0].format('YYYY-MM-DD HH:mm:ss'));
    }

    const addHandler = (e: MouseEvent) => {
      e && e.preventDefault();
      validate()
        .then(() => {
          console.log(modalRowKeys.value);
          submitLoading.value = true; // 按钮loading
          ServSaveJob(modelAddJobRef).then(res => {
            submitLoading.value = false;
            if (res.status) {
              resetFields(); // 重置表单
            }
            console.log(res);
          });
        })
        .catch(err => {
          console.log('error', err);
        });
    };

    const showModal = ref(false); // 显示模型弹窗
    // 打开选择弹窗
    const openModalHandler = () => {
      showModal.value = true;
    }



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

    const modalRowKeys = ref({});





    return { id, addHandler, onTimeRangeHandler,dataTableConfig,modalRowKeys, formParams, selectedRowKeys,validateInfos,modelAddJobRef,openModalHandler,showModal };
  }
});
