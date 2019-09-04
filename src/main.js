import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'vant/lib/index.css'
import './styles/index.less'

Vue.use(Vant)
Vue.use(VeeValidate, {
  events: ''
})
Validator.localize('zh_CN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
