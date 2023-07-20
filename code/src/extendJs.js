/*
 * @Description  : vue2 extend替代方案
 * @Author       : yanhuan
 * @Date         : 2023-06-19 12:03:14
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-06-20 17:05:54
 */
import { createApp } from "vue";
import store from './store'
import router from './router'
import Notice from "./Notice.vue";

export default (props) => {
    //将options参数传入，并将Notice组件转换成虚拟DOM，并赋值给app
    const app = createApp(Notice, {
        ...props,
    });
    //render函数的作用就是将Notice组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
    app.use(store).use(router).mount('#notice');
};