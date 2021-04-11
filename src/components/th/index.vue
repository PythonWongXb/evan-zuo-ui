<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-11 11:10:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->
<template>
  <div class="th">
    <Cell width="50" center>
      <template v-slot:content>
        <el-checkbox :value="isSelectAll" @change="selectAllChange"></el-checkbox>
      </template>
    </Cell>
    <div class="sub-th-cells-container">
      <Cell
        v-for="(item, index) in columns"
        :key="index"
        :cellData="item.name || item.prop"
      ></Cell>
    </div>
  </div>
</template>

<script>
import Cell from './../cell'
import { Checkbox } from 'element-ui';

export default {
  components: {
    Cell,
    [Checkbox.name]: Checkbox
  },

    props: {
      columns: {
        type: Array
      },

      isSelectAll: {
        type: Boolean
      }
    },


    watch: {

      },

    methods: {
      selectAllChange(value) {
        this.$emit('selectAllChange', value)
      }
    },

    // render() {
    //   let cellList
    //   cellList = this.columns.map(item => <Cell cellData={ item.name || item.prop }></Cell>)
    //   return <div class="th">
    //   { cellList }
    //   </div>
    // },
  }
</script>

<style lang="less" scoped>

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

.sub-th-cells-container {
  flex: 1;
  display: flex;
  margin-left: 40px;
}
</style>