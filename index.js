/*
 * @Author: your name
 * @Date: 2021-04-09 22:46:45
 * @LastEditTime: 2021-04-09 23:01:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/index.js
 */

import HelloWorld from './src/components/HelloWorld'

const ModuleObj = {
  HelloWorld,
}

let MyModule = {}
MyModule.install = (_Vue) => {
  for (let i in ModuleObj) {
    _Vue.component(i, ModuleObj[i])
  }
}

export default MyModule

export {
  HelloWorld
}
