
<template>
  <div>
    <slot name="input" :text="text"></slot>
  </div>
</template>

<script>
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
export default {
  props: {
    voice: {
      default: null
    },
    rate: {
      type: [Number, String],
      default: 1
    },
    pitch: {
      type: [Number, String],
      default: 1
    },
    text: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      synth: null,
      utterance: null
    }
  },
  watch: {
    value (value) {
      if (this.synth) {
        if (value) {
          this.speak()
        } else {
          this.stop()
        }
      }
    }
  },
  created () {
    this.synth = window.speechSynthesis
    this.synth.onvoiceschanged = this.listVoices

    this.utterance = new SpeechSynthesisUtterance()
    this.utterance.onend = (event) => {
      this.$emit('end', event)
      this.$emit('input', false)
    }
    this.utterance.onboundary = (event) => {
      this.$emit('boundary', event)
    }
    this.utterance.onerror = (event) => {
      this.$emit('error', event)
    }
  },
  methods: {
    listVoices () {
      const voices = this.synth.getVoices()
      this.$emit('list-voices', voices)
    },
    speak () {
      if (this.text !== '') {
        this.utterance.text = this.text
        this.utterance.voice = this.voice
        this.utterance.pitch = this.pitch
        this.utterance.rate = this.rate

        this.synth.speak(this.utterance)
      }
    },
    stop () {
      this.synth.cancel()
    }
  }
}

</script>
