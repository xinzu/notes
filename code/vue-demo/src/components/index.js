/*
 * @Description  : 定义自定义元素
 * @Author       : yanhuan
 * @Date         : 2023-10-09 16:44:01
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-10-09 16:44:01
 */
import { defineCustomElement } from "vue";
import PlasticButton from './PlasticButton.vue';

export function register() {
    customElements.define('plastic-button', defineCustomElement(PlasticButton));
}