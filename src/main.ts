import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'
//引入elementplus样式的几种方式
//1.全局引入样式  import 'element-plus/dist/index.css'
//2.组件样式引入 import 'element-plus/theme-chalk/el-message.css'
//3. 使用vite-plugin-style-import 自动引入 (记得也要安装consola包)
import router from '@/router/index'
import pinia from './store'
import registerIcons from './assets/global/register-icons'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
createApp(App)
  .use(router)
  .use(pinia)
  .use(registerIcons)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app')
