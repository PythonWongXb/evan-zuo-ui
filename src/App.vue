<!--
 * @Author: your name
 * @Date: 2021-04-09 22:43:29
 * @LastEditTime: 2021-04-11 20:46:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/App.vue
-->
<template>
  <div id="app">
    <my-table
      ref="evan-table"
      :data="tableData"
      :columnsList="columnsList"
    >
      <template v-slot:evan-table-operations="props">
          <div v-if="props.item.id > 1" @click="editRow(props.index, props.item)">edit </div>
          <div @click="editRow(props.index, props.item)">edit </div>
          <div @click="editRow(props.index, props.item)">edit </div>
          <div @click="editRow(props.index, props.item)">edit </div>
      </template>
    </my-table>
  </div>
</template>

<script>
import MyTable from '@/components/table'


export default {
  name: 'App',
  components: {
    MyTable,
  },
  data() {
    return {
        columnsList: [
          {
            name: '1',
            prop: 'name1'
          },
          {
            name: '2',
            prop: 'name2'
          },
          {
            name: '3',
            prop: 'name3'
          },
        ],
        tableData: [
          {
            id: 1,
            name1: '1',
            name2: 'prop_name',
            name3: '3',
          },
          {
            id: 2,
            name1: '2',
            name2: 'prop_name',
            name3: '4',
          },
        ],
    }
  },

  methods: {
      editRow(index, item) {
        let data
        if (item.select) {
          data = item.children
        } else {
          data = this.$refs['evan-table'].$refs.subTable[index].selection
        }
        console.log(index, data)
      },
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
