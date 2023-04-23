import Vue from 'vue'
import router from './router'

import App from './App.vue'
import '@/mock/index'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import element from '@/plugins/element'
Vue.use(element)

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
