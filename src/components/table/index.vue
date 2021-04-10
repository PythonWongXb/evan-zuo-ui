<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 17:44:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->

<template>
  <div class="container">
    <Th :columns="columnsList"></Th>
    <Row
      v-for="(item, index) in tableData"
      :key="index"
      :rowData="item"
      :columns="columnsList"
      :index="index"
      @clickSubRowArrow="clickSubRowArrow(item, $event)"
    >
      <template v-slot:expand-table>
        <el-table
        :data="item.children"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column
              prop="id"
              label="id了您嘞"
            >
            </el-table-column>
        </el-table>
      </template>
    </Row>
    </div>
</template>

<script>

import { Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Row from './../row'
import Th from './../th'
  export default {
    components: {
      Row,
      Th,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
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
            name1: '1',
            name2: 'prop_name',
            name3: '3',
            isExpand: false,
            select: false,
            children: [],
            isLoaded: false,
          },
          {
            name1: '2',
            name2: 'prop_name',
            name3: '4',
            isExpand: false,
            select: false,
            children: [],
            isLoaded: false,
          },
        ],
      }
    },

    watch: {

    },

    methods: {
      clickSubRowArrow(item, isExpand) {
        console.log(item, isExpand)
        if (isExpand) {
          item.isExpand = false
          return
        } else {
          if (item.isLoaded) {
            item.isExpand = true
            return
          }
          setTimeout(() => {
            item.isExpand = true
            item.isLoaded = true
            item.children.push({id: 1})
          }, 1000)
        }
      }
    },
    // render() {
    //   const rowList = this.tableData.map(item => {
    //       return <Row rowData={item} columns={this.columnsList}></Row>
    //   })
    //   return <div class="table">
    //         <Th columns={this.columnsList}></Th>
    //         {rowList}
    //   </div>
    // },
  }
</script>

<style lang="less" scoped>
.table {
    display: flex;
    flex-direction: column;

    .row {
        display: flex;
        border-bottom: 1px solid #EEEEEE;
    }

    .th {
        display: flex;
        border-bottom: 1px solid #EEEEEE;
        background-color: #f7f7f7;
        height: 42px;
    }
}
</style>