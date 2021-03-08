
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
    lang: {
      type: String,
      default: null
    },
    value: {
      type: Boolean
    },
    confidenceLimit: {
      type: [Number, String],
      default: 0.8
    },
    continuous: {
      type: Boolean
    },
    interimResults: {
      type: Boolean
    },
    maxAlternatives: {
      type: [Number, String],
      default: 1
    },
    grammar: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      text: '',
      recognition: null
    }
  },
  watch: {
    value (value) {
      if (this.recognition) {
        if (value) {
          this.recognition.start()
        } else {
          this.recognition.stop()
        }
      }
    }
  },
  created () {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    this.recognition = new SpeechRecognition()
    const speechRecognitionList = new SpeechGrammarList()
    if (this.grammar) {
      speechRecognitionList.addFromString(this.grammar, 1)
    }
    this.recognition.grammars = speechRecognitionList

    this.recognition.lang = this.lang
    this.recognition.continuous = this.continuous
    this.recognition.interimResults = this.interimResults
    this.recognition.maxAlternatives = this.maxAlternatives

    this.recognition.onresult = (event) => {
      // const transcript = event.results[0].map(a => a.transcript)
      const textArr = Array.from(event.results).filter(srr => {
        return srr[0].confidence >= this.confidenceLimit
      }).map(srr => {
        return srr[0].transcript
      })

      // console.log(event.results)
      // console.log(confidence, transcript, this.confidenceLimit)
      this.$emit('resultsRaw', event.results)

      if (textArr.length) {
        this.text = textArr.join('\n')
        this.$emit('results', textArr)
      } else {
        this.$emit('unrecognized')
      }
    }

    this.recognition.onspeechend = (event) => {
      this.$emit('speechend', event)
    }

    this.recognition.onerror = (event) => {
      this.$emit('error', event)
    }

    this.recognition.onaudiostart = (event) => {
    // Fired when the user agent has started to capture audio.
      this.$emit('audiostart', event)
    }

    this.recognition.onaudioend = (event) => {
    // Fired when the user agent has finished capturing audio.
      this.$emit('audioend', event)
    }

    this.recognition.onend = (event) => {
    // Fired when the speech this.recognition service has disconnected.
      this.$emit('end', event)
      this.$emit('input', false)
    }

    this.recognition.onnomatch = (event) => {
    // Fired when the speech this.recognition service returns a final result with no significant this.recognition. This may involve some degree of this.recognition, which doesn't meet or exceed the confidence threshold.
      this.$emit('match', event)
    }

    this.recognition.onsoundstart = (event) => {
    // Fired when any sound — recognisable speech or not — has been detected.
      this.$emit('soundstart', event)
    }

    this.recognition.onsoundend = (event) => {
    // Fired when any sound — recognisable speech or not — has stopped being detected.
      this.$emit('soundend', event)
    }

    this.recognition.onspeechstart = (event) => {
    // Fired when sound that is recognised by the speech this.recognition service as speech has been detected.
      this.$emit('speechstart', event)
    }
    this.recognition.onstart = (event) => {
    // Fired when the speech this.recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      this.$emit('start', event)
      this.$emit('input', true)
    }
  },
  methods: {
    start () {
      this.recognition.start()
    },
    stop () {
      this.recognition.stop()
    }
  }
}

</script>
