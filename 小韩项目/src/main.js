import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// 引入vuex
import Vuex from 'vuex'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import quillEditor from 'vue-quill-editor'

// 引入导出excel文件依赖
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(quillEditor)

Vue.use(ElementUI, { locale })

//父组件  子组件传值的中间空实例
export var bus=new Vue()

Vue.config.productionTip = false
// 使用vuex
Vue.use(Vuex)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
