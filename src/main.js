import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import Loading from "../src/views/component/loading/index"
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import   { focusDirective }   from "../src/diresctive/index";

const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)
app.directive('focus', focusDirective)

app.use(ElementPlus)
app.use(Loading)

app.mount('#app')
export default  app