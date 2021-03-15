<template>
  <div id="app">
    
    <ChartView msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ChartView from './components/ChartView.vue'

export default {
  name: 'App',
  components: {
    ChartView
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
