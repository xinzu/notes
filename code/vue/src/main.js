import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/styles/tailwind.css'

import store from './store';
import router from './router';

const app = createApp(App)
app.use(store).use(router).mount('#app');
// 获取原型
const prototype = app.config.globalProperties;
// 静态获取图片
prototype.getImageUrl = (name) => new URL(`/src/assets/${name}`, import.meta.url).href;