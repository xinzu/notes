/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 17:51:26
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-20 12:57:29
 */
import {
    createRouter, createWebHashHistory
} from 'vue-router';

export default createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'main',
        alias: '/home',
        component: () => import('@/Main.vue'),
        children: [{
            path: '/overview/:id?',
            name: 'overview',
            component: () => import('@/components/Overview.vue'),
            children: [{
                path: '/overview1',
                name: 'overview1',
                component: () => import('@/views/overview/Overview1.vue'),
            }, {
                path: 'overview2',
                name: 'overview2',
                component: () => import('@/views/overview/Overview2.vue'),
            }]
        }, {
            path: '/comprehensive',
            name: 'comprehensive',
            component: () => import('@/components/Comprehensive.vue'),
        }]
    }],
    scrollBehavior: () => {
        return { top: 50, behavior: 'smooth' }
    },
})