/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-26 17:44:49
 * @LastEditTime: 2021-03-28 16:04:10
 * @LastEditors: 侯兴章
 * @Description: 
 */



import { createVNode, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { ServiceGetMenus, ServSaveAndUpdateMenu, ServeGetMenuButtons, ServDeleteMenu } from '../server';
import { IButtonProps, IMenuModel, IRequestMenuModel } from '../server/model';
import { useForm } from '@ant-design-vue/use';
import CompDictionaries from '@/components/public/compDictionaries/CompDictionaries.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { pinyin } from 'pinyin-pro';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, CloseCircleFilled, EditFilled, EditOutlined, CloseOutlined } from '@ant-design/icons-vue';
import _ from 'lodash';
import { resetObject } from '@/common/helper/tools';


/** 创建表单初始化数据
 * @description:
 * @param {*}
 * @return {*}
 */
const createFormData = (): IMenuModel => {
    return {
        menuName: '',
        menuId: '',
        icon: '',
        color: '',
        htmlUrl: '',
        menuParentId: undefined,
        menuParentName: '',
        menuCode: '',
        enabled: 'Y',
        menyType: 10,
        endDateActive: '2000/11/11',
        startDateActive: '2000/11/11',
        orderCode: 0,
        buttonArr: [] as Array<IButtonProps>
    };
};

// 创建权限按钮
const createButton = (): IButtonProps => {
    return {
        resourceName: '',
        resourceCode: '',
        resIcon: '',
        buttonUrl: '',
        orderNo: 0,
        resourceType: '',
    }
}

export default defineComponent({
    components: { CompDictionaries, PlusOutlined, EditFilled, CloseCircleFilled, EditOutlined, CloseOutlined },
    name: 'Menus',
    setup() {
        const state = reactive({
            saveLoading: false, // 保存loading 状态
            defaultExpandAll: true,
            menuData: [] as Array<IMenuModel>,
            replaceFields: {
                children: 'children',
                key: 'menuId',
                title: 'menuName'
            },
            selectTreeReplace: {
                children: 'children',
                title: 'menuName',
                key: 'menuId',
                value: 'menuId'
            },

            actionType: 'add', // 操作类型，add-新增、del-删除、update-编辑
            actionTypeName: '添加菜单',
            showButtonModal: false,
            confirmLoading: false,
            formMenu: createFormData(),
            buttonProp: createButton(),

            buttonFormConfig: {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            },
            buttonFormRules: {
                resourceName: [
                    {
                        required: true,
                        message: '请输入名称'
                    }
                ],
                resourceCode: [
                    {
                        required: true,
                        message: '请输入编码'
                    }
                ],
                resourceType: [
                    {
                        required: true,
                        message: '请选择按钮类型'
                    }
                ],
                buttonUrl: [
                    {
                        required: true,
                        message: '请输入API地址'
                    }
                ]
            },
            formRules: {
                menuName: [
                    {
                        required: true,
                        message: '请输入菜单名称'
                    }
                ],
                menuCode: [
                    {
                        required: true,
                        message: '请输入菜单编码'
                    }
                ],
                menuParentId: [
                    {
                        required: true,
                        message: '请选择父级菜单'
                    }
                ]
            }
        });


        const { resetFields, validate, validateInfos } = useForm(state.formMenu, state.formRules);
        const { validate: buttonValidate, validateInfos: buttonValidateInfos } = useForm(state.buttonProp, state.buttonFormRules);

        const methods = {
            // 添加按钮
            addButtonHandler: () => {
                buttonValidate().then(() => {
                    const button = state.formMenu.buttonArr?.filter(item => item.resourceCode === state.buttonProp.resourceCode);
                    if (!button?.length) {
                        state.formMenu.buttonArr?.push(state.buttonProp);
                    }
                    console.log(state.buttonProp)
                    state.buttonProp = createButton();
                    state.showButtonModal = false;

                }).catch((err) => {
                    console.log(err);
                });
            },
            // 删除按钮 
            delButtonHandler: (button: IButtonProps) => {
                const index = _.findIndex(state.formMenu.buttonArr, item => item.resourceCode === button.resourceCode);
                state.formMenu.buttonArr?.splice(index, 1);
            },
            // 编辑按钮 
            editButtonHandler: (button: IButtonProps) => {
                state.buttonProp = button;
                state.showButtonModal = true;
            },
            getData: () => {
                ServiceGetMenus().then(res => {
                    state.menuData = res;
                    console.log(res);
                });
            },
            onSelect: (selectedKeys: any, node: any) => {
                // 菜单选中事件
                // state.formMenu = createFormData();
                resetFields();
                state.actionType = 'add';
                state.actionTypeName = '添加菜单';
                const parent: IMenuModel = node.selectedNodes[0].props;
                state.formMenu.menuParentName = parent.menuName;
                state.formMenu.menuParentId = parent.menuId;
                console.log(state.formMenu);
            },
            handleSubmit: () => {
                validate()
                    .then(() => {
                        // console.log(state.formMenu);
                        state.saveLoading = true;
                        ServSaveAndUpdateMenu(state.formMenu).then(res => {
                            state.saveLoading = false;
                            message.success(state.actionTypeName +  res.msg);
                            if (res.code === 200) {
                                resetFields();
                                state.formMenu = resetObject(state.formMenu, createFormData()); // 重置表单对象
                                methods.getData(); // 重载数据
                            }
                        })
                    })
                    .catch(err => {
                        console.log('error', err);
                    });
            },

            buttonNameChange: (val: string) => {
                const py = pinyin(val, { toneType: 'none', type: 'array' }) as Array<string>;
                if (!py.length) return;
                state.buttonProp.resourceCode = py.join('_').toLocaleUpperCase();
            },
            menuNameChange: (val: any) => {
                const py = pinyin(val, { toneType: 'none', type: 'array' }) as Array<string>;
                if (!py.length) return;
                state.formMenu.menuCode = py.join('_').toLocaleUpperCase();
            },
            // 菜单树右键
            onRightClickHandler: (node: IMenuModel, type: string) => {
                if (type === 'update') {
                    state.actionType = 'update';
                    state.actionTypeName = '修改菜单';
                    resetFields();
                    state.formMenu = resetObject(state.formMenu, node);
                    // 查询菜单下的按钮
                    ServeGetMenuButtons(node.menuId as number).then(res => {
                        if (res.code === 200) {
                            state.formMenu.buttonArr = res.data;
                        }
                    })
                } else {
                    Modal.confirm({
                        title: '删除警告',
                        icon: createVNode(ExclamationCircleOutlined),
                        content: '您确认要删除此菜单吗？',
                        okText: '确认',
                        cancelText: '取消',
                        okType: 'danger',
                        onOk() {
                            console.log('请执行删除逻辑');
                            ServDeleteMenu(node.menuId as number).then(res => {
                                message.success('删除' + res.msg);
                                if (res.code === 200) {
                                    methods.getData(); // 重载数据
                                }
                            })
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    });
                }

            }
        };

        // 监听按钮类型
        watch(() => state.buttonProp.resourceType, (nval, oval) => {
            state.buttonFormRules.buttonUrl[0].required = nval === 'method';
        })
        onMounted(() => {
            methods.getData();
        });
        return { ...methods, ...toRefs(state), resetFields, validate, validateInfos, buttonValidate, buttonValidateInfos };
    }
});