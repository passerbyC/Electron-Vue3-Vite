import "./styles/index.scss";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)

app.use(ElementPlus, { locale: zhCn, })

app.config.errorHandler = (err, vm, info) => {
    if (err) {
      console.log(err)
      ElMessage.error(err.message)
    }
}
app.mount('#app')
