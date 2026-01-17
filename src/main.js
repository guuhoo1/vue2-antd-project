import Vue from 'vue'
import App from './App.vue'
import importAntd from './importAntd'


Vue.config.productionTip = false
Vue.use(importAntd)


new Vue({
  render: h => h(App),
}).$mount('#app')
