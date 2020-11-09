
/* URL 字典
 * @Author: 侯兴章
 * @Date: 2020-11-05 22:25:18
 * @LastEditTime: 2020-11-05 22:25:30
 * @LastEditors: 侯兴章
 * @Description: 
 */
interface UrlDict {
    [key: string]: {
        [key: string]: string;
    };
}

const urlDict: UrlDict = {
    Basic: {
        GetDemo: 'admin/get',
        PostDemo: 'admin/post',
    }
};

const getUrl = (biz: string, UrlName: string): string => {
    try {
        const bizKeys = Object.keys(urlDict);
        if (bizKeys.indexOf(biz) < 0) {
            throw new Error('对象 字典不存在');
        }
        let hostname = urlDict[biz][UrlName];
        if (!hostname) {
            throw new Error('URL 字典不存在');
        }
        if (hostname.substr(0, 1) === '/') {
            hostname = hostname.substr(1);
        }
        return hostname;
    } catch (err) {
        console.error(err);
        return '';
    }
};

export default getUrl;