<template>
  <div>
    <number-input-demo/>
    <fluctuation-demo/>
  </div>
</template>
<script>
import NumberInputDemo from "./components/NumberInputDemo.vue";
import FluctuationDemo from "./components/FluctuationDemo.vue";
import 'lib/styles/fluctuation.css'

export default {
  components: {
    FluctuationDemo,
    NumberInputDemo
  }
}
</script>
