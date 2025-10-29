import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
