/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-15 21:31:46
 * @LastEditTime: 2020-11-16 00:41:52
 * @LastEditors: 侯兴章
 * @Description:  随机创建元素动画
 */


/**
 * @description:  随机创建元素
 * @return {*}
 */
export const createEle = (long: number, index: number) => {
    let span = document.createElement('span');
    span.id = `eff-${new Date().getTime}-${index}`;
    span.className = 'span-eff';
    let top = Math.floor(Math.random() * window.innerHeight);
    let left = Math.floor(Math.random() * window.innerWidth);    
    span.style.top = top + 'px';
    span.style.left = left + 'px';
    span.style.position = 'absolute';
    setTimeout(() => {
        document.body.appendChild(span);
        setTimeout(() => {
            let y = Math.floor(Math.random() * 2);                   
            top = y === 0 ? (top + Math.floor(Math.random() * 60)): (top - Math.floor(Math.random() * 60));
            left= y=== 0 ? (left + Math.floor(Math.random() * 60)) : left - Math.floor(Math.random() * 60);
            span.style.top = top + 'px';
            span.style.left = left + 'px';
        }, 200)

        setTimeout(() => {
            document.body.removeChild(span); // 移除元素
            createEle(long, index); // 重新建元素
        }, 6 * 1000) // 6秒为css 动画的时长

    }, long * 1000)
}

export default class MakeEffect {
    minNum: number;
    maxNum: number
    constructor(minNum: number, maxNum: number) {
        this.minNum = minNum;
        this.maxNum = maxNum;
    }

    init() {
        const total = Math.floor(Math.random() * this.minNum + this.maxNum); //随机生成数量
        for (let i = 0; i < total; i++) {
            const long = Math.floor(Math.random() * 10) + 1; // 10S 
            createEle(long, i); // 创建对象
        }
    }
    clear() {
        const allEle = document.querySelectorAll('.span-eff');
        allEle.forEach(item => {
            document.body.removeChild(item);
        })
    }

}