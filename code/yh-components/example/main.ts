import { createApp } from 'vue';
import App from './src/App.vue';
import YHButton from '@yh-components/components/button';

const app = createApp(App);
app.use(YHButton).mount('#app');