/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-15 21:31:46
 * @LastEditTime: 2020-11-16 22:34:45
 * @LastEditors: 侯兴章
 * @Description:  随机创建元素动画,
 * 粒子属性查看对应的css进行设置
 */

// const animationDuration = '6s'; // 动画持续时间
export default class MakeEffect {
    minNum: number; // 粒子最少数量 
    maxNum: number;  // 粒子最多数量 

    step: number = 60;  // 粒子移动的步长距离
    stopEff: Boolean = false;
    constructor(minNum: number, maxNum: number, step?: number) {
        this.minNum = minNum;
        this.maxNum = maxNum;
        step && (this.step = step);
    }
    init() {
        this.stopEff = false;
        const total = Math.floor(Math.random() * this.minNum + this.maxNum); //随机生成数量
        for (let i = 0; i < total; i++) {
            const long = Math.floor(Math.random() * 10) + 1; // 10S 
            this.createEle(long, i); // 创建对象
        }
    }
    clear() {
        this.stopEff = true;

        const allEle = document.querySelectorAll('.span-eff');
        allEle.forEach(item => {
            document.body.removeChild(item);
        })
    }
    createEle(long: number, index: number) {
        let span = document.createElement('span');
        const id = `eff-${new Date().getTime()}-${index}`;
        span.id = id;
        span.className = 'span-eff';
        let top = Math.floor(Math.random() * window.innerHeight);
        let left = Math.floor(Math.random() * window.innerWidth);
        span.style.top = top + 'px';
        span.style.left = left + 'px';
        // span.style.animationDirection = animationDuration;
        // span.style.transitionDuration = animationDuration
        span.style.position = 'absolute';

        setTimeout(() => {
            if (this.stopEff) return; // 停止创建元素
            document.body.appendChild(span);
            setTimeout(() => {
                let y = Math.floor(Math.random() * 2);
                // 粒子移动步长
                top = y === 0 ? (top + Math.floor(Math.random() * this.step)) : (top - Math.floor(Math.random() * this.step));
                left = y === 0 ? (left + Math.floor(Math.random() * this.step)) : left - Math.floor(Math.random() * this.step);
                span.style.top = top + 'px';
                span.style.left = left + 'px';
            }, 200)

            setTimeout(() => {
                //  document.body.removeChild(span); // 移除元素
                const node = document.querySelector('#' + id);
                node && document.body.removeChild(node);
                const newlong = Math.floor(Math.random() * 10) + 1; // 10S 
                !this.stopEff && this.createEle(newlong, index); // 重新建元素
            }, 6 * 1000) // 6秒为css 动画的时长

        }, long * 1000)
    }

}