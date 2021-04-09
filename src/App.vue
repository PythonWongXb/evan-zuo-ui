<!--
 * @Author: your name
 * @Date: 2021-04-09 22:43:29
 * @LastEditTime: 2021-04-09 23:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/App.vue
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {
  HelloWorld
} from 'evan_you_demo_1_demo_pythonista_1'

export default {
  name: 'App',
  components: {
    HelloWorld
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
