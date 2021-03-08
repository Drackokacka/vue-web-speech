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
    >
      <template v-slot:input="{text}">
        <textarea :value="text" />
      </template>
    </vue-web-speech>
    {{results}}
  </div>
</template>

<script>
// import VueSpeech from '../src/components/VueSpeech.vue'

export default {
  name: 'App',
  data () {
    return {
      record: false
    }
  },
  methods: {
    onResults (data) {
      console.log(data)
      this.results = data
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
