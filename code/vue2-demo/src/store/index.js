/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 12:03:52
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-06-20 15:49:12
 */
import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import web from './web';

Vue.use(Vuex);

export default new Vuex.Store({
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