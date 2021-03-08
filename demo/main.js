import Vue from 'vue'
import App from './App.vue'
import VueSpeech from '../src/install.js'

Vue.use(VueSpeech)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
