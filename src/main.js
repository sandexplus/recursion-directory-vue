import Vue from 'vue'
import App from './App.vue'
import store from './store'

import directiveFolderVue from '@/components/directiveFolder';

Vue.config.productionTip = false

const app = new Vue({
  store,
  render: h => h(App)
})

Vue.component('directive-folder', directiveFolderVue)

app.$mount('#app')
