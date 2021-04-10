<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 23:39:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->

<template>
  <div class="container">
    <Th
      :columns="columnsList"
      :isSelectAll="isSelectAll"
      @selectAllChange="selectAllChange"
    ></Th>
    <Row
      v-for="(item, index) in tableData"
      :key="index"
      :rowData="item"
      :columns="columnsList"
      :index="index"
      :isSelectAll.sync="isSelectAll"
      @clickSubRowArrow="clickSubRowArrow(item, $event)"
      @singleTableRowChangeSelect="singleTableRowChangeSelect(item, index, $event)"
      @selectAllSubTable="selectAllSubTable"
    >
      <template v-slot:expand-table>
        <el-table
        ref='subTable'
        :data="item.children"
        @select="subTableSelectChange(index, item, $event)"
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
        isSelectAll: false,
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
            isExpand: false,
            select: false,
            children: [],
            isLoaded: false,
          },
          {
            id: 2,
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
      subTableSelectChange(index, item, event) {
        console.log(index, event)
        const isSubTableSelectAll = this.$refs.subTable[index].selection.length === item.children.length
        if (isSubTableSelectAll) {
          item.select = true
        } else {
          item.select = false
        }
      },

      async selectAllSubTable() {
        await this.$nextTick()
        this.$refs.subTable.forEach(async (item, index) => {
          await this.selectCurrentAllSubTableRow(index)
        })
      },

      async selectAllChange(value) {
        if (!value) {
          this.tableData = this.tableData.map(item => {
            return {
              ...item,
              select: false,
              isExpand: false,
            }
          })
          this.isSelectAll = false
          return
        }
        const subTableArray = await this.getAllData()
        this.tableData = this.tableData.map(item => {
          const data = subTableArray.find(each => each.parentId === item.id)?.children
          return {
            ...item,
            isLoaded: true,
            select: true,
            isExpand: true,
            children: data || [],
          }
        })
        this.isSelectAll = true
      },

      async getAllData() {
        return await new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {
                parentId: 1,
                children: [
                  {
                    id: 1
                  }
                ]
              },
              {
                parentId: 2,
                children: [
                  {
                    id: 2
                  }
                ]
              }
            ])
          }, 1000)
        })
      },

      async singleTableRowChangeSelect(item, subTableIndex, isSingleRowSelect) {
        console.log(item, isSingleRowSelect)
        if (isSingleRowSelect) {
          // 选中
          await this.clickSubRowArrow(item, false)
          await this.$nextTick()
          await this.selectCurrentAllSubTableRow(subTableIndex)
        } else {
          // 清除
          this.clearCurrentSubTableRowAllSelect(subTableIndex)
        }
        this.isSelectAll = _checkSelectAll(this.tableData)

        function _checkSelectAll(array) {
          return array.every(item => item.select)
        }
      },

      async selectCurrentAllSubTableRow(subTableIndex) {
        this.$refs.subTable[subTableIndex].toggleAllSelection()
        await this.$nextTick()
      },

      clearCurrentSubTableRowAllSelect(subTableIndex) {
        console.log(2)
        this.$refs.subTable[subTableIndex].clearSelection()
      },

      async clickSubRowArrow(item, isExpand) {
        console.log(item, isExpand)
        if (isExpand) {
          item.isExpand = false
          return
        } else {
          if (item.isLoaded) {
            item.isExpand = true
            return
          }
          const promise = new Promise(resolve => {
            setTimeout(() => {
              const data = {id: item.id}
              resolve(data)
            }, 1000)
          })
          const data = await promise
          item.isExpand = true
          item.isLoaded = true
          item.children.push(data)
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