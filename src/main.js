import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import importAntd from './importAntd'
import { initTheme } from './utils/theme'
import { loadInterceptors } from './utils/ajax/axios-interceptors'

Vue.config.productionTip = false

initTheme(store.state.app.theme)

Vue.use(importAntd)

loadInterceptors()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
