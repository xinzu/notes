/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 12:03:52
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-06-20 15:49:12
 */
import { createStore } from 'vuex';
import user from './user';
import web from './web';

export default createStore({
    modules: {
        user,
        web
    },
    getters: {
        test() {
            return 'test';
        }
    }
});