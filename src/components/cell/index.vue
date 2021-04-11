<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-11 10:55:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->


<script>
  export default {
    props: {
      cellData: {
        type: [Number, String, Object, Array, Boolean]
      },

      width: {
        type: [String, Number]
      },

      center: {
        type: Boolean
      }
    },

    methods: {
      clickCell(e) {
        this.$emit('clickCell', this.cellData, e)
      }
    },

    render() {
      const style = this.width ? `max-width: ${this.width}px`: ''
      const className = this.center ? 'cell-center' : 'cell'
      const content = this.$scopedSlots.content ? this.$scopedSlots.content() : String(this.cellData)
      return <div onClick={this.clickCell} class={className} style={style}>{ content }</div>
    },
  }
</script>

<style lang="less" scoped>

.cell {
    flex: 1;
    display: flex;
    align-items: center;
    // justify-content: center;
    height: 42px;
}

.cell-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
}
</style>