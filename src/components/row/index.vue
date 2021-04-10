<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 15:02:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->
<template>
  <div class="row">
    <Cell v-for="(item, index) in columns"
    :key="index"
    :cellData="rowData[item.prop]"></Cell>
  </div>
</template>
<script>
import Cell from './../cell'

  export default {
    components: {
      Cell,
    },

    props: {
      columns: {
        type: Array
      },
      rowData: {
        type: Object
      }
    },

    watch: {

    },

    methods: {

    },
  }
</script>

<style lang="less" scoped>

.row {
    display: flex;
    border-bottom: 1px solid #EEEEEE;
}
</style>