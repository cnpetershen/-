// 导入 Vue 创建应用程序的方法
import {createApp} from 'vue'
// 导入 ElementPlus 组件库及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入主应用组件
import App from './App.vue'

import permissionDirective from '@/directive/permission'
// 导入路由配置
import router from './router'
// 导入 ElementPlus 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入权限控制工具
import '@/utils/privilege'
import VueFloatLabel from "vue-float-label";
import axios from 'axios'
import VueAxios from 'vue-axios'


// 创建 Vue 应用程序实例
const app = createApp(App);
// 注册 ElementPlus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 使用 ElementPlus 组件库
app.use(ElementPlus);
// 使用 VueAxios 插件
app.use(VueAxios, axios);

// 注册自定义指令
permissionDirective.install(app)

// 使用路由并挂载应用程序到页面上
app.use(router).use(VueFloatLabel).mount('#app');




