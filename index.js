/*
 * @Author: your name
 * @Date: 2021-04-09 22:46:45
 * @LastEditTime: 2021-04-10 19:16:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/index.js
 */

import MyTable from './src/components/table'

const ModuleObj = {
  MyTable,
}

let MyModule = {}
MyModule.install = (_Vue) => {
  for (let i in ModuleObj) {
    _Vue.component(i, ModuleObj[i])
  }
}

export default MyModule

export {
  MyTable
}
