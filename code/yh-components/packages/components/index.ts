/*
 * @Description  : 导出全局组件
 * @Author       : yanhuan
 * @Date         : 2024-01-04 17:09:25
 * @LastEditors  : yanhuan
 * @LastEditTime : 2024-01-04 17:09:25
 */

import components from "@yh-components/components/components";
import { App } from "vue";


export default {
    install: (app: App) => {
        components.forEach((c) => app.use(c))
    },
};