import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入svg组件
import svgIcon from '@/assets/icons'
import i18n from './lang'
//#region  css
import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss' // global css
//#endregion
// 路由守卫
import '@/router/permission'
// 开启mock
// import '@/mock'

const app = createApp(App)
svgIcon(app)

app.use(store).use(router).use(i18n).mount('#app')
