<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 14:36:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->

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

    render() {
      const cellList = this.columns.map(each => <Cell cellData={ this.rowData[each.prop] }></Cell>)
      return <div class="row">
      { cellList }
      </div>
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

.th {
    display: flex;
    border-bottom: 1px solid #EEEEEE;
    background-color: #f7f7f7;
    height: 42px;
}
</style>