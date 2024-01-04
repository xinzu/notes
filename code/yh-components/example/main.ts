import { createApp } from 'vue';
import App from './src/App.vue';
// import YHButton from '@yh-components/components/button';
import yhComponents from '@yh-components/components';

const app = createApp(App);
app.use(yhComponents).mount('#app');