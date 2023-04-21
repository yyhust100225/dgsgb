import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

// 注册全局图标组件
import * as antIcons from '@ant-design/icons-vue'
Object.values(antIcons).forEach((module) => {
  app.component(module.name, module)
});

app.use(Antd).use(store).use(router).mount('#app')