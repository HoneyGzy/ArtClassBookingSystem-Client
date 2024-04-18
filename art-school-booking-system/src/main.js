import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 确保这里的路径正确指向你的 router/index.js 文件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');