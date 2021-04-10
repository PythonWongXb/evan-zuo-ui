/*
 * @Author: your name
 * @Date: 2021-04-09 22:43:29
 * @LastEditTime: 2021-04-09 23:45:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import HelloWorld from 'evan_you_demo_1_demo_pythonista_1'

Vue.use(HelloWorld)
new Vue({
  render: h => h(App),
}).$mount('#app')

