import Vue from 'vue'
import App from './App.vue'
import router from './router'
import importAntd from './importAntd'

Vue.config.productionTip = false
Vue.use(importAntd)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
