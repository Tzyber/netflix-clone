import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import router from './router'

import './assets/main.css'
import App from "./App.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')