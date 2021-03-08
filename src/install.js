// Import vue components
import WebSpeechComponent from './components/WebSpeech.vue'

const WebSpeech = {
  install (Vue, options) {
    Vue.component('vue-web-speech', WebSpeechComponent)
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WebSpeech)
}

export default WebSpeech
