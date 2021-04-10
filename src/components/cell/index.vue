<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 15:07:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->
<template>
  <div class="cell" @click="clickCell"> {{ this.cellData }} </div>
</template>

<script>
  export default {
    props: {
      cellData: {
        type: [Number, String, Object, Array]
      },
    },

    methods: {
      clickCell(e) {
        this.$emit('clickCell', this.cellData, e)
      }
    },

    // render() {
    //   return <div onClick={this.clickCell} class="cell">{ this.cellData }</div>
    // },
  }
</script>

<style lang="less" scoped>

.cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
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