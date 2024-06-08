import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 确保这里的路径正确指向你的 router/index.js 文件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 方法一：添加全局错误处理钩子
app.config.errorHandler = (err,) => {
  if (err.message === 'ResizeObserver loop completed with undelivered notifications.') {
    // 忽略这个错误
    return;
  }
  console.error(err);
};

// 方法二：捕获全局未处理的 Promise 错误
window.addEventListener('unhandledrejection', event => {
  if (event.reason && event.reason.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.preventDefault();
  }
});

// 方法三：捕获全局 JavaScript 错误
window.addEventListener('error', event => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.preventDefault();
  }
});

// 方法四：覆盖全局 console.error 方法
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && args[0].message === 'ResizeObserver loop completed with undelivered notifications.') {
    // 忽略这个错误
    return;
  }
  originalConsoleError(...args);
};

// 使用Vue Router和Element Plus
app.use(router);
app.use(ElementPlus);

// 挂载应用
app.mount('#app');