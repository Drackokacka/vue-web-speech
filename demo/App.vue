<template>
  <div id="app">
    <h3>
      Click start and say something!
    </h3>

    <button @click="record = !record">{{record?'Stop':'Start'}}</button>
    <br>
    <vue-web-speech
      v-model="record"
      @results="onResults"
      @unrecognized="unrecognized"
    >
      <template v-slot:input="{text}">
        <textarea :value="text" />
      </template>
    </vue-web-speech>
    {{results}}

    <h3>
      Write text and press play
    </h3>
    <input v-model="synthText"/>
    <br>
    <select v-model="synthVoice">
      <option
        v-for="(voice, index) in voiceList"
        :key="index"
        :value="voice"
      >
        {{voice.name }} [{{voice.lang}}]
      </option>
    </select>
    <br>
    <button @click="play = !play">{{play?'Stop':'Play'}}</button>
    <br>
    <vue-web-speech-synth
      v-model="play"
      :voice="synthVoice"
      :text="synthText"
      @list-voices="listVoices"
    />
  </div>
</template>

<script>
// import VueSpeech from '../src/components/VueSpeech.vue'

export default {
  name: 'App',
  data () {
    return {
      record: false,
      results: null,

      voiceList: [],
      play: false,
      synthVoice: null,
      synthText: 'Hello, I am your personal speaker!'
    }
  },
  methods: {
    onResults (data) {
      this.results = data
    },
    unrecognized () {
      alert('Speech was not recognized with satisfying confidence.')
    },

    listVoices (list) {
      this.voiceList = list
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
