import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import ElementPlus, { dayjs } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ru from 'element-plus/es/locale/lang/ru'
import 'element-plus/dist/index.css'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(ElementPlus, { locale: ru }).use(router).use(pinia).mount('#app')
