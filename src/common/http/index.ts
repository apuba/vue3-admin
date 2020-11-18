/* axios基础构建
 * @Author: 侯兴章
 * @Date: 2020-11-05 22:25:04
 * @LastEditTime: 2020-11-06 00:26:09
 * @LastEditors: 侯兴章
 * @Description: 
 */


import Vue from 'vue';
// import getUrl from './config';
import instance from './instance';
import { AxiosRequest, CustomResponse } from './types';
import { message } from 'ant-design-vue';
import storage from '@/common/storage';

class Abstract {
    // console.log(process.env.VUE_APP_BASE_API_URL)
    // 外部传入的baseUrl
    protected baseURL: string = process.env.VUE_APP_BASE_API_URL;

    // 自定义header头
    protected headers: object = {
        // ContentType: 'application/json;charset=UTF-8'
        // ContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    private apiAxios({ baseURL = this.baseURL, headers = this.headers, method, url, data, params, responseType }: AxiosRequest): Promise<CustomResponse> {
        const token = storage().get('token');
        //  Authorization
        if (token) {
            headers.Authorization = token
        }
        // url解析
        const reg = /^http(s)?:/; // 是否为完整的绝对路径
        baseURL = reg.test(url) ? '' : baseURL;
        return new Promise((resolve, reject) => {
            instance({
                baseURL,
                headers,
                method,
                url,
                params,
                data,
                responseType
            }).then((res) => {
                // 200:服务端业务处理正常结束
                if (res.status === 200) {
                    if (res.data.success || res.data.code == 200 || res.data.status === 'S') {
                        // resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
                        resolve(res.data)
                    } else {
                        message.error(res.data?.msg || (url + '请求失败'));
                        resolve({ status: false, message: res.data?.msg || (url + '请求失败'), data: res.data?.data, origin: res.data });
                    }
                } else {
                    resolve({ status: false, message: res.data?.msg || (url + '请求失败'), data: null });
                }
            }).catch((err) => {
                const msg = err?.data?.msg || err?.message || (url + '请求失败');
                message.error(msg)
                reject({ status: false, msg, data: null });
            });
        });
    }

    /**
     * GET类型的网络请求  
     */
    get(obj: string | AxiosRequest, params: any, headers?: any) {
        let url;
        if (typeof obj === 'object') {
            return this.getReq(obj);
        } else {
            url = obj;
        }
        return this.apiAxios({ headers, method: 'GET', url, params });
    }

    getReq({ headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ headers, method: 'GET', url, data, params, responseType });
    }
    /**
     * POST类型的网络请求
     */
    post(obj: string | AxiosRequest, data: any, headers?: any) {
        let url;
        if (typeof obj === 'object') {
            return this.postReq(obj);
        } else {
            url = obj;
        }
        return this.apiAxios({ headers, method: 'POST', url, data });
    }
    postReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'POST', url, data, params, responseType });
    }
    /**
     * PUT类型的网络请求
     */
    put({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType });
    }

    /**
     * DELETE类型的网络请求
     */
    del({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType });
    }
}


export { AxiosRequest }
export default new Abstract();