<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 14:35:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->

<script>
import Cell from './../cell'
import Row from './../row'
import Th from './../th'
  export default {
    components: {
      Cell,
      Row,
      Th,
    },

    render() {
      const rowList = this.tableData.map(item => {
          return <Row rowData={item} columns={this.columnsList}></Row>
      })
      return <div class="table">
            <Th columns={this.columnsList}></Th>
            {rowList}
      </div>
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
          },
          {
            name1: '2',
            name2: 'prop_name',
            name3: '4',
          },
        ],
        columns: [
          {
            prop: 'prop'
          }
        ]
      }
    },

    watch: {

    },

    methods: {

    },
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