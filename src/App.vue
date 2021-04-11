<!--
 * @Author: your name
 * @Date: 2021-04-09 22:43:29
 * @LastEditTime: 2021-04-10 23:48:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/App.vue
-->
<template>
  <div id="app">
    <my-table></my-table>
  </div>
</template>

<script>
import MyTable from '@/components/table'


export default {
  name: 'App',
  components: {
    MyTable,
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
