<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-11 20:46:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->

<template>
  <div class="evan-table-container">
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
        <div class="sub-table-container">
          <div class="block"></div>
          <el-table
          class="sub-table"
          ref='subTable'
          :data="item.children"
          :stripe="true"
          header-row-class-name="table-header-sub-table"
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
        </div>
      </template>
      <template v-slot:operations>
        <div class="evan-table-operations">
            <slot name="evan-table-operations" :index="index" :item="item"></slot>
        </div>
      </template>
    </Row>
    </div>
</template>

<script>
function _checkSelectAll(array) {
  return array.every(item => item.select)
}

import { Table, TableColumn, Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import Row from './components/row'
import Th from './components/th'
  export default {
    name: 'evan-table',
    components: {
      Row,
      Th,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
    },

    props: {
      columnsList: {
        type: Array
      },

      data: {
        type: Array
      }
    },

    created() {
      this.tableData = this.data.map(item => {
        return {
          ...item,
            isExpand: false,
            select: false,
            children: [],
            isLoaded: false,
        }
      })
    },

    data() {
      return {
        loadingInstance: null,
        isSelectAll: false,
        tableData: [],
      }
    },

    watch: {

    },

    methods: {
      editRow(index, item) {
        let data
        if (item.select) {
          data = item.children
        } else {
          data = this.$refs.subTable[index].selection
        }
        console.log(index, data)
      },

      async subTableSelectChange(index, item, event) {
        console.log(index, event)
        const isSubTableSelectAll = this.$refs.subTable[index].selection.length === item.children.length
        item.select = isSubTableSelectAll
        await this.$nextTick()
        this.isSelectAll = _checkSelectAll(this.tableData)
      },

      async selectAllSubTable() {
        await this.$nextTick()
        this.$refs.subTable.forEach(async (item, index) => {
          await this.selectCurrentAllSubTableRow(index)
        })
      },

      async selectAllChange(value) {
        if (value) {
          this.loadingInstance = Loading.service({ target: document.querySelector('.evan-table-container') })
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
        } else {
          this.tableData = this.tableData.map(item => {
            return {
              ...item,
              select: false,
              isExpand: false,
            }
          })
        }
        this.isSelectAll = value
        await this.$nextTick()
        if (this.loadingInstance) {
          this.loadingInstance.close()
          this.loadingInstance = null
        }
      },

      async getAllData() {
        return await new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {
                parentId: 1,
                children: [
                  {
                    id: 234
                  },
                  {
                    id: 2341
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
          // 想选中
          await this.clickSubRowArrow(item, false)
          await this.$nextTick()
          await this.selectCurrentAllSubTableRow(subTableIndex)
        } else {
          // 要清除
          this.clearCurrentSubTableRowAllSelect(subTableIndex)
        }
        this.isSelectAll = _checkSelectAll(this.tableData)
      },

      async selectCurrentAllSubTableRow(subTableIndex) {
        this.$refs.subTable[subTableIndex].toggleAllSelection()
        await this.$nextTick()
      },

      clearCurrentSubTableRowAllSelect(subTableIndex) {
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
.sub-table-container {
  position: relative;
  margin-left: 50px;
}

.block {
  position: absolute;
  top: 0;
  left: 0;
  height: 46px;
  width: 50px;
  background: #f7f7f7;
  z-index: 2;
}

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

<style lang="less" scoped>
::v-deep .evan-table-operations {
  display: flex;
  flex-wrap: wrap;
  width: 200px;

  & > div {
    width: 100px;
  }
}

::v-deep .table-header-sub-table {
  th {
    background: #f7f7f7;
  }
}
</style>