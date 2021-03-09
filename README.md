# vue-web-speech

Vue wrapper for Web Speech API for voice recognition.  
Web Speech API is in experimental phase, check [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility) before using in production.

## Installation 
```
npm i vue-web-speech
```

## [Demo](https://drackokacka.github.io/vue-web-speech)

## Usage

Inject plugin to your vue instance by Vue.use

```javascript
import Vue from 'vue'
import VueWebSpeech from 'vue-web-speech'

...

Vue.use(VueWebSpeech)
```

Then use it as component
```javascript
<template>
    <vue-web-speech
      v-model="record"
      @results="onResults"
    />
</template>
```

## Documentation

### Properties

| Prop | Type | Default | Descrtiption |
|---|---|---|---|
| **v-model** | *Boolean* | false | Used to bind recording state. Can be used to start recording (`true`) or stop recording (`false`).| 
| **lang** | *String* | Defaults to the HTML lang attribute value, or the user agent's language setting if that isn't set either. | Language to recognize speech. | 
| **confidenceLimit** | *String* \| *Number* | 0.8 | Limit for confidence under which transcription will be filtered out. |
| **continuous** | *Boolean* | false | Controls whether continuous results are returned for each recognition, or only a single result. | 
| **interimResults** | *Boolean* | false | Controls whether interim (not final) results should be returned. | 
| **maxAlternatives** | *String* \| *Number* | 1 | Sets the maximum number of alternatives provided per result. | 
| **grammar** | *String* | null | Grammars that will be understood by the recognition. | 

---
## Slots
| Slot | Props | Descrtiption |
|---|---|---|
| **input** | String `text` | You can use this slot as visualization of speech result array. `text` is string of made of joined arrays by `\n`.  |

Example of input slot
```javascript
<vue-web-speech>
    <template v-slot:input="{text}">
        <textarea :value="text" />
    </template>
</vue-web-speech>
``` 
---
### Events
| Event | Returns | Descrtiption |
|---|---|---|
| **results** | Array | Returns array of transcripts filtered by `confidenceLimit`. | 
| **resultsRaw** | [SpeechRecognitionResultList](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResultList) | Returns raw `SpeechRecognitionResultList` on `onResult` event without `confidenceLimit` filtering. | 
| **unrecognized** | null | Fires when `confidenceLimit` was not satisfied. When `continuous` prop is on, fires when no result satisfied `confidenceLimit`. | 
| **error** | Event | Fires native [error](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/error_event) event. | 
| **start** | Event | Fires native [onstart](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start_event) event. | 
| **end** | Event | Fires native [onend](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event) event. | 
| **speechstart** | Event | Fires native [onspeechstart](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechstart_event) event. | 
| **speechend** | Event | Fires native [onspeechend](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechend_event) event. | 
| **audiostart** | Event | Fires native [onaudiostart](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audiostart_event) event. | 
| **audioend** | Event | Fires native [onaudioend](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audioend_event) event. | 
| **soundstart** | Event | Fires native [onsoundstart](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundstart_event) event. | 
| **soundend** | Event | Fires native [onsoundend](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundend_event) event. | 
| **nomatch** | Event | Fires native [onnomatch](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/nomatch_event) event. | 
