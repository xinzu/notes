/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 12:03:52
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-06-20 15:49:12
 */
import { createStore } from 'vuex';

export default createStore({
    state: {
        count: 0,
        loadNotice: false,
    },
    mutations: {
        setCount: (state, val) => {
            state.count = val;
        },
        setLoadNotice: (state, val) => {
            state.loadNotice = val;
        }
    }
});