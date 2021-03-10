// Import vue components
import WebSpeechRecogComponent from './components/WebSpeechRecognize.vue'
import WebSpeechSynthComponent from './components/WebSpeechSynthetize.vue'

const WebSpeech = {
  install (Vue, options) {
    Vue.component('vue-web-speech', WebSpeechRecogComponent)
    Vue.component('vue-web-speech-synth', WebSpeechSynthComponent)
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WebSpeech)
}

export default WebSpeech
