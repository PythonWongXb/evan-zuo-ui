/*
 * @Author: your name
 * @Date: 2021-04-09 22:46:45
 * @LastEditTime: 2021-04-11 20:52:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/index.js
 */

import EvanTable from './src/components/evan-table'

const ComponentsMap = {
  EvanTable,
}

const ComponentsAllInstall = {}
ComponentsAllInstall.install = (_Vue) => {
  for (const [componentName, component] of Object.entries(ComponentsMap)) {
    _Vue.component(componentName, component)
  }
}

export default ComponentsAllInstall

export {
  EvanTable
}
